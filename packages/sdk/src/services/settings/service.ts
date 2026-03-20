import { NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { WritableService } from '../base.js';
import type { Setting, SettingUpdateParams } from './types.js';

/**
 * Service for managing VergeOS system settings (key-value configuration).
 *
 * Settings are system-level configuration entries identified by a unique `key`
 * field (e.g., `"cloud_name"`, `"smtp_server"`). Each setting has a current
 * `value` and a `default_value` that can be restored via {@link resetToDefault}.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/settings';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all settings
 * const settings = await client.settings.list();
 *
 * // Get a specific setting by key name
 * const cloudName = await client.settings.getByKey('cloud_name');
 * console.log(cloudName.value);
 *
 * // Update a setting value
 * await client.settings.update(cloudName.$key, { value: 'My Cloud' });
 *
 * // Reset a setting to its default value
 * await client.settings.resetToDefault(cloudName.$key);
 * ```
 */
export class SettingsService extends WritableService<Setting, SettingUpdateParams> {
	constructor(http: HttpClient) {
		// The API action endpoint is 'settings_actions' with FK key 'setting'
		super(http, '/settings', 'Setting', {
			endpoint: 'settings_actions',
			key: 'setting',
		});
	}

	/**
	 * Get a setting by its unique key name.
	 *
	 * Performs a filtered list for the exact key match and returns the first result.
	 *
	 * @param key - The setting key name (e.g., `"cloud_name"`)
	 * @returns The matching setting
	 * @throws {@link NotFoundError} if no setting with that key exists
	 */
	async getByKey(key: string): Promise<Setting> {
		const results = await this.list({ filter: `key eq '${key}'` });
		if (results.length === 0) {
			throw new NotFoundError('Setting', key);
		}
		return results[0] as Setting;
	}

	/**
	 * Reset a setting to its default value.
	 *
	 * Dispatches the `reset` action via the `settings_actions` endpoint.
	 *
	 * @param key - The setting resource ID (`$key`, not the `key` field name)
	 */
	async resetToDefault(key: FlexKey): Promise<void> {
		await this.dispatchAction('reset', key);
	}
}
