import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS cloud snapshot resource.
 *
 * Cloud snapshots are system-level point-in-time captures that preserve
 * VMs, tenants, and volumes. They form the foundation of VergeOS DR.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface CloudSnapshot extends Resource {
	/** Snapshot name. Unique, 1-128 characters. Read-only after creation. */
	name: string;

	/** Creation timestamp (epoch seconds). Read-only. */
	created?: number;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** FK to the snapshot profile that created this snapshot. */
	snapshot_profile?: FlexKey;

	/** FK to the snapshot profile period that triggered this snapshot. */
	snapshot_period?: FlexKey;

	/** FK to the scheduled task that created this snapshot. */
	schedule_task?: FlexKey;

	/** FK to the task currently operating on this snapshot. */
	task?: FlexKey;

	/** Expiration type. `"date"` expires at the `expires` timestamp; `"never"` does not expire. Default: `"date"`. */
	expires_type?: CloudSnapshotExpiresType;

	/** Expiration timestamp (epoch seconds). Only meaningful when `expires_type` is `"date"`. */
	expires?: number;

	/** Whether this snapshot is provided to other sites. */
	provider?: boolean;

	/** Whether this snapshot is private (not visible to tenants). */
	private?: boolean;

	/** Whether this snapshot is synced to a remote site. */
	remote_sync?: boolean;

	/** FK to the incoming sync that received this snapshot. */
	incoming_sync?: FlexKey;

	/** Whether this snapshot is immutable (cannot be deleted until lock expires). */
	immutable?: boolean;

	/** Current immutability lock status. Read-only. */
	immutable_status?: CloudSnapshotImmutableStatus;

	/** Timestamp when the immutability lock expires (epoch seconds). Read-only. */
	immutable_lock_expires?: number;

	/** Snapshot status. */
	status?: CloudSnapshotStatus;

	/** Additional status information. */
	status_info?: string;
}

// ─── String Literal Types ────────────────────────────────────────────────────

/** Cloud snapshot expiration type. */
export type CloudSnapshotExpiresType = 'never' | 'date';

/** Cloud snapshot immutability lock status. */
export type CloudSnapshotImmutableStatus = 'unlocked' | 'unlocking' | 'locked';

/** Cloud snapshot status. */
export type CloudSnapshotStatus = 'normal' | 'held';

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new cloud snapshot.
 *
 * Cloud snapshot creation uses a table action (`POST /cloud_snapshots?action=create`)
 * rather than a standard POST.
 */
export interface CloudSnapshotCreateParams {
	/** Snapshot name. Required. Unique, 1-128 characters. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Retention period in seconds. Default: 259200 (3 days). */
	retention?: number;

	/** Minimum number of snapshots to retain. Default: 1. */
	min_snapshots?: number;

	/** Whether the snapshot should be immutable (locked from deletion). */
	immutable?: boolean;

	/** Whether the snapshot is private (not visible to tenants). */
	private?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing cloud snapshot.
 *
 * Note: `name` and `immutable_lock_expires` are read-only and cannot be updated.
 * All fields are optional — only provided fields are changed.
 */
export interface CloudSnapshotUpdateParams {
	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Expiration timestamp (epoch seconds). */
	expires?: number;

	/** Expiration type. `"date"` or `"never"`. */
	expires_type?: CloudSnapshotExpiresType;

	/** Whether this snapshot is private (not visible to tenants). */
	private?: boolean;

	/** Whether this snapshot is immutable. */
	immutable?: boolean;

	/** Snapshot status. */
	status?: CloudSnapshotStatus;

	/** Additional status information. */
	status_info?: string;

	/** Whether this snapshot is provided to other sites. */
	provider?: boolean;

	/** Whether this snapshot is synced to a remote site. */
	remote_sync?: boolean;
}
