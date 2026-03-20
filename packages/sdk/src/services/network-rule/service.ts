import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { NetworkRule, NetworkRuleCreateParams, NetworkRuleUpdateParams } from './types.js';

/**
 * Service for managing VergeOS network firewall rules.
 *
 * Rules control firewall behavior (accept/drop/reject), NAT/PAT translation,
 * and static routing on a virtual network. Rules are scoped to a parent network
 * via the `vnet` foreign key.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/network-rule';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all rules for a specific network
 * const rules = await client.networkRules.listByNetwork(1);
 *
 * // Create a firewall accept rule
 * const rule = await client.networkRules.create({
 *   vnet: 1,
 *   name: 'Allow SSH',
 *   action: 'accept',
 *   direction: 'incoming',
 *   protocol: 'tcp',
 *   destination_ports: '22',
 * });
 *
 * // Enable/disable a rule
 * await client.networkRules.enable(rule.$key);
 * await client.networkRules.disable(rule.$key);
 * ```
 */
export class NetworkRuleService extends BaseService<
	NetworkRule,
	NetworkRuleCreateParams,
	NetworkRuleUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vnet_rules', 'Network Rule');
	}

	/**
	 * List rules belonging to a specific network.
	 *
	 * Convenience method that filters by the `vnet` foreign key.
	 *
	 * @param vnetKey - The parent network ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of rules for the specified network
	 */
	async listByNetwork(vnetKey: FlexKey, options?: ListOptions): Promise<NetworkRule[]> {
		const vnetFilter = `vnet eq ${vnetKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${vnetFilter} and ${existingFilter}` : vnetFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}

	/**
	 * Enable a network rule.
	 *
	 * Uses the inline action endpoint: `POST /vnet_rules/{key}/enable`.
	 *
	 * @param key - The rule ID to enable
	 */
	async enable(key: FlexKey): Promise<void> {
		await this.http.post(`${this.resource}/${key}/enable`);
	}

	/**
	 * Disable a network rule.
	 *
	 * Uses the inline action endpoint: `POST /vnet_rules/{key}/disable`.
	 *
	 * @param key - The rule ID to disable
	 */
	async disable(key: FlexKey): Promise<void> {
		await this.http.post(`${this.resource}/${key}/disable`);
	}
}
