import { describe } from 'vitest';
import { HttpClient } from '../../src/http.js';
import type { ClientConfig } from '../../src/types.js';

/**
 * Rate-limiting delay between integration test requests.
 * Prevents overwhelming the test systems.
 *
 * @param ms - Milliseconds to wait (defaults to 50)
 */
export function delay(ms = 50): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check whether integration test credentials are configured via environment variables.
 * Returns true if VERGEOS_HOST and VERGEOS_API_KEY are set.
 */
export function hasCredentials(): boolean {
	return Boolean(process.env.VERGEOS_HOST && process.env.VERGEOS_API_KEY);
}

/**
 * Skip a test suite if integration test credentials are not configured.
 * Use as: `const describeIf = skipIfNoCredentials();` then `describeIf(...)`.
 *
 * @returns `describe` if credentials are set, `describe.skip` if not
 */
export function skipIfNoCredentials(): typeof describe | typeof describe.skip {
	return hasCredentials() ? describe : describe.skip;
}

/**
 * Build a ClientConfig from environment variables.
 *
 * Expected env vars:
 * - `VERGEOS_HOST` — server URL (e.g., "https://192.168.10.75")
 * - `VERGEOS_API_KEY` — API key for authentication
 * - `VERGEOS_VERIFY_SSL` — set to "false" to disable SSL verification (optional)
 *
 * When `VERGEOS_VERIFY_SSL=false`, configures a custom fetch using undici's Agent
 * with `rejectUnauthorized: false` for self-signed certificates.
 *
 * @returns A ClientConfig ready for use with HttpClient or VergeClient
 */
export async function createClientConfig(): Promise<ClientConfig> {
	const host = process.env.VERGEOS_HOST;
	const apiKey = process.env.VERGEOS_API_KEY;

	if (!host || !apiKey) {
		throw new Error(
			'Integration test credentials not configured. Set VERGEOS_HOST and VERGEOS_API_KEY environment variables.',
		);
	}

	const verifySsl = process.env.VERGEOS_VERIFY_SSL?.toLowerCase() !== 'false';

	const config: ClientConfig = {
		host,
		apiKey,
		verifySsl,
		retries: 0, // No retries in tests for faster feedback
	};

	if (!verifySsl) {
		// Use undici Agent with rejectUnauthorized: false for self-signed certs
		const { Agent, fetch: undiciFetch } = await import('undici');
		const dispatcher = new Agent({
			connect: { rejectUnauthorized: false },
		});
		config.fetch = (input: RequestInfo | URL, init?: RequestInit) =>
			undiciFetch(
				input as Parameters<typeof undiciFetch>[0],
				{
					...init,
					dispatcher,
				} as Parameters<typeof undiciFetch>[1],
			) as unknown as Promise<Response>;
	}

	return config;
}

/**
 * Create an HttpClient configured from environment variables.
 * Convenience wrapper around {@link createClientConfig}.
 *
 * @returns An HttpClient ready for integration testing
 */
export async function createTestHttpClient(): Promise<HttpClient> {
	const config = await createClientConfig();
	return new HttpClient(config);
}
