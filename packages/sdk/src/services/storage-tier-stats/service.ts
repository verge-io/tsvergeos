import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { StorageTierStats } from './types.js';

/**
 * Service for querying VergeOS storage tier I/O statistics.
 *
 * Provides per-tier I/O metrics (reads, writes, throughput). This is a
 * **read-only** service — stats entries are managed by the system.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/storage-tier-stats';
 *
 * // Get I/O stats for a specific storage tier
 * const stats = await client.storageTierStats.listByTier(1);
 * for (const s of stats) {
 *   console.log(`IOPS: ${s.rops} read, ${s.wops} write`);
 * }
 * ```
 */
export class StorageTierStatsService extends ReadOnlyService<StorageTierStats> {
	constructor(http: HttpClient) {
		super(http, '/storage_tier_stats', 'Storage Tier Stats');
	}

	/**
	 * List stats for a specific storage tier.
	 *
	 * @param storageTierKey - The key of the storage tier to filter by.
	 * @returns Array of storage tier stats for the given tier.
	 */
	async listByTier(storageTierKey: FlexKey): Promise<StorageTierStats[]> {
		return this.list({
			filter: `tier eq ${storageTierKey}`,
		});
	}
}
