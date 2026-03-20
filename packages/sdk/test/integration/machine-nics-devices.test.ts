import { afterEach, beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/vm/index.js';
import '../../src/services/network/index.js';
import '../../src/services/machine-nic/index.js';
import '../../src/services/machine-device/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Machine NICs & Devices integration', () => {
	let client: VergeClient;
	const createdVmKeys: number[] = [];
	const createdNicKeys: number[] = [];

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	afterEach(async () => {
		// Clean up NICs first (they reference VMs)
		for (const key of createdNicKeys) {
			try {
				await delay();
				await client.machineNics.delete(key);
			} catch {
				// Already deleted or doesn't exist — ignore
			}
		}
		createdNicKeys.length = 0;

		// Then clean up VMs
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

	it('should list NICs for a newly created VM', async () => {
		const name = uniqueName('tsvergeos-nics');
		const vm = await client.vms.create({ name });
		createdVmKeys.push(vm.$key as number);

		await delay();
		const nics = await client.machineNics.listByMachine(vm.$key);

		// A new VM may have a default NIC — verify call succeeds
		// and any returned NICs reference the parent machine
		expect(Array.isArray(nics)).toBe(true);
		for (const nic of nics) {
			expect(nic.machine).toBe(vm.$key);
		}
	});

	it('should create a NIC on a VM and retrieve it', async () => {
		const vmName = uniqueName('tsvergeos-nic-create');
		const vm = await client.vms.create({ name: vmName });
		const vmKey = Number(vm.$key);
		createdVmKeys.push(vmKey);

		// Find an internal network to attach the NIC to
		await delay();
		const networks = await client.networks.list({ limit: 5 });
		// Use the first available network, or create without vnet
		const vnetKey = networks.length > 0 ? networks[0].$key : undefined;

		// Longer delay to ensure VM is fully provisioned before adding a NIC
		await delay(500);
		const nic = await client.machineNics.create({
			machine: vmKey,
			interface: 'virtio',
			...(vnetKey !== undefined ? { vnet: vnetKey } : {}),
		});
		createdNicKeys.push(nic.$key as number);

		expect(nic.$key).toBeDefined();
		expect(Number(nic.machine)).toBe(vmKey);

		// Retrieve the NIC by key
		await delay();
		const fetched = await client.machineNics.get(nic.$key);
		expect(fetched.$key).toBe(nic.$key);
		expect(Number(fetched.machine)).toBe(vmKey);
	});

	it('should list devices for a newly created VM', async () => {
		const name = uniqueName('tsvergeos-devices');
		const vm = await client.vms.create({ name });
		createdVmKeys.push(vm.$key as number);

		await delay();
		const devices = await client.machineDevices.listByMachine(vm.$key);

		// A new VM will likely have no devices — verify the call succeeds
		expect(Array.isArray(devices)).toBe(true);
		for (const device of devices) {
			expect(device.machine).toBe(vm.$key);
		}
	});

	it('should list all NICs via the base list method', async () => {
		await delay();
		const nics = await client.machineNics.list({ limit: 5 });

		expect(Array.isArray(nics)).toBe(true);
		// Each NIC should have standard resource fields
		for (const nic of nics) {
			expect(nic.$key).toBeDefined();
			expect(nic.machine).toBeDefined();
		}
	});

	it('should list all devices via the base list method', async () => {
		await delay();
		const devices = await client.machineDevices.list({ limit: 5 });

		expect(Array.isArray(devices)).toBe(true);
		for (const device of devices) {
			expect(device.$key).toBeDefined();
		}
	});
});
