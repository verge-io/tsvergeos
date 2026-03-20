/**
 * Webhook service registration module.
 *
 * Importing this module registers the {@link WebhookService} on {@link VergeClient},
 * making `client.webhooks` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/webhook';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { WebhookService } from './service.js';

VergeClient.registerService('webhooks', WebhookService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying webhook delivery logs. */
		readonly webhooks: WebhookService;
	}
}

export { WebhookService } from './service.js';
export type { Webhook, WebhookStatus } from './types.js';
