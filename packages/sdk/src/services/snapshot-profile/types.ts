import type { Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS snapshot profile resource.
 *
 * Snapshot profiles define automated backup schedules with retention policies.
 * Each profile can have multiple {@link SnapshotProfilePeriod} entries that
 * control the frequency and retention of snapshots.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface SnapshotProfile extends Resource {
	/** Profile display name. Min 1, max 128 characters. Unique. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Ignore warnings about snapshot count estimates for this profile. Default: `false`. */
	ignore_warnings?: boolean;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new snapshot profile.
 *
 * `name` is required.
 */
export interface SnapshotProfileCreateParams {
	/** Profile display name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Ignore warnings about snapshot count estimates for this profile. Default: `false`. */
	ignore_warnings?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing snapshot profile.
 *
 * All fields are optional — only provided fields are changed.
 */
export interface SnapshotProfileUpdateParams {
	/** Profile display name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Ignore warnings about snapshot count estimates for this profile. */
	ignore_warnings?: boolean;
}
