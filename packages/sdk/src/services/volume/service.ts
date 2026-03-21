import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	Volume,
	VolumeCreateParams,
	VolumeRestoreOptions,
	VolumeUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS volumes.
 *
 * Volumes are NAS storage resources. Unlike most VergeOS resources, volumes use
 * 40-character SHA1 hash strings as keys instead of integers. The `service` FK
 * links each volume to its parent NAS service.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/volume';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all volumes
 * const volumes = await client.volumes.list();
 *
 * // Get a volume by its SHA1 key
 * const vol = await client.volumes.get('0d25c256a0c561c0b5bb9087f04fcb49f16a8048');
 *
 * // Enable/disable a volume
 * await client.volumes.enable(vol.$key);
 * await client.volumes.disable(vol.$key);
 * ```
 */
export class VolumeService extends BaseService<Volume, VolumeCreateParams, VolumeUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/volumes', 'Volume');
	}

	/**
	 * Enable a volume.
	 *
	 * @param key - The volume SHA1 key
	 */
	async enable(key: FlexKey): Promise<void> {
		await this.dispatchAction('enable', key);
	}

	/**
	 * Disable a volume.
	 *
	 * @param key - The volume SHA1 key
	 */
	async disable(key: FlexKey): Promise<void> {
		await this.dispatchAction('disable', key);
	}

	/**
	 * Reset a volume.
	 *
	 * @param key - The volume SHA1 key
	 */
	async reset(key: FlexKey): Promise<void> {
		await this.dispatchAction('reset', key);
	}

	/**
	 * Restore a volume from its snapshot.
	 *
	 * Uses a custom POST body because the `restore_type` field sits at the
	 * top level of the action payload rather than inside `params`.
	 *
	 * @param key - The volume SHA1 key
	 * @param options - Optional restore options (restore type)
	 */
	async restore(key: FlexKey, options?: VolumeRestoreOptions): Promise<void> {
		const body: Record<string, unknown> = {
			[this.actionConfig.key]: key,
			action: 'restore',
		};
		if (options?.restoreType) {
			body.restore_type = options.restoreType;
		}
		await this.http.post(`/${this.actionConfig.endpoint}`, { body });
	}

	/**
	 * Clone a volume.
	 *
	 * @param key - The volume SHA1 key
	 */
	async clone(key: FlexKey): Promise<void> {
		await this.dispatchAction('clone', key);
	}

	/**
	 * Recover a volume from a cloud snapshot.
	 *
	 * @param key - The volume SHA1 key
	 */
	async recoverCloudSnapshot(key: FlexKey): Promise<void> {
		await this.dispatchAction('recover_cloudsnapshot', key);
	}
}
