import { afterEach, beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/vm/index.js';
import '../../src/services/machine-snapshot/index.js';
import '../../src/services/machine-drive/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Machine sub-resource integration', () => {
	let client: VergeClient;
	const createdVmKeys: number[] = [];

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	afterEach(async () => {
		for (const key of createdVmKeys) {
			try {
				await delay();
				await client.vms.delete(key);
			} catch {
				// Already deleted or doesn't exist — ignore
			}
		}
		createdVmKeys.length = 0;
	});

	function uniqueName(prefix = 'tsvergeos-test'): string {
		return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
	}

	it('should list drives for a newly created VM', async () => {
		const name = uniqueName('tsvergeos-drives');
		const vm = await client.vms.create({ name });
		createdVmKeys.push(vm.$key as number);

		await delay();
		const drives = await client.machineDrives.listByMachine(vm.$key);

		// A new VM may or may not have default drives — just verify no errors
		// and that any returned drives reference the parent machine
		expect(Array.isArray(drives)).toBe(true);
		for (const drive of drives) {
			expect(drive.machine).toBe(vm.$key);
		}
	});

	it('should list snapshots for a newly created VM', async () => {
		const name = uniqueName('tsvergeos-snaps');
		const vm = await client.vms.create({ name });
		createdVmKeys.push(vm.$key as number);

		await delay();
		const snapshots = await client.machineSnapshots.listByMachine(vm.$key);

		// A new VM will likely have no snapshots — verify the call succeeds
		expect(Array.isArray(snapshots)).toBe(true);
		for (const snap of snapshots) {
			expect(snap.machine).toBe(vm.$key);
		}
	});

	it('should list all drives via the base list method', async () => {
		await delay();
		const drives = await client.machineDrives.list({ limit: 5 });

		expect(Array.isArray(drives)).toBe(true);
		// There should be at least some drives on the system
		// Each drive should have standard resource fields
		for (const drive of drives) {
			expect(drive.$key).toBeDefined();
			expect(drive.machine).toBeDefined();
		}
	});
});
