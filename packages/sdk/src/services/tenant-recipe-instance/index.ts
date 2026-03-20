/**
 * Tenant recipe instance service registration module.
 *
 * Importing this module registers the {@link TenantRecipeInstanceService} on {@link VergeClient},
 * making `client.tenantRecipeInstances` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tenant-recipe-instance';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { TenantRecipeInstanceService } from './service.js';

VergeClient.registerService('tenantRecipeInstances', TenantRecipeInstanceService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing tenant recipe instances. */
		readonly tenantRecipeInstances: TenantRecipeInstanceService;
	}
}

export { TenantRecipeInstanceService } from './service.js';
export type {
	TenantRecipeInstance,
	TenantRecipeInstanceCreateParams,
	TenantRecipeInstanceUpdateParams,
} from './types.js';
