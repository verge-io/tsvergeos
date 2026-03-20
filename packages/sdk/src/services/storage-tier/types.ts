import type { Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS storage tier resource.
 *
 * Storage tiers are system-wide aggregates of vSAN capacity across all clusters.
 * Up to 6 tiers (0-5) may exist, representing different storage performance levels.
 * This is a read-only monitoring resource.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface StorageTier extends Resource {
	/** Tier number (0-5). */
	tier?: number;

	/** Human-readable tier description. */
	description?: string;

	/** Total capacity in bytes. */
	capacity?: number;

	/** Used capacity in bytes. */
	used?: number;

	/** Allocated capacity in bytes. */
	allocated?: number;

	/** Used percentage (0-100). Read-only. */
	used_pct?: number;

	/** Used capacity before deduplication in bytes. */
	used_inflated?: number;

	/** Deduplication ratio. */
	dedupe_ratio?: number;

	/** Last modified timestamp (Unix epoch). Read-only. */
	modified?: number;
}
