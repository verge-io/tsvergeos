/**
 * Machine Drive service registration module.
 *
 * Importing this module registers the {@link MachineDriveService} on {@link VergeClient},
 * making `client.machineDrives` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-drive';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MachineDriveService } from './service.js';

VergeClient.registerService('machineDrives', MachineDriveService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing machine drives. */
		readonly machineDrives: MachineDriveService;
	}
}

export { MachineDriveService } from './service.js';
export type {
	DriveInterface,
	DriveMedia,
	DriveOptimize,
	MachineDrive,
	MachineDriveCreateParams,
	MachineDriveUpdateParams,
} from './types.js';
