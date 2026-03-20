/**
 * Network service registration module.
 *
 * Importing this module registers the {@link NetworkService} on {@link VergeClient},
 * making `client.networks` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/network';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { NetworkService } from './service.js';

VergeClient.registerService('networks', NetworkService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing virtual networks. */
		readonly networks: NetworkService;
	}
}

export { NetworkService } from './service.js';
export type {
	DnsMode,
	IpAddressType,
	Layer2Type,
	Network,
	NetworkCreateParams,
	NetworkOnPowerLoss,
	NetworkType,
	NetworkUpdateParams,
	PortMirroringMode,
	PxeMode,
	RateLimitType,
} from './types.js';
