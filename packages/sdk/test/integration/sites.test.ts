import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/site/index.js';
import '../../src/services/site-sync-incoming/index.js';
import '../../src/services/site-sync-outgoing/index.js';
import '../../src/services/site-sync-profile-period/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Sites & Site Syncs integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	// --- Sites ---

	it('should list sites', async () => {
		const sites = await client.sites.list();
		expect(Array.isArray(sites)).toBe(true);
	});

	it('should list sites with limit', async () => {
		await delay();
		const sites = await client.sites.list({ limit: 5 });
		expect(Array.isArray(sites)).toBe(true);
		expect(sites.length).toBeLessThanOrEqual(5);
	});

	it('should get a site by key if sites exist', async () => {
		await delay();
		const sites = await client.sites.list({ limit: 1 });
		if (sites.length === 0) {
			return; // No sites configured
		}

		const site = sites[0];
		if (!site) return;
		await delay();
		const fetched = await client.sites.get(site.$key);
		expect(fetched.$key).toBe(site.$key);
		expect(fetched.name).toBe(site.name);
	});

	// --- Incoming Syncs ---

	it('should list incoming syncs', async () => {
		await delay();
		const syncs = await client.siteSyncsIncoming.list();
		expect(Array.isArray(syncs)).toBe(true);
	});

	it('should list incoming syncs filtered by site if sites exist', async () => {
		await delay();
		const sites = await client.sites.list({ limit: 1 });
		if (sites.length === 0) {
			return; // No sites configured
		}

		const site = sites[0];
		if (!site) return;
		await delay();
		const syncs = await client.siteSyncsIncoming.listBySite(site.$key);
		expect(Array.isArray(syncs)).toBe(true);

		// All returned syncs should belong to this site
		for (const sync of syncs) {
			expect(sync.site).toBe(site.$key);
		}
	});

	// --- Outgoing Syncs ---

	it('should list outgoing syncs', async () => {
		await delay();
		const syncs = await client.siteSyncsOutgoing.list();
		expect(Array.isArray(syncs)).toBe(true);
	});

	it('should list outgoing syncs filtered by site if sites exist', async () => {
		await delay();
		const sites = await client.sites.list({ limit: 1 });
		if (sites.length === 0) {
			return; // No sites configured
		}

		const site = sites[0];
		if (!site) return;
		await delay();
		const syncs = await client.siteSyncsOutgoing.listBySite(site.$key);
		expect(Array.isArray(syncs)).toBe(true);

		// All returned syncs should belong to this site
		for (const sync of syncs) {
			expect(sync.site).toBe(site.$key);
		}
	});

	// --- Profile Periods ---

	it('should list sync profile periods', async () => {
		await delay();
		const periods = await client.siteSyncProfilePeriods.list();
		expect(Array.isArray(periods)).toBe(true);
	});

	it('should list profile periods by outgoing sync if syncs exist', async () => {
		await delay();
		const syncs = await client.siteSyncsOutgoing.list({ limit: 1 });
		if (syncs.length === 0) {
			return; // No outgoing syncs configured
		}

		const sync = syncs[0];
		if (!sync) return;
		await delay();
		const periods = await client.siteSyncProfilePeriods.listByOutgoingSync(sync.$key);
		expect(Array.isArray(periods)).toBe(true);

		// All returned periods should belong to this outgoing sync
		for (const period of periods) {
			expect(period.site_syncs_outgoing).toBe(sync.$key);
		}
	});
});
