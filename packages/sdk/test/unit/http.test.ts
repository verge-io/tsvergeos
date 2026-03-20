import { describe, expect, it, type Mock, vi } from 'vitest';
import { SDK_VERSION } from '../../src/constants.js';
import { ApiError, AuthError, ConflictError, NotFoundError } from '../../src/errors.js';
import { HttpClient } from '../../src/http.js';
import type { ClientConfig } from '../../src/types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create a mock Response object. */
function mockResponse(status: number, body: unknown, statusText = ''): Response {
	const text = typeof body === 'string' ? body : JSON.stringify(body);
	return {
		ok: status >= 200 && status < 300,
		status,
		statusText,
		text: () => Promise.resolve(text),
		json: () => Promise.resolve(typeof body === 'string' ? JSON.parse(body) : body),
		headers: new Headers(),
	} as Response;
}

/** Create a base ClientConfig with mocked fetch. */
function makeConfig(overrides: Partial<ClientConfig> = {}): ClientConfig & { fetch: Mock } {
	const fetchMock = vi.fn<typeof globalThis.fetch>();
	return {
		host: 'https://verge.example.com',
		apiKey: 'test-api-key',
		fetch: fetchMock,
		timeout: 0, // disable timeout signals in tests
		retries: 0, // no retries by default
		...overrides,
	};
}

// ---------------------------------------------------------------------------
// GET with correct URL and auth headers
// ---------------------------------------------------------------------------

describe('HttpClient', () => {
	describe('GET requests', () => {
		it('sends GET with correct URL and Bearer auth header', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(200, [{ $key: 1 }]));
			const http = new HttpClient(config);

			const result = await http.get<unknown[]>('/vms');

			expect(config.fetch).toHaveBeenCalledOnce();
			const [url, init] = config.fetch.mock.calls[0] as [string, RequestInit];
			expect(url).toBe('https://verge.example.com/api/v4/vms');
			expect(init.method).toBe('GET');
			expect((init.headers as Record<string, string>).Authorization).toBe('Bearer test-api-key');
			expect((init.headers as Record<string, string>).Accept).toBe('application/json');
			expect((init.headers as Record<string, string>)['User-Agent']).toBe(
				`tsvergeos/${SDK_VERSION}`,
			);
			expect((init.headers as Record<string, string>)['X-JSON-Non-Compact']).toBe('1');
			expect(result).toEqual([{ $key: 1 }]);
		});

		it('sends GET with Basic auth header when using username/password', async () => {
			const config = makeConfig({
				apiKey: undefined,
				username: 'admin',
				password: 'secret',
			});
			config.fetch.mockResolvedValueOnce(mockResponse(200, { $key: 1 }));
			const http = new HttpClient(config);

			await http.get('/vms/1');

			const [, init] = config.fetch.mock.calls[0] as [string, RequestInit];
			const expected = `Basic ${btoa('admin:secret')}`;
			expect((init.headers as Record<string, string>).Authorization).toBe(expected);
		});
	});

	// ---------------------------------------------------------------------------
	// POST with JSON body
	// ---------------------------------------------------------------------------

	describe('POST requests', () => {
		it('sends POST with JSON body and Content-Type header', async () => {
			const config = makeConfig();
			const body = { name: 'test-vm', ram: 512 };
			config.fetch.mockResolvedValueOnce(mockResponse(200, { $key: 42 }));
			const http = new HttpClient(config);

			const result = await http.post('/vms', { body });

			const [url, init] = config.fetch.mock.calls[0] as [string, RequestInit];
			expect(url).toBe('https://verge.example.com/api/v4/vms');
			expect(init.method).toBe('POST');
			expect(init.body).toBe(JSON.stringify(body));
			expect((init.headers as Record<string, string>)['Content-Type']).toBe('application/json');
			expect(result).toEqual({ $key: 42 });
		});
	});

	// ---------------------------------------------------------------------------
	// PUT with JSON body
	// ---------------------------------------------------------------------------

	describe('PUT requests', () => {
		it('sends PUT with JSON body', async () => {
			const config = makeConfig();
			const body = { name: 'updated-vm' };
			config.fetch.mockResolvedValueOnce(mockResponse(200, { $key: 1 }));
			const http = new HttpClient(config);

			await http.put('/vms/1', { body });

			const [url, init] = config.fetch.mock.calls[0] as [string, RequestInit];
			expect(url).toBe('https://verge.example.com/api/v4/vms/1');
			expect(init.method).toBe('PUT');
			expect(init.body).toBe(JSON.stringify(body));
		});
	});

	// ---------------------------------------------------------------------------
	// DELETE returns void
	// ---------------------------------------------------------------------------

	describe('DELETE requests', () => {
		it('sends DELETE and returns void', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(200, ''));
			const http = new HttpClient(config);

			const result = await http.del('/vms/1');

			const [url, init] = config.fetch.mock.calls[0] as [string, RequestInit];
			expect(url).toBe('https://verge.example.com/api/v4/vms/1');
			expect(init.method).toBe('DELETE');
			expect(result).toBeUndefined();
		});
	});

	// ---------------------------------------------------------------------------
	// Query param serialization from ListOptions
	// ---------------------------------------------------------------------------

	describe('query param serialization', () => {
		it('serializes ListOptions to query params', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(200, []));
			const http = new HttpClient(config);

			await http.get('/vms', {
				params: {
					filter: "name eq 'test'",
					fields: 'name,$key',
					sort: '-name',
					limit: 10,
					offset: 20,
				},
			});

			const [url] = config.fetch.mock.calls[0] as [string];
			const parsed = new URL(url);
			expect(parsed.searchParams.get('filter')).toBe("name eq 'test'");
			expect(parsed.searchParams.get('fields')).toBe('name,$key');
			expect(parsed.searchParams.get('sort')).toBe('-name');
			expect(parsed.searchParams.get('limit')).toBe('10');
			expect(parsed.searchParams.get('offset')).toBe('20');
		});

		it('joins fields array with commas', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(200, []));
			const http = new HttpClient(config);

			await http.get('/vms', {
				params: { fields: ['name', '$key', 'status'] },
			});

			const [url] = config.fetch.mock.calls[0] as [string];
			const parsed = new URL(url);
			expect(parsed.searchParams.get('fields')).toBe('name,$key,status');
		});

		it('omits undefined ListOptions fields from query params', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(200, []));
			const http = new HttpClient(config);

			await http.get('/vms', { params: { filter: "name eq 'x'" } });

			const [url] = config.fetch.mock.calls[0] as [string];
			const parsed = new URL(url);
			expect(parsed.searchParams.get('filter')).toBe("name eq 'x'");
			expect(parsed.searchParams.has('fields')).toBe(false);
			expect(parsed.searchParams.has('sort')).toBe(false);
			expect(parsed.searchParams.has('limit')).toBe(false);
			expect(parsed.searchParams.has('offset')).toBe(false);
		});

		it('omits query string entirely when no params provided', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(200, []));
			const http = new HttpClient(config);

			await http.get('/vms');

			const [url] = config.fetch.mock.calls[0] as [string];
			expect(url).toBe('https://verge.example.com/api/v4/vms');
		});
	});

	// ---------------------------------------------------------------------------
	// Retry on 5xx
	// ---------------------------------------------------------------------------

	describe('retry behavior', () => {
		it('retries on 500 and calls fetch retries+1 times', async () => {
			const config = makeConfig({ retries: 2, retryBackoff: 1 }); // 1ms backoff for fast tests
			config.fetch
				.mockResolvedValueOnce(mockResponse(500, { err: 'server error' }, 'Internal Server Error'))
				.mockResolvedValueOnce(mockResponse(500, { err: 'server error' }, 'Internal Server Error'))
				.mockResolvedValueOnce(mockResponse(200, { $key: 1 }));
			const http = new HttpClient(config);

			const result = await http.get('/vms/1');

			expect(config.fetch).toHaveBeenCalledTimes(3);
			expect(result).toEqual({ $key: 1 });
		});

		it('throws after all retries exhausted on 5xx', async () => {
			const config = makeConfig({ retries: 1, retryBackoff: 1 });
			config.fetch
				.mockResolvedValueOnce(mockResponse(500, { err: 'fail' }, 'Internal Server Error'))
				.mockResolvedValueOnce(mockResponse(502, { err: 'bad gateway' }, 'Bad Gateway'));
			const http = new HttpClient(config);

			await expect(http.get('/vms')).rejects.toThrow(ApiError);
			expect(config.fetch).toHaveBeenCalledTimes(2);
		});

		it('does not retry on 400', async () => {
			const config = makeConfig({ retries: 2, retryBackoff: 1 });
			config.fetch.mockResolvedValueOnce(mockResponse(400, { err: 'bad request' }));
			const http = new HttpClient(config);

			await expect(http.get('/vms')).rejects.toThrow(ApiError);
			expect(config.fetch).toHaveBeenCalledOnce();
		});

		it('does not retry on 404', async () => {
			const config = makeConfig({ retries: 2, retryBackoff: 1 });
			config.fetch.mockResolvedValueOnce(mockResponse(404, { err: 'not found' }));
			const http = new HttpClient(config);

			await expect(http.get('/vms/999')).rejects.toThrow(NotFoundError);
			expect(config.fetch).toHaveBeenCalledOnce();
		});

		it('retries on network error (fetch throws)', async () => {
			const config = makeConfig({ retries: 1, retryBackoff: 1 });
			config.fetch
				.mockRejectedValueOnce(new TypeError('fetch failed'))
				.mockResolvedValueOnce(mockResponse(200, { $key: 1 }));
			const http = new HttpClient(config);

			const result = await http.get('/vms/1');

			expect(config.fetch).toHaveBeenCalledTimes(2);
			expect(result).toEqual({ $key: 1 });
		});
	});

	// ---------------------------------------------------------------------------
	// Error mapping
	// ---------------------------------------------------------------------------

	describe('error mapping', () => {
		it('maps 401 to AuthError', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(401, { err: 'unauthorized' }));
			const http = new HttpClient(config);

			const err = await http.get('/vms').catch((e: unknown) => e);
			expect(err).toBeInstanceOf(AuthError);
			expect((err as AuthError).message).toBe('unauthorized');
		});

		it('maps 403 to AuthError', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(403, { err: 'forbidden' }));
			const http = new HttpClient(config);

			const err = await http.get('/vms').catch((e: unknown) => e);
			expect(err).toBeInstanceOf(AuthError);
			expect((err as AuthError).message).toBe('forbidden');
		});

		it('maps 404 to NotFoundError with resource and id', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(404, { err: 'not found' }));
			const http = new HttpClient(config);

			const err = await http.get('/vms/42').catch((e: unknown) => e);
			expect(err).toBeInstanceOf(NotFoundError);
			expect((err as NotFoundError).resource).toBe('vms');
			expect((err as NotFoundError).id).toBe('42');
		});

		it('maps 409 to ConflictError', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(409, { err: 'duplicate name' }));
			const http = new HttpClient(config);

			const err = await http.get('/vms').catch((e: unknown) => e);
			expect(err).toBeInstanceOf(ConflictError);
			expect((err as ConflictError).message).toBe('duplicate name');
		});

		it('maps 500 to ApiError', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(
				mockResponse(500, { err: 'internal error' }, 'Internal Server Error'),
			);
			const http = new HttpClient(config);

			const err = await http.get('/vms').catch((e: unknown) => e);
			expect(err).toBeInstanceOf(ApiError);
			expect((err as ApiError).statusCode).toBe(500);
			expect((err as ApiError).message).toBe('internal error');
		});
	});

	// ---------------------------------------------------------------------------
	// Error body parsing
	// ---------------------------------------------------------------------------

	describe('error message extraction', () => {
		it('uses err field from JSON error body', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(400, { err: 'field name is required' }));
			const http = new HttpClient(config);

			const err = await http.get('/vms').catch((e: unknown) => e);
			expect((err as ApiError).message).toBe('field name is required');
		});

		it('uses raw text when error body is not JSON', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(500, 'plain text error'));
			const http = new HttpClient(config);

			const err = await http.get('/vms').catch((e: unknown) => e);
			expect((err as ApiError).message).toBe('plain text error');
		});

		it('uses fallback message when body has no err field', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(401, { other: 'data' }));
			const http = new HttpClient(config);

			const err = await http.get('/vms').catch((e: unknown) => e);
			expect(err).toBeInstanceOf(AuthError);
			// Falls back to JSON text since no `err` field
			expect((err as AuthError).message).toContain('other');
		});
	});

	// ---------------------------------------------------------------------------
	// AbortSignal pass-through
	// ---------------------------------------------------------------------------

	describe('AbortSignal', () => {
		it('passes AbortSignal through to fetch', async () => {
			const controller = new AbortController();
			const config = makeConfig({ signal: controller.signal });
			config.fetch.mockResolvedValueOnce(mockResponse(200, []));
			const http = new HttpClient(config);

			await http.get('/vms');

			const [, init] = config.fetch.mock.calls[0] as [string, RequestInit];
			// The signal should exist (either the original or combined via AbortSignal.any)
			expect(init.signal).toBeDefined();
		});

		it('does not retry on AbortError', async () => {
			const config = makeConfig({ retries: 2, retryBackoff: 1 });
			const abortError = new DOMException('The operation was aborted.', 'AbortError');
			config.fetch.mockRejectedValueOnce(abortError);
			const http = new HttpClient(config);

			await expect(http.get('/vms')).rejects.toThrow('The operation was aborted.');
			expect(config.fetch).toHaveBeenCalledOnce();
		});
	});

	// ---------------------------------------------------------------------------
	// getAbsolute
	// ---------------------------------------------------------------------------

	describe('getAbsolute', () => {
		it('uses path directly without API_BASE_PATH prefix', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(200, { version: '26.1.0' }));
			const http = new HttpClient(config);

			const result = await http.getAbsolute<{ version: string }>('/version.json');

			const [url] = config.fetch.mock.calls[0] as [string];
			expect(url).toBe('https://verge.example.com/version.json');
			expect(result).toEqual({ version: '26.1.0' });
		});

		it('omits Content-Type header for GET on absolute path', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(200, {}));
			const http = new HttpClient(config);

			await http.getAbsolute('/version.json');

			const [, init] = config.fetch.mock.calls[0] as [string, RequestInit];
			const headers = init.headers as Record<string, string>;
			expect(headers['Content-Type']).toBeUndefined();
			// But still includes auth and accept
			expect(headers.Authorization).toBe('Bearer test-api-key');
			expect(headers.Accept).toBe('application/json');
		});
	});

	// ---------------------------------------------------------------------------
	// URL building edge cases
	// ---------------------------------------------------------------------------

	describe('URL building', () => {
		it('strips trailing slash from host', async () => {
			const config = makeConfig({ host: 'https://verge.example.com/' });
			config.fetch.mockResolvedValueOnce(mockResponse(200, []));
			const http = new HttpClient(config);

			await http.get('/vms');

			const [url] = config.fetch.mock.calls[0] as [string];
			expect(url).toBe('https://verge.example.com/api/v4/vms');
		});

		it('prepends https:// when host has no protocol', async () => {
			const config = makeConfig({ host: '192.168.1.100' });
			config.fetch.mockResolvedValueOnce(mockResponse(200, []));
			const http = new HttpClient(config);

			await http.get('/vms');

			const [url] = config.fetch.mock.calls[0] as [string];
			expect(url).toBe('https://192.168.1.100/api/v4/vms');
		});

		it('preserves http:// when explicitly provided', async () => {
			const config = makeConfig({ host: 'http://localhost:8080' });
			config.fetch.mockResolvedValueOnce(mockResponse(200, []));
			const http = new HttpClient(config);

			await http.get('/vms');

			const [url] = config.fetch.mock.calls[0] as [string];
			expect(url).toBe('http://localhost:8080/api/v4/vms');
		});
	});

	// ---------------------------------------------------------------------------
	// Constructor validation
	// ---------------------------------------------------------------------------

	describe('constructor', () => {
		it('throws when no auth is provided', () => {
			expect(() => new HttpClient({ host: 'https://example.com' } as ClientConfig)).toThrow(
				'ClientConfig must include either apiKey or username+password',
			);
		});
	});

	// ---------------------------------------------------------------------------
	// Empty response handling
	// ---------------------------------------------------------------------------

	describe('response handling', () => {
		it('returns undefined for empty response body', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(200, ''));
			const http = new HttpClient(config);

			const result = await http.get('/vms/1');
			expect(result).toBeUndefined();
		});
	});
});
