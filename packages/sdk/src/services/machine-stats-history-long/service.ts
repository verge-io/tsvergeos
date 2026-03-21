import type { HttpClient } from "../../http.js";
import type { FlexKey, ListOptions } from "../../types.js";
import { ReadOnlyService } from "../base.js";
import type { MachineStatsHistoryLong } from "./types.js";

/**
 * Service for querying long-term machine stats history.
 *
 * Provides access to long-term historical CPU and RAM utilization
 * metrics per machine, including aggregate peaks and averages. This is a
 * **read-only** service — history entries are managed by the system and
 * cannot be created, updated, or deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/machine-stats-history-long';
 *
 * // Get long-term history for a specific machine
 * const history = await client.machineStatsHistoryLong.listByMachine(42);
 * for (const snapshot of history) {
 *   console.log(`CPU: ${snapshot.total_cpu}%, avg core: ${snapshot.core_average}`);
 * }
 * ```
 */
export class MachineStatsHistoryLongService extends ReadOnlyService<MachineStatsHistoryLong> {
  constructor(http: HttpClient) {
    super(http, "/machine_stats_history_long", "Machine Stats History Long");
  }

  /**
   * List long-term stats history for a specific machine.
   *
   * Filters by `machine eq {machineKey}` and returns all matching history entries.
   * Additional list options (fields, sort, limit, etc.) are merged with the filter.
   *
   * @param machineKey - The key of the machine to retrieve history for.
   * @param options - Optional list parameters to merge with the machine filter.
   * @returns An array of long-term stats history entries for the machine.
   */
  async listByMachine(
    machineKey: FlexKey,
    options?: ListOptions,
  ): Promise<MachineStatsHistoryLong[]> {
    return this.list({
      ...options,
      filter: `machine eq ${machineKey}`,
    });
  }
}
