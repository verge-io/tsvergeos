import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { MachineDrive, MachineDriveCreateParams, MachineDriveUpdateParams } from './types.js';

/**
 * Service for managing VergeOS machine drives.
 *
 * Machine drives represent virtual disks and storage devices attached to a
 * machine (VM or physical node). Use {@link listByMachine} to list drives
 * for a specific machine.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/machine-drive';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all drives for a specific VM
 * const drives = await client.machineDrives.listByMachine(42);
 *
 * // Get a specific drive
 * const drive = await client.machineDrives.get(1);
 * ```
 */
export class MachineDriveService extends BaseService<
	MachineDrive,
	MachineDriveCreateParams,
	MachineDriveUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/machine_drives', 'Machine Drive');
	}

	/**
	 * List drives belonging to a specific machine.
	 *
	 * Convenience method that filters by the `machine` foreign key.
	 *
	 * @param machineKey - The parent machine ID (VM or node)
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of drives for the specified machine
	 */
	async listByMachine(machineKey: FlexKey, options?: ListOptions): Promise<MachineDrive[]> {
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
