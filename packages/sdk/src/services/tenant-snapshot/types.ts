import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS tenant snapshot resource.
 *
 * Tenant snapshots are created automatically by snapshot profiles or
 * manually via tenant actions — they cannot be created directly via
 * the API. Supports list, get, update, and delete operations.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface TenantSnapshot extends Resource {
	/** Parent tenant (FK to `tenants`). */
	tenant: FlexKey;

	/** Snapshot name. Read-only. */
	name?: string;

	/** Snapshot profile name. */
	profile?: string;

	/** Profile period. */
	period?: string;

	/** Minimum number of snapshots to retain. Default: `0`. */
	min_snapshots?: number;

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;

	/** Description of the snapshot. */
	description?: string;

	/** Expiration timestamp (Unix epoch). `0` means never expires. */
	expires?: number;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing tenant snapshot.
 *
 * Only `description` and `expires` can be changed.
 */
export interface TenantSnapshotUpdateParams {
	/** Description of the snapshot. */
	description?: string;

	/** Expiration timestamp (Unix epoch). Set to `0` for never expires. */
	expires?: number;
}
