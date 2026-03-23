import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { MachineNicStatsHistoryShort } from './types.js';

/**
 * Service for querying short-term machine NIC stats history.
 *
 * Provides access to short-term historical per-NIC network traffic
 * metrics including packet rates, data rates, and cumulative counters.
 * This is a **read-only** service — history entries are managed by
 * the system and cannot be created, updated, or deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/machine-nic-stats-history-short';
 *
 * // Get short-term NIC history for a specific NIC
 * const history = await client.machineNicStatsHistoryShort.listByNic(10);
 * for (const snapshot of history) {
 *   console.log(`TX: ${snapshot.txbps} bps, RX: ${snapshot.rxbps} bps at ${snapshot.timestamp}`);
 * }
 * ```
 */
export class MachineNicStatsHistoryShortService extends ReadOnlyService<MachineNicStatsHistoryShort> {
	constructor(http: HttpClient) {
		super(http, '/machine_nic_stats_history_short', 'Machine NIC Stats History Short');
	}

	/**
	 * List short-term NIC stats history for a specific NIC.
	 *
	 * Filters by `parent_nic eq {nicKey}` and returns all matching history entries.
	 * Additional list options (fields, sort, limit, etc.) are merged with the filter.
	 *
	 * @param nicKey - The key of the machine NIC to retrieve history for.
	 * @param options - Optional list parameters to merge with the NIC filter.
	 * @returns An array of short-term NIC stats history entries for the NIC.
	 */
	async listByNic(nicKey: FlexKey, options?: ListOptions): Promise<MachineNicStatsHistoryShort[]> {
		return this.list({
			...options,
			filter: `parent_nic eq ${nicKey}`,
		});
	}
}
