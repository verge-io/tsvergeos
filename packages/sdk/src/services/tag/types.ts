import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS tag resource.
 *
 * Tags are named labels that belong to a {@link TagCategory} and can be applied
 * to resources via {@link TagMember} records. Tag names are unique within the system.
 *
 * Deleting a tag cascades to all its tag members.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface Tag extends Resource {
	/** Tag display name. Unique, trimmed. */
	name: string;

	/** Human-readable description. */
	description?: string;

	/** FK to the parent tag category. */
	category: FlexKey;

	/** Timestamp when this tag was created (read-only). */
	created?: number;

	/** Timestamp when this tag was last modified (read-only). */
	modified?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new tag.
 *
 * `name` and `category` are required. Tag names must be unique.
 */
export interface TagCreateParams {
	/** Tag display name. Must be unique. */
	name: string;

	/** FK to the parent tag category. */
	category: FlexKey;

	/** Human-readable description. */
	description?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing tag.
 *
 * All fields are optional — only provided fields are changed.
 * The `category` FK cannot be updated after creation.
 */
export interface TagUpdateParams {
	/** Tag display name. Must be unique. */
	name?: string;

	/** Human-readable description. */
	description?: string;
}
