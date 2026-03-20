import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { IPSecPhase1, IPSecPhase1CreateParams, IPSecPhase1UpdateParams } from './types.js';

/**
 * Service for managing VergeOS IPSec Phase 1 (IKE SA) configurations.
 *
 * Phase 1 entries define the IKE Security Association parameters —
 * encryption algorithms, authentication method, remote gateway, and
 * dead peer detection settings. Each Phase 1 belongs to an IPSec config
 * (parent: `ipsec` FK) and contains Phase 2 (child SA) entries.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/ipsec-phase1';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List Phase 1 entries for an IPSec config
 * const phase1s = await client.ipsecPhase1s.listByIPSec(1);
 * ```
 */
export class IPSecPhase1Service extends BaseService<
	IPSecPhase1,
	IPSecPhase1CreateParams,
	IPSecPhase1UpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vnet_ipsec_phase1s', 'IPSec Phase 1');
	}

	/**
	 * List Phase 1 (IKE SA) configurations belonging to a specific IPSec config.
	 *
	 * Convenience method that filters by the `ipsec` foreign key.
	 *
	 * @param ipsecKey - The parent IPSec configuration ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of Phase 1 configurations for the specified IPSec config
	 */
	async listByIPSec(ipsecKey: FlexKey, options?: ListOptions): Promise<IPSecPhase1[]> {
		const ipsecFilter = `ipsec eq ${ipsecKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${ipsecFilter} and ${existingFilter}` : ipsecFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
