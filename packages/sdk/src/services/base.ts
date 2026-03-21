import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants.js';
import { isNotFoundError, NotFoundError } from '../errors.js';
import { quoteFilterString } from '../filter.js';
import type { HttpClient } from '../http.js';
import type { FlexKey, ListAllOptions, ListOptions, MutationOptions, Resource } from '../types.js';

/**
 * Configuration for the dedicated `_actions` endpoint used by a service.
 * Most services derive these from the resource name, but some require overrides.
 */
export interface ActionConfig {
	/** The action endpoint path (e.g., `'vm_actions'`). */
	endpoint: string;
	/** The body key that identifies the target resource (e.g., `'vm'`). */
	key: string;
}

/**
 * Derive the singular form of a resource path for action dispatch.
 * Strips leading `/` and trailing `s` from the resource string.
 *
 * @example
 * deriveSingular('/vms') // → 'vm'
 * deriveSingular('/vnets') // → 'vnet'
 * deriveSingular('/cloud_snapshots') // → 'cloud_snapshot'
 *
 * @internal
 */
function deriveSingular(resource: string): string {
	const stripped = resource.replace(/^\//, '');
	return stripped.endsWith('s') ? stripped.slice(0, -1) : stripped;
}

/**
 * Serialize {@link ListOptions} into query parameters for the HTTP client.
 * Returns `undefined` when no options are provided.
 *
 * @internal
 */
function serializeListOptions(options?: ListOptions): ListOptions | undefined {
	if (!options) return undefined;

	const params: ListOptions = {};

	if (options.filter !== undefined) params.filter = options.filter;
	if (options.fields !== undefined) params.fields = options.fields;
	if (options.sort !== undefined) params.sort = options.sort;
	if (options.limit !== undefined) params.limit = options.limit;
	if (options.offset !== undefined) params.offset = options.offset;

	return Object.keys(params).length > 0 ? params : undefined;
}

/**
 * Normalize a resource object's key.
 *
 * The VergeOS API uses two key conventions:
 * - Integer-keyed resources include `$key` in responses
 * - Hex-keyed resources (recipes, catalogs) use `id` as the key with no `$key`
 *
 * This function ensures `$key` is always populated by falling back to `id`
 * when `$key` is missing.
 *
 * @internal
 */
function normalizeKey<T extends Resource>(item: T): T {
	if (item.$key === undefined && 'id' in item && (item as Record<string, unknown>).id != null) {
		(item as Record<string, unknown>).$key = (item as Record<string, unknown>).id;
	}
	return item;
}

/**
 * Shallow FK normalization safety net.
 *
 * When the API unexpectedly expands a foreign-key field into a full object
 * (e.g., `{ cluster: { $key: 3, name: "default" } }` instead of `{ cluster: 3 }`),
 * this function collapses it back to the scalar key value.
 *
 * Only operates on the top level of properties — no recursion, so JSON blob
 * fields like `meta`, `packages`, and `config` are never corrupted.
 *
 * @internal
 */
function normalizeForeignKeys<T extends Resource>(item: T): T {
	const obj = item as Record<string, unknown>;
	for (const key of Object.keys(obj)) {
		if (key === '$key') continue;
		const val = obj[key];
		if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
			const record = val as Record<string, unknown>;
			if ('$key' in record) {
				obj[key] = record.$key;
			} else if ('id' in record && typeof record.id !== 'object') {
				obj[key] = record.id;
			}
		} else if (Array.isArray(val)) {
			obj[key] = val.map((el) => {
				if (el !== null && typeof el === 'object') {
					if ('$key' in el) return el.$key;
					if ('id' in el && typeof el.id !== 'object') return el.id;
				}
				return el;
			});
		}
	}
	return item;
}

/**
 * Read-only service base class providing list, get, and pagination operations.
 *
 * Extend this class for resources that the SDK should only read — never create,
 * update, delete, or send actions to. Examples: logs, audit entries, stats.
 *
 * @typeParam T - The resource type returned by the API (must extend {@link Resource})
 */
export class ReadOnlyService<T extends Resource> {
	/** @internal */
	protected readonly http: HttpClient;

	/** API resource path (e.g., `'/vms'`). */
	protected readonly resource: string;

	/** Human-readable resource name for error messages (e.g., `'VM'`). */
	protected readonly displayName: string;

	/**
	 * Per-service default fields for API requests.
	 *
	 * When set by a subclass, these fields are used instead of `'most'` for
	 * `list()` and `get()` calls where the caller does not provide explicit
	 * `fields`. This enables cross-resource joins (e.g., `machine#status#status`)
	 * so that derived fields like power state are reliably populated.
	 *
	 * User-provided `fields` always take precedence.
	 */
	protected defaultFields?: string[];

	/**
	 * @param http - The HTTP client for making API requests
	 * @param resource - The API resource path (e.g., `'/vms'`)
	 * @param displayName - Human-readable name for error messages (e.g., `'VM'`)
	 */
	constructor(http: HttpClient, resource: string, displayName: string) {
		this.http = http;
		this.resource = resource;
		this.displayName = displayName;
	}

	/**
	 * List resources matching the given options.
	 *
	 * @param options - Filter, sort, fields, and pagination options
	 * @returns Array of matching resources
	 */
	async list(options?: ListOptions): Promise<T[]> {
		const merged = { ...options };
		if (merged.fields === undefined) {
			merged.fields = this.defaultFields ?? 'most';
		}
		const params = serializeListOptions(merged);
		const items = await this.http.get<T[]>(this.resource, params ? { params } : undefined);
		return items.map((item) => normalizeForeignKeys(normalizeKey(item)));
	}

	/**
	 * Get a single resource by its key (ID).
	 *
	 * @param key - The resource ID
	 * @returns The matching resource
	 * @throws {@link NotFoundError} if the resource does not exist
	 */
	async get(key: FlexKey): Promise<T> {
		const fields = this.defaultFields ?? 'most';
		try {
			const item = await this.http.get<T>(`${this.resource}/${key}`, {
				params: { fields },
			});
			return normalizeForeignKeys(normalizeKey(item));
		} catch (err) {
			if (isNotFoundError(err)) {
				throw new NotFoundError(this.displayName, key);
			}
			throw err;
		}
	}

	/**
	 * Get a single resource by its `name` field.
	 *
	 * Performs a filtered list and returns the first match.
	 *
	 * @param name - The resource name to search for
	 * @returns The matching resource
	 * @throws {@link NotFoundError} if no resource with that name exists
	 */
	async getByName(name: string): Promise<T> {
		const results = await this.list({
			filter: `name eq ${quoteFilterString(name)}`,
		});
		if (results.length === 0) {
			throw new NotFoundError(this.displayName, name);
		}
		return results[0] as T;
	}

	/**
	 * Iterate over all resources matching the given options, auto-paginating.
	 *
	 * Fetches pages internally using `limit`/`offset` and yields individual items.
	 * Stops when a page returns fewer items than the page size.
	 *
	 * @param options - Filter, sort, fields, and page size options
	 * @yields Individual resources across all pages
	 */
	async *listAll(options?: ListAllOptions): AsyncGenerator<T> {
		const pageSize = Math.min(options?.pageSize ?? DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
		let offset = 0;

		const baseOptions: Omit<ListAllOptions, 'pageSize'> = { ...options };
		// Remove pageSize since it's not a valid ListOptions field
		const { pageSize: _, ...listBase } = baseOptions as ListAllOptions;

		while (true) {
			const page = await this.list({
				...listBase,
				limit: pageSize,
				offset,
			});

			for (const item of page) {
				yield item;
			}

			if (page.length < pageSize) {
				break;
			}

			offset += pageSize;
		}
	}
}

/**
 * Writable service base class that adds update, delete, and action dispatch.
 *
 * Extend this class for resources that can be modified but not created via the SDK.
 * For full CRUD, extend {@link BaseService} instead.
 *
 * @typeParam T - The resource type returned by the API
 * @typeParam U - The update params type accepted by `update()`
 */
export class WritableService<T extends Resource, U> extends ReadOnlyService<T> {
	/** Derived or overridden action endpoint configuration. */
	protected readonly actionConfig: ActionConfig;

	/**
	 * @param http - The HTTP client for making API requests
	 * @param resource - The API resource path (e.g., `'/vms'`)
	 * @param displayName - Human-readable name for error messages (e.g., `'VM'`)
	 * @param actionConfig - Override the action endpoint and body key derivation
	 */
	constructor(
		http: HttpClient,
		resource: string,
		displayName: string,
		actionConfig?: ActionConfig,
	) {
		super(http, resource, displayName);

		if (actionConfig) {
			this.actionConfig = actionConfig;
		} else {
			const singular = deriveSingular(resource);
			this.actionConfig = {
				endpoint: `${singular}_actions`,
				key: singular,
			};
		}
	}

	/**
	 * Update an existing resource.
	 *
	 * Sends a PUT request and optionally reads back the full resource.
	 *
	 * @param key - The resource ID to update
	 * @param params - The fields to update
	 * @param options - Mutation options (e.g., `readBack: false` to skip re-fetch)
	 * @returns The updated resource (or the resource with just `$key` if `readBack` is false)
	 */
	async update(key: FlexKey, params: U, options?: MutationOptions): Promise<T> {
		await this.http.put(`${this.resource}/${key}`, { body: params });

		if (options?.readBack === false) {
			return { $key: key } as unknown as T;
		}

		return this.get(key);
	}

	/**
	 * Delete a resource by its key (ID).
	 *
	 * @param key - The resource ID to delete
	 * @throws {@link NotFoundError} if the resource does not exist
	 */
	async delete(key: FlexKey): Promise<void> {
		try {
			await this.http.del(`${this.resource}/${key}`);
		} catch (err) {
			if (isNotFoundError(err)) {
				throw new NotFoundError(this.displayName, key);
			}
			throw err;
		}
	}

	/**
	 * Execute an inline action on a specific resource.
	 *
	 * Sends a POST to `/{resource}/{key}/{action}` with optional body params.
	 * Used for record-level actions (e.g., `POST /users/3/enable`).
	 *
	 * @param key - The resource ID to act on
	 * @param action - The action name (e.g., `'enable'`, `'disable'`)
	 * @param params - Optional action parameters
	 */
	protected async inlineAction(
		key: FlexKey,
		action: string,
		params?: Record<string, unknown>,
	): Promise<void> {
		if (params !== undefined) {
			await this.http.post(`${this.resource}/${key}/${action}`, {
				body: params,
			});
		} else {
			await this.http.post(`${this.resource}/${key}/${action}`);
		}
	}

	/**
	 * Dispatch an action to the dedicated `_actions` endpoint.
	 *
	 * Sends a POST to `/{actionEndpoint}` with the body:
	 * ```json
	 * { "[actionKey]": key, "action": actionName, "params": { ... } }
	 * ```
	 *
	 * @param action - The action name (e.g., `'poweron'`, `'poweroff'`)
	 * @param key - The resource ID to act on
	 * @param params - Optional action parameters
	 */
	protected async dispatchAction(
		action: string,
		key: FlexKey,
		params?: Record<string, unknown>,
	): Promise<void> {
		const body: Record<string, unknown> = {
			[this.actionConfig.key]: key,
			action,
		};

		if (params !== undefined) {
			body.params = params;
		}

		await this.http.post(`/${this.actionConfig.endpoint}`, { body });
	}
}

/**
 * Full CRUD service base class that adds resource creation.
 *
 * This is the most commonly extended base class. Use it for any resource
 * that supports create, read, update, delete, and actions.
 *
 * @typeParam T - The resource type returned by the API
 * @typeParam C - The create params type accepted by `create()`
 * @typeParam U - The update params type accepted by `update()`
 */
export class BaseService<T extends Resource, C, U> extends WritableService<T, U> {
	/**
	 * Create a new resource.
	 *
	 * Sends a POST request, extracts the `$key` from the response, and
	 * optionally reads back the full resource.
	 *
	 * @param params - The resource creation parameters
	 * @param options - Mutation options (e.g., `readBack: false` to skip re-fetch)
	 * @returns The created resource (or a partial with just `$key` if `readBack` is false)
	 */
	async create(params: C, options?: MutationOptions): Promise<T> {
		const response = await this.http.post<{ $key: FlexKey }>(this.resource, {
			body: params,
		});

		const key = response.$key;

		if (options?.readBack === false) {
			return { $key: key } as unknown as T;
		}

		return this.get(key);
	}
}
