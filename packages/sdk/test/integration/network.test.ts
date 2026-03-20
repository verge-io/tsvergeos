import { afterEach, beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import { isNotFoundError } from '../../src/errors.js';
import '../../src/services/network/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Network service integration', () => {
	let client: VergeClient;
	const createdNetworkKeys: number[] = [];

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	afterEach(async () => {
		// Clean up any networks created during tests
		for (const key of createdNetworkKeys) {
			try {
				await delay();
				await client.networks.delete(key);
			} catch {
				// Already deleted or doesn't exist — ignore
			}
		}
		createdNetworkKeys.length = 0;
	});

	/**
	 * Generate a unique network name using timestamp to avoid conflicts.
	 */
	function uniqueName(prefix = 'tsvergeos-net-test'): string {
		return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
	}

	it('should create an internal network with minimal params', async () => {
		const name = uniqueName();
		const network = await client.networks.create({ name, type: 'internal' });
		createdNetworkKeys.push(network.$key as number);

		expect(network.$key).toBeDefined();
		expect(network.name).toBe(name);
		expect(network.type).toBe('internal');
	});

	it('should get a network by key', async () => {
		await delay();
		const name = uniqueName();
		const created = await client.networks.create({ name, type: 'internal' });
		createdNetworkKeys.push(created.$key as number);

		await delay();
		const fetched = await client.networks.get(created.$key);

		expect(fetched.$key).toBe(created.$key);
		expect(fetched.name).toBe(name);
	});

	it('should get a network by name', async () => {
		await delay();
		const name = uniqueName();
		const created = await client.networks.create({ name, type: 'internal' });
		createdNetworkKeys.push(created.$key as number);

		await delay();
		const fetched = await client.networks.getByName(name);

		expect(fetched.$key).toBe(created.$key);
		expect(fetched.name).toBe(name);
	});

	it('should update a network description', async () => {
		await delay();
		const name = uniqueName();
		const created = await client.networks.create({ name, type: 'internal' });
		createdNetworkKeys.push(created.$key as number);

		await delay();
		const updated = await client.networks.update(created.$key, {
			description: 'Updated by tsvergeos integration test',
		});

		expect(updated.description).toBe('Updated by tsvergeos integration test');
		expect(updated.name).toBe(name);
	});

	it('should list networks with a name filter', async () => {
		await delay();
		const name = uniqueName();
		const created = await client.networks.create({ name, type: 'internal' });
		createdNetworkKeys.push(created.$key as number);

		await delay();
		const networks = await client.networks.list({
			filter: `name eq '${name}'`,
		});

		expect(networks.length).toBe(1);
		expect(networks[0].name).toBe(name);
		expect(networks[0].$key).toBe(created.$key);
	});

	it('should delete a network', async () => {
		await delay();
		const name = uniqueName();
		const created = await client.networks.create({ name, type: 'internal' });
		const key = created.$key;

		await delay();
		await client.networks.delete(key);

		// Verify it's gone
		await delay();
		try {
			await client.networks.get(key);
			expect.fail('Expected NotFoundError after delete');
		} catch (err: unknown) {
			expect(isNotFoundError(err)).toBe(true);
		}
	});

	it('should run a full CRUD lifecycle', async () => {
		await delay();
		const name = uniqueName('tsvergeos-net-lifecycle');

		// Create
		const network = await client.networks.create({ name, type: 'internal' });
		createdNetworkKeys.push(network.$key as number);
		expect(network.name).toBe(name);
		expect(network.type).toBe('internal');

		// Read
		await delay();
		const read = await client.networks.get(network.$key);
		expect(read.name).toBe(name);

		// Update
		await delay();
		const updated = await client.networks.update(network.$key, {
			description: 'lifecycle test',
		});
		expect(updated.description).toBe('lifecycle test');

		// List
		await delay();
		const list = await client.networks.list({
			filter: `name eq '${name}'`,
		});
		expect(list.length).toBe(1);

		// Delete
		await delay();
		await client.networks.delete(network.$key);
		// Remove from cleanup list since we already deleted
		const idx = createdNetworkKeys.indexOf(network.$key as number);
		if (idx >= 0) createdNetworkKeys.splice(idx, 1);

		// Verify deleted
		await delay();
		try {
			await client.networks.get(network.$key);
			expect.fail('Expected NotFoundError');
		} catch (err: unknown) {
			expect(isNotFoundError(err)).toBe(true);
		}
	});
});
