import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { IPSecPhase2, IPSecPhase2CreateParams, IPSecPhase2UpdateParams } from './types.js';

/**
 * Service for managing VergeOS IPSec Phase 2 (child SA) configurations.
 *
 * Phase 2 entries define the IPSec SA parameters — cipher suites,
 * local/remote network selectors, mode (tunnel/transport), and protocol.
 * Each Phase 2 belongs to a Phase 1 (parent: `phase1` FK).
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/ipsec-phase2';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List Phase 2 entries for a Phase 1 config
 * const phase2s = await client.ipsecPhase2s.listByPhase1(1);
 * ```
 */
export class IPSecPhase2Service extends BaseService<
	IPSecPhase2,
	IPSecPhase2CreateParams,
	IPSecPhase2UpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vnet_ipsec_phase2s', 'IPSec Phase 2');
	}

	/**
	 * List Phase 2 (child SA) configurations belonging to a specific Phase 1.
	 *
	 * Convenience method that filters by the `phase1` foreign key.
	 * Note: the parent FK is `phase1`, not `ipsec`.
	 *
	 * @param phase1Key - The parent Phase 1 configuration ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of Phase 2 configurations for the specified Phase 1
	 */
	async listByPhase1(phase1Key: FlexKey, options?: ListOptions): Promise<IPSecPhase2[]> {
		const phase1Filter = `phase1 eq ${phase1Key}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${phase1Filter} and ${existingFilter}` : phase1Filter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
