import type { VergeClient } from './client.js';
import { SiteError } from './errors.js';
import type { ReadOnlyService } from './services/base.js';
import type { SiteStatus } from './site-manager.js';
import type { ListOptions, Resource } from './types.js';

// ─── Public Types ────────────────────────────────────────────────────────────

/**
 * A resource tagged with the site it came from.
 * One entry per resource item, not per site.
 *
 * @typeParam T - The resource type
 */
export interface SiteResource<T> {
	/** Site name as registered via `addSite()`. */
	site: string;
	/** The resource from that site. */
	resource: T;
}

/**
 * Aggregated result from a cross-site fan-out query.
 * Contains both successful results and per-site errors.
 *
 * @typeParam T - The resource type
 */
export interface CrossSiteResult<T> {
	/** Resources from all successful sites, flattened and tagged with site name. */
	data: SiteResource<T>[];
	/** One {@link SiteError} per site that failed. */
	errors: SiteError[];
}

// ─── Mapped Type for Autocomplete ────────────────────────────────────────────

/**
 * Extracts service property keys from {@link VergeClient}.
 * A property is a "service" if its type extends `ReadOnlyService<Resource>`.
 *
 * @internal
 */
type ServiceKeys<C> = {
	[K in keyof C]: C[K] extends ReadOnlyService<Resource> ? K : never;
}[keyof C];

/**
 * Mapped type that mirrors {@link VergeClient}'s registered services,
 * but exposes only a `list()` method returning {@link CrossSiteResult}.
 *
 * Provides TypeScript autocomplete for `manager.all.vms.list(...)`.
 */
export type CrossSiteServices = {
	[K in ServiceKeys<VergeClient>]: VergeClient[K] extends ReadOnlyService<infer T>
		? { list(options?: ListOptions): Promise<CrossSiteResult<T>> }
		: never;
};

// ─── Callback Types ──────────────────────────────────────────────────────────

/**
 * Function that returns the map of site name → client for fan-out.
 * Called lazily so it always reflects the current set of sites.
 *
 * @internal
 */
type ClientsProvider = () => Map<string, VergeClient>;

/**
 * Function that updates a site's status after a fan-out result.
 *
 * @internal
 */
type StatusUpdater = (name: string, update: Partial<SiteStatus>) => void;

// ─── CrossSiteReadProxy ──────────────────────────────────────────────────────

/**
 * Read-only fan-out proxy that queries multiple sites in parallel.
 *
 * Exposes only `list()` for every registered service — no `get()`, no mutations.
 * Uses `Promise.allSettled` so partial failures don't block results from healthy sites.
 *
 * Not instantiated directly — obtain via {@link SiteManager.all} or {@link SiteManager.tagged}.
 *
 * @example
 * ```typescript
 * const result = await manager.all.vms.list({ filter: "status eq 'running'" });
 * for (const item of result.data) {
 *   console.log(`${item.site}: ${item.resource.name}`);
 * }
 * for (const err of result.errors) {
 *   console.error(`${err.site}: ${err.message}`);
 * }
 * ```
 */
export class CrossSiteReadProxy {
	/** @internal */
	private readonly _getClients: ClientsProvider;

	/** @internal */
	private readonly _updateStatus: StatusUpdater;

	/**
	 * @param getClients - Function returning the current map of site name → client
	 * @param updateStatus - Function to update site status after fan-out results
	 * @internal
	 */
	constructor(getClients: ClientsProvider, updateStatus: StatusUpdater) {
		this._getClients = getClients;
		this._updateStatus = updateStatus;

		// Return a Proxy that intercepts property access for service names
		// biome-ignore lint/correctness/noConstructorReturn: Proxy-in-constructor is the designed pattern for dynamic service dispatch
		return new Proxy(this, {
			get(target, prop, receiver) {
				// Own properties and methods take precedence
				if (Reflect.has(target, prop)) {
					return Reflect.get(target, prop, receiver);
				}

				// For string property access (service names), return a { list } object
				if (typeof prop === 'string') {
					return {
						list: (options?: ListOptions) => target._fanOut(prop, options),
					};
				}

				return undefined;
			},
		}) as unknown as CrossSiteReadProxy & CrossSiteServices;
	}

	/**
	 * Execute a fan-out list query across all sites.
	 *
	 * @param serviceName - The service property name (e.g., `'vms'`)
	 * @param options - List options passed through to each site's service
	 * @returns Aggregated results and errors from all sites
	 * @internal
	 */
	private async _fanOut<T extends Resource>(
		serviceName: string,
		options?: ListOptions,
	): Promise<CrossSiteResult<T>> {
		const clients = this._getClients();
		const entries = [...clients.entries()];

		// Nothing to query
		if (entries.length === 0) {
			return { data: [], errors: [] };
		}

		// Fan out to all sites in parallel
		const settled = await Promise.allSettled(
			entries.map(async ([name, client]) => {
				// Access the service on the client (e.g., client.vms)
				const service = (client as unknown as Record<string, unknown>)[serviceName] as
					| ReadOnlyService<T>
					| undefined;

				if (!service || typeof service.list !== 'function') {
					throw new Error(`Service '${serviceName}' is not registered on site '${name}'`);
				}

				const items = await service.list(options);
				return { name, items };
			}),
		);

		// Aggregate results
		const data: SiteResource<T>[] = [];
		const errors: SiteError[] = [];

		for (const result of settled) {
			if (result.status === 'fulfilled') {
				const { name, items } = result.value;
				for (const item of items) {
					data.push({ site: name, resource: item });
				}
				this._updateStatus(name, { connected: true, lastError: undefined });
			} else {
				// Find the site name from the rejection
				// Promise.allSettled preserves order, so use index
				const index = settled.indexOf(result);
				const [name] = entries[index] as [string, VergeClient];
				const cause =
					result.reason instanceof Error ? result.reason : new Error(String(result.reason));

				errors.push(
					new SiteError(
						name,
						`Fan-out query '${serviceName}.list()' failed on site '${name}': ${cause.message}`,
						cause,
					),
				);
				this._updateStatus(name, { connected: false, lastError: cause });
			}
		}

		return { data, errors };
	}
}
