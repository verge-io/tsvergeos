import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { ClusterTierStats } from './types.js';

/**
 * Service for querying VergeOS cluster tier I/O statistics.
 *
 * Provides per-cluster-tier I/O metrics (reads, writes, throughput). This is a
 * **read-only** service — stats entries are managed by the system.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/cluster-tier-stats';
 *
 * // Get I/O stats for a specific cluster tier
 * const stats = await client.clusterTierStats.listByClusterTier(1);
 * for (const s of stats) {
 *   console.log(`IOPS: ${s.rops} read, ${s.wops} write`);
 * }
 * ```
 */
export class ClusterTierStatsService extends ReadOnlyService<ClusterTierStats> {
	constructor(http: HttpClient) {
		super(http, '/cluster_tier_stats', 'Cluster Tier Stats');
	}

	/**
	 * List stats for a specific cluster tier.
	 *
	 * @param clusterTierKey - The key of the cluster tier to filter by.
	 * @returns Array of cluster tier stats for the given cluster tier.
	 */
	async listByClusterTier(clusterTierKey: FlexKey): Promise<ClusterTierStats[]> {
		return this.list({
			filter: `tier eq ${clusterTierKey}`,
		});
	}
}
