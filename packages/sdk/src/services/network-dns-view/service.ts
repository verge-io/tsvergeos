import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	NetworkDnsView,
	NetworkDnsViewCreateParams,
	NetworkDnsViewUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS DNS views.
 *
 * DNS views are part of the BIND DNS subsystem and control which clients
 * see which DNS data. Views contain zones, which in turn contain records.
 * Views are scoped to a parent network via the `vnet` foreign key.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/network-dns-view';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all DNS views for a specific network
 * const views = await client.networkDnsViews.listByNetwork(1);
 *
 * // Create a DNS view
 * const view = await client.networkDnsViews.create({
 *   vnet: 1,
 *   name: 'internal',
 *   recursion: true,
 * });
 * ```
 */
export class NetworkDnsViewService extends BaseService<
	NetworkDnsView,
	NetworkDnsViewCreateParams,
	NetworkDnsViewUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vnet_dns_views', 'DNS View');
	}

	/**
	 * List DNS views belonging to a specific network.
	 *
	 * Convenience method that filters by the `vnet` foreign key.
	 *
	 * @param vnetKey - The parent network ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of DNS views for the specified network
	 */
	async listByNetwork(vnetKey: FlexKey, options?: ListOptions): Promise<NetworkDnsView[]> {
		const vnetFilter = `vnet eq ${vnetKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${vnetFilter} and ${existingFilter}` : vnetFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
