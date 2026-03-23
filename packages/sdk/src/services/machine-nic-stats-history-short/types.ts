import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine NIC stats history (short-term) resource.
 *
 * Provides short-term historical per-NIC network traffic metrics including
 * packet rates, data rates, and cumulative counters. Each row captures a
 * point-in-time snapshot of NIC performance. This is a read-only monitoring
 * resource managed by the system.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineNicStatsHistoryShort extends Resource {
	/** Parent NIC reference (FK to `machine_nics`). */
	parent_nic: FlexKey;

	/** Transmit packets per second. */
	txpps?: number;

	/** Receive packets per second. */
	rxpps?: number;

	/** Transmit bytes per second. */
	txbps?: number;

	/** Receive bytes per second. */
	rxbps?: number;

	/** Total bytes per second (transmit + receive). */
	totalxbps?: number;

	/** Total transmitted packets. */
	tx_pckts?: number;

	/** Total received packets. */
	rx_pckts?: number;

	/** Total transmitted bytes. */
	tx_bytes?: number;

	/** Total received bytes. */
	rx_bytes?: number;

	/** Snapshot timestamp (Unix epoch). */
	timestamp?: number;
}
