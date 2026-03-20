import type { Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS tag category resource.
 *
 * Tag categories group related tags (e.g., "Environment" → "production", "staging").
 * Each category has `taggable_*` boolean fields that control which resource types
 * can be tagged with tags in this category.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface TagCategory extends Resource {
	/** Category display name. Unique, trimmed. */
	name: string;

	/** Human-readable description. */
	description?: string;

	/** When true, only one tag from this category can be applied to a resource. */
	single_tag_selection?: boolean;

	/** Timestamp when this category was created (read-only). */
	created?: number;

	/** Timestamp when this category was last modified (read-only). */
	modified?: number;

	/** Whether VMs can be tagged with tags in this category. */
	taggable_vms?: boolean;

	/** Whether networks can be tagged with tags in this category. */
	taggable_vnets?: boolean;

	/** Whether volumes can be tagged with tags in this category. */
	taggable_volumes?: boolean;

	/** Whether network rules can be tagged with tags in this category. */
	taggable_vnet_rules?: boolean;

	/** Whether VMware containers can be tagged with tags in this category. */
	taggable_vmware_containers?: boolean;

	/** Whether users can be tagged with tags in this category. */
	taggable_users?: boolean;

	/** Whether tenant nodes can be tagged with tags in this category. */
	taggable_tenant_nodes?: boolean;

	/** Whether sites can be tagged with tags in this category. */
	taggable_sites?: boolean;

	/** Whether nodes can be tagged with tags in this category. */
	taggable_nodes?: boolean;

	/** Whether groups can be tagged with tags in this category. */
	taggable_groups?: boolean;

	/** Whether clusters can be tagged with tags in this category. */
	taggable_clusters?: boolean;

	/** Whether tenants can be tagged with tags in this category. */
	taggable_tenants?: boolean;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new tag category.
 *
 * `name` is required and must be unique.
 */
export interface TagCategoryCreateParams {
	/** Category display name. Must be unique. */
	name: string;

	/** Human-readable description. */
	description?: string;

	/** When true, only one tag from this category can be applied to a resource. */
	single_tag_selection?: boolean;

	/** Whether VMs can be tagged with tags in this category. */
	taggable_vms?: boolean;

	/** Whether networks can be tagged with tags in this category. */
	taggable_vnets?: boolean;

	/** Whether volumes can be tagged with tags in this category. */
	taggable_volumes?: boolean;

	/** Whether network rules can be tagged with tags in this category. */
	taggable_vnet_rules?: boolean;

	/** Whether VMware containers can be tagged with tags in this category. */
	taggable_vmware_containers?: boolean;

	/** Whether users can be tagged with tags in this category. */
	taggable_users?: boolean;

	/** Whether tenant nodes can be tagged with tags in this category. */
	taggable_tenant_nodes?: boolean;

	/** Whether sites can be tagged with tags in this category. */
	taggable_sites?: boolean;

	/** Whether nodes can be tagged with tags in this category. */
	taggable_nodes?: boolean;

	/** Whether groups can be tagged with tags in this category. */
	taggable_groups?: boolean;

	/** Whether clusters can be tagged with tags in this category. */
	taggable_clusters?: boolean;

	/** Whether tenants can be tagged with tags in this category. */
	taggable_tenants?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing tag category.
 *
 * All fields are optional — only provided fields are changed.
 */
export interface TagCategoryUpdateParams {
	/** Category display name. Must be unique. */
	name?: string;

	/** Human-readable description. */
	description?: string;

	/** When true, only one tag from this category can be applied to a resource. */
	single_tag_selection?: boolean;

	/** Whether VMs can be tagged with tags in this category. */
	taggable_vms?: boolean;

	/** Whether networks can be tagged with tags in this category. */
	taggable_vnets?: boolean;

	/** Whether volumes can be tagged with tags in this category. */
	taggable_volumes?: boolean;

	/** Whether network rules can be tagged with tags in this category. */
	taggable_vnet_rules?: boolean;

	/** Whether VMware containers can be tagged with tags in this category. */
	taggable_vmware_containers?: boolean;

	/** Whether users can be tagged with tags in this category. */
	taggable_users?: boolean;

	/** Whether tenant nodes can be tagged with tags in this category. */
	taggable_tenant_nodes?: boolean;

	/** Whether sites can be tagged with tags in this category. */
	taggable_sites?: boolean;

	/** Whether nodes can be tagged with tags in this category. */
	taggable_nodes?: boolean;

	/** Whether groups can be tagged with tags in this category. */
	taggable_groups?: boolean;

	/** Whether clusters can be tagged with tags in this category. */
	taggable_clusters?: boolean;

	/** Whether tenants can be tagged with tags in this category. */
	taggable_tenants?: boolean;
}
