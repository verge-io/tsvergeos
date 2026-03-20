import { NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { MachineDrivePhys } from './types.js';

/**
 * Service for querying VergeOS physical drive information.
 *
 * Provides hardware details for physical drives including SMART data,
 * temperature, wear level, vSAN status, and partition layout. This is a
 * **read-only** service — phys entries are managed by the system and
 * cannot be created, updated, or deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/machine-drive-phys';
 *
 * // Get physical info for a specific drive
 * const phys = await client.machineDrivePhys.getByDrive(5);
 * console.log(`Model: ${phys.model}, Temp: ${phys.temp}°C`);
 * ```
 */
export class MachineDrivePhysService extends ReadOnlyService<MachineDrivePhys> {
	constructor(http: HttpClient) {
		super(http, '/machine_drive_phys', 'Machine Drive Phys');
	}

	/**
	 * Get physical drive info for a specific machine drive.
	 *
	 * Filters by `parent_drive eq {driveKey}` and returns the first matching result.
	 * Throws {@link NotFoundError} if no phys entry exists for the given drive.
	 *
	 * @param driveKey - The key of the machine drive to look up physical info for.
	 * @returns The machine drive phys resource.
	 * @throws {@link NotFoundError} If no phys entry exists for the specified drive.
	 */
	async getByDrive(driveKey: FlexKey): Promise<MachineDrivePhys> {
		const results = await this.list({
			filter: `parent_drive eq ${driveKey}`,
		});

		if (results.length === 0) {
			throw new NotFoundError(this.displayName, driveKey);
		}

		return results[0] as MachineDrivePhys;
	}
}
