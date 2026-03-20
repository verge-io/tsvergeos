import { VergeClient } from '../../client.js';
import { ValidationError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { ClientConfig, FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	Tenant,
	TenantCloneOptions,
	TenantCreateParams,
	TenantUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS tenants.
 *
 * Provides full CRUD operations, power management, cloning, network isolation,
 * and tenant context connection for multi-tenant environments.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/tenant';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all tenants
 * const tenants = await client.tenants.list();
 *
 * // Power on a tenant
 * await client.tenants.powerOn(1);
 *
 * // Connect to a tenant's own VergeOS instance
 * const tenantClient = await client.tenants.connect(1, {
 *   username: 'admin', password: 'secret'
 * });
 * ```
 */
export class TenantService extends BaseService<Tenant, TenantCreateParams, TenantUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/tenants', 'Tenant');
	}

	/**
	 * Power on a tenant.
	 *
	 * @param key - The tenant ID
	 */
	async powerOn(key: FlexKey): Promise<void> {
		await this.dispatchAction('poweron', key);
	}

	/**
	 * Power off a tenant.
	 *
	 * @param key - The tenant ID
	 */
	async powerOff(key: FlexKey): Promise<void> {
		await this.dispatchAction('poweroff', key);
	}

	/**
	 * Restart a tenant.
	 *
	 * @param key - The tenant ID
	 */
	async reset(key: FlexKey): Promise<void> {
		await this.dispatchAction('reset', key);
	}

	/**
	 * Clone a tenant.
	 *
	 * @param key - The tenant ID to clone
	 * @param options - Clone options (name, exclusions)
	 */
	async clone(key: FlexKey, options?: TenantCloneOptions): Promise<void> {
		await this.dispatchAction('clone', key, options as Record<string, unknown> | undefined);
	}

	/**
	 * Enable network isolation for a tenant.
	 *
	 * When isolated, the tenant's network is disconnected from the host network.
	 *
	 * @param key - The tenant ID
	 */
	async isolateOn(key: FlexKey): Promise<void> {
		await this.dispatchAction('isolateon', key);
	}

	/**
	 * Disable network isolation for a tenant.
	 *
	 * @param key - The tenant ID
	 */
	async isolateOff(key: FlexKey): Promise<void> {
		await this.dispatchAction('isolateoff', key);
	}

	/**
	 * Refresh the cluster status of a tenant.
	 *
	 * @param key - The tenant ID
	 */
	async refreshStatus(key: FlexKey): Promise<void> {
		await this.dispatchAction('refresh_status', key);
	}

	/**
	 * Connect to a tenant's own VergeOS instance.
	 *
	 * Fetches the tenant record to read its `url` field, then creates a new
	 * {@link VergeClient} targeting that URL. The caller must provide
	 * authentication credentials via the `config` parameter since the parent
	 * system cannot derive tenant credentials.
	 *
	 * @param key - The tenant ID
	 * @param config - Client configuration overrides (must include auth credentials)
	 * @returns A new VergeClient scoped to the tenant's VergeOS instance
	 * @throws {@link ValidationError} if the tenant has no URL configured
	 *
	 * @example
	 * ```typescript
	 * const tenantClient = await client.tenants.connect(1, {
	 *   username: 'admin',
	 *   password: 'tenant-password',
	 * });
	 * ```
	 */
	async connect(key: FlexKey, config?: Partial<ClientConfig>): Promise<VergeClient> {
		const tenant = await this.get(key);
		if (!tenant.url) {
			throw new ValidationError(`Tenant ${key} has no URL configured`, 'url');
		}

		return new VergeClient({
			host: tenant.url,
			...config,
		} as ClientConfig);
	}
}
