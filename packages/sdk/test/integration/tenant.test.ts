import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/tenant/index.js';
import '../../src/services/tenant-node/index.js';
import '../../src/services/tenant-storage/index.js';
import '../../src/services/tenant-snapshot/index.js';
import '../../src/services/tenant-layer2/index.js';
import type { Tenant } from '../../src/services/tenant/types.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Tenant service integration', () => {
	let client: VergeClient;
	let firstTenant: Tenant | undefined;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);

		// Fetch tenants once for use across tests
		await delay();
		const tenants = await client.tenants.list();
		if (tenants.length > 0) {
			firstTenant = tenants[0];
		}
	});

	// ─── Tenants ─────────────────────────────────────────────────────────

	it('should list tenants', async () => {
		await delay();
		const tenants = await client.tenants.list();

		expect(Array.isArray(tenants)).toBe(true);
		// System may or may not have tenants configured
		expect(tenants.length).toBeGreaterThanOrEqual(0);

		for (const tenant of tenants) {
			expect(tenant.$key).toBeDefined();
			expect(typeof tenant.name).toBe('string');
			expect(tenant.name.length).toBeGreaterThan(0);
		}
	});

	it('should get a tenant by key', async () => {
		if (!firstTenant) return;

		await delay();
		const tenant = await client.tenants.get(firstTenant.$key);

		expect(tenant.$key).toBe(firstTenant.$key);
		expect(tenant.name).toBe(firstTenant.name);
		expect(typeof tenant.name).toBe('string');
	});

	it('should get a tenant by name', async () => {
		if (!firstTenant) return;

		await delay();
		const tenant = await client.tenants.getByName(firstTenant.name);

		expect(tenant.$key).toBe(firstTenant.$key);
		expect(tenant.name).toBe(firstTenant.name);
	});

	it('should list tenants with a filter', async () => {
		if (!firstTenant) return;

		await delay();
		const tenants = await client.tenants.list({
			filter: `name eq '${firstTenant.name}'`,
		});

		expect(tenants.length).toBe(1);
		expect(tenants[0].$key).toBe(firstTenant.$key);
	});

	it('should have expected tenant fields', async () => {
		if (!firstTenant) return;

		await delay();
		const tenant = await client.tenants.get(firstTenant.$key);

		// Required fields
		expect(tenant.$key).toBeDefined();
		expect(typeof tenant.name).toBe('string');

		// Common optional fields should be present (may be undefined but not missing from type)
		// Just verify the shape is correct — these are read-only fields the API returns
		if (tenant.created !== undefined) {
			expect(typeof tenant.created).toBe('number');
		}
		if (tenant.uuid !== undefined) {
			expect(typeof tenant.uuid).toBe('string');
		}
		if (tenant.url !== undefined) {
			expect(typeof tenant.url).toBe('string');
		}
	});

	// ─── Tenant Nodes ────────────────────────────────────────────────────

	it('should list tenant nodes', async () => {
		await delay();
		const nodes = await client.tenantNodes.list();

		expect(Array.isArray(nodes)).toBe(true);

		for (const node of nodes) {
			expect(node.$key).toBeDefined();
			expect(node.tenant).toBeDefined();
		}
	});

	it('should list tenant nodes by tenant', async () => {
		if (!firstTenant) return;

		await delay();
		const nodes = await client.tenantNodes.listByTenant(firstTenant.$key);

		expect(Array.isArray(nodes)).toBe(true);

		for (const node of nodes) {
			expect(String(node.tenant)).toBe(String(firstTenant.$key));
		}
	});

	it('should have expected tenant node fields', async () => {
		if (!firstTenant) return;

		await delay();
		const nodes = await client.tenantNodes.listByTenant(firstTenant.$key);

		if (nodes.length === 0) return;

		const node = nodes[0];
		expect(node.$key).toBeDefined();
		expect(node.tenant).toBeDefined();

		// CPU and RAM are core fields for tenant nodes
		if (node.cpu_cores !== undefined) {
			expect(typeof node.cpu_cores).toBe('number');
			expect(node.cpu_cores).toBeGreaterThan(0);
		}
		if (node.ram !== undefined) {
			expect(typeof node.ram).toBe('number');
			expect(node.ram).toBeGreaterThan(0);
		}
	});

	// ─── Tenant Storage ──────────────────────────────────────────────────

	it('should list tenant storage', async () => {
		await delay();
		const storage = await client.tenantStorage.list();

		expect(Array.isArray(storage)).toBe(true);

		for (const s of storage) {
			expect(s.$key).toBeDefined();
			expect(s.tenant).toBeDefined();
		}
	});

	it('should list tenant storage by tenant', async () => {
		if (!firstTenant) return;

		await delay();
		const storage = await client.tenantStorage.listByTenant(firstTenant.$key);

		expect(Array.isArray(storage)).toBe(true);

		for (const s of storage) {
			expect(String(s.tenant)).toBe(String(firstTenant.$key));
		}
	});

	it('should have expected tenant storage fields', async () => {
		if (!firstTenant) return;

		await delay();
		const storage = await client.tenantStorage.listByTenant(firstTenant.$key);

		if (storage.length === 0) return;

		const s = storage[0];
		expect(s.$key).toBeDefined();
		expect(s.tenant).toBeDefined();
		expect(s.tier).toBeDefined();

		if (s.provisioned !== undefined) {
			expect(typeof s.provisioned).toBe('number');
		}
	});

	// ─── Tenant Snapshots ────────────────────────────────────────────────

	it('should list tenant snapshots', async () => {
		await delay();
		const snapshots = await client.tenantSnapshots.list();

		expect(Array.isArray(snapshots)).toBe(true);

		for (const snap of snapshots) {
			expect(snap.$key).toBeDefined();
			expect(snap.tenant).toBeDefined();
		}
	});

	it('should list tenant snapshots by tenant', async () => {
		if (!firstTenant) return;

		await delay();
		const snapshots = await client.tenantSnapshots.listByTenant(firstTenant.$key);

		expect(Array.isArray(snapshots)).toBe(true);

		for (const snap of snapshots) {
			expect(String(snap.tenant)).toBe(String(firstTenant.$key));
		}
	});

	it('should have expected tenant snapshot fields', async () => {
		await delay();
		const snapshots = await client.tenantSnapshots.list({ limit: 1 });

		if (snapshots.length === 0) return;

		const snap = snapshots[0];
		expect(snap.$key).toBeDefined();
		expect(snap.tenant).toBeDefined();

		if (snap.expires !== undefined) {
			expect(typeof snap.expires).toBe('number');
		}
		if (snap.created !== undefined) {
			expect(typeof snap.created).toBe('number');
		}
	});

	// ─── Tenant Layer 2 Networks ─────────────────────────────────────────

	it('should list tenant layer 2 networks', async () => {
		await delay();
		const l2nets = await client.tenantLayer2Networks.list();

		expect(Array.isArray(l2nets)).toBe(true);

		for (const l2 of l2nets) {
			expect(l2.$key).toBeDefined();
			expect(l2.tenant).toBeDefined();
			expect(l2.vnet).toBeDefined();
		}
	});

	it('should list tenant layer 2 networks by tenant', async () => {
		if (!firstTenant) return;

		await delay();
		const l2nets = await client.tenantLayer2Networks.listByTenant(firstTenant.$key);

		expect(Array.isArray(l2nets)).toBe(true);

		for (const l2 of l2nets) {
			expect(String(l2.tenant)).toBe(String(firstTenant.$key));
		}
	});

	it('should have expected tenant layer 2 fields', async () => {
		await delay();
		const l2nets = await client.tenantLayer2Networks.list({ limit: 1 });

		if (l2nets.length === 0) return;

		const l2 = l2nets[0];
		expect(l2.$key).toBeDefined();
		expect(l2.tenant).toBeDefined();
		expect(l2.vnet).toBeDefined();

		if (l2.enabled !== undefined) {
			expect(typeof l2.enabled).toBe('boolean');
		}
	});
});
