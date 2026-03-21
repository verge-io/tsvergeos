import { beforeAll, expect, it } from 'vitest';
import type { CrossSiteResult } from '../../src/cross-site.js';
import { SiteManager } from '../../src/site-manager.js';
import type { Resource } from '../../src/types.js';
import {
	createSite1Config,
	createSite2Config,
	delay,
	skipIfNoMultiSiteCredentials,
} from './helpers.js';
import '../../src/services/vm/index.js';
import '../../src/services/network/index.js';
import '../../src/services/alarm/index.js';

/**
 * CrossSiteReadProxy integration test using two genuinely different VergeOS systems.
 *
 * Dev system 1: self-signed cert (192.168.10.75)
 * Dev system 2: valid cert (asgard.subether.me)
 *
 * Validates cross-site fan-out against real, distinct infrastructure:
 * - Aggregated results from both sites with correct site labels
 * - Tag-based filtering returns data from matching sites only
 * - Multiple service types work through the proxy
 *
 * Env vars: VERGEOS_HOST, VERGEOS_API_KEY, VERGEOS_VERIFY_SSL,
 *           VERGEOS_HOST_2, VERGEOS_API_KEY_2
 */

const describeIf = skipIfNoMultiSiteCredentials();

const SITE_LOCAL = 'dev-local';
const SITE_PUBLIC = 'dev-public';

describeIf('CrossSiteReadProxy integration (two real systems)', () => {
	let manager: SiteManager;

	beforeAll(async () => {
		manager = new SiteManager();

		const config1 = await createSite1Config(SITE_LOCAL, ['local', 'dev']);
		await manager.addSite(config1);
		await delay();

		const config2 = await createSite2Config(SITE_PUBLIC, ['public', 'dev']);
		await manager.addSite(config2);
	}, 30_000);

	// ─── Helper to call fan-out list on the proxy ─────────────────────────────

	async function fanOutList(
		proxy: ReturnType<typeof manager.all>,
		serviceName: string,
	): Promise<CrossSiteResult<Resource>> {
		return (proxy as unknown as Record<string, { list: () => Promise<CrossSiteResult<Resource>> }>)[
			serviceName
		].list();
	}

	/**
	 * Verify a fan-out result contains data from both sites with no errors.
	 */
	function expectBothSites(result: CrossSiteResult<Resource>, serviceName: string) {
		expect(result.errors, `${serviceName} fan-out had errors`).toHaveLength(0);
		expect(result.data.length, `${serviceName} fan-out returned no data`).toBeGreaterThan(0);

		const siteNames = new Set(result.data.map((d) => d.site));
		expect(siteNames.has(SITE_LOCAL), `${serviceName} missing ${SITE_LOCAL}`).toBe(true);
		expect(siteNames.has(SITE_PUBLIC), `${serviceName} missing ${SITE_PUBLIC}`).toBe(true);

		// Every entry has a valid resource with a $key
		for (const entry of result.data) {
			expect(entry.site).toBeTruthy();
			expect(entry.resource).toBeDefined();
			expect(entry.resource.$key).toBeDefined();
		}
	}

	// ─── Fan-out across multiple service types ────────────────────────────────

	it('fans out vms.list() across both sites', async () => {
		await delay();
		const result = await fanOutList(manager.all, 'vms');
		expectBothSites(result, 'vms');
	});

	it('fans out networks.list() across both sites', async () => {
		await delay();
		const result = await fanOutList(manager.all, 'networks');
		expectBothSites(result, 'networks');
	});

	it('fans out alarms.list() across both sites without errors', async () => {
		await delay();
		const result = await fanOutList(manager.all, 'alarms');
		// Alarms may be empty on one or both sites — just verify no errors
		expect(result.errors).toHaveLength(0);

		// If there are alarms, verify structure
		for (const entry of result.data) {
			expect(entry.site).toBeTruthy();
			expect(entry.resource).toBeDefined();
			expect(entry.resource.$key).toBeDefined();
		}
	});

	// ─── Tag-based filtering ─────────────────────────────────────────────────

	it('tagged("local") returns data only from dev-local', async () => {
		await delay();
		const result = await fanOutList(manager.tagged('local'), 'vms');
		expect(result.errors).toHaveLength(0);
		expect(result.data.length).toBeGreaterThan(0);

		const siteNames = new Set(result.data.map((d) => d.site));
		expect(siteNames.has(SITE_LOCAL)).toBe(true);
		expect(siteNames.has(SITE_PUBLIC)).toBe(false);
	});

	it('tagged("public") returns data only from dev-public', async () => {
		await delay();
		const result = await fanOutList(manager.tagged('public'), 'vms');
		expect(result.errors).toHaveLength(0);
		expect(result.data.length).toBeGreaterThan(0);

		const siteNames = new Set(result.data.map((d) => d.site));
		expect(siteNames.has(SITE_PUBLIC)).toBe(true);
		expect(siteNames.has(SITE_LOCAL)).toBe(false);
	});

	it('tagged("dev") returns data from both sites', async () => {
		await delay();
		const result = await fanOutList(manager.tagged('dev'), 'vms');
		expectBothSites(result, 'tagged-dev vms');
	});

	it('tagged with nonexistent tag returns empty results', async () => {
		await delay();
		const result = await fanOutList(manager.tagged('nonexistent'), 'vms');
		expect(result.errors).toHaveLength(0);
		expect(result.data).toHaveLength(0);
	});

	// ─── Status after fan-out ────────────────────────────────────────────────

	it('status shows both sites connected after fan-out queries', () => {
		const statusMap = manager.status();

		const status1 = statusMap.get(SITE_LOCAL);
		expect(status1?.connected).toBe(true);
		expect(status1?.lastError).toBeUndefined();

		const status2 = statusMap.get(SITE_PUBLIC);
		expect(status2?.connected).toBe(true);
		expect(status2?.lastError).toBeUndefined();
	});
});
