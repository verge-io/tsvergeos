import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	SiteSyncProfilePeriod,
	SiteSyncProfilePeriodCreateParams,
	SiteSyncProfilePeriodUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS site sync profile periods.
 *
 * Profile periods link outgoing site syncs to snapshot profile periods,
 * configuring remote retention, priority, and destination naming for
 * replicated snapshots.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/site-sync-profile-period';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all profile periods
 * const periods = await client.siteSyncProfilePeriods.list();
 *
 * // List profile periods for a specific outgoing sync
 * const syncPeriods = await client.siteSyncProfilePeriods.listByOutgoingSync(1);
 * ```
 */
export class SiteSyncProfilePeriodService extends BaseService<
	SiteSyncProfilePeriod,
	SiteSyncProfilePeriodCreateParams,
	SiteSyncProfilePeriodUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/site_syncs_outgoing_profile_periods', 'Profile Period');
	}

	/**
	 * List profile periods belonging to a specific outgoing sync.
	 *
	 * @param syncKey - The outgoing sync ID to filter by
	 * @param options - Additional list options (fields, sort, limit, etc.)
	 * @returns Array of profile periods for the given outgoing sync
	 */
	async listByOutgoingSync(
		syncKey: FlexKey,
		options?: ListOptions,
	): Promise<SiteSyncProfilePeriod[]> {
		const syncFilter = `site_syncs_outgoing eq ${syncKey}`;
		const filter = options?.filter ? `(${options.filter}) and ${syncFilter}` : syncFilter;
		return this.list({ ...options, filter });
	}
}
