/**
 * Machine Drive Phys service registration module.
 *
 * Importing this module registers the {@link MachineDrivePhysService} on {@link VergeClient},
 * making `client.machineDrivePhys` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-drive-phys';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MachineDrivePhysService } from './service.js';

VergeClient.registerService('machineDrivePhys', MachineDrivePhysService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying physical drive hardware information (read-only). */
		readonly machineDrivePhys: MachineDrivePhysService;
	}
}

export { MachineDrivePhysService } from './service.js';
export type { LocateStatus, MachineDrivePhys } from './types.js';
