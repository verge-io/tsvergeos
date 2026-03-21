import { describe } from 'vitest';
import { HttpClient } from '../../src/http.js';
import type { SiteConfig } from '../../src/site-manager.js';
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
 * Check whether single-site integration test credentials are configured.
 * Returns true if VERGEOS_HOST and VERGEOS_API_KEY are set.
 */
export function hasCredentials(): boolean {
	return Boolean(process.env.VERGEOS_HOST && process.env.VERGEOS_API_KEY);
}

/**
 * Check whether multi-site integration test credentials are configured.
 * Returns true if both system 1 and system 2 env vars are set.
 */
export function hasMultiSiteCredentials(): boolean {
	return hasCredentials() && Boolean(process.env.VERGEOS_HOST_2 && process.env.VERGEOS_API_KEY_2);
}

/**
 * Skip a test suite if single-site credentials are not configured.
 * Use as: `const describeIf = skipIfNoCredentials();` then `describeIf(...)`.
 */
export function skipIfNoCredentials(): typeof describe | typeof describe.skip {
	return hasCredentials() ? describe : describe.skip;
}

/**
 * Skip a test suite if multi-site credentials are not configured.
 * Use as: `const describeIf = skipIfNoMultiSiteCredentials();` then `describeIf(...)`.
 */
export function skipIfNoMultiSiteCredentials(): typeof describe | typeof describe.skip {
	return hasMultiSiteCredentials() ? describe : describe.skip;
}

/**
 * Build a ClientConfig from environment variables.
 *
 * Expected env vars:
 * - `VERGEOS_HOST` — server URL (e.g., "https://verge.example.com")
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

	return buildConfig(host, apiKey, verifySsl);
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

// ─── Multi-Site Helpers ──────────────────────────────────────────────────────

/**
 * Build a SiteConfig for a named site with custom fetch for self-signed certs.
 *
 * @param name - Unique site name for SiteManager registration
 * @param host - Server URL
 * @param apiKey - API key
 * @param verifySsl - Whether to verify SSL certificates
 * @param tags - Optional tags for grouping
 */
export async function createSiteConfig(
	name: string,
	host: string,
	apiKey: string,
	verifySsl: boolean,
	tags?: string[],
): Promise<SiteConfig> {
	const base = await buildConfig(host, apiKey, verifySsl);
	return { ...base, name, tags };
}

/**
 * Build a SiteConfig for dev system 1 from VERGEOS_HOST env vars.
 *
 * @param name - Site name (e.g., "dev-local")
 * @param tags - Optional tags
 */
export async function createSite1Config(name: string, tags?: string[]): Promise<SiteConfig> {
	const host = process.env.VERGEOS_HOST;
	const apiKey = process.env.VERGEOS_API_KEY;
	if (!host || !apiKey) {
		throw new Error('Site 1 credentials not configured. Set VERGEOS_HOST and VERGEOS_API_KEY.');
	}
	const verifySsl = process.env.VERGEOS_VERIFY_SSL?.toLowerCase() !== 'false';
	return createSiteConfig(name, host, apiKey, verifySsl, tags);
}

/**
 * Build a SiteConfig for dev system 2 from VERGEOS_HOST_2 env vars.
 *
 * @param name - Site name (e.g., "dev-public")
 * @param tags - Optional tags
 */
export async function createSite2Config(name: string, tags?: string[]): Promise<SiteConfig> {
	const host = process.env.VERGEOS_HOST_2;
	const apiKey = process.env.VERGEOS_API_KEY_2;
	if (!host || !apiKey) {
		throw new Error('Site 2 credentials not configured. Set VERGEOS_HOST_2 and VERGEOS_API_KEY_2.');
	}
	// Site 2 has a valid cert — always verify
	return createSiteConfig(name, host, apiKey, true, tags);
}

// ─── Internal ────────────────────────────────────────────────────────────────

/**
 * Build a ClientConfig with optional custom fetch for self-signed certs.
 */
async function buildConfig(
	host: string,
	apiKey: string,
	verifySsl: boolean,
): Promise<ClientConfig> {
	const config: ClientConfig = {
		host,
		apiKey,
		verifySsl,
		retries: 0,
	};

	if (!verifySsl) {
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
