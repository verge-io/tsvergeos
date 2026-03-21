import type { HttpClient } from "../../http.js";
import type { FlexKey, ListOptions } from "../../types.js";
import { ReadOnlyService } from "../base.js";
import type { CloudSnapshotTenant } from "./types.js";

/**
 * Service for querying tenants captured within VergeOS cloud snapshots.
 *
 * This is a **read-only** service — cloud snapshot tenant records are populated
 * by the system when a cloud snapshot is taken or refreshed.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/cloud-snapshot-tenant';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all tenants in a specific cloud snapshot
 * const tenants = await client.cloudSnapshotTenants.listBySnapshot(5);
 *
 * // Get a specific cloud snapshot tenant record
 * const tenant = await client.cloudSnapshotTenants.get(1);
 * ```
 */
export class CloudSnapshotTenantService extends ReadOnlyService<CloudSnapshotTenant> {
  constructor(http: HttpClient) {
    super(http, "/cloud_snapshot_tenants", "Cloud Snapshot Tenant");
  }

  /**
   * Recover a tenant from a cloud snapshot.
   *
   * @param key - The cloud snapshot tenant record ID
   */
  async recover(key: FlexKey): Promise<void> {
    await this.http.post("/cloud_snapshot_tenant_actions", {
      body: { cloud_snapshot_tenant: key, action: "recover" },
    });
  }

  /**
   * List tenants belonging to a specific cloud snapshot.
   *
   * Convenience method that filters by the `cloud_snapshot` foreign key.
   *
   * @param snapshotKey - The parent cloud snapshot ID
   * @param options - Additional list options (filter, sort, fields, pagination)
   * @returns Array of tenant records for the specified cloud snapshot
   */
  async listBySnapshot(
    snapshotKey: FlexKey,
    options?: ListOptions,
  ): Promise<CloudSnapshotTenant[]> {
    const snapshotFilter = `cloud_snapshot eq ${snapshotKey}`;
    const existingFilter = options?.filter;
    const combinedFilter = existingFilter
      ? `${snapshotFilter} and ${existingFilter}`
      : snapshotFilter;

    return this.list({
      ...options,
      filter: combinedFilter,
    });
  }
}
