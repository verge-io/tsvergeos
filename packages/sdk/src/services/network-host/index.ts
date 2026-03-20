/**
 * Network Host service registration module.
 *
 * Importing this module registers the {@link NetworkHostService} on {@link VergeClient},
 * making `client.networkHosts` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/network-host';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { NetworkHostService } from "./service.js";

VergeClient.registerService("networkHosts", NetworkHostService);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for managing DNS/DHCP host overrides on virtual networks. */
    readonly networkHosts: NetworkHostService;
  }
}

export { NetworkHostService } from "./service.js";
export type {
  HostType,
  NetworkHost,
  NetworkHostCreateParams,
  NetworkHostUpdateParams,
} from "./types.js";
