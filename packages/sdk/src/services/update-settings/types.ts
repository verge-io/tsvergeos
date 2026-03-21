import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * VergeOS update settings resource (singleton — max 1 row, key always `1`).
 *
 * Controls how the system checks for, downloads, and installs updates.
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface UpdateSettings extends Resource {
	/** Update source (FK → `update_sources`). */
	source?: FlexKey;

	/** ISO file for manual update (FK → `files`). */
	file?: FlexKey;

	/** Update branch (FK → `update_branches`). */
	branch?: FlexKey;

	/** Display name. */
	name?: string;

	/** Credentials user for the update source. */
	user?: string;

	/** Credentials password for the update source. */
	password?: string;

	/** Whether to automatically refresh available updates. */
	auto_refresh?: boolean;

	/** Whether to automatically download available updates. */
	auto_update?: boolean;

	/** Whether to automatically reboot after installing updates. */
	auto_reboot?: boolean;

	/** Preferred time for automatic updates (HH:MM format). */
	update_time?: string;

	/** Maximum vSAN usage percentage allowed during updates. */
	max_vsan_usage?: number;

	/** Whether to use warm reboot when possible. */
	warm_reboot?: boolean;

	/** Whether to update multiple clusters simultaneously. */
	multi_cluster_update?: boolean;

	/** Whether to create a cloud snapshot before updating. */
	snapshot_cloud_on_update?: boolean;

	/** Snapshot expiration period in seconds when created before updates. Default: `21600`. */
	snapshot_cloud_expire_seconds?: number;

	/** URL for release notes. Read-only. */
	release_notes_url?: string;

	/** Whether to anonymize statistics sent to the update server. */
	anonymize_statistics?: boolean;

	/** Currently installed version. Read-only. */
	installed?: boolean;

	/** Whether a reboot is required after the latest install. Read-only. */
	reboot_required?: boolean;

	/** Whether updates are currently being applied. Read-only. */
	applying_updates?: boolean;

	/** Whether to force applying updates. Read-only. */
	applying_updates_force?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating the system update settings.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`installed`, `reboot_required`, `applying_updates*`) are excluded.
 */
export interface UpdateSettingsUpdateParams {
	/** Update source (FK → `update_sources`). */
	source?: FlexKey;

	/** ISO file for manual update (FK → `files`). */
	file?: FlexKey;

	/** Update branch (FK → `update_branches`). */
	branch?: FlexKey;

	/** Display name. */
	name?: string;

	/** Credentials user. */
	user?: string;

	/** Credentials password. */
	password?: string;

	/** Whether to automatically refresh available updates. */
	auto_refresh?: boolean;

	/** Whether to automatically download available updates. */
	auto_update?: boolean;

	/** Whether to automatically reboot after installing updates. */
	auto_reboot?: boolean;

	/** Preferred time for automatic updates (HH:MM format). */
	update_time?: string;

	/** Maximum vSAN usage percentage allowed during updates. */
	max_vsan_usage?: number;

	/** Whether to use warm reboot when possible. */
	warm_reboot?: boolean;

	/** Whether to update multiple clusters simultaneously. */
	multi_cluster_update?: boolean;

	/** Whether to create a cloud snapshot before updating. */
	snapshot_cloud_on_update?: boolean;

	/** Snapshot expiration period in seconds when created before updates. */
	snapshot_cloud_expire_seconds?: number;

	/** Whether to anonymize statistics sent to the update server. */
	anonymize_statistics?: boolean;
}
