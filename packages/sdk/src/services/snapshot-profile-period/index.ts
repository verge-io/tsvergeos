/**
 * Snapshot profile period service registration module.
 *
 * Importing this module registers the {@link SnapshotProfilePeriodService} on
 * {@link VergeClient}, making `client.snapshotProfilePeriods` available.
 * This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/snapshot-profile-period';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { SnapshotProfilePeriodService } from './service.js';

VergeClient.registerService('snapshotProfilePeriods', SnapshotProfilePeriodService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing snapshot profile periods. */
		readonly snapshotProfilePeriods: SnapshotProfilePeriodService;
	}
}

export { SnapshotProfilePeriodService } from './service.js';
export type {
	PeriodDayOfWeek,
	PeriodFrequency,
	PeriodMaxTier,
	SnapshotProfilePeriod,
	SnapshotProfilePeriodCreateParams,
	SnapshotProfilePeriodUpdateParams,
} from './types.js';
