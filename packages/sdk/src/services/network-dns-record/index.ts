/**
 * Network DNS Record service registration module.
 *
 * Importing this module registers the {@link NetworkDnsRecordService} on {@link VergeClient},
 * making `client.networkDnsRecords` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/network-dns-record';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { NetworkDnsRecordService } from './service.js';

VergeClient.registerService('networkDnsRecords', NetworkDnsRecordService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing DNS zone records. */
		readonly networkDnsRecords: NetworkDnsRecordService;
	}
}

export { NetworkDnsRecordService } from './service.js';
export type {
	DnsRecordType,
	NetworkDnsRecord,
	NetworkDnsRecordCreateParams,
	NetworkDnsRecordUpdateParams,
} from './types.js';
