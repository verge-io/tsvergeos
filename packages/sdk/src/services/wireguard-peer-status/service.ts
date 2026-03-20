import { NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { WireGuardPeerStatus } from './types.js';

/**
 * Service for querying WireGuard peer connection status.
 *
 * This is a **read-only** service — peer status entries are managed by
 * the system and cannot be created, updated, or deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/wireguard-peer-status';
 *
 * // Get status for a specific peer
 * const status = await client.wireguardPeerStatus.getByPeer(42);
 * console.log(`Last handshake: ${status.last_handshake}`);
 * console.log(`TX: ${status.tx_bytes}, RX: ${status.rx_bytes}`);
 * ```
 */
export class WireGuardPeerStatusService extends ReadOnlyService<WireGuardPeerStatus> {
	constructor(http: HttpClient) {
		super(http, '/vnet_wireguard_peer_status', 'WireGuard Peer Status');
	}

	/**
	 * Get the connection status for a specific WireGuard peer.
	 *
	 * Filters by `peer eq {peerKey}` and returns the first matching result.
	 * Throws {@link NotFoundError} if no status entry exists for the given peer.
	 *
	 * @param peerKey - The key of the WireGuard peer to look up status for.
	 * @returns The peer status resource.
	 * @throws {@link NotFoundError} If no status exists for the specified peer.
	 */
	async getByPeer(peerKey: FlexKey): Promise<WireGuardPeerStatus> {
		const results = await this.list({
			filter: `peer eq ${peerKey}`,
		});

		if (results.length === 0) {
			throw new NotFoundError(this.displayName, peerKey);
		}

		return results[0] as WireGuardPeerStatus;
	}
}
