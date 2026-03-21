/**
 * Machine Log service registration module.
 *
 * Importing this module registers the {@link MachineLogService} on {@link VergeClient},
 * making `client.machineLogs` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-log';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MachineLogService } from './service.js';

VergeClient.registerService('machineLogs', MachineLogService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying machine log entries (read-only). */
		readonly machineLogs: MachineLogService;
	}
}

export { MachineLogService } from './service.js';
export type { MachineLog, MachineLogLevel } from './types.js';
