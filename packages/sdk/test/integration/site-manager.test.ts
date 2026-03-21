import { beforeAll, expect, it } from 'vitest';
import { isNotFoundError, isValidationError } from '../../src/errors.js';
import { SiteManager } from '../../src/site-manager.js';
import {
	createSite1Config,
	createSite2Config,
	delay,
	skipIfNoMultiSiteCredentials,
} from './helpers.js';
import '../../src/services/vm/index.js';

/**
 * Multi-site integration test using two genuinely different VergeOS systems.
 *
 * Dev system 1: self-signed cert (verge.example.com)
 * Dev system 2: valid cert (verge.example.com)
 *
 * Validates SiteManager orchestration against real, distinct infrastructure.
 *
 * Env vars: VERGEOS_HOST, VERGEOS_API_KEY, VERGEOS_VERIFY_SSL,
 *           VERGEOS_HOST_2, VERGEOS_API_KEY_2
 */

const describeIf = skipIfNoMultiSiteCredentials();

const SITE_LOCAL = 'dev-local';
const SITE_PUBLIC = 'dev-public';

describeIf('SiteManager integration (two real systems)', () => {
	let manager: SiteManager;

	beforeAll(async () => {
		manager = new SiteManager();

		const config1 = await createSite1Config(SITE_LOCAL, ['local', 'dev']);
		await manager.addSite(config1);
		await delay();

		const config2 = await createSite2Config(SITE_PUBLIC, ['public', 'dev']);
		await manager.addSite(config2);
	}, 30_000);

	it('registers both sites successfully', () => {
		const sites = manager.sites();
		expect(sites.size).toBe(2);
		expect(sites.has(SITE_LOCAL)).toBe(true);
		expect(sites.has(SITE_PUBLIC)).toBe(true);
	});

	it('returns distinct client instances for each site', () => {
		const client1 = manager.site(SITE_LOCAL);
		const client2 = manager.site(SITE_PUBLIC);
		expect(client1).toBeDefined();
		expect(client2).toBeDefined();
		expect(client1).not.toBe(client2);
	});

	it('both sites report connected with v25+ version strings', () => {
		const statusMap = manager.status();
		expect(statusMap.size).toBe(2);

		const status1 = statusMap.get(SITE_LOCAL);
		expect(status1).toBeDefined();
		expect(status1?.connected).toBe(true);
		expect(status1?.version).toMatch(/^2[5-9]\./);

		const status2 = statusMap.get(SITE_PUBLIC);
		expect(status2).toBeDefined();
		expect(status2?.connected).toBe(true);
		expect(status2?.version).toMatch(/^2[5-9]\./);
	});

	it('lists VMs independently on each site', async () => {
		await delay();
		const vms1 = await manager.site(SITE_LOCAL).vms.list();
		expect(Array.isArray(vms1)).toBe(true);
		expect(vms1.length).toBeGreaterThan(0);

		await delay();
		const vms2 = await manager.site(SITE_PUBLIC).vms.list();
		expect(Array.isArray(vms2)).toBe(true);
		expect(vms2.length).toBeGreaterThan(0);
	});

	it('rejects duplicate site names', async () => {
		const dupeConfig = await createSite1Config(SITE_LOCAL);

		try {
			await manager.addSite(dupeConfig);
			expect.fail('Expected ValidationError for duplicate name');
		} catch (err: unknown) {
			expect(isValidationError(err)).toBe(true);
		}
	});

	it('removes a site and throws NotFoundError when accessing it', () => {
		manager.removeSite(SITE_LOCAL);

		const sites = manager.sites();
		expect(sites.size).toBe(1);
		expect(sites.has(SITE_LOCAL)).toBe(false);
		expect(sites.has(SITE_PUBLIC)).toBe(true);

		try {
			manager.site(SITE_LOCAL);
			expect.fail('Expected NotFoundError');
		} catch (err: unknown) {
			expect(isNotFoundError(err)).toBe(true);
		}
	});

	it('reflects removal in status map', () => {
		const statusMap = manager.status();
		expect(statusMap.size).toBe(1);
		expect(statusMap.has(SITE_LOCAL)).toBe(false);
		expect(statusMap.has(SITE_PUBLIC)).toBe(true);
	});

	it('can re-add the removed site', async () => {
		const config = await createSite1Config(SITE_LOCAL, ['local', 'dev']);
		await manager.addSite(config);

		expect(manager.sites().size).toBe(2);
		expect(manager.sites().has(SITE_LOCAL)).toBe(true);

		const status = manager.status().get(SITE_LOCAL);
		expect(status?.connected).toBe(true);
	});
});
