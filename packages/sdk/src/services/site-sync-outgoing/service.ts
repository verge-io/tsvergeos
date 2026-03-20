import type { HttpClient } from "../../http.js";
import type { FlexKey, ListOptions } from "../../types.js";
import { BaseService } from "../base.js";
import type {
  SiteSyncOutgoing,
  SiteSyncOutgoingCreateParams,
  SiteSyncOutgoingUpdateParams,
} from "./types.js";

/**
 * Service for managing VergeOS outgoing site syncs.
 *
 * Outgoing syncs push snapshot data to remote sites. They handle transport
 * configuration (threads, encryption, compression), bandwidth throttling,
 * retry behavior, and remote snapshot management.
 *
 * Actions use the dedicated `/site_syncs_outgoing_actions` endpoint with
 * FK field `site_syncs_outgoing`.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/site-sync-outgoing';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all outgoing syncs
 * const syncs = await client.siteSyncsOutgoing.list();
 *
 * // List outgoing syncs for a specific site
 * const siteSyncs = await client.siteSyncsOutgoing.listBySite(1);
 *
 * // Enable an outgoing sync
 * await client.siteSyncsOutgoing.enable(1);
 * ```
 */
export class SiteSyncOutgoingService extends BaseService<
  SiteSyncOutgoing,
  SiteSyncOutgoingCreateParams,
  SiteSyncOutgoingUpdateParams
> {
  constructor(http: HttpClient) {
    super(http, "/site_syncs_outgoing", "Outgoing Sync");
  }

  /**
   * List outgoing syncs belonging to a specific site.
   *
   * @param siteKey - The site ID to filter by
   * @param options - Additional list options (fields, sort, limit, etc.)
   * @returns Array of outgoing syncs for the given site
   */
  async listBySite(
    siteKey: FlexKey,
    options?: ListOptions,
  ): Promise<SiteSyncOutgoing[]> {
    const siteFilter = `site eq ${siteKey}`;
    const filter = options?.filter
      ? `(${options.filter}) and ${siteFilter}`
      : siteFilter;
    return this.list({ ...options, filter });
  }

  /**
   * Enable an outgoing sync.
   *
   * @param key - The outgoing sync ID
   */
  async enable(key: FlexKey): Promise<void> {
    await this.dispatchAction("enable", key);
  }

  /**
   * Disable an outgoing sync.
   *
   * @param key - The outgoing sync ID
   */
  async disable(key: FlexKey): Promise<void> {
    await this.dispatchAction("disable", key);
  }

  /**
   * Throttle an outgoing sync.
   *
   * @param key - The outgoing sync ID
   * @param params - Throttle parameters
   */
  async throttleSync(
    key: FlexKey,
    params?: Record<string, unknown>,
  ): Promise<void> {
    await this.dispatchAction("throttle_sync", key, params);
  }

  /**
   * Add a snapshot to the transfer queue.
   *
   * @param key - The outgoing sync ID
   * @param params - Queue parameters
   */
  async addToQueue(
    key: FlexKey,
    params?: Record<string, unknown>,
  ): Promise<void> {
    await this.dispatchAction("add_to_queue", key, params);
  }

  /**
   * Refresh remote snapshots.
   *
   * @param key - The outgoing sync ID
   */
  async refresh(key: FlexKey): Promise<void> {
    await this.dispatchAction("refresh", key);
  }

  /**
   * Set up a sync-back incoming sync on the remote system.
   *
   * @param key - The outgoing sync ID
   */
  async setupSyncBack(key: FlexKey): Promise<void> {
    await this.dispatchAction("setup_sync_back", key);
  }

  /**
   * Create a repair server for this outgoing sync.
   *
   * @param key - The outgoing sync ID
   */
  async createRepairServer(key: FlexKey): Promise<void> {
    await this.dispatchAction("create_repair_server", key);
  }

  /**
   * Update the remote configuration for this outgoing sync.
   *
   * @param key - The outgoing sync ID
   */
  async updateRemoteConfig(key: FlexKey): Promise<void> {
    await this.dispatchAction("update_remote_config", key);
  }
}
