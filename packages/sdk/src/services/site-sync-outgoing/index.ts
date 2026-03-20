/**
 * Outgoing site sync service registration module.
 *
 * Importing this module registers the {@link SiteSyncOutgoingService} on {@link VergeClient},
 * making `client.siteSyncsOutgoing` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/site-sync-outgoing';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { SiteSyncOutgoingService } from './service.js';

VergeClient.registerService('siteSyncsOutgoing', SiteSyncOutgoingService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing outgoing site syncs. */
		readonly siteSyncsOutgoing: SiteSyncOutgoingService;
	}
}

export { SiteSyncOutgoingService } from './service.js';
export type {
	SiteSyncOutgoing,
	SiteSyncOutgoingCreateParams,
	SiteSyncOutgoingDestinationTier,
	SiteSyncOutgoingRemoteSnapsStatus,
	SiteSyncOutgoingState,
	SiteSyncOutgoingStatus,
	SiteSyncOutgoingUpdateParams,
} from './types.js';
