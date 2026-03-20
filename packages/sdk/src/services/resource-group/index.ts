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
