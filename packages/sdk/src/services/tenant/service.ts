import { VergeClient } from '../../client.js';
import { NotFoundError, ValidationError } from '../../errors.js';
import { quoteFilterString } from '../../filter.js';
import type { HttpClient } from '../../http.js';
import type { ClientConfig, FlexKey, Resource } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	Tenant,
	TenantCloneOptions,
	TenantCreateParams,
	TenantGiveFileOptions,
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

	/**
	 * Deploy a crash cart VM for emergency tenant access.
	 *
	 * The crash cart is a utility VM deployed from the "Crash Cart" marketplace
	 * recipe that provides browser-based access to a tenant's VergeOS UI via its
	 * core internal network — bypassing external networking entirely.
	 *
	 * Internally: finds the "Crash Cart" VM recipe and deploys it with the
	 * tenant ID as an answer parameter.
	 *
	 * @param key - The tenant ID to deploy the crash cart for
	 * @throws {@link NotFoundError} if the "Crash Cart" recipe is not available
	 *
	 * @example
	 * ```typescript
	 * // Deploy a crash cart for emergency access
	 * await client.tenants.deployCrashCart(1);
	 * ```
	 */
	async deployCrashCart(key: FlexKey): Promise<void> {
		// Find the "Crash Cart" VM recipe
		const recipes = await this.http.get<Resource[]>('/vm_recipes', {
			params: { filter: "name eq 'Crash Cart'" },
		});

		if (recipes.length === 0) {
			throw new NotFoundError(
				'VM Recipe',
				'Crash Cart',
				'Crash Cart recipe not found — ensure it is downloaded from the marketplace',
			);
		}

		// Deploy the recipe with the tenant as an answer
		// biome-ignore lint: length already checked above
		const recipe = recipes[0]!;
		await this.http.post('/vm_recipe_instances', {
			body: {
				recipe: recipe.$key,
				name: 'Crash Cart',
				answers: { tenant: key },
			},
		});
	}

	/**
	 * Delete a crash cart VM for a tenant.
	 *
	 * Finds the VM named "Crash Cart - {tenant_name}" and deletes it.
	 *
	 * @param key - The tenant ID whose crash cart should be deleted
	 * @throws {@link NotFoundError} if no crash cart VM is found for the tenant
	 *
	 * @example
	 * ```typescript
	 * // Remove the crash cart when emergency access is no longer needed
	 * await client.tenants.deleteCrashCart(1);
	 * ```
	 */
	async deleteCrashCart(key: FlexKey): Promise<void> {
		// Get the tenant to find its name
		const tenant = await this.get(key);
		const crashCartName = `Crash Cart - ${tenant.name}`;

		// Find the crash cart VM
		const vms = await this.http.get<Resource[]>('/vms', {
			params: { filter: `name eq ${quoteFilterString(crashCartName)}` },
		});

		if (vms.length === 0) {
			throw new NotFoundError(
				'VM',
				crashCartName,
				`No crash cart VM found for tenant "${tenant.name}"`,
			);
		}

		// biome-ignore lint: length already checked above
		const crashCartVm = vms[0]!;
		await this.http.del(`/vms/${crashCartVm.$key}`);
	}

	/**
	 * Execute a command on a tenant.
	 *
	 * @param key - The tenant ID
	 * @param params - Optional execution parameters
	 */
	async execute(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('execute', key, params);
	}

	/**
	 * Restore a tenant from a snapshot.
	 *
	 * @param key - The tenant ID
	 * @param params - Optional restore parameters
	 */
	async restore(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('restore', key, params);
	}

	/**
	 * Convert a system/cloud snapshot for a tenant.
	 *
	 * @param key - The tenant ID
	 * @param params - Optional conversion parameters
	 */
	async convertCloudSnapshot(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('convert_cloud_snapshot', key, params);
	}

	/**
	 * Recover a tenant from a system/cloud snapshot.
	 *
	 * @param key - The tenant ID
	 * @param params - Optional recovery parameters
	 */
	async recoverCloudSnapshot(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('recover_cloudsnapshot', key, params);
	}

	/**
	 * Share/give a file to a tenant.
	 *
	 * @param key - The tenant ID
	 * @param options - File options including the file FK reference
	 */
	async giveFile(key: FlexKey, options: TenantGiveFileOptions): Promise<void> {
		await this.dispatchAction('give_file', key, options as unknown as Record<string, unknown>);
	}
}
