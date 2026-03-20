import type { Resource } from "../../types.js";

// ─── String Literal Unions ───────────────────────────────────────────────────

/**
 * Log severity/level.
 *
 * - `audit` — Audit trail events
 * - `message` — Informational messages (default)
 * - `warning` — Warning conditions
 * - `error` — Error conditions
 * - `critical` — Critical failures
 * - `summary` — Summary entries
 * - `debug` — Debug information
 */
export type LogLevel =
  | "audit"
  | "message"
  | "warning"
  | "error"
  | "critical"
  | "summary"
  | "debug";

/**
 * Object type associated with a log entry.
 *
 * Identifies which VergeOS subsystem generated the log message.
 */
export type LogObjectType =
  | "catalog_repository"
  | "cloud_snapshots"
  | "cluster"
  | "file"
  | "group"
  | "node"
  | "oidc_application"
  | "other"
  | "permission"
  | "service_container"
  | "smtp"
  | "tenant"
  | "updates"
  | "user"
  | "vm"
  | "vm_service"
  | "vm_import"
  | "vmware_container"
  | "vnet"
  | "site"
  | "system"
  | "snapshot_profile"
  | "import_export"
  | "task";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * VergeOS log entry resource.
 *
 * Logs are system-generated records with a maximum of 25,000 rows that
 * auto-expire after approximately 31 days. Always use filters when querying
 * to avoid retrieving excessively large result sets.
 */
export interface Log extends Resource {
  /** Log severity level. */
  level: LogLevel;
  /** Log message text. */
  text: string;
  /** Timestamp in microseconds since epoch (read-only). */
  timestamp: number;
  /** Username associated with this log entry. */
  user: string;
  /** Type of object this log relates to. */
  object_type: LogObjectType;
  /** Name of the object this log relates to. */
  object_name: string;
}
