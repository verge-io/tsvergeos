import type { FlexKey, Resource } from '../../types.js';

// ─── Enum Types ─────────────────────────────────────────────────────────────

/** NFS squash mode controlling user ID mapping. */
export type NfsSquash = 'root_squash' | 'all_squash' | 'no_root_squash';

/** NFS data access mode. */
export type NfsDataAccess = 'ro' | 'rw';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS NFS share resource.
 *
 * NFS shares expose volume paths via the NFS protocol. They are children
 * of volumes and use 40-character SHA1 hash strings as keys. The `volume`
 * FK references the parent volume.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface VolumeNFSShare extends Resource {
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

	/** Allowed hosts (comma-delimited string). */
	allowed_hosts?: string;

	/** Whether all hosts are allowed. */
	allow_all?: boolean;

	/** Unique filesystem ID for NFS exports. */
	fsid?: string;

	/** Anonymous UID for unmapped users. */
	anonuid?: string;

	/** Anonymous GID for unmapped groups. */
	anongid?: string;

	/** Whether to disable ACL support. */
	no_acl?: boolean;

	/** Whether to allow connections from non-privileged ports. */
	insecure?: boolean;

	/** Whether to allow async NFS operations. */
	async?: boolean;

	/** User ID squashing mode. Default: `root_squash`. */
	squash?: NfsSquash;

	/** Data access mode. Default: `ro`. */
	data_access?: NfsDataAccess;

	/** Share status reference (FK to `volume_share_status`). Read-only. */
	status?: FlexKey;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new NFS share.
 *
 * `name` and `volume` are required. Read-only fields (`id`, `created`,
 * `modified`, `status`) are excluded.
 */
export interface VolumeNFSShareCreateParams {
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

	/** Allowed hosts (comma-delimited string). */
	allowed_hosts?: string;

	/** Whether all hosts are allowed. */
	allow_all?: boolean;

	/** Unique filesystem ID for NFS exports. */
	fsid?: string;

	/** Anonymous UID for unmapped users. */
	anonuid?: string;

	/** Anonymous GID for unmapped groups. */
	anongid?: string;

	/** Whether to disable ACL support. */
	no_acl?: boolean;

	/** Whether to allow connections from non-privileged ports. */
	insecure?: boolean;

	/** Whether to allow async NFS operations. */
	async?: boolean;

	/** User ID squashing mode. Default: `root_squash`. */
	squash?: NfsSquash;

	/** Data access mode. Default: `ro`. */
	data_access?: NfsDataAccess;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing NFS share.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`id`, `volume`, `created`, `modified`, `status`) are excluded.
 */
export interface VolumeNFSShareUpdateParams {
	/** Share display name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the share is enabled. */
	enabled?: boolean;

	/** Path within the volume to share. */
	share_path?: string;

	/** Allowed hosts (comma-delimited string). */
	allowed_hosts?: string;

	/** Whether all hosts are allowed. */
	allow_all?: boolean;

	/** Unique filesystem ID for NFS exports. */
	fsid?: string;

	/** Anonymous UID for unmapped users. */
	anonuid?: string;

	/** Anonymous GID for unmapped groups. */
	anongid?: string;

	/** Whether to disable ACL support. */
	no_acl?: boolean;

	/** Whether to allow connections from non-privileged ports. */
	insecure?: boolean;

	/** Whether to allow async NFS operations. */
	async?: boolean;

	/** User ID squashing mode. */
	squash?: NfsSquash;

	/** Data access mode. */
	data_access?: NfsDataAccess;
}
