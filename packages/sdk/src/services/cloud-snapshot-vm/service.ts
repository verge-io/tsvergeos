import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { CloudSnapshotVM } from './types.js';

/**
 * Service for querying VMs captured within VergeOS cloud snapshots.
 *
 * This is a **read-only** service — cloud snapshot VM records are populated
 * by the system when a cloud snapshot is taken or refreshed.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/cloud-snapshot-vm';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all VMs in a specific cloud snapshot
 * const vms = await client.cloudSnapshotVms.listBySnapshot(5);
 *
 * // Get a specific cloud snapshot VM record
 * const vm = await client.cloudSnapshotVms.get(1);
 * ```
 */
export class CloudSnapshotVMService extends ReadOnlyService<CloudSnapshotVM> {
	constructor(http: HttpClient) {
		super(http, '/cloud_snapshot_vms', 'Cloud Snapshot VM');
	}

	/**
	 * Recover a VM from a cloud snapshot.
	 *
	 * @param key - The cloud snapshot VM record ID
	 */
	async recover(key: FlexKey): Promise<void> {
		await this.http.post('/cloud_snapshot_vm_actions', {
			body: { cloud_snapshot_vm: key, action: 'recover' },
		});
	}

	/**
	 * List VMs belonging to a specific cloud snapshot.
	 *
	 * Convenience method that filters by the `cloud_snapshot` foreign key.
	 *
	 * @param snapshotKey - The parent cloud snapshot ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of VM records for the specified cloud snapshot
	 */
	async listBySnapshot(snapshotKey: FlexKey, options?: ListOptions): Promise<CloudSnapshotVM[]> {
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
