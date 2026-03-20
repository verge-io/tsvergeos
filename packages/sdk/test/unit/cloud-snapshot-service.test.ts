import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { CloudSnapshotService } from '../../src/services/cloud-snapshot/service.js';
import type { CloudSnapshot } from '../../src/services/cloud-snapshot/types.js';
import { CloudSnapshotTenantService } from '../../src/services/cloud-snapshot-tenant/service.js';
import type { CloudSnapshotTenant } from '../../src/services/cloud-snapshot-tenant/types.js';
import { CloudSnapshotVMService } from '../../src/services/cloud-snapshot-vm/service.js';
import type { CloudSnapshotVM } from '../../src/services/cloud-snapshot-vm/types.js';

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

const sampleSnapshot: CloudSnapshot = {
	$key: 1,
	name: 'pre-upgrade',
	description: 'Snapshot before upgrade',
	created: 1700000000,
	expires_type: 'date',
	expires: 1700259200,
	immutable: false,
	immutable_status: 'unlocked',
	status: 'normal',
};

const sampleVM: CloudSnapshotVM = {
	$key: 1,
	cloud_snapshot: 1,
	original_key: 42,
	name: 'web-server',
	description: 'Production web server',
	uuid: 'abc-123',
	machine_uuid: 'def-456',
	cpu_cores: 4,
	ram: 8589934592,
	os_family: 'linux',
	status: 'idle',
};

const sampleTenant: CloudSnapshotTenant = {
	$key: 1,
	cloud_snapshot: 1,
	original_key: 10,
	name: 'tenant-a',
	description: 'Production tenant',
	uuid: 'ghi-789',
	nodes: 2,
	cpu_cores: 8,
	ram: 17179869184,
	status: 'idle',
};

// ---------------------------------------------------------------------------
// CloudSnapshotService Tests
// ---------------------------------------------------------------------------

describe('CloudSnapshotService', () => {
	describe('CRUD', () => {
		it('list() calls /cloud_snapshots', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSnapshot]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshots', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleSnapshot]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleSnapshot);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshots/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleSnapshot);
		});

		it('update() PUTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleSnapshot,
				description: 'updated',
			});

			const result = await svc.update(1, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/cloud_snapshots/1', {
				body: { description: 'updated' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() calls DELETE on /cloud_snapshots/{key}', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/cloud_snapshots/1');
		});
	});

	describe('create override (table action)', () => {
		it('create() POSTs to /cloud_snapshots?action=create and does read-back', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce({ ...sampleSnapshot, $key: 2 });

			const result = await svc.create({ name: 'pre-upgrade' });

			expect(http.post).toHaveBeenCalledWith('/cloud_snapshots?action=create', {
				body: { name: 'pre-upgrade' },
			});
			expect(http.get).toHaveBeenCalledWith('/cloud_snapshots/2', {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(2);
		});

		it('create() with full params sends all fields', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 3 });
			vi.mocked(http.get).mockResolvedValueOnce({ ...sampleSnapshot, $key: 3 });

			await svc.create({
				name: 'full-snap',
				description: 'Full snapshot',
				retention: 604800,
				min_snapshots: 2,
				immutable: true,
				private: true,
			});

			expect(http.post).toHaveBeenCalledWith('/cloud_snapshots?action=create', {
				body: {
					name: 'full-snap',
					description: 'Full snapshot',
					retention: 604800,
					min_snapshots: 2,
					immutable: true,
					private: true,
				},
			});
		});

		it('create() with readBack: false skips GET', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 4 });

			const result = await svc.create({ name: 'quick-snap' }, { readBack: false });

			expect(http.post).toHaveBeenCalledWith('/cloud_snapshots?action=create', {
				body: { name: 'quick-snap' },
			});
			expect(http.get).not.toHaveBeenCalled();
			expect(result.$key).toBe(4);
		});
	});

	describe('actions', () => {
		it('refresh() dispatches to /cloud_snapshot_actions', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refresh(1);

			expect(http.post).toHaveBeenCalledWith('/cloud_snapshot_actions', {
				body: { cloud_snapshot: 1, action: 'refresh' },
			});
		});

		it('clone() dispatches with name param', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.clone(1, 'pre-upgrade-copy');

			expect(http.post).toHaveBeenCalledWith('/cloud_snapshot_actions', {
				body: {
					cloud_snapshot: 1,
					action: 'clone',
					params: { name: 'pre-upgrade-copy' },
				},
			});
		});

		it('requestFromProvider() dispatches request action', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.requestFromProvider(1);

			expect(http.post).toHaveBeenCalledWith('/cloud_snapshot_actions', {
				body: { cloud_snapshot: 1, action: 'request' },
			});
		});

		it('findTenants() dispatches find_tenants action', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.findTenants(1);

			expect(http.post).toHaveBeenCalledWith('/cloud_snapshot_actions', {
				body: { cloud_snapshot: 1, action: 'find_tenants' },
			});
		});

		it('findVMs() dispatches find_vms action', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.findVMs(1);

			expect(http.post).toHaveBeenCalledWith('/cloud_snapshot_actions', {
				body: { cloud_snapshot: 1, action: 'find_vms' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.cloudSnapshots', async () => {
			await import('../../src/services/cloud-snapshot/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.cloudSnapshots).toBeDefined();
			expect(client.cloudSnapshots).toBeInstanceOf(CloudSnapshotService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/cloud-snapshot/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.cloudSnapshots;
			const second = client.cloudSnapshots;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// CloudSnapshotVMService Tests
// ---------------------------------------------------------------------------

describe('CloudSnapshotVMService', () => {
	describe('read operations', () => {
		it('list() calls /cloud_snapshot_vms', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotVMService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVM]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshot_vms', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleVM]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotVMService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleVM);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshot_vms/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleVM);
		});
	});

	describe('listBySnapshot', () => {
		it('filters by cloud_snapshot FK', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotVMService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVM]);

			const result = await svc.listBySnapshot(1);

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshot_vms', {
				params: {
					fields: 'most',
					filter: 'cloud_snapshot eq 1',
				},
			});
			expect(result).toEqual([sampleVM]);
		});

		it('combines snapshot filter with additional filter', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotVMService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVM]);

			await svc.listBySnapshot(1, {
				filter: "os_family eq 'linux'",
			});

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshot_vms', {
				params: {
					fields: 'most',
					filter: "cloud_snapshot eq 1 and os_family eq 'linux'",
				},
			});
		});

		it('passes through other list options', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotVMService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listBySnapshot(5, {
				sort: 'name',
				limit: 10,
			});

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshot_vms', {
				params: {
					fields: 'most',
					filter: 'cloud_snapshot eq 5',
					sort: 'name',
					limit: 10,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.cloudSnapshotVms', async () => {
			await import('../../src/services/cloud-snapshot-vm/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.cloudSnapshotVms).toBeDefined();
			expect(client.cloudSnapshotVms).toBeInstanceOf(CloudSnapshotVMService);
		});
	});
});

// ---------------------------------------------------------------------------
// CloudSnapshotTenantService Tests
// ---------------------------------------------------------------------------

describe('CloudSnapshotTenantService', () => {
	describe('read operations', () => {
		it('list() calls /cloud_snapshot_tenants', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotTenantService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenant]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshot_tenants', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTenant]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotTenantService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenant);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshot_tenants/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleTenant);
		});
	});

	describe('listBySnapshot', () => {
		it('filters by cloud_snapshot FK', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotTenantService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenant]);

			const result = await svc.listBySnapshot(1);

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshot_tenants', {
				params: {
					fields: 'most',
					filter: 'cloud_snapshot eq 1',
				},
			});
			expect(result).toEqual([sampleTenant]);
		});

		it('combines snapshot filter with additional filter', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotTenantService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenant]);

			await svc.listBySnapshot(1, {
				filter: "name eq 'tenant-a'",
			});

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshot_tenants', {
				params: {
					fields: 'most',
					filter: "cloud_snapshot eq 1 and name eq 'tenant-a'",
				},
			});
		});

		it('passes through other list options', async () => {
			const http = mockHttp();
			const svc = new CloudSnapshotTenantService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listBySnapshot(5, {
				sort: 'name',
				limit: 10,
			});

			expect(http.get).toHaveBeenCalledWith('/cloud_snapshot_tenants', {
				params: {
					fields: 'most',
					filter: 'cloud_snapshot eq 5',
					sort: 'name',
					limit: 10,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.cloudSnapshotTenants', async () => {
			await import('../../src/services/cloud-snapshot-tenant/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.cloudSnapshotTenants).toBeDefined();
			expect(client.cloudSnapshotTenants).toBeInstanceOf(CloudSnapshotTenantService);
		});
	});
});
