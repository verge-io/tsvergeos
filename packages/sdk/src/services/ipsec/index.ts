/**
 * IPSec service registration module.
 *
 * Importing this module registers the {@link IPSecService} on {@link VergeClient},
 * making `client.ipsec` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/ipsec';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { IPSecService } from "./service.js";

VergeClient.registerService("ipsec", IPSecService);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for managing IPSec VPN configurations on virtual networks. */
    readonly ipsec: IPSecService;
  }
}

export { IPSecService } from "./service.js";
export type { IPSec, IPSecCreateParams, IPSecUpdateParams } from "./types.js";
