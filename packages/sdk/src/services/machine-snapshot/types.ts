import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Snapshot expiration policy. */
export type ExpiresType = 'never' | 'date';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine snapshot resource.
 *
 * Machine snapshots capture the state of a machine (VM or physical node)
 * at a point in time. The `machine` FK links to the parent machine.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineSnapshot extends Resource {
	/** Parent machine reference (FK to `machines`). Read-only. */
	machine: FlexKey;

	/** Snapshot machine copy reference (FK to `machines`). */
	snap_machine?: FlexKey;

	/** Snapshot display name. Min 1, max 128 characters. Unique. */
	name: string;

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Expiration policy. Default: `date`. */
	expires_type?: ExpiresType;

	/** Expiration timestamp (Unix epoch). */
	expires?: number;

	/** Whether this snapshot was created manually. Default: `false`. */
	created_manually?: boolean;

	/** Whether to quiesce the guest filesystem before snapshotting. */
	quiesce?: boolean;

	/** Whether the guest filesystem was successfully quiesced. Read-only (locked). */
	quiesced?: boolean;

	/** Whether this snapshot is queued for deletion. Default: `false`. */
	queue_delete?: boolean;

	/** Expiration timer value. */
	expires_timer?: number;

	/** Snapshot profile period reference (FK to `snapshot_profile_periods`). */
	snapshot_period?: FlexKey;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new machine snapshot.
 *
 * Only `name` and `machine` are required. Read-only fields (`created`, `quiesced`)
 * are excluded.
 */
export interface MachineSnapshotCreateParams {
	/** Parent machine reference (FK to `machines`). */
	machine: FlexKey;

	/** Snapshot display name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Snapshot machine copy reference (FK to `machines`). */
	snap_machine?: FlexKey;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Expiration policy. Default: `date`. */
	expires_type?: ExpiresType;

	/** Expiration timestamp (Unix epoch). */
	expires?: number;

	/** Whether this snapshot was created manually. Default: `false`. */
	created_manually?: boolean;

	/** Whether to quiesce the guest filesystem before snapshotting. */
	quiesce?: boolean;

	/** Whether this snapshot is queued for deletion. Default: `false`. */
	queue_delete?: boolean;

	/** Expiration timer value. */
	expires_timer?: number;

	/** Snapshot profile period reference (FK to `snapshot_profile_periods`). */
	snapshot_period?: FlexKey;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing machine snapshot.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`machine`, `created`, `quiesced`) are excluded.
 */
export interface MachineSnapshotUpdateParams {
	/** Snapshot display name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** Snapshot machine copy reference (FK to `machines`). */
	snap_machine?: FlexKey;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Expiration policy. */
	expires_type?: ExpiresType;

	/** Expiration timestamp (Unix epoch). */
	expires?: number;

	/** Whether this snapshot was created manually. */
	created_manually?: boolean;

	/** Whether to quiesce the guest filesystem before snapshotting. */
	quiesce?: boolean;

	/** Whether this snapshot is queued for deletion. */
	queue_delete?: boolean;

	/** Expiration timer value. */
	expires_timer?: number;

	/** Snapshot profile period reference (FK to `snapshot_profile_periods`). */
	snapshot_period?: FlexKey;
}
