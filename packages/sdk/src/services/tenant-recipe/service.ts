import { quoteFilterString } from '../../filter.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { WritableService } from '../base.js';
import type { RecipeQuestion, RecipeSection } from '../vm-recipe/types.js';
import type {
	TenantRecipe,
	TenantRecipeAction,
	TenantRecipeDeployOptions,
	TenantRecipeUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS tenant recipes.
 *
 * Tenant recipes are marketplace templates for deploying tenants.
 * They are managed by the catalog system — create is not supported via
 * the SDK. This service supports listing, getting, updating, deleting,
 * and deploying recipes.
 *
 * Recipe keys are 40-character hex strings (not integers).
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/tenant-recipe';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all tenant recipes
 * const recipes = await client.tenantRecipes.list();
 *
 * // Get questions for a recipe
 * const questions = await client.tenantRecipes.getQuestions(recipes[0].$key);
 *
 * // Deploy a recipe
 * await client.tenantRecipes.deploy(recipes[0].$key, {
 *   name: 'my-tenant',
 *   answers: { hostname: 'my-tenant' },
 * });
 * ```
 */
export class TenantRecipeService extends WritableService<TenantRecipe, TenantRecipeUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/tenant_recipes', 'Tenant Recipe');
	}

	/**
	 * Get the questions defined for a tenant recipe.
	 *
	 * Questions define the input fields shown when deploying the recipe.
	 * Uses the shared `/recipe_questions` endpoint with a filter on the
	 * recipe FK reference string.
	 *
	 * @param key - The recipe key (40-char hex string)
	 * @returns Array of recipe questions
	 */
	async getQuestions(key: FlexKey): Promise<RecipeQuestion[]> {
		return this.http.get<RecipeQuestion[]>('/recipe_questions', {
			params: {
				filter: `recipe eq ${quoteFilterString(`tenant_recipes/${key}`)}`,
			},
		});
	}

	/**
	 * Get the sections defined for a tenant recipe.
	 *
	 * Sections group questions together in the recipe deployment form.
	 * Uses the shared `/recipe_sections` endpoint with a filter on the
	 * recipe FK reference string.
	 *
	 * @param key - The recipe key (40-char hex string)
	 * @returns Array of recipe sections
	 */
	async getSections(key: FlexKey): Promise<RecipeSection[]> {
		return this.http.get<RecipeSection[]>('/recipe_sections', {
			params: {
				filter: `recipe eq ${quoteFilterString(`tenant_recipes/${key}`)}`,
			},
		});
	}

	/**
	 * Deploy a tenant recipe, creating a new recipe instance.
	 *
	 * This creates a tenant based on the recipe template with the provided
	 * answers to recipe questions.
	 *
	 * Unlike VM recipes, tenant recipe deployment does not support `auto_update`.
	 *
	 * @param key - The recipe key (40-char hex string)
	 * @param options - Deploy options including name and answers
	 */
	async deploy(key: FlexKey, options: TenantRecipeDeployOptions): Promise<void> {
		const body: Record<string, unknown> = {
			recipe: key,
			name: options.name,
		};

		if (options.answers !== undefined) {
			body.answers = options.answers;
		}

		await this.http.post('/tenant_recipe_instances', { body });
	}

	/**
	 * Dispatch an action on a tenant recipe.
	 *
	 * Valid actions: `clone`, `download`, `remove`, `republish`.
	 *
	 * @param key - The recipe key (40-char hex string)
	 * @param action - The action to perform
	 * @param params - Optional action parameters
	 */
	async recipeAction(
		key: FlexKey,
		action: TenantRecipeAction,
		params?: Record<string, unknown>,
	): Promise<void> {
		const body: Record<string, unknown> = {
			tenant_recipe: key,
			action,
		};

		if (params !== undefined) {
			body.params = params;
		}

		await this.http.post('/tenant_recipe_actions', { body });
	}

	/**
	 * Download a tenant recipe from its catalog.
	 *
	 * Convenience method that dispatches the `download` action.
	 *
	 * @param key - The recipe key (40-char hex string)
	 */
	async download(key: FlexKey): Promise<void> {
		await this.recipeAction(key, 'download');
	}

	/**
	 * Clone a tenant recipe.
	 *
	 * @param key - The recipe key (40-char hex string)
	 * @param params - Optional clone parameters
	 */
	async clone(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.recipeAction(key, 'clone', params);
	}

	/**
	 * Remove a tenant recipe.
	 *
	 * @param key - The recipe key (40-char hex string)
	 */
	async remove(key: FlexKey): Promise<void> {
		await this.recipeAction(key, 'remove');
	}

	/**
	 * Republish a tenant recipe.
	 *
	 * @param key - The recipe key (40-char hex string)
	 */
	async republish(key: FlexKey): Promise<void> {
		await this.recipeAction(key, 'republish');
	}
}
