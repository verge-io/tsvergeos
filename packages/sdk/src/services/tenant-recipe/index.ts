/**
 * Tenant recipe service registration module.
 *
 * Importing this module registers the {@link TenantRecipeService} on {@link VergeClient},
 * making `client.tenantRecipes` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tenant-recipe';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { TenantRecipeService } from './service.js';

VergeClient.registerService('tenantRecipes', TenantRecipeService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing tenant recipes. */
		readonly tenantRecipes: TenantRecipeService;
	}
}

export { TenantRecipeService } from './service.js';
export type {
	TenantRecipe,
	TenantRecipeAction,
	TenantRecipeDeployOptions,
	TenantRecipeUpdateParams,
} from './types.js';
