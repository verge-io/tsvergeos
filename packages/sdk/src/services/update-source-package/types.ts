import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS update source package resource (read-only).
 *
 * Represents an available update package from an update source within a branch.
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface UpdateSourcePackage extends Resource {
	/** Package name. */
	name?: string;

	/** Human-readable description. */
	description?: string;

	/** Branch this package belongs to (FK → `update_branches`). */
	branch?: FlexKey;

	/** Update source this package comes from (FK → `update_sources`). */
	source?: FlexKey;

	/** Package version string. */
	version?: string;

	/** Whether the package has been downloaded. */
	downloaded?: boolean;

	/** Package type (e.g., `'ybpkg'`). */
	type?: string;

	/** Whether the package is optional. */
	optional?: boolean;

	/** License feature required to install this package. */
	require_license_feature?: string;

	/** GPG signature. Read-only. */
	signature?: string;

	/** Creation timestamp. Read-only. */
	created?: string;
}
