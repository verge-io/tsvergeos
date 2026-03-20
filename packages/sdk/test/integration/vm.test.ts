import { afterEach, beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import { isNotFoundError } from '../../src/errors.js';
import '../../src/services/vm/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('VM service integration', () => {
	let client: VergeClient;
	const createdVmKeys: number[] = [];

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	afterEach(async () => {
		// Clean up any VMs created during tests
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

	/**
	 * Generate a unique VM name using timestamp to avoid conflicts.
	 */
	function uniqueName(prefix = 'tsvergeos-test'): string {
		return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
	}

	it('should create a VM with minimal params and verify defaults', async () => {
		const name = uniqueName();
		const vm = await client.vms.create({ name });
		createdVmKeys.push(vm.$key as number);

		expect(vm.$key).toBeDefined();
		expect(vm.name).toBe(name);
		// API defaults
		expect(vm.cpu_cores).toBe(1);
		expect(vm.ram).toBe(1024);
		expect(vm.enabled).toBe(true);
	});

	it('should get a VM by key', async () => {
		await delay();
		const name = uniqueName();
		const created = await client.vms.create({ name });
		createdVmKeys.push(created.$key as number);

		await delay();
		const fetched = await client.vms.get(created.$key);

		expect(fetched.$key).toBe(created.$key);
		expect(fetched.name).toBe(name);
	});

	it('should get a VM by name', async () => {
		await delay();
		const name = uniqueName();
		const created = await client.vms.create({ name });
		createdVmKeys.push(created.$key as number);

		await delay();
		const fetched = await client.vms.getByName(name);

		expect(fetched.$key).toBe(created.$key);
		expect(fetched.name).toBe(name);
	});

	it('should update a VM description', async () => {
		await delay();
		const name = uniqueName();
		const created = await client.vms.create({ name });
		createdVmKeys.push(created.$key as number);

		await delay();
		const updated = await client.vms.update(created.$key, {
			description: 'Updated by tsvergeos integration test',
		});

		expect(updated.description).toBe('Updated by tsvergeos integration test');
		expect(updated.name).toBe(name);
	});

	it('should list VMs with a name filter', async () => {
		await delay();
		const name = uniqueName();
		const created = await client.vms.create({ name });
		createdVmKeys.push(created.$key as number);

		await delay();
		const vms = await client.vms.list({
			filter: `name eq '${name}'`,
		});

		expect(vms.length).toBe(1);
		expect(vms[0].name).toBe(name);
		expect(vms[0].$key).toBe(created.$key);
	});

	it('should delete a VM', async () => {
		await delay();
		const name = uniqueName();
		const created = await client.vms.create({ name });
		const key = created.$key;

		await delay();
		await client.vms.delete(key);

		// Verify it's gone
		await delay();
		try {
			await client.vms.get(key);
			expect.fail('Expected NotFoundError after delete');
		} catch (err: unknown) {
			expect(isNotFoundError(err)).toBe(true);
		}
	});

	it('should run a full CRUD lifecycle', async () => {
		await delay();
		const name = uniqueName('tsvergeos-lifecycle');

		// Create
		const vm = await client.vms.create({ name });
		createdVmKeys.push(vm.$key as number);
		expect(vm.name).toBe(name);

		// Read
		await delay();
		const read = await client.vms.get(vm.$key);
		expect(read.name).toBe(name);

		// Update
		await delay();
		const updated = await client.vms.update(vm.$key, {
			description: 'lifecycle test',
			os_family: 'linux',
		});
		expect(updated.description).toBe('lifecycle test');

		// List
		await delay();
		const list = await client.vms.list({
			filter: `name eq '${name}'`,
		});
		expect(list.length).toBe(1);

		// Delete
		await delay();
		await client.vms.delete(vm.$key);
		// Remove from cleanup list since we already deleted
		const idx = createdVmKeys.indexOf(vm.$key as number);
		if (idx >= 0) createdVmKeys.splice(idx, 1);

		// Verify deleted
		await delay();
		try {
			await client.vms.get(vm.$key);
			expect.fail('Expected NotFoundError');
		} catch (err: unknown) {
			expect(isNotFoundError(err)).toBe(true);
		}
	});
});
