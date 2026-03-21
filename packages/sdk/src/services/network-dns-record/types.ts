import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** DNS record type. */
export type DnsRecordType =
	| 'A'
	| 'CAA'
	| 'CNAME'
	| 'MX'
	| 'NS'
	| 'PTR'
	| 'SRV'
	| 'TXT'
	| (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS DNS zone record resource.
 *
 * DNS records belong to a DNS zone and represent individual DNS entries
 * (A, CNAME, MX, etc.). The `zone` field is set at creation and is
 * read-only afterward.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface NetworkDnsRecord extends Resource {
	/** Parent DNS zone reference (FK to `vnet_dns_zones`). Read-only after creation. */
	zone: FlexKey;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Hostname or subdomain for this record. */
	host?: string;

	/** TTL for this record. */
	ttl?: string;

	/** DNS record type. */
	type: DnsRecordType;

	/** Record value (IP address, hostname, text, etc.). */
	value: string;

	/** MX preference value (lower = higher priority). */
	mx_preference?: number;

	/** SRV weight for load balancing. */
	weight?: number;

	/** SRV port number. */
	port?: number;

	/** Whether to issue wildcard (CAA records). */
	issue_wildcard?: boolean;

	/** Ordering position. */
	orderid?: number;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new DNS record.
 *
 * `zone`, `type`, and `value` are required.
 */
export interface NetworkDnsRecordCreateParams {
	/** Parent DNS zone reference (FK to `vnet_dns_zones`). */
	zone: FlexKey;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Hostname or subdomain for this record. */
	host?: string;

	/** TTL for this record. */
	ttl?: string;

	/** DNS record type. */
	type: DnsRecordType;

	/** Record value (IP address, hostname, text, etc.). */
	value: string;

	/** MX preference value (lower = higher priority). */
	mx_preference?: number;

	/** SRV weight for load balancing. */
	weight?: number;

	/** SRV port number. */
	port?: number;

	/** Whether to issue wildcard (CAA records). */
	issue_wildcard?: boolean;

	/** Ordering position. */
	orderid?: number;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing DNS record.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`zone`, `modified`) are excluded.
 */
export interface NetworkDnsRecordUpdateParams {
	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Hostname or subdomain for this record. */
	host?: string;

	/** TTL for this record. */
	ttl?: string;

	/** DNS record type. */
	type?: DnsRecordType;

	/** Record value (IP address, hostname, text, etc.). */
	value?: string;

	/** MX preference value (lower = higher priority). */
	mx_preference?: number;

	/** SRV weight for load balancing. */
	weight?: number;

	/** SRV port number. */
	port?: number;

	/** Whether to issue wildcard (CAA records). */
	issue_wildcard?: boolean;

	/** Ordering position. */
	orderid?: number;
}
