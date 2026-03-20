import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type { Network, NetworkCreateParams, NetworkUpdateParams } from './types.js';

/**
 * Service for managing VergeOS virtual networks (vnets).
 *
 * Provides full CRUD operations, power management, firewall rule application,
 * and DNS configuration for virtual networks.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/network';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all networks
 * const networks = await client.networks.list();
 *
 * // Create an internal network
 * const net = await client.networks.create({ name: 'my-network', type: 'internal' });
 *
 * // Power operations
 * await client.networks.powerOn(net.$key);
 * await client.networks.powerOff(net.$key);
 * ```
 */
export class NetworkService extends BaseService<Network, NetworkCreateParams, NetworkUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/vnets', 'Network');
	}

	/**
	 * Power on a virtual network.
	 *
	 * @param key - The network ID
	 */
	async powerOn(key: FlexKey): Promise<void> {
		await this.dispatchAction('poweron', key);
	}

	/**
	 * Power off a virtual network gracefully.
	 *
	 * @param key - The network ID
	 */
	async powerOff(key: FlexKey): Promise<void> {
		await this.dispatchAction('poweroff', key);
	}

	/**
	 * Force power off a virtual network (like pulling the plug).
	 *
	 * Use {@link powerOff} for a graceful shutdown instead.
	 *
	 * @param key - The network ID
	 */
	async kill(key: FlexKey): Promise<void> {
		await this.dispatchAction('kill', key);
	}

	/**
	 * Reset a virtual network.
	 *
	 * @param key - The network ID
	 * @param applyFirewall - Whether to apply firewall rules after reset
	 */
	async reset(key: FlexKey, applyFirewall?: boolean): Promise<void> {
		const params = applyFirewall ? { apply: true } : undefined;
		await this.dispatchAction('reset', key, params);
	}

	/**
	 * Apply firewall rules to a virtual network.
	 *
	 * Uses the dedicated action endpoint with action `'refresh'`.
	 *
	 * @param key - The network ID
	 */
	async applyRules(key: FlexKey): Promise<void> {
		await this.dispatchAction('refresh', key);
	}

	/**
	 * Apply DNS configuration to a virtual network.
	 *
	 * Uses a direct PUT call since there is no dedicated action endpoint
	 * equivalent for DNS application.
	 *
	 * @param key - The network ID
	 */
	async applyDns(key: FlexKey): Promise<void> {
		await this.http.put(`/vnets/${key}/applydns`);
	}
}
