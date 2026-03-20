import type { HttpClient } from '../../http.js';
import { BaseService } from '../base.js';
import type {
	VMRecipeInstance,
	VMRecipeInstanceCreateParams,
	VMRecipeInstanceUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS VM recipe instances.
 *
 * VM recipe instances represent deployed instances of VM recipes.
 * Creating an instance is the mechanism for deploying a recipe —
 * it provisions a VM based on the recipe template with the provided
 * answers to recipe questions.
 *
 * Instance keys are integers (unlike recipe keys which are 40-char hex).
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/vm-recipe-instance';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // Deploy a VM recipe by creating an instance
 * const instance = await client.vmRecipeInstances.create({
 *   recipe: 'abc123...',
 *   name: 'my-vm',
 *   answers: { hostname: 'my-vm', ram: 4096 },
 *   auto_update: true,
 * });
 *
 * // List all deployed instances
 * const instances = await client.vmRecipeInstances.list();
 * ```
 */
export class VMRecipeInstanceService extends BaseService<
	VMRecipeInstance,
	VMRecipeInstanceCreateParams,
	VMRecipeInstanceUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vm_recipe_instances', 'VM Recipe Instance');
	}
}
