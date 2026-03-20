/**
 * Network Address service registration module.
 *
 * Importing this module registers the {@link NetworkAddressService} on {@link VergeClient},
 * making `client.networkAddresses` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/network-address';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { NetworkAddressService } from "./service.js";

VergeClient.registerService("networkAddresses", NetworkAddressService);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for managing network addresses (DHCP leases, static IPs, aliases, etc.). */
    readonly networkAddresses: NetworkAddressService;
  }
}

export { NetworkAddressService } from "./service.js";
export type {
  AddressType,
  NetworkAddress,
  NetworkAddressCreateParams,
  NetworkAddressUpdateParams,
} from "./types.js";
