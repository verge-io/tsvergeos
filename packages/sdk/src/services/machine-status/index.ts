/**
 * Machine Status service registration module.
 *
 * Importing this module registers the {@link MachineStatusService} on {@link VergeClient},
 * making `client.machineStatuses` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-status';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { MachineStatusService } from "./service.js";

VergeClient.registerService("machineStatuses", MachineStatusService);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for querying machine runtime status — power state, health, migration, agent info (read-only). */
    readonly machineStatuses: MachineStatusService;
  }
}

export { MachineStatusService } from "./service.js";
export type {
  MachineState,
  MachineStatus,
  MachineStatusValue,
} from "./types.js";
