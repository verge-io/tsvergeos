import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	SnapshotProfilePeriod,
	SnapshotProfilePeriodCreateParams,
	SnapshotProfilePeriodUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS snapshot profile periods.
 *
 * Periods define the schedule within a snapshot profile — frequency, retention
 * count, and time window. A profile can have multiple periods (e.g., hourly
 * with 24 retained + daily with 7 retained).
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/snapshot-profile-period';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List periods for a specific profile
 * const periods = await client.snapshotProfilePeriods.listByProfile(1);
 *
 * // Create a new daily period with 7-day retention
 * const period = await client.snapshotProfilePeriods.create({
 *   profile: 1,
 *   name: 'Daily',
 *   frequency: 'daily',
 *   retention: 604800, // 7 days in seconds
 * });
 * ```
 */
export class SnapshotProfilePeriodService extends BaseService<
	SnapshotProfilePeriod,
	SnapshotProfilePeriodCreateParams,
	SnapshotProfilePeriodUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/snapshot_profile_periods', 'Snapshot Profile Period');
	}

	/**
	 * List periods belonging to a specific snapshot profile.
	 *
	 * Convenience method that filters by the `profile` foreign key.
	 *
	 * @param profileKey - The parent snapshot profile ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of periods for the specified profile
	 */
	async listByProfile(
		profileKey: FlexKey,
		options?: ListOptions,
	): Promise<SnapshotProfilePeriod[]> {
		const profileFilter = `profile eq ${profileKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter
			? `${profileFilter} and ${existingFilter}`
			: profileFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
