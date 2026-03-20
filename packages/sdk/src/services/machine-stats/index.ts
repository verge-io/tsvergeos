/**
 * Machine Stats service registration module.
 *
 * Importing this module registers the {@link MachineStatsService} on {@link VergeClient},
 * making `client.machineStats` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-stats';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { MachineStatsService } from "./service.js";

VergeClient.registerService("machineStats", MachineStatsService);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for querying machine CPU and RAM statistics (read-only). */
    readonly machineStats: MachineStatsService;
  }
}

export { MachineStatsService } from "./service.js";
export type { MachineStats } from "./types.js";
