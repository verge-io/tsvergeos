import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS tenant Layer 2 network assignment.
 *
 * Links a host-level Layer 2 vnet to a tenant, allowing the tenant
 * to access the underlying network. Both `tenant` and `vnet` are
 * set at creation and become read-only afterward.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface TenantLayer2Network extends Resource {
	/** Parent tenant (FK to `tenants`). Read-only after creation. */
	tenant: FlexKey;

	/** Layer 2 vnet (FK to `vnets`). Read-only after creation. */
	vnet: FlexKey;

	/** Whether this Layer 2 assignment is enabled. Default: `true`. */
	enabled?: boolean;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new tenant Layer 2 network assignment.
 *
 * Both `tenant` and `vnet` are required and become read-only after creation.
 */
export interface TenantLayer2CreateParams {
	/** Parent tenant (FK to `tenants`). Required. */
	tenant: FlexKey;

	/** Layer 2 vnet (FK to `vnets`). Required. */
	vnet: FlexKey;

	/** Whether this Layer 2 assignment is enabled. Default: `true`. */
	enabled?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing tenant Layer 2 network assignment.
 *
 * Only `enabled` can be changed after creation.
 */
export interface TenantLayer2UpdateParams {
	/** Whether this Layer 2 assignment is enabled. */
	enabled?: boolean;
}
