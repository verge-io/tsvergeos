import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS storage tier stats resource.
 *
 * Provides I/O metrics for a system-wide storage tier. Each storage tier
 * has one stats row that is continuously updated by the system. This is
 * a read-only monitoring resource.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface StorageTierStats extends Resource {
	/** Parent storage tier reference (FK to `storage_tiers`). */
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
