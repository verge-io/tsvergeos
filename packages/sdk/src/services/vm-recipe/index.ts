/**
 * VM recipe service registration module.
 *
 * Importing this module registers the {@link VMRecipeService} on {@link VergeClient},
 * making `client.vmRecipes` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/vm-recipe';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { VMRecipeService } from './service.js';

VergeClient.registerService('vmRecipes', VMRecipeService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing VM recipes. */
		readonly vmRecipes: VMRecipeService;
	}
}

export { VMRecipeService } from './service.js';
export type {
	RecipeDatabaseContext,
	RecipeQuestion,
	RecipeQuestionPostprocess,
	RecipeQuestionType,
	RecipeSection,
	VMRecipe,
	VMRecipeAction,
	VMRecipeDeployOptions,
	VMRecipeUpdateParams,
} from './types.js';
