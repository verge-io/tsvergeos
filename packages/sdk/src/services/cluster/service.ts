import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { Cluster, ClusterCreateParams, ClusterUpdateParams } from './types.js';

/**
 * Service for managing VergeOS clusters.
 *
 * Clusters group physical nodes for compute and/or storage workloads.
 * Provides full CRUD operations plus cluster-level actions (shutdown,
 * cancel shutdown, refresh) and convenience filters for storage vs.
 * compute clusters.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/cluster';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all clusters
 * const clusters = await client.clusters.list();
 *
 * // List only storage clusters
 * const storage = await client.clusters.listStorage();
 *
 * // Shutdown a cluster
 * await client.clusters.shutdown(cluster.$key);
 * ```
 */
export class ClusterService extends BaseService<Cluster, ClusterCreateParams, ClusterUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/clusters', 'Cluster');
	}

	/**
	 * List clusters that are designated as storage clusters.
	 *
	 * @param options - Additional list options (filter, fields, sort, etc.)
	 * @returns Array of storage clusters
	 */
	async listStorage(options?: ListOptions): Promise<Cluster[]> {
		const storageFilter = 'storage eq true';
		const filter = options?.filter ? `(${options.filter}) and (${storageFilter})` : storageFilter;
		return this.list({ ...options, filter });
	}

	/**
	 * List clusters that provide compute resources.
	 *
	 * @param options - Additional list options (filter, fields, sort, etc.)
	 * @returns Array of compute clusters
	 */
	async listCompute(options?: ListOptions): Promise<Cluster[]> {
		const computeFilter = 'compute eq true';
		const filter = options?.filter ? `(${options.filter}) and (${computeFilter})` : computeFilter;
		return this.list({ ...options, filter });
	}

	/**
	 * Initiate a graceful shutdown of a cluster.
	 *
	 * @param key - The cluster ID
	 */
	async shutdown(key: FlexKey): Promise<void> {
		await this.dispatchAction('shutdown', key);
	}

	/**
	 * Cancel a pending cluster shutdown.
	 *
	 * @param key - The cluster ID
	 */
	async cancelShutdown(key: FlexKey): Promise<void> {
		await this.dispatchAction('cancel_shutdown', key);
	}

	/**
	 * Refresh cluster state and configuration.
	 *
	 * @param key - The cluster ID
	 */
	async refresh(key: FlexKey): Promise<void> {
		await this.dispatchAction('refresh', key);
	}
}
