/**
 * NAS Service User registration module.
 *
 * Importing this module registers the {@link NASServiceUserService} on {@link VergeClient},
 * making `client.nasServiceUsers` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/nas-service-user';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { NASServiceUserService } from './service.js';

VergeClient.registerService('nasServiceUsers', NASServiceUserService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing NAS service users. */
		readonly nasServiceUsers: NASServiceUserService;
	}
}

export { NASServiceUserService } from './service.js';
export type {
	NASServiceUser,
	NASServiceUserCreateParams,
	NASServiceUserUpdateParams,
} from './types.js';
