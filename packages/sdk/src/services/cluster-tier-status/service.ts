import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { ClusterTierStatus } from './types.js';

/**
 * Service for querying VergeOS cluster tier health status.
 *
 * Provides health, redundancy, and repair state for per-cluster storage tiers.
 * This is a **read-only** service — status entries are managed by the system.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/cluster-tier-status';
 *
 * // Get health status for a specific cluster tier
 * const statuses = await client.clusterTierStatus.listByClusterTier(1);
 * for (const s of statuses) {
 *   console.log(`State: ${s.state}, Status: ${s.status}`);
 * }
 * ```
 */
export class ClusterTierStatusService extends ReadOnlyService<ClusterTierStatus> {
	constructor(http: HttpClient) {
		super(http, '/cluster_tier_status', 'Cluster Tier Status');
	}

	/**
	 * List status entries for a specific cluster tier.
	 *
	 * @param clusterTierKey - The key of the cluster tier to filter by.
	 * @returns Array of cluster tier status entries for the given cluster tier.
	 */
	async listByClusterTier(clusterTierKey: FlexKey): Promise<ClusterTierStatus[]> {
		return this.list({
			filter: `tier eq ${clusterTierKey}`,
		});
	}
}
