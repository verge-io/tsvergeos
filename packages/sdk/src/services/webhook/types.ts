import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Webhook delivery status. */
export type WebhookStatus = 'queued' | 'running' | 'sent' | 'error';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS webhook delivery log entry.
 *
 * Webhooks are individual delivery records created automatically by the system
 * when events trigger notifications. They cannot be created or updated via the
 * API — only listed, retrieved, or deleted.
 *
 * Entries auto-expire after 70 days. Maximum 3,000 rows per account.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface Webhook extends Resource {
	/** FK reference to the webhook URL destination. Read-only. */
	webhook_url?: FlexKey;

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;

	/** Timestamp of last delivery attempt (Unix epoch). */
	last_attempt?: number;

	/** The message payload that was delivered. */
	message?: string;

	/** Current delivery status. Default: `'queued'`. */
	status?: WebhookStatus;

	/** Additional status details (e.g., error message). */
	status_info?: string;
}
