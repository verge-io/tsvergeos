/**
 * Tag member service registration module.
 *
 * Importing this module registers the {@link TagMemberService} on {@link VergeClient},
 * making `client.tagMembers` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tag-member';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { TagMemberService } from './service.js';

VergeClient.registerService('tagMembers', TagMemberService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing tag members (tag-to-resource assignments). */
		readonly tagMembers: TagMemberService;
	}
}

export { TagMemberService } from './service.js';
export type { TagMember, TagMemberCreateParams } from './types.js';
