import { NotFoundError } from "../../errors.js";
import type { HttpClient } from "../../http.js";
import type { FlexKey } from "../../types.js";
import { ReadOnlyService } from "../base.js";
import type { MachineNicStats } from "./types.js";

/**
 * Service for querying VergeOS machine NIC statistics.
 *
 * Provides per-NIC network traffic metrics including packets per second,
 * bytes per second, and cumulative counters. This is a **read-only** service —
 * stats entries are managed by the system and cannot be created,
 * updated, or deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/machine-nic-stats';
 *
 * // Get stats for a specific NIC
 * const stats = await client.machineNicStats.getByNic(3);
 * console.log(`TX: ${stats.txbps} bps, RX: ${stats.rxbps} bps`);
 * ```
 */
export class MachineNicStatsService extends ReadOnlyService<MachineNicStats> {
  constructor(http: HttpClient) {
    super(http, "/machine_nic_stats", "Machine NIC Stats");
  }

  /**
   * Get statistics for a specific NIC.
   *
   * Filters by `parent_nic eq {nicKey}` and returns the first matching result.
   * Throws {@link NotFoundError} if no stats entry exists for the given NIC.
   *
   * @param nicKey - The key of the machine NIC to look up stats for.
   * @returns The machine NIC stats resource.
   * @throws {@link NotFoundError} If no stats exist for the specified NIC.
   */
  async getByNic(nicKey: FlexKey): Promise<MachineNicStats> {
    const results = await this.list({
      filter: `parent_nic eq ${nicKey}`,
    });

    if (results.length === 0) {
      throw new NotFoundError(this.displayName, nicKey);
    }

    return results[0] as MachineNicStats;
  }
}
