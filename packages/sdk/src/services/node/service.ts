import type { HttpClient } from "../../http.js";
import type { FlexKey, ListOptions } from "../../types.js";
import { WritableService } from "../base.js";
import type { Node, NodeUpdateParams } from "./types.js";

/**
 * Service for managing VergeOS nodes.
 *
 * Nodes are physical or virtual servers belonging to a cluster. They are
 * infrastructure-managed — only update is supported (no create/delete).
 * Provides listing, filtering by cluster, maintenance actions, and other
 * node-level operations.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/node';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all nodes
 * const nodes = await client.nodes.list();
 *
 * // List nodes in a specific cluster
 * const clusterNodes = await client.nodes.listByCluster(1);
 *
 * // Enable maintenance mode
 * await client.nodes.enableMaintenance(node.$key);
 * ```
 */
export class NodeService extends WritableService<Node, NodeUpdateParams> {
  constructor(http: HttpClient) {
    super(http, "/nodes", "Node");
  }

  /**
   * List nodes belonging to a specific cluster.
   *
   * @param clusterKey - The cluster ID to filter by
   * @param options - Additional list options (filter, fields, sort, etc.)
   * @returns Array of nodes in the cluster
   */
  async listByCluster(
    clusterKey: FlexKey,
    options?: ListOptions,
  ): Promise<Node[]> {
    const clusterFilter = `cluster eq ${clusterKey}`;
    const filter = options?.filter
      ? `(${options.filter}) and (${clusterFilter})`
      : clusterFilter;
    return this.list({ ...options, filter });
  }

  /**
   * List only physical nodes.
   *
   * @param options - Additional list options (filter, fields, sort, etc.)
   * @returns Array of physical nodes
   */
  async listPhysical(options?: ListOptions): Promise<Node[]> {
    const physicalFilter = "physical eq true";
    const filter = options?.filter
      ? `(${options.filter}) and (${physicalFilter})`
      : physicalFilter;
    return this.list({ ...options, filter });
  }

  /**
   * Enable maintenance mode on a node.
   *
   * @param key - The node ID
   */
  async enableMaintenance(key: FlexKey): Promise<void> {
    await this.dispatchAction("maintenance", key);
  }

  /**
   * Disable maintenance mode on a node.
   *
   * @param key - The node ID
   */
  async disableMaintenance(key: FlexKey): Promise<void> {
    await this.dispatchAction("leavemaintenance", key);
  }

  /**
   * Reboot a node that is in maintenance mode.
   *
   * @param key - The node ID
   */
  async maintenanceReboot(key: FlexKey): Promise<void> {
    await this.dispatchAction("maintenance_reboot", key);
  }
}
