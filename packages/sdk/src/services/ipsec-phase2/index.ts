/**
 * IPSec Phase 2 service registration module.
 *
 * Importing this module registers the {@link IPSecPhase2Service} on {@link VergeClient},
 * making `client.ipsecPhase2s` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/ipsec-phase2';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { IPSecPhase2Service } from "./service.js";

VergeClient.registerService("ipsecPhase2s", IPSecPhase2Service);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for managing IPSec Phase 2 (child SA) configurations. */
    readonly ipsecPhase2s: IPSecPhase2Service;
  }
}

export { IPSecPhase2Service } from "./service.js";
export type {
  IPSecPhase2,
  IPSecPhase2CreateParams,
  IPSecPhase2UpdateParams,
} from "./types.js";
