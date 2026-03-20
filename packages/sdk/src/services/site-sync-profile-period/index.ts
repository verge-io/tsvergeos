/**
 * Site sync profile period service registration module.
 *
 * Importing this module registers the {@link SiteSyncProfilePeriodService} on {@link VergeClient},
 * making `client.siteSyncProfilePeriods` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/site-sync-profile-period';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { SiteSyncProfilePeriodService } from './service.js';

VergeClient.registerService('siteSyncProfilePeriods', SiteSyncProfilePeriodService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing site sync profile periods. */
		readonly siteSyncProfilePeriods: SiteSyncProfilePeriodService;
	}
}

export { SiteSyncProfilePeriodService } from './service.js';
export type {
	SiteSyncProfilePeriod,
	SiteSyncProfilePeriodCreateParams,
	SiteSyncProfilePeriodUpdateParams,
} from './types.js';
