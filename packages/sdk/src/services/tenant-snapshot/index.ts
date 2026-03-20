/**
 * Tenant snapshot service registration module.
 *
 * Importing this module registers the {@link TenantSnapshotService} on {@link VergeClient},
 * making `client.tenantSnapshots` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tenant-snapshot';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { TenantSnapshotService } from './service.js';

VergeClient.registerService('tenantSnapshots', TenantSnapshotService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing tenant snapshots. */
		readonly tenantSnapshots: TenantSnapshotService;
	}
}

export { TenantSnapshotService } from './service.js';
export type { TenantSnapshot, TenantSnapshotUpdateParams } from './types.js';
