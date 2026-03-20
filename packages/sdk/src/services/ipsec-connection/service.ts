import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { IPSecConnection } from './types.js';

/**
 * Service for querying IPSec VPN connection status.
 *
 * This is a **read-only** service — connection entries are managed by the
 * system and cannot be created, updated, or deleted via the API. Each entry
 * represents an active Security Association (SA) for an IPSec tunnel.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/ipsec-connection';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all active IPSec connections for a network
 * const connections = await client.ipsecConnections.listByNetwork(1);
 * ```
 */
export class IPSecConnectionService extends ReadOnlyService<IPSecConnection> {
	constructor(http: HttpClient) {
		super(http, '/vnet_ipsec_connections', 'IPSec Connection');
	}

	/**
	 * List active IPSec connections for a specific network.
	 *
	 * Convenience method that filters by the `vnet` foreign key.
	 *
	 * @param vnetKey - The parent network ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of IPSec connections for the specified network
	 */
	async listByNetwork(vnetKey: FlexKey, options?: ListOptions): Promise<IPSecConnection[]> {
		const vnetFilter = `vnet eq ${vnetKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${vnetFilter} and ${existingFilter}` : vnetFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}

	/**
	 * List active IPSec connections for a specific Phase 1 (IKE SA) entry.
	 *
	 * Convenience method that filters by the `phase1` foreign key.
	 *
	 * @param phase1Key - The Phase 1 entry ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of IPSec connections for the specified Phase 1 entry
	 */
	async listByPhase1(phase1Key: FlexKey, options?: ListOptions): Promise<IPSecConnection[]> {
		const phase1Filter = `phase1 eq ${phase1Key}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${phase1Filter} and ${existingFilter}` : phase1Filter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
