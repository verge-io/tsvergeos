import { beforeAll, expect, it } from 'vitest';
import { isNotFoundError, isValidationError } from '../../src/errors.js';
import type { SiteConfig } from '../../src/site-manager.js';
import { SiteManager } from '../../src/site-manager.js';
import {
	createAllSiteConfigs,
	delay,
	discoverSites,
	skipIfNoMultiSiteCredentials,
} from './helpers.js';
import '../../src/services/vm/index.js';

/**
 * Multi-site integration test using all discovered VergeOS systems.
 *
 * Dynamically discovers VERGEOS_HOST, VERGEOS_HOST_2, VERGEOS_HOST_3, etc.
 * and registers each as a named site. Validates SiteManager orchestration
 * against real, distinct infrastructure.
 */

const describeIf = skipIfNoMultiSiteCredentials();
const siteCount = discoverSites().length;

describeIf(`SiteManager integration (${siteCount} real systems)`, () => {
	let manager: SiteManager;
	let siteConfigs: SiteConfig[];
	const siteNames: string[] = [];

	beforeAll(async () => {
		manager = new SiteManager();
		siteConfigs = await createAllSiteConfigs();

		for (const config of siteConfigs) {
			await manager.addSite(config);
			siteNames.push(config.name);
			await delay();
		}
	}, 60_000);

	it(`registers all ${siteCount} sites successfully`, () => {
		const sites = manager.sites();
		expect(sites.size).toBe(siteNames.length);
		for (const name of siteNames) {
			expect(sites.has(name)).toBe(true);
		}
	});

	it('returns distinct client instances for each site', () => {
		const clients = siteNames.map((name) => manager.site(name));
		const unique = new Set(clients);
		expect(unique.size).toBe(siteNames.length);
	});

	it('all sites report connected with v25+ version strings', () => {
		const statusMap = manager.status();
		expect(statusMap.size).toBe(siteNames.length);

		for (const name of siteNames) {
			const status = statusMap.get(name);
			expect(status, `${name} missing from status`).toBeDefined();
			expect(status?.connected, `${name} not connected`).toBe(true);
			expect(status?.version, `${name} version missing`).toMatch(/^2[5-9]\./);
		}
	});

	it('lists VMs independently on each site', async () => {
		for (const name of siteNames) {
			await delay();
			const vms = await manager.site(name).vms.list();
			expect(Array.isArray(vms), `${name} vms.list() not an array`).toBe(true);
		}
	});

	it('rejects duplicate site names', async () => {
		const firstName = siteNames[0] as string;
		const dupeConfig = await createAllSiteConfigs(
			() => firstName,
			() => ['dev'],
		);

		try {
			await manager.addSite(dupeConfig[0] as SiteConfig);
			expect.fail('Expected ValidationError for duplicate name');
		} catch (err: unknown) {
			expect(isValidationError(err)).toBe(true);
		}
	});

	it('removes a site and throws NotFoundError when accessing it', () => {
		const removedName = siteNames[0] as string;
		manager.removeSite(removedName);

		expect(manager.sites().size).toBe(siteNames.length - 1);
		expect(manager.sites().has(removedName)).toBe(false);

		try {
			manager.site(removedName);
			expect.fail('Expected NotFoundError');
		} catch (err: unknown) {
			expect(isNotFoundError(err)).toBe(true);
		}
	});

	it('reflects removal in status map', () => {
		const removedName = siteNames[0] as string;
		const statusMap = manager.status();
		expect(statusMap.size).toBe(siteNames.length - 1);
		expect(statusMap.has(removedName)).toBe(false);
	});

	it('can re-add the removed site', async () => {
		const removedConfig = siteConfigs[0] as SiteConfig;
		await manager.addSite(removedConfig);

		expect(manager.sites().size).toBe(siteNames.length);
		expect(manager.sites().has(removedConfig.name)).toBe(true);

		const status = manager.status().get(removedConfig.name);
		expect(status?.connected).toBe(true);
	});
});
