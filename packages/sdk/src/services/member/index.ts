/**
 * Member service registration module.
 *
 * Importing this module registers the {@link MemberService} on {@link VergeClient},
 * making `client.members` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/member';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { MemberService } from './service.js';

VergeClient.registerService('members', MemberService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing group memberships. */
		readonly members: MemberService;
	}
}

export { MemberService } from './service.js';
export type {
	Member,
	MemberCreateParams,
	MemberUpdateParams,
} from './types.js';
