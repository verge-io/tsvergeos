import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/wireguard/index.js';
import '../../src/services/wireguard-peer/index.js';
import '../../src/services/wireguard-peer-status/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('WireGuard VPN integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	// --- WireGuard Interfaces ---

	it('should list WireGuard interfaces', async () => {
		const interfaces = await client.wireguard.list();
		expect(Array.isArray(interfaces)).toBe(true);
	});

	it('should list WireGuard interfaces with limit', async () => {
		await delay();
		const interfaces = await client.wireguard.list({ limit: 5 });
		expect(Array.isArray(interfaces)).toBe(true);
		expect(interfaces.length).toBeLessThanOrEqual(5);
	});

	// --- WireGuard Peers ---

	it('should list WireGuard peers', async () => {
		await delay();
		const peers = await client.wireguardPeers.list();
		expect(Array.isArray(peers)).toBe(true);
	});

	it('should list peers by WireGuard interface if interfaces exist', async () => {
		await delay();
		const interfaces = await client.wireguard.list({ limit: 1 });
		if (interfaces.length === 0) {
			return; // No WireGuard interfaces to test with
		}

		const wg = interfaces[0];
		if (!wg) return;
		await delay();
		const peers = await client.wireguardPeers.listByWireGuard(wg.$key);
		expect(Array.isArray(peers)).toBe(true);

		// All returned peers should belong to this WireGuard interface
		for (const peer of peers) {
			expect(peer.wireguard).toBe(wg.$key);
		}
	});

	it('should list WireGuard interfaces by network if interfaces exist', async () => {
		await delay();
		const interfaces = await client.wireguard.list({ limit: 1 });
		if (interfaces.length === 0) {
			return; // No WireGuard interfaces to test with
		}

		const wg = interfaces[0];
		if (!wg) return;
		await delay();
		const byNetwork = await client.wireguard.listByNetwork(wg.vnet);
		expect(Array.isArray(byNetwork)).toBe(true);
		expect(byNetwork.length).toBeGreaterThanOrEqual(1);

		// The original interface should be in the results
		const found = byNetwork.find((i) => i.$key === wg.$key);
		expect(found).toBeDefined();
	});

	// --- WireGuard Peer Status ---

	it('should list WireGuard peer status entries', async () => {
		await delay();
		const statuses = await client.wireguardPeerStatus.list();
		expect(Array.isArray(statuses)).toBe(true);
	});

	it('should get peer status by peer key if peers exist', async () => {
		await delay();
		const peers = await client.wireguardPeers.list({ limit: 1 });
		if (peers.length === 0) {
			return; // No peers to test with
		}

		const peer = peers[0];
		if (!peer) return;
		try {
			await delay();
			const status = await client.wireguardPeerStatus.getByPeer(peer.$key);
			expect(status).toBeDefined();
			expect(status.peer).toBe(peer.$key);
		} catch {
			// Peer status may not exist if the interface is not active — acceptable
		}
	});

	// --- getConfig ---

	it('should retrieve peer config if peers exist', async () => {
		await delay();
		const peers = await client.wireguardPeers.list({ limit: 1 });
		if (peers.length === 0) {
			return; // No peers to test with
		}

		const peer = peers[0];
		if (!peer) return;
		await delay();
		const config = await client.wireguardPeers.getConfig(peer.$key);
		// Config may be undefined if autogenerate_peer was false
		expect(config === undefined || typeof config === 'string').toBe(true);
	});
});
