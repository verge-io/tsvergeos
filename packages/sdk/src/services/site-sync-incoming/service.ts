import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	SiteSyncIncoming,
	SiteSyncIncomingCreateParams,
	SiteSyncIncomingUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS incoming site syncs.
 *
 * Incoming syncs receive snapshot data from remote sites. Each incoming sync
 * generates a registration code that is used to pair with the corresponding
 * outgoing sync on the remote system.
 *
 * Actions use the dedicated `/site_syncs_incoming_actions` endpoint with
 * FK field `site_syncs_incoming`.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/site-sync-incoming';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all incoming syncs
 * const syncs = await client.siteSyncsIncoming.list();
 *
 * // List incoming syncs for a specific site
 * const siteSyncs = await client.siteSyncsIncoming.listBySite(1);
 *
 * // Regenerate registration code
 * await client.siteSyncsIncoming.regenerate(1);
 * ```
 */
export class SiteSyncIncomingService extends BaseService<
	SiteSyncIncoming,
	SiteSyncIncomingCreateParams,
	SiteSyncIncomingUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/site_syncs_incoming', 'Incoming Sync');
	}

	/**
	 * List incoming syncs belonging to a specific site.
	 *
	 * @param siteKey - The site ID to filter by
	 * @param options - Additional list options (fields, sort, limit, etc.)
	 * @returns Array of incoming syncs for the given site
	 */
	async listBySite(siteKey: FlexKey, options?: ListOptions): Promise<SiteSyncIncoming[]> {
		const siteFilter = `site eq ${siteKey}`;
		const filter = options?.filter ? `(${options.filter}) and ${siteFilter}` : siteFilter;
		return this.list({ ...options, filter });
	}

	/**
	 * Regenerate the registration code for an incoming sync.
	 *
	 * @param key - The incoming sync ID
	 */
	async regenerate(key: FlexKey): Promise<void> {
		await this.dispatchAction('regenerate', key);
	}

	/**
	 * Enable an incoming sync.
	 *
	 * @param key - The incoming sync ID
	 */
	async enable(key: FlexKey): Promise<void> {
		await this.dispatchAction('enable', key);
	}

	/**
	 * Disable an incoming sync.
	 *
	 * @param key - The incoming sync ID
	 */
	async disable(key: FlexKey): Promise<void> {
		await this.dispatchAction('disable', key);
	}
}
