/**
 * Tenant storage service registration module.
 *
 * Importing this module registers the {@link TenantStorageService} on {@link VergeClient},
 * making `client.tenantStorage` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tenant-storage';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { TenantStorageService } from './service.js';

VergeClient.registerService('tenantStorage', TenantStorageService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing tenant storage allocations. */
		readonly tenantStorage: TenantStorageService;
	}
}

export { TenantStorageService } from './service.js';
export type {
	TenantStorage,
	TenantStorageCreateParams,
	TenantStorageUpdateParams,
} from './types.js';
