import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { NetworkHostService } from '../../src/services/network-host/service.js';
import type { NetworkHost } from '../../src/services/network-host/types.js';

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

const sampleHost: NetworkHost = {
	$key: 5,
	vnet: 1,
	type: 'host',
	host: 'myserver',
	ip: '10.0.0.50',
};

// ---------------------------------------------------------------------------
// NetworkHostService Tests
// ---------------------------------------------------------------------------

describe('NetworkHostService', () => {
	describe('constructor', () => {
		it('uses /vnet_hosts resource path', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleHost]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_hosts', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_hosts/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleHost);

			const result = await svc.get(5);

			expect(http.get).toHaveBeenCalledWith('/vnet_hosts/5', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleHost);
		});

		it('create() POSTs to /vnet_hosts and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 5 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleHost);

			const result = await svc.create({
				vnet: 1,
				host: 'myserver',
				ip: '10.0.0.50',
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_hosts', {
				body: {
					vnet: 1,
					host: 'myserver',
					ip: '10.0.0.50',
				},
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_hosts/5', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleHost);
		});

		it('create() with type=domain', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			const domainHost: NetworkHost = {
				$key: 6,
				vnet: 1,
				type: 'domain',
				host: 'example.local',
				ip: '10.0.0.1',
			};
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 6 });
			vi.mocked(http.get).mockResolvedValueOnce(domainHost);

			const result = await svc.create({
				vnet: 1,
				host: 'example.local',
				ip: '10.0.0.1',
				type: 'domain',
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_hosts', {
				body: {
					vnet: 1,
					host: 'example.local',
					ip: '10.0.0.1',
					type: 'domain',
				},
			});
			expect(result.type).toBe('domain');
		});

		it('update() PUTs to /vnet_hosts/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleHost,
				ip: '10.0.0.100',
			});

			const result = await svc.update(5, { ip: '10.0.0.100' });

			expect(http.put).toHaveBeenCalledWith('/vnet_hosts/5', {
				body: { ip: '10.0.0.100' },
			});
			expect(result.ip).toBe('10.0.0.100');
		});

		it('delete() DELETEs /vnet_hosts/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(5);

			expect(http.del).toHaveBeenCalledWith('/vnet_hosts/5');
		});
	});

	describe('listByNetwork', () => {
		it('filters by vnet FK', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleHost]);

			const result = await svc.listByNetwork(1);

			expect(http.get).toHaveBeenCalledWith('/vnet_hosts', {
				params: { fields: 'most', filter: 'vnet eq 1' },
			});
			expect(result).toEqual([sampleHost]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork('1');

			expect(http.get).toHaveBeenCalledWith('/vnet_hosts', {
				params: { fields: 'most', filter: 'vnet eq 1' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(1, { filter: "type eq 'host'" });

			expect(http.get).toHaveBeenCalledWith('/vnet_hosts', {
				params: {
					fields: 'most',
					filter: "vnet eq 1 and type eq 'host'",
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(1, { sort: 'host', limit: 10 });

			expect(http.get).toHaveBeenCalledWith('/vnet_hosts', {
				params: {
					fields: 'most',
					filter: 'vnet eq 1',
					sort: 'host',
					limit: 10,
				},
			});
		});
	});

	describe('getByHost', () => {
		it('filters by vnet and host, returns first result', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleHost]);

			const result = await svc.getByHost(1, 'myserver');

			expect(http.get).toHaveBeenCalledWith('/vnet_hosts', {
				params: {
					fields: 'most',
					filter: "vnet eq 1 and host eq 'myserver'",
				},
			});
			expect(result).toEqual(sampleHost);
		});

		it('returns undefined when no host matches', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.getByHost(1, 'nonexistent');

			expect(result).toBeUndefined();
		});
	});

	describe('getByIP', () => {
		it('filters by vnet and ip, returns first result', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleHost]);

			const result = await svc.getByIP(1, '10.0.0.50');

			expect(http.get).toHaveBeenCalledWith('/vnet_hosts', {
				params: {
					fields: 'most',
					filter: "vnet eq 1 and ip eq '10.0.0.50'",
				},
			});
			expect(result).toEqual(sampleHost);
		});

		it('returns undefined when no IP matches', async () => {
			const http = mockHttp();
			const svc = new NetworkHostService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.getByIP(1, '10.0.0.99');

			expect(result).toBeUndefined();
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.networkHosts', async () => {
			await import('../../src/services/network-host/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.networkHosts).toBeDefined();
			expect(client.networkHosts).toBeInstanceOf(NetworkHostService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/network-host/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.networkHosts;
			const second = client.networkHosts;
			expect(first).toBe(second);
		});
	});
});
