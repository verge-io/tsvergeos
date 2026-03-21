import { NotFoundError } from "../../errors.js";
import type { HttpClient } from "../../http.js";
import type { FlexKey } from "../../types.js";
import { ReadOnlyService } from "../base.js";
import type { MachineStatus } from "./types.js";

/**
 * Service for querying VergeOS machine runtime status.
 *
 * Provides the authoritative power state, detailed status, migration info,
 * live resource consumption, and guest agent data for machines. This is a
 * **read-only** service — status entries are managed by the system
 * and cannot be created, updated, or deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/machine-status';
 *
 * // Get status for a specific machine
 * const status = await client.machineStatuses.getByMachine(42);
 * console.log(`Status: ${status.status}, Power: ${status.powerstate}`);
 *
 * // List all running machines
 * const running = await client.machineStatuses.list({
 *   filter: 'running eq true',
 * });
 * ```
 */
export class MachineStatusService extends ReadOnlyService<MachineStatus> {
  constructor(http: HttpClient) {
    super(http, "/machine_status", "Machine Status");
  }

  /**
   * Get the runtime status for a specific machine.
   *
   * Filters by `machine eq {machineKey}` and returns the first matching result.
   * Throws {@link NotFoundError} if no status entry exists for the given machine.
   *
   * @param machineKey - The key of the machine to look up status for.
   * @returns The machine status resource.
   * @throws {@link NotFoundError} If no status exists for the specified machine.
   */
  async getByMachine(machineKey: FlexKey): Promise<MachineStatus> {
    const results = await this.list({
      filter: `machine eq ${machineKey}`,
    });

    if (results.length === 0) {
      throw new NotFoundError(this.displayName, machineKey);
    }

    return results[0] as MachineStatus;
  }
}
