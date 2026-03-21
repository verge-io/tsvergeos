import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Firewall configuration mode for a WireGuard peer. */
export type WireGuardPeerFirewallConfig = 'site-to-site' | 'remote-user' | 'none' | (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS WireGuard peer resource.
 *
 * Peers are added to a WireGuard interface to establish encrypted tunnels.
 * Each peer has a public key and allowed IPs defining traffic routing.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface WireGuardPeer extends Resource {
	/** Parent WireGuard interface reference (FK to `vnet_wireguards`). Read-only. */
	wireguard: FlexKey;

	/** Peer display name. Min 1, max 128 characters. Unique per WireGuard interface. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the peer is enabled. Default: `true`. */
	enabled?: boolean;

	/** Whether to auto-generate the peer configuration file. */
	autogenerate_peer?: boolean;

	/** Remote endpoint address (hostname or IP). */
	endpoint?: string;

	/** Remote endpoint port. Range: 1–65535. Default: `51820`. */
	port?: number;

	/** Peer IP address. */
	peer_ip: string;

	/** Peer's private key (only relevant when auto-generating config). */
	private_key?: string;

	/** Peer's public key. Required. */
	public_key: string;

	/** Pre-shared key for additional security. */
	preshared_key?: string;

	/** Allowed IP ranges (comma-separated CIDRs). */
	allowed_ips: string;

	/** Firewall rule creation mode. Default: `'site-to-site'`. */
	configure_firewall?: WireGuardPeerFirewallConfig;

	/** Persistent keepalive interval in seconds. Default: `0` (disabled). */
	keepalive?: number;

	/** Auto-generated WireGuard config file content. Read-only, populated when `autogenerate_peer` is true. */
	wg_config?: string;

	/** Peer status reference (FK to `vnet_wireguard_peer_status`). Read-only. */
	status?: FlexKey;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new WireGuard peer.
 *
 * `wireguard`, `name`, `peer_ip`, `public_key`, and `allowed_ips` are required.
 * Read-only fields are excluded.
 */
export interface WireGuardPeerCreateParams {
	/** Parent WireGuard interface reference (FK to `vnet_wireguards`). */
	wireguard: FlexKey;

	/** Peer display name. Min 1, max 128 characters. Must be unique per WireGuard interface. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the peer is enabled. Default: `true`. */
	enabled?: boolean;

	/** Whether to auto-generate the peer configuration file. */
	autogenerate_peer?: boolean;

	/** Remote endpoint address (hostname or IP). */
	endpoint?: string;

	/** Remote endpoint port. Range: 1–65535. Default: `51820`. */
	port?: number;

	/** Peer IP address. */
	peer_ip: string;

	/** Peer's private key (only relevant when auto-generating config). */
	private_key?: string;

	/** Peer's public key. */
	public_key: string;

	/** Pre-shared key for additional security. */
	preshared_key?: string;

	/** Allowed IP ranges (comma-separated CIDRs). */
	allowed_ips: string;

	/** Firewall rule creation mode. Default: `'site-to-site'`. */
	configure_firewall?: WireGuardPeerFirewallConfig;

	/** Persistent keepalive interval in seconds. Default: `0` (disabled). */
	keepalive?: number;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing WireGuard peer.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`wireguard`, `wg_config`, `status`, `modified`) are excluded.
 */
export interface WireGuardPeerUpdateParams {
	/** Peer display name. Min 1, max 128 characters. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the peer is enabled. */
	enabled?: boolean;

	/** Whether to auto-generate the peer configuration file. */
	autogenerate_peer?: boolean;

	/** Remote endpoint address (hostname or IP). */
	endpoint?: string;

	/** Remote endpoint port. Range: 1–65535. */
	port?: number;

	/** Peer IP address. */
	peer_ip?: string;

	/** Peer's private key. */
	private_key?: string;

	/** Peer's public key. */
	public_key?: string;

	/** Pre-shared key for additional security. */
	preshared_key?: string;

	/** Allowed IP ranges (comma-separated CIDRs). */
	allowed_ips?: string;

	/** Firewall rule creation mode. */
	configure_firewall?: WireGuardPeerFirewallConfig;

	/** Persistent keepalive interval in seconds. */
	keepalive?: number;
}
