/**
 * NFS Share service registration module.
 *
 * Importing this module registers the {@link VolumeNFSShareService} on {@link VergeClient},
 * making `client.volumeNfsShares` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/volume-nfs-share';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { VolumeNFSShareService } from "./service.js";

VergeClient.registerService("volumeNfsShares", VolumeNFSShareService);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for managing NFS shares. */
    readonly volumeNfsShares: VolumeNFSShareService;
  }
}

export { VolumeNFSShareService } from "./service.js";
export type {
  VolumeNFSShare,
  VolumeNFSShareCreateParams,
  VolumeNFSShareUpdateParams,
  NfsSquash,
  NfsDataAccess,
} from "./types.js";
