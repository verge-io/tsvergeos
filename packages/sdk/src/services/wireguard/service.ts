import { NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { WireGuard, WireGuardCreateParams, WireGuardUpdateParams } from './types.js';

/**
 * Service for managing VergeOS WireGuard VPN interfaces.
 *
 * WireGuard interfaces are created on a virtual network and provide
 * encrypted point-to-point tunnels. Peers are added to an interface
 * via the {@link WireGuardPeerService}.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/wireguard';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all WireGuard interfaces on a network
 * const wgInterfaces = await client.wireguard.listByNetwork(1);
 *
 * // Find by name within a network
 * const wg = await client.wireguard.getByName(1, 'wg0');
 *
 * // Create a WireGuard interface
 * const newWg = await client.wireguard.create({
 *   vnet: 1,
 *   name: 'wg0',
 *   ip: '192.168.255.1/24',
 * });
 * ```
 */
export class WireGuardService extends BaseService<
	WireGuard,
	WireGuardCreateParams,
	WireGuardUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vnet_wireguards', 'WireGuard');
	}

	/**
	 * List WireGuard interfaces belonging to a specific network.
	 *
	 * Convenience method that filters by the `vnet` foreign key.
	 *
	 * @param vnetKey - The parent network ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of WireGuard interfaces for the specified network
	 */
	async listByNetwork(vnetKey: FlexKey, options?: ListOptions): Promise<WireGuard[]> {
		const vnetFilter = `vnet eq ${vnetKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${vnetFilter} and ${existingFilter}` : vnetFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}

	/**
	 * Get a WireGuard interface by name within a specific network.
	 *
	 * WireGuard names are unique per network, not globally. This override
	 * requires a `vnetKey` to scope the lookup.
	 *
	 * @param vnetKey - The parent network ID
	 * @param name - The WireGuard interface name to search for
	 * @returns The matching WireGuard interface
	 * @throws {@link NotFoundError} if no interface with that name exists on the network
	 */
	async getByName(vnetKey: FlexKey, name: string): Promise<WireGuard>;
	/**
	 * @deprecated Use `getByName(vnetKey, name)` instead — WireGuard names are scoped per network.
	 * @internal
	 */
	async getByName(name: string): Promise<WireGuard>;
	async getByName(vnetKeyOrName: FlexKey, name?: string): Promise<WireGuard> {
		if (name !== undefined) {
			// Scoped lookup: getByName(vnetKey, name)
			const results = await this.list({
				filter: `vnet eq ${vnetKeyOrName} and name eq '${name}'`,
			});
			if (results.length === 0) {
				throw new NotFoundError(this.displayName, name);
			}
			return results[0] as WireGuard;
		}
		// Fallback to base behavior (unscoped)
		return super.getByName(vnetKeyOrName as string);
	}
}
