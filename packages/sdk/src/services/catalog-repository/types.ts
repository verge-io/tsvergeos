import type { FlexKey, Resource } from '../../types.js';

// ─── Catalog Repository Types ───────────────────────────────────────────────

/**
 * Repository type indicating the source of catalog data.
 */
export type CatalogRepositoryType = 'local' | 'provider' | 'remote' | 'remote-git' | 'yottabyte';

/**
 * Maximum storage tier for recipe downloads.
 *
 * Values are string representations of tier numbers.
 */
export type CatalogMaxTier = '1' | '2' | '3' | '4' | '5';

/**
 * Override scope for catalog publishing defaults.
 */
export type CatalogRepositoryOverrideScope = 'private' | 'global' | 'tenant' | 'none';

/**
 * A VergeOS catalog repository resource.
 *
 * Catalog repositories are sources of recipes. They can be local,
 * remote, or provider-type. Refreshing a repository discovers and
 * imports catalogs and their recipes.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface CatalogRepository extends Resource {
	/** Repository name. 1–255 chars, unique. */
	name: string;

	/** Repository description. 1–256 chars. */
	description?: string;

	/** Repository type. Default: `"local"`. Read-only. */
	type?: CatalogRepositoryType;

	/** Repository URL (for remote types). */
	url?: string;

	/** Authentication username. Max 64 chars. */
	user?: string;

	/** Authentication password. 8–256 chars. */
	password?: string;

	/** Whether to allow insecure (self-signed) certificates. Default: `false`. */
	allow_insecure?: boolean;

	/** Whether to auto-refresh the repository. Default: `true`. */
	auto_refresh?: boolean;

	/** Maximum storage tier for recipe downloads. Default: `"1"`. */
	max_tier?: CatalogMaxTier;

	/** Override the default publishing scope. Default: `"none"`. */
	override_default_scope?: CatalogRepositoryOverrideScope;

	/** Timestamp of last refresh. */
	last_refreshed?: number;

	/** Repository status (FK to `catalog_repository_status`). Read-only. */
	status?: FlexKey;

	/** Whether the repository is enabled. Default: `true`. */
	enabled?: boolean;
}

/**
 * Parameters for creating a new catalog repository.
 */
export interface CatalogRepositoryCreateParams {
	/** Repository name. Required. */
	name: string;

	/** Repository description. */
	description?: string;

	/** Repository URL (for remote types). */
	url?: string;

	/** Authentication username. */
	user?: string;

	/** Authentication password. */
	password?: string;

	/** Whether to allow insecure certificates. */
	allow_insecure?: boolean;

	/** Whether to auto-refresh. */
	auto_refresh?: boolean;

	/** Maximum storage tier. */
	max_tier?: CatalogMaxTier;

	/** Override default publishing scope. */
	override_default_scope?: CatalogRepositoryOverrideScope;

	/** Whether the repository is enabled. */
	enabled?: boolean;
}

/**
 * Parameters for updating an existing catalog repository.
 */
export interface CatalogRepositoryUpdateParams {
	/** Repository name. */
	name?: string;

	/** Repository description. */
	description?: string;

	/** Repository URL. */
	url?: string;

	/** Authentication username. */
	user?: string;

	/** Authentication password. */
	password?: string;

	/** Whether to allow insecure certificates. */
	allow_insecure?: boolean;

	/** Whether to auto-refresh. */
	auto_refresh?: boolean;

	/** Maximum storage tier. */
	max_tier?: CatalogMaxTier;

	/** Override default publishing scope. */
	override_default_scope?: CatalogRepositoryOverrideScope;

	/** Whether the repository is enabled. */
	enabled?: boolean;
}
