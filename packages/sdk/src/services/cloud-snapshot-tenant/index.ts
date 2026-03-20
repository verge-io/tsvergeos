/**
 * Cloud snapshot tenant service registration module.
 *
 * Importing this module registers the {@link CloudSnapshotTenantService} on {@link VergeClient},
 * making `client.cloudSnapshotTenants` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/cloud-snapshot-tenant';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { CloudSnapshotTenantService } from './service.js';

VergeClient.registerService('cloudSnapshotTenants', CloudSnapshotTenantService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying tenants captured in cloud snapshots. */
		readonly cloudSnapshotTenants: CloudSnapshotTenantService;
	}
}

export { CloudSnapshotTenantService } from './service.js';
export type {
	CloudSnapshotTenant,
	CloudSnapshotTenantStatus,
} from './types.js';
