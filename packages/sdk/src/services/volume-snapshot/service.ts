import type { HttpClient } from '../../http.js';
import type { ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	VolumeSnapshot,
	VolumeSnapshotCreateParams,
	VolumeSnapshotUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS volume snapshots.
 *
 * Volume snapshots capture the state of a volume at a point in time.
 * Unlike volumes (which use SHA1 string keys), volume snapshots use
 * standard integer keys. Use {@link listByVolume} to list snapshots
 * for a specific volume.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/volume-snapshot';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all snapshots for a specific volume
 * const snapshots = await client.volumeSnapshots.listByVolume('0d25c256a0c561c0b5bb9087f04fcb49f16a8048');
 *
 * // Get a specific snapshot
 * const snap = await client.volumeSnapshots.get(1);
 * ```
 */
export class VolumeSnapshotService extends BaseService<
	VolumeSnapshot,
	VolumeSnapshotCreateParams,
	VolumeSnapshotUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/volume_snapshots', 'Volume Snapshot');
	}

	/**
	 * List snapshots belonging to a specific volume.
	 *
	 * Convenience method that filters by the `volume` foreign key.
	 * The volume key is a 40-character SHA1 hash string, which is
	 * properly quoted in the filter expression.
	 *
	 * @param volumeKey - The parent volume's SHA1 key
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of snapshots for the specified volume
	 */
	async listByVolume(volumeKey: string, options?: ListOptions): Promise<VolumeSnapshot[]> {
		const volumeFilter = `volume eq '${volumeKey}'`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${volumeFilter} and ${existingFilter}` : volumeFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
