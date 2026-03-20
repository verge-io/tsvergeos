/**
 * Cloud snapshot service registration module.
 *
 * Importing this module registers the {@link CloudSnapshotService} on {@link VergeClient},
 * making `client.cloudSnapshots` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/cloud-snapshot';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { CloudSnapshotService } from './service.js';

VergeClient.registerService('cloudSnapshots', CloudSnapshotService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing cloud snapshots. */
		readonly cloudSnapshots: CloudSnapshotService;
	}
}

export { CloudSnapshotService } from './service.js';
export type {
	CloudSnapshot,
	CloudSnapshotCreateParams,
	CloudSnapshotExpiresType,
	CloudSnapshotImmutableStatus,
	CloudSnapshotStatus,
	CloudSnapshotUpdateParams,
} from './types.js';
