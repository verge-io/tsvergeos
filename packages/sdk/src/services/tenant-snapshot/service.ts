import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { WritableService } from '../base.js';
import type { TenantSnapshot, TenantSnapshotUpdateParams } from './types.js';

/**
 * Service for managing VergeOS tenant snapshots.
 *
 * Tenant snapshots are created automatically by snapshot profiles — there
 * is no direct create method. This service supports listing, getting,
 * updating (description, expires), and deleting snapshots.
 *
 * The `refresh` action is keyed by tenant (not snapshot ID), triggering
 * a refresh of the snapshot list from the snapshot profile.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/tenant-snapshot';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List snapshots for a tenant
 * const snapshots = await client.tenantSnapshots.listByTenant(1);
 *
 * // Set a snapshot to never expire
 * await client.tenantSnapshots.setNeverExpires(42);
 *
 * // Refresh snapshots for a tenant
 * await client.tenantSnapshots.refresh(1);
 * ```
 */
export class TenantSnapshotService extends WritableService<
	TenantSnapshot,
	TenantSnapshotUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/tenant_snapshots', 'Tenant Snapshot');
	}

	/**
	 * Refresh the tenant snapshots list from the snapshot profile.
	 *
	 * This action is keyed by tenant ID, not by snapshot ID.
	 * It triggers a refresh of all snapshots for the specified tenant.
	 *
	 * @param tenantKey - The tenant ID to refresh snapshots for
	 */
	async refresh(tenantKey: FlexKey): Promise<void> {
		await this.http.post('/tenant_snapshot_actions', {
			body: {
				tenant: tenantKey,
				action: 'refresh',
			},
		});
	}

	/**
	 * Set a tenant snapshot to never expire.
	 *
	 * Convenience method that sets `expires` to `0`.
	 *
	 * @param key - The snapshot ID
	 * @returns The updated tenant snapshot
	 */
	async setNeverExpires(key: FlexKey): Promise<TenantSnapshot> {
		return this.update(key, { expires: 0 });
	}

	/**
	 * Set the expiration timestamp for a tenant snapshot.
	 *
	 * @param key - The snapshot ID
	 * @param expires - Expiration timestamp (Unix epoch)
	 * @returns The updated tenant snapshot
	 */
	async setExpires(key: FlexKey, expires: number): Promise<TenantSnapshot> {
		return this.update(key, { expires });
	}

	/**
	 * List tenant snapshots for a specific tenant.
	 *
	 * @param tenantKey - The tenant ID to filter by
	 * @returns Array of tenant snapshots for the specified tenant
	 */
	async listByTenant(tenantKey: FlexKey): Promise<TenantSnapshot[]> {
		return this.list({ filter: `tenant eq ${tenantKey}` });
	}
}
