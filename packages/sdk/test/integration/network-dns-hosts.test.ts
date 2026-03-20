import { afterEach, beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/network/index.js';
import '../../src/services/network-dns-view/index.js';
import '../../src/services/network-dns-zone/index.js';
import '../../src/services/network-dns-record/index.js';
import '../../src/services/network-host/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Network DNS & Hosts integration', () => {
	let client: VergeClient;
	const createdNetworkKeys: number[] = [];
	const createdHostKeys: number[] = [];

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	afterEach(async () => {
		// Clean up hosts first (child of network)
		for (const key of createdHostKeys) {
			try {
				await delay();
				await client.networkHosts.delete(key);
			} catch {
				// Already deleted or doesn't exist — ignore
			}
		}
		createdHostKeys.length = 0;

		// Clean up networks (child resources are deleted with the network)
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

	function uniqueName(prefix = 'tsvergeos-dns-test'): string {
		return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
	}

	// --- Host Override Tests ---

	it('should create a host override and list by network', async () => {
		const netName = uniqueName('tsvergeos-host-net');
		const network = await client.networks.create({
			name: netName,
			type: 'internal',
		});
		createdNetworkKeys.push(network.$key as number);

		await delay();
		const host = await client.networkHosts.create({
			vnet: network.$key,
			host: 'test-server',
			ip: '10.100.0.50',
		});
		createdHostKeys.push(host.$key as number);

		expect(host.$key).toBeDefined();
		expect(host.host).toBe('test-server');
		expect(host.ip).toBe('10.100.0.50');

		// List by network
		await delay();
		const hosts = await client.networkHosts.listByNetwork(network.$key);
		const found = hosts.find((h) => h.$key === host.$key);
		expect(found).toBeDefined();
		expect(found?.host).toBe('test-server');
	});

	it('should find a host by hostname and by IP', async () => {
		const netName = uniqueName('tsvergeos-host-lookup');
		const network = await client.networks.create({
			name: netName,
			type: 'internal',
		});
		createdNetworkKeys.push(network.$key as number);

		await delay();
		const host = await client.networkHosts.create({
			vnet: network.$key,
			host: 'lookup-test',
			ip: '10.100.0.51',
		});
		createdHostKeys.push(host.$key as number);

		// Find by hostname
		await delay();
		const byHost = await client.networkHosts.getByHost(network.$key, 'lookup-test');
		expect(byHost).toBeDefined();
		expect(byHost?.$key).toBe(host.$key);

		// Find by IP
		await delay();
		const byIP = await client.networkHosts.getByIP(network.$key, '10.100.0.51');
		expect(byIP).toBeDefined();
		expect(byIP?.$key).toBe(host.$key);
	});

	it('should update a host override IP and delete it', async () => {
		const netName = uniqueName('tsvergeos-host-crud');
		const network = await client.networks.create({
			name: netName,
			type: 'internal',
		});
		createdNetworkKeys.push(network.$key as number);

		await delay();
		const host = await client.networkHosts.create({
			vnet: network.$key,
			host: 'crud-host',
			ip: '10.100.0.60',
		});
		createdHostKeys.push(host.$key as number);

		// Update IP
		await delay();
		const updated = await client.networkHosts.update(host.$key, {
			ip: '10.100.0.61',
		});
		expect(updated.ip).toBe('10.100.0.61');
		expect(updated.host).toBe('crud-host');

		// Delete
		await delay();
		await client.networkHosts.delete(host.$key);

		// Remove from cleanup list
		const idx = createdHostKeys.indexOf(host.$key as number);
		if (idx >= 0) createdHostKeys.splice(idx, 1);

		// Verify it's gone from the network's host list
		await delay();
		const remaining = await client.networkHosts.listByNetwork(network.$key);
		const stillThere = remaining.find((h) => h.$key === host.$key);
		expect(stillThere).toBeUndefined();
	});

	// --- DNS Views (list on simple DNS — expect empty or minimal results) ---

	it('should list DNS views by network on an internal network', async () => {
		const netName = uniqueName('tsvergeos-dnsview-net');
		const network = await client.networks.create({
			name: netName,
			type: 'internal',
		});
		createdNetworkKeys.push(network.$key as number);

		// Simple DNS mode — views list should return empty, no error
		await delay();
		const views = await client.networkDnsViews.listByNetwork(network.$key);
		expect(Array.isArray(views)).toBe(true);
	});

	// --- DNS Zone/Record list helpers (expect empty on simple DNS network) ---

	it('should list DNS zones and records without error', async () => {
		// Use global list with a filter that won't match — verifies the service works
		await delay();
		const zones = await client.networkDnsZones.list({
			filter: "domain eq 'nonexistent-tsvergeos-test.local'",
		});
		expect(Array.isArray(zones)).toBe(true);
		expect(zones.length).toBe(0);

		await delay();
		const records = await client.networkDnsRecords.list({
			filter: "host eq 'nonexistent-tsvergeos-test'",
		});
		expect(Array.isArray(records)).toBe(true);
		expect(records.length).toBe(0);
	});
});
