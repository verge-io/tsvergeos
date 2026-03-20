import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type { WebhookURL, WebhookURLCreateParams, WebhookURLUpdateParams } from './types.js';

/**
 * Service for managing VergeOS webhook URL destinations.
 *
 * Webhook URLs define where the system sends notifications. Each webhook URL
 * specifies an HTTP endpoint, authorization method, and retry/timeout settings.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/webhook-url';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all webhook URLs
 * const urls = await client.webhookUrls.list();
 *
 * // Create a webhook URL
 * const hook = await client.webhookUrls.create({
 *   name: 'My Webhook',
 *   url: 'https://example.com/hook',
 * });
 *
 * // Send a test message
 * await client.webhookUrls.send(hook.$key, 'Test message');
 * ```
 */
export class WebhookURLService extends BaseService<
	WebhookURL,
	WebhookURLCreateParams,
	WebhookURLUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/webhook_urls', 'WebhookURL');
	}

	/**
	 * Send a test message through a webhook URL.
	 *
	 * Uses the dedicated action pattern: `POST /webhook_url_actions`.
	 *
	 * @param key - The webhook URL ID
	 * @param message - The message to send
	 */
	async send(key: FlexKey, message: string): Promise<void> {
		await this.dispatchAction('send', key, { message });
	}
}
