import type { FlexKey, Resource } from "../../types.js";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS tenant storage resource.
 *
 * Tenant storage allocations define how much storage from a given tier
 * is provisioned for a tenant. Each allocation links a tenant to a
 * storage tier with a provisioned capacity.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface TenantStorage extends Resource {
  /** Parent tenant (FK to `tenants`). */
  tenant: FlexKey;

  /** Storage tier (FK to `storage_tiers`). Read-only after creation. */
  tier: FlexKey;

  /** Provisioned storage capacity in bytes. Default: `0`. */
  provisioned?: number;

  /** Used storage in bytes. Default: `0`. */
  used?: number;

  /** Allocated storage in bytes. Default: `0`. */
  allocated?: number;

  // ─── Read-only fields ────────────────────────────────────────────────

  /** Used storage as a percentage. Read-only. */
  used_pct?: number;

  /** Last modification timestamp (Unix epoch). Read-only. */
  last_update?: number;

  /** Last walk timestamp (Unix epoch). */
  last_walk?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new tenant storage allocation.
 *
 * `tenant` and `tier` are required. After creation, `tier` becomes read-only.
 */
export interface TenantStorageCreateParams {
  /** Parent tenant (FK to `tenants`). Required. */
  tenant: FlexKey;

  /** Storage tier (FK to `storage_tiers`). Required. */
  tier: FlexKey;

  /** Provisioned storage capacity in bytes. Default: `0`. */
  provisioned?: number;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing tenant storage allocation.
 *
 * Only `provisioned` can be changed after creation.
 */
export interface TenantStorageUpdateParams {
  /** Provisioned storage capacity in bytes. */
  provisioned?: number;
}
