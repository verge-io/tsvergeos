import { describe, expect, it, type Mock, vi } from 'vitest';
import { UnsupportedVersionError } from '../../src/errors.js';
import { HttpClient } from '../../src/http.js';
import type { ClientConfig } from '../../src/types.js';
import { checkServerVersion, parseVersion } from '../../src/version.js';

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

/** Create a ClientConfig with mocked fetch. */
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

// ---------------------------------------------------------------------------
// parseVersion
// ---------------------------------------------------------------------------

describe('parseVersion', () => {
	it('parses standard version "26.1.0" → 26', () => {
		expect(parseVersion('26.1.0')).toBe(26);
	});

	it('strips "v" prefix: "v26.0.0" → 26', () => {
		expect(parseVersion('v26.0.0')).toBe(26);
	});

	it('handles pre-release suffix: "26.0.0-beta1" → 26', () => {
		expect(parseVersion('26.0.0-beta1')).toBe(26);
	});

	it('parses older version "4.2.0" → 4', () => {
		expect(parseVersion('4.2.0')).toBe(4);
	});

	it('parses single number "4" → 4', () => {
		expect(parseVersion('4')).toBe(4);
	});

	it('returns 0 for empty string', () => {
		expect(parseVersion('')).toBe(0);
	});

	it('returns 0 for bare "v" prefix', () => {
		expect(parseVersion('v')).toBe(0);
	});

	it('returns 0 for non-numeric input "abc"', () => {
		expect(parseVersion('abc')).toBe(0);
	});
});

// ---------------------------------------------------------------------------
// checkServerVersion
// ---------------------------------------------------------------------------

describe('checkServerVersion', () => {
	it('returns version string for supported 26.x version', async () => {
		const config = makeConfig();
		config.fetch.mockResolvedValueOnce(mockResponse(200, { version: '26.1.0' }));
		const http = new HttpClient(config);

		const result = await checkServerVersion(http);

		expect(result).toBe('26.1.0');
	});

	it('returns raw version string including pre-release suffix', async () => {
		const config = makeConfig();
		config.fetch.mockResolvedValueOnce(mockResponse(200, { version: '26.0.0-beta1' }));
		const http = new HttpClient(config);

		const result = await checkServerVersion(http);

		expect(result).toBe('26.0.0-beta1');
	});

	it('throws UnsupportedVersionError for version 25.x', async () => {
		const config = makeConfig();
		config.fetch.mockResolvedValueOnce(mockResponse(200, { version: '25.3.0' }));
		const http = new HttpClient(config);

		await expect(checkServerVersion(http)).rejects.toThrow(UnsupportedVersionError);
	});

	it('throws UnsupportedVersionError for version 27.x', async () => {
		const config = makeConfig();
		config.fetch.mockResolvedValueOnce(mockResponse(200, { version: '27.0.0' }));
		const http = new HttpClient(config);

		const err = await checkServerVersion(http).catch((e: unknown) => e);
		expect(err).toBeInstanceOf(UnsupportedVersionError);
		expect((err as UnsupportedVersionError).serverVersion).toBe('27.0.0');
		expect((err as UnsupportedVersionError).required).toBe('26.x');
	});

	it('fetches /version.json endpoint', async () => {
		const config = makeConfig();
		config.fetch.mockResolvedValueOnce(mockResponse(200, { version: '26.0.0' }));
		const http = new HttpClient(config);

		await checkServerVersion(http);

		const [url] = config.fetch.mock.calls[0] as [string];
		expect(url).toBe('https://verge.example.com/version.json');
	});
});
