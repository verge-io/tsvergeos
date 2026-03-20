import type { FlexKey, Resource } from '../../types.js';

// ─── Enum Types ─────────────────────────────────────────────────────────────

/**
 * Cluster tier operational status values.
 *
 * Describes the current operational state of a cluster tier in the vSAN.
 */
export type ClusterTierStatusValue =
	| 'online'
	| 'offline'
	| 'repairing'
	| 'initializing'
	| 'verifying'
	| 'noredundant'
	| 'outofspace';

/**
 * Cluster tier health state values.
 *
 * High-level health indicator for dashboard display.
 */
export type ClusterTierState = 'online' | 'offline' | 'warning' | 'error';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS cluster tier status resource.
 *
 * Provides health, redundancy, and repair state for a per-cluster storage tier.
 * Each cluster tier has one status row that is continuously updated by the system.
 * This is a read-only monitoring resource.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface ClusterTierStatus extends Resource {
	/** Parent cluster tier reference (FK to `cluster_tiers`). */
	tier: FlexKey;

	/** Current operational status of the cluster tier. */
	status?: ClusterTierStatusValue;

	/** High-level health state for dashboard display. */
	state?: ClusterTierState;

	/** Total capacity in bytes. */
	capacity?: number;

	/** Used space in bytes. */
	used?: number;

	/** Used space as a percentage of capacity. Read-only. */
	used_pct?: number;

	/** Whether the tier has redundancy enabled. */
	redundant?: boolean;

	/** Whether the tier is encrypted. */
	encrypted?: boolean;

	/** Whether the tier is currently performing work (repair/verify). */
	working?: boolean;

	/** Duration of the last walk operation in milliseconds. */
	last_walk_time_ms?: number;

	/** Duration of the last full walk operation in milliseconds. */
	last_fullwalk_time_ms?: number;

	/** Current transaction counter. */
	transaction?: number;

	/** Number of repairs performed. */
	repairs?: number;

	/** Number of bad drives detected. */
	bad_drives?: number;

	/** Whether a full walk is in progress. */
	fullwalk?: boolean;

	/** Progress of current operation (0-100). */
	progress?: number;

	/** Number of unique index entries. */
	index_unique?: number;

	/** Timestamp of last state change (Unix epoch). */
	state_timestamp?: number;

	/** Current space throttle delay in milliseconds. */
	cur_space_throttle_ms?: number;

	/** Timestamp when the current transaction started (Unix epoch). */
	transaction_start_stamp?: number;
}
