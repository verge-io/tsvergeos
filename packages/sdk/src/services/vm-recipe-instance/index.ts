/**
 * VM recipe instance service registration module.
 *
 * Importing this module registers the {@link VMRecipeInstanceService} on {@link VergeClient},
 * making `client.vmRecipeInstances` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/vm-recipe-instance';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { VMRecipeInstanceService } from './service.js';

VergeClient.registerService('vmRecipeInstances', VMRecipeInstanceService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing VM recipe instances. */
		readonly vmRecipeInstances: VMRecipeInstanceService;
	}
}

export { VMRecipeInstanceService } from './service.js';
export type {
	VMRecipeInstance,
	VMRecipeInstanceCreateParams,
	VMRecipeInstanceUpdateParams,
} from './types.js';
