import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine NIC stats resource.
 *
 * Provides per-NIC network traffic metrics including packets per second,
 * bytes per second, and cumulative counters. Each machine NIC has one stats
 * row that is continuously updated by the system. This is a read-only
 * monitoring resource.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineNicStats extends Resource {
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

	/** Current transmitted packets counter. */
	tx_pckts_cur?: number;

	/** Current received packets counter. */
	rx_pckts_cur?: number;

	/** Current transmitted bytes counter. */
	tx_bytes_cur?: number;

	/** Current received bytes counter. */
	rx_bytes_cur?: number;

	/** Last update timestamp (Unix epoch). Read-only. */
	last_update?: number;

	/** Bulk update data (JSON). */
	bulk_update?: unknown;
}
