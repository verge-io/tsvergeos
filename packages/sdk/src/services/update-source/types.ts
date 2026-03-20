import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Actions available for update sources via the `/update_actions` endpoint. */
export type UpdateSourceAction =
	| 'refresh'
	| 'download'
	| 'install'
	| 'apply'
	| 'refresh_counts'
	| 'all';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS update source resource.
 *
 * Update sources are the servers from which the system downloads updates.
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface UpdateSource extends Resource {
	/** Unique name of the update source. */
	name?: string;

	/** Human-readable description. */
	description?: string;

	/** URL of the update source server. */
	url?: string;

	/** Authentication username. */
	user?: string;

	/** Authentication password. */
	password?: string;

	/** Whether this source is enabled. */
	enabled?: boolean;

	/** Last time the source was updated (timestamp). Read-only. */
	last_updated?: string;

	/** Last time the source was refreshed (timestamp). Read-only. */
	last_refreshed?: string;

	/** Status record (FK → `update_source_status`). Read-only. */
	status?: FlexKey;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new update source.
 */
export interface UpdateSourceCreateParams {
	/** Unique name for the update source. Required. */
	name: string;

	/** Human-readable description. */
	description?: string;

	/** URL of the update source server. Required. */
	url: string;

	/** Authentication username. */
	user?: string;

	/** Authentication password. */
	password?: string;

	/** Whether this source is enabled. Default: `true`. */
	enabled?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing update source.
 *
 * All fields are optional — only provided fields are changed.
 */
export interface UpdateSourceUpdateParams {
	/** Unique name for the update source. */
	name?: string;

	/** Human-readable description. */
	description?: string;

	/** URL of the update source server. */
	url?: string;

	/** Authentication username. */
	user?: string;

	/** Authentication password. */
	password?: string;

	/** Whether this source is enabled. */
	enabled?: boolean;
}
