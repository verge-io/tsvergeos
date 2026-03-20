import type { FlexKey, Resource } from '../../types.js';

// ─── Enum Types ─────────────────────────────────────────────────────────────

/** Behavior when deleting files on the destination. */
export type VolumeSyncDestinationDelete =
	| 'never'
	| 'delete'
	| 'delete-before'
	| 'delete-during'
	| 'delete-delay'
	| 'delete-after';

/** Sync method used for data transfer. */
export type VolumeSyncMethod = 'rsync' | 'ysync';

/** Preferred storage tier (1–5). */
export type VolumeSyncPreferredTier = '1' | '2' | '3' | '4' | '5';

/** Volume sync type. Read-only. */
export type VolumeSyncType = 'volsync' | 'vmimport';

// ─── Resource Type ──────────────────────────────────────────────────────────

/**
 * A VergeOS volume sync resource.
 *
 * Volume syncs synchronize data between volumes within a NAS service. They are
 * children of NAS services (`vm_services`) and use 40-character SHA1 hash
 * strings as keys. The `service` FK references the parent NAS service.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface VolumeSync extends Resource {
	/** Sync ID — 40-character SHA1 hash. Read-only. */
	id: string;

	/** Sync display name. Min 1, max 128 characters. Unique. */
	name: string;

	/** Parent NAS service reference (FK to `vm_services`). Read-only after create. */
	service: FlexKey;

	/** Source volume reference (FK to `volumes`). */
	source_volume: string;

	/** Destination volume reference (FK to `volumes`). */
	destination_volume: string;

	/** Human-readable description. */
	description?: string;

	/** Whether the sync is enabled. Default: `true`. */
	enabled?: boolean;

	/** Creation timestamp (Unix epoch, uint32). Read-only. */
	created?: number;

	/** Last modification timestamp (Unix epoch, uint32). Read-only. */
	modified?: number;

	/** Source path within the source volume. */
	source_path?: string;

	/** Destination path within the destination volume. */
	destination_path?: string;

	/** Include patterns (newline-delimited). */
	include?: string;

	/** Exclude patterns (newline-delimited). */
	exclude?: string;

	/** Whether to freeze the filesystem before syncing. */
	fsfreeze?: boolean;

	/** Whether to preserve ACLs. Default: `true`. */
	preserve_ACLs?: boolean;

	/** Whether to copy symlinks. Default: `true`. */
	copy_symlinks?: boolean;

	/** Whether to preserve extended attributes. Default: `true`. */
	preserve_xattrs?: boolean;

	/** Whether to preserve file permissions. Default: `true`. */
	preserve_permissions?: boolean;

	/** Whether to preserve modification times. Default: `true`. */
	preserve_mod_time?: boolean;

	/** Whether to preserve group ownership. Default: `true`. */
	preserve_groups?: boolean;

	/** Whether to preserve file ownership. Default: `true`. */
	preserve_owner?: boolean;

	/** Whether to preserve device files. Default: `false`. */
	preserve_device_files?: boolean;

	/** Snapshot profile for scheduling (FK to `snapshot_profiles`). */
	start_time_profile?: FlexKey;

	/** Maximum run time in seconds. */
	run_time?: number;

	/** User to run the sync as. */
	run_as_user?: string;

	/** Destination delete behavior. Default: `'never'`. */
	destination_delete?: VolumeSyncDestinationDelete;

	/** Maximum number of errors before stopping. Default: `1000`. */
	errors_max?: number;

	/** Number of worker threads (1–128). Default: `4`. */
	workers?: number;

	/** Preferred storage tier. */
	preferred_tier?: VolumeSyncPreferredTier;

	/** Whether to omit directory modification times. */
	omit_dir_times?: boolean;

	/** Whether to omit symlink modification times. */
	omit_link_times?: boolean;

	/** Whether to write data directly to destination (skip temp files). */
	inplace?: boolean;

	/** Whether to use CIFS ACL handling. Default: `true`. */
	cifsacl?: boolean;

	/** Sync method. Default: `'ysync'`. */
	sync_method?: VolumeSyncMethod;

	/** Extended ysync options. */
	ysync_extended?: string;

	/** Sync type. Read-only. Default: `'volsync'`. */
	type?: VolumeSyncType;

	/** Progress reference (FK to `volume_sync_progresses`). Read-only. */
	progress?: FlexKey;
}

// ─── Create Params ──────────────────────────────────────────────────────────

/**
 * Parameters for creating a new volume sync.
 *
 * `name`, `service`, `source_volume`, and `destination_volume` are required.
 * Read-only fields (`id`, `created`, `modified`, `progress`, `type`) are excluded.
 */
export interface VolumeSyncCreateParams {
	/** Sync display name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Parent NAS service reference (FK to `vm_services`). Required. */
	service: FlexKey;

	/** Source volume reference (FK to `volumes`). Required. */
	source_volume: string;

	/** Destination volume reference (FK to `volumes`). Required. */
	destination_volume: string;

	/** Human-readable description. */
	description?: string;

	/** Whether the sync is enabled. Default: `true`. */
	enabled?: boolean;

	/** Source path within the source volume. */
	source_path?: string;

	/** Destination path within the destination volume. */
	destination_path?: string;

	/** Include patterns (newline-delimited). */
	include?: string;

	/** Exclude patterns (newline-delimited). */
	exclude?: string;

	/** Whether to freeze the filesystem before syncing. */
	fsfreeze?: boolean;

	/** Whether to preserve ACLs. Default: `true`. */
	preserve_ACLs?: boolean;

	/** Whether to copy symlinks. Default: `true`. */
	copy_symlinks?: boolean;

	/** Whether to preserve extended attributes. Default: `true`. */
	preserve_xattrs?: boolean;

	/** Whether to preserve file permissions. Default: `true`. */
	preserve_permissions?: boolean;

	/** Whether to preserve modification times. Default: `true`. */
	preserve_mod_time?: boolean;

	/** Whether to preserve group ownership. Default: `true`. */
	preserve_groups?: boolean;

	/** Whether to preserve file ownership. Default: `true`. */
	preserve_owner?: boolean;

	/** Whether to preserve device files. Default: `false`. */
	preserve_device_files?: boolean;

	/** Snapshot profile for scheduling (FK to `snapshot_profiles`). */
	start_time_profile?: FlexKey;

	/** Maximum run time in seconds. */
	run_time?: number;

	/** User to run the sync as. */
	run_as_user?: string;

	/** Destination delete behavior. Default: `'never'`. */
	destination_delete?: VolumeSyncDestinationDelete;

	/** Maximum number of errors before stopping. Default: `1000`. */
	errors_max?: number;

	/** Number of worker threads (1–128). Default: `4`. */
	workers?: number;

	/** Preferred storage tier. */
	preferred_tier?: VolumeSyncPreferredTier;

	/** Whether to omit directory modification times. */
	omit_dir_times?: boolean;

	/** Whether to omit symlink modification times. */
	omit_link_times?: boolean;

	/** Whether to write data directly to destination (skip temp files). */
	inplace?: boolean;

	/** Whether to use CIFS ACL handling. Default: `true`. */
	cifsacl?: boolean;

	/** Sync method. Default: `'ysync'`. */
	sync_method?: VolumeSyncMethod;

	/** Extended ysync options. */
	ysync_extended?: string;
}

// ─── Update Params ──────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing volume sync.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`id`, `service`, `created`, `modified`, `progress`, `type`) are excluded.
 */
export interface VolumeSyncUpdateParams {
	/** Sync display name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** Source volume reference (FK to `volumes`). */
	source_volume?: string;

	/** Destination volume reference (FK to `volumes`). */
	destination_volume?: string;

	/** Human-readable description. */
	description?: string;

	/** Whether the sync is enabled. */
	enabled?: boolean;

	/** Source path within the source volume. */
	source_path?: string;

	/** Destination path within the destination volume. */
	destination_path?: string;

	/** Include patterns (newline-delimited). */
	include?: string;

	/** Exclude patterns (newline-delimited). */
	exclude?: string;

	/** Whether to freeze the filesystem before syncing. */
	fsfreeze?: boolean;

	/** Whether to preserve ACLs. */
	preserve_ACLs?: boolean;

	/** Whether to copy symlinks. */
	copy_symlinks?: boolean;

	/** Whether to preserve extended attributes. */
	preserve_xattrs?: boolean;

	/** Whether to preserve file permissions. */
	preserve_permissions?: boolean;

	/** Whether to preserve modification times. */
	preserve_mod_time?: boolean;

	/** Whether to preserve group ownership. */
	preserve_groups?: boolean;

	/** Whether to preserve file ownership. */
	preserve_owner?: boolean;

	/** Whether to preserve device files. */
	preserve_device_files?: boolean;

	/** Snapshot profile for scheduling (FK to `snapshot_profiles`). */
	start_time_profile?: FlexKey;

	/** Maximum run time in seconds. */
	run_time?: number;

	/** User to run the sync as. */
	run_as_user?: string;

	/** Destination delete behavior. */
	destination_delete?: VolumeSyncDestinationDelete;

	/** Maximum number of errors before stopping. */
	errors_max?: number;

	/** Number of worker threads (1–128). */
	workers?: number;

	/** Preferred storage tier. */
	preferred_tier?: VolumeSyncPreferredTier;

	/** Whether to omit directory modification times. */
	omit_dir_times?: boolean;

	/** Whether to omit symlink modification times. */
	omit_link_times?: boolean;

	/** Whether to write data directly to destination (skip temp files). */
	inplace?: boolean;

	/** Whether to use CIFS ACL handling. */
	cifsacl?: boolean;

	/** Sync method. */
	sync_method?: VolumeSyncMethod;

	/** Extended ysync options. */
	ysync_extended?: string;
}
