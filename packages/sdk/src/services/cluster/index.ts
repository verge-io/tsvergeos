/**
 * Cluster service registration module.
 *
 * Importing this module registers the {@link ClusterService} on {@link VergeClient},
 * making `client.clusters` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/cluster';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { ClusterService } from './service.js';

VergeClient.registerService('clusters', ClusterService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing VergeOS clusters. */
		readonly clusters: ClusterService;
	}
}

export { ClusterService } from './service.js';
export type {
	Cluster,
	ClusterCreateParams,
	ClusterUpdateParams,
	CpuType,
	EnergyPerfPolicy,
	ScalingGovernor,
} from './types.js';
