import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS permission resource.
 *
 * Permissions define identity-based access control for specific resources.
 * Each permission links an identity to a resource table/row with five
 * boolean capability flags: `list`, `read`, `create`, `modify`, `delete`.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface Permission extends Resource {
	/** Identity reference (FK to `/sys/identities`). */
	identity?: FlexKey;

	/** Display name of the identity. */
	identity_display?: string;

	/** Owner of the identity. */
	identity_owner?: string;

	/** Resource type string (e.g., `vms`, `networks`). */
	table?: string;

	/** Internal table ID. Read-only. */
	tableid?: number;

	/** Resource row ID. Read-only after creation. */
	row?: number;

	/** Display name of the resource row. */
	rowdisplay?: string;

	/** Whether the identity can list resources in this table. Default: `true`. */
	list?: boolean;

	/** Whether the identity can read the resource. */
	read?: boolean;

	/** Whether the identity can create resources in this table. */
	create?: boolean;

	/** Whether the identity can modify the resource. */
	modify?: boolean;

	/** Whether the identity can delete the resource. */
	delete?: boolean;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new permission.
 *
 * `identity`, `table`, and `row` are required. The `row` field becomes
 * read-only after creation.
 */
export interface PermissionCreateParams {
	/** Identity reference (FK to `/sys/identities`). */
	identity: FlexKey;

	/** Resource type string (e.g., `vms`, `networks`). */
	table: string;

	/** Resource row ID. */
	row: number;

	/** Display name of the resource row. */
	rowdisplay?: string;

	/** Display name of the identity. */
	identity_display?: string;

	/** Owner of the identity. */
	identity_owner?: string;

	/** Whether the identity can list resources in this table. Default: `true`. */
	list?: boolean;

	/** Whether the identity can read the resource. */
	read?: boolean;

	/** Whether the identity can create resources in this table. */
	create?: boolean;

	/** Whether the identity can modify the resource. */
	modify?: boolean;

	/** Whether the identity can delete the resource. */
	delete?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing permission.
 *
 * Only the five boolean capability flags can be updated.
 */
export interface PermissionUpdateParams {
	/** Whether the identity can list resources in this table. */
	list?: boolean;

	/** Whether the identity can read the resource. */
	read?: boolean;

	/** Whether the identity can create resources in this table. */
	create?: boolean;

	/** Whether the identity can modify the resource. */
	modify?: boolean;

	/** Whether the identity can delete the resource. */
	delete?: boolean;
}
