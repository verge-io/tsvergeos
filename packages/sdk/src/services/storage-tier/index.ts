/**
 * Storage Tier service registration module.
 *
 * Importing this module registers the {@link StorageTierService} on {@link VergeClient},
 * making `client.storageTiers` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/storage-tier';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { StorageTierService } from './service.js';

VergeClient.registerService('storageTiers', StorageTierService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying storage tier capacity and utilization (read-only). */
		readonly storageTiers: StorageTierService;
	}
}

export { StorageTierService } from './service.js';
export type { StorageTier } from './types.js';
