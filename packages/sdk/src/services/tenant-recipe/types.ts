import type { FlexKey, Resource } from '../../types.js';

// ─── Tenant Recipe Types ────────────────────────────────────────────────────

/**
 * Valid actions for tenant recipe `_actions` endpoint.
 */
export type TenantRecipeAction = 'clone' | 'download' | 'remove' | 'republish';

/**
 * A VergeOS tenant recipe resource.
 *
 * Tenant recipes are marketplace templates for deploying tenants.
 * They are managed by the catalog system — create is not supported via
 * the SDK. Supports list, get, update, and delete operations.
 *
 * Compared to VM recipes, tenant recipes have `preserve_certs` but lack
 * `size`, `assets`, and `question_assets` fields.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface TenantRecipe extends Resource {
	/** 40-character hex string identifier. Read-only. */
	id?: string;

	/** Recipe name. 1–128 chars. */
	name: string;

	/** Recipe icon identifier. */
	icon?: string;

	/** Recipe description. 0–2048 chars. */
	description?: string;

	/** Whether to preserve certificates during deployment. Default: `false`. */
	preserve_certs?: boolean;

	/** Parent catalog (FK to `catalogs`). */
	catalog: FlexKey;

	/** Recipe status (FK to `recipe_status`). Read-only. */
	status?: FlexKey;

	/** Associated tenant snapshot (FK to `tenants`). */
	tenant_snapshot?: FlexKey;

	/** Associated tenant (FK to `tenants`). */
	tenant?: FlexKey;

	/** Whether the recipe has been downloaded. Default: `false`. */
	downloaded?: boolean;

	/** Whether an update is available. Default: `false`. */
	update_available?: boolean;

	/** Whether the recipe needs republishing. Default: `false`. */
	needs_republish?: boolean;

	/** Recipe version string. Default: `"1.0.0"`. */
	version?: string;

	/** Recipe build number. Default: `0`. */
	build?: number;

	/** Recipe dependencies. */
	dependencies?: string;

	/** Recipe creator. Read-only. */
	creator?: string;
}

/**
 * Parameters for updating an existing tenant recipe.
 */
export interface TenantRecipeUpdateParams {
	/** Recipe name. */
	name?: string;

	/** Recipe icon identifier. */
	icon?: string;

	/** Recipe description. */
	description?: string;

	/** Whether to preserve certificates during deployment. */
	preserve_certs?: boolean;

	/** Associated tenant snapshot (FK to `tenants`). */
	tenant_snapshot?: FlexKey;

	/** Associated tenant (FK to `tenants`). */
	tenant?: FlexKey;

	/** Recipe version string. */
	version?: string;

	/** Recipe build number. */
	build?: number;

	/** Whether the recipe has been downloaded. */
	downloaded?: boolean;

	/** Whether an update is available. */
	update_available?: boolean;

	/** Whether the recipe needs republishing. */
	needs_republish?: boolean;

	/** Recipe dependencies. */
	dependencies?: string;
}

/**
 * Options for deploying a tenant recipe instance.
 *
 * Unlike VM recipe deployment, tenant recipes do not support `auto_update`.
 */
export interface TenantRecipeDeployOptions {
	/** Name for the deployed instance. */
	name: string;

	/** Answers to recipe questions, keyed by question name. */
	answers?: Record<string, unknown>;
}
