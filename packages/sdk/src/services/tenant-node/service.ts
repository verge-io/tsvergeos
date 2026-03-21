import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type { TenantNode, TenantNodeCreateParams, TenantNodeUpdateParams } from './types.js';

/**
 * Service for managing VergeOS tenant nodes.
 *
 * Provides full CRUD operations and power management for tenant compute nodes.
 * Tenant nodes represent virtual nodes allocated to a tenant, each with
 * configurable CPU cores, RAM, and HA settings.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/tenant-node';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List nodes for a specific tenant
 * const nodes = await client.tenantNodes.listByTenant(1);
 *
 * // Power on a tenant node
 * await client.tenantNodes.powerOn(42);
 * ```
 */
/**
 * Default fields for TenantNode list/get requests.
 *
 * Includes cross-resource joins from the machine status table so that
 * power state is reliably populated without consumers needing to manually
 * fan out to `machineStatuses`.
 *
 * @internal
 */
const TENANT_NODE_DEFAULT_FIELDS = [
	'$key',
	'name',
	'description',
	'enabled',
	'tenant',
	'nodeid',
	'cpu_cores',
	'ram',
	'cluster',
	'cluster_failover',
	'preferred_node',
	'ha_group',
	'on_power_loss',
	'is_snapshot',
	'machine',
	'created',
	'modified',
	// Cross-resource joins — populates power state reliably
	'machine#status#powerstate as powerstate',
	'machine#status#status as status',
];

export class TenantNodeService extends BaseService<
	TenantNode,
	TenantNodeCreateParams,
	TenantNodeUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/tenant_nodes', 'Tenant Node');
		this.defaultFields = TENANT_NODE_DEFAULT_FIELDS;
	}

	/**
	 * Power on a tenant node.
	 *
	 * @param key - The tenant node ID
	 */
	async powerOn(key: FlexKey): Promise<void> {
		await this.dispatchAction('poweron', key);
	}

	/**
	 * Power off a tenant node.
	 *
	 * @param key - The tenant node ID
	 */
	async powerOff(key: FlexKey): Promise<void> {
		await this.dispatchAction('poweroff', key);
	}

	/**
	 * Reset (restart) a tenant node.
	 *
	 * @param key - The tenant node ID
	 */
	async reset(key: FlexKey): Promise<void> {
		await this.dispatchAction('reset', key);
	}

	/**
	 * Forcefully kill a tenant node.
	 *
	 * @param key - The tenant node ID
	 */
	async kill(key: FlexKey): Promise<void> {
		await this.dispatchAction('kill', key);
	}

	/**
	 * Migrate a tenant node to another host node.
	 *
	 * @param key - The tenant node ID
	 * @param targetNode - Optional target host node to migrate to
	 */
	async migrate(key: FlexKey, targetNode?: FlexKey): Promise<void> {
		const params = targetNode !== undefined ? { preferred_node: targetNode } : undefined;
		await this.dispatchAction('migrate', key, params);
	}

	/**
	 * Power on a tenant node and migrate it to a different host.
	 *
	 * @param key - The tenant node ID
	 */
	async powerOnMigrate(key: FlexKey): Promise<void> {
		await this.dispatchAction('poweronmigrate', key);
	}

	/**
	 * Power off a tenant node for maintenance.
	 *
	 * @param key - The tenant node ID
	 */
	async powerOffMaintenance(key: FlexKey): Promise<void> {
		await this.dispatchAction('poweroffmaintenance', key);
	}

	/**
	 * Refresh the tenant node state.
	 *
	 * @param key - The tenant node ID
	 */
	async refresh(key: FlexKey): Promise<void> {
		await this.dispatchAction('refresh', key);
	}

	/**
	 * Execute a command on a tenant node.
	 *
	 * @param key - The tenant node ID
	 * @param params - Optional parameters for the command
	 */
	async execute(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('execute', key, params);
	}

	/**
	 * List tenant nodes belonging to a specific tenant.
	 *
	 * @param tenantKey - The tenant ID to filter by
	 * @returns Array of tenant nodes for the specified tenant
	 */
	async listByTenant(tenantKey: FlexKey): Promise<TenantNode[]> {
		return this.list({ filter: `tenant eq ${tenantKey}` });
	}
}
