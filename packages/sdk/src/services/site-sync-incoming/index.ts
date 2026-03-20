/**
 * Incoming site sync service registration module.
 *
 * Importing this module registers the {@link SiteSyncIncomingService} on {@link VergeClient},
 * making `client.siteSyncsIncoming` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/site-sync-incoming';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { SiteSyncIncomingService } from './service.js';

VergeClient.registerService('siteSyncsIncoming', SiteSyncIncomingService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing incoming site syncs. */
		readonly siteSyncsIncoming: SiteSyncIncomingService;
	}
}

export { SiteSyncIncomingService } from './service.js';
export type {
	SiteSyncIncoming,
	SiteSyncIncomingCreateParams,
	SiteSyncIncomingForceTier,
	SiteSyncIncomingState,
	SiteSyncIncomingStatus,
	SiteSyncIncomingUpdateParams,
} from './types.js';
