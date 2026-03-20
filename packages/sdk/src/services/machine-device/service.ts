import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	MachineDevice,
	MachineDeviceCreateParams,
	MachineDeviceUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS machine devices.
 *
 * Machine devices represent hardware or virtual devices attached to a machine
 * (VM or physical node), including GPUs, TPMs, USB devices, PCI devices,
 * and SR-IOV NICs. Use {@link listByMachine} to list devices for a
 * specific machine.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/machine-device';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all devices for a specific VM
 * const devices = await client.machineDevices.listByMachine(42);
 *
 * // Create a TPM device
 * const tpm = await client.machineDevices.create({
 *   machine: 42,
 *   type: 'tpm',
 *   name: 'TPM 2.0',
 * });
 * ```
 */
export class MachineDeviceService extends BaseService<
	MachineDevice,
	MachineDeviceCreateParams,
	MachineDeviceUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/machine_devices', 'Machine Device');
	}

	/**
	 * List devices belonging to a specific machine.
	 *
	 * Convenience method that filters by the `machine` foreign key.
	 *
	 * @param machineKey - The parent machine ID (VM or node)
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of devices for the specified machine
	 */
	async listByMachine(machineKey: FlexKey, options?: ListOptions): Promise<MachineDevice[]> {
		const machineFilter = `machine eq ${machineKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter
			? `${machineFilter} and ${existingFilter}`
			: machineFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
