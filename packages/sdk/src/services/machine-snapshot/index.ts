/**
 * Machine Snapshot service registration module.
 *
 * Importing this module registers the {@link MachineSnapshotService} on {@link VergeClient},
 * making `client.machineSnapshots` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/machine-snapshot';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MachineSnapshotService } from './service.js';

VergeClient.registerService('machineSnapshots', MachineSnapshotService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing machine snapshots. */
		readonly machineSnapshots: MachineSnapshotService;
	}
}

export { MachineSnapshotService } from './service.js';
export type {
	ExpiresType,
	MachineSnapshot,
	MachineSnapshotCreateParams,
	MachineSnapshotUpdateParams,
} from './types.js';
