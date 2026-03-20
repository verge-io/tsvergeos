import type { FlexKey, Resource } from '../../types.js';

// ─── Catalog Types ──────────────────────────────────────────────────────────

/**
 * Publishing scope for a catalog.
 *
 * Controls which tenants can see and use recipes from this catalog.
 */
export type CatalogPublishingScope = 'private' | 'global' | 'tenant' | 'none';

/**
 * A VergeOS catalog resource.
 *
 * Catalogs are containers for VM and tenant recipes, managed by the
 * repository refresh process. They cannot be created directly via the SDK.
 * Catalog keys are 40-character hex strings.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface Catalog extends Resource {
	/** 40-character hex string identifier. Read-only. */
	id?: string;

	/** Parent repository (FK to `catalog_repositories`). Read-only. */
	repository?: FlexKey;

	/** Catalog name. 1–255 chars. */
	name: string;

	/** Publishing scope controlling visibility. Default: `"private"`. */
	publishing_scope?: CatalogPublishingScope;

	/** Catalog description. 0–512 chars. */
	description?: string;

	/** VM recipes in this catalog. */
	vm_recipes?: unknown;

	/** Tenant recipes in this catalog. */
	tenant_recipes?: unknown;

	/** Whether the catalog is enabled. Default: `true`. */
	enabled?: boolean;

	/** Creation timestamp. Read-only. */
	created?: number;
}

/**
 * Parameters for updating an existing catalog.
 */
export interface CatalogUpdateParams {
	/** Catalog name. */
	name?: string;

	/** Publishing scope. */
	publishing_scope?: CatalogPublishingScope;

	/** Catalog description. */
	description?: string;

	/** Whether the catalog is enabled. */
	enabled?: boolean;
}
