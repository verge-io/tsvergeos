/**
 * Machine Stats History Short service registration module.
 *
 * Importing this module registers the {@link MachineStatsHistoryShortService} on
 * {@link VergeClient}, making `client.machineStatsHistoryShort` available.
 * This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-stats-history-short';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { MachineStatsHistoryShortService } from "./service.js";

VergeClient.registerService(
  "machineStatsHistoryShort",
  MachineStatsHistoryShortService,
);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for querying short-term machine stats history (read-only). */
    readonly machineStatsHistoryShort: MachineStatsHistoryShortService;
  }
}

export { MachineStatsHistoryShortService } from "./service.js";
export type { MachineStatsHistoryShort } from "./types.js";
