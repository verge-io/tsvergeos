import { NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { MachineDriveStats } from './types.js';

/**
 * Service for querying VergeOS machine drive statistics.
 *
 * Provides per-drive I/O performance metrics including throughput,
 * IOPS, utilization, and capacity. This is a **read-only** service —
 * stats entries are managed by the system and cannot be created,
 * updated, or deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/machine-drive-stats';
 *
 * // Get stats for a specific drive
 * const stats = await client.machineDriveStats.getByDrive(7);
 * console.log(`IOPS: ${stats.rops} read, ${stats.wops} write`);
 *
 * // List only physical drive stats
 * const physical = await client.machineDriveStats.listPhysical();
 * ```
 */
export class MachineDriveStatsService extends ReadOnlyService<MachineDriveStats> {
	constructor(http: HttpClient) {
		super(http, '/machine_drive_stats', 'Machine Drive Stats');
	}

	/**
	 * Get statistics for a specific drive.
	 *
	 * Filters by `parent_drive eq {driveKey}` and returns the first matching result.
	 * Throws {@link NotFoundError} if no stats entry exists for the given drive.
	 *
	 * @param driveKey - The key of the machine drive to look up stats for.
	 * @returns The machine drive stats resource.
	 * @throws {@link NotFoundError} If no stats exist for the specified drive.
	 */
	async getByDrive(driveKey: FlexKey): Promise<MachineDriveStats> {
		const results = await this.list({
			filter: `parent_drive eq ${driveKey}`,
		});

		if (results.length === 0) {
			throw new NotFoundError(this.displayName, driveKey);
		}

		return results[0] as MachineDriveStats;
	}

	/**
	 * List statistics for physical drives only.
	 *
	 * Filters by `physical eq true` to return only physical (non-virtual) drive stats.
	 *
	 * @returns Array of physical drive stats resources.
	 */
	async listPhysical(): Promise<MachineDriveStats[]> {
		return this.list({
			filter: 'physical eq true',
		});
	}
}
