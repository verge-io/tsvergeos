/**
 * Site service registration module.
 *
 * Importing this module registers the {@link SiteService} on {@link VergeClient},
 * making `client.sites` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/site';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { SiteService } from './service.js';

VergeClient.registerService('sites', SiteService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing remote sites. */
		readonly sites: SiteService;
	}
}

export { SiteService } from './service.js';
export type {
	Site,
	SiteAuthenticationStatus,
	SiteConfigMode,
	SiteConnectionStatus,
	SiteCreateParams,
	SiteManagementMode,
	SiteUpdateParams,
} from './types.js';
