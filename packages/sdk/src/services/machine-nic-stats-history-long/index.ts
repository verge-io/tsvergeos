/**
 * Machine NIC Stats History Long service registration module.
 *
 * Importing this module registers the {@link MachineNicStatsHistoryLongService} on
 * {@link VergeClient}, making `client.machineNicStatsHistoryLong` available.
 * This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-nic-stats-history-long';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MachineNicStatsHistoryLongService } from './service.js';

VergeClient.registerService('machineNicStatsHistoryLong', MachineNicStatsHistoryLongService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying long-term machine NIC stats history (read-only). */
		readonly machineNicStatsHistoryLong: MachineNicStatsHistoryLongService;
	}
}

export { MachineNicStatsHistoryLongService } from './service.js';
export type { MachineNicStatsHistoryLong } from './types.js';
