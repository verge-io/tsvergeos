import { quoteFilterString } from '../../filter.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	AddressType,
	NetworkAddress,
	NetworkAddressCreateParams,
	NetworkAddressUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS network addresses.
 *
 * Network addresses represent DHCP leases, static IP assignments, IP aliases,
 * proxy ARP entries, and virtual IPs on a virtual network. Addresses are
 * scoped to a parent network via the `vnet` foreign key.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/network-address';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all addresses for a specific network
 * const addresses = await client.networkAddresses.listByNetwork(1);
 *
 * // List only static addresses
 * const statics = await client.networkAddresses.listByType(1, 'static');
 *
 * // Find an address by IP
 * const addr = await client.networkAddresses.getByIP(1, '192.168.1.100');
 *
 * // Find an address by MAC
 * const macAddr = await client.networkAddresses.getByMAC(1, 'aa:bb:cc:dd:ee:ff');
 * ```
 */
export class NetworkAddressService extends BaseService<
	NetworkAddress,
	NetworkAddressCreateParams,
	NetworkAddressUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vnet_addresses', 'Network Address');
	}

	/**
	 * List addresses belonging to a specific network.
	 *
	 * Convenience method that filters by the `vnet` foreign key.
	 *
	 * @param vnetKey - The parent network ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of addresses for the specified network
	 */
	async listByNetwork(vnetKey: FlexKey, options?: ListOptions): Promise<NetworkAddress[]> {
		const vnetFilter = `vnet eq ${vnetKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${vnetFilter} and ${existingFilter}` : vnetFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}

	/**
	 * List addresses of a specific type belonging to a network.
	 *
	 * Convenience method that filters by both `vnet` and `type`.
	 *
	 * @param vnetKey - The parent network ID
	 * @param type - The address type to filter by
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of addresses matching the type for the specified network
	 */
	async listByType(
		vnetKey: FlexKey,
		type: AddressType,
		options?: ListOptions,
	): Promise<NetworkAddress[]> {
		const typeFilter = `type eq ${quoteFilterString(type)}`;
		return this.listByNetwork(vnetKey, {
			...options,
			filter: options?.filter ? `${typeFilter} and ${options.filter}` : typeFilter,
		});
	}

	/**
	 * Find an address by IP within a specific network.
	 *
	 * @param vnetKey - The parent network ID
	 * @param ip - The IP address to search for
	 * @returns The matching address, or `undefined` if not found
	 */
	async getByIP(vnetKey: FlexKey, ip: string): Promise<NetworkAddress | undefined> {
		const results = await this.listByNetwork(vnetKey, {
			filter: `ip eq ${quoteFilterString(ip)}`,
		});
		return results[0];
	}

	/**
	 * Find an address by MAC address within a specific network.
	 *
	 * @param vnetKey - The parent network ID
	 * @param mac - The MAC address to search for
	 * @returns The matching address, or `undefined` if not found
	 */
	async getByMAC(vnetKey: FlexKey, mac: string): Promise<NetworkAddress | undefined> {
		const results = await this.listByNetwork(vnetKey, {
			filter: `mac eq ${quoteFilterString(mac)}`,
		});
		return results[0];
	}
}
