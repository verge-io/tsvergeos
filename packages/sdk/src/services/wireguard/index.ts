/**
 * WireGuard service registration module.
 *
 * Importing this module registers the {@link WireGuardService} on {@link VergeClient},
 * making `client.wireguard` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/wireguard';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { WireGuardService } from './service.js';

VergeClient.registerService('wireguard', WireGuardService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing WireGuard VPN interfaces on virtual networks. */
		readonly wireguard: WireGuardService;
	}
}

export { WireGuardService } from './service.js';
export type {
	WireGuard,
	WireGuardCreateParams,
	WireGuardUpdateParams,
} from './types.js';
