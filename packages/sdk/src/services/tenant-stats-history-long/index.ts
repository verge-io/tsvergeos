/**
 * Tenant Stats History Long service registration module.
 *
 * Importing this module registers the {@link TenantStatsHistoryLongService} on
 * {@link VergeClient}, making `client.tenantStatsHistoryLong` available.
 * This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tenant-stats-history-long';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { TenantStatsHistoryLongService } from './service.js';

VergeClient.registerService('tenantStatsHistoryLong', TenantStatsHistoryLongService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying long-term tenant stats history (read-only). */
		readonly tenantStatsHistoryLong: TenantStatsHistoryLongService;
	}
}

export { TenantStatsHistoryLongService } from './service.js';
export type { TenantStatsHistoryLong } from './types.js';
