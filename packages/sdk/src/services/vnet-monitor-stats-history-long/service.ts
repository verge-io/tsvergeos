import type { HttpClient } from "../../http.js";
import type { FlexKey, ListOptions } from "../../types.js";
import { ReadOnlyService } from "../base.js";
import type { VnetMonitorStatsHistoryLong } from "./types.js";

/**
 * Service for querying VergeOS vnet monitor stats history (long-term).
 *
 * Provides long-term network monitoring statistics for virtual networks,
 * including latency, packet quality, and error counters. This is a
 * **read-only** service — stats entries are managed by the system
 * and cannot be created, updated, or deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/vnet-monitor-stats-history-long';
 *
 * // Get long-term stats for a specific vnet
 * const stats = await client.vnetMonitorStatsHistoryLong.listByVnet(5);
 * for (const entry of stats) {
 *   console.log(`Latency avg: ${entry.latency_usec_avg}us, quality: ${entry.quality}`);
 * }
 * ```
 */
export class VnetMonitorStatsHistoryLongService extends ReadOnlyService<VnetMonitorStatsHistoryLong> {
  constructor(http: HttpClient) {
    super(
      http,
      "/vnet_monitor_stats_history_long",
      "Vnet Monitor Stats History Long",
    );
  }

  /**
   * List stats history entries for a specific vnet.
   *
   * Filters by `vnet eq {vnetKey}` and merges with any additional list options.
   *
   * @param vnetKey - The key of the vnet to look up stats for.
   * @param options - Additional list options (fields, sort, limit, etc.).
   * @returns An array of vnet monitor stats history entries.
   */
  async listByVnet(
    vnetKey: FlexKey,
    options?: ListOptions,
  ): Promise<VnetMonitorStatsHistoryLong[]> {
    return this.list({
      ...options,
      filter: `vnet eq ${vnetKey}`,
    });
  }
}
