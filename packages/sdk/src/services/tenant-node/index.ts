/**
 * Tenant node service registration module.
 *
 * Importing this module registers the {@link TenantNodeService} on {@link VergeClient},
 * making `client.tenantNodes` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tenant-node';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { TenantNodeService } from './service.js';

VergeClient.registerService('tenantNodes', TenantNodeService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing tenant nodes. */
		readonly tenantNodes: TenantNodeService;
	}
}

export { TenantNodeService } from './service.js';
export type {
	TenantNode,
	TenantNodeCreateParams,
	TenantNodeOnPowerLoss,
	TenantNodeUpdateParams,
} from './types.js';
