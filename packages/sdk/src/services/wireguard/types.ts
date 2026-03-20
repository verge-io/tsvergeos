import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS WireGuard VPN interface resource.
 *
 * WireGuard interfaces are created on a virtual network (parent: `vnet` FK).
 * Each interface generates a key pair and listens on a configurable port.
 * Peers are added to a WireGuard interface to establish tunnels.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface WireGuard extends Resource {
	/** Parent network reference (FK to `vnets`). Read-only. */
	vnet: FlexKey;

	/** Interface display name. Min 1, max 128 characters. Unique per network. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the interface is enabled. Default: `true`. */
	enabled?: boolean;

	/** IP address in CIDR notation (e.g., "192.168.255.1/24"). */
	ip: string;

	/** UDP listen port. Range: 1–65535. Default: `51820`. */
	listenport?: number;

	/** Maximum transmission unit. Range: 0–65535. Default: `0` (auto). */
	mtu?: number;

	/** WireGuard public key. Locked after creation. */
	public_key?: string;

	/** WireGuard private key. Leave blank to auto-generate. */
	private_key?: string;

	/** Endpoint IP address for remote peers to connect to. */
	endpoint_ip?: string;

	/** Whether to auto-configure firewall rules. */
	configure_firewall?: boolean;

	/** External IP address reference (FK to `vnet_addresses`). */
	external_ip?: FlexKey;

	/** Whether to auto-apply firewall rules when peers change. */
	auto_apply_firewall?: boolean;

	/** Associated NIC reference (FK to `machine_nics`). Read-only. */
	nic?: FlexKey;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new WireGuard interface.
 *
 * `vnet`, `name`, and `ip` are required. Read-only fields are excluded.
 */
export interface WireGuardCreateParams {
	/** Parent network reference (FK to `vnets`). */
	vnet: FlexKey;

	/** Interface display name. Min 1, max 128 characters. Must be unique per network. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the interface is enabled. Default: `true`. */
	enabled?: boolean;

	/** IP address in CIDR notation (e.g., "192.168.255.1/24"). */
	ip: string;

	/** UDP listen port. Range: 1–65535. Default: `51820`. */
	listenport?: number;

	/** Maximum transmission unit. Range: 0–65535. Default: `0` (auto). */
	mtu?: number;

	/** WireGuard public key. Leave blank to auto-generate. */
	public_key?: string;

	/** WireGuard private key. Leave blank to auto-generate. */
	private_key?: string;

	/** Endpoint IP address for remote peers to connect to. */
	endpoint_ip?: string;

	/** Whether to auto-configure firewall rules. */
	configure_firewall?: boolean;

	/** External IP address reference (FK to `vnet_addresses`). */
	external_ip?: FlexKey;

	/** Whether to auto-apply firewall rules when peers change. */
	auto_apply_firewall?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing WireGuard interface.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`vnet`, `nic`, `modified`) and locked fields (`public_key`) are excluded.
 */
export interface WireGuardUpdateParams {
	/** Interface display name. Min 1, max 128 characters. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the interface is enabled. */
	enabled?: boolean;

	/** IP address in CIDR notation. */
	ip?: string;

	/** UDP listen port. Range: 1–65535. */
	listenport?: number;

	/** Maximum transmission unit. Range: 0–65535. */
	mtu?: number;

	/** WireGuard private key. */
	private_key?: string;

	/** Endpoint IP address for remote peers to connect to. */
	endpoint_ip?: string;

	/** Whether to auto-configure firewall rules. */
	configure_firewall?: boolean;

	/** External IP address reference (FK to `vnet_addresses`). */
	external_ip?: FlexKey;

	/** Whether to auto-apply firewall rules when peers change. */
	auto_apply_firewall?: boolean;
}
