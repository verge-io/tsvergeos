import type { FlexKey, Resource } from "../../types.js";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS group membership resource.
 *
 * Members represent the join table linking users or groups to parent groups.
 * Both `parent_group` and `member` are read-only after creation, so updates
 * are effectively limited to the `system` flag.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface Member extends Resource {
  /** Parent group FK (FK to `groups`). Read-only after creation. */
  parent_group?: FlexKey;

  /** Member reference string (e.g., `users/3` or `groups/5`). Read-only after creation. */
  member?: string;

  /** System member FK (FK to `/sys/members`). Read-only. */
  sys_member?: FlexKey;

  /** Whether this is a system-managed membership. Locked. */
  system?: boolean;

  /** User who created this membership. Read-only. */
  creator?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new group membership.
 *
 * Both `parent_group` and `member` become read-only after creation.
 */
export interface MemberCreateParams {
  /** Parent group to add the member to (FK to `groups`). */
  parent_group: FlexKey;

  /** Member reference string (e.g., `users/3` or `groups/5`). */
  member: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing group membership.
 *
 * Both key fields (`parent_group`, `member`) are read-only after creation,
 * and `system` is a locked field. No mutable fields remain, but the
 * interface is kept for type compatibility with {@link BaseService}.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MemberUpdateParams {}
