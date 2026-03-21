import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Snapshot period frequency. */
export type PeriodFrequency = 'custom' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';

/** Day of week for scheduling. */
export type PeriodDayOfWeek = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'any';

/** Maximum storage tier for snapshot storage (string digits). */
export type PeriodMaxTier = '1' | '2' | '3' | '4' | '5';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS snapshot profile period resource.
 *
 * Periods define the schedule (frequency, retention count, time window) within
 * a snapshot profile. A profile can have multiple periods (e.g., hourly with 24
 * retained + daily with 7 retained). The `profile` FK links to the parent
 * {@link SnapshotProfile}.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface SnapshotProfilePeriod extends Resource {
	/** Parent snapshot profile reference (FK to `snapshot_profiles`). */
	profile: FlexKey;

	/** Period display name. */
	name: string;

	/** Schedule frequency. */
	frequency?: PeriodFrequency;

	/** Minute of the hour (0-59). */
	minute?: number;

	/** Hour of the day (0-23). */
	hour?: number;

	/** Day of week. Default: `"any"`. */
	day_of_week?: PeriodDayOfWeek;

	/** Day of month (0-31, 0 = any). */
	day_of_month?: number;

	/** Month (0-12, 0 = any). */
	month?: number;

	/** Retention period in seconds. */
	retention: number;

	/** Skip if the scheduled time was missed. Default: `false`. */
	skip_missed?: boolean;

	/** Maximum storage tier for snapshot storage. Default: `"1"`. */
	max_tier?: PeriodMaxTier;

	/** Whether to quiesce before snapshotting. Default: `false`. */
	quiesce?: boolean;

	/** Minimum number of snapshots to retain. Default: `1`. */
	min_snapshots?: number;

	/** Whether snapshots are immutable. */
	immutable?: boolean;

	/** Estimated number of snapshots. Read-only. */
	estimated_snapshot_count?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new snapshot profile period.
 *
 * `profile`, `name`, and `retention` are required. Read-only fields
 * (`estimated_snapshot_count`) are excluded.
 */
export interface SnapshotProfilePeriodCreateParams {
	/** Parent snapshot profile reference (FK to `snapshot_profiles`). Required. */
	profile: FlexKey;

	/** Period display name. Required. */
	name: string;

	/** Schedule frequency. */
	frequency?: PeriodFrequency;

	/** Minute of the hour (0-59). */
	minute?: number;

	/** Hour of the day (0-23). */
	hour?: number;

	/** Day of week. Default: `"any"`. */
	day_of_week?: PeriodDayOfWeek;

	/** Day of month (0-31, 0 = any). */
	day_of_month?: number;

	/** Month (0-12, 0 = any). */
	month?: number;

	/** Retention period in seconds. Required. */
	retention: number;

	/** Skip if the scheduled time was missed. Default: `false`. */
	skip_missed?: boolean;

	/** Maximum storage tier for snapshot storage. Default: `"1"`. */
	max_tier?: PeriodMaxTier;

	/** Whether to quiesce before snapshotting. Default: `false`. */
	quiesce?: boolean;

	/** Minimum number of snapshots to retain. Default: `1`. */
	min_snapshots?: number;

	/** Whether snapshots are immutable. */
	immutable?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing snapshot profile period.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`estimated_snapshot_count`) are excluded.
 * Note: `profile` is excluded because it is set at creation and cannot be changed.
 */
export interface SnapshotProfilePeriodUpdateParams {
	/** Period display name. */
	name?: string;

	/** Schedule frequency. */
	frequency?: PeriodFrequency;

	/** Minute of the hour (0-59). */
	minute?: number;

	/** Hour of the day (0-23). */
	hour?: number;

	/** Day of week. */
	day_of_week?: PeriodDayOfWeek;

	/** Day of month (0-31, 0 = any). */
	day_of_month?: number;

	/** Month (0-12, 0 = any). */
	month?: number;

	/** Retention period in seconds. */
	retention?: number;

	/** Skip if the scheduled time was missed. */
	skip_missed?: boolean;

	/** Maximum storage tier for snapshot storage. */
	max_tier?: PeriodMaxTier;

	/** Whether to quiesce before snapshotting. */
	quiesce?: boolean;

	/** Minimum number of snapshots to retain. */
	min_snapshots?: number;

	/** Whether snapshots are immutable. */
	immutable?: boolean;
}
