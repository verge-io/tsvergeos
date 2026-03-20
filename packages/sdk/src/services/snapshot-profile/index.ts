/**
 * Snapshot profile service registration module.
 *
 * Importing this module registers the {@link SnapshotProfileService} on {@link VergeClient},
 * making `client.snapshotProfiles` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/snapshot-profile';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { SnapshotProfileService } from './service.js';

VergeClient.registerService('snapshotProfiles', SnapshotProfileService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing snapshot profiles. */
		readonly snapshotProfiles: SnapshotProfileService;
	}
}

export { SnapshotProfileService } from './service.js';
export type {
	SnapshotProfile,
	SnapshotProfileCreateParams,
	SnapshotProfileUpdateParams,
} from './types.js';
