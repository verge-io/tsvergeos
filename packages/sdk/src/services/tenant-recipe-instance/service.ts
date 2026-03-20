import type { HttpClient } from '../../http.js';
import { BaseService } from '../base.js';
import type {
	TenantRecipeInstance,
	TenantRecipeInstanceCreateParams,
	TenantRecipeInstanceUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS tenant recipe instances.
 *
 * Tenant recipe instances represent deployed instances of tenant recipes.
 * Creating an instance is the mechanism for deploying a recipe —
 * it provisions a tenant based on the recipe template with the provided
 * answers to recipe questions.
 *
 * Unlike VM recipe instances, tenant instances do not support `update`,
 * `verify`, `simulate`, or `auto_update` operations.
 *
 * Instance keys are integers (unlike recipe keys which are 40-char hex).
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/tenant-recipe-instance';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // Deploy a tenant recipe by creating an instance
 * const instance = await client.tenantRecipeInstances.create({
 *   recipe: 'abc123...',
 *   name: 'my-tenant',
 *   answers: { hostname: 'my-tenant' },
 * });
 *
 * // List all deployed instances
 * const instances = await client.tenantRecipeInstances.list();
 * ```
 */
export class TenantRecipeInstanceService extends BaseService<
	TenantRecipeInstance,
	TenantRecipeInstanceCreateParams,
	TenantRecipeInstanceUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/tenant_recipe_instances', 'Tenant Recipe Instance');
	}
}
