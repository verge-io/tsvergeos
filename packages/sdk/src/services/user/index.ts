/**
 * User service registration module.
 *
 * Importing this module registers the {@link UserService} on {@link VergeClient},
 * making `client.users` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/user';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { UserService } from './service.js';

VergeClient.registerService('users', UserService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing users. */
		readonly users: UserService;
	}
}

export { UserService } from './service.js';
export type {
	TwoFactorType,
	User,
	UserCreateParams,
	UserType,
	UserUpdateParams,
} from './types.js';
