/**
 * Resource Group service registration module.
 *
 * Importing this module registers the {@link ResourceGroupService} on {@link VergeClient},
 * making `client.resourceGroups` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/resource-group';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { ResourceGroupService } from './service.js';

VergeClient.registerService('resourceGroups', ResourceGroupService);

declare module '../../client.js' {
	interface VergeClient {
		/** Physical hardware resource group management. */
		readonly resourceGroups: ResourceGroupService;
	}
}

export { ResourceGroupService } from './service.js';
export type {
	ResourceGroup,
	ResourceGroupClass,
	ResourceGroupCreateParams,
	ResourceGroupType,
	ResourceGroupUpdateParams,
} from './types.js';
