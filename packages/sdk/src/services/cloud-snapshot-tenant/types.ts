import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ──────────────────────────────────────────────────

/** Cloud snapshot tenant import/recovery status. */
export type CloudSnapshotTenantStatus = 'idle' | 'importing' | 'complete' | 'error';

// ─── Resource Type ──────────────────────────────────────────────────────────

/**
 * A tenant captured within a VergeOS cloud snapshot.
 *
 * Cloud snapshot tenants are read-only records representing the tenants that
 * existed at the time a cloud snapshot was taken. Use these records to
 * browse snapshot contents or recover individual tenants.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface CloudSnapshotTenant extends Resource {
	/** FK to the parent cloud snapshot. Read-only. */
	cloud_snapshot: FlexKey;

	/** Original tenant key at the time the snapshot was taken. Read-only. */
	original_key: number;

	/** Tenant name at the time of snapshot. Read-only. */
	name: string;

	/** Tenant description at the time of snapshot. Read-only. */
	description?: string;

	/** Tenant UUID. Read-only. */
	uuid?: string;

	/** Number of nodes assigned to the tenant. Read-only. */
	nodes?: number;

	/** Number of CPU cores assigned to the tenant. Read-only. */
	cpu_cores?: number;

	/** RAM assigned to the tenant in bytes. Read-only. */
	ram?: number;

	/** Whether this entry itself is a snapshot. */
	is_snapshot?: boolean;

	/** Import/recovery status. */
	status?: CloudSnapshotTenantStatus;

	/** Additional status information (e.g., error details). */
	status_info?: string;
}
