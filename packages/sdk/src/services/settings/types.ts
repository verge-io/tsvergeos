import type { Resource } from '../../types.js';

/**
 * A VergeOS system configuration setting (key-value pair).
 *
 * Settings are system-level configuration entries with a unique key,
 * a current value, and a default value. The `key` field is read-only
 * and serves as the logical identifier.
 */
export interface Setting extends Resource {
	/** Unique setting key (e.g., `"cloud_name"`). Read-only. */
	key: string;
	/** Current value of the setting. */
	value?: string;
	/** Default value of the setting. Read-only. */
	default_value?: string;
	/** Description of what this setting controls. */
	description?: string;
}

/**
 * Fields that can be updated on a setting.
 *
 * Only `value` and `description` are writable — `key` and `default_value` are read-only.
 */
export interface SettingUpdateParams {
	/** New value for the setting. */
	value?: string;
	/** Updated description. */
	description?: string;
}
