import type { Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS update branch resource (read-only).
 *
 * Update branches represent release channels for updates.
 * Display field is `description` (not `name`).
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface UpdateBranch extends Resource {
	/** Unique branch identifier. */
	name: string;

	/** Human-readable branch description (display field). */
	description?: string;

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;
}
