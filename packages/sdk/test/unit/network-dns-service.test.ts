import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { NetworkDnsRecordService } from '../../src/services/network-dns-record/service.js';
import type { NetworkDnsRecord } from '../../src/services/network-dns-record/types.js';
import { NetworkDnsViewService } from '../../src/services/network-dns-view/service.js';
import type { NetworkDnsView } from '../../src/services/network-dns-view/types.js';
import { NetworkDnsZoneService } from '../../src/services/network-dns-zone/service.js';
import type { NetworkDnsZone } from '../../src/services/network-dns-zone/types.js';

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

const sampleView: NetworkDnsView = {
	$key: 1,
	vnet: 10,
	name: 'internal',
	recursion: true,
	match_clients: 'any',
	max_cache_size: 104857600,
	orderid: 1,
	modified: 1700000000,
};

const sampleZone: NetworkDnsZone = {
	$key: 2,
	view: 1,
	domain: 'example.com',
	type: 'master',
	nameserver: 'ns1.example.com',
	email: 'admin@example.com',
	notify: 'yes',
	serial_number: 2024010101,
	default_ttl: '86400',
	modified: 1700000000,
};

const sampleRecord: NetworkDnsRecord = {
	$key: 3,
	zone: 2,
	host: 'www',
	type: 'A',
	value: '192.168.1.100',
	ttl: '3600',
	orderid: 1,
	modified: 1700000000,
};

// ---------------------------------------------------------------------------
// NetworkDnsViewService Tests
// ---------------------------------------------------------------------------

describe('NetworkDnsViewService', () => {
	describe('constructor', () => {
		it('uses /vnet_dns_views resource path', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsViewService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleView]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_views', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_dns_views/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsViewService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleView);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_views/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleView);
		});

		it('create() POSTs to /vnet_dns_views and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsViewService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleView);

			const result = await svc.create({
				vnet: 10,
				name: 'internal',
				recursion: true,
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_dns_views', {
				body: {
					vnet: 10,
					name: 'internal',
					recursion: true,
				},
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_dns_views/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleView);
		});

		it('update() PUTs to /vnet_dns_views/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsViewService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleView,
				name: 'external',
			});

			const result = await svc.update(1, { name: 'external' });

			expect(http.put).toHaveBeenCalledWith('/vnet_dns_views/1', {
				body: { name: 'external' },
			});
			expect(result.name).toBe('external');
		});

		it('delete() DELETEs /vnet_dns_views/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsViewService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/vnet_dns_views/1');
		});
	});

	describe('listByNetwork', () => {
		it('filters by vnet FK', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsViewService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleView]);

			const result = await svc.listByNetwork(10);

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_views', {
				params: { fields: 'most', filter: 'vnet eq 10' },
			});
			expect(result).toEqual([sampleView]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsViewService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork('10');

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_views', {
				params: { fields: 'most', filter: 'vnet eq 10' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsViewService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(10, { filter: "name eq 'internal'" });

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_views', {
				params: {
					fields: 'most',
					filter: "vnet eq 10 and name eq 'internal'",
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsViewService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(10, { sort: 'orderid', limit: 5 });

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_views', {
				params: {
					fields: 'most',
					filter: 'vnet eq 10',
					sort: 'orderid',
					limit: 5,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.networkDnsViews', async () => {
			await import('../../src/services/network-dns-view/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.networkDnsViews).toBeDefined();
			expect(client.networkDnsViews).toBeInstanceOf(NetworkDnsViewService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/network-dns-view/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.networkDnsViews;
			const second = client.networkDnsViews;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// NetworkDnsZoneService Tests
// ---------------------------------------------------------------------------

describe('NetworkDnsZoneService', () => {
	describe('constructor', () => {
		it('uses /vnet_dns_zones resource path', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsZoneService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleZone]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zones', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_dns_zones/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsZoneService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleZone);

			const result = await svc.get(2);

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zones/2', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleZone);
		});

		it('create() POSTs to /vnet_dns_zones with view FK and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsZoneService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleZone);

			const result = await svc.create({
				view: 1,
				domain: 'example.com',
				type: 'master',
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_dns_zones', {
				body: {
					view: 1,
					domain: 'example.com',
					type: 'master',
				},
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zones/2', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleZone);
		});

		it('update() PUTs without view (read-only) and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsZoneService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleZone,
				domain: 'new.example.com',
			});

			const result = await svc.update(2, { domain: 'new.example.com' });

			expect(http.put).toHaveBeenCalledWith('/vnet_dns_zones/2', {
				body: { domain: 'new.example.com' },
			});
			expect(result.domain).toBe('new.example.com');
		});

		it('delete() DELETEs /vnet_dns_zones/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsZoneService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(2);

			expect(http.del).toHaveBeenCalledWith('/vnet_dns_zones/2');
		});
	});

	describe('listByView', () => {
		it('filters by view FK', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsZoneService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleZone]);

			const result = await svc.listByView(1);

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zones', {
				params: { fields: 'most', filter: 'view eq 1' },
			});
			expect(result).toEqual([sampleZone]);
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsZoneService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByView(1, { filter: "type eq 'master'" });

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zones', {
				params: {
					fields: 'most',
					filter: "view eq 1 and type eq 'master'",
				},
			});
		});
	});

	describe('getByDomain', () => {
		it('filters by view and domain, returns first result', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsZoneService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleZone]);

			const result = await svc.getByDomain(1, 'example.com');

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zones', {
				params: {
					fields: 'most',
					filter: "view eq 1 and domain eq 'example.com'",
				},
			});
			expect(result).toEqual(sampleZone);
		});

		it('returns undefined when no zone matches', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsZoneService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.getByDomain(1, 'nonexistent.com');

			expect(result).toBeUndefined();
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.networkDnsZones', async () => {
			await import('../../src/services/network-dns-zone/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.networkDnsZones).toBeDefined();
			expect(client.networkDnsZones).toBeInstanceOf(NetworkDnsZoneService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/network-dns-zone/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.networkDnsZones;
			const second = client.networkDnsZones;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// NetworkDnsRecordService Tests
// ---------------------------------------------------------------------------

describe('NetworkDnsRecordService', () => {
	describe('constructor', () => {
		it('uses /vnet_dns_zone_records resource path', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsRecordService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleRecord]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zone_records', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_dns_zone_records/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsRecordService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleRecord);

			const result = await svc.get(3);

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zone_records/3', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleRecord);
		});

		it('create() POSTs with zone FK and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsRecordService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 3 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleRecord);

			const result = await svc.create({
				zone: 2,
				host: 'www',
				type: 'A',
				value: '192.168.1.100',
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_dns_zone_records', {
				body: {
					zone: 2,
					host: 'www',
					type: 'A',
					value: '192.168.1.100',
				},
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zone_records/3', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleRecord);
		});

		it('update() PUTs without zone (read-only) and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsRecordService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleRecord,
				value: '192.168.1.200',
			});

			const result = await svc.update(3, { value: '192.168.1.200' });

			expect(http.put).toHaveBeenCalledWith('/vnet_dns_zone_records/3', {
				body: { value: '192.168.1.200' },
			});
			expect(result.value).toBe('192.168.1.200');
		});

		it('delete() DELETEs /vnet_dns_zone_records/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsRecordService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(3);

			expect(http.del).toHaveBeenCalledWith('/vnet_dns_zone_records/3');
		});
	});

	describe('listByZone', () => {
		it('filters by zone FK', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsRecordService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleRecord]);

			const result = await svc.listByZone(2);

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zone_records', {
				params: { fields: 'most', filter: 'zone eq 2' },
			});
			expect(result).toEqual([sampleRecord]);
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsRecordService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByZone(2, { filter: "host eq 'www'" });

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zone_records', {
				params: {
					fields: 'most',
					filter: "zone eq 2 and host eq 'www'",
				},
			});
		});
	});

	describe('listByType', () => {
		it('filters by zone and record type', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsRecordService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleRecord]);

			const result = await svc.listByType(2, 'A');

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zone_records', {
				params: {
					fields: 'most',
					filter: "zone eq 2 and type eq 'A'",
				},
			});
			expect(result).toEqual([sampleRecord]);
		});

		it('combines type filter with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsRecordService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByType(2, 'MX', { filter: "host eq 'mail'" });

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zone_records', {
				params: {
					fields: 'most',
					filter: "zone eq 2 and type eq 'MX' and host eq 'mail'",
				},
			});
		});
	});

	describe('getByHostAndType', () => {
		it('filters by zone, host, and type — returns first result', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsRecordService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleRecord]);

			const result = await svc.getByHostAndType(2, 'www', 'A');

			expect(http.get).toHaveBeenCalledWith('/vnet_dns_zone_records', {
				params: {
					fields: 'most',
					filter: "zone eq 2 and host eq 'www' and type eq 'A'",
				},
			});
			expect(result).toEqual(sampleRecord);
		});

		it('returns undefined when no record matches', async () => {
			const http = mockHttp();
			const svc = new NetworkDnsRecordService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.getByHostAndType(2, 'missing', 'A');

			expect(result).toBeUndefined();
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.networkDnsRecords', async () => {
			await import('../../src/services/network-dns-record/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.networkDnsRecords).toBeDefined();
			expect(client.networkDnsRecords).toBeInstanceOf(NetworkDnsRecordService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/network-dns-record/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.networkDnsRecords;
			const second = client.networkDnsRecords;
			expect(first).toBe(second);
		});
	});
});
