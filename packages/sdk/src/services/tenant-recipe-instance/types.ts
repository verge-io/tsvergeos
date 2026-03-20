import type { FlexKey, Resource } from '../../types.js';

/**
 * A VergeOS tenant recipe instance resource.
 *
 * Tenant recipe instances represent deployed instances of tenant recipes.
 * They are created when a tenant recipe is deployed and track the
 * relationship between the recipe and the resulting tenant.
 *
 * Unlike VM recipe instances, tenant instances do not have `update`,
 * `verify`, `simulate`, or `auto_update` fields. The `answers` field
 * is read-only after creation.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface TenantRecipeInstance extends Resource {
	/** Parent recipe (FK to `tenant_recipes`). Read-only. */
	recipe?: FlexKey;

	/** Associated tenant (FK to `tenants`). Read-only. */
	tenant?: FlexKey;

	/** Recipe version string. */
	version?: string;

	/** Recipe build number. */
	build?: number;

	/** Answers to recipe questions (JSON). Read-only. */
	answers?: Record<string, unknown>;

	/** Instance name. 1–128 chars. */
	name: string;

	/** Creation timestamp. Read-only. */
	created?: number;

	/** Last modification timestamp. Read-only. */
	modified?: number;
}

/**
 * Parameters for creating a tenant recipe instance (deploying a recipe).
 *
 * Unlike VM recipe deployment, tenant recipes do not support `auto_update`.
 */
export interface TenantRecipeInstanceCreateParams {
	/** Recipe key (40-char hex string FK to `tenant_recipes`). Required. */
	recipe: FlexKey;

	/** Instance name. Required. */
	name: string;

	/** Answers to recipe questions, keyed by question name. */
	answers?: Record<string, unknown>;
}

/**
 * Parameters for updating a tenant recipe instance.
 *
 * Only the name can be updated — answers are read-only after creation.
 */
export interface TenantRecipeInstanceUpdateParams {
	/** Instance name. */
	name?: string;
}
