/**
 * Cluster Tier Status service registration module.
 *
 * Importing this module registers the {@link ClusterTierStatusService} on {@link VergeClient},
 * making `client.clusterTierStatus` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/cluster-tier-status';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { ClusterTierStatusService } from './service.js';

VergeClient.registerService('clusterTierStatus', ClusterTierStatusService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying cluster tier health and redundancy status (read-only). */
		readonly clusterTierStatus: ClusterTierStatusService;
	}
}

export { ClusterTierStatusService } from './service.js';
export type {
	ClusterTierState,
	ClusterTierStatus,
	ClusterTierStatusValue,
} from './types.js';
