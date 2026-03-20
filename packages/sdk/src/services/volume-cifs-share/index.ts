/**
 * CIFS Share service registration module.
 *
 * Importing this module registers the {@link VolumeCIFSShareService} on {@link VergeClient},
 * making `client.volumeCifsShares` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/volume-cifs-share';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { VolumeCIFSShareService } from "./service.js";

VergeClient.registerService("volumeCifsShares", VolumeCIFSShareService);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for managing CIFS shares. */
    readonly volumeCifsShares: VolumeCIFSShareService;
  }
}

export { VolumeCIFSShareService } from "./service.js";
export type {
  VolumeCIFSShare,
  VolumeCIFSShareCreateParams,
  VolumeCIFSShareUpdateParams,
} from "./types.js";
