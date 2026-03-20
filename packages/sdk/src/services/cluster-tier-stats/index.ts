/**
 * Cluster Tier Stats service registration module.
 *
 * Importing this module registers the {@link ClusterTierStatsService} on {@link VergeClient},
 * making `client.clusterTierStats` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/cluster-tier-stats';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { ClusterTierStatsService } from './service.js';

VergeClient.registerService('clusterTierStats', ClusterTierStatsService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying cluster tier I/O statistics (read-only). */
		readonly clusterTierStats: ClusterTierStatsService;
	}
}

export { ClusterTierStatsService } from './service.js';
export type { ClusterTierStats } from './types.js';
