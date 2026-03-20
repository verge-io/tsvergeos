import { beforeAll, expect, it } from 'vitest';
import { isNotFoundError, isValidationError } from '../../src/errors.js';
import type { SiteConfig } from '../../src/site-manager.js';
import { SiteManager } from '../../src/site-manager.js';
import { delay, skipIfNoCredentials } from './helpers.js';
import '../../src/services/vm/index.js';

/**
 * Multi-site integration test.
 *
 * Registers the same dev system under two different names to validate
 * SiteManager orchestration (site access, status tracking, removal,
 * duplicate detection). Uses a single system because dev system 2
 * may be on a different major version.
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

describeIf('SiteManager integration (multi-site)', () => {
	let manager: SiteManager;

	const site1Name = 'site-alpha';
	const site2Name = 'site-beta';

	beforeAll(async () => {
		manager = new SiteManager();

		const host = process.env.VERGEOS_HOST as string;
		const apiKey = process.env.VERGEOS_API_KEY as string;
		const verifySsl = process.env.VERGEOS_VERIFY_SSL?.toLowerCase() !== 'false';

		// Register the same system under two different names
		const config1 = await createSiteConfig(site1Name, host, apiKey, verifySsl, ['primary', 'dev']);

		await manager.addSite(config1);
		await delay();

		const config2 = await createSiteConfig(site2Name, host, apiKey, verifySsl, [
			'secondary',
			'dev',
		]);

		await manager.addSite(config2);
	}, 30_000);

	it('should register both sites successfully', () => {
		const sites = manager.sites();
		expect(sites.size).toBe(2);
		expect(sites.has(site1Name)).toBe(true);
		expect(sites.has(site2Name)).toBe(true);
	});

	it('should access each site by name and return distinct client instances', () => {
		const client1 = manager.site(site1Name);
		const client2 = manager.site(site2Name);
		expect(client1).toBeDefined();
		expect(client2).toBeDefined();
		// Different client instances even though same server
		expect(client1).not.toBe(client2);
	});

	it('should list VMs on each site', async () => {
		await delay();
		const vms1 = await manager.site(site1Name).vms.list();
		expect(Array.isArray(vms1)).toBe(true);

		await delay();
		const vms2 = await manager.site(site2Name).vms.list();
		expect(Array.isArray(vms2)).toBe(true);
	});

	it('should show both sites as connected with version strings', () => {
		const statusMap = manager.status();
		expect(statusMap.size).toBe(2);

		const status1 = statusMap.get(site1Name);
		expect(status1).toBeDefined();
		expect(status1?.connected).toBe(true);
		expect(status1?.version).toMatch(/^26\./);

		const status2 = statusMap.get(site2Name);
		expect(status2).toBeDefined();
		expect(status2?.connected).toBe(true);
		expect(status2?.version).toMatch(/^26\./);
	});

	it('should reject duplicate site names', async () => {
		const host = process.env.VERGEOS_HOST as string;
		const apiKey = process.env.VERGEOS_API_KEY as string;
		const verifySsl = process.env.VERGEOS_VERIFY_SSL?.toLowerCase() !== 'false';

		const dupeConfig = await createSiteConfig(site1Name, host, apiKey, verifySsl);

		try {
			await manager.addSite(dupeConfig);
			expect.fail('Expected ValidationError for duplicate name');
		} catch (err: unknown) {
			expect(isValidationError(err)).toBe(true);
		}
	});

	it('should remove a site and throw NotFoundError when accessing it', () => {
		manager.removeSite(site1Name);

		const sites = manager.sites();
		expect(sites.size).toBe(1);
		expect(sites.has(site1Name)).toBe(false);
		expect(sites.has(site2Name)).toBe(true);

		try {
			manager.site(site1Name);
			expect.fail('Expected NotFoundError');
		} catch (err: unknown) {
			expect(isNotFoundError(err)).toBe(true);
		}
	});

	it('should reflect removal in status map', () => {
		const statusMap = manager.status();
		expect(statusMap.size).toBe(1);
		expect(statusMap.has(site1Name)).toBe(false);
		expect(statusMap.has(site2Name)).toBe(true);
	});
});
