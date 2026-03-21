import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** IKE version for key exchange. */
export type IPSecKeyExchange = 'ikev1' | 'ikev2' | 'ike' | (string & {});

/** IPSec Phase 1 authentication method. */
export type IPSecAuth = 'psk' | 'pubkey' | (string & {});

/** IKEv1 negotiation mode. */
export type IPSecNegotiation = 'main' | 'aggressive' | (string & {});

/** IPSec connection startup behavior. */
export type IPSecAuto = 'add' | 'route' | 'start' | (string & {});

/** Dead peer detection action. */
export type IPSecDpdAction = 'none' | 'clear' | 'hold' | 'restart' | (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS IPSec Phase 1 (IKE SA) configuration resource.
 *
 * Phase 1 entries define IKE Security Associations — the initial key exchange
 * and authentication between IPSec peers. Parent: `ipsec` FK (to `vnet_ipsecs`).
 * Each Phase 1 has child Phase 2 (child SA) entries.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface IPSecPhase1 extends Resource {
	/** Parent IPSec configuration reference (FK to `vnet_ipsecs`). Read-only. */
	ipsec: FlexKey;

	/** Whether this Phase 1 configuration is enabled. Default: `true`. */
	enabled?: boolean;

	/** Phase 1 configuration name. Min 1, max 128 characters. Unique. */
	name: string;

	/** Human-readable description. */
	description?: string;

	/** IKE version: `ikev1`, `ikev2`, `ike` (auto). Default: `ike`. */
	keyexchange?: IPSecKeyExchange;

	/** Remote peer IP address or hostname. */
	remote_gateway: string;

	/** Authentication method: `psk` (mutual PSK) or `pubkey` (mutual RSA). Default: `psk`. */
	auth?: IPSecAuth;

	/** Negotiation mode: `main` or `aggressive`. Default: `main`. */
	negotiation?: IPSecNegotiation;

	/** Local identifier (blank = current IP). */
	identifier?: string;

	/** Peer identifier (blank = remote gateway). */
	peer_identifier?: string;

	/** Pre-shared key (hidden in API responses). */
	psk?: string;

	/** IKE encryption algorithm(s). Default: `aes256-sha256-modp2048`. */
	ike: string;

	/** IKE SA lifetime in seconds. Min: 60. Default: `10800`. */
	ikelifetime?: number;

	/** Connection behavior: `add` (responder only), `route` (on-demand), `start`. Default: `route`. */
	auto?: IPSecAuto;

	/** Enable IKEv2 MOBIKE protocol. Default: `false`. */
	mobike?: boolean;

	/** Create separate connections for each Phase 2. Default: `false`. */
	split_connections?: boolean;

	/** Force UDP encapsulation even without NAT. Default: `false`. */
	forceencaps?: boolean;

	/** Number of negotiation attempts (0 = never give up). Default: `3`. */
	keyingtries?: number;

	/** Enable renegotiation before expiry. Default: `true`. */
	rekey?: boolean;

	/** Enable reauthentication during rekey (IKEv2). Default: `true`. */
	reauth?: boolean;

	/** Time before expiry to start rekeying, in seconds. Default: `540`. */
	margintime?: number;

	/** Dead peer detection action: `none`, `clear`, `hold`, `restart`. Default: `restart`. */
	dpdaction?: IPSecDpdAction;

	/** DPD check interval in seconds. Default: `30`. */
	dpddelay?: number;

	/** Max DPD failures before disconnect (IKEv1). Default: `5`. */
	dpdfailures?: number;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating an IPSec Phase 1 (IKE SA) configuration.
 *
 * `ipsec`, `name`, `remote_gateway`, and `ike` are required.
 */
export interface IPSecPhase1CreateParams {
	/** Parent IPSec configuration reference (FK to `vnet_ipsecs`). */
	ipsec: FlexKey;

	/** Phase 1 configuration name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Human-readable description. */
	description?: string;

	/** Whether this Phase 1 is enabled. Default: `true`. */
	enabled?: boolean;

	/** IKE version: `ikev1`, `ikev2`, `ike` (auto). Default: `ike`. */
	keyexchange?: IPSecKeyExchange;

	/** Remote peer IP address or hostname. */
	remote_gateway: string;

	/** Authentication method: `psk` or `pubkey`. Default: `psk`. */
	auth?: IPSecAuth;

	/** Negotiation mode: `main` or `aggressive`. Default: `main`. */
	negotiation?: IPSecNegotiation;

	/** Local identifier. */
	identifier?: string;

	/** Peer identifier. */
	peer_identifier?: string;

	/** Pre-shared key (required for `psk` auth). */
	psk?: string;

	/** IKE encryption algorithm(s). Default: `aes256-sha256-modp2048`. */
	ike: string;

	/** IKE SA lifetime in seconds. Min: 60. Default: `10800`. */
	ikelifetime?: number;

	/** Connection behavior: `add`, `route`, `start`. Default: `route`. */
	auto?: IPSecAuto;

	/** Enable IKEv2 MOBIKE protocol. */
	mobike?: boolean;

	/** Create separate connections for each Phase 2. */
	split_connections?: boolean;

	/** Force UDP encapsulation. */
	forceencaps?: boolean;

	/** Number of negotiation attempts. Default: `3`. */
	keyingtries?: number;

	/** Enable renegotiation. Default: `true`. */
	rekey?: boolean;

	/** Enable reauthentication. Default: `true`. */
	reauth?: boolean;

	/** Rekeying margin time in seconds. Default: `540`. */
	margintime?: number;

	/** Dead peer detection action. Default: `restart`. */
	dpdaction?: IPSecDpdAction;

	/** DPD check interval. Default: `30`. */
	dpddelay?: number;

	/** Max DPD failures. Default: `5`. */
	dpdfailures?: number;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing IPSec Phase 1 configuration.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`ipsec`, `modified`) are excluded.
 */
export interface IPSecPhase1UpdateParams {
	/** Phase 1 configuration name. */
	name?: string;

	/** Human-readable description. */
	description?: string;

	/** Whether this Phase 1 is enabled. */
	enabled?: boolean;

	/** IKE version. */
	keyexchange?: IPSecKeyExchange;

	/** Remote peer IP address or hostname. */
	remote_gateway?: string;

	/** Authentication method. */
	auth?: IPSecAuth;

	/** Negotiation mode. */
	negotiation?: IPSecNegotiation;

	/** Local identifier. */
	identifier?: string;

	/** Peer identifier. */
	peer_identifier?: string;

	/** Pre-shared key. */
	psk?: string;

	/** IKE encryption algorithm(s). */
	ike?: string;

	/** IKE SA lifetime in seconds. */
	ikelifetime?: number;

	/** Connection behavior. */
	auto?: IPSecAuto;

	/** Enable IKEv2 MOBIKE protocol. */
	mobike?: boolean;

	/** Create separate connections for each Phase 2. */
	split_connections?: boolean;

	/** Force UDP encapsulation. */
	forceencaps?: boolean;

	/** Number of negotiation attempts. */
	keyingtries?: number;

	/** Enable renegotiation. */
	rekey?: boolean;

	/** Enable reauthentication. */
	reauth?: boolean;

	/** Rekeying margin time in seconds. */
	margintime?: number;

	/** Dead peer detection action. */
	dpdaction?: IPSecDpdAction;

	/** DPD check interval. */
	dpddelay?: number;

	/** Max DPD failures. */
	dpdfailures?: number;
}
