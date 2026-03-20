import type { HttpClient } from '../../http.js';
import type { ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	VolumeCIFSShare,
	VolumeCIFSShareCreateParams,
	VolumeCIFSShareUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS CIFS shares.
 *
 * CIFS shares expose volume paths via the SMB protocol. They are children
 * of volumes and use 40-character SHA1 hash strings as keys. Use
 * {@link listByVolume} to list shares for a specific volume.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/volume-cifs-share';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all CIFS shares for a specific volume
 * const shares = await client.volumeCifsShares.listByVolume('0d25c256a0c561c0b5bb9087f04fcb49f16a8048');
 *
 * // Get a specific CIFS share
 * const share = await client.volumeCifsShares.get('abc123...');
 * ```
 */
export class VolumeCIFSShareService extends BaseService<
	VolumeCIFSShare,
	VolumeCIFSShareCreateParams,
	VolumeCIFSShareUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/volume_cifs_shares', 'CIFS Share');
	}

	/**
	 * List CIFS shares belonging to a specific volume.
	 *
	 * Convenience method that filters by the `volume` foreign key.
	 * The volume key is a 40-character SHA1 hash string, which is
	 * properly quoted in the filter expression.
	 *
	 * @param volumeKey - The parent volume's SHA1 key
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of CIFS shares for the specified volume
	 */
	async listByVolume(volumeKey: string, options?: ListOptions): Promise<VolumeCIFSShare[]> {
		const volumeFilter = `volume eq '${volumeKey}'`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${volumeFilter} and ${existingFilter}` : volumeFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
