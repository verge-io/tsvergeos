import type { HttpClient } from '../../http.js';
import type { MutationOptions } from '../../types.js';
import type { UpdateSettings, UpdateSettingsUpdateParams } from './types.js';

/** Fixed key for the singleton update settings resource. */
const SINGLETON_KEY = 1;

/**
 * Service for managing VergeOS update settings.
 *
 * Update settings is a singleton resource (always key `1`). It controls
 * how the system checks for, downloads, and installs updates.
 *
 * This service does not extend the standard base classes because it is
 * a singleton with inline action dispatch rather than the standard
 * dedicated `_actions` endpoint pattern.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/update-settings';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // Get current update settings
 * const settings = await client.updateSettings.get();
 *
 * // Enable auto-update
 * await client.updateSettings.update({ auto_update: true });
 *
 * // Check for available updates
 * await client.updateSettings.checkForUpdates();
 * ```
 */
export class UpdateSettingsService {
	/** @internal */
	protected readonly http: HttpClient;

	/** API resource path. */
	protected readonly resource = '/update_settings';

	/**
	 * @param http - The HTTP client for making API requests
	 */
	constructor(http: HttpClient) {
		this.http = http;
	}

	/**
	 * Get the current update settings.
	 *
	 * @returns The singleton update settings resource
	 */
	async get(): Promise<UpdateSettings> {
		return this.http.get<UpdateSettings>(`${this.resource}/${SINGLETON_KEY}`, {
			params: { fields: 'most' },
		});
	}

	/**
	 * Update the system update settings.
	 *
	 * @param params - The fields to update
	 * @param options - Mutation options (e.g., `readBack: false` to skip re-fetch)
	 * @returns The updated settings (or partial if `readBack` is false)
	 */
	async update(
		params: UpdateSettingsUpdateParams,
		options?: MutationOptions,
	): Promise<UpdateSettings> {
		await this.http.put(`${this.resource}/${SINGLETON_KEY}`, { body: params });

		if (options?.readBack === false) {
			return { $key: SINGLETON_KEY } as unknown as UpdateSettings;
		}

		return this.get();
	}

	/**
	 * Check for available updates.
	 *
	 * Dispatched as inline action: `POST /update_settings/1/check`.
	 */
	async checkForUpdates(): Promise<void> {
		await this.http.post(`${this.resource}/${SINGLETON_KEY}/check`);
	}

	/**
	 * Download available updates.
	 *
	 * Dispatched as inline action: `POST /update_settings/1/download`.
	 */
	async downloadUpdates(): Promise<void> {
		await this.http.post(`${this.resource}/${SINGLETON_KEY}/download`);
	}

	/**
	 * Install downloaded updates.
	 *
	 * Dispatched as inline action: `POST /update_settings/1/install`.
	 */
	async installUpdates(): Promise<void> {
		await this.http.post(`${this.resource}/${SINGLETON_KEY}/install`);
	}

	/**
	 * Perform all update steps: check, download, and install.
	 *
	 * Dispatched as inline action: `POST /update_settings/1/all`.
	 */
	async updateAll(): Promise<void> {
		await this.http.post(`${this.resource}/${SINGLETON_KEY}/all`);
	}
}
