import type { Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Volume snapshot expiration policy. */
export type VolumeSnapshotExpiresType = 'never' | 'date';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS volume snapshot resource.
 *
 * Volume snapshots capture the state of a volume at a point in time.
 * Unlike volumes (which use SHA1 string keys), volume snapshots use
 * standard integer keys. The `volume` FK references the parent volume
 * by its SHA1 string key.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface VolumeSnapshot extends Resource {
	/** Parent volume reference (FK to `volumes`). SHA1 string key. Read-only. */
	volume: string;

	/** Snapshot volume copy reference (FK to `volumes`). Read-only. */
	snap_volume?: string;

	/** Snapshot display name. Min 1, max 128 characters. Unique. */
	name: string;

	/** Creation timestamp (Unix epoch, uint32). Read-only. */
	created?: number;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Expiration policy. Default: `date`. */
	expires_type?: VolumeSnapshotExpiresType;

	/** Expiration timestamp (Unix epoch, uint32). */
	expires?: number;

	/** Whether the snapshot is enabled. Default: `false`. */
	enabled?: boolean;

	/** Whether this snapshot was created manually. Default: `false`. */
	created_manually?: boolean;

	/** Whether to quiesce the volume before snapshotting. Default: `false`. */
	quiesce?: boolean;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new volume snapshot.
 *
 * `name` and `volume` are required. Read-only fields (`created`, `snap_volume`)
 * are excluded.
 */
export interface VolumeSnapshotCreateParams {
	/** Parent volume reference (FK to `volumes`). SHA1 string key. Required. */
	volume: string;

	/** Snapshot display name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Expiration policy. Default: `date`. */
	expires_type?: VolumeSnapshotExpiresType;

	/** Expiration timestamp (Unix epoch, uint32). */
	expires?: number;

	/** Whether the snapshot is enabled. Default: `false`. */
	enabled?: boolean;

	/** Whether this snapshot was created manually. Default: `false`. */
	created_manually?: boolean;

	/** Whether to quiesce the volume before snapshotting. Default: `false`. */
	quiesce?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing volume snapshot.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`volume`, `created`, `snap_volume`) are excluded.
 */
export interface VolumeSnapshotUpdateParams {
	/** Snapshot display name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Expiration policy. */
	expires_type?: VolumeSnapshotExpiresType;

	/** Expiration timestamp (Unix epoch, uint32). */
	expires?: number;

	/** Whether the snapshot is enabled. */
	enabled?: boolean;

	/** Whether this snapshot was created manually. */
	created_manually?: boolean;

	/** Whether to quiesce the volume before snapshotting. */
	quiesce?: boolean;
}
