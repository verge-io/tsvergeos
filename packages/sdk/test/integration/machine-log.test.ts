import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/machine-log/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Machine log integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list machine logs', async () => {
		await delay();
		const logs = await client.machineLogs.list({ limit: 5 });

		expect(Array.isArray(logs)).toBe(true);
		// System should have at least some log entries
		expect(logs.length).toBeGreaterThan(0);

		for (const entry of logs) {
			expect(entry.$key).toBeDefined();
			expect(entry.machine).toBeDefined();
			expect(entry.level).toBeDefined();
		}
	});

	it('should filter logs by machine using listByMachine', async () => {
		await delay();
		// First get a log entry to find a valid machine key
		const allLogs = await client.machineLogs.list({ limit: 1 });
		expect(allLogs.length).toBeGreaterThan(0);

		const machineKey = allLogs[0]?.machine;
		expect(machineKey).toBeDefined();
		await delay();

		const machineLogs = await client.machineLogs.listByMachine(machineKey);

		expect(Array.isArray(machineLogs)).toBe(true);
		// All returned logs should belong to the same machine
		for (const entry of machineLogs) {
			expect(String(entry.machine)).toBe(String(machineKey));
		}
	});

	it('should support filtering by level', async () => {
		await delay();
		const errorLogs = await client.machineLogs.list({
			filter: "level eq 'error'",
			limit: 5,
		});

		expect(Array.isArray(errorLogs)).toBe(true);
		for (const entry of errorLogs) {
			expect(entry.level).toBe('error');
		}
	});
});
