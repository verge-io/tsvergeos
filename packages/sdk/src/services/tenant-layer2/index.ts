/**
 * Tenant Layer 2 network service registration module.
 *
 * Importing this module registers the {@link TenantLayer2Service} on {@link VergeClient},
 * making `client.tenantLayer2Networks` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tenant-layer2';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { TenantLayer2Service } from './service.js';

VergeClient.registerService('tenantLayer2Networks', TenantLayer2Service);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing tenant Layer 2 network assignments. */
		readonly tenantLayer2Networks: TenantLayer2Service;
	}
}

export { TenantLayer2Service } from './service.js';
export type {
	TenantLayer2CreateParams,
	TenantLayer2Network,
	TenantLayer2UpdateParams,
} from './types.js';
