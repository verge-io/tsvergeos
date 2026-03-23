import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { MachineNicStatsHistoryLong } from './types.js';

/**
 * Service for querying long-term machine NIC stats history.
 *
 * Provides access to long-term historical per-NIC network traffic
 * metrics including aggregate averages and peaks for packet rates
 * and data rates. This is a **read-only** service — history entries
 * are managed by the system and cannot be created, updated, or
 * deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/machine-nic-stats-history-long';
 *
 * // Get long-term NIC history for a specific NIC
 * const history = await client.machineNicStatsHistoryLong.listByNic(10);
 * for (const snapshot of history) {
 *   console.log(`TX avg: ${snapshot.txbps_avg} bps (peak: ${snapshot.txbps_peak}) at ${snapshot.timestamp}`);
 * }
 * ```
 */
export class MachineNicStatsHistoryLongService extends ReadOnlyService<MachineNicStatsHistoryLong> {
	constructor(http: HttpClient) {
		super(http, '/machine_nic_stats_history_long', 'Machine NIC Stats History Long');
	}

	/**
	 * List long-term NIC stats history for a specific NIC.
	 *
	 * Filters by `parent_nic eq {nicKey}` and returns all matching history entries.
	 * Additional list options (fields, sort, limit, etc.) are merged with the filter.
	 *
	 * @param nicKey - The key of the machine NIC to retrieve history for.
	 * @param options - Optional list parameters to merge with the NIC filter.
	 * @returns An array of long-term NIC stats history entries for the NIC.
	 */
	async listByNic(nicKey: FlexKey, options?: ListOptions): Promise<MachineNicStatsHistoryLong[]> {
		return this.list({
			...options,
			filter: `parent_nic eq ${nicKey}`,
		});
	}
}
