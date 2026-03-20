/**
 * IPSec Connection service registration module.
 *
 * Importing this module registers the {@link IPSecConnectionService} on {@link VergeClient},
 * making `client.ipsecConnections` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/ipsec-connection';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { IPSecConnectionService } from './service.js';

VergeClient.registerService('ipsecConnections', IPSecConnectionService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying IPSec VPN connection status (read-only). */
		readonly ipsecConnections: IPSecConnectionService;
	}
}

export { IPSecConnectionService } from './service.js';
export type { IPSecConnection } from './types.js';
