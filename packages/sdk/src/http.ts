import {
	API_BASE_PATH,
	DEFAULT_RETRIES,
	DEFAULT_RETRY_BACKOFF,
	DEFAULT_TIMEOUT,
	SDK_VERSION,
} from './constants.js';
import {
	ApiError,
	AuthError,
	ConflictError,
	isVergeError,
	NotFoundError,
	ValidationError,
} from './errors.js';
import type { ClientConfig, ListOptions } from './types.js';

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

/** Whether the current environment is a browser (has `document`). */
const isBrowser = 'document' in globalThis;

// ---------------------------------------------------------------------------
// AbortSignal polyfills
// ---------------------------------------------------------------------------

/**
 * Create an AbortSignal that fires after `ms` milliseconds.
 * Uses the native `AbortSignal.timeout()` when available, falling back to
 * a manual `AbortController` + `setTimeout` for older runtimes.
 */
function createTimeoutSignal(ms: number): AbortSignal {
	if (typeof AbortSignal.timeout === 'function') {
		return AbortSignal.timeout(ms);
	}
	const controller = new AbortController();
	setTimeout(() => controller.abort(new DOMException('TimeoutError', 'TimeoutError')), ms);
	return controller.signal;
}

/**
 * Combine multiple AbortSignals into one that aborts when any input signal does.
 * Uses the native `AbortSignal.any()` when available, falling back to manual
 * event listener forwarding for older runtimes.
 */
function combineSignals(signals: AbortSignal[]): AbortSignal {
	if (typeof AbortSignal.any === 'function') {
		return AbortSignal.any(signals);
	}
	const controller = new AbortController();
	for (const signal of signals) {
		if (signal.aborted) {
			controller.abort(signal.reason);
			return controller.signal;
		}
		signal.addEventListener('abort', () => controller.abort(signal.reason), {
			once: true,
		});
	}
	return controller.signal;
}

/**
 * Options for an individual HTTP request made by {@link HttpClient}.
 */
interface RequestOptions {
	/** JSON-serializable request body. */
	body?: unknown;
	/** Query parameters derived from {@link ListOptions}. */
	params?: ListOptions;
	/** Per-request AbortSignal (combined with the client-level signal). */
	signal?: AbortSignal;
}

/**
 * Low-level HTTP transport for the VergeOS API.
 *
 * Handles URL construction, authentication headers, JSON serialization,
 * retry with exponential backoff, timeout via `AbortSignal`, and
 * error mapping to the SDK's typed error hierarchy.
 */
export class HttpClient {
	private readonly baseUrl: string;
	private readonly authHeader: string;
	private readonly timeout: number;
	private readonly retries: number;
	private readonly retryBackoff: number;
	private readonly fetchImpl: typeof globalThis.fetch;
	private readonly signal?: AbortSignal;

	/**
	 * The base URL of the connected server (e.g., `https://my-vergeos.example.com`).
	 * Excludes the API path prefix.
	 */
	get host(): string {
		return this.baseUrl;
	}

	constructor(config: ClientConfig) {
		const host = config.host.replace(/\/+$/, '');
		this.baseUrl = host.startsWith('http') ? host : `https://${host}`;

		if (config.apiKey) {
			this.authHeader = `Bearer ${config.apiKey}`;
		} else if (config.username && config.password) {
			const encoded = btoa(`${config.username}:${config.password}`);
			this.authHeader = `Basic ${encoded}`;
		} else {
			throw new ValidationError('ClientConfig must include either apiKey or username+password');
		}

		this.timeout = config.timeout ?? DEFAULT_TIMEOUT;
		this.retries = config.retries ?? DEFAULT_RETRIES;
		this.retryBackoff = config.retryBackoff ?? DEFAULT_RETRY_BACKOFF;
		this.fetchImpl = config.fetch ?? globalThis.fetch;
		this.signal = config.signal;
	}

	/**
	 * Perform a GET request to an API endpoint.
	 *
	 * @param path - API path relative to `/api/v4/` (e.g., `/vms`)
	 * @param options - Optional query params and abort signal
	 * @returns Parsed JSON response body typed as `T`
	 */
	async get<T>(path: string, options?: RequestOptions): Promise<T> {
		return this.request<T>('GET', path, options);
	}

	/**
	 * Perform a POST request to an API endpoint.
	 *
	 * @param path - API path relative to `/api/v4/`
	 * @param options - Request body, query params, and abort signal
	 * @returns Parsed JSON response body typed as `T`
	 */
	async post<T>(path: string, options?: RequestOptions): Promise<T> {
		return this.request<T>('POST', path, options);
	}

	/**
	 * Perform a PUT request to an API endpoint.
	 *
	 * @param path - API path relative to `/api/v4/`
	 * @param options - Request body, query params, and abort signal
	 * @returns Parsed JSON response body typed as `T`
	 */
	async put<T>(path: string, options?: RequestOptions): Promise<T> {
		return this.request<T>('PUT', path, options);
	}

	/**
	 * Perform a DELETE request to an API endpoint.
	 *
	 * @param path - API path relative to `/api/v4/`
	 * @param options - Optional abort signal
	 */
	async del(path: string, options?: RequestOptions): Promise<void> {
		await this.request<unknown>('DELETE', path, options);
	}

	/**
	 * Perform a GET request to an absolute path (not prefixed with `/api/v4/`).
	 * Used for endpoints like `/version.json` that live outside the API base path.
	 *
	 * @param path - Absolute path on the server (e.g., `/version.json`)
	 * @param options - Optional abort signal
	 * @returns Parsed JSON response body typed as `T`
	 */
	async getAbsolute<T>(path: string, options?: RequestOptions): Promise<T> {
		return this.request<T>('GET', path, { ...options }, true);
	}

	/**
	 * Perform a raw PUT request with a non-JSON body (e.g., binary upload).
	 *
	 * Unlike {@link put}, this method sends the body as-is without JSON serialization,
	 * using the specified content type. Used for file upload chunks.
	 *
	 * @param path - API path relative to `/api/v4/`
	 * @param body - Raw request body (e.g., `Uint8Array`)
	 * @param contentType - MIME type of the body (e.g., `'application/octet-stream'`)
	 * @param queryParams - Optional query string parameters as key-value pairs
	 */
	async putRaw(
		path: string,
		body: Uint8Array | ArrayBuffer | string,
		contentType: string,
		queryParams?: Record<string, string>,
	): Promise<void> {
		const url = this.buildRawUrl(path, queryParams);
		const signal = this.buildSignal();

		const headers: Record<string, string> = {
			Authorization: this.authHeader,
			'Content-Type': contentType,
		};
		if (!isBrowser) {
			headers['User-Agent'] = `tsvergeos/${SDK_VERSION}`;
			headers.Connection = 'close';
		}

		const init: RequestInit = { method: 'PUT', headers, signal, body };

		const response = await this.fetchImpl(url, init);

		if (!response.ok) {
			throw await this.buildError(response, url);
		}
	}

	/**
	 * Perform a raw GET request returning the full `Response` object.
	 *
	 * Unlike {@link get}, this method does not parse JSON. The caller is
	 * responsible for reading and closing the response body. Used for
	 * file downloads.
	 *
	 * @param path - API path relative to `/api/v4/`
	 * @param queryParams - Optional query string parameters as key-value pairs
	 * @returns The raw `Response` object
	 */
	async getRaw(path: string, queryParams?: Record<string, string>): Promise<Response> {
		const url = this.buildRawUrl(path, queryParams);
		const signal = this.buildSignal();

		const headers: Record<string, string> = {
			Authorization: this.authHeader,
		};
		if (!isBrowser) {
			headers['User-Agent'] = `tsvergeos/${SDK_VERSION}`;
		}

		const init: RequestInit = { method: 'GET', headers, signal };

		const response = await this.fetchImpl(url, init);

		if (!response.ok) {
			throw await this.buildError(response, url);
		}

		return response;
	}

	/**
	 * Core request method with retry logic, timeout, and error mapping.
	 */
	private async request<T>(
		method: string,
		path: string,
		options?: RequestOptions,
		absolute = false,
	): Promise<T> {
		const url = this.buildUrl(path, options?.params, absolute);
		const headers = this.buildHeaders(method, absolute);
		const signal = this.buildSignal(options?.signal);

		const init: RequestInit = { method, headers, signal };
		if (options?.body !== undefined) {
			init.body = JSON.stringify(options.body);
		}

		let lastError: unknown;

		for (let attempt = 0; attempt <= this.retries; attempt++) {
			if (attempt > 0) {
				const delay = this.retryBackoff * 2 ** (attempt - 1);
				await this.sleep(delay);
			}

			try {
				const response = await this.fetchImpl(url, init);

				if (response.ok) {
					const text = await response.text();
					if (!text) return undefined as T;
					return JSON.parse(text) as T;
				}

				// Don't retry 4xx errors
				if (response.status >= 400 && response.status < 500) {
					await this.handleErrorResponse(response, url);
				}

				// 5xx — eligible for retry
				lastError = await this.buildError(response, url);
			} catch (err) {
				// If it's already one of our errors (from handleErrorResponse), rethrow immediately
				if (isVergeError(err)) {
					throw err;
				}
				// Network error or abort — eligible for retry (except AbortError)
				if (err instanceof DOMException && err.name === 'AbortError') {
					throw err;
				}
				lastError = err;
			}
		}

		// All retries exhausted — throw last error
		if (lastError instanceof Error) {
			throw lastError;
		}
		throw new ApiError(0, url, `Request failed after ${this.retries + 1} attempts`);
	}

	/**
	 * Build a URL for raw (non-JSON) requests with simple key-value query params.
	 */
	private buildRawUrl(path: string, queryParams?: Record<string, string>): string {
		const base = `${this.baseUrl}${API_BASE_PATH}${path}`;
		if (!queryParams) return base;

		const params = new URLSearchParams(queryParams);
		const qs = params.toString();
		return qs ? `${base}?${qs}` : base;
	}

	/**
	 * Build the full URL for a request, including query parameters.
	 */
	private buildUrl(path: string, params?: ListOptions, absolute = false): string {
		const base = absolute ? `${this.baseUrl}${path}` : `${this.baseUrl}${API_BASE_PATH}${path}`;

		if (!params) return base;

		const searchParams = this.buildQueryParams(params);
		const qs = searchParams.toString();
		return qs ? `${base}?${qs}` : base;
	}

	/**
	 * Serialize {@link ListOptions} to URL query parameters.
	 * Skips undefined values. Joins `fields` arrays with commas.
	 */
	private buildQueryParams(options: ListOptions): URLSearchParams {
		const params = new URLSearchParams();

		if (options.filter !== undefined) {
			params.set('filter', options.filter);
		}
		if (options.fields !== undefined) {
			const fields = Array.isArray(options.fields) ? options.fields.join(',') : options.fields;
			params.set('fields', fields);
		}
		if (options.sort !== undefined) {
			params.set('sort', options.sort);
		}
		if (options.limit !== undefined) {
			params.set('limit', String(options.limit));
		}
		if (options.offset !== undefined) {
			params.set('offset', String(options.offset));
		}

		return params;
	}

	/**
	 * Build request headers, including authentication.
	 * Omits Content-Type for GET requests on absolute paths (no body).
	 */
	private buildHeaders(method: string, absolute: boolean): Record<string, string> {
		const headers: Record<string, string> = {
			Authorization: this.authHeader,
			Accept: 'application/json',
			'X-JSON-Non-Compact': '1',
		};
		if (!isBrowser) {
			headers['User-Agent'] = `tsvergeos/${SDK_VERSION}`;
		}

		// Only set Content-Type for methods that send a body
		if (!absolute || (method !== 'GET' && method !== 'DELETE')) {
			headers['Content-Type'] = 'application/json';
		}

		return headers;
	}

	/**
	 * Build a combined AbortSignal from the client-level signal,
	 * the per-request signal, and the timeout.
	 */
	private buildSignal(requestSignal?: AbortSignal): AbortSignal {
		const signals: AbortSignal[] = [];

		if (this.timeout > 0) {
			signals.push(createTimeoutSignal(this.timeout));
		}
		if (this.signal) {
			signals.push(this.signal);
		}
		if (requestSignal) {
			signals.push(requestSignal);
		}

		if (signals.length === 0) {
			return createTimeoutSignal(DEFAULT_TIMEOUT);
		}
		if (signals.length === 1) {
			return signals[0] as AbortSignal;
		}
		return combineSignals(signals);
	}

	/**
	 * Handle a 4xx error response by mapping to the appropriate error class.
	 * Always throws — never returns.
	 */
	private async handleErrorResponse(response: Response, url: string): Promise<never> {
		throw await this.buildError(response, url);
	}

	/**
	 * Parse an error response and build the appropriate error instance.
	 */
	private async buildError(response: Response, url: string): Promise<Error> {
		const message = await this.extractErrorMessage(response);
		const endpoint = this.extractEndpoint(url);

		switch (response.status) {
			case 401:
			case 403:
				return new AuthError(message || `Authentication failed (${response.status})`);
			case 404: {
				const { resource, id } = this.parseResourceFromUrl(url);
				return new NotFoundError(resource, id, message || undefined);
			}
			case 409:
				return new ConflictError(endpoint, message || `Conflict (${response.status})`);
			default:
				return new ApiError(
					response.status,
					endpoint,
					message || `HTTP ${response.status} ${response.statusText}`,
				);
		}
	}

	/**
	 * Extract the error message from a response body.
	 * Attempts JSON parsing to find the `err` field; falls back to raw text.
	 */
	private async extractErrorMessage(response: Response): Promise<string> {
		try {
			const text = await response.text();
			try {
				const json = JSON.parse(text) as Record<string, unknown>;
				if (typeof json.err === 'string') {
					return json.err;
				}
			} catch {
				// Not JSON — use raw text
			}
			return text;
		} catch {
			return '';
		}
	}

	/**
	 * Extract the API endpoint path from a full URL.
	 */
	private extractEndpoint(url: string): string {
		try {
			const parsed = new URL(url);
			return parsed.pathname + parsed.search;
		} catch {
			return url;
		}
	}

	/**
	 * Parse resource type and ID from an API URL for NotFoundError context.
	 * E.g., `https://host/api/v4/vms/42` → `{ resource: 'vms', id: '42' }`
	 */
	private parseResourceFromUrl(url: string): { resource: string; id: string } {
		try {
			const parsed = new URL(url);
			const path = parsed.pathname;
			const apiPrefix = `${API_BASE_PATH}/`;

			if (path.startsWith(apiPrefix)) {
				const rest = path.slice(apiPrefix.length);
				const segments = rest.split('/').filter(Boolean);
				if (segments.length >= 2) {
					return { resource: segments[0] as string, id: segments[1] as string };
				}
				if (segments.length === 1) {
					return { resource: segments[0] as string, id: '' };
				}
			}
		} catch {
			// Fall through
		}
		return { resource: 'unknown', id: '' };
	}

	/**
	 * Promise-based sleep for retry backoff.
	 */
	private sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
