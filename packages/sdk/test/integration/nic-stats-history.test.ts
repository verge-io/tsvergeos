import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/machine-nic-stats-history-short/index.js';
import '../../src/services/machine-nic-stats-history-long/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('NIC stats history integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list machine NIC stats history short with rate fields', async () => {
		await delay();
		const stats = await client.machineNicStatsHistoryShort.list({ limit: 5 });

		expect(Array.isArray(stats)).toBe(true);
		for (const entry of stats) {
			expect(entry.$key).toBeDefined();
			expect(entry.parent_nic).toBeDefined();
			expect(typeof entry.timestamp).toBe('number');
		}
	});

	it('should list machine NIC stats history long with aggregate fields', async () => {
		await delay();
		const stats = await client.machineNicStatsHistoryLong.list({ limit: 5 });

		expect(Array.isArray(stats)).toBe(true);
		for (const entry of stats) {
			expect(entry.$key).toBeDefined();
			expect(entry.parent_nic).toBeDefined();
			expect(typeof entry.timestamp).toBe('number');
		}
	});

	it('should filter NIC stats history short by parent_nic', async () => {
		await delay();
		const all = await client.machineNicStatsHistoryShort.list({ limit: 1 });
		if (all.length === 0) return; // No history data available

		const nicKey = all[0].parent_nic;
		await delay();
		const filtered = await client.machineNicStatsHistoryShort.listByNic(nicKey, { limit: 5 });

		expect(filtered.length).toBeGreaterThan(0);
		for (const entry of filtered) {
			expect(entry.parent_nic).toBe(nicKey);
		}
	});

	it('should filter NIC stats history long by parent_nic', async () => {
		await delay();
		const all = await client.machineNicStatsHistoryLong.list({ limit: 1 });
		if (all.length === 0) return; // No history data available

		const nicKey = all[0].parent_nic;
		await delay();
		const filtered = await client.machineNicStatsHistoryLong.listByNic(nicKey, {
			limit: 5,
		});

		expect(filtered.length).toBeGreaterThan(0);
		for (const entry of filtered) {
			expect(entry.parent_nic).toBe(nicKey);
		}
	});
});
