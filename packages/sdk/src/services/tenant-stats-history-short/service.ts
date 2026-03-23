import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { TenantStatsHistoryShort } from './types.js';

/**
 * Service for querying short-term tenant stats history.
 *
 * Provides access to short-term historical CPU, RAM, storage tier, and GPU
 * utilization metrics per tenant. This is a **read-only** service — history
 * entries are managed by the system and cannot be created, updated, or
 * deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/tenant-stats-history-short';
 *
 * // Get short-term history for a specific tenant
 * const history = await client.tenantStatsHistoryShort.listByTenant(42);
 * for (const snapshot of history) {
 *   console.log(`CPU: ${snapshot.total_cpu}%, RAM: ${snapshot.ram_pct}% at ${snapshot.timestamp}`);
 * }
 * ```
 */
export class TenantStatsHistoryShortService extends ReadOnlyService<TenantStatsHistoryShort> {
	constructor(http: HttpClient) {
		super(http, '/tenant_stats_history_short', 'Tenant Stats History Short');
	}

	/**
	 * List short-term stats history for a specific tenant.
	 *
	 * Filters by `tenant eq {tenantKey}` and returns all matching history entries.
	 * Additional list options (fields, sort, limit, etc.) are merged with the filter.
	 *
	 * @param tenantKey - The key of the tenant to retrieve history for.
	 * @param options - Optional list parameters to merge with the tenant filter.
	 * @returns An array of short-term stats history entries for the tenant.
	 */
	async listByTenant(
		tenantKey: FlexKey,
		options?: ListOptions,
	): Promise<TenantStatsHistoryShort[]> {
		return this.list({
			...options,
			filter: `tenant eq ${tenantKey}`,
		});
	}
}
