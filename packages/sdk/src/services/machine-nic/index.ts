/**
 * Machine NIC service registration module.
 *
 * Importing this module registers the {@link MachineNicService} on {@link VergeClient},
 * making `client.machineNics` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-nic';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MachineNicService } from './service.js';

VergeClient.registerService('machineNics', MachineNicService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing machine NICs. */
		readonly machineNics: MachineNicService;
	}
}

export { MachineNicService } from './service.js';
export type {
	MachineNIC,
	MachineNICCreateParams,
	MachineNICUpdateParams,
	NicInterface,
} from './types.js';
