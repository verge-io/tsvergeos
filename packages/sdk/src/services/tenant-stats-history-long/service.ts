import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { TenantStatsHistoryLong } from './types.js';

/**
 * Service for querying long-term tenant stats history.
 *
 * Provides access to long-term historical CPU, RAM, storage tier, and GPU
 * utilization metrics per tenant. This is a **read-only** service — history
 * entries are managed by the system and cannot be created, updated, or
 * deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/tenant-stats-history-long';
 *
 * // Get long-term history for a specific tenant
 * const history = await client.tenantStatsHistoryLong.listByTenant(42);
 * for (const snapshot of history) {
 *   console.log(`CPU: ${snapshot.total_cpu}%, RAM used: ${snapshot.ram_used} at ${snapshot.timestamp}`);
 * }
 * ```
 */
export class TenantStatsHistoryLongService extends ReadOnlyService<TenantStatsHistoryLong> {
	constructor(http: HttpClient) {
		super(http, '/tenant_stats_history_long', 'Tenant Stats History Long');
	}

	/**
	 * List long-term stats history for a specific tenant.
	 *
	 * Filters by `tenant eq {tenantKey}` and returns all matching history entries.
	 * Additional list options (fields, sort, limit, etc.) are merged with the filter.
	 *
	 * @param tenantKey - The key of the tenant to retrieve history for.
	 * @param options - Optional list parameters to merge with the tenant filter.
	 * @returns An array of long-term stats history entries for the tenant.
	 */
	async listByTenant(tenantKey: FlexKey, options?: ListOptions): Promise<TenantStatsHistoryLong[]> {
		return this.list({
			...options,
			filter: `tenant eq ${tenantKey}`,
		});
	}
}
