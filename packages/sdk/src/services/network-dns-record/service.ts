import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	DnsRecordType,
	NetworkDnsRecord,
	NetworkDnsRecordCreateParams,
	NetworkDnsRecordUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS DNS zone records.
 *
 * DNS records belong to a DNS zone and represent individual DNS entries
 * (A, CNAME, MX, etc.). The `zone` field is set at creation and is read-only
 * afterward.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/network-dns-record';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all records in a zone
 * const records = await client.networkDnsRecords.listByZone(1);
 *
 * // List only A records in a zone
 * const aRecords = await client.networkDnsRecords.listByType(1, 'A');
 *
 * // Find a specific record by host and type
 * const record = await client.networkDnsRecords.getByHostAndType(1, 'www', 'A');
 *
 * // Create an A record
 * const newRecord = await client.networkDnsRecords.create({
 *   zone: 1,
 *   host: 'www',
 *   type: 'A',
 *   value: '192.168.1.100',
 * });
 * ```
 */
export class NetworkDnsRecordService extends BaseService<
	NetworkDnsRecord,
	NetworkDnsRecordCreateParams,
	NetworkDnsRecordUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vnet_dns_zone_records', 'DNS Record');
	}

	/**
	 * List DNS records belonging to a specific zone.
	 *
	 * Convenience method that filters by the `zone` foreign key.
	 *
	 * @param zoneKey - The parent DNS zone ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of DNS records for the specified zone
	 */
	async listByZone(zoneKey: FlexKey, options?: ListOptions): Promise<NetworkDnsRecord[]> {
		const zoneFilter = `zone eq ${zoneKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${zoneFilter} and ${existingFilter}` : zoneFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}

	/**
	 * List DNS records of a specific type belonging to a zone.
	 *
	 * Convenience method that filters by both `zone` and `type`.
	 *
	 * @param zoneKey - The parent DNS zone ID
	 * @param recordType - The DNS record type to filter by (A, CNAME, MX, etc.)
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of DNS records matching the type for the specified zone
	 */
	async listByType(
		zoneKey: FlexKey,
		recordType: DnsRecordType,
		options?: ListOptions,
	): Promise<NetworkDnsRecord[]> {
		const typeFilter = `type eq '${recordType}'`;
		return this.listByZone(zoneKey, {
			...options,
			filter: options?.filter ? `${typeFilter} and ${options.filter}` : typeFilter,
		});
	}

	/**
	 * Find a DNS record by host name and type within a specific zone.
	 *
	 * The display field for records is `host`, not `name`, and multiple records
	 * can share a host. This method filters by both `host` and `type` to find
	 * a specific record.
	 *
	 * @param zoneKey - The parent DNS zone ID
	 * @param host - The hostname or subdomain to search for
	 * @param recordType - The DNS record type (A, CNAME, MX, etc.)
	 * @returns The matching record, or `undefined` if not found
	 */
	async getByHostAndType(
		zoneKey: FlexKey,
		host: string,
		recordType: DnsRecordType,
	): Promise<NetworkDnsRecord | undefined> {
		const results = await this.listByZone(zoneKey, {
			filter: `host eq '${host}' and type eq '${recordType}'`,
		});
		return results[0];
	}
}
