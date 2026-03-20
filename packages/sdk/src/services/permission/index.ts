/**
 * Permission service registration module.
 *
 * Importing this module registers the {@link PermissionService} on {@link VergeClient},
 * making `client.permissions` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/permission';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { PermissionService } from './service.js';

VergeClient.registerService('permissions', PermissionService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing permissions. */
		readonly permissions: PermissionService;
	}
}

export { PermissionService } from './service.js';
export type {
	Permission,
	PermissionCreateParams,
	PermissionUpdateParams,
} from './types.js';
