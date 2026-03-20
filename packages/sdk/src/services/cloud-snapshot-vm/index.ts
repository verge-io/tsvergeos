/**
 * Cloud snapshot VM service registration module.
 *
 * Importing this module registers the {@link CloudSnapshotVMService} on {@link VergeClient},
 * making `client.cloudSnapshotVms` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/cloud-snapshot-vm';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { CloudSnapshotVMService } from './service.js';

VergeClient.registerService('cloudSnapshotVms', CloudSnapshotVMService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying VMs captured in cloud snapshots. */
		readonly cloudSnapshotVms: CloudSnapshotVMService;
	}
}

export { CloudSnapshotVMService } from './service.js';
export type { CloudSnapshotVM, CloudSnapshotVMStatus } from './types.js';
