import { NotFoundError } from '../../errors.js';
import { quoteFilterString } from '../../filter.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	WireGuardPeer,
	WireGuardPeerCreateParams,
	WireGuardPeerUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS WireGuard peers.
 *
 * Peers are added to a WireGuard interface to establish encrypted tunnels.
 * Each peer requires a public key and allowed IPs. When `autogenerate_peer`
 * is enabled, the API generates a downloadable config via {@link getConfig}.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/wireguard-peer';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all peers for a WireGuard interface
 * const peers = await client.wireguardPeers.listByWireGuard(1);
 *
 * // Get the auto-generated config for a peer
 * const config = await client.wireguardPeers.getConfig(42);
 * ```
 */
export class WireGuardPeerService extends BaseService<
	WireGuardPeer,
	WireGuardPeerCreateParams,
	WireGuardPeerUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vnet_wireguard_peers', 'WireGuard Peer');
	}

	/**
	 * List peers belonging to a specific WireGuard interface.
	 *
	 * Convenience method that filters by the `wireguard` foreign key.
	 *
	 * @param wgKey - The parent WireGuard interface ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of peers for the specified WireGuard interface
	 */
	async listByWireGuard(wgKey: FlexKey, options?: ListOptions): Promise<WireGuardPeer[]> {
		const wgFilter = `wireguard eq ${wgKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${wgFilter} and ${existingFilter}` : wgFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}

	/**
	 * Get a WireGuard peer by name within a specific WireGuard interface.
	 *
	 * Peer names are unique per WireGuard interface, not globally. This override
	 * requires a `wgKey` to scope the lookup.
	 *
	 * @param wgKey - The parent WireGuard interface ID
	 * @param name - The peer name to search for
	 * @returns The matching peer
	 * @throws {@link NotFoundError} if no peer with that name exists on the interface
	 */
	async getByName(wgKey: FlexKey, name: string): Promise<WireGuardPeer>;
	/**
	 * @deprecated Use `getByName(wgKey, name)` instead — peer names are scoped per WireGuard interface.
	 * @internal
	 */
	async getByName(name: string): Promise<WireGuardPeer>;
	async getByName(wgKeyOrName: FlexKey, name?: string): Promise<WireGuardPeer> {
		if (name !== undefined) {
			// Scoped lookup: getByName(wgKey, name)
			const results = await this.list({
				filter: `wireguard eq ${wgKeyOrName} and name eq ${quoteFilterString(name)}`,
			});
			if (results.length === 0) {
				throw new NotFoundError(this.displayName, name);
			}
			return results[0] as WireGuardPeer;
		}
		// Fallback to base behavior (unscoped)
		return super.getByName(wgKeyOrName as string);
	}

	/**
	 * Get the auto-generated WireGuard configuration for a peer.
	 *
	 * Returns the `wg_config` field content, which is only populated when the
	 * peer was created with `autogenerate_peer: true`. Returns `undefined` if
	 * the config is not available.
	 *
	 * @param peerKey - The peer ID
	 * @returns The WireGuard config file content, or `undefined` if not available
	 */
	async getConfig(peerKey: FlexKey): Promise<string | undefined> {
		const results = await this.http.get<WireGuardPeer[]>(this.resource, {
			params: {
				fields: 'wg_config',
				filter: `$key eq ${peerKey}`,
			},
		});
		if (results.length === 0) {
			throw new NotFoundError(this.displayName, peerKey);
		}
		return results[0]?.wg_config;
	}
}
