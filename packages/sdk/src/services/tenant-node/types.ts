import type { FlexKey, Resource } from "../../types.js";

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Behavior when the host node loses power. */
export type TenantNodeOnPowerLoss = "power_on" | "last_state" | "leave_off";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS tenant node resource.
 *
 * Tenant nodes represent virtual compute nodes allocated to a tenant. Each node
 * has CPU, RAM, and HA configuration. Tenant nodes map to underlying machine
 * resources on the host system.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface TenantNode extends Resource {
  /** Parent tenant (FK to `tenants`). Read-only after creation. */
  tenant: FlexKey;

  /** Node ID within the tenant. Min 1. */
  nodeid?: number;

  /** Node display name. Min 1, max 128 characters. Unique. */
  name?: string;

  /** Human-readable description. Max 2048 characters. */
  description?: string;

  /** Whether the node is enabled. Default: `true`. */
  enabled?: boolean;

  /** Number of CPU cores. Min 1, max 1048576. Default: `4`. */
  cpu_cores?: number;

  /** RAM in MB. Min 2048, max 5242880. Default: `16384`. */
  ram?: number;

  /** Cluster assignment (FK to `clusters`). */
  cluster?: FlexKey;

  /** Failover cluster (FK to `clusters`). */
  cluster_failover?: FlexKey;

  /** Preferred host node (FK to `nodes`). */
  preferred_node?: FlexKey;

  /** HA group name. */
  ha_group?: string;

  /** Behavior on host power loss. Default: `last_state`. */
  on_power_loss?: TenantNodeOnPowerLoss;

  /**
   * Whether the node is currently powered on.
   *
   * **Note:** The API often omits this field. For reliable power state,
   * use {@link MachineStatus} via `client.machineStatuses.getByMachine()`.
   */
  powerstate?: boolean;

  /** Whether this resource is a snapshot. */
  is_snapshot?: boolean;

  /** Owner reference (FK). */
  owner?: FlexKey;

  /** DB version string. */
  db_version?: string;

  // ─── Read-only fields ────────────────────────────────────────────────

  /** Underlying machine reference (FK to `machines`). Read-only. */
  machine?: FlexKey;

  /** Reserve owner (FK to `tenant_nodes`). Read-only. */
  reserve_owner?: FlexKey;

  /** Creation timestamp (Unix epoch). Read-only. */
  created?: number;

  /** Last modified timestamp (Unix epoch). Read-only. */
  modified?: number;

  /** User who created this node. Read-only. */
  creator?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new tenant node.
 *
 * `tenant` is required. Read-only fields (`machine`, `reserve_owner`,
 * `created`, `modified`, `creator`) are excluded.
 */
export interface TenantNodeCreateParams {
  /** Parent tenant (FK to `tenants`). Required. */
  tenant: FlexKey;

  /** Number of CPU cores. Min 1, max 1048576. Default: `4`. */
  cpu_cores?: number;

  /** RAM in MB. Min 2048, max 5242880. Default: `16384`. */
  ram?: number;

  /** Node ID within the tenant. Min 1. */
  nodeid?: number;

  /** Node display name. Min 1, max 128 characters. */
  name?: string;

  /** Human-readable description. Max 2048 characters. */
  description?: string;

  /** Whether the node is enabled. Default: `true`. */
  enabled?: boolean;

  /** Cluster assignment (FK to `clusters`). */
  cluster?: FlexKey;

  /** Failover cluster (FK to `clusters`). */
  cluster_failover?: FlexKey;

  /** Preferred host node (FK to `nodes`). */
  preferred_node?: FlexKey;

  /** HA group name. */
  ha_group?: string;

  /** Behavior on host power loss. Default: `last_state`. */
  on_power_loss?: TenantNodeOnPowerLoss;

  /** Whether this resource is a snapshot. */
  is_snapshot?: boolean;

  /** Owner reference (FK). */
  owner?: FlexKey;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing tenant node.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`tenant`, `machine`, `reserve_owner`, `created`,
 * `modified`, `creator`) are excluded.
 */
export interface TenantNodeUpdateParams {
  /** Node display name. Min 1, max 128 characters. */
  name?: string;

  /** Human-readable description. Max 2048 characters. */
  description?: string;

  /** Whether the node is enabled. */
  enabled?: boolean;

  /** Number of CPU cores. Min 1, max 1048576. */
  cpu_cores?: number;

  /** RAM in MB. Min 2048, max 5242880. */
  ram?: number;

  /** Cluster assignment (FK to `clusters`). */
  cluster?: FlexKey;

  /** Failover cluster (FK to `clusters`). */
  cluster_failover?: FlexKey;

  /** Preferred host node (FK to `nodes`). */
  preferred_node?: FlexKey;

  /** HA group name. */
  ha_group?: string;

  /** Behavior on host power loss. */
  on_power_loss?: TenantNodeOnPowerLoss;
}
