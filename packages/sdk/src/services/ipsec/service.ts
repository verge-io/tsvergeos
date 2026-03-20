import { NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { IPSec, IPSecCreateParams, IPSecUpdateParams } from './types.js';

/**
 * Service for managing VergeOS IPSec VPN configurations.
 *
 * IPSec configs are per-network singletons — each virtual network has at most
 * one IPSec config. Use {@link getByNetwork} to retrieve the config for a
 * specific network rather than `getByName` (IPSec configs have no `name` field).
 *
 * Phase 1 (IKE SA) and Phase 2 (child SA) entries are managed via the
 * {@link IPSecPhase1Service} and {@link IPSecPhase2Service} respectively.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/ipsec';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // Get the IPSec config for a network
 * const ipsecConfig = await client.ipsec.getByNetwork(1);
 * ```
 */
export class IPSecService extends BaseService<IPSec, IPSecCreateParams, IPSecUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/vnet_ipsecs', 'IPSec');
	}

	/**
	 * Get the IPSec configuration for a specific network.
	 *
	 * Since there is at most one IPSec config per network, this returns a single
	 * result rather than an array.
	 *
	 * @param vnetKey - The parent network ID
	 * @returns The IPSec configuration for the specified network
	 * @throws {@link NotFoundError} if no IPSec config exists for the network
	 */
	async getByNetwork(vnetKey: FlexKey): Promise<IPSec> {
		const results = await this.list({
			filter: `vnet eq ${vnetKey}`,
		});

		if (results.length === 0) {
			throw new NotFoundError(this.displayName, vnetKey);
		}

		return results[0] as IPSec;
	}

	/**
	 * List IPSec configurations belonging to a specific network.
	 *
	 * Convenience method that filters by the `vnet` foreign key.
	 * Typically returns zero or one result since IPSec is a per-network singleton.
	 *
	 * @param vnetKey - The parent network ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of IPSec configurations for the specified network
	 */
	async listByNetwork(vnetKey: FlexKey, options?: ListOptions): Promise<IPSec[]> {
		const vnetFilter = `vnet eq ${vnetKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${vnetFilter} and ${existingFilter}` : vnetFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
