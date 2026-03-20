/**
 * WireGuard Peer Status service registration module.
 *
 * Importing this module registers the {@link WireGuardPeerStatusService} on {@link VergeClient},
 * making `client.wireguardPeerStatus` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/wireguard-peer-status';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { WireGuardPeerStatusService } from './service.js';

VergeClient.registerService('wireguardPeerStatus', WireGuardPeerStatusService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying WireGuard peer connection status (read-only). */
		readonly wireguardPeerStatus: WireGuardPeerStatusService;
	}
}

export { WireGuardPeerStatusService } from './service.js';
export type { WireGuardPeerStatus } from './types.js';
