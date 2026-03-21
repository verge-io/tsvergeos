import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Volume filesystem type. */
export type VolumeFsType =
	| 'ext4'
	| 'fc_nimble'
	| 'cifs'
	| 'nfs'
	| 'ybfs'
	| 'verge_vm_export'
	| (string & {});

/** Volume storage tier preference (string digits). */
export type VolumePreferredTier = '1' | '2' | '3' | '4' | '5' | (string & {});

/** Volume optimization strategy. */
export type VolumeOptimize = 'general' | 'large' | (string & {});

/** SMB protocol version for CIFS remote mounts. */
export type CifsProtocol = '1.0' | '2.0' | '2.1' | '3.0' | (string & {});

/** NFS protocol version for NFS remote mounts. */
export type NfsProtocol = '' | '2' | '3' | '4' | (string & {});

/** Read-ahead buffer size in kilobytes (string values). */
export type ReadAheadKb =
	| '0'
	| '64'
	| '128'
	| '256'
	| '512'
	| '1024'
	| '2048'
	| '4096'
	| (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS volume resource.
 *
 * Volume `$key` and `id` are both 40-character SHA1 hash strings, unlike most
 * resources which use integer keys. The `service` FK links to the parent NAS
 * service (`vm_services`).
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface Volume extends Resource {
	/** Volume ID — 40-character SHA1 hash. Read-only. */
	id: string;

	/** Parent NAS service reference (FK to `vm_services`). Read-only. */
	service: FlexKey;

	/** Whether this resource is a snapshot of another volume. */
	is_snapshot?: boolean;

	/** Drive reference (FK to `machine_drives`). Read-only. */
	drive?: FlexKey;

	/** Volume display name. Min 1, max 128 characters. Unique. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the volume is enabled. Default: `true`. */
	enabled?: boolean;

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;

	/** Maximum size in bytes. Min 1,048,576 (1 MB), max 549,755,813,888,000. */
	maxsize?: number;

	/** Preferred storage tier. */
	preferred_tier?: VolumePreferredTier;

	/** Snapshot profile reference (FK to `snapshot_profiles`). */
	snapshot_profile?: FlexKey;

	/** Filesystem type. Read-only (set at creation). Default: `ext4`. */
	fs_type?: VolumeFsType;

	/** Whether to discard unused blocks (TRIM). Default: `true`. */
	discard?: boolean;

	/** Whether the volume is read-only. Default: `false`. */
	read_only?: boolean;

	/** Owner user string. */
	owner_user?: string;

	/** Owner group string. */
	owner_group?: string;

	/** Whether to automatically mount snapshots. Default: `false`. */
	automount_snapshots?: boolean;

	/** Remote mount target path (for CIFS/NFS fs_types). */
	remote_target?: string;

	/** CIFS username (for remote CIFS mounts). */
	cifs_user?: string;

	/** CIFS password (for remote CIFS mounts). Max 256 characters. */
	cifs_password?: string;

	/** SMB protocol version (for remote CIFS mounts). Default: `2.0`. */
	cifs_protocol?: CifsProtocol;

	/** NFS protocol version (for remote NFS mounts). */
	nfs_protocol?: NfsProtocol;

	/** Read-ahead buffer size in kilobytes. Default: `0` (automatic). */
	read_ahead_kb?: ReadAheadKb;

	/** Optimization strategy. Default: `general`. */
	optimize?: VolumeOptimize;

	/** Additional mount options string. */
	mount_options?: string;

	/** Whether the volume is encrypted. Read-only (set at creation). Default: `false`. */
	encrypt?: boolean;

	/** Encryption key string. Max 256 characters. */
	encryption_key?: string;

	/** User-facing note. Max 1024 characters. */
	note?: string;

	/** User who created this volume. Read-only. */
	creator?: string;

	/** Parent snapshot reference (FK to `volume_snapshots`). */
	parent_snapshot?: FlexKey;

	/** Volume status reference (FK to `volume_status`). */
	status?: FlexKey;

	/** Antivirus reference (FK to `volume_antivirus`). Read-only. */
	vol_antivirus?: FlexKey;

	/** Additional setting values (JSON). */
	additional_setting_values?: unknown;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new volume.
 *
 * `name` and `service` are required. Read-only fields (`id`, `drive`, `created`,
 * `modified`, `encrypt`, `fs_type`, `creator`, `vol_antivirus`) are excluded except
 * where settable at creation time.
 */
export interface VolumeCreateParams {
	/** Volume display name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Parent NAS service reference (FK to `vm_services`). Required. */
	service: FlexKey;

	/** Whether this is a snapshot. */
	is_snapshot?: boolean;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the volume is enabled. Default: `true`. */
	enabled?: boolean;

	/** Maximum size in bytes. Min 1,048,576 (1 MB). */
	maxsize?: number;

	/** Preferred storage tier. */
	preferred_tier?: VolumePreferredTier;

	/** Snapshot profile reference (FK to `snapshot_profiles`). */
	snapshot_profile?: FlexKey;

	/** Filesystem type. Default: `ext4`. */
	fs_type?: VolumeFsType;

	/** Whether to discard unused blocks (TRIM). Default: `true`. */
	discard?: boolean;

	/** Whether the volume is read-only. Default: `false`. */
	read_only?: boolean;

	/** Owner user string. */
	owner_user?: string;

	/** Owner group string. */
	owner_group?: string;

	/** Whether to automatically mount snapshots. Default: `false`. */
	automount_snapshots?: boolean;

	/** Remote mount target path (for CIFS/NFS fs_types). */
	remote_target?: string;

	/** CIFS username (for remote CIFS mounts). */
	cifs_user?: string;

	/** CIFS password (for remote CIFS mounts). Max 256 characters. */
	cifs_password?: string;

	/** SMB protocol version (for remote CIFS mounts). Default: `2.0`. */
	cifs_protocol?: CifsProtocol;

	/** NFS protocol version (for remote NFS mounts). */
	nfs_protocol?: NfsProtocol;

	/** Read-ahead buffer size in kilobytes. Default: `0` (automatic). */
	read_ahead_kb?: ReadAheadKb;

	/** Optimization strategy. Default: `general`. */
	optimize?: VolumeOptimize;

	/** Additional mount options string. */
	mount_options?: string;

	/** Whether to encrypt the volume. Default: `false`. */
	encrypt?: boolean;

	/** Encryption key string. Max 256 characters. */
	encryption_key?: string;

	/** User-facing note. Max 1024 characters. */
	note?: string;
}

// ─── Action Types ────────────────────────────────────────────────────────────

/** Restore type for volume restore operations. */
export type VolumeRestoreType = 'data' | 'all';

/** Options for the volume restore action. */
export interface VolumeRestoreOptions {
	/** What to restore. `'data'` restores data only, `'all'` restores data and settings. Default: `'data'`. */
	restoreType?: VolumeRestoreType;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing volume.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`id`, `service`, `drive`, `created`, `modified`,
 * `encrypt`, `fs_type`, `creator`, `vol_antivirus`) are excluded.
 */
export interface VolumeUpdateParams {
	/** Volume display name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** Whether this is a snapshot. */
	is_snapshot?: boolean;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the volume is enabled. */
	enabled?: boolean;

	/** Maximum size in bytes. Min 1,048,576 (1 MB). */
	maxsize?: number;

	/** Preferred storage tier. */
	preferred_tier?: VolumePreferredTier;

	/** Snapshot profile reference (FK to `snapshot_profiles`). */
	snapshot_profile?: FlexKey;

	/** Whether to discard unused blocks (TRIM). */
	discard?: boolean;

	/** Whether the volume is read-only. */
	read_only?: boolean;

	/** Owner user string. */
	owner_user?: string;

	/** Owner group string. */
	owner_group?: string;

	/** Whether to automatically mount snapshots. */
	automount_snapshots?: boolean;

	/** Remote mount target path (for CIFS/NFS fs_types). */
	remote_target?: string;

	/** CIFS username (for remote CIFS mounts). */
	cifs_user?: string;

	/** CIFS password (for remote CIFS mounts). Max 256 characters. */
	cifs_password?: string;

	/** SMB protocol version (for remote CIFS mounts). */
	cifs_protocol?: CifsProtocol;

	/** NFS protocol version (for remote NFS mounts). */
	nfs_protocol?: NfsProtocol;

	/** Read-ahead buffer size in kilobytes. */
	read_ahead_kb?: ReadAheadKb;

	/** Optimization strategy. */
	optimize?: VolumeOptimize;

	/** Additional mount options string. */
	mount_options?: string;

	/** Encryption key string. Max 256 characters. */
	encryption_key?: string;

	/** User-facing note. Max 1024 characters. */
	note?: string;
}
