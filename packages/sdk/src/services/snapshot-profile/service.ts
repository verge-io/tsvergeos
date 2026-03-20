import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	SnapshotProfile,
	SnapshotProfileCreateParams,
	SnapshotProfileUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS snapshot profiles.
 *
 * Snapshot profiles define automated backup schedules with retention policies.
 * Use {@link SnapshotProfilePeriodService} to manage the individual schedule
 * periods within a profile.
 *
 * Deletion uses the dedicated action endpoint (`/snapshot_profile_actions`)
 * rather than a standard DELETE request.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/snapshot-profile';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all snapshot profiles
 * const profiles = await client.snapshotProfiles.list();
 *
 * // Create a new profile
 * const profile = await client.snapshotProfiles.create({ name: 'Daily Backups' });
 *
 * // Delete a profile (uses action endpoint)
 * await client.snapshotProfiles.delete(profile.$key);
 * ```
 */
export class SnapshotProfileService extends BaseService<
	SnapshotProfile,
	SnapshotProfileCreateParams,
	SnapshotProfileUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/snapshot_profiles', 'Snapshot Profile');
	}

	/**
	 * Delete a snapshot profile.
	 *
	 * Overrides the default DELETE behavior to use the dedicated action endpoint
	 * `POST /snapshot_profile_actions` with action `"delete"`.
	 *
	 * @param key - The snapshot profile ID to delete
	 */
	override async delete(key: FlexKey): Promise<void> {
		await this.dispatchAction('delete', key);
	}
}
