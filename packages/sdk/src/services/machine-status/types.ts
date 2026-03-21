import type { FlexKey, Resource } from "../../types.js";

// ─── String Literal Unions ───────────────────────────────────────────────────

/**
 * Machine runtime status — describes what the machine is currently doing.
 *
 * Returned by the `/api/v4/machine_status` endpoint.
 */
export type MachineStatusValue =
  | "initializing"
  | "starting"
  | "running"
  | "stopping"
  | "unresponsive"
  | "stopped"
  | "hibernated"
  | "hibernating"
  | "initmigrate"
  | "startmigrate"
  | "migrating"
  | "migratecomplete"
  | "importing"
  | "maintenance"
  | "leavingmaintenance"
  | "unlicensed"
  | "needsrefresh"
  | "needsrestart"
  | "waitingforresources"
  | "error"
  | "driversreloading";

/** Machine high-level health state. */
export type MachineState = "online" | "offline" | "warning" | "error";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine status resource.
 *
 * Provides the authoritative runtime state for a machine (VM, tenant node,
 * or physical node) — power state, detailed status, migration tracking,
 * live resource consumption, and guest agent info. Each machine has exactly
 * one status row that is continuously updated by the system.
 *
 * This is a **read-only** resource — status entries are managed by the
 * platform and cannot be created, updated, or deleted via the API.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineStatus extends Resource {
  /** Parent machine reference (FK to `machines`). */
  machine: FlexKey;

  /** Whether the machine process is currently running. */
  running?: boolean;

  /** Whether the machine supports live migration. Default: `true`. */
  migratable?: boolean;

  /** Physical node the machine is running on (FK to `nodes`). */
  node?: FlexKey;

  /** Node the machine was migrated from (FK to `nodes`). */
  migrated_node?: FlexKey;

  /** Target node for an in-progress migration (FK to `nodes`). */
  migration_destination?: FlexKey;

  /** Runtime configuration snapshot (JSON). */
  config?: unknown;

  /** Timestamp when the machine was started (Unix epoch). */
  started?: number;

  /** Local time of the machine (Unix epoch). */
  local_time?: number;

  /**
   * Detailed runtime status.
   *
   * See {@link MachineStatusValue} for all possible values. Default: `stopped`.
   */
  status?: MachineStatusValue;

  /** Human-readable status information or error details. */
  status_info?: string;

  /**
   * High-level health state.
   *
   * See {@link MachineState} for all possible values. Default: `offline`.
   */
  state?: MachineState;

  /** Whether the machine is powered on. Default: `false`. */
  powerstate?: boolean;

  /** Last status update timestamp (Unix epoch). Read-only. */
  last_update?: number;

  /** Number of CPU cores currently allocated to the running machine. */
  running_cores?: number;

  /** Amount of RAM (MB) currently allocated to the running machine. */
  running_ram?: number;

  /** Version string of the guest agent, if installed. */
  agent_version?: string;

  /** Feature flags reported by the guest agent (JSON). */
  agent_features?: unknown;

  /** Guest OS information reported by the agent (JSON). */
  agent_guest_info?: unknown;
}
