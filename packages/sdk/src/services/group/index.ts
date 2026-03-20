/**
 * Group service registration module.
 *
 * Importing this module registers the {@link GroupService} on {@link VergeClient},
 * making `client.groups` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/group';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { GroupService } from './service.js';

VergeClient.registerService('groups', GroupService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing groups. */
		readonly groups: GroupService;
	}
}

export { GroupService } from './service.js';
export type { Group, GroupCreateParams, GroupUpdateParams } from './types.js';
