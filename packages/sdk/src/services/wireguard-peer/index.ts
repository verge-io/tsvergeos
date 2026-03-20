/**
 * WireGuard Peer service registration module.
 *
 * Importing this module registers the {@link WireGuardPeerService} on {@link VergeClient},
 * making `client.wireguardPeers` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/wireguard-peer';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { WireGuardPeerService } from './service.js';

VergeClient.registerService('wireguardPeers', WireGuardPeerService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing WireGuard VPN peers. */
		readonly wireguardPeers: WireGuardPeerService;
	}
}

export { WireGuardPeerService } from './service.js';
export type {
	WireGuardPeer,
	WireGuardPeerCreateParams,
	WireGuardPeerFirewallConfig,
	WireGuardPeerUpdateParams,
} from './types.js';
