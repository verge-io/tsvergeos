import type { HttpClient } from '../../http.js';
import type { FlexKey, MutationOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	CloudSnapshot,
	CloudSnapshotCreateParams,
	CloudSnapshotUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS cloud snapshots.
 *
 * Cloud snapshots are system-level point-in-time captures that preserve
 * VMs, tenants, and volumes. They form the foundation of VergeOS DR.
 *
 * Creation uses a table action (`POST /cloud_snapshots?action=create`) instead
 * of a standard POST. Actions use the dedicated `/cloud_snapshot_actions` endpoint.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/cloud-snapshot';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all cloud snapshots
 * const snapshots = await client.cloudSnapshots.list();
 *
 * // Create a new snapshot
 * const snap = await client.cloudSnapshots.create({ name: 'pre-upgrade' });
 *
 * // Clone a snapshot
 * await client.cloudSnapshots.clone(snap.$key, 'pre-upgrade-copy');
 *
 * // Refresh snapshot content
 * await client.cloudSnapshots.refresh(snap.$key);
 * ```
 */
export class CloudSnapshotService extends BaseService<
	CloudSnapshot,
	CloudSnapshotCreateParams,
	CloudSnapshotUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/cloud_snapshots', 'Cloud Snapshot');
	}

	/**
	 * Create a new cloud snapshot.
	 *
	 * Overrides the default POST to use a table action:
	 * `POST /cloud_snapshots?action=create` with the create params as the body.
	 *
	 * @param params - The snapshot creation parameters
	 * @param options - Mutation options (e.g., `readBack: false` to skip re-fetch)
	 * @returns The created cloud snapshot
	 */
	override async create(
		params: CloudSnapshotCreateParams,
		options?: MutationOptions,
	): Promise<CloudSnapshot> {
		const response = await this.http.post<{ $key: FlexKey }>(`${this.resource}?action=create`, {
			body: params,
		});

		const key = response.$key;

		if (options?.readBack === false) {
			return { $key: key } as unknown as CloudSnapshot;
		}

		return this.get(key);
	}

	/**
	 * Refresh a cloud snapshot, re-scanning its content and updating child records.
	 *
	 * @param key - The cloud snapshot ID to refresh
	 */
	async refresh(key: FlexKey): Promise<void> {
		await this.dispatchAction('refresh', key);
	}

	/**
	 * Clone a cloud snapshot.
	 *
	 * @param key - The cloud snapshot ID to clone
	 * @param name - The name for the cloned snapshot
	 */
	async clone(key: FlexKey, name: string): Promise<void> {
		await this.dispatchAction('clone', key, { name });
	}

	/**
	 * Request a cloud snapshot from a provider site.
	 *
	 * Used for received snapshots — requests the snapshot data from the
	 * remote provider.
	 *
	 * @param key - The cloud snapshot ID to request
	 */
	async requestFromProvider(key: FlexKey): Promise<void> {
		await this.dispatchAction('request', key);
	}

	/**
	 * Discover and populate the list of tenants captured in a cloud snapshot.
	 *
	 * @param key - The cloud snapshot ID to scan for tenants
	 */
	async findTenants(key: FlexKey): Promise<void> {
		await this.dispatchAction('find_tenants', key);
	}

	/**
	 * Discover and populate the list of VMs captured in a cloud snapshot.
	 *
	 * @param key - The cloud snapshot ID to scan for VMs
	 */
	async findVMs(key: FlexKey): Promise<void> {
		await this.dispatchAction('find_vms', key);
	}
}
