import type { HttpClient } from "../../http.js";
import type { FlexKey } from "../../types.js";
import { ReadOnlyService } from "../base.js";
import type { ClusterTier } from "./types.js";

/**
 * Service for querying VergeOS cluster tiers.
 *
 * Cluster tiers are per-cluster breakdowns of vSAN storage tiers, providing
 * cluster-specific capacity, cost, and performance data. This is a
 * **read-only** service — cluster tiers are managed by the system.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/cluster-tier';
 *
 * // List all cluster tiers
 * const tiers = await client.clusterTiers.list();
 *
 * // List tiers for a specific cluster
 * const clusterTiers = await client.clusterTiers.listByCluster(1);
 * ```
 */
export class ClusterTierService extends ReadOnlyService<ClusterTier> {
  constructor(http: HttpClient) {
    super(http, "/cluster_tiers", "Cluster Tier");
  }

  /**
   * List cluster tiers for a specific cluster.
   *
   * @param clusterKey - The key of the cluster to filter by.
   * @returns Array of cluster tiers for the given cluster.
   */
  async listByCluster(clusterKey: FlexKey): Promise<ClusterTier[]> {
    return this.list({
      filter: `cluster eq ${clusterKey}`,
    });
  }
}
