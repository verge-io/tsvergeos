import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { VolumeSync, VolumeSyncCreateParams, VolumeSyncUpdateParams } from './types.js';

/**
 * Service for managing VergeOS volume syncs.
 *
 * Volume syncs synchronize data between volumes within a NAS service. They are
 * children of NAS services (`vm_services`) and use 40-character SHA1 hash
 * strings as keys. Use {@link listByService} to list syncs for a specific
 * NAS service.
 *
 * Actions (`start_sync`, `stop_sync`) are dispatched via the dedicated
 * `/volume_sync_actions` endpoint with body key `sync`.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/volume-sync';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all volume syncs for a NAS service
 * const syncs = await client.volumeSyncs.listByService(42);
 *
 * // Start a sync
 * await client.volumeSyncs.startSync('abc123...');
 *
 * // Stop a sync
 * await client.volumeSyncs.stopSync('abc123...');
 * ```
 */
export class VolumeSyncService extends BaseService<
	VolumeSync,
	VolumeSyncCreateParams,
	VolumeSyncUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/volume_syncs', 'Volume Sync', {
			endpoint: 'volume_sync_actions',
			key: 'sync',
		});
	}

	/**
	 * List volume syncs belonging to a specific NAS service.
	 *
	 * Convenience method that filters by the `service` foreign key.
	 *
	 * @param serviceKey - The parent NAS service key (FK to `vm_services`)
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of volume syncs for the specified service
	 */
	async listByService(serviceKey: FlexKey, options?: ListOptions): Promise<VolumeSync[]> {
		const serviceFilter = `service eq '${serviceKey}'`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter
			? `${serviceFilter} and ${existingFilter}`
			: serviceFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}

	/**
	 * Start a volume sync.
	 *
	 * Dispatches the `start_sync` action to the `/volume_sync_actions` endpoint.
	 *
	 * @param key - The volume sync SHA1 key
	 */
	async startSync(key: string): Promise<void> {
		await this.dispatchAction('start_sync', key);
	}

	/**
	 * Stop a running volume sync.
	 *
	 * Dispatches the `stop_sync` action to the `/volume_sync_actions` endpoint.
	 *
	 * @param key - The volume sync SHA1 key
	 */
	async stopSync(key: string): Promise<void> {
		await this.dispatchAction('stop_sync', key);
	}
}
