/**
 * Storage Tier Stats service registration module.
 *
 * Importing this module registers the {@link StorageTierStatsService} on {@link VergeClient},
 * making `client.storageTierStats` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/storage-tier-stats';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { StorageTierStatsService } from './service.js';

VergeClient.registerService('storageTierStats', StorageTierStatsService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying storage tier I/O statistics (read-only). */
		readonly storageTierStats: StorageTierStatsService;
	}
}

export { StorageTierStatsService } from './service.js';
export type { StorageTierStats } from './types.js';
