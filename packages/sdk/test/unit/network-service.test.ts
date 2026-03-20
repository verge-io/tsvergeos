import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { NetworkService } from '../../src/services/network/service.js';
import type { Network } from '../../src/services/network/types.js';

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
// Sample Network resource
// ---------------------------------------------------------------------------

const sampleNetwork: Network = {
	$key: 10,
	name: 'test-network',
	description: 'A test virtual network',
	enabled: true,
	type: 'internal',
	layer2_type: 'vxlan',
	ipaddress: '10.0.0.1',
	network: '10.0.0.0/24',
	dns: 'simple',
	dhcp_enabled: true,
	powerstate: false,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('NetworkService', () => {
	describe('constructor', () => {
		it('uses /vnets resource path (not /networks)', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNetwork]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnets', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('list() calls /vnets', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNetwork]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnets', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleNetwork]);
		});

		it('get() calls /vnets/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleNetwork);

			const result = await svc.get(10);

			expect(http.get).toHaveBeenCalledWith('/vnets/10', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleNetwork);
		});

		it('create() POSTs to /vnets and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 10 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleNetwork);

			const result = await svc.create({
				name: 'test-network',
				type: 'internal',
			});

			expect(http.post).toHaveBeenCalledWith('/vnets', {
				body: { name: 'test-network', type: 'internal' },
			});
			expect(http.get).toHaveBeenCalledWith('/vnets/10', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleNetwork);
		});

		it('update() PUTs to /vnets/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleNetwork,
				description: 'updated',
			});

			const result = await svc.update(10, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/vnets/10', {
				body: { description: 'updated' },
			});
			expect(http.get).toHaveBeenCalledWith('/vnets/10', {
				params: { fields: 'most' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() DELETEs /vnets/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(10);

			expect(http.del).toHaveBeenCalledWith('/vnets/10');
		});
	});

	describe('power operations', () => {
		it('powerOn dispatches to /vnet_actions with body key vnet', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOn(10);

			expect(http.post).toHaveBeenCalledWith('/vnet_actions', {
				body: { vnet: 10, action: 'poweron' },
			});
		});

		it('powerOff dispatches with action poweroff', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOff(10);

			expect(http.post).toHaveBeenCalledWith('/vnet_actions', {
				body: { vnet: 10, action: 'poweroff' },
			});
		});

		it('kill dispatches with action kill (dedicated endpoint name)', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.kill(10);

			expect(http.post).toHaveBeenCalledWith('/vnet_actions', {
				body: { vnet: 10, action: 'kill' },
			});
		});

		it('reset dispatches with action reset (no params by default)', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.reset(10);

			expect(http.post).toHaveBeenCalledWith('/vnet_actions', {
				body: { vnet: 10, action: 'reset' },
			});
		});

		it('reset passes params { apply: true } when applyFirewall is set', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.reset(10, true);

			expect(http.post).toHaveBeenCalledWith('/vnet_actions', {
				body: { vnet: 10, action: 'reset', params: { apply: true } },
			});
		});

		it('accepts string keys for power operations', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOn('10');

			expect(http.post).toHaveBeenCalledWith('/vnet_actions', {
				body: { vnet: '10', action: 'poweron' },
			});
		});
	});

	describe('applyRules', () => {
		it('dispatches to /vnet_actions with action refresh', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.applyRules(10);

			expect(http.post).toHaveBeenCalledWith('/vnet_actions', {
				body: { vnet: 10, action: 'refresh' },
			});
		});
	});

	describe('applyDns', () => {
		it('uses PUT /vnets/{id}/applydns (direct HTTP call, no action endpoint)', async () => {
			const http = mockHttp();
			const svc = new NetworkService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);

			await svc.applyDns(10);

			expect(http.put).toHaveBeenCalledWith('/vnets/10/applydns');
			// Should NOT use the action endpoint
			expect(http.post).not.toHaveBeenCalled();
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.networks', async () => {
			await import('../../src/services/network/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.networks).toBeDefined();
			expect(client.networks).toBeInstanceOf(NetworkService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/network/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.networks;
			const second = client.networks;
			expect(first).toBe(second);
		});
	});
});
