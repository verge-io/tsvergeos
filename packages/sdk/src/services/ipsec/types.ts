import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** IPSec configuration mode. */
export type IPSecMode = 'advanced' | 'normal' | (string & {});

/** IPSec unique participant ID handling policy. */
export type IPSecUniqueIds = 'yes' | 'no' | 'never' | 'replace' | 'keep' | (string & {});

/** IPSec CRL validation policy. */
export type IPSecStrictCrlPolicy = 'yes' | 'ifuri' | 'no' | (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS IPSec VPN configuration resource.
 *
 * IPSec configs are per-network singletons (parent: `vnet` FK).
 * Each config holds Phase 1 (IKE SA) children and global IPSec settings
 * like unique ID handling, compression, and vendor compatibility options.
 *
 * Note: IPSec configs have no `name` field — use `getByNetwork()` to look up
 * the config for a specific network.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface IPSec extends Resource {
	/** Parent network reference (FK to `vnets`). Read-only. */
	vnet: FlexKey;

	/** Whether IPSec is enabled on this network. Default: `true`. */
	enabled?: boolean;

	/** Configuration mode: `normal` (GUI-based) or `advanced` (raw config files). Default: `normal`. */
	mode?: IPSecMode;

	/** Raw strongswan.conf content (advanced mode only). */
	strongswan_conf?: string;

	/** Raw ipsec.conf content (advanced mode only). */
	ipsec_conf?: string;

	/** Raw ipsec.secrets content (advanced mode only). */
	ipsec_secrets?: string;

	/** Unique participant ID handling: `yes`, `no`, `never`, `replace`, `keep`. Default: `yes`. */
	uniqueids?: IPSecUniqueIds;

	/** Whether to propose IPComp compression. Default: `false`. */
	compress?: boolean;

	/** Whether to exclude local subnet traffic from IPSec. Default: `true`. */
	exclude_network?: boolean;

	/** Send Cisco Unity vendor ID payload (IKEv1 only). Default: `false`. */
	'charon.cisco_unity'?: boolean;

	/** Accept unencrypted ID/HASH payloads in IKEv1 Main Mode. Default: `false`. */
	'charon.accept_unencrypted_mainmode_messages'?: boolean;

	/** MSS to set on installed routes (0 = disabled). Default: `0`. */
	'charon.plugins.kernel-netlink.mss'?: number;

	/** CRL validation policy: `yes`, `ifuri`, `no`. Default: `no`. */
	strictcrlpolicy?: IPSecStrictCrlPolicy;

	/** Use make-before-break reauthentication (IKEv2). Default: `false`. */
	'charon.make_before_break'?: boolean;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating an IPSec VPN configuration.
 *
 * `vnet` is required. Only one IPSec config may exist per network.
 */
export interface IPSecCreateParams {
	/** Parent network reference (FK to `vnets`). */
	vnet: FlexKey;

	/** Whether IPSec is enabled. Default: `true`. */
	enabled?: boolean;

	/** Configuration mode: `normal` or `advanced`. Default: `normal`. */
	mode?: IPSecMode;

	/** Raw strongswan.conf content (advanced mode). */
	strongswan_conf?: string;

	/** Raw ipsec.conf content (advanced mode). */
	ipsec_conf?: string;

	/** Raw ipsec.secrets content (advanced mode). */
	ipsec_secrets?: string;

	/** Unique participant ID handling. Default: `yes`. */
	uniqueids?: IPSecUniqueIds;

	/** Whether to propose IPComp compression. */
	compress?: boolean;

	/** Whether to exclude local subnet traffic from IPSec. */
	exclude_network?: boolean;

	/** Send Cisco Unity vendor ID payload (IKEv1 only). */
	'charon.cisco_unity'?: boolean;

	/** Accept unencrypted ID/HASH payloads in IKEv1 Main Mode. */
	'charon.accept_unencrypted_mainmode_messages'?: boolean;

	/** MSS to set on installed routes (0 = disabled). */
	'charon.plugins.kernel-netlink.mss'?: number;

	/** CRL validation policy: `yes`, `ifuri`, `no`. */
	strictcrlpolicy?: IPSecStrictCrlPolicy;

	/** Use make-before-break reauthentication (IKEv2). */
	'charon.make_before_break'?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing IPSec VPN configuration.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`vnet`, `modified`) are excluded.
 */
export interface IPSecUpdateParams {
	/** Whether IPSec is enabled. */
	enabled?: boolean;

	/** Configuration mode: `normal` or `advanced`. */
	mode?: IPSecMode;

	/** Raw strongswan.conf content. */
	strongswan_conf?: string;

	/** Raw ipsec.conf content. */
	ipsec_conf?: string;

	/** Raw ipsec.secrets content. */
	ipsec_secrets?: string;

	/** Unique participant ID handling. */
	uniqueids?: IPSecUniqueIds;

	/** Whether to propose IPComp compression. */
	compress?: boolean;

	/** Whether to exclude local subnet traffic from IPSec. */
	exclude_network?: boolean;

	/** Send Cisco Unity vendor ID payload. */
	'charon.cisco_unity'?: boolean;

	/** Accept unencrypted ID/HASH in IKEv1 Main Mode. */
	'charon.accept_unencrypted_mainmode_messages'?: boolean;

	/** MSS to set on installed routes. */
	'charon.plugins.kernel-netlink.mss'?: number;

	/** CRL validation policy. */
	strictcrlpolicy?: IPSecStrictCrlPolicy;

	/** Use make-before-break reauthentication. */
	'charon.make_before_break'?: boolean;
}
