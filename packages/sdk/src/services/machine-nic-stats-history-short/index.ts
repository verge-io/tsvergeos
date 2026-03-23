/**
 * Machine NIC Stats History Short service registration module.
 *
 * Importing this module registers the {@link MachineNicStatsHistoryShortService} on
 * {@link VergeClient}, making `client.machineNicStatsHistoryShort` available.
 * This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-nic-stats-history-short';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MachineNicStatsHistoryShortService } from './service.js';

VergeClient.registerService('machineNicStatsHistoryShort', MachineNicStatsHistoryShortService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying short-term machine NIC stats history (read-only). */
		readonly machineNicStatsHistoryShort: MachineNicStatsHistoryShortService;
	}
}

export { MachineNicStatsHistoryShortService } from './service.js';
export type { MachineNicStatsHistoryShort } from './types.js';
