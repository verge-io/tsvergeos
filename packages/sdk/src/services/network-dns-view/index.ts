/**
 * Network DNS View service registration module.
 *
 * Importing this module registers the {@link NetworkDnsViewService} on {@link VergeClient},
 * making `client.networkDnsViews` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/network-dns-view';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { NetworkDnsViewService } from './service.js';

VergeClient.registerService('networkDnsViews', NetworkDnsViewService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing DNS views on virtual networks. */
		readonly networkDnsViews: NetworkDnsViewService;
	}
}

export { NetworkDnsViewService } from './service.js';
export type {
	NetworkDnsView,
	NetworkDnsViewCreateParams,
	NetworkDnsViewUpdateParams,
} from './types.js';
