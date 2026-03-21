import { quoteFilterString } from '../../filter.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	NetworkDnsZone,
	NetworkDnsZoneCreateParams,
	NetworkDnsZoneUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS DNS zones.
 *
 * DNS zones belong to a DNS view and represent a DNS domain (e.g., `example.com`).
 * Zones contain DNS records. The `view` field is set at creation and is read-only
 * afterward.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/network-dns-zone';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List zones in a DNS view
 * const zones = await client.networkDnsZones.listByView(1);
 *
 * // Find a zone by domain name
 * const zone = await client.networkDnsZones.getByDomain(1, 'example.com');
 *
 * // Create a master zone
 * const newZone = await client.networkDnsZones.create({
 *   view: 1,
 *   domain: 'example.com',
 *   type: 'master',
 * });
 * ```
 */
export class NetworkDnsZoneService extends BaseService<
	NetworkDnsZone,
	NetworkDnsZoneCreateParams,
	NetworkDnsZoneUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vnet_dns_zones', 'DNS Zone');
	}

	/**
	 * List DNS zones belonging to a specific view.
	 *
	 * Convenience method that filters by the `view` foreign key.
	 *
	 * @param viewKey - The parent DNS view ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of DNS zones for the specified view
	 */
	async listByView(viewKey: FlexKey, options?: ListOptions): Promise<NetworkDnsZone[]> {
		const viewFilter = `view eq ${viewKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${viewFilter} and ${existingFilter}` : viewFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}

	/**
	 * Find a DNS zone by domain name within a specific view.
	 *
	 * The display field for zones is `domain`, not `name`, so the standard
	 * `getByName` method does not apply. Use this method instead.
	 *
	 * @param viewKey - The parent DNS view ID
	 * @param domain - The domain name to search for
	 * @returns The matching zone, or `undefined` if not found
	 */
	async getByDomain(viewKey: FlexKey, domain: string): Promise<NetworkDnsZone | undefined> {
		const results = await this.listByView(viewKey, {
			filter: `domain eq ${quoteFilterString(domain)}`,
		});
		return results[0];
	}
}
