import type { HttpClient } from "../../http.js";
import type { FlexKey, ListOptions } from "../../types.js";
import { BaseService } from "../base.js";
import type {
  NetworkHost,
  NetworkHostCreateParams,
  NetworkHostUpdateParams,
} from "./types.js";

/**
 * Service for managing VergeOS network host overrides.
 *
 * Host overrides are DNS/DHCP static hostname-to-IP mappings on a virtual
 * network. They map a hostname or domain to an IP address — they are NOT
 * MAC-based DHCP reservations.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/network-host';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all host overrides for a network
 * const hosts = await client.networkHosts.listByNetwork(1);
 *
 * // Find a host by hostname
 * const host = await client.networkHosts.getByHost(1, 'myserver');
 *
 * // Find a host by IP address
 * const host = await client.networkHosts.getByIP(1, '10.0.0.50');
 *
 * // Create a host override
 * const newHost = await client.networkHosts.create({
 *   vnet: 1,
 *   host: 'myserver',
 *   ip: '10.0.0.50',
 * });
 * ```
 */
export class NetworkHostService extends BaseService<
  NetworkHost,
  NetworkHostCreateParams,
  NetworkHostUpdateParams
> {
  constructor(http: HttpClient) {
    super(http, "/vnet_hosts", "Network Host");
  }

  /**
   * List host overrides belonging to a specific network.
   *
   * Convenience method that filters by the `vnet` foreign key.
   *
   * @param vnetKey - The parent network ID
   * @param options - Additional list options (filter, sort, fields, pagination)
   * @returns Array of host overrides for the specified network
   */
  async listByNetwork(
    vnetKey: FlexKey,
    options?: ListOptions,
  ): Promise<NetworkHost[]> {
    const vnetFilter = `vnet eq ${vnetKey}`;
    const existingFilter = options?.filter;
    const combinedFilter = existingFilter
      ? `${vnetFilter} and ${existingFilter}`
      : vnetFilter;

    return this.list({
      ...options,
      filter: combinedFilter,
    });
  }

  /**
   * Find a host override by hostname within a specific network.
   *
   * The display field for host overrides is `host`, not `name`. This method
   * filters by both `vnet` and `host` to find a specific host override.
   *
   * @param vnetKey - The parent network ID
   * @param hostname - The hostname to search for
   * @returns The matching host override, or `undefined` if not found
   */
  async getByHost(
    vnetKey: FlexKey,
    hostname: string,
  ): Promise<NetworkHost | undefined> {
    const results = await this.listByNetwork(vnetKey, {
      filter: `host eq '${hostname}'`,
    });
    return results[0];
  }

  /**
   * Find a host override by IP address within a specific network.
   *
   * Useful for reverse lookups — finding which hostname is mapped to a
   * particular IP address.
   *
   * @param vnetKey - The parent network ID
   * @param ip - The IP address to search for
   * @returns The matching host override, or `undefined` if not found
   */
  async getByIP(
    vnetKey: FlexKey,
    ip: string,
  ): Promise<NetworkHost | undefined> {
    const results = await this.listByNetwork(vnetKey, {
      filter: `ip eq '${ip}'`,
    });
    return results[0];
  }
}
