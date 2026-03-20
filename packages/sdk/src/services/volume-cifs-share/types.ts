import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS CIFS share resource.
 *
 * CIFS shares expose volume paths via the SMB protocol. They are children
 * of volumes and use 40-character SHA1 hash strings as keys. The `volume`
 * FK references the parent volume.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface VolumeCIFSShare extends Resource {
	/** Share ID — 40-character SHA1 hash. Read-only. */
	id: string;

	/** Share display name. Min 1, max 128 characters. Unique. */
	name: string;

	/** Parent volume reference (FK to `volumes`). Read-only after create. */
	volume: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the share is enabled. Default: `true`. */
	enabled?: boolean;

	/** Creation timestamp (Unix epoch, uint32). Read-only. */
	created?: number;

	/** Last modification timestamp (Unix epoch, uint32). Read-only. */
	modified?: number;

	/** Path within the volume to share. */
	share_path?: string;

	/** Share comment. Max 64 characters. */
	comment?: string;

	/** Valid users (newline-delimited). */
	valid_users?: string;

	/** Valid groups (newline-delimited). */
	valid_groups?: string;

	/** Admin users (newline-delimited). */
	admin_users?: string;

	/** Admin groups (newline-delimited). */
	admin_groups?: string;

	/** Allowed hosts (newline-delimited). */
	host_allow?: string;

	/** Denied hosts (newline-delimited). */
	host_deny?: string;

	/** Force user option. */
	force_user?: string;

	/** Force group option. */
	force_group?: string;

	/** Whether the share is browseable. */
	browseable?: boolean;

	/** Whether the share is read-only. */
	read_only?: boolean;

	/** Whether guest access is allowed. */
	guest_ok?: boolean;

	/** Whether only guest access is allowed. */
	guest_only?: boolean;

	/** Advanced SMB configuration directives. Max 65536 characters. */
	advanced?: string;

	/** Whether shadow copy (VSS) is enabled. */
	vfs_shadow_copy2?: boolean;

	/** Share status reference (FK to `volume_share_status`). Read-only. */
	status?: FlexKey;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new CIFS share.
 *
 * `name` and `volume` are required. Read-only fields (`id`, `created`,
 * `modified`, `status`) are excluded.
 */
export interface VolumeCIFSShareCreateParams {
	/** Share display name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Parent volume reference (FK to `volumes`). SHA1 string key. Required. */
	volume: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the share is enabled. Default: `true`. */
	enabled?: boolean;

	/** Path within the volume to share. */
	share_path?: string;

	/** Share comment. Max 64 characters. */
	comment?: string;

	/** Valid users (newline-delimited). */
	valid_users?: string;

	/** Valid groups (newline-delimited). */
	valid_groups?: string;

	/** Admin users (newline-delimited). */
	admin_users?: string;

	/** Admin groups (newline-delimited). */
	admin_groups?: string;

	/** Allowed hosts (newline-delimited). */
	host_allow?: string;

	/** Denied hosts (newline-delimited). */
	host_deny?: string;

	/** Force user option. */
	force_user?: string;

	/** Force group option. */
	force_group?: string;

	/** Whether the share is browseable. */
	browseable?: boolean;

	/** Whether the share is read-only. */
	read_only?: boolean;

	/** Whether guest access is allowed. */
	guest_ok?: boolean;

	/** Whether only guest access is allowed. */
	guest_only?: boolean;

	/** Advanced SMB configuration directives. Max 65536 characters. */
	advanced?: string;

	/** Whether shadow copy (VSS) is enabled. */
	vfs_shadow_copy2?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing CIFS share.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`id`, `volume`, `created`, `modified`, `status`) are excluded.
 */
export interface VolumeCIFSShareUpdateParams {
	/** Share display name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the share is enabled. */
	enabled?: boolean;

	/** Path within the volume to share. */
	share_path?: string;

	/** Share comment. Max 64 characters. */
	comment?: string;

	/** Valid users (newline-delimited). */
	valid_users?: string;

	/** Valid groups (newline-delimited). */
	valid_groups?: string;

	/** Admin users (newline-delimited). */
	admin_users?: string;

	/** Admin groups (newline-delimited). */
	admin_groups?: string;

	/** Allowed hosts (newline-delimited). */
	host_allow?: string;

	/** Denied hosts (newline-delimited). */
	host_deny?: string;

	/** Force user option. */
	force_user?: string;

	/** Force group option. */
	force_group?: string;

	/** Whether the share is browseable. */
	browseable?: boolean;

	/** Whether the share is read-only. */
	read_only?: boolean;

	/** Whether guest access is allowed. */
	guest_ok?: boolean;

	/** Whether only guest access is allowed. */
	guest_only?: boolean;

	/** Advanced SMB configuration directives. Max 65536 characters. */
	advanced?: string;

	/** Whether shadow copy (VSS) is enabled. */
	vfs_shadow_copy2?: boolean;
}
