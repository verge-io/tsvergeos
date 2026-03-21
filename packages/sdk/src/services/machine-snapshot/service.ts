import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	MachineSnapshot,
	MachineSnapshotCreateParams,
	MachineSnapshotUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS machine snapshots.
 *
 * Machine snapshots capture the state of a machine (VM or physical node)
 * at a point in time. Use {@link listByMachine} to list snapshots for a
 * specific machine.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/machine-snapshot';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all snapshots for a specific VM
 * const snapshots = await client.machineSnapshots.listByMachine(42);
 *
 * // Get a specific snapshot
 * const snap = await client.machineSnapshots.get(1);
 * ```
 */
export class MachineSnapshotService extends BaseService<
	MachineSnapshot,
	MachineSnapshotCreateParams,
	MachineSnapshotUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/machine_snapshots', 'Machine Snapshot');
	}

	/**
	 * List snapshots belonging to a specific machine.
	 *
	 * Convenience method that filters by the `machine` foreign key.
	 *
	 * @param machineKey - The parent machine ID (VM or node)
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of snapshots for the specified machine
	 */
	async listByMachine(machineKey: FlexKey, options?: ListOptions): Promise<MachineSnapshot[]> {
		const machineFilter = `machine eq ${machineKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter
			? `${machineFilter} and ${existingFilter}`
			: machineFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}

	/**
	 * Set the expiration timer for a machine snapshot.
	 *
	 * Uses the inline action endpoint: `POST /machine_snapshots/{key}/expires_timer`.
	 *
	 * @param key - The snapshot ID
	 * @param expires - Expiration timestamp (Unix epoch seconds). Set to `0` to never expire.
	 */
	async expiresTimer(key: FlexKey, expires: number): Promise<void> {
		await this.inlineAction(key, 'expires_timer', { expires });
	}
}
