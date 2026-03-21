/**
 * Machine Stats History Long service registration module.
 *
 * Importing this module registers the {@link MachineStatsHistoryLongService} on
 * {@link VergeClient}, making `client.machineStatsHistoryLong` available.
 * This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-stats-history-long';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MachineStatsHistoryLongService } from './service.js';

VergeClient.registerService('machineStatsHistoryLong', MachineStatsHistoryLongService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying long-term machine stats history (read-only). */
		readonly machineStatsHistoryLong: MachineStatsHistoryLongService;
	}
}

export { MachineStatsHistoryLongService } from './service.js';
export type { MachineStatsHistoryLong } from './types.js';
