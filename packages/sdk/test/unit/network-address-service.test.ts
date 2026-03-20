import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { NetworkAddressService } from '../../src/services/network-address/service.js';
import type { NetworkAddress } from '../../src/services/network-address/types.js';

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

const sampleAddress: NetworkAddress = {
	$key: 20,
	vnet: 1,
	mac: 'aa:bb:cc:dd:ee:ff',
	ip: '192.168.1.100',
	type: 'static',
	hostname: 'web-server',
	description: 'Web server static IP',
};

const sampleDynamic: NetworkAddress = {
	$key: 21,
	vnet: 1,
	mac: '00:11:22:33:44:55',
	ip: '192.168.1.50',
	type: 'dynamic',
	hostname: 'dhcp-client',
	expiration: 1700000000,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('NetworkAddressService', () => {
	describe('constructor', () => {
		it('uses /vnet_addresses resource path', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleAddress]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_addresses', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_addresses/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleAddress);

			const result = await svc.get(20);

			expect(http.get).toHaveBeenCalledWith('/vnet_addresses/20', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleAddress);
		});

		it('create() POSTs to /vnet_addresses and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 20 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleAddress);

			const result = await svc.create({
				vnet: 1,
				type: 'static',
				ip: '192.168.1.100',
				mac: 'aa:bb:cc:dd:ee:ff',
				hostname: 'web-server',
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_addresses', {
				body: {
					vnet: 1,
					type: 'static',
					ip: '192.168.1.100',
					mac: 'aa:bb:cc:dd:ee:ff',
					hostname: 'web-server',
				},
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_addresses/20', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleAddress);
		});

		it('update() PUTs to /vnet_addresses/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleAddress,
				hostname: 'updated-host',
			});

			const result = await svc.update(20, { hostname: 'updated-host' });

			expect(http.put).toHaveBeenCalledWith('/vnet_addresses/20', {
				body: { hostname: 'updated-host' },
			});
			expect(result.hostname).toBe('updated-host');
		});

		it('delete() DELETEs /vnet_addresses/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(20);

			expect(http.del).toHaveBeenCalledWith('/vnet_addresses/20');
		});
	});

	describe('listByNetwork', () => {
		it('filters by vnet FK', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleAddress, sampleDynamic]);

			const result = await svc.listByNetwork(1);

			expect(http.get).toHaveBeenCalledWith('/vnet_addresses', {
				params: { fields: 'most', filter: 'vnet eq 1' },
			});
			expect(result).toHaveLength(2);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork('1');

			expect(http.get).toHaveBeenCalledWith('/vnet_addresses', {
				params: { fields: 'most', filter: 'vnet eq 1' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(1, { filter: "hostname eq 'web-server'" });

			expect(http.get).toHaveBeenCalledWith('/vnet_addresses', {
				params: {
					fields: 'most',
					filter: "vnet eq 1 and hostname eq 'web-server'",
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(1, { sort: 'ip', limit: 5 });

			expect(http.get).toHaveBeenCalledWith('/vnet_addresses', {
				params: {
					fields: 'most',
					filter: 'vnet eq 1',
					sort: 'ip',
					limit: 5,
				},
			});
		});
	});

	describe('listByType', () => {
		it('filters by vnet and type', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleAddress]);

			const result = await svc.listByType(1, 'static');

			expect(http.get).toHaveBeenCalledWith('/vnet_addresses', {
				params: {
					fields: 'most',
					filter: "vnet eq 1 and type eq 'static'",
				},
			});
			expect(result).toEqual([sampleAddress]);
		});

		it('filters dynamic addresses', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDynamic]);

			await svc.listByType(1, 'dynamic');

			expect(http.get).toHaveBeenCalledWith('/vnet_addresses', {
				params: {
					fields: 'most',
					filter: "vnet eq 1 and type eq 'dynamic'",
				},
			});
		});

		it('combines with additional filter', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByType(1, 'static', { filter: "ip eq '192.168.1.100'" });

			expect(http.get).toHaveBeenCalledWith('/vnet_addresses', {
				params: {
					fields: 'most',
					filter: "vnet eq 1 and type eq 'static' and ip eq '192.168.1.100'",
				},
			});
		});
	});

	describe('getByIP', () => {
		it('finds address by IP within a network', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleAddress]);

			const result = await svc.getByIP(1, '192.168.1.100');

			expect(http.get).toHaveBeenCalledWith('/vnet_addresses', {
				params: {
					fields: 'most',
					filter: "vnet eq 1 and ip eq '192.168.1.100'",
				},
			});
			expect(result).toEqual(sampleAddress);
		});

		it('returns undefined when IP not found', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.getByIP(1, '10.0.0.99');

			expect(result).toBeUndefined();
		});
	});

	describe('getByMAC', () => {
		it('finds address by MAC within a network', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleAddress]);

			const result = await svc.getByMAC(1, 'aa:bb:cc:dd:ee:ff');

			expect(http.get).toHaveBeenCalledWith('/vnet_addresses', {
				params: {
					fields: 'most',
					filter: "vnet eq 1 and mac eq 'aa:bb:cc:dd:ee:ff'",
				},
			});
			expect(result).toEqual(sampleAddress);
		});

		it('returns undefined when MAC not found', async () => {
			const http = mockHttp();
			const svc = new NetworkAddressService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.getByMAC(1, 'ff:ff:ff:ff:ff:ff');

			expect(result).toBeUndefined();
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.networkAddresses', async () => {
			await import('../../src/services/network-address/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.networkAddresses).toBeDefined();
			expect(client.networkAddresses).toBeInstanceOf(NetworkAddressService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/network-address/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.networkAddresses;
			const second = client.networkAddresses;
			expect(first).toBe(second);
		});
	});
});
