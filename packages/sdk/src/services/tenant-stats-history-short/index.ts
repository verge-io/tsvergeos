/**
 * Tenant Stats History Short service registration module.
 *
 * Importing this module registers the {@link TenantStatsHistoryShortService} on
 * {@link VergeClient}, making `client.tenantStatsHistoryShort` available.
 * This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tenant-stats-history-short';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { TenantStatsHistoryShortService } from './service.js';

VergeClient.registerService('tenantStatsHistoryShort', TenantStatsHistoryShortService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying short-term tenant stats history (read-only). */
		readonly tenantStatsHistoryShort: TenantStatsHistoryShortService;
	}
}

export { TenantStatsHistoryShortService } from './service.js';
export type { TenantStatsHistoryShort } from './types.js';
