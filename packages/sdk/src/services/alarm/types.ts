import type { FlexKey, Resource } from "../../types.js";

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Alarm severity level. */
export type AlarmLevel =
  | "audit"
  | "message"
  | "warning"
  | "error"
  | "critical"
  | "summary"
  | "debug";

/** Alarm owner type — the type of resource that raised the alarm. */
export type AlarmOwnerType = string;

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS alarm resource.
 *
 * Alarms are raised and lowered automatically by the platform's monitoring
 * system. They cannot be created via the API — only resolved, snoozed,
 * or unsnoozed.
 */
export interface Alarm extends Resource {
  /** Owner resource path (e.g., `"vms/123"`). Read-only. */
  owner?: FlexKey;

  /** Type of the owner resource. Read-only. */
  owner_type?: AlarmOwnerType;

  /** Sub-owner resource path, if applicable. Read-only. */
  sub_owner?: FlexKey;

  /** Type of the sub-owner resource. Read-only. */
  sub_owner_type?: string;

  /** FK reference to the alarm type definition. Read-only. */
  alarm_type?: FlexKey;

  /** Alarm severity level. Read-only. */
  level?: AlarmLevel;

  /** Current alarm status. Read-only. */
  status?: string;

  /** 8-character alarm identifier string. Read-only. */
  alarm_id?: string;

  /** Whether this alarm can be resolved via the API. Read-only. */
  resolvable?: boolean;

  /** Text displayed when the alarm is resolved. Read-only. */
  resolve_text?: string;

  /** Action to take when resolving. Read-only. */
  resolve_action?: string;

  /** Creation timestamp (Unix epoch). Read-only. */
  created?: number;

  /** Last modification timestamp (Unix epoch). Read-only. */
  modified?: number;

  /** Expiration timestamp (Unix epoch). */
  expires?: number;

  /** Snooze threshold value. */
  snooze_threshold?: number;

  /** Snooze until timestamp (Unix epoch). Set to 0 to unsnooze. */
  snooze?: number;

  /** User who snoozed this alarm. */
  snoozed_by?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an alarm.
 *
 * Most alarm fields are read-only. Only `snooze` and `snooze_threshold`
 * can be modified via the API.
 */
export interface AlarmUpdateParams {
  /** Snooze until timestamp (Unix epoch). Set to 0 to unsnooze. */
  snooze?: number;

  /** Snooze threshold value. */
  snooze_threshold?: number;
}
