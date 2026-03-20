import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/storage-tier/index.js';
import '../../src/services/storage-tier-stats/index.js';
import '../../src/services/cluster-tier/index.js';
import '../../src/services/cluster-tier-stats/index.js';
import '../../src/services/cluster-tier-status/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Storage Tiers integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	// ─── Storage Tiers ────────────────────────────────────────────────────

	it('should list storage tiers', async () => {
		await delay();
		// Storage tiers don't include $key with fields=most, so request it explicitly
		const tiers = await client.storageTiers.list({ fields: 'most,$key' });

		expect(Array.isArray(tiers)).toBe(true);
		// System should have at least one tier configured
		expect(tiers.length).toBeGreaterThan(0);
		// At most 6 tiers (0-5)
		expect(tiers.length).toBeLessThanOrEqual(6);

		for (const tier of tiers) {
			expect(tier.$key).toBeDefined();
			expect(typeof tier.tier).toBe('number');
			expect(tier.tier).toBeGreaterThanOrEqual(0);
			expect(tier.tier).toBeLessThanOrEqual(5);
		}
	});

	it('should get a storage tier by key', async () => {
		await delay();
		const tiers = await client.storageTiers.list({
			fields: 'most,$key',
			limit: 1,
		});

		if (tiers.length === 0) {
			return;
		}

		const key = tiers[0].$key;
		await delay();
		const tier = await client.storageTiers.get(key);

		expect(typeof tier.tier).toBe('number');
	});

	// ─── Storage Tier Stats ───────────────────────────────────────────────

	it('should list storage tier stats', async () => {
		await delay();
		const stats = await client.storageTierStats.list();

		expect(Array.isArray(stats)).toBe(true);

		for (const s of stats) {
			expect(s.$key).toBeDefined();
			expect(s.tier).toBeDefined();
		}
	});

	it('should list stats by storage tier key', async () => {
		await delay();
		const tiers = await client.storageTiers.list({
			fields: 'most,$key',
			limit: 1,
		});

		if (tiers.length === 0) {
			return;
		}

		const tierKey = tiers[0].$key;
		await delay();
		const stats = await client.storageTierStats.listByTier(tierKey);

		expect(Array.isArray(stats)).toBe(true);
		for (const s of stats) {
			expect(String(s.tier)).toBe(String(tierKey));
		}
	});

	// ─── Cluster Tiers ────────────────────────────────────────────────────

	it('should list cluster tiers', async () => {
		await delay();
		const tiers = await client.clusterTiers.list();

		expect(Array.isArray(tiers)).toBe(true);
		expect(tiers.length).toBeGreaterThan(0);

		for (const tier of tiers) {
			expect(tier.$key).toBeDefined();
			expect(typeof tier.tier).toBe('number');
			expect(tier.cluster).toBeDefined();
		}
	});

	it('should list cluster tiers by cluster', async () => {
		await delay();
		const tiers = await client.clusterTiers.list({ limit: 1 });

		if (tiers.length === 0) {
			return;
		}

		const clusterKey = tiers[0].cluster;
		await delay();
		const filtered = await client.clusterTiers.listByCluster(clusterKey);

		expect(Array.isArray(filtered)).toBe(true);
		expect(filtered.length).toBeGreaterThan(0);
		for (const tier of filtered) {
			expect(String(tier.cluster)).toBe(String(clusterKey));
		}
	});

	// ─── Cluster Tier Stats ───────────────────────────────────────────────

	it('should list cluster tier stats', async () => {
		await delay();
		const stats = await client.clusterTierStats.list();

		expect(Array.isArray(stats)).toBe(true);

		for (const s of stats) {
			expect(s.$key).toBeDefined();
			expect(s.tier).toBeDefined();
		}
	});

	it('should list cluster tier stats by cluster tier key', async () => {
		await delay();
		const tiers = await client.clusterTiers.list({ limit: 1 });

		if (tiers.length === 0) {
			return;
		}

		const clusterTierKey = tiers[0].$key;
		await delay();
		const stats = await client.clusterTierStats.listByClusterTier(clusterTierKey);

		expect(Array.isArray(stats)).toBe(true);
		for (const s of stats) {
			expect(String(s.tier)).toBe(String(clusterTierKey));
		}
	});

	// ─── Cluster Tier Status ──────────────────────────────────────────────

	it('should list cluster tier status entries', async () => {
		await delay();
		const statuses = await client.clusterTierStatus.list();

		expect(Array.isArray(statuses)).toBe(true);
		expect(statuses.length).toBeGreaterThan(0);

		const validStatusValues = [
			'online',
			'offline',
			'repairing',
			'initializing',
			'verifying',
			'noredundant',
			'outofspace',
		];
		const validStateValues = ['online', 'offline', 'warning', 'error'];

		for (const s of statuses) {
			expect(s.$key).toBeDefined();
			expect(s.tier).toBeDefined();

			if (s.status !== undefined) {
				expect(validStatusValues).toContain(s.status);
			}
			if (s.state !== undefined) {
				expect(validStateValues).toContain(s.state);
			}
		}
	});

	it('should list cluster tier status by cluster tier key', async () => {
		await delay();
		const tiers = await client.clusterTiers.list({ limit: 1 });

		if (tiers.length === 0) {
			return;
		}

		const clusterTierKey = tiers[0].$key;
		await delay();
		const statuses = await client.clusterTierStatus.listByClusterTier(clusterTierKey);

		expect(Array.isArray(statuses)).toBe(true);
		for (const s of statuses) {
			expect(String(s.tier)).toBe(String(clusterTierKey));
		}
	});
});
