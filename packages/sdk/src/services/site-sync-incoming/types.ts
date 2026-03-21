import type { FlexKey, Resource } from "../../types.js";

// ─── String Literal Types ────────────────────────────────────────────────────

/** Incoming sync status. */
export type SiteSyncIncomingStatus =
  | "generating_reg"
  | "syncing"
  | "offline"
  | "error"
  | "regeneration_needed";

/** Incoming sync state. */
export type SiteSyncIncomingState = "online" | "offline" | "warning" | "error";

/** Force tier selection for incoming syncs. */
export type SiteSyncIncomingForceTier =
  | "unspecified"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS incoming site sync resource.
 *
 * Incoming syncs receive snapshot data from a remote site's outgoing sync.
 * Each incoming sync generates a registration code used to pair with
 * the corresponding outgoing sync on the remote system.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface SiteSyncIncoming extends Resource {
  /** Sync name. */
  name?: string;

  /** Human-readable description. */
  description?: string;

  /** Whether the sync is enabled. */
  enabled?: boolean;

  /** Foreign key to the parent site. */
  site?: FlexKey;

  /** 40-character unique sync identifier. Read-only. */
  sync_id?: string;

  /** Registration code for pairing with outgoing sync. Read-only. */
  registration_code?: string;

  /** Current sync status. */
  status?: SiteSyncIncomingStatus;

  /** Additional status information. */
  status_info?: string;

  /** Current state (online/offline). */
  state?: SiteSyncIncomingState;

  /** Public IP or domain for the sync connection. */
  public_ip?: string;

  /** Force storage to a specific tier. */
  force_tier?: SiteSyncIncomingForceTier;

  /** Minimum number of snapshots to retain. */
  min_snapshots?: number;

  /** vSAN host address. */
  vsan_host?: string;

  /** vSAN port (default 14201). */
  vsan_port?: number;

  /** URL the remote system uses to connect. */
  request_url?: string;

  /** Last sync timestamp (epoch seconds). */
  last_sync?: number;

  /** Whether this sync was system-created. Read-only. */
  system_created?: boolean;

  /** Foreign key to the sync-back outgoing sync. Read-only. */
  sync_back?: FlexKey;

  /** Foreign key reference to current stats. Read-only. */
  current_stats?: FlexKey;

  /** Foreign key to the user. Read-only. */
  user?: FlexKey;

  /** vSAN user ID. Read-only. */
  vsan_userid?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new incoming site sync.
 *
 * Both `site` and `name` are required.
 */
export interface SiteSyncIncomingCreateParams {
  /** Foreign key to the parent site. Required. */
  site: FlexKey;

  /** Sync name. Required. */
  name: string;

  /** Human-readable description. */
  description?: string;

  /** Whether the sync is enabled. */
  enabled?: boolean;

  /** Public IP or domain for the sync connection. */
  public_ip?: string;

  /** Force storage to a specific tier. */
  force_tier?: SiteSyncIncomingForceTier;

  /** Minimum number of snapshots to retain. */
  min_snapshots?: number;

  /** vSAN host address. */
  vsan_host?: string;

  /** vSAN port. */
  vsan_port?: number;

  /** URL the remote system uses to connect. */
  request_url?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing incoming site sync.
 *
 * All fields are optional — only provided fields are changed.
 */
export interface SiteSyncIncomingUpdateParams {
  /** Sync name. */
  name?: string;

  /** Human-readable description. */
  description?: string;

  /** Whether the sync is enabled. */
  enabled?: boolean;

  /** Public IP or domain for the sync connection. */
  public_ip?: string;

  /** Force storage to a specific tier. */
  force_tier?: SiteSyncIncomingForceTier;

  /** Minimum number of snapshots to retain. */
  min_snapshots?: number;

  /** vSAN host address. */
  vsan_host?: string;

  /** vSAN port. */
  vsan_port?: number;

  /** URL the remote system uses to connect. */
  request_url?: string;
}
