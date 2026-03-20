/**
 * Flexible key type that handles VergeOS's inconsistent ID serialization.
 * The API may return resource IDs as either numbers or strings.
 */
export type FlexKey = number | string;

/**
 * Base interface for all VergeOS resources.
 * Every resource returned by the API includes a `$key` identifier.
 */
export interface Resource {
	$key: FlexKey;
}

/**
 * Envelope type for VergeOS API responses.
 * Wraps the response data with optional key and error information.
 */
export interface ApiResponse<T = unknown> {
	$key?: FlexKey;
	response?: T;
	err?: string;
}

/**
 * Configuration for creating a VergeClient instance.
 */
export interface ClientConfig {
	/** VergeOS server hostname or URL (e.g., "192.168.1.100" or "https://my-verge.example.com"). */
	host: string;

	/** Username for authentication (used with password-based auth). */
	username?: string;

	/** Password for authentication (used with password-based auth). */
	password?: string;

	/** API key for token-based authentication. */
	apiKey?: string;

	/** Whether to verify SSL certificates. Defaults to `true`. */
	verifySsl?: boolean;

	/** Request timeout in milliseconds. Defaults to `DEFAULT_TIMEOUT`. */
	timeout?: number;

	/** Number of retry attempts for failed requests. Defaults to `DEFAULT_RETRIES`. */
	retries?: number;

	/** Backoff interval between retries in milliseconds. Defaults to `DEFAULT_RETRY_BACKOFF`. */
	retryBackoff?: number;

	/** Custom fetch implementation for testing or platform-specific overrides. */
	fetch?: typeof globalThis.fetch;

	/** AbortSignal for cancelling requests. */
	signal?: AbortSignal;
}

/**
 * Options for list (query) operations.
 */
export interface ListOptions {
	/** Filter expression string for the VergeOS API query. */
	filter?: string;

	/** Fields to include in the response. Accepts a comma-separated string or an array of field names. */
	fields?: string | string[];

	/** Sort expression (e.g., "name" or "-created"). */
	sort?: string;

	/** Maximum number of items to return per request. */
	limit?: number;

	/** Number of items to skip (for pagination). */
	offset?: number;
}

/**
 * Options for auto-paginated list operations that fetch all matching resources.
 * Omits `limit` and `offset` (managed internally) and adds `pageSize` control.
 */
export interface ListAllOptions extends Omit<ListOptions, 'limit' | 'offset'> {
	/** Number of items to fetch per page during auto-pagination. Defaults to `DEFAULT_PAGE_SIZE`. */
	pageSize?: number;
}

/**
 * Options for mutation operations (create, update, delete).
 */
export interface MutationOptions {
	/** Whether to perform a follow-up GET to return the full resource after mutation. Defaults to `true`. */
	readBack?: boolean;
}

// ─── Service Infrastructure Types ────────────────────────────────────────────
// Re-exported here for convenient type-only imports via `tsvergeos/types`.

export type { ActionConfig } from './services/base.js';
export type {
	SiteConfig,
	SiteManagerOptions,
	SiteStatus,
} from './site-manager.js';

// ─── Service Resource Types ──────────────────────────────────────────────────

export type {
	DnsMode,
	IpAddressType,
	Layer2Type,
	Network,
	NetworkCreateParams,
	NetworkOnPowerLoss,
	NetworkType,
	NetworkUpdateParams,
	PortMirroringMode,
	PxeMode,
	RateLimitType,
} from './services/network/types.js';
export type {
	BootOrder,
	CloudInitDatasource,
	ConsoleType,
	CreatedFrom,
	MigrationMethod,
	OnPowerLoss,
	OSFamily,
	RTCBase,
	SoundType,
	VideoType,
	VM,
	VMCloneOptions,
	VMCreateParams,
	VMSnapshotOptions,
	VMUpdateParams,
} from './services/vm/types.js';
