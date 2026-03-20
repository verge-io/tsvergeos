import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS cluster tier stats resource.
 *
 * Provides I/O metrics for a per-cluster storage tier. Each cluster tier
 * has one stats row that is continuously updated by the system. This is
 * a read-only monitoring resource.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface ClusterTierStats extends Resource {
	/** Parent cluster tier reference (FK to `cluster_tiers`). */
	tier: FlexKey;

	/** Read operations per second. */
	rops?: number;

	/** Write operations per second. */
	wops?: number;

	/** Read bytes per second. */
	rbps?: number;

	/** Write bytes per second. */
	wbps?: number;

	/** Total read operations. */
	reads?: number;

	/** Total write operations. */
	writes?: number;

	/** Total bytes read. */
	read_bytes?: number;

	/** Total bytes written. */
	write_bytes?: number;

	/** Last update timestamp (Unix epoch). Read-only. */
	last_update?: number;
}
