import { beforeAll, expect, it } from 'vitest';
import type { CrossSiteResult } from '../../src/cross-site.js';
import { SiteManager } from '../../src/site-manager.js';
import type { Resource } from '../../src/types.js';
import {
	createAllSiteConfigs,
	delay,
	discoverSites,
	skipIfNoMultiSiteCredentials,
} from './helpers.js';
import '../../src/services/vm/index.js';
import '../../src/services/network/index.js';
import '../../src/services/alarm/index.js';

/**
 * CrossSiteReadProxy integration test using all discovered VergeOS systems.
 *
 * Dynamically discovers all VERGEOS_HOST_N env vars and fans out queries
 * across every configured system. Validates cross-site aggregation against
 * real, distinct infrastructure.
 */

const describeIf = skipIfNoMultiSiteCredentials();
const siteCount = discoverSites().length;

describeIf(`CrossSiteReadProxy integration (${siteCount} real systems)`, () => {
	let manager: SiteManager;
	const siteNames: string[] = [];

	beforeAll(async () => {
		manager = new SiteManager();

		// Tag site-1 as "first", all sites as "dev"
		const configs = await createAllSiteConfigs(
			(env) => `site-${env.index}`,
			(env) => (env.index === 1 ? ['first', 'dev'] : ['dev']),
		);

		for (const config of configs) {
			await manager.addSite(config);
			siteNames.push(config.name);
			await delay();
		}
	}, 60_000);

	// ─── Helpers ──────────────────────────────────────────────────────────────

	async function fanOutList(
		proxy: ReturnType<typeof manager.all>,
		serviceName: string,
	): Promise<CrossSiteResult<Resource>> {
		return (proxy as unknown as Record<string, { list: () => Promise<CrossSiteResult<Resource>> }>)[
			serviceName
		].list();
	}

	/**
	 * Verify fan-out returned data from all registered sites with no errors.
	 */
	function expectAllSites(result: CrossSiteResult<Resource>, serviceName: string) {
		expect(result.errors, `${serviceName} fan-out had errors`).toHaveLength(0);
		expect(result.data.length, `${serviceName} fan-out returned no data`).toBeGreaterThan(0);

		const resultSites = new Set(result.data.map((d) => d.site));
		for (const name of siteNames) {
			expect(resultSites.has(name), `${serviceName} missing ${name}`).toBe(true);
		}

		for (const entry of result.data) {
			expect(entry.site).toBeTruthy();
			expect(entry.resource).toBeDefined();
			expect(entry.resource.$key).toBeDefined();
		}
	}

	// ─── Fan-out across all sites ─────────────────────────────────────────────

	it(`fans out vms.list() across all ${siteCount} sites`, async () => {
		await delay();
		const result = await fanOutList(manager.all, 'vms');
		expectAllSites(result, 'vms');
	});

	it(`fans out networks.list() across all ${siteCount} sites`, async () => {
		await delay();
		const result = await fanOutList(manager.all, 'networks');
		expectAllSites(result, 'networks');
	});

	it('fans out alarms.list() across all sites without errors', async () => {
		await delay();
		const result = await fanOutList(manager.all, 'alarms');
		expect(result.errors).toHaveLength(0);

		for (const entry of result.data) {
			expect(entry.site).toBeTruthy();
			expect(entry.resource).toBeDefined();
			expect(entry.resource.$key).toBeDefined();
		}
	});

	// ─── Tag-based filtering ─────────────────────────────────────────────────

	it('tagged("first") returns data only from site-1', async () => {
		await delay();
		const result = await fanOutList(manager.tagged('first'), 'vms');
		expect(result.errors).toHaveLength(0);
		expect(result.data.length).toBeGreaterThan(0);

		const resultSites = new Set(result.data.map((d) => d.site));
		expect(resultSites.has('site-1')).toBe(true);
		expect(resultSites.size).toBe(1);
	});

	it(`tagged("dev") returns data from all ${siteCount} sites`, async () => {
		await delay();
		const result = await fanOutList(manager.tagged('dev'), 'vms');
		expectAllSites(result, 'tagged-dev vms');
	});

	it('tagged with nonexistent tag returns empty results', async () => {
		await delay();
		const result = await fanOutList(manager.tagged('nonexistent'), 'vms');
		expect(result.errors).toHaveLength(0);
		expect(result.data).toHaveLength(0);
	});

	// ─── Status after fan-out ────────────────────────────────────────────────

	it('status shows all sites connected after fan-out queries', () => {
		const statusMap = manager.status();

		for (const name of siteNames) {
			const status = statusMap.get(name);
			expect(status?.connected, `${name} not connected`).toBe(true);
			expect(status?.lastError, `${name} has error`).toBeUndefined();
		}
	});
});
