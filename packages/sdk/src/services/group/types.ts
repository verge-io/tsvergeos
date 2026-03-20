import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS group resource.
 *
 * Groups organize users for collective permission management and access control.
 * Users and other groups can be added as members.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface Group extends Resource {
	/** Group name. Min 1, max 128 characters. Unique. */
	name: string;

	/** User-settable identifier string. Unique. */
	id?: string;

	/** Whether the group is enabled. Default: `true`. */
	enabled?: boolean;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Email address. */
	email?: string;

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;

	/** Whether this is a system-managed group. Read-only. */
	system_group?: boolean;

	/** Authorization source reference (FK to `auth_sources`). Read-only. */
	auth_source?: FlexKey;

	/** System group reference (FK to `/sys/groups`). Read-only. */
	sysgroup?: FlexKey;

	/** Identity reference (FK to `/sys/identities`). Read-only. */
	identity?: FlexKey;

	/** User who created this group. Read-only. */
	creator?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new group.
 *
 * Only `name` is required. Read-only fields (`created`, `system_group`,
 * `auth_source`, `sysgroup`, `identity`, `creator`) are excluded.
 */
export interface GroupCreateParams {
	/** Group name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** User-settable identifier string. */
	id?: string;

	/** Whether the group is enabled. Default: `true`. */
	enabled?: boolean;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Email address. */
	email?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing group.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields are excluded.
 */
export interface GroupUpdateParams {
	/** Group name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** User-settable identifier string. */
	id?: string;

	/** Whether the group is enabled. */
	enabled?: boolean;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Email address. */
	email?: string;
}
