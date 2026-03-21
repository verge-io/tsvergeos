/** Current version of the tsvergeos SDK. */
export const SDK_VERSION = '0.1.0';

/** VergeOS API version string. */
export const API_VERSION = 'v4';

/** Base path prefix for all VergeOS API endpoints. */
export const API_BASE_PATH = '/api/v4';

/** Default request timeout in milliseconds (30 seconds). */
export const DEFAULT_TIMEOUT = 30_000;

/** Default number of retry attempts for failed requests. */
export const DEFAULT_RETRIES = 3;

/** Default backoff interval between retries in milliseconds (1 second). */
export const DEFAULT_RETRY_BACKOFF = 1_000;

/** Default number of items per page for list requests. */
export const DEFAULT_PAGE_SIZE = 100;

/** Maximum number of items per page for list requests. */
export const MAX_PAGE_SIZE = 1_000;

/** Default timeout for waiting on task completion in milliseconds (5 minutes). */
export const TASK_WAIT_TIMEOUT = 300_000;

/** Default polling interval for task status checks in milliseconds (2 seconds). */
export const TASK_POLL_INTERVAL = 2_000;

/** Minimum supported major version of the VergeOS server. */
export const MIN_MAJOR_VERSION = 25;

/** Chunk size for file uploads in bytes (256 KB). */
export const UPLOAD_CHUNK_SIZE = 262_144;

/** Prefix for environment variables used by the SDK. */
export const ENV_PREFIX = 'VERGEOS_';
