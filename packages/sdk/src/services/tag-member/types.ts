import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS tag member resource.
 *
 * Tag members link {@link Tag} records to specific resources via a polymorphic
 * `member` reference in `"resource_type/id"` format (e.g., `"vms/123"`).
 *
 * Both `tag` and `member` are **read-only after creation** — to reassign,
 * delete and recreate. Deleting a tag cascades to all its tag members.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface TagMember extends Resource {
	/** FK to the tag being applied (read-only after creation). */
	tag: FlexKey;

	/** Polymorphic resource reference in `"type/id"` format, e.g. `"vms/123"` (read-only after creation). */
	member: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new tag member (assigning a tag to a resource).
 *
 * Both fields are required. The combination of `tag` + `member` must be unique
 * (the API returns "Tag member is already assigned" on duplicates).
 */
export interface TagMemberCreateParams {
	/** FK to the tag to apply. */
	tag: FlexKey;

	/** Polymorphic resource reference in `"type/id"` format, e.g. `"vms/123"`. */
	member: string;
}
