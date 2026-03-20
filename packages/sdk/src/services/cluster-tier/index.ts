/**
 * Cluster Tier service registration module.
 *
 * Importing this module registers the {@link ClusterTierService} on {@link VergeClient},
 * making `client.clusterTiers` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/cluster-tier';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { ClusterTierService } from "./service.js";

VergeClient.registerService("clusterTiers", ClusterTierService);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for querying cluster tier capacity and cost data (read-only). */
    readonly clusterTiers: ClusterTierService;
  }
}

export { ClusterTierService } from "./service.js";
export type { ClusterTier } from "./types.js";
