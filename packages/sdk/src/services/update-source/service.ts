import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	UpdateSource,
	UpdateSourceAction,
	UpdateSourceCreateParams,
	UpdateSourceUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS update sources.
 *
 * Update sources are the servers from which the system downloads updates.
 * Actions are dispatched via the dedicated `/update_actions` endpoint with
 * the FK body key `source` (overriding the default derivation which would
 * produce `update_source`).
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/update-source';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all update sources
 * const sources = await client.updateSources.list();
 *
 * // Refresh a source
 * await client.updateSources.refresh(1);
 *
 * // Download updates from a source
 * await client.updateSources.download(1);
 * ```
 */
export class UpdateSourceService extends BaseService<
	UpdateSource,
	UpdateSourceCreateParams,
	UpdateSourceUpdateParams
> {
	constructor(http: HttpClient) {
		// Override action config: endpoint is 'update_actions', FK key is 'source'
		super(http, '/update_sources', 'UpdateSource', {
			endpoint: 'update_actions',
			key: 'source',
		});
	}

	/**
	 * Dispatch an update action for this source.
	 *
	 * @param action - The action to perform
	 * @param key - The update source ID
	 * @param params - Optional action parameters
	 */
	async runAction(
		action: UpdateSourceAction,
		key: FlexKey,
		params?: Record<string, unknown>,
	): Promise<void> {
		await this.dispatchAction(action, key, params);
	}

	/**
	 * Refresh the list of available packages from this source.
	 *
	 * @param key - The update source ID
	 */
	async refresh(key: FlexKey): Promise<void> {
		await this.dispatchAction('refresh', key);
	}

	/**
	 * Download available updates from this source.
	 *
	 * @param key - The update source ID
	 */
	async download(key: FlexKey): Promise<void> {
		await this.dispatchAction('download', key);
	}

	/**
	 * Install downloaded updates from this source.
	 *
	 * @param key - The update source ID
	 */
	async install(key: FlexKey): Promise<void> {
		await this.dispatchAction('install', key);
	}

	/**
	 * Apply updates from this source.
	 *
	 * @param key - The update source ID
	 */
	async apply(key: FlexKey): Promise<void> {
		await this.dispatchAction('apply', key);
	}

	/**
	 * Refresh package counts for this source.
	 *
	 * @param key - The update source ID
	 */
	async refreshCounts(key: FlexKey): Promise<void> {
		await this.dispatchAction('refresh_counts', key);
	}

	/**
	 * Perform all update steps (refresh, download, install, apply) for this source.
	 *
	 * @param key - The update source ID
	 */
	async all(key: FlexKey): Promise<void> {
		await this.dispatchAction('all', key);
	}
}
