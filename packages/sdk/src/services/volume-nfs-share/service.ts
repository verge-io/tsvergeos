import type { HttpClient } from "../../http.js";
import type { ListOptions } from "../../types.js";
import { BaseService } from "../base.js";
import type {
  VolumeNFSShare,
  VolumeNFSShareCreateParams,
  VolumeNFSShareUpdateParams,
} from "./types.js";

/**
 * Service for managing VergeOS NFS shares.
 *
 * NFS shares expose volume paths via the NFS protocol. They are children
 * of volumes and use 40-character SHA1 hash strings as keys. Use
 * {@link listByVolume} to list shares for a specific volume.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/volume-nfs-share';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all NFS shares for a specific volume
 * const shares = await client.volumeNfsShares.listByVolume('0d25c256a0c561c0b5bb9087f04fcb49f16a8048');
 *
 * // Get a specific NFS share
 * const share = await client.volumeNfsShares.get('abc123...');
 * ```
 */
export class VolumeNFSShareService extends BaseService<
  VolumeNFSShare,
  VolumeNFSShareCreateParams,
  VolumeNFSShareUpdateParams
> {
  constructor(http: HttpClient) {
    super(http, "/volume_nfs_shares", "NFS Share");
  }

  /**
   * List NFS shares belonging to a specific volume.
   *
   * Convenience method that filters by the `volume` foreign key.
   * The volume key is a 40-character SHA1 hash string, which is
   * properly quoted in the filter expression.
   *
   * @param volumeKey - The parent volume's SHA1 key
   * @param options - Additional list options (filter, sort, fields, pagination)
   * @returns Array of NFS shares for the specified volume
   */
  async listByVolume(
    volumeKey: string,
    options?: ListOptions,
  ): Promise<VolumeNFSShare[]> {
    const volumeFilter = `volume eq '${volumeKey}'`;
    const existingFilter = options?.filter;
    const combinedFilter = existingFilter
      ? `${volumeFilter} and ${existingFilter}`
      : volumeFilter;

    return this.list({
      ...options,
      filter: combinedFilter,
    });
  }
}
