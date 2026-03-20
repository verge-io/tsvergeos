/**
 * Machine Device service registration module.
 *
 * Importing this module registers the {@link MachineDeviceService} on {@link VergeClient},
 * making `client.machineDevices` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-device';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MachineDeviceService } from './service.js';

VergeClient.registerService('machineDevices', MachineDeviceService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing machine devices. */
		readonly machineDevices: MachineDeviceService;
	}
}

export { MachineDeviceService } from './service.js';
export type {
	DeviceType,
	MachineDevice,
	MachineDeviceCreateParams,
	MachineDeviceUpdateParams,
	MachineType,
} from './types.js';
