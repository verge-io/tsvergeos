/**
 * System service registration module.
 *
 * Importing this module registers the {@link SystemService} on {@link VergeClient},
 * making `client.system` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/system';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { SystemService } from './service.js';

VergeClient.registerService('system', SystemService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for accessing VergeOS system information and version data. */
		readonly system: SystemService;
	}
}

export { SystemService } from './service.js';
export type { System, SystemUpdateParams, VersionInfo } from './types.js';
