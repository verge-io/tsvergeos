import type { FlexKey, Resource } from '../../types.js';

// ─── Enums ──────────────────────────────────────────────────────────────────

/** Host override type — `host` for a single hostname, `domain` for a whole domain. */
export type HostType = 'host' | 'domain';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS network host override resource.
 *
 * Host overrides are DNS/DHCP static hostname-to-IP mappings on a virtual
 * network. They are NOT MAC-based DHCP reservations — they map a hostname
 * or domain to an IP address.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface NetworkHost extends Resource {
	/** Parent network reference (FK to `vnets`). */
	vnet: FlexKey;

	/** Host override type. */
	type?: HostType;

	/** Hostname or domain name. */
	host: string;

	/** IP address mapped to the hostname. */
	ip: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new network host override.
 *
 * `vnet`, `host`, and `ip` are required.
 */
export interface NetworkHostCreateParams {
	/** Parent network reference (FK to `vnets`). */
	vnet: FlexKey;

	/** Host override type. Defaults to `'host'`. */
	type?: HostType;

	/** Hostname or domain name. */
	host: string;

	/** IP address mapped to the hostname. */
	ip: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing network host override.
 *
 * All fields are optional — only provided fields are changed.
 */
export interface NetworkHostUpdateParams {
	/** Parent network reference (FK to `vnets`). */
	vnet?: FlexKey;

	/** Host override type. */
	type?: HostType;

	/** Hostname or domain name. */
	host?: string;

	/** IP address mapped to the hostname. */
	ip?: string;
}
