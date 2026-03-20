import { ApiError, NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { Webhook, WebhookStatus } from './types.js';

/**
 * Service for querying VergeOS webhook delivery logs.
 *
 * Webhooks are delivery records created automatically by the system.
 * They cannot be created or updated via the API — only listed, retrieved,
 * or deleted. Entries auto-expire after 70 days, with a maximum of 3,000
 * rows per account.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/webhook';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all webhook deliveries
 * const deliveries = await client.webhooks.list();
 *
 * // List failed deliveries
 * const failed = await client.webhooks.listFailed();
 *
 * // List deliveries for a specific webhook URL
 * const byUrl = await client.webhooks.listByWebhookURL(1);
 *
 * // Delete a delivery record
 * await client.webhooks.delete(42);
 * ```
 */
export class WebhookService extends ReadOnlyService<Webhook> {
	constructor(http: HttpClient) {
		super(http, '/webhooks', 'Webhook');
	}

	/**
	 * Delete a webhook delivery record.
	 *
	 * @param key - The webhook delivery ID
	 * @throws {@link NotFoundError} if the record does not exist
	 */
	async delete(key: FlexKey): Promise<void> {
		try {
			await this.http.del(`${this.resource}/${key}`);
		} catch (err) {
			if (err instanceof ApiError && err.statusCode === 404) {
				throw new NotFoundError(this.displayName, key);
			}
			throw err;
		}
	}

	/**
	 * List webhook deliveries for a specific webhook URL.
	 *
	 * @param webhookURLKey - The webhook URL ID to filter by
	 * @param options - Additional list options
	 * @returns Array of matching delivery records
	 */
	async listByWebhookURL(webhookURLKey: FlexKey, options?: ListOptions): Promise<Webhook[]> {
		return this.list({
			...options,
			filter: `webhook_url eq ${webhookURLKey}`,
		});
	}

	/**
	 * List webhook deliveries with a specific status.
	 *
	 * @param status - The delivery status to filter by
	 * @param options - Additional list options
	 * @returns Array of matching delivery records
	 */
	async listByStatus(status: WebhookStatus, options?: ListOptions): Promise<Webhook[]> {
		return this.list({
			...options,
			filter: `status eq '${status}'`,
		});
	}

	/**
	 * List webhook deliveries that are pending (queued or running).
	 *
	 * @param options - Additional list options
	 * @returns Array of pending delivery records
	 */
	async listPending(options?: ListOptions): Promise<Webhook[]> {
		return this.list({
			...options,
			filter: "status eq 'queued' or status eq 'running'",
		});
	}

	/**
	 * List webhook deliveries that failed.
	 *
	 * @param options - Additional list options
	 * @returns Array of failed delivery records
	 */
	async listFailed(options?: ListOptions): Promise<Webhook[]> {
		return this.listByStatus('error', options);
	}
}
