/**
 * Webhook URL service registration module.
 *
 * Importing this module registers the {@link WebhookURLService} on {@link VergeClient},
 * making `client.webhookUrls` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/webhook-url';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { WebhookURLService } from './service.js';

VergeClient.registerService('webhookUrls', WebhookURLService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing webhook URL destinations. */
		readonly webhookUrls: WebhookURLService;
	}
}

export { WebhookURLService } from './service.js';
export type {
	WebhookURL,
	WebhookURLAuthorizationType,
	WebhookURLCreateParams,
	WebhookURLType,
	WebhookURLUpdateParams,
} from './types.js';
