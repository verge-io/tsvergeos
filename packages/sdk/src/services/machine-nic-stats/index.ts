/**
 * Machine NIC Stats service registration module.
 *
 * Importing this module registers the {@link MachineNicStatsService} on {@link VergeClient},
 * making `client.machineNicStats` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-nic-stats';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MachineNicStatsService } from './service.js';

VergeClient.registerService('machineNicStats', MachineNicStatsService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying machine NIC traffic statistics (read-only). */
		readonly machineNicStats: MachineNicStatsService;
	}
}

export { MachineNicStatsService } from './service.js';
export type { MachineNicStats } from './types.js';
