import type { Resource } from "../../types.js";

// ─── String Literal Types ────────────────────────────────────────────────────

/** Outgoing sync status. */
export type SiteSyncOutgoingStatus =
  | "initializing"
  | "syncing"
  | "offline"
  | "error";

/** Outgoing sync state. */
export type SiteSyncOutgoingState = "online" | "offline" | "warning" | "error";

/** Destination tier selection for outgoing syncs. */
export type SiteSyncOutgoingDestinationTier =
  | "unspecified"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5";

/** Remote snapshot status. */
export type SiteSyncOutgoingRemoteSnapsStatus =
  | "idle"
  | "unsupported"
  | "error"
  | "refreshing"
  | "updating";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS outgoing site sync resource.
 *
 * Outgoing syncs push snapshot data to a remote site's incoming sync.
 * They handle transport configuration, bandwidth throttling, retry behavior,
 * and remote snapshot management.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface SiteSyncOutgoing extends Resource {
  /** Sync name. */
  name?: string;

  /** Human-readable description. */
  description?: string;

  /** Whether the sync is enabled. */
  enabled?: boolean;

  /** Foreign key to the parent site. */
  site?: number;

  /** Current sync status. */
  status?: SiteSyncOutgoingStatus;

  /** Additional status information. */
  status_info?: string;

  /** Current state (online/offline). */
  state?: SiteSyncOutgoingState;

  /** Remote URL for the sync destination. */
  url?: string;

  /** Registration code for pairing with incoming sync. */
  registration_code?: string;

  /** Site user for authentication. */
  user?: string;

  /** Password for authentication. Write-only. */
  password?: string;

  /** Remote site ID. */
  remote_site_id?: string;

  /** Remote vSAN user. Read-only. */
  remote_vsan_user?: string;

  /** Remote vSAN host address. */
  remote_vsan_host?: string;

  /** Remote vSAN port (default 14201). */
  remote_vsan_port?: number;

  /** Override destination storage tier. */
  destination_tier?: SiteSyncOutgoingDestinationTier;

  /** Remote verify ID. */
  remote_verify_id?: number;

  /** Number of data threads (1-32, default 8). */
  threads?: number;

  /** Number of file threads (1-64, default 4). */
  file_threads?: number;

  /** Send throttle (bytes/sec, 0 = unlimited). */
  sendthrottle?: number;

  /** Whether to encrypt data in transit. */
  encryption?: boolean;

  /** Whether to use compression. */
  compression?: boolean;

  /** Whether to checksum network traffic. */
  netinteg?: boolean;

  /** Queue retry count (0-100, default 10). */
  queue_retry_count?: number;

  /** Queue retry interval in seconds (1-300, default 60). */
  queue_retry_interval_seconds?: number;

  /** Whether to multiply retry interval on each attempt. */
  queue_retry_interval_multiplier?: boolean;

  /** Foreign key to the sync-back incoming sync. */
  sync_back?: number;

  /** Remote sync ID. Read-only. */
  remote_sync_id?: string;

  /** Last run timestamp (epoch seconds). */
  last_run?: number;

  /** Foreign key to current stats. Read-only. */
  current_stats?: number;

  /** Remote minimum snapshots. Read-only. */
  remote_min_snapshots?: number;

  /** Last remote snapshot refresh timestamp (epoch seconds). */
  remote_snaps_last_refresh?: number;

  /** Remote snapshot status. */
  remote_snaps_status?: SiteSyncOutgoingRemoteSnapsStatus;

  /** Remote snapshot status info. */
  remote_snaps_status_info?: string;

  /** Foreign key to the repair server. Read-only. */
  repair_server?: number;

  /** User-defined note. */
  note?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new outgoing site sync.
 *
 * Both `site` and `name` are required.
 */
export interface SiteSyncOutgoingCreateParams {
  /** Foreign key to the parent site. Required. */
  site: number;

  /** Sync name. Required. */
  name: string;

  /** Human-readable description. */
  description?: string;

  /** Whether the sync is enabled. */
  enabled?: boolean;

  /** Remote URL for the sync destination. */
  url?: string;

  /** Registration code for pairing with incoming sync. */
  registration_code?: string;

  /** Site user for authentication. */
  user?: string;

  /** Password for authentication. */
  password?: string;

  /** Remote vSAN host address. */
  remote_vsan_host?: string;

  /** Remote vSAN port. */
  remote_vsan_port?: number;

  /** Override destination storage tier. */
  destination_tier?: SiteSyncOutgoingDestinationTier;

  /** Number of data threads (1-32). */
  threads?: number;

  /** Number of file threads (1-64). */
  file_threads?: number;

  /** Send throttle (bytes/sec, 0 = unlimited). */
  sendthrottle?: number;

  /** Whether to encrypt data in transit. */
  encryption?: boolean;

  /** Whether to use compression. */
  compression?: boolean;

  /** Whether to checksum network traffic. */
  netinteg?: boolean;

  /** Queue retry count (0-100). */
  queue_retry_count?: number;

  /** Queue retry interval in seconds (1-300). */
  queue_retry_interval_seconds?: number;

  /** Whether to multiply retry interval on each attempt. */
  queue_retry_interval_multiplier?: boolean;

  /** User-defined note. */
  note?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing outgoing site sync.
 *
 * All fields are optional — only provided fields are changed.
 */
export interface SiteSyncOutgoingUpdateParams {
  /** Sync name. */
  name?: string;

  /** Human-readable description. */
  description?: string;

  /** Whether the sync is enabled. */
  enabled?: boolean;

  /** Remote URL for the sync destination. */
  url?: string;

  /** Registration code for pairing with incoming sync. */
  registration_code?: string;

  /** Site user for authentication. */
  user?: string;

  /** Password for authentication. */
  password?: string;

  /** Remote vSAN host address. */
  remote_vsan_host?: string;

  /** Remote vSAN port. */
  remote_vsan_port?: number;

  /** Override destination storage tier. */
  destination_tier?: SiteSyncOutgoingDestinationTier;

  /** Number of data threads (1-32). */
  threads?: number;

  /** Number of file threads (1-64). */
  file_threads?: number;

  /** Send throttle (bytes/sec, 0 = unlimited). */
  sendthrottle?: number;

  /** Whether to encrypt data in transit. */
  encryption?: boolean;

  /** Whether to use compression. */
  compression?: boolean;

  /** Whether to checksum network traffic. */
  netinteg?: boolean;

  /** Queue retry count (0-100). */
  queue_retry_count?: number;

  /** Queue retry interval in seconds (1-300). */
  queue_retry_interval_seconds?: number;

  /** Whether to multiply retry interval on each attempt. */
  queue_retry_interval_multiplier?: boolean;

  /** Foreign key to the sync-back incoming sync. */
  sync_back?: number;

  /** User-defined note. */
  note?: string;
}
