import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS tenant stats history (long-term) resource.
 *
 * Provides long-term historical CPU, RAM, storage tier, and GPU utilization
 * metrics per tenant. This is a read-only monitoring resource managed by
 * the system. Unlike the short-term variant, long-term history does not
 * include percentage fields.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface TenantStatsHistoryLong extends Resource {
	/** Parent tenant reference (FK to `tenants`). */
	tenant: FlexKey;

	/** RAM used in bytes. */
	ram_used?: number;

	/** Virtual RAM used in bytes. */
	vram_used?: number;

	/** Total CPU usage percentage. */
	total_cpu?: number;

	/** Number of CPU cores allocated. */
	core_count?: number;

	/** Number of IP addresses in use. */
	ip_count?: number;

	/** RAM allocated in bytes. */
	ram_allocated?: number;

	/** Tier 0 storage provisioned in bytes. */
	tier0_provisioned?: number;

	/** Tier 0 storage used in bytes. */
	tier0_used?: number;

	/** Tier 0 storage allocated in bytes. */
	tier0_allocated?: number;

	/** Tier 1 storage provisioned in bytes. */
	tier1_provisioned?: number;

	/** Tier 1 storage used in bytes. */
	tier1_used?: number;

	/** Tier 1 storage allocated in bytes. */
	tier1_allocated?: number;

	/** Tier 2 storage provisioned in bytes. */
	tier2_provisioned?: number;

	/** Tier 2 storage used in bytes. */
	tier2_used?: number;

	/** Tier 2 storage allocated in bytes. */
	tier2_allocated?: number;

	/** Tier 3 storage provisioned in bytes. */
	tier3_provisioned?: number;

	/** Tier 3 storage used in bytes. */
	tier3_used?: number;

	/** Tier 3 storage allocated in bytes. */
	tier3_allocated?: number;

	/** Tier 4 storage provisioned in bytes. */
	tier4_provisioned?: number;

	/** Tier 4 storage used in bytes. */
	tier4_used?: number;

	/** Tier 4 storage allocated in bytes. */
	tier4_allocated?: number;

	/** Tier 5 storage provisioned in bytes. */
	tier5_provisioned?: number;

	/** Tier 5 storage used in bytes. */
	tier5_used?: number;

	/** Tier 5 storage allocated in bytes. */
	tier5_allocated?: number;

	/** Number of vGPUs in use. */
	vgpus_used?: number;

	/** Number of physical GPUs in use. */
	gpus_used?: number;

	/** Total number of vGPUs available. */
	vgpus_total?: number;

	/** Total number of physical GPUs available. */
	gpus_total?: number;

	/** Snapshot timestamp (Unix epoch). */
	timestamp?: number;
}
