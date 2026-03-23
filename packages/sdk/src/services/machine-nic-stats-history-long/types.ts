import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine NIC stats history (long-term) resource.
 *
 * Provides long-term historical per-NIC network traffic metrics including
 * aggregate averages and peaks for packet rates and data rates, plus
 * cumulative counters. This is a read-only monitoring resource managed
 * by the system.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineNicStatsHistoryLong extends Resource {
	/** Parent NIC reference (FK to `machine_nics`). */
	parent_nic: FlexKey;

	/** Average transmit packets per second over the long-term period. */
	txpps_avg?: number;

	/** Average receive packets per second over the long-term period. */
	rxpps_avg?: number;

	/** Average transmit bytes per second over the long-term period. */
	txbps_avg?: number;

	/** Average receive bytes per second over the long-term period. */
	rxbps_avg?: number;

	/** Peak transmit packets per second over the long-term period. */
	txpps_peak?: number;

	/** Peak receive packets per second over the long-term period. */
	rxpps_peak?: number;

	/** Peak transmit bytes per second over the long-term period. */
	txbps_peak?: number;

	/** Peak receive bytes per second over the long-term period. */
	rxbps_peak?: number;

	/** Average total bytes per second (transmit + receive). */
	totalxbps_avg?: number;

	/** Peak total bytes per second (transmit + receive). */
	totalxbps_peak?: number;

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
