import type { FlexKey, Resource } from "../../types.js";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS cluster tier resource.
 *
 * Cluster tiers are per-cluster breakdowns of vSAN storage tiers. Each cluster
 * may have up to 6 tiers (0-5), providing cluster-specific capacity, cost, and
 * performance data. This is a read-only monitoring resource.
 *
 * Related child resources: {@link ClusterTierStats} for I/O metrics,
 * {@link ClusterTierStatus} for health/redundancy state.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface ClusterTier extends Resource {
  /** FK to the parent cluster. */
  cluster?: FlexKey;

  /** Tier number (0-5). */
  tier?: number;

  /** Human-readable tier description. */
  description?: string;

  /** Cost per GB for this tier. */
  cost_per_gb?: number;

  /** Price per GB for this tier. */
  price_per_gb?: number;
}
