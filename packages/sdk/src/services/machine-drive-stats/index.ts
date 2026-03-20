/**
 * Machine Drive Stats service registration module.
 *
 * Importing this module registers the {@link MachineDriveStatsService} on {@link VergeClient},
 * making `client.machineDriveStats` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-drive-stats';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MachineDriveStatsService } from './service.js';

VergeClient.registerService('machineDriveStats', MachineDriveStatsService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying machine drive I/O statistics (read-only). */
		readonly machineDriveStats: MachineDriveStatsService;
	}
}

export { MachineDriveStatsService } from './service.js';
export type { MachineDriveStats } from './types.js';
