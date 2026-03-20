import { VergeClient } from './client.js';
import type { CrossSiteServices } from './cross-site.js';
import { CrossSiteReadProxy } from './cross-site.js';
import { NotFoundError, ValidationError } from './errors.js';
import type { ClientConfig } from './types.js';

/**
 * Configuration for adding a site to the {@link SiteManager}.
 * Extends {@link ClientConfig} with a required site name and optional tags.
 */
export interface SiteConfig extends ClientConfig {
	/** Unique name for this site (e.g., "dc-east", "edge-01"). */
	name: string;

	/** Optional tags for grouping sites in fan-out queries. */
	tags?: string[];
}

/**
 * Options for constructing a {@link SiteManager}.
 */
export interface SiteManagerOptions {
	/** Default timeout in milliseconds for fan-out operations. */
	timeout?: number;
}

/**
 * Passive health snapshot for a registered site.
 * Updated lazily when fan-out queries succeed or fail.
 */
export interface SiteStatus {
	/** Whether the site is believed to be reachable. */
	connected: boolean;

	/** Server version string from the last successful connection. */
	version?: string;

	/** System ID from the server, if available. */
	systemId?: string;

	/** Last error encountered when communicating with this site. */
	lastError?: Error;
}

/**
 * Multi-site orchestration layer that manages named {@link VergeClient} instances.
 *
 * Provides site-level access, tagging, and passive health status tracking.
 * Sites can be added either by providing a {@link SiteConfig} (async, performs
 * version check) or a pre-built {@link VergeClient} (sync).
 *
 * @example
 * ```typescript
 * const manager = new SiteManager();
 *
 * // Async: connect and register
 * await manager.addSite({ name: 'dc-east', host: '10.0.0.1', apiKey: '...' });
 *
 * // Sync: register a pre-built client
 * const client = new VergeClient({ host: '10.0.0.2', apiKey: '...' });
 * manager.addSite('dc-west', client);
 *
 * // Access by name
 * const vms = await manager.site('dc-east').vms.list();
 * ```
 */
export class SiteManager {
	/** Registered clients keyed by site name. */
	private readonly _clients = new Map<string, VergeClient>();

	/** Tags keyed by site name. */
	private readonly _tags = new Map<string, string[]>();

	/** Status snapshots keyed by site name. */
	private readonly _status = new Map<string, SiteStatus>();

	/** Names currently being connected (async addSite in progress). */
	private readonly _pending = new Set<string>();

	/** Default timeout for fan-out operations. */
	private readonly _timeout: number | undefined;

	constructor(options?: SiteManagerOptions) {
		this._timeout = options?.timeout;
	}

	/**
	 * The default timeout in milliseconds for fan-out operations, if configured.
	 */
	get timeout(): number | undefined {
		return this._timeout;
	}

	/**
	 * Add a site by connecting with the given configuration.
	 * Performs a version check via {@link VergeClient.connect}.
	 *
	 * @param config - Site connection configuration including name and optional tags
	 * @throws {@link ValidationError} if a site with the same name is already registered
	 * @throws {@link UnsupportedVersionError} if the server version is incompatible
	 */
	addSite(config: SiteConfig): Promise<void>;

	/**
	 * Add a site with a pre-built {@link VergeClient}.
	 * No version check is performed — the client is assumed to be ready.
	 *
	 * @param name - Unique name for this site
	 * @param client - A pre-built VergeClient instance
	 * @param tags - Optional tags for grouping
	 * @throws {@link ValidationError} if a site with the same name is already registered
	 */
	addSite(name: string, client: VergeClient, tags?: string[]): void;

	/** @internal */
	addSite(
		configOrName: SiteConfig | string,
		clientOrUndefined?: VergeClient,
		tags?: string[],
	): void | Promise<void> {
		// Sync overload: addSite(name, client, tags?)
		if (typeof configOrName === 'string') {
			const name = configOrName;
			const client = clientOrUndefined as VergeClient;
			this._ensureUniqueName(name);
			this._registerSite(name, client, tags);
			return;
		}

		// Async overload: addSite(config)
		const config = configOrName;
		this._ensureUniqueName(config.name);
		this._pending.add(config.name);

		return VergeClient.connect(config).then(
			(client) => {
				this._pending.delete(config.name);
				this._registerSite(config.name, client, config.tags);
			},
			(error) => {
				this._pending.delete(config.name);
				throw error;
			},
		);
	}

	/**
	 * Remove a site by name. No-op if the site is not registered.
	 *
	 * @param name - The site name to remove
	 */
	removeSite(name: string): void {
		this._clients.delete(name);
		this._tags.delete(name);
		this._status.delete(name);
	}

	/**
	 * Get a registered client by site name.
	 *
	 * @param name - The site name
	 * @returns The {@link VergeClient} for the named site
	 * @throws {@link NotFoundError} if no site with that name is registered
	 */
	site(name: string): VergeClient {
		const client = this._clients.get(name);
		if (!client) {
			throw new NotFoundError('site', name, `Site '${name}' is not registered`);
		}
		return client;
	}

	/**
	 * Get all registered sites as a map of name → client.
	 * Returns a shallow copy — mutations do not affect the SiteManager.
	 */
	sites(): Map<string, VergeClient> {
		return new Map(this._clients);
	}

	/**
	 * Get passive health status for all registered sites.
	 * Returns a shallow copy — mutations do not affect the SiteManager.
	 */
	status(): Map<string, SiteStatus> {
		return new Map(this._status);
	}

	/**
	 * Get the tags for a registered site.
	 *
	 * @param name - The site name
	 * @returns The tags array, or an empty array if no tags are set
	 */
	getTags(name: string): string[] {
		return this._tags.get(name) ?? [];
	}

	/**
	 * Get a {@link CrossSiteReadProxy} that fans out read queries across all registered sites.
	 *
	 * Only exposes `list()` for each service — mutations must go through a named site.
	 *
	 * @example
	 * ```typescript
	 * const result = await manager.all.vms.list();
	 * for (const item of result.data) {
	 *   console.log(`${item.site}: ${item.resource.name}`);
	 * }
	 * ```
	 */
	get all(): CrossSiteReadProxy & CrossSiteServices {
		return new CrossSiteReadProxy(
			() => this.getClientsForSites(),
			(name, update) => this.updateSiteStatus(name, update),
		) as CrossSiteReadProxy & CrossSiteServices;
	}

	/**
	 * Get a {@link CrossSiteReadProxy} that fans out read queries across sites matching the given tag.
	 *
	 * Only exposes `list()` for each service — mutations must go through a named site.
	 *
	 * @param tag - The tag to filter sites by
	 * @returns A proxy that queries only sites with the specified tag
	 *
	 * @example
	 * ```typescript
	 * const result = await manager.tagged('production').vms.list();
	 * ```
	 */
	tagged(tag: string): CrossSiteReadProxy & CrossSiteServices {
		return new CrossSiteReadProxy(
			() => this.getClientsByTag(tag),
			(name, update) => this.updateSiteStatus(name, update),
		) as CrossSiteReadProxy & CrossSiteServices;
	}

	/**
	 * Get clients for the given site names, or all clients if no names provided.
	 * Used internally by CrossSiteReadProxy (Plan 12).
	 *
	 * @internal
	 * @param names - Optional list of site names to filter by
	 * @returns Map of name → client for the requested sites
	 */
	getClientsForSites(names?: string[]): Map<string, VergeClient> {
		if (!names) {
			return new Map(this._clients);
		}
		const result = new Map<string, VergeClient>();
		for (const name of names) {
			const client = this._clients.get(name);
			if (client) {
				result.set(name, client);
			}
		}
		return result;
	}

	/**
	 * Get clients for all sites that have the specified tag.
	 * Used internally by CrossSiteReadProxy (Plan 12).
	 *
	 * @internal
	 * @param tag - The tag to filter by
	 * @returns Map of name → client for sites with the tag
	 */
	getClientsByTag(tag: string): Map<string, VergeClient> {
		const result = new Map<string, VergeClient>();
		for (const [name, tags] of this._tags) {
			if (tags.includes(tag)) {
				const client = this._clients.get(name);
				if (client) {
					result.set(name, client);
				}
			}
		}
		return result;
	}

	/**
	 * Update the status for a site. Used by CrossSiteReadProxy (Plan 12)
	 * to report fan-out results.
	 *
	 * @internal
	 * @param name - The site name
	 * @param update - Partial status to merge into the existing status
	 */
	updateSiteStatus(name: string, update: Partial<SiteStatus>): void {
		const existing = this._status.get(name);
		if (existing) {
			Object.assign(existing, update);
		}
	}

	/**
	 * Check for duplicate site names (registered or pending) and throw if found.
	 */
	private _ensureUniqueName(name: string): void {
		if (this._clients.has(name) || this._pending.has(name)) {
			throw new ValidationError(`Site '${name}' is already registered`, 'name');
		}
	}

	/**
	 * Register a client with its name, tags, and initial status.
	 */
	private _registerSite(name: string, client: VergeClient, tags?: string[]): void {
		this._clients.set(name, client);
		this._tags.set(name, tags ?? []);
		this._status.set(name, {
			connected: true,
			version: client.serverVersion,
		});
	}
}
