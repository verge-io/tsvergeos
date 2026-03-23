/**
 * Tenant service registration module.
 *
 * Importing this module registers the {@link TenantService} on {@link VergeClient},
 * making `client.tenants` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tenant';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { TenantService } from './service.js';

VergeClient.registerService('tenants', TenantService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing tenants. */
		readonly tenants: TenantService;
	}
}

export { TenantService } from './service.js';
export type {
	Tenant,
	TenantCloneOptions,
	TenantCreateParams,
	TenantGiveFileOptions,
	TenantUpdateParams,
	ThemeAccess,
} from './types.js';
