import { describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../src/errors.js';
import type { HttpClient } from '../../src/http.js';
import { WireGuardService } from '../../src/services/wireguard/service.js';
import type { WireGuard } from '../../src/services/wireguard/types.js';
import { WireGuardPeerService } from '../../src/services/wireguard-peer/service.js';
import type { WireGuardPeer } from '../../src/services/wireguard-peer/types.js';
import { WireGuardPeerStatusService } from '../../src/services/wireguard-peer-status/service.js';
import type { WireGuardPeerStatus } from '../../src/services/wireguard-peer-status/types.js';

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

const sampleWireGuard: WireGuard = {
	$key: 1,
	vnet: 10,
	name: 'wg0',
	ip: '192.168.255.1/24',
	listenport: 51820,
	mtu: 0,
	enabled: true,
	public_key: 'abc123publickey==',
	configure_firewall: true,
	auto_apply_firewall: true,
	modified: 1700000000,
};

const samplePeer: WireGuardPeer = {
	$key: 42,
	wireguard: 1,
	name: 'peer-laptop',
	enabled: true,
	peer_ip: '192.168.255.2',
	public_key: 'peerPublicKey123==',
	allowed_ips: '192.168.255.2/32',
	configure_firewall: 'site-to-site',
	keepalive: 25,
	wg_config: '[Interface]\nPrivateKey = ...\nAddress = 192.168.255.2/32',
	modified: 1700000000,
};

const samplePeerStatus: WireGuardPeerStatus = {
	$key: 100,
	peer: 42,
	last_handshake: 1700000000,
	tx_bytes: 1048576,
	rx_bytes: 2097152,
	last_update: 1700000100,
};

// ---------------------------------------------------------------------------
// WireGuardService Tests
// ---------------------------------------------------------------------------

describe('WireGuardService', () => {
	describe('constructor', () => {
		it('uses /vnet_wireguards resource path', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleWireGuard]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguards', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_wireguards/{key}', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleWireGuard);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguards/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleWireGuard);
		});

		it('create() POSTs to /vnet_wireguards and does read-back', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleWireGuard);

			const result = await svc.create({
				vnet: 10,
				name: 'wg0',
				ip: '192.168.255.1/24',
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_wireguards', {
				body: {
					vnet: 10,
					name: 'wg0',
					ip: '192.168.255.1/24',
				},
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_wireguards/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleWireGuard);
		});

		it('update() PUTs to /vnet_wireguards/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleWireGuard,
				description: 'Updated',
			});

			const result = await svc.update(1, { description: 'Updated' });

			expect(http.put).toHaveBeenCalledWith('/vnet_wireguards/1', {
				body: { description: 'Updated' },
			});
			expect(result.description).toBe('Updated');
		});

		it('delete() DELETEs /vnet_wireguards/{key}', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/vnet_wireguards/1');
		});
	});

	describe('listByNetwork', () => {
		it('filters by vnet FK', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleWireGuard]);

			const result = await svc.listByNetwork(10);

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguards', {
				params: { fields: 'most', filter: 'vnet eq 10' },
			});
			expect(result).toEqual([sampleWireGuard]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork('10');

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguards', {
				params: { fields: 'most', filter: 'vnet eq 10' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(10, { filter: 'enabled eq true' });

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguards', {
				params: {
					fields: 'most',
					filter: 'vnet eq 10 and enabled eq true',
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(10, { sort: 'name', limit: 5 });

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguards', {
				params: {
					fields: 'most',
					filter: 'vnet eq 10',
					sort: 'name',
					limit: 5,
				},
			});
		});
	});

	describe('getByName (scoped)', () => {
		it('filters by vnet and name when given two arguments', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleWireGuard]);

			const result = await svc.getByName(10, 'wg0');

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguards', {
				params: {
					fields: 'most',
					filter: "vnet eq 10 and name eq 'wg0'",
				},
			});
			expect(result).toEqual(sampleWireGuard);
		});

		it('throws NotFoundError when no match for scoped lookup', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getByName(10, 'nonexistent')).rejects.toThrow(NotFoundError);
		});

		it('falls back to unscoped lookup with single argument', async () => {
			const http = mockHttp();
			const svc = new WireGuardService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleWireGuard]);

			const result = await svc.getByName('wg0');

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguards', {
				params: {
					fields: 'most',
					filter: "name eq 'wg0'",
				},
			});
			expect(result).toEqual(sampleWireGuard);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.wireguard', async () => {
			await import('../../src/services/wireguard/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.wireguard).toBeDefined();
			expect(client.wireguard).toBeInstanceOf(WireGuardService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/wireguard/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.wireguard;
			const second = client.wireguard;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// WireGuardPeerService Tests
// ---------------------------------------------------------------------------

describe('WireGuardPeerService', () => {
	describe('constructor', () => {
		it('uses /vnet_wireguard_peers resource path', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeer]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peers', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_wireguard_peers/{key}', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.get).mockResolvedValueOnce(samplePeer);

			const result = await svc.get(42);

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peers/42', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(samplePeer);
		});

		it('create() POSTs to /vnet_wireguard_peers and does read-back', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 42 });
			vi.mocked(http.get).mockResolvedValueOnce(samplePeer);

			const result = await svc.create({
				wireguard: 1,
				name: 'peer-laptop',
				peer_ip: '192.168.255.2',
				public_key: 'peerPublicKey123==',
				allowed_ips: '192.168.255.2/32',
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_wireguard_peers', {
				body: {
					wireguard: 1,
					name: 'peer-laptop',
					peer_ip: '192.168.255.2',
					public_key: 'peerPublicKey123==',
					allowed_ips: '192.168.255.2/32',
				},
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peers/42', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(samplePeer);
		});

		it('update() PUTs to /vnet_wireguard_peers/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...samplePeer,
				keepalive: 30,
			});

			const result = await svc.update(42, { keepalive: 30 });

			expect(http.put).toHaveBeenCalledWith('/vnet_wireguard_peers/42', {
				body: { keepalive: 30 },
			});
			expect(result.keepalive).toBe(30);
		});

		it('delete() DELETEs /vnet_wireguard_peers/{key}', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(42);

			expect(http.del).toHaveBeenCalledWith('/vnet_wireguard_peers/42');
		});
	});

	describe('listByWireGuard', () => {
		it('filters by wireguard FK', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeer]);

			const result = await svc.listByWireGuard(1);

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peers', {
				params: { fields: 'most', filter: 'wireguard eq 1' },
			});
			expect(result).toEqual([samplePeer]);
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByWireGuard(1, { filter: 'enabled eq true' });

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peers', {
				params: {
					fields: 'most',
					filter: 'wireguard eq 1 and enabled eq true',
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByWireGuard(1, { sort: 'name', limit: 10 });

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peers', {
				params: {
					fields: 'most',
					filter: 'wireguard eq 1',
					sort: 'name',
					limit: 10,
				},
			});
		});
	});

	describe('getByName (scoped)', () => {
		it('filters by wireguard and name when given two arguments', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeer]);

			const result = await svc.getByName(1, 'peer-laptop');

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peers', {
				params: {
					fields: 'most',
					filter: "wireguard eq 1 and name eq 'peer-laptop'",
				},
			});
			expect(result).toEqual(samplePeer);
		});

		it('throws NotFoundError when no match for scoped lookup', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getByName(1, 'nonexistent')).rejects.toThrow(NotFoundError);
		});

		it('falls back to unscoped lookup with single argument', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeer]);

			const result = await svc.getByName('peer-laptop');

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peers', {
				params: {
					fields: 'most',
					filter: "name eq 'peer-laptop'",
				},
			});
			expect(result).toEqual(samplePeer);
		});
	});

	describe('getConfig', () => {
		it('fetches wg_config field for a peer', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.get).mockResolvedValueOnce([{ wg_config: '[Interface]\nPrivateKey = ...' }]);

			const result = await svc.getConfig(42);

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peers', {
				params: {
					fields: 'wg_config',
					filter: '$key eq 42',
				},
			});
			expect(result).toBe('[Interface]\nPrivateKey = ...');
		});

		it('returns undefined when wg_config is empty', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.get).mockResolvedValueOnce([{ wg_config: undefined }]);

			const result = await svc.getConfig(42);

			expect(result).toBeUndefined();
		});

		it('throws NotFoundError when peer does not exist', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getConfig(999)).rejects.toThrow(NotFoundError);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.wireguardPeers', async () => {
			await import('../../src/services/wireguard-peer/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.wireguardPeers).toBeDefined();
			expect(client.wireguardPeers).toBeInstanceOf(WireGuardPeerService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/wireguard-peer/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.wireguardPeers;
			const second = client.wireguardPeers;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// WireGuardPeerStatusService Tests
// ---------------------------------------------------------------------------

describe('WireGuardPeerStatusService', () => {
	describe('constructor', () => {
		it('uses /vnet_wireguard_peer_status resource path', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeerStatus]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peer_status', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /vnet_wireguard_peer_status/{key}', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce(samplePeerStatus);

			const result = await svc.get(100);

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peer_status/100', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(samplePeerStatus);
		});

		it('list() returns status entries', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeerStatus]);

			const result = await svc.list();

			expect(result).toEqual([samplePeerStatus]);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new WireGuardPeerStatusService(http);

			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new WireGuardPeerStatusService(http);

			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new WireGuardPeerStatusService(http);

			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('getByPeer', () => {
		it('filters by peer FK and returns first result', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeerStatus]);

			const result = await svc.getByPeer(42);

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peer_status', {
				params: { fields: 'most', filter: 'peer eq 42' },
			});
			expect(result).toEqual(samplePeerStatus);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeerStatus]);

			await svc.getByPeer('42');

			expect(http.get).toHaveBeenCalledWith('/vnet_wireguard_peer_status', {
				params: { fields: 'most', filter: 'peer eq 42' },
			});
		});

		it('throws NotFoundError when no status for peer', async () => {
			const http = mockHttp();
			const svc = new WireGuardPeerStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getByPeer(999)).rejects.toThrow(NotFoundError);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.wireguardPeerStatus', async () => {
			await import('../../src/services/wireguard-peer-status/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.wireguardPeerStatus).toBeDefined();
			expect(client.wireguardPeerStatus).toBeInstanceOf(WireGuardPeerStatusService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/wireguard-peer-status/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.wireguardPeerStatus;
			const second = client.wireguardPeerStatus;
			expect(first).toBe(second);
		});
	});
});
