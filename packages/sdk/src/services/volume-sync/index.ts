/**
 * Volume Sync service registration module.
 *
 * Importing this module registers the {@link VolumeSyncService} on {@link VergeClient},
 * making `client.volumeSyncs` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/volume-sync';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { VolumeSyncService } from './service.js';

VergeClient.registerService('volumeSyncs', VolumeSyncService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing volume syncs. */
		readonly volumeSyncs: VolumeSyncService;
	}
}

export { VolumeSyncService } from './service.js';
export type {
	VolumeSync,
	VolumeSyncCreateParams,
	VolumeSyncDestinationDelete,
	VolumeSyncMethod,
	VolumeSyncPreferredTier,
	VolumeSyncType,
	VolumeSyncUpdateParams,
} from './types.js';
