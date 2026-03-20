import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS WireGuard peer status resource.
 *
 * Provides real-time connection statistics for a WireGuard peer, including
 * last handshake time and byte counters. This is a read-only resource —
 * status entries are managed by the system.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface WireGuardPeerStatus extends Resource {
	/** Parent peer reference (FK to `vnet_wireguard_peers`). Read-only. */
	peer: FlexKey;

	/** Unix timestamp of the last successful WireGuard handshake. */
	last_handshake?: number;

	/** Total bytes transmitted to this peer. */
	tx_bytes?: number;

	/** Total bytes received from this peer. */
	rx_bytes?: number;

	/** Last update timestamp (Unix epoch). Read-only. */
	last_update?: number;
}
