/**
 * Vnet Monitor Stats History Short service registration module.
 *
 * Importing this module registers the {@link VnetMonitorStatsHistoryShortService} on {@link VergeClient},
 * making `client.vnetMonitorStatsHistoryShort` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/vnet-monitor-stats-history-short';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { VnetMonitorStatsHistoryShortService } from "./service.js";

VergeClient.registerService(
  "vnetMonitorStatsHistoryShort",
  VnetMonitorStatsHistoryShortService,
);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for querying short-term vnet monitor statistics (read-only). */
    readonly vnetMonitorStatsHistoryShort: VnetMonitorStatsHistoryShortService;
  }
}

export { VnetMonitorStatsHistoryShortService } from "./service.js";
export type { VnetMonitorStatsHistoryShort } from "./types.js";
