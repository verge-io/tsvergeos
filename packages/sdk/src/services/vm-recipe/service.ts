import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { WritableService } from '../base.js';
import type {
	RecipeQuestion,
	RecipeSection,
	VMRecipe,
	VMRecipeAction,
	VMRecipeDeployOptions,
	VMRecipeUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS VM recipes.
 *
 * VM recipes are marketplace templates for deploying virtual machines.
 * They are managed by the catalog system — create is not supported via
 * the SDK. This service supports listing, getting, updating, deleting,
 * and deploying recipes.
 *
 * Recipe keys are 40-character hex strings (not integers).
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/vm-recipe';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all VM recipes
 * const recipes = await client.vmRecipes.list();
 *
 * // Get questions for a recipe
 * const questions = await client.vmRecipes.getQuestions(recipes[0].$key);
 *
 * // Deploy a recipe
 * await client.vmRecipes.deploy(recipes[0].$key, {
 *   name: 'my-vm',
 *   answers: { hostname: 'my-vm', ram: 4096 },
 * });
 *
 * // Download a recipe from catalog
 * await client.vmRecipes.download(recipes[0].$key);
 * ```
 */
export class VMRecipeService extends WritableService<VMRecipe, VMRecipeUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/vm_recipes', 'VM Recipe');
	}

	/**
	 * Get the questions defined for a VM recipe.
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
			params: { filter: `recipe eq 'vm_recipes/${key}'` },
		});
	}

	/**
	 * Get the sections defined for a VM recipe.
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
			params: { filter: `recipe eq 'vm_recipes/${key}'` },
		});
	}

	/**
	 * Deploy a VM recipe, creating a new recipe instance.
	 *
	 * This creates a VM based on the recipe template with the provided
	 * answers to recipe questions.
	 *
	 * @param key - The recipe key (40-char hex string)
	 * @param options - Deploy options including name, answers, and auto_update
	 */
	async deploy(key: FlexKey, options: VMRecipeDeployOptions): Promise<void> {
		const body: Record<string, unknown> = {
			recipe: key,
			name: options.name,
		};

		if (options.answers !== undefined) {
			body.answers = options.answers;
		}

		if (options.auto_update !== undefined) {
			body.auto_update = options.auto_update;
		}

		await this.http.post('/vm_recipe_instances', { body });
	}

	/**
	 * Dispatch an action on a VM recipe.
	 *
	 * Valid actions: `clone`, `download`, `remove`, `republish`.
	 *
	 * @param key - The recipe key (40-char hex string)
	 * @param action - The action to perform
	 * @param params - Optional action parameters
	 */
	async recipeAction(
		key: FlexKey,
		action: VMRecipeAction,
		params?: Record<string, unknown>,
	): Promise<void> {
		const body: Record<string, unknown> = {
			vm_recipe: key,
			action,
		};

		if (params !== undefined) {
			body.params = params;
		}

		await this.http.post('/vm_recipe_actions', { body });
	}

	/**
	 * Download a VM recipe from its catalog.
	 *
	 * Convenience method that dispatches the `download` action.
	 *
	 * @param key - The recipe key (40-char hex string)
	 */
	async download(key: FlexKey): Promise<void> {
		await this.recipeAction(key, 'download');
	}

	/**
	 * Clone a VM recipe.
	 *
	 * @param key - The recipe key (40-char hex string)
	 * @param params - Optional clone parameters
	 */
	async clone(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.recipeAction(key, 'clone', params);
	}

	/**
	 * Remove a VM recipe.
	 *
	 * @param key - The recipe key (40-char hex string)
	 */
	async remove(key: FlexKey): Promise<void> {
		await this.recipeAction(key, 'remove');
	}

	/**
	 * Republish a VM recipe.
	 *
	 * @param key - The recipe key (40-char hex string)
	 */
	async republish(key: FlexKey): Promise<void> {
		await this.recipeAction(key, 'republish');
	}
}
