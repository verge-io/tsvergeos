import type { Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Webhook URL type. Currently only `custom` is supported. */
export type WebhookURLType = 'custom';

/** Authorization method for the webhook URL. */
export type WebhookURLAuthorizationType = 'none' | 'basic' | 'bearer' | 'apikey';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS webhook URL resource.
 *
 * Webhook URLs are configurable destinations where the system sends
 * notifications. Each webhook URL defines an HTTP endpoint, authorization
 * method, and retry/timeout settings.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface WebhookURL extends Resource {
	/** Webhook name. Unique, max 128 characters. */
	name?: string;

	/** Webhook type. Currently only `'custom'` is supported. */
	type?: WebhookURLType;

	/** Target URL for webhook delivery. */
	url?: string;

	/** HTTP headers to include with requests. Default: `'Content-Type:application/json'`. */
	headers?: string;

	/** Authorization method. Default: `'none'`. */
	authorization_type?: WebhookURLAuthorizationType;

	/** Authorization value (token, password, etc.). */
	authorization_value?: string;

	/** Whether to allow insecure (self-signed) TLS certificates. Default: `false`. */
	allow_insecure?: boolean;

	/** Request timeout in seconds (3–120). Default: `5`. */
	timeout?: number;

	/** Number of delivery retries (0–100). Default: `3`. */
	retries?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new webhook URL.
 */
export interface WebhookURLCreateParams {
	/** Webhook name. Required, unique, max 128 characters. */
	name: string;

	/** Target URL for webhook delivery. Required. */
	url: string;

	/** Webhook type. Default: `'custom'`. */
	type?: WebhookURLType;

	/** HTTP headers to include. Default: `'Content-Type:application/json'`. */
	headers?: string;

	/** Authorization method. Default: `'none'`. */
	authorization_type?: WebhookURLAuthorizationType;

	/** Authorization value. */
	authorization_value?: string;

	/** Whether to allow insecure TLS certificates. Default: `false`. */
	allow_insecure?: boolean;

	/** Request timeout in seconds (3–120). Default: `5`. */
	timeout?: number;

	/** Number of delivery retries (0–100). Default: `3`. */
	retries?: number;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing webhook URL.
 *
 * All fields are optional — only provided fields are changed.
 */
export interface WebhookURLUpdateParams {
	/** Webhook name. Unique, max 128 characters. */
	name?: string;

	/** Target URL for webhook delivery. */
	url?: string;

	/** Webhook type. */
	type?: WebhookURLType;

	/** HTTP headers to include. */
	headers?: string;

	/** Authorization method. */
	authorization_type?: WebhookURLAuthorizationType;

	/** Authorization value. */
	authorization_value?: string;

	/** Whether to allow insecure TLS certificates. */
	allow_insecure?: boolean;

	/** Request timeout in seconds (3–120). */
	timeout?: number;

	/** Number of delivery retries (0–100). */
	retries?: number;
}
