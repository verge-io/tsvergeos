import { describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../src/errors.js';
import type { HttpClient } from '../../src/http.js';
import { IPSecService } from '../../src/services/ipsec/service.js';
import type { IPSec } from '../../src/services/ipsec/types.js';
import { IPSecConnectionService } from '../../src/services/ipsec-connection/service.js';
import type { IPSecConnection } from '../../src/services/ipsec-connection/types.js';
import { IPSecPhase1Service } from '../../src/services/ipsec-phase1/service.js';
import type { IPSecPhase1 } from '../../src/services/ipsec-phase1/types.js';
import { IPSecPhase2Service } from '../../src/services/ipsec-phase2/service.js';
import type { IPSecPhase2 } from '../../src/services/ipsec-phase2/types.js';

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

const sampleIPSec: IPSec = {
	$key: 1,
	vnet: 10,
	enabled: true,
	mode: 'normal',
	uniqueids: 'yes',
	compress: false,
	exclude_network: true,
	modified: 1700000000,
};

const samplePhase1: IPSecPhase1 = {
	$key: 5,
	ipsec: 1,
	enabled: true,
	name: 'site-to-site',
	remote_gateway: '203.0.113.1',
	ike: 'aes256-sha256-modp2048',
	keyexchange: 'ikev2',
	auth: 'psk',
	auto: 'route',
	dpdaction: 'restart',
	dpddelay: 30,
	ikelifetime: 10800,
	modified: 1700000000,
};

const samplePhase2: IPSecPhase2 = {
	$key: 20,
	phase1: 5,
	enabled: true,
	name: 'lan-to-lan',
	local: '192.168.1.0/24',
	remote: '10.0.0.0/24',
	ciphers: 'aes128-sha256-modp2048',
	mode: 'tunnel',
	protocol: 'esp',
	lifetime: 3600,
	modified: 1700000000,
};

const sampleConnection: IPSecConnection = {
	$key: 100,
	vnet: 10,
	phase1: 5,
	phase2: 20,
	uniqueid: 42,
	local: '198.51.100.1',
	remote: '203.0.113.1',
	local_network: '192.168.1.0/24',
	remote_network: '10.0.0.0/24',
	protocol: 'ESP',
	created: 1700000000,
};

// ---------------------------------------------------------------------------
// IPSecService Tests
// ---------------------------------------------------------------------------

describe('IPSecService', () => {
	describe('constructor', () => {
		it('uses /vnet_ipsecs resource path', async () => {
			const http = mockHttp();
			const svc = new IPSecService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleIPSec]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsecs', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_ipsecs/{key}', async () => {
			const http = mockHttp();
			const svc = new IPSecService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleIPSec);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsecs/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleIPSec);
		});

		it('create() POSTs to /vnet_ipsecs and does read-back', async () => {
			const http = mockHttp();
			const svc = new IPSecService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleIPSec);

			const result = await svc.create({ vnet: 10 });

			expect(http.post).toHaveBeenCalledWith('/vnet_ipsecs', {
				body: { vnet: 10 },
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_ipsecs/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleIPSec);
		});

		it('update() PUTs to /vnet_ipsecs/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new IPSecService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleIPSec,
				compress: true,
			});

			const result = await svc.update(1, { compress: true });

			expect(http.put).toHaveBeenCalledWith('/vnet_ipsecs/1', {
				body: { compress: true },
			});
			expect(result.compress).toBe(true);
		});

		it('delete() DELETEs /vnet_ipsecs/{key}', async () => {
			const http = mockHttp();
			const svc = new IPSecService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/vnet_ipsecs/1');
		});
	});

	describe('getByNetwork', () => {
		it('filters by vnet FK and returns single result', async () => {
			const http = mockHttp();
			const svc = new IPSecService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleIPSec]);

			const result = await svc.getByNetwork(10);

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsecs', {
				params: { fields: 'most', filter: 'vnet eq 10' },
			});
			expect(result).toEqual(sampleIPSec);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new IPSecService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleIPSec]);

			await svc.getByNetwork('10');

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsecs', {
				params: { fields: 'most', filter: 'vnet eq 10' },
			});
		});

		it('throws NotFoundError when no config exists for network', async () => {
			const http = mockHttp();
			const svc = new IPSecService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getByNetwork(999)).rejects.toThrow(NotFoundError);
		});
	});

	describe('listByNetwork', () => {
		it('filters by vnet FK', async () => {
			const http = mockHttp();
			const svc = new IPSecService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleIPSec]);

			const result = await svc.listByNetwork(10);

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsecs', {
				params: { fields: 'most', filter: 'vnet eq 10' },
			});
			expect(result).toEqual([sampleIPSec]);
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new IPSecService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(10, { filter: 'enabled eq true' });

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsecs', {
				params: {
					fields: 'most',
					filter: 'vnet eq 10 and enabled eq true',
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new IPSecService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(10, { sort: '$key', limit: 5 });

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsecs', {
				params: {
					fields: 'most',
					filter: 'vnet eq 10',
					sort: '$key',
					limit: 5,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.ipsec', async () => {
			await import('../../src/services/ipsec/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.ipsec).toBeDefined();
			expect(client.ipsec).toBeInstanceOf(IPSecService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/ipsec/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.ipsec;
			const second = client.ipsec;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// IPSecPhase1Service Tests
// ---------------------------------------------------------------------------

describe('IPSecPhase1Service', () => {
	describe('constructor', () => {
		it('uses /vnet_ipsec_phase1s resource path', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase1Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePhase1]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase1s', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_ipsec_phase1s/{key}', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase1Service(http);
			vi.mocked(http.get).mockResolvedValueOnce(samplePhase1);

			const result = await svc.get(5);

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase1s/5', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(samplePhase1);
		});

		it('create() POSTs to /vnet_ipsec_phase1s and does read-back', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase1Service(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 5 });
			vi.mocked(http.get).mockResolvedValueOnce(samplePhase1);

			const result = await svc.create({
				ipsec: 1,
				name: 'site-to-site',
				remote_gateway: '203.0.113.1',
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_ipsec_phase1s', {
				body: {
					ipsec: 1,
					name: 'site-to-site',
					remote_gateway: '203.0.113.1',
				},
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase1s/5', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(samplePhase1);
		});

		it('update() PUTs to /vnet_ipsec_phase1s/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase1Service(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...samplePhase1,
				dpddelay: 60,
			});

			const result = await svc.update(5, { dpddelay: 60 });

			expect(http.put).toHaveBeenCalledWith('/vnet_ipsec_phase1s/5', {
				body: { dpddelay: 60 },
			});
			expect(result.dpddelay).toBe(60);
		});

		it('delete() DELETEs /vnet_ipsec_phase1s/{key}', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase1Service(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(5);

			expect(http.del).toHaveBeenCalledWith('/vnet_ipsec_phase1s/5');
		});
	});

	describe('listByIPSec', () => {
		it('filters by ipsec FK', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase1Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePhase1]);

			const result = await svc.listByIPSec(1);

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase1s', {
				params: { fields: 'most', filter: 'ipsec eq 1' },
			});
			expect(result).toEqual([samplePhase1]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase1Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByIPSec('1');

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase1s', {
				params: { fields: 'most', filter: 'ipsec eq 1' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase1Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByIPSec(1, { filter: 'enabled eq true' });

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase1s', {
				params: {
					fields: 'most',
					filter: 'ipsec eq 1 and enabled eq true',
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase1Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByIPSec(1, { sort: 'name', limit: 10 });

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase1s', {
				params: {
					fields: 'most',
					filter: 'ipsec eq 1',
					sort: 'name',
					limit: 10,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.ipsecPhase1s', async () => {
			await import('../../src/services/ipsec-phase1/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.ipsecPhase1s).toBeDefined();
			expect(client.ipsecPhase1s).toBeInstanceOf(IPSecPhase1Service);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/ipsec-phase1/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.ipsecPhase1s;
			const second = client.ipsecPhase1s;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// IPSecPhase2Service Tests
// ---------------------------------------------------------------------------

describe('IPSecPhase2Service', () => {
	describe('constructor', () => {
		it('uses /vnet_ipsec_phase2s resource path', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase2Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePhase2]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase2s', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_ipsec_phase2s/{key}', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase2Service(http);
			vi.mocked(http.get).mockResolvedValueOnce(samplePhase2);

			const result = await svc.get(20);

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase2s/20', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(samplePhase2);
		});

		it('create() POSTs to /vnet_ipsec_phase2s and does read-back', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase2Service(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 20 });
			vi.mocked(http.get).mockResolvedValueOnce(samplePhase2);

			const result = await svc.create({
				phase1: 5,
				name: 'lan-to-lan',
				local: '192.168.1.0/24',
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_ipsec_phase2s', {
				body: {
					phase1: 5,
					name: 'lan-to-lan',
					local: '192.168.1.0/24',
				},
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase2s/20', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(samplePhase2);
		});

		it('update() PUTs to /vnet_ipsec_phase2s/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase2Service(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...samplePhase2,
				lifetime: 7200,
			});

			const result = await svc.update(20, { lifetime: 7200 });

			expect(http.put).toHaveBeenCalledWith('/vnet_ipsec_phase2s/20', {
				body: { lifetime: 7200 },
			});
			expect(result.lifetime).toBe(7200);
		});

		it('delete() DELETEs /vnet_ipsec_phase2s/{key}', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase2Service(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(20);

			expect(http.del).toHaveBeenCalledWith('/vnet_ipsec_phase2s/20');
		});
	});

	describe('listByPhase1', () => {
		it('filters by phase1 FK (not ipsec)', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase2Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePhase2]);

			const result = await svc.listByPhase1(5);

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase2s', {
				params: { fields: 'most', filter: 'phase1 eq 5' },
			});
			expect(result).toEqual([samplePhase2]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase2Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByPhase1('5');

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase2s', {
				params: { fields: 'most', filter: 'phase1 eq 5' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase2Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByPhase1(5, { filter: 'enabled eq true' });

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase2s', {
				params: {
					fields: 'most',
					filter: 'phase1 eq 5 and enabled eq true',
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new IPSecPhase2Service(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByPhase1(5, { sort: 'name', limit: 10 });

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_phase2s', {
				params: {
					fields: 'most',
					filter: 'phase1 eq 5',
					sort: 'name',
					limit: 10,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.ipsecPhase2s', async () => {
			await import('../../src/services/ipsec-phase2/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.ipsecPhase2s).toBeDefined();
			expect(client.ipsecPhase2s).toBeInstanceOf(IPSecPhase2Service);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/ipsec-phase2/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.ipsecPhase2s;
			const second = client.ipsecPhase2s;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// IPSecConnectionService Tests
// ---------------------------------------------------------------------------

describe('IPSecConnectionService', () => {
	describe('constructor', () => {
		it('uses /vnet_ipsec_connections resource path', async () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleConnection]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_connections', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /vnet_ipsec_connections/{key}', async () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleConnection);

			const result = await svc.get(100);

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_connections/100', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleConnection);
		});

		it('list() returns connection entries', async () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleConnection]);

			const result = await svc.list();

			expect(result).toEqual([sampleConnection]);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);

			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);

			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);

			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByNetwork', () => {
		it('filters by vnet FK', async () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleConnection]);

			const result = await svc.listByNetwork(10);

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_connections', {
				params: { fields: 'most', filter: 'vnet eq 10' },
			});
			expect(result).toEqual([sampleConnection]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork('10');

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_connections', {
				params: { fields: 'most', filter: 'vnet eq 10' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(10, { filter: "protocol eq 'ESP'" });

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_connections', {
				params: {
					fields: 'most',
					filter: "vnet eq 10 and protocol eq 'ESP'",
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(10, { sort: 'created', limit: 5 });

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_connections', {
				params: {
					fields: 'most',
					filter: 'vnet eq 10',
					sort: 'created',
					limit: 5,
				},
			});
		});
	});

	describe('listByPhase1', () => {
		it('filters by phase1 FK', async () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleConnection]);

			const result = await svc.listByPhase1(5);

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_connections', {
				params: { fields: 'most', filter: 'phase1 eq 5' },
			});
			expect(result).toEqual([sampleConnection]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByPhase1('5');

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_connections', {
				params: { fields: 'most', filter: 'phase1 eq 5' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new IPSecConnectionService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByPhase1(5, { filter: "protocol eq 'ESP'" });

			expect(http.get).toHaveBeenCalledWith('/vnet_ipsec_connections', {
				params: {
					fields: 'most',
					filter: "phase1 eq 5 and protocol eq 'ESP'",
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.ipsecConnections', async () => {
			await import('../../src/services/ipsec-connection/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.ipsecConnections).toBeDefined();
			expect(client.ipsecConnections).toBeInstanceOf(IPSecConnectionService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/ipsec-connection/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.ipsecConnections;
			const second = client.ipsecConnections;
			expect(first).toBe(second);
		});
	});
});
