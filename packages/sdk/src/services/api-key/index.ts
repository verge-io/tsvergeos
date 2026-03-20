/**
 * API Key service registration module.
 *
 * Importing this module registers the {@link APIKeyService} on {@link VergeClient},
 * making `client.apiKeys` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/api-key';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { APIKeyService } from './service.js';

VergeClient.registerService('apiKeys', APIKeyService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing user API keys. */
		readonly apiKeys: APIKeyService;
	}
}

export { APIKeyService } from './service.js';
export type {
	ApiKeyExpiresType,
	UserAPIKey,
	UserAPIKeyCreateParams,
	UserAPIKeyCreateResult,
	UserAPIKeyUpdateParams,
} from './types.js';
