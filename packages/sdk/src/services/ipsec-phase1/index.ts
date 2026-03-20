/**
 * IPSec Phase 1 service registration module.
 *
 * Importing this module registers the {@link IPSecPhase1Service} on {@link VergeClient},
 * making `client.ipsecPhase1s` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/ipsec-phase1';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { IPSecPhase1Service } from "./service.js";

VergeClient.registerService("ipsecPhase1s", IPSecPhase1Service);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for managing IPSec Phase 1 (IKE SA) configurations. */
    readonly ipsecPhase1s: IPSecPhase1Service;
  }
}

export { IPSecPhase1Service } from "./service.js";
export type {
  IPSecPhase1,
  IPSecPhase1CreateParams,
  IPSecPhase1UpdateParams,
} from "./types.js";
