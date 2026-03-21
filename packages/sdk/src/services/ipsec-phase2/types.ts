import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** IPSec tunnel mode. */
export type IPSecPhase2Mode = 'tunnel' | 'transport';

/** IPSec security protocol. */
export type IPSecProtocol = 'esp' | 'ah';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS IPSec Phase 2 (child SA) configuration resource.
 *
 * Phase 2 entries define the IPSec Security Association parameters —
 * encryption ciphers, local/remote networks, mode, and protocol.
 * Parent: `phase1` FK (to `vnet_ipsec_phase1s`).
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface IPSecPhase2 extends Resource {
	/** Parent Phase 1 configuration reference (FK to `vnet_ipsec_phase1s`). Read-only. */
	phase1: FlexKey;

	/** Whether this Phase 2 configuration is enabled. Default: `true`. */
	enabled?: boolean;

	/** Phase 2 configuration name. Min 1, max 128 characters. Unique. */
	name: string;

	/** Human-readable description. */
	description?: string;

	/** IPSec mode: `tunnel` (subnet-to-subnet) or `transport` (host-to-host). Default: `tunnel`. */
	mode?: IPSecPhase2Mode;

	/** Local network/subnet in CIDR notation. */
	local: string;

	/** Remote network/subnet in CIDR notation. */
	remote?: string;

	/** IPSec SA lifetime in seconds. Range: 60–86400. Default: `3600`. */
	lifetime?: number;

	/** IPSec protocol: `esp` (encryption) or `ah` (auth only). Default: `esp`. */
	protocol?: IPSecProtocol;

	/** Cipher suites for IPSec SA. Default: `aes128-sha256-modp2048,aes128gcm128-sha256-modp2048`. */
	ciphers: string;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating an IPSec Phase 2 (child SA) configuration.
 *
 * `phase1`, `name`, `local`, and `ciphers` are required.
 */
export interface IPSecPhase2CreateParams {
	/** Parent Phase 1 configuration reference (FK to `vnet_ipsec_phase1s`). */
	phase1: FlexKey;

	/** Phase 2 configuration name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Human-readable description. */
	description?: string;

	/** Whether this Phase 2 is enabled. Default: `true`. */
	enabled?: boolean;

	/** IPSec mode: `tunnel` or `transport`. Default: `tunnel`. */
	mode?: IPSecPhase2Mode;

	/** Local network/subnet in CIDR notation. */
	local: string;

	/** Remote network/subnet in CIDR notation. */
	remote?: string;

	/** IPSec SA lifetime in seconds. Range: 60–86400. Default: `3600`. */
	lifetime?: number;

	/** IPSec protocol: `esp` or `ah`. Default: `esp`. */
	protocol?: IPSecProtocol;

	/** Cipher suites. Default: `aes128-sha256-modp2048,aes128gcm128-sha256-modp2048`. */
	ciphers?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing IPSec Phase 2 configuration.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`phase1`, `modified`) are excluded.
 */
export interface IPSecPhase2UpdateParams {
	/** Phase 2 configuration name. */
	name?: string;

	/** Human-readable description. */
	description?: string;

	/** Whether this Phase 2 is enabled. */
	enabled?: boolean;

	/** IPSec mode: `tunnel` or `transport`. */
	mode?: IPSecPhase2Mode;

	/** Local network/subnet in CIDR notation. */
	local?: string;

	/** Remote network/subnet in CIDR notation. */
	remote?: string;

	/** IPSec SA lifetime in seconds. */
	lifetime?: number;

	/** IPSec protocol: `esp` or `ah`. */
	protocol?: IPSecProtocol;

	/** Cipher suites. */
	ciphers?: string;
}
