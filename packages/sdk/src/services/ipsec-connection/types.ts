import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS IPSec VPN connection status resource.
 *
 * Connections are **read-only** runtime status records showing active
 * Security Association (SA) state. Each entry represents an established
 * IPSec tunnel with local/remote endpoints and traffic selectors.
 *
 * Parent: `vnet` FK. Also references `phase1` and `phase2` entries.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface IPSecConnection extends Resource {
	/** Parent network reference (FK to `vnets`). */
	vnet: FlexKey;

	/** Phase 1 (IKE SA) reference (FK to `vnet_ipsec_phase1s`). */
	phase1?: FlexKey;

	/** Phase 2 (child SA) reference (FK to `vnet_ipsec_phase2s`). */
	phase2?: FlexKey;

	/** Unique SA identifier assigned by the IKE daemon. */
	uniqueid?: number;

	/** Local endpoint address (IP or IP:port). */
	local?: string;

	/** Remote endpoint address (IP or IP:port). */
	remote?: string;

	/** Local traffic selector (CIDR). */
	local_network?: string;

	/** Remote traffic selector (CIDR). */
	remote_network?: string;

	/** Connection name / SA identifier string. */
	connection?: string;

	/** Request ID for kernel SA. */
	reqid?: string;

	/** Network interface used by this SA. */
	interface?: string;

	/** IPSec protocol (e.g., `ESP`, `AH`). */
	protocol?: string;

	/** SA creation timestamp (Unix epoch). */
	created?: number;
}
