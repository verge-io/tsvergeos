import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { MachineNicService } from '../../src/services/machine-nic/service.js';
import type { MachineNIC } from '../../src/services/machine-nic/types.js';

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
// Sample NIC resource
// ---------------------------------------------------------------------------

const sampleNic: MachineNIC = {
	$key: 1,
	machine: 42,
	name: 'nic0',
	interface: 'virtio',
	vnet: 5,
	macaddress: '00:50:56:00:00:01',
	ipaddress: '10.0.0.10',
	enabled: true,
	disable_mq: false,
	orderid: 0,
	description: 'Primary NIC',
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('MachineNicService', () => {
	describe('constructor', () => {
		it('uses /machine_nics resource path', async () => {
			const http = mockHttp();
			const svc = new MachineNicService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNic]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_nics', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('list() calls /machine_nics', async () => {
			const http = mockHttp();
			const svc = new MachineNicService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNic]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_nics', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleNic]);
		});

		it('get() calls /machine_nics/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineNicService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleNic);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/machine_nics/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleNic);
		});

		it('create() POSTs to /machine_nics and does read-back', async () => {
			const http = mockHttp();
			const svc = new MachineNicService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleNic);

			const result = await svc.create({
				machine: 42,
				name: 'nic0',
				interface: 'virtio',
				vnet: 5,
			});

			expect(http.post).toHaveBeenCalledWith('/machine_nics', {
				body: { machine: 42, name: 'nic0', interface: 'virtio', vnet: 5 },
			});
			expect(http.get).toHaveBeenCalledWith('/machine_nics/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleNic);
		});

		it('update() PUTs to /machine_nics/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new MachineNicService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleNic,
				description: 'updated',
			});

			const result = await svc.update(1, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/machine_nics/1', {
				body: { description: 'updated' },
			});
			expect(http.get).toHaveBeenCalledWith('/machine_nics/1', {
				params: { fields: 'most' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() DELETEs /machine_nics/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineNicService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/machine_nics/1');
		});
	});

	describe('listByMachine', () => {
		it('filters by machine FK', async () => {
			const http = mockHttp();
			const svc = new MachineNicService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNic]);

			const result = await svc.listByMachine(42);

			expect(http.get).toHaveBeenCalledWith('/machine_nics', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
			expect(result).toEqual([sampleNic]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new MachineNicService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine('42');

			expect(http.get).toHaveBeenCalledWith('/machine_nics', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new MachineNicService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine(42, { filter: "name eq 'nic0'" });

			expect(http.get).toHaveBeenCalledWith('/machine_nics', {
				params: {
					fields: 'most',
					filter: "machine eq 42 and name eq 'nic0'",
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new MachineNicService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine(42, { sort: 'orderid', limit: 5 });

			expect(http.get).toHaveBeenCalledWith('/machine_nics', {
				params: {
					fields: 'most',
					filter: 'machine eq 42',
					sort: 'orderid',
					limit: 5,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineNics', async () => {
			await import('../../src/services/machine-nic/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineNics).toBeDefined();
			expect(client.machineNics).toBeInstanceOf(MachineNicService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/machine-nic/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.machineNics;
			const second = client.machineNics;
			expect(first).toBe(second);
		});
	});
});
