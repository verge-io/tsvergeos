import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type { Site, SiteCreateParams, SiteUpdateParams } from './types.js';

/**
 * Service for managing VergeOS remote sites.
 *
 * Sites are trusted peer VergeOS systems used for disaster recovery,
 * backup, and synchronization. Actions use the dedicated `/site_actions`
 * endpoint.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/site';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all remote sites
 * const sites = await client.sites.list();
 *
 * // Add a remote site
 * const site = await client.sites.create({
 *   url: 'https://remote-verge.example.com',
 *   name: 'DR Site',
 *   auth_user: 'admin',
 *   auth_password: 'secret',
 * });
 *
 * // Refresh site data
 * await client.sites.refresh(site.$key);
 * ```
 */
export class SiteService extends BaseService<Site, SiteCreateParams, SiteUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/sites', 'Site');
	}

	/**
	 * Refresh site data from the remote system.
	 *
	 * @param key - The site ID
	 */
	async refresh(key: FlexKey): Promise<void> {
		await this.dispatchAction('refresh', key);
	}

	/**
	 * Refresh site settings from the remote system.
	 *
	 * @param key - The site ID
	 */
	async refreshSettings(key: FlexKey): Promise<void> {
		await this.dispatchAction('refresh_settings', key);
	}

	/**
	 * Reauthenticate with the remote site.
	 *
	 * @param key - The site ID
	 */
	async reauthenticate(key: FlexKey): Promise<void> {
		await this.dispatchAction('reauthenticate', key);
	}

	/**
	 * Trigger updates to run on the remote site.
	 *
	 * @param key - The site ID
	 */
	async runUpdates(key: FlexKey): Promise<void> {
		await this.dispatchAction('run_updates', key);
	}

	/**
	 * Clear synced logs from the remote site.
	 *
	 * @param key - The site ID
	 */
	async clearSyncedLogs(key: FlexKey): Promise<void> {
		await this.dispatchAction('clear_synced_logs', key);
	}
}
