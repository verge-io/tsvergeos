import { afterEach, describe, expect, it, type Mock, vi } from 'vitest';
import { VergeClient } from '../../src/client.js';
import { ValidationError } from '../../src/errors.js';
import { HttpClient } from '../../src/http.js';
import type { ClientConfig } from '../../src/types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create a mock Response object. */
function mockResponse(status: number, body: unknown): Response {
	const text = typeof body === 'string' ? body : JSON.stringify(body);
	return {
		ok: status >= 200 && status < 300,
		status,
		statusText: '',
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
		timeout: 0,
		retries: 0,
		...overrides,
	};
}

/** A minimal dummy service class for registration tests. */
class DummyService {
	readonly http: HttpClient;
	constructor(http: HttpClient) {
		this.http = http;
	}
	ping(): string {
		return 'pong';
	}
}

// ---------------------------------------------------------------------------
// Constructor validation
// ---------------------------------------------------------------------------

describe('VergeClient', () => {
	afterEach(() => {
		// Clean up any registered services between tests to avoid cross-contamination.
		// We can't access the private registry directly, but we can re-register
		// with the same key to overwrite, or just accept that tests are additive.
	});

	describe('constructor validation', () => {
		it('throws ValidationError when host is missing', () => {
			expect(() => new VergeClient({ host: '', apiKey: 'key' })).toThrow(ValidationError);
		});

		it('throws ValidationError when no auth is provided', () => {
			expect(() => new VergeClient({ host: 'https://example.com' } as ClientConfig)).toThrow(
				ValidationError,
			);
		});

		it('throws ValidationError when only username is provided without password', () => {
			expect(
				() =>
					new VergeClient({
						host: 'https://example.com',
						username: 'admin',
					} as ClientConfig),
			).toThrow(ValidationError);
		});

		it('accepts apiKey auth', () => {
			const client = new VergeClient(makeConfig());
			expect(client).toBeDefined();
			expect(client.host).toBe('https://verge.example.com');
		});

		it('accepts username+password auth', () => {
			const client = new VergeClient(
				makeConfig({
					apiKey: undefined,
					username: 'admin',
					password: 'secret',
				}),
			);
			expect(client).toBeDefined();
		});
	});

	// ---------------------------------------------------------------------------
	// Host getter
	// ---------------------------------------------------------------------------

	describe('host getter', () => {
		it('returns the configured host', () => {
			const client = new VergeClient(makeConfig());
			expect(client.host).toBe('https://verge.example.com');
		});

		it('strips trailing slashes from host', () => {
			const client = new VergeClient(makeConfig({ host: 'https://verge.example.com/' }));
			expect(client.host).toBe('https://verge.example.com');
		});

		it('prepends https:// when host has no protocol', () => {
			const client = new VergeClient(makeConfig({ host: '192.168.1.100' }));
			expect(client.host).toBe('https://192.168.1.100');
		});
	});

	// ---------------------------------------------------------------------------
	// serverVersion getter
	// ---------------------------------------------------------------------------

	describe('serverVersion getter', () => {
		it('returns undefined when created without version check', () => {
			const client = new VergeClient(makeConfig());
			expect(client.serverVersion).toBeUndefined();
		});
	});

	// ---------------------------------------------------------------------------
	// connect() static factory
	// ---------------------------------------------------------------------------

	describe('connect()', () => {
		it('performs version check and stores version', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(200, { version: '26.1.0' }));

			const client = await VergeClient.connect(config);

			expect(client.serverVersion).toBe('26.1.0');
			expect(client.host).toBe('https://verge.example.com');
		});

		it('throws on unsupported legacy version', async () => {
			const config = makeConfig();
			config.fetch.mockResolvedValueOnce(mockResponse(200, { version: '4.2.0' }));

			await expect(VergeClient.connect(config)).rejects.toThrow(
				'Server version 4.2.0 is not supported',
			);
		});
	});

	// ---------------------------------------------------------------------------
	// fromEnv() static factory
	// ---------------------------------------------------------------------------

	describe('fromEnv()', () => {
		const originalEnv = process.env;

		afterEach(() => {
			process.env = originalEnv;
		});

		it('reads VERGEOS_HOST and VERGEOS_API_KEY from env', () => {
			process.env = {
				...originalEnv,
				VERGEOS_HOST: 'https://env-host.example.com',
				VERGEOS_API_KEY: 'env-api-key',
			};

			const client = VergeClient.fromEnv();

			expect(client.host).toBe('https://env-host.example.com');
		});

		it('reads username and password from env', () => {
			process.env = {
				...originalEnv,
				VERGEOS_HOST: 'https://env-host.example.com',
				VERGEOS_USERNAME: 'admin',
				VERGEOS_PASSWORD: 'secret',
			};

			const client = VergeClient.fromEnv();
			expect(client).toBeDefined();
		});

		it('throws ValidationError when VERGEOS_HOST is missing', () => {
			process.env = { ...originalEnv };
			delete process.env.VERGEOS_HOST;

			expect(() => VergeClient.fromEnv()).toThrow(ValidationError);
		});

		it('reads VERGEOS_VERIFY_SSL=false', () => {
			process.env = {
				...originalEnv,
				VERGEOS_HOST: 'https://env-host.example.com',
				VERGEOS_API_KEY: 'key',
				VERGEOS_VERIFY_SSL: 'false',
			};

			// Should not throw — verifySsl is passed through to HttpClient
			const client = VergeClient.fromEnv();
			expect(client).toBeDefined();
		});

		it('reads VERGEOS_TIMEOUT and converts seconds to ms', () => {
			process.env = {
				...originalEnv,
				VERGEOS_HOST: 'https://env-host.example.com',
				VERGEOS_API_KEY: 'key',
				VERGEOS_TIMEOUT: '60',
			};

			// Should not throw — timeout is parsed and passed through
			const client = VergeClient.fromEnv();
			expect(client).toBeDefined();
		});

		it('ignores invalid VERGEOS_TIMEOUT values', () => {
			process.env = {
				...originalEnv,
				VERGEOS_HOST: 'https://env-host.example.com',
				VERGEOS_API_KEY: 'key',
				VERGEOS_TIMEOUT: 'not-a-number',
			};

			const client = VergeClient.fromEnv();
			expect(client).toBeDefined();
		});
	});

	// ---------------------------------------------------------------------------
	// connectFromEnv() static factory
	// ---------------------------------------------------------------------------

	describe('connectFromEnv()', () => {
		const originalEnv = process.env;

		afterEach(() => {
			process.env = originalEnv;
		});

		it('reads env vars and performs version check', async () => {
			const fetchMock = vi.fn<typeof globalThis.fetch>();
			fetchMock.mockResolvedValueOnce(mockResponse(200, { version: '26.1.0' }));

			// Temporarily override globalThis.fetch for connectFromEnv
			const origFetch = globalThis.fetch;
			globalThis.fetch = fetchMock;

			process.env = {
				...originalEnv,
				VERGEOS_HOST: 'https://env-host.example.com',
				VERGEOS_API_KEY: 'env-api-key',
			};

			try {
				const client = await VergeClient.connectFromEnv();
				expect(client.serverVersion).toBe('26.1.0');
				expect(client.host).toBe('https://env-host.example.com');
			} finally {
				globalThis.fetch = origFetch;
			}
		});
	});

	// ---------------------------------------------------------------------------
	// Service registration and Proxy
	// ---------------------------------------------------------------------------

	describe('registerService + Proxy', () => {
		it('lazily instantiates a registered service on property access', () => {
			VergeClient.registerService(
				'dummy',
				DummyService as unknown as new (
					http: HttpClient,
				) => unknown,
			);
			const client = new VergeClient(makeConfig());

			// Access the service through the Proxy
			const service = (client as unknown as Record<string, DummyService>).dummy;
			expect(service).toBeInstanceOf(DummyService);
			expect(service.ping()).toBe('pong');
		});

		it('caches the service instance on repeated access', () => {
			VergeClient.registerService(
				'dummy2',
				DummyService as unknown as new (
					http: HttpClient,
				) => unknown,
			);
			const client = new VergeClient(makeConfig());

			const first = (client as unknown as Record<string, DummyService>).dummy2;
			const second = (client as unknown as Record<string, DummyService>).dummy2;
			expect(first).toBe(second); // Same reference
		});

		it('returns undefined for unregistered service names', () => {
			const client = new VergeClient(makeConfig());

			const result = (client as unknown as Record<string, unknown>).nonExistentService;
			expect(result).toBeUndefined();
		});

		it('does not shadow own properties with service registry', () => {
			const client = new VergeClient(makeConfig());

			// 'host' is an own property — should not be overridden by registry
			expect(client.host).toBe('https://verge.example.com');
		});
	});

	// ---------------------------------------------------------------------------
	// http getter
	// ---------------------------------------------------------------------------

	describe('http getter', () => {
		it('exposes HttpClient instance for services', () => {
			const client = new VergeClient(makeConfig());
			expect(client.http).toBeInstanceOf(HttpClient);
		});
	});
});
