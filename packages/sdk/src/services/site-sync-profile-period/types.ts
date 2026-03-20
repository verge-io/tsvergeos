import type { Resource } from "../../types.js";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS site sync profile period resource.
 *
 * Profile periods link an outgoing site sync to a snapshot profile period,
 * configuring remote retention, priority, and destination naming for
 * replicated snapshots.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface SiteSyncProfilePeriod extends Resource {
  /** Foreign key to the parent outgoing sync. */
  site_syncs_outgoing?: number;

  /** Foreign key to the snapshot profile period. */
  profile_period?: number;

  /** Foreign key to the schedule task. Read-only. */
  schedule_task?: number;

  /** Foreign key to the task. Read-only. */
  task?: number;

  /** Remote retention in seconds. */
  retention?: number;

  /** Sync priority (0+). */
  priority?: number;

  /** Whether to prevent the snapshot from expiring. */
  do_not_expire?: boolean;

  /** Prefix added to the snapshot name on the destination. */
  destination_prefix?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new site sync profile period.
 *
 * `site_syncs_outgoing`, `profile_period`, and `retention` are required.
 */
export interface SiteSyncProfilePeriodCreateParams {
  /** Foreign key to the parent outgoing sync. Required. */
  site_syncs_outgoing: number;

  /** Foreign key to the snapshot profile period. Required. */
  profile_period: number;

  /** Remote retention in seconds. Required. */
  retention: number;

  /** Sync priority (0+). */
  priority?: number;

  /** Whether to prevent the snapshot from expiring. */
  do_not_expire?: boolean;

  /** Prefix added to the snapshot name on the destination. */
  destination_prefix?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing site sync profile period.
 *
 * All fields are optional — only provided fields are changed.
 */
export interface SiteSyncProfilePeriodUpdateParams {
  /** Remote retention in seconds. */
  retention?: number;

  /** Sync priority (0+). */
  priority?: number;

  /** Whether to prevent the snapshot from expiring. */
  do_not_expire?: boolean;

  /** Prefix added to the snapshot name on the destination. */
  destination_prefix?: string;
}
