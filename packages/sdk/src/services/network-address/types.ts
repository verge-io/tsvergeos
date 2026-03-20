import type { FlexKey, Resource } from "../../types.js";

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Network address type: DHCP lease, static assignment, IP alias, proxy ARP, or virtual IP. */
export type AddressType =
  | "dynamic"
  | "static"
  | "ipalias"
  | "proxy"
  | "virtual";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS network address resource.
 *
 * Network addresses represent DHCP leases, static IP assignments, IP aliases,
 * proxy ARP entries, and virtual IPs on a virtual network. Scoped to a parent
 * network via the `vnet` foreign key.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface NetworkAddress extends Resource {
  /** Parent network reference (FK to `vnets`). */
  vnet: FlexKey;

  /** MAC address associated with this entry. */
  mac?: string;

  /** IP address. */
  ip?: string;

  /** Address type. */
  type: AddressType;

  /** Hostname associated with this address. */
  hostname?: string;

  /** Expiration timestamp (Unix epoch, unsigned 32-bit). */
  expiration?: number;

  /** Owner reference. */
  owner?: FlexKey;

  /** Hardware vendor string (trimmed). */
  vendor?: string;

  /** Human-readable description. Max 2048 characters. */
  description?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new network address.
 *
 * `vnet` and `type` are required per the API schema.
 */
export interface NetworkAddressCreateParams {
  /** Parent network reference (FK to `vnets`). */
  vnet: FlexKey;

  /** MAC address. */
  mac?: string;

  /** IP address. */
  ip?: string;

  /** Address type. */
  type: AddressType;

  /** Hostname. */
  hostname?: string;

  /** Expiration timestamp (Unix epoch, unsigned 32-bit). */
  expiration?: number;

  /** Owner reference. */
  owner?: FlexKey;

  /** Hardware vendor string. */
  vendor?: string;

  /** Human-readable description. Max 2048 characters. */
  description?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing network address.
 *
 * All fields are optional — only provided fields are changed.
 */
export interface NetworkAddressUpdateParams {
  /** MAC address. */
  mac?: string;

  /** IP address. */
  ip?: string;

  /** Address type. */
  type?: AddressType;

  /** Hostname. */
  hostname?: string;

  /** Expiration timestamp (Unix epoch, unsigned 32-bit). */
  expiration?: number;

  /** Owner reference. */
  owner?: FlexKey;

  /** Hardware vendor string. */
  vendor?: string;

  /** Human-readable description. Max 2048 characters. */
  description?: string;
}
