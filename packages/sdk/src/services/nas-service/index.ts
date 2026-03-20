/**
 * NAS Service registration module.
 *
 * Importing this module registers the {@link NASServiceService} on {@link VergeClient},
 * making `client.nasServices` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/nas-service';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { NASServiceService } from './service.js';

VergeClient.registerService('nasServices', NASServiceService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing NAS services. */
		readonly nasServices: NASServiceService;
	}
}

export { NASServiceService } from './service.js';
export type {
	NASReadAheadKb,
	NASService,
	NASServiceCreateParams,
	NASServiceUpdateParams,
} from './types.js';
