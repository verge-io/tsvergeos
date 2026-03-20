import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/machine-stats/index.js';
import '../../src/services/machine-drive-stats/index.js';
import '../../src/services/machine-nic-stats/index.js';
import '../../src/services/machine-drive-phys/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Machine stats integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list machine stats with CPU and RAM fields', async () => {
		await delay();
		const stats = await client.machineStats.list({ limit: 5 });

		expect(Array.isArray(stats)).toBe(true);
		// System should have at least one running machine with stats
		expect(stats.length).toBeGreaterThan(0);

		for (const entry of stats) {
			expect(entry.$key).toBeDefined();
			// CPU fields should be numbers (0-100 range for percentages)
			expect(typeof entry.total_cpu).toBe('number');
			expect(typeof entry.ram_used).toBe('number');
			expect(typeof entry.ram_pct).toBe('number');
		}
	});

	it('should list drive stats with I/O fields', async () => {
		await delay();
		const stats = await client.machineDriveStats.list({ limit: 5 });

		expect(Array.isArray(stats)).toBe(true);
		// System should have drives with stats
		expect(stats.length).toBeGreaterThan(0);

		for (const entry of stats) {
			expect(entry.$key).toBeDefined();
			expect(typeof entry.rops).toBe('number');
			expect(typeof entry.wops).toBe('number');
		}
	});

	it('should list NIC stats with traffic fields', async () => {
		await delay();
		const stats = await client.machineNicStats.list({ limit: 5 });

		expect(Array.isArray(stats)).toBe(true);
		// System should have NICs with stats
		expect(stats.length).toBeGreaterThan(0);

		for (const entry of stats) {
			expect(entry.$key).toBeDefined();
			expect(typeof entry.txbps).toBe('number');
			expect(typeof entry.rxbps).toBe('number');
		}
	});

	it('should list drive phys with hardware info', async () => {
		await delay();
		const stats = await client.machineDrivePhys.list({ limit: 5 });

		expect(Array.isArray(stats)).toBe(true);
		// System should have physical drives
		expect(stats.length).toBeGreaterThan(0);

		for (const entry of stats) {
			expect(entry.$key).toBeDefined();
			// model and temp are commonly populated fields
			expect(entry.model).toBeDefined();
			expect(typeof entry.temp).toBe('number');
		}
	});

	it('should filter physical drive stats via listPhysical', async () => {
		await delay();
		const physical = await client.machineDriveStats.listPhysical();

		expect(Array.isArray(physical)).toBe(true);
		// All returned entries should be physical drives
		for (const entry of physical) {
			expect(entry.physical).toBe(true);
		}
	});
});
