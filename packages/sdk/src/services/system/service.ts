import type { HttpClient } from '../../http.js';
import type { System, SystemUpdateParams, VersionInfo } from './types.js';

/**
 * Service for accessing VergeOS system information.
 *
 * This is a custom singleton service — the system endpoint (`/api/v4/system`)
 * always has exactly one row (key `self`). It also provides access to the
 * lightweight `/version.json` endpoint.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/system';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // Get lightweight version info
 * const info = await client.system.getInfo();
 * console.log(info.version); // "6.1.2"
 *
 * // Get full system record
 * const system = await client.system.get();
 * console.log(system.cloud_name);
 * ```
 */
export class SystemService {
	/** @internal */
	protected readonly http: HttpClient;

	constructor(http: HttpClient) {
		this.http = http;
	}

	/**
	 * Get lightweight version information from `/version.json`.
	 *
	 * This endpoint lives outside the `/api/v4/` path and returns minimal
	 * version data: product name, version string, and build hash.
	 *
	 * @returns Version information
	 */
	async getInfo(): Promise<VersionInfo> {
		return this.http.getAbsolute<VersionInfo>('/version.json');
	}

	/**
	 * Get the full system record.
	 *
	 * The system is a singleton — there is always exactly one row with key `self`.
	 *
	 * @returns The system record with all fields
	 */
	async get(): Promise<System> {
		return this.http.get<System>('/system/self');
	}

	/**
	 * Update the system record.
	 *
	 * @param params - Fields to update
	 * @returns The updated system record
	 */
	async update(params: SystemUpdateParams): Promise<System> {
		await this.http.put('/system/self', { body: params });
		return this.get();
	}

	/**
	 * Query the system's public IP for geographic location information.
	 *
	 * Dispatches the `geoip` action via `/api/v4/system_actions`.
	 */
	async geoip(): Promise<void> {
		await this.http.post('/system_actions', {
			body: { action: 'geoip', params: {} },
		});
	}
}
