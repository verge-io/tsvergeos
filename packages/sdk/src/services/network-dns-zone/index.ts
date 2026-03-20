/**
 * Network DNS Zone service registration module.
 *
 * Importing this module registers the {@link NetworkDnsZoneService} on {@link VergeClient},
 * making `client.networkDnsZones` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/network-dns-zone';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { NetworkDnsZoneService } from './service.js';

VergeClient.registerService('networkDnsZones', NetworkDnsZoneService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing DNS zones within DNS views. */
		readonly networkDnsZones: NetworkDnsZoneService;
	}
}

export { NetworkDnsZoneService } from './service.js';
export type {
	DnsZoneNotify,
	DnsZoneType,
	NetworkDnsZone,
	NetworkDnsZoneCreateParams,
	NetworkDnsZoneUpdateParams,
} from './types.js';
