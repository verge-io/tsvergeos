import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Theme access mode for a tenant. */
export type ThemeAccess = 'specified' | 'host_only' | 'local_only' | 'both';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS tenant resource.
 *
 * Tenants are isolated virtual environments running their own VergeOS instance
 * within a host system. Each tenant has its own nodes, storage, networks, and
 * user management.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface Tenant extends Resource {
	/** Tenant display name. Min 1, max 120 characters. Unique. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Admin user password. Max 256 characters. */
	password?: string;

	/** Whether admin must change password on first login. */
	change_password?: boolean;

	/** Whether system snapshots are exposed to the tenant. */
	expose_cloud_snapshots?: boolean;

	/** Whether the tenant can customize branding. */
	allow_branding?: boolean;

	/** URL of the tenant's VergeOS instance. */
	url?: string;

	/** Whether this resource is a snapshot. */
	is_snapshot?: boolean;

	/** Owner reference (FK). */
	owner?: FlexKey;

	/** Metadata JSON blob. */
	meta?: unknown;

	/** Network reference (FK to `vnets`). Read-only. */
	vnet?: FlexKey;

	/** OIDC application reference (FK to `oidc_applications`). */
	oidc_application?: FlexKey;

	/** UI address reference (FK to `vnet_addresses`). */
	ui_address?: FlexKey;

	/** UI FQDN reference (FK to `vnet_proxy_tenants`). */
	ui_fqdn?: FlexKey;

	/** Custom help URL. Default: `default`. */
	help_url?: string;

	/** User-facing note. Max 1024 characters. */
	note?: string;

	/** Whether the tenant network is isolated. Read-only. */
	isolate?: boolean;

	/** Theme access mode. */
	theme_access?: ThemeAccess;

	// ─── Read-only fields ────────────────────────────────────────────────

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;

	/** Tenant UUID string. Read-only. */
	uuid?: string;

	/** Recipe instance reference (FK to `tenant_recipe_instances`). Read-only. */
	recipe_instance?: FlexKey;

	/** Status reference (FK to `tenant_status`). Read-only. */
	status?: FlexKey;

	/** Stats reference (FK to `tenant_stats`). Read-only. */
	stats?: FlexKey;

	/** User who created this tenant. Read-only. */
	creator?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new tenant.
 *
 * Only `name` is required. Read-only fields (`created`, `uuid`,
 * `recipe_instance`, `vnet`, `status`, `stats`, `creator`, `isolate`)
 * are excluded.
 */
export interface TenantCreateParams {
	/** Tenant display name. Min 1, max 120 characters. Must be unique. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Admin user password. Max 256 characters. */
	password?: string;

	/** Whether admin must change password on first login. Default: `false`. */
	change_password?: boolean;

	/** Whether system snapshots are exposed. Default: `true`. */
	expose_cloud_snapshots?: boolean;

	/** Whether the tenant can customize branding. Default: `false`. */
	allow_branding?: boolean;

	/** URL of the tenant's VergeOS instance. */
	url?: string;

	/** Whether this is a snapshot. Default: `false`. */
	is_snapshot?: boolean;

	/** Owner reference (FK). */
	owner?: FlexKey;

	/** Metadata JSON blob. */
	meta?: unknown;

	/** OIDC application reference (FK to `oidc_applications`). */
	oidc_application?: FlexKey;

	/** UI address reference (FK to `vnet_addresses`). */
	ui_address?: FlexKey;

	/** UI FQDN reference (FK to `vnet_proxy_tenants`). */
	ui_fqdn?: FlexKey;

	/** Custom help URL. Default: `default`. */
	help_url?: string;

	/** User-facing note. Max 1024 characters. */
	note?: string;

	/** Theme access mode. Default: `host_only`. */
	theme_access?: ThemeAccess;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing tenant.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields are excluded.
 */
export interface TenantUpdateParams {
	/** Tenant display name. Min 1, max 120 characters. Must be unique. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Admin user password. Max 256 characters. */
	password?: string;

	/** Whether admin must change password on first login. */
	change_password?: boolean;

	/** Whether system snapshots are exposed. */
	expose_cloud_snapshots?: boolean;

	/** Whether the tenant can customize branding. */
	allow_branding?: boolean;

	/** URL of the tenant's VergeOS instance. */
	url?: string;

	/** Whether this is a snapshot. */
	is_snapshot?: boolean;

	/** Owner reference (FK). */
	owner?: FlexKey;

	/** Metadata JSON blob. */
	meta?: unknown;

	/** OIDC application reference (FK to `oidc_applications`). */
	oidc_application?: FlexKey;

	/** UI address reference (FK to `vnet_addresses`). */
	ui_address?: FlexKey;

	/** UI FQDN reference (FK to `vnet_proxy_tenants`). */
	ui_fqdn?: FlexKey;

	/** Custom help URL. */
	help_url?: string;

	/** User-facing note. Max 1024 characters. */
	note?: string;

	/** Theme access mode. */
	theme_access?: ThemeAccess;
}

// ─── Action Option Types ─────────────────────────────────────────────────────

/** Options for the tenant clone action. */
export interface TenantCloneOptions {
	/** Name for the cloned tenant. */
	name?: string;

	/** Whether to exclude virtual networks from the clone. */
	no_vnet?: boolean;

	/** Whether to exclude storage from the clone. */
	no_storage?: boolean;

	/** Whether to exclude nodes from the clone. */
	no_nodes?: boolean;
}
