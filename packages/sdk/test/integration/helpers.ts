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
 * Returns true if at least 2 systems have credentials.
 */
export function hasMultiSiteCredentials(): boolean {
	return discoverSites().length >= 2;
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
 * Discovered site credentials from environment variables.
 */
export interface SiteEnv {
	/** Numeric suffix (1 for VERGEOS_HOST, 2 for VERGEOS_HOST_2, etc.) */
	index: number;
	host: string;
	apiKey: string;
	verifySsl: boolean;
}

/**
 * Discover all configured test sites from environment variables.
 *
 * Looks for VERGEOS_HOST + VERGEOS_API_KEY (site 1),
 * then VERGEOS_HOST_2 + VERGEOS_API_KEY_2, VERGEOS_HOST_3, etc.
 *
 * @returns Array of discovered site credentials, sorted by index
 */
export function discoverSites(): SiteEnv[] {
	const sites: SiteEnv[] = [];

	// Site 1: no suffix
	if (process.env.VERGEOS_HOST && process.env.VERGEOS_API_KEY) {
		sites.push({
			index: 1,
			host: process.env.VERGEOS_HOST,
			apiKey: process.env.VERGEOS_API_KEY,
			verifySsl: process.env.VERGEOS_VERIFY_SSL?.toLowerCase() !== 'false',
		});
	}

	// Sites 2+: numbered suffix
	for (let i = 2; i <= 10; i++) {
		const host = process.env[`VERGEOS_HOST_${i}`];
		const apiKey = process.env[`VERGEOS_API_KEY_${i}`];
		if (host && apiKey) {
			const verifySsl = process.env[`VERGEOS_VERIFY_SSL_${i}`]?.toLowerCase() !== 'false';
			sites.push({ index: i, host, apiKey, verifySsl });
		}
	}

	return sites;
}

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
 * Build SiteConfigs for all discovered test sites.
 *
 * @param namer - Function to generate a site name from its index (default: "site-1", "site-2", etc.)
 * @param tagger - Function to generate tags for a site from its index (default: ["dev"])
 */
export async function createAllSiteConfigs(
	namer?: (env: SiteEnv) => string,
	tagger?: (env: SiteEnv) => string[],
): Promise<SiteConfig[]> {
	const sites = discoverSites();
	const defaultNamer = (env: SiteEnv) => `site-${env.index}`;
	const defaultTagger = (_env: SiteEnv) => ['dev'];

	const configs: SiteConfig[] = [];
	for (const site of sites) {
		const name = (namer ?? defaultNamer)(site);
		const tags = (tagger ?? defaultTagger)(site);
		configs.push(await createSiteConfig(name, site.host, site.apiKey, site.verifySsl, tags));
	}
	return configs;
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
