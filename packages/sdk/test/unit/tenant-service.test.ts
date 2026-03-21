import { describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../src/errors.js';
import type { HttpClient } from '../../src/http.js';
import { TenantService } from '../../src/services/tenant/service.js';
import type { Tenant } from '../../src/services/tenant/types.js';
import { TenantLayer2Service } from '../../src/services/tenant-layer2/service.js';
import type { TenantLayer2Network } from '../../src/services/tenant-layer2/types.js';
import { TenantNodeService } from '../../src/services/tenant-node/service.js';
import type { TenantNode } from '../../src/services/tenant-node/types.js';
import { TenantSnapshotService } from '../../src/services/tenant-snapshot/service.js';
import type { TenantSnapshot } from '../../src/services/tenant-snapshot/types.js';
import { TenantStorageService } from '../../src/services/tenant-storage/service.js';
import type { TenantStorage } from '../../src/services/tenant-storage/types.js';

// ---------------------------------------------------------------------------
// Mock HttpClient factory
// ---------------------------------------------------------------------------

function mockHttp(host = 'https://verge.example.com'): HttpClient {
	return {
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
		del: vi.fn(),
		host,
	} as unknown as HttpClient;
}

// ---------------------------------------------------------------------------
// Sample resources
// ---------------------------------------------------------------------------

const sampleTenant: Tenant = {
	$key: 1,
	name: 'test-tenant',
	description: 'A test tenant',
	url: 'https://tenant1.example.com',
	password: 'secret',
	expose_cloud_snapshots: true,
	allow_branding: false,
	theme_access: 'host_only',
};

const sampleTenantNode: TenantNode = {
	$key: 10,
	tenant: 1,
	name: 'node-1',
	description: 'First tenant node',
	enabled: true,
	cpu_cores: 4,
	ram: 16384,
	on_power_loss: 'last_state',
};

const sampleTenantStorage: TenantStorage = {
	$key: 20,
	tenant: 1,
	tier: 5,
	provisioned: 1073741824,
	used: 536870912,
	allocated: 268435456,
};

const sampleTenantSnapshot: TenantSnapshot = {
	$key: 30,
	tenant: 1,
	name: 'snap-2025-01-01',
	profile: 'daily',
	description: 'Daily snapshot',
	expires: 1735689600,
};

const sampleTenantLayer2: TenantLayer2Network = {
	$key: 40,
	tenant: 1,
	vnet: 100,
	enabled: true,
};

// ===========================================================================
// TenantService
// ===========================================================================

describe('TenantService', () => {
	describe('CRUD', () => {
		it('list() calls /tenants', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenant]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tenants', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTenant]);
		});

		it('get() calls /tenants/{key}', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenant);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/tenants/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleTenant);
		});

		it('create() POSTs to /tenants and does read-back', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenant);

			const result = await svc.create({ name: 'test-tenant' });

			expect(http.post).toHaveBeenCalledWith('/tenants', {
				body: { name: 'test-tenant' },
			});
			expect(http.get).toHaveBeenCalledWith('/tenants/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleTenant);
		});

		it('update() PUTs to /tenants/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTenant,
				description: 'updated',
			});

			const result = await svc.update(1, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/tenants/1', {
				body: { description: 'updated' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() DELETEs /tenants/{key}', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/tenants/1');
		});
	});

	describe('power operations', () => {
		it('powerOn dispatches to /tenant_actions with action poweron', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOn(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'poweron' },
			});
		});

		it('powerOff dispatches with action poweroff', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOff(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'poweroff' },
			});
		});

		it('reset dispatches with action reset', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.reset(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'reset' },
			});
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOn('1');

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: '1', action: 'poweron' },
			});
		});
	});

	describe('clone', () => {
		it('dispatches clone action without options', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.clone(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'clone' },
			});
		});

		it('passes clone options in params', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.clone(1, { name: 'clone-1', no_vnet: true, no_storage: false });

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: {
					tenant: 1,
					action: 'clone',
					params: { name: 'clone-1', no_vnet: true, no_storage: false },
				},
			});
		});
	});

	describe('isolation', () => {
		it('isolateOn dispatches isolateon action', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.isolateOn(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'isolateon' },
			});
		});

		it('isolateOff dispatches isolateoff action', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.isolateOff(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'isolateoff' },
			});
		});
	});

	describe('refreshStatus', () => {
		it('dispatches refresh_status action', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refreshStatus(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'refresh_status' },
			});
		});
	});

	describe('connect', () => {
		it('creates a new VergeClient with tenant URL', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenant);

			const tenantClient = await svc.connect(1, {
				apiKey: 'tenant-key',
			});

			expect(http.get).toHaveBeenCalledWith('/tenants/1', {
				params: { fields: 'most' },
			});
			// The returned client should have the tenant's host
			expect(tenantClient).toBeDefined();
		});

		it('throws ValidationError when tenant has no URL', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTenant,
				url: '',
			});

			await expect(svc.connect(1, { apiKey: 'key' })).rejects.toThrow(/no URL configured/);
		});

		it('throws ValidationError when tenant URL is undefined', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTenant,
				url: undefined,
			});

			await expect(svc.connect(1, { apiKey: 'key' })).rejects.toThrow(/no URL configured/);
		});
	});

	describe('deployCrashCart', () => {
		it('finds Crash Cart recipe and deploys it with tenant ID', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			const recipeKey = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2';

			// First call: list vm_recipes filtered by name
			vi.mocked(http.get).mockResolvedValueOnce([{ $key: recipeKey, name: 'Crash Cart' }]);
			// Second call: POST to vm_recipe_instances
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.deployCrashCart(1);

			expect(http.get).toHaveBeenCalledWith('/vm_recipes', {
				params: { filter: "name eq 'Crash Cart'" },
			});
			expect(http.post).toHaveBeenCalledWith('/vm_recipe_instances', {
				body: {
					recipe: recipeKey,
					name: 'Crash Cart',
					answers: { tenant: 1 },
				},
			});
		});

		it('throws NotFoundError when Crash Cart recipe is not available', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);

			// Return empty array — no recipe found
			vi.mocked(http.get).mockResolvedValue([]);

			const err = await svc.deployCrashCart(1).catch((e: unknown) => e);

			expect(err).toBeInstanceOf(NotFoundError);
			expect((err as Error).message).toMatch(/Crash Cart recipe not found/);
		});
	});

	describe('deleteCrashCart', () => {
		it('finds crash cart VM by name and deletes it', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);

			// First call: get tenant by ID
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenant);
			// Second call: list VMs filtered by crash cart name
			vi.mocked(http.get).mockResolvedValueOnce([{ $key: 99, name: 'Crash Cart - test-tenant' }]);
			// Third call: delete VM
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.deleteCrashCart(1);

			expect(http.get).toHaveBeenCalledWith('/tenants/1', {
				params: { fields: 'most' },
			});
			expect(http.get).toHaveBeenCalledWith('/vms', {
				params: { filter: "name eq 'Crash Cart - test-tenant'" },
			});
			expect(http.del).toHaveBeenCalledWith('/vms/99');
		});

		it('throws NotFoundError when no crash cart VM exists', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);

			vi.mocked(http.get).mockResolvedValueOnce(sampleTenant);
			vi.mocked(http.get).mockResolvedValueOnce([]); // no VMs found

			const err = await svc.deleteCrashCart(1).catch((e: unknown) => e);

			expect(err).toBeInstanceOf(NotFoundError);
			expect((err as Error).message).toMatch(/No crash cart VM found/);
		});
	});

	describe('additional actions', () => {
		it('execute dispatches execute action', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.execute(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'execute' },
			});
		});

		it('execute passes optional params', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.execute(1, { command: 'ls' });

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'execute', params: { command: 'ls' } },
			});
		});

		it('restore dispatches restore action', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.restore(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'restore' },
			});
		});

		it('convertCloudSnapshot dispatches convert_cloud_snapshot action', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.convertCloudSnapshot(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'convert_cloud_snapshot' },
			});
		});

		it('recoverCloudSnapshot dispatches recover_cloudsnapshot action', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.recoverCloudSnapshot(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'recover_cloudsnapshot' },
			});
		});

		it('giveFile dispatches give_file action with file option', async () => {
			const http = mockHttp();
			const svc = new TenantService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.giveFile(1, { file: 42 });

			expect(http.post).toHaveBeenCalledWith('/tenant_actions', {
				body: { tenant: 1, action: 'give_file', params: { file: 42 } },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tenants', async () => {
			await import('../../src/services/tenant/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tenants).toBeDefined();
			expect(client.tenants).toBeInstanceOf(TenantService);
		});
	});
});

// ===========================================================================
// TenantNodeService
// ===========================================================================

describe('TenantNodeService', () => {
	describe('CRUD', () => {
		it('list() calls /tenant_nodes', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenantNode]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tenant_nodes', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTenantNode]);
		});

		it('get() calls /tenant_nodes/{key}', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenantNode);

			const result = await svc.get(10);

			expect(http.get).toHaveBeenCalledWith('/tenant_nodes/10', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleTenantNode);
		});

		it('create() POSTs to /tenant_nodes and does read-back', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 10 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenantNode);

			const result = await svc.create({ tenant: 1, cpu_cores: 4, ram: 16384 });

			expect(http.post).toHaveBeenCalledWith('/tenant_nodes', {
				body: { tenant: 1, cpu_cores: 4, ram: 16384 },
			});
			expect(http.get).toHaveBeenCalledWith('/tenant_nodes/10', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleTenantNode);
		});

		it('update() PUTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTenantNode,
				cpu_cores: 8,
			});

			const result = await svc.update(10, { cpu_cores: 8 });

			expect(http.put).toHaveBeenCalledWith('/tenant_nodes/10', {
				body: { cpu_cores: 8 },
			});
			expect(result.cpu_cores).toBe(8);
		});

		it('delete() DELETEs /tenant_nodes/{key}', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(10);

			expect(http.del).toHaveBeenCalledWith('/tenant_nodes/10');
		});
	});

	describe('power operations', () => {
		it('powerOn dispatches to /tenant_node_actions', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOn(10);

			expect(http.post).toHaveBeenCalledWith('/tenant_node_actions', {
				body: { tenant_node: 10, action: 'poweron' },
			});
		});

		it('powerOff dispatches with action poweroff', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOff(10);

			expect(http.post).toHaveBeenCalledWith('/tenant_node_actions', {
				body: { tenant_node: 10, action: 'poweroff' },
			});
		});

		it('reset dispatches with action reset', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.reset(10);

			expect(http.post).toHaveBeenCalledWith('/tenant_node_actions', {
				body: { tenant_node: 10, action: 'reset' },
			});
		});

		it('kill dispatches with action kill', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.kill(10);

			expect(http.post).toHaveBeenCalledWith('/tenant_node_actions', {
				body: { tenant_node: 10, action: 'kill' },
			});
		});

		it('migrate dispatches without target node', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.migrate(10);

			expect(http.post).toHaveBeenCalledWith('/tenant_node_actions', {
				body: { tenant_node: 10, action: 'migrate' },
			});
		});

		it('migrate dispatches with target node param', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.migrate(10, 3);

			expect(http.post).toHaveBeenCalledWith('/tenant_node_actions', {
				body: {
					tenant_node: 10,
					action: 'migrate',
					params: { preferred_node: 3 },
				},
			});
		});
	});

	describe('additional actions', () => {
		it('powerOnMigrate dispatches poweronmigrate action', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOnMigrate(10);

			expect(http.post).toHaveBeenCalledWith('/tenant_node_actions', {
				body: { tenant_node: 10, action: 'poweronmigrate' },
			});
		});

		it('powerOffMaintenance dispatches poweroffmaintenance action', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOffMaintenance(10);

			expect(http.post).toHaveBeenCalledWith('/tenant_node_actions', {
				body: { tenant_node: 10, action: 'poweroffmaintenance' },
			});
		});

		it('refresh dispatches refresh action', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refresh(10);

			expect(http.post).toHaveBeenCalledWith('/tenant_node_actions', {
				body: { tenant_node: 10, action: 'refresh' },
			});
		});

		it('execute dispatches execute action', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.execute(10);

			expect(http.post).toHaveBeenCalledWith('/tenant_node_actions', {
				body: { tenant_node: 10, action: 'execute' },
			});
		});

		it('execute passes optional params', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.execute(10, { command: 'ls' });

			expect(http.post).toHaveBeenCalledWith('/tenant_node_actions', {
				body: { tenant_node: 10, action: 'execute', params: { command: 'ls' } },
			});
		});
	});

	describe('listByTenant', () => {
		it('applies tenant filter', async () => {
			const http = mockHttp();
			const svc = new TenantNodeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenantNode]);

			const result = await svc.listByTenant(1);

			expect(http.get).toHaveBeenCalledWith('/tenant_nodes', {
				params: { fields: 'most', filter: 'tenant eq 1' },
			});
			expect(result).toEqual([sampleTenantNode]);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tenantNodes', async () => {
			await import('../../src/services/tenant-node/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tenantNodes).toBeDefined();
			expect(client.tenantNodes).toBeInstanceOf(TenantNodeService);
		});
	});
});

// ===========================================================================
// TenantStorageService
// ===========================================================================

describe('TenantStorageService', () => {
	describe('CRUD', () => {
		it('list() calls /tenant_storage', async () => {
			const http = mockHttp();
			const svc = new TenantStorageService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenantStorage]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tenant_storage', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTenantStorage]);
		});

		it('create() POSTs to /tenant_storage and does read-back', async () => {
			const http = mockHttp();
			const svc = new TenantStorageService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 20 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenantStorage);

			const result = await svc.create({
				tenant: 1,
				tier: 5,
				provisioned: 1073741824,
			});

			expect(http.post).toHaveBeenCalledWith('/tenant_storage', {
				body: { tenant: 1, tier: 5, provisioned: 1073741824 },
			});
			expect(result).toEqual(sampleTenantStorage);
		});

		it('update() only allows changing provisioned', async () => {
			const http = mockHttp();
			const svc = new TenantStorageService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTenantStorage,
				provisioned: 2147483648,
			});

			const result = await svc.update(20, { provisioned: 2147483648 });

			expect(http.put).toHaveBeenCalledWith('/tenant_storage/20', {
				body: { provisioned: 2147483648 },
			});
			expect(result.provisioned).toBe(2147483648);
		});

		it('delete() DELETEs /tenant_storage/{key}', async () => {
			const http = mockHttp();
			const svc = new TenantStorageService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(20);

			expect(http.del).toHaveBeenCalledWith('/tenant_storage/20');
		});
	});

	describe('listByTenant', () => {
		it('applies tenant filter', async () => {
			const http = mockHttp();
			const svc = new TenantStorageService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenantStorage]);

			const result = await svc.listByTenant(1);

			expect(http.get).toHaveBeenCalledWith('/tenant_storage', {
				params: { fields: 'most', filter: 'tenant eq 1' },
			});
			expect(result).toEqual([sampleTenantStorage]);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tenantStorage', async () => {
			await import('../../src/services/tenant-storage/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tenantStorage).toBeDefined();
			expect(client.tenantStorage).toBeInstanceOf(TenantStorageService);
		});
	});
});

// ===========================================================================
// TenantSnapshotService
// ===========================================================================

describe('TenantSnapshotService', () => {
	describe('read/update/delete (no create)', () => {
		it('list() calls /tenant_snapshots', async () => {
			const http = mockHttp();
			const svc = new TenantSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenantSnapshot]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tenant_snapshots', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTenantSnapshot]);
		});

		it('get() calls /tenant_snapshots/{key}', async () => {
			const http = mockHttp();
			const svc = new TenantSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenantSnapshot);

			const result = await svc.get(30);

			expect(http.get).toHaveBeenCalledWith('/tenant_snapshots/30', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleTenantSnapshot);
		});

		it('update() PUTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new TenantSnapshotService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTenantSnapshot,
				description: 'updated',
			});

			const result = await svc.update(30, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/tenant_snapshots/30', {
				body: { description: 'updated' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() DELETEs /tenant_snapshots/{key}', async () => {
			const http = mockHttp();
			const svc = new TenantSnapshotService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(30);

			expect(http.del).toHaveBeenCalledWith('/tenant_snapshots/30');
		});

		it('has no create method', () => {
			const http = mockHttp();
			const svc = new TenantSnapshotService(http);

			// WritableService does not expose create()
			expect('create' in svc).toBe(false);
		});
	});

	describe('refresh', () => {
		it('dispatches refresh to /tenant_snapshot_actions keyed by tenant', async () => {
			const http = mockHttp();
			const svc = new TenantSnapshotService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refresh(1);

			expect(http.post).toHaveBeenCalledWith('/tenant_snapshot_actions', {
				body: { tenant: 1, action: 'refresh' },
			});
		});
	});

	describe('convenience methods', () => {
		it('setNeverExpires updates with expires: 0', async () => {
			const http = mockHttp();
			const svc = new TenantSnapshotService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTenantSnapshot,
				expires: 0,
			});

			const result = await svc.setNeverExpires(30);

			expect(http.put).toHaveBeenCalledWith('/tenant_snapshots/30', {
				body: { expires: 0 },
			});
			expect(result.expires).toBe(0);
		});

		it('setExpires updates with given timestamp', async () => {
			const http = mockHttp();
			const svc = new TenantSnapshotService(http);
			const newExpires = 1735776000;
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTenantSnapshot,
				expires: newExpires,
			});

			const result = await svc.setExpires(30, newExpires);

			expect(http.put).toHaveBeenCalledWith('/tenant_snapshots/30', {
				body: { expires: newExpires },
			});
			expect(result.expires).toBe(newExpires);
		});
	});

	describe('listByTenant', () => {
		it('applies tenant filter', async () => {
			const http = mockHttp();
			const svc = new TenantSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenantSnapshot]);

			const result = await svc.listByTenant(1);

			expect(http.get).toHaveBeenCalledWith('/tenant_snapshots', {
				params: { fields: 'most', filter: 'tenant eq 1' },
			});
			expect(result).toEqual([sampleTenantSnapshot]);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tenantSnapshots', async () => {
			await import('../../src/services/tenant-snapshot/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tenantSnapshots).toBeDefined();
			expect(client.tenantSnapshots).toBeInstanceOf(TenantSnapshotService);
		});
	});
});

// ===========================================================================
// TenantLayer2Service
// ===========================================================================

describe('TenantLayer2Service', () => {
	describe('CRUD', () => {
		it('list() calls /tenant_layer2_vnets', async () => {
			const http = mockHttp();
			const svc = new TenantLayer2Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenantLayer2]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tenant_layer2_vnets', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTenantLayer2]);
		});

		it('create() POSTs to /tenant_layer2_vnets and does read-back', async () => {
			const http = mockHttp();
			const svc = new TenantLayer2Service(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 40 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenantLayer2);

			const result = await svc.create({ tenant: 1, vnet: 100 });

			expect(http.post).toHaveBeenCalledWith('/tenant_layer2_vnets', {
				body: { tenant: 1, vnet: 100 },
			});
			expect(result).toEqual(sampleTenantLayer2);
		});

		it('update() PUTs with enabled field', async () => {
			const http = mockHttp();
			const svc = new TenantLayer2Service(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTenantLayer2,
				enabled: false,
			});

			const result = await svc.update(40, { enabled: false });

			expect(http.put).toHaveBeenCalledWith('/tenant_layer2_vnets/40', {
				body: { enabled: false },
			});
			expect(result.enabled).toBe(false);
		});

		it('delete() DELETEs /tenant_layer2_vnets/{key}', async () => {
			const http = mockHttp();
			const svc = new TenantLayer2Service(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(40);

			expect(http.del).toHaveBeenCalledWith('/tenant_layer2_vnets/40');
		});
	});

	describe('enable/disable', () => {
		it('enable() updates with enabled: true', async () => {
			const http = mockHttp();
			const svc = new TenantLayer2Service(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTenantLayer2,
				enabled: true,
			});

			const result = await svc.enable(40);

			expect(http.put).toHaveBeenCalledWith('/tenant_layer2_vnets/40', {
				body: { enabled: true },
			});
			expect(result.enabled).toBe(true);
		});

		it('disable() updates with enabled: false', async () => {
			const http = mockHttp();
			const svc = new TenantLayer2Service(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTenantLayer2,
				enabled: false,
			});

			const result = await svc.disable(40);

			expect(http.put).toHaveBeenCalledWith('/tenant_layer2_vnets/40', {
				body: { enabled: false },
			});
			expect(result.enabled).toBe(false);
		});
	});

	describe('listByTenant', () => {
		it('applies tenant filter', async () => {
			const http = mockHttp();
			const svc = new TenantLayer2Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenantLayer2]);

			const result = await svc.listByTenant(1);

			expect(http.get).toHaveBeenCalledWith('/tenant_layer2_vnets', {
				params: { fields: 'most', filter: 'tenant eq 1' },
			});
			expect(result).toEqual([sampleTenantLayer2]);
		});
	});

	describe('listByNetwork', () => {
		it('applies vnet filter', async () => {
			const http = mockHttp();
			const svc = new TenantLayer2Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenantLayer2]);

			const result = await svc.listByNetwork(100);

			expect(http.get).toHaveBeenCalledWith('/tenant_layer2_vnets', {
				params: { fields: 'most', filter: 'vnet eq 100' },
			});
			expect(result).toEqual([sampleTenantLayer2]);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tenantLayer2Networks', async () => {
			await import('../../src/services/tenant-layer2/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tenantLayer2Networks).toBeDefined();
			expect(client.tenantLayer2Networks).toBeInstanceOf(TenantLayer2Service);
		});
	});
});
