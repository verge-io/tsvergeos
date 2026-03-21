import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Expiration type for API keys. */
export type ApiKeyExpiresType = 'never' | 'date' | (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS user API key resource.
 *
 * API keys provide token-based authentication for programmatic access to the
 * VergeOS API. The actual token value is only returned once at creation time
 * and cannot be retrieved afterwards.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface UserAPIKey extends Resource {
	/** User that owns this API key (FK to `users`). */
	user?: FlexKey;

	/** Joined user name. Read-only. */
	user_name?: string;

	/** Display name for this API key. Min 1, max 128 characters. */
	name?: string;

	/** Description. Max 2048 characters. */
	description?: string;

	/** IP allow list for restricting key usage. */
	ip_allow_list?: string;

	/** IP deny list for restricting key usage. */
	ip_deny_list?: string;

	/** Last login timestamp (Unix epoch). Read-only. */
	lastlogin_stamp?: number;

	/** IP address of last login. Read-only. */
	lastlogin_ip?: string;

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;

	/** Expiration type. Default: `date`. */
	expires_type?: ApiKeyExpiresType;

	/** Expiration timestamp (Unix epoch). Only relevant when `expires_type` is `date`. */
	expires?: number;

	/** Credential reference (FK to `/sys/credentials`). Read-only. */
	credential?: FlexKey;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new API key.
 *
 * `user` and `name` are required. Read-only fields (`user_name`,
 * `lastlogin_stamp`, `lastlogin_ip`, `created`, `credential`) are excluded.
 */
export interface UserAPIKeyCreateParams {
	/** User that will own this API key (FK to `users`). */
	user: FlexKey;

	/** Display name for this API key. Min 1, max 128 characters. */
	name: string;

	/** Description. Max 2048 characters. */
	description?: string;

	/** IP allow list for restricting key usage. */
	ip_allow_list?: string;

	/** IP deny list for restricting key usage. */
	ip_deny_list?: string;

	/** Expiration type. Default: `date`. */
	expires_type?: ApiKeyExpiresType;

	/** Expiration timestamp (Unix epoch). Only relevant when `expires_type` is `date`. */
	expires?: number;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing API key.
 *
 * All fields are optional — only provided fields are changed.
 * `user` cannot be changed after creation.
 */
export interface UserAPIKeyUpdateParams {
	/** Display name for this API key. Min 1, max 128 characters. */
	name?: string;

	/** Description. Max 2048 characters. */
	description?: string;

	/** IP allow list for restricting key usage. */
	ip_allow_list?: string;

	/** IP deny list for restricting key usage. */
	ip_deny_list?: string;

	/** Expiration type. */
	expires_type?: ApiKeyExpiresType;

	/** Expiration timestamp (Unix epoch). Only relevant when `expires_type` is `date`. */
	expires?: number;
}

// ─── Create Result ───────────────────────────────────────────────────────────

/**
 * Result of creating an API key.
 *
 * The `token` is the one-time API key value that can only be retrieved at
 * creation time. It is not stored and cannot be retrieved later.
 */
export interface UserAPIKeyCreateResult {
	/** The created API key resource. */
	apiKey: UserAPIKey;

	/** The one-time API key token. Store securely — it cannot be retrieved again. */
	token: string;
}
