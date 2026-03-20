import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** DNS zone type. */
export type DnsZoneType = 'master' | 'slave' | 'redirect' | 'forward' | 'static-stub' | 'stub';

/** DNS zone notify setting. */
export type DnsZoneNotify = 'yes' | 'no' | 'explicit';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS DNS zone resource.
 *
 * DNS zones belong to a DNS view and contain DNS records. Zones represent
 * a DNS domain (e.g., `example.com`) and its configuration. The `view` field
 * is set at creation and is read-only afterward.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface NetworkDnsZone extends Resource {
	/** Parent DNS view reference (FK to `vnet_dns_views`). Read-only after creation. */
	view: FlexKey;

	/** Zone domain name. */
	domain?: string;

	/** Zone type. */
	type: DnsZoneType;

	/** Primary nameserver for this zone. */
	nameserver?: string;

	/** SOA email address. */
	email?: string;

	/** Notify setting for zone transfers. */
	notify?: DnsZoneNotify;

	/** ACL of servers allowed to send NOTIFY. */
	allow_notify?: string;

	/** Additional servers to notify on changes. */
	also_notify?: string;

	/** Master server addresses (for slave zones). */
	masters?: string;

	/** ACL of servers allowed to transfer this zone. */
	allow_transfer?: string;

	/** SOA serial number. Auto-incremented on record changes. Read-only. */
	serial_number?: number;

	/** Default TTL for records in this zone. */
	default_ttl?: string;

	/** SOA refresh interval. */
	refresh_interval?: string;

	/** SOA retry interval. */
	retry_interval?: string;

	/** SOA expiry period. */
	expiry_period?: string;

	/** SOA negative TTL (NXDOMAIN cache time). */
	negative_ttl?: string;

	/** Forwarder addresses (for forward zones). */
	forwarders?: string;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new DNS zone.
 *
 * `view` and `type` are required. `serial_number` is read-only and excluded.
 */
export interface NetworkDnsZoneCreateParams {
	/** Parent DNS view reference (FK to `vnet_dns_views`). */
	view: FlexKey;

	/** Zone domain name. */
	domain?: string;

	/** Zone type. */
	type: DnsZoneType;

	/** Primary nameserver for this zone. */
	nameserver?: string;

	/** SOA email address. */
	email?: string;

	/** Notify setting for zone transfers. */
	notify?: DnsZoneNotify;

	/** ACL of servers allowed to send NOTIFY. */
	allow_notify?: string;

	/** Additional servers to notify on changes. */
	also_notify?: string;

	/** Master server addresses (for slave zones). */
	masters?: string;

	/** ACL of servers allowed to transfer this zone. */
	allow_transfer?: string;

	/** Default TTL for records in this zone. */
	default_ttl?: string;

	/** SOA refresh interval. */
	refresh_interval?: string;

	/** SOA retry interval. */
	retry_interval?: string;

	/** SOA expiry period. */
	expiry_period?: string;

	/** SOA negative TTL (NXDOMAIN cache time). */
	negative_ttl?: string;

	/** Forwarder addresses (for forward zones). */
	forwarders?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing DNS zone.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`view`, `serial_number`, `modified`) are excluded.
 */
export interface NetworkDnsZoneUpdateParams {
	/** Zone domain name. */
	domain?: string;

	/** Zone type. */
	type?: DnsZoneType;

	/** Primary nameserver for this zone. */
	nameserver?: string;

	/** SOA email address. */
	email?: string;

	/** Notify setting for zone transfers. */
	notify?: DnsZoneNotify;

	/** ACL of servers allowed to send NOTIFY. */
	allow_notify?: string;

	/** Additional servers to notify on changes. */
	also_notify?: string;

	/** Master server addresses (for slave zones). */
	masters?: string;

	/** ACL of servers allowed to transfer this zone. */
	allow_transfer?: string;

	/** Default TTL for records in this zone. */
	default_ttl?: string;

	/** SOA refresh interval. */
	refresh_interval?: string;

	/** SOA retry interval. */
	retry_interval?: string;

	/** SOA expiry period. */
	expiry_period?: string;

	/** SOA negative TTL (NXDOMAIN cache time). */
	negative_ttl?: string;

	/** Forwarder addresses (for forward zones). */
	forwarders?: string;
}
