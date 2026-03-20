import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	TenantLayer2CreateParams,
	TenantLayer2Network,
	TenantLayer2UpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS tenant Layer 2 network assignments.
 *
 * Provides full CRUD operations plus convenience methods for enabling/disabling
 * assignments and filtering by tenant or network.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/tenant-layer2';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List Layer 2 assignments for a tenant
 * const l2nets = await client.tenantLayer2Networks.listByTenant(1);
 *
 * // Enable an assignment
 * await client.tenantLayer2Networks.enable(42);
 * ```
 */
export class TenantLayer2Service extends BaseService<
	TenantLayer2Network,
	TenantLayer2CreateParams,
	TenantLayer2UpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/tenant_layer2_vnets', 'Tenant Layer 2 Network');
	}

	/**
	 * Enable a tenant Layer 2 network assignment.
	 *
	 * @param key - The assignment ID
	 * @returns The updated assignment
	 */
	async enable(key: FlexKey): Promise<TenantLayer2Network> {
		return this.update(key, { enabled: true });
	}

	/**
	 * Disable a tenant Layer 2 network assignment.
	 *
	 * @param key - The assignment ID
	 * @returns The updated assignment
	 */
	async disable(key: FlexKey): Promise<TenantLayer2Network> {
		return this.update(key, { enabled: false });
	}

	/**
	 * List tenant Layer 2 network assignments for a specific tenant.
	 *
	 * @param tenantKey - The tenant ID to filter by
	 * @returns Array of Layer 2 assignments for the specified tenant
	 */
	async listByTenant(tenantKey: FlexKey): Promise<TenantLayer2Network[]> {
		return this.list({ filter: `tenant eq ${tenantKey}` });
	}

	/**
	 * List tenant Layer 2 network assignments for a specific network.
	 *
	 * @param vnetKey - The vnet ID to filter by
	 * @returns Array of Layer 2 assignments for the specified network
	 */
	async listByNetwork(vnetKey: FlexKey): Promise<TenantLayer2Network[]> {
		return this.list({ filter: `vnet eq ${vnetKey}` });
	}
}
