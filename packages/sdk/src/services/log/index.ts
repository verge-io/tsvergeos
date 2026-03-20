/**
 * Log service registration module.
 *
 * Importing this module registers the {@link LogService} on {@link VergeClient},
 * making `client.logs` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/log';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { LogService } from './service.js';

VergeClient.registerService('logs', LogService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying VergeOS system logs. */
		readonly logs: LogService;
	}
}

export { LogService } from './service.js';
export type { Log, LogLevel, LogObjectType } from './types.js';
