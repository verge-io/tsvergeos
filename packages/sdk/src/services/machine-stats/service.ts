import { NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { MachineStats } from './types.js';

/**
 * Service for querying VergeOS machine statistics.
 *
 * Provides per-machine CPU and RAM utilization metrics. This is a
 * **read-only** service — stats entries are managed by the system
 * and cannot be created, updated, or deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/machine-stats';
 *
 * // Get stats for a specific machine
 * const stats = await client.machineStats.getByMachine(42);
 * console.log(`CPU: ${stats.total_cpu}%, RAM: ${stats.ram_pct}%`);
 * ```
 */
export class MachineStatsService extends ReadOnlyService<MachineStats> {
	constructor(http: HttpClient) {
		super(http, '/machine_stats', 'Machine Stats');
	}

	/**
	 * Get statistics for a specific machine.
	 *
	 * Filters by `machine eq {machineKey}` and returns the first matching result.
	 * Throws {@link NotFoundError} if no stats entry exists for the given machine.
	 *
	 * @param machineKey - The key of the machine to look up stats for.
	 * @returns The machine stats resource.
	 * @throws {@link NotFoundError} If no stats exist for the specified machine.
	 */
	async getByMachine(machineKey: FlexKey): Promise<MachineStats> {
		const results = await this.list({
			filter: `machine eq ${machineKey}`,
		});

		if (results.length === 0) {
			throw new NotFoundError(this.displayName, machineKey);
		}

		return results[0] as MachineStats;
	}
}
