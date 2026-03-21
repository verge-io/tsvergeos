import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { MachineStatsHistoryShort } from './types.js';

/**
 * Service for querying short-term machine stats history.
 *
 * Provides access to short-term historical CPU and RAM utilization
 * metrics per machine. This is a **read-only** service — history entries
 * are managed by the system and cannot be created, updated, or deleted
 * via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/machine-stats-history-short';
 *
 * // Get short-term history for a specific machine
 * const history = await client.machineStatsHistoryShort.listByMachine(42);
 * for (const snapshot of history) {
 *   console.log(`CPU: ${snapshot.total_cpu}% at ${snapshot.timestamp}`);
 * }
 * ```
 */
export class MachineStatsHistoryShortService extends ReadOnlyService<MachineStatsHistoryShort> {
	constructor(http: HttpClient) {
		super(http, '/machine_stats_history_short', 'Machine Stats History Short');
	}

	/**
	 * List short-term stats history for a specific machine.
	 *
	 * Filters by `machine eq {machineKey}` and returns all matching history entries.
	 * Additional list options (fields, sort, limit, etc.) are merged with the filter.
	 *
	 * @param machineKey - The key of the machine to retrieve history for.
	 * @param options - Optional list parameters to merge with the machine filter.
	 * @returns An array of short-term stats history entries for the machine.
	 */
	async listByMachine(
		machineKey: FlexKey,
		options?: ListOptions,
	): Promise<MachineStatsHistoryShort[]> {
		return this.list({
			...options,
			filter: `machine eq ${machineKey}`,
		});
	}
}
