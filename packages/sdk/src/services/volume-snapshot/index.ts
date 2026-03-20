/**
 * Volume Snapshot service registration module.
 *
 * Importing this module registers the {@link VolumeSnapshotService} on {@link VergeClient},
 * making `client.volumeSnapshots` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/volume-snapshot';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { VolumeSnapshotService } from './service.js';

VergeClient.registerService('volumeSnapshots', VolumeSnapshotService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing volume snapshots. */
		readonly volumeSnapshots: VolumeSnapshotService;
	}
}

export { VolumeSnapshotService } from './service.js';
export type {
	VolumeSnapshot,
	VolumeSnapshotCreateParams,
	VolumeSnapshotExpiresType,
	VolumeSnapshotUpdateParams,
} from './types.js';
