import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { MachineNIC, MachineNICCreateParams, MachineNICUpdateParams } from './types.js';

/**
 * Service for managing VergeOS machine NICs.
 *
 * Machine NICs represent virtual network interfaces attached to a machine
 * (VM or physical node). Use {@link listByMachine} to list NICs for a
 * specific machine.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/machine-nic';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all NICs for a specific VM
 * const nics = await client.machineNics.listByMachine(42);
 *
 * // Get a specific NIC
 * const nic = await client.machineNics.get(1);
 * ```
 */
export class MachineNicService extends BaseService<
	MachineNIC,
	MachineNICCreateParams,
	MachineNICUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/machine_nics', 'Machine NIC');
	}

	/**
	 * List NICs belonging to a specific machine.
	 *
	 * Convenience method that filters by the `machine` foreign key.
	 *
	 * @param machineKey - The parent machine ID (VM or node)
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of NICs for the specified machine
	 */
	async listByMachine(machineKey: FlexKey, options?: ListOptions): Promise<MachineNIC[]> {
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
