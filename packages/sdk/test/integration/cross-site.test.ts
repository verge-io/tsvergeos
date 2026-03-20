import { beforeAll, expect, it } from 'vitest';
import type { SiteConfig } from '../../src/site-manager.js';
import { SiteManager } from '../../src/site-manager.js';
import { delay, skipIfNoCredentials } from './helpers.js';
import '../../src/services/vm/index.js';

/**
 * CrossSiteReadProxy integration test.
 *
 * Registers the same dev system under two different names to validate
 * cross-site fan-out (all and tagged). Uses a single system because
 * dev system 2 may be on a different major version.
 *
 * Env vars: VERGEOS_HOST, VERGEOS_API_KEY, VERGEOS_VERIFY_SSL
 */

const describeIf = skipIfNoCredentials();

async function createSiteConfig(
	name: string,
	host: string,
	apiKey: string,
	verifySsl: boolean,
	tags?: string[],
): Promise<SiteConfig> {
	const config: SiteConfig = {
		name,
		host,
		apiKey,
		verifySsl,
		retries: 0,
		tags,
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

describeIf('CrossSiteReadProxy integration (multi-site fan-out)', () => {
	let manager: SiteManager;

	const site1Name = 'site-alpha';
	const site2Name = 'site-beta';

	beforeAll(async () => {
		manager = new SiteManager();

		const host = process.env.VERGEOS_HOST as string;
		const apiKey = process.env.VERGEOS_API_KEY as string;
		const verifySsl = process.env.VERGEOS_VERIFY_SSL?.toLowerCase() !== 'false';

		const config1 = await createSiteConfig(site1Name, host, apiKey, verifySsl, ['dev', 'primary']);
		await manager.addSite(config1);
		await delay();

		const config2 = await createSiteConfig(site2Name, host, apiKey, verifySsl, [
			'dev',
			'secondary',
		]);
		await manager.addSite(config2);
	}, 30_000);

	it('manager.all.vms.list() returns VMs from both sites', async () => {
		await delay();
		const result = await (
			manager.all as unknown as Record<
				string,
				{
					list: () => Promise<{
						data: Array<{ site: string; resource: unknown }>;
						errors: unknown[];
					}>;
				}
			>
		).vms.list();

		// Both sites should return results (same system, so same VMs)
		expect(result.errors).toHaveLength(0);
		expect(result.data.length).toBeGreaterThan(0);

		// Verify each entry is tagged with a site name
		const siteNames = new Set(result.data.map((d) => d.site));
		expect(siteNames.has(site1Name)).toBe(true);
		expect(siteNames.has(site2Name)).toBe(true);

		// Each entry has a resource with expected VM shape
		for (const entry of result.data) {
			expect(entry.resource).toBeDefined();
			expect(entry.site).toBeTruthy();
		}
	});

	it('manager.tagged("dev").vms.list() returns same results as all', async () => {
		await delay();
		const allResult = await (
			manager.all as unknown as Record<
				string,
				{
					list: () => Promise<{
						data: Array<{ site: string; resource: unknown }>;
						errors: unknown[];
					}>;
				}
			>
		).vms.list();

		await delay();
		const taggedResult = await (
			manager.tagged('dev') as unknown as Record<
				string,
				{
					list: () => Promise<{
						data: Array<{ site: string; resource: unknown }>;
						errors: unknown[];
					}>;
				}
			>
		).vms.list();

		// Both sites have 'dev' tag, so results should match
		expect(taggedResult.errors).toHaveLength(0);
		expect(taggedResult.data.length).toBe(allResult.data.length);

		const taggedSites = new Set(taggedResult.data.map((d) => d.site));
		expect(taggedSites.has(site1Name)).toBe(true);
		expect(taggedSites.has(site2Name)).toBe(true);
	});

	it('manager.tagged("primary").vms.list() returns only matching site', async () => {
		await delay();
		const result = await (
			manager.tagged('primary') as unknown as Record<
				string,
				{
					list: () => Promise<{
						data: Array<{ site: string; resource: unknown }>;
						errors: unknown[];
					}>;
				}
			>
		).vms.list();

		expect(result.errors).toHaveLength(0);
		expect(result.data.length).toBeGreaterThan(0);

		// Only site-alpha has the 'primary' tag
		const siteNames = new Set(result.data.map((d) => d.site));
		expect(siteNames.has(site1Name)).toBe(true);
		expect(siteNames.has(site2Name)).toBe(false);
	});

	it('status shows both sites as connected after fan-out', async () => {
		// The previous tests already triggered fan-out, so status should be updated
		const statusMap = manager.status();

		const status1 = statusMap.get(site1Name);
		expect(status1).toBeDefined();
		expect(status1?.connected).toBe(true);
		expect(status1?.lastError).toBeUndefined();

		const status2 = statusMap.get(site2Name);
		expect(status2).toBeDefined();
		expect(status2?.connected).toBe(true);
		expect(status2?.lastError).toBeUndefined();
	});
});
