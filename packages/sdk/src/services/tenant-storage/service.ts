import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	TenantStorage,
	TenantStorageCreateParams,
	TenantStorageUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS tenant storage allocations.
 *
 * Provides full CRUD operations for tenant storage. Each allocation links
 * a tenant to a storage tier with a provisioned capacity.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/tenant-storage';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List storage allocations for a tenant
 * const storage = await client.tenantStorage.listByTenant(1);
 *
 * // Update provisioned capacity
 * await client.tenantStorage.update(42, { provisioned: 1073741824 });
 * ```
 */
export class TenantStorageService extends BaseService<
	TenantStorage,
	TenantStorageCreateParams,
	TenantStorageUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/tenant_storage', 'Tenant Storage');
	}

	/**
	 * List tenant storage allocations for a specific tenant.
	 *
	 * @param tenantKey - The tenant ID to filter by
	 * @returns Array of tenant storage allocations for the specified tenant
	 */
	async listByTenant(tenantKey: FlexKey): Promise<TenantStorage[]> {
		return this.list({ filter: `tenant eq ${tenantKey}` });
	}
}
