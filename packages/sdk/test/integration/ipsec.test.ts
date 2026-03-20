import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/ipsec/index.js';
import '../../src/services/ipsec-phase1/index.js';
import '../../src/services/ipsec-phase2/index.js';
import '../../src/services/ipsec-connection/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('IPSec VPN integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	// --- IPSec Configs ---

	it('should list IPSec configs', async () => {
		const configs = await client.ipsec.list();
		expect(Array.isArray(configs)).toBe(true);
	});

	it('should list IPSec configs with limit', async () => {
		await delay();
		const configs = await client.ipsec.list({ limit: 5 });
		expect(Array.isArray(configs)).toBe(true);
		expect(configs.length).toBeLessThanOrEqual(5);
	});

	// --- IPSec Phase 1 (IKE SA) ---

	it('should list IPSec Phase 1 entries', async () => {
		await delay();
		const phase1s = await client.ipsecPhase1s.list();
		expect(Array.isArray(phase1s)).toBe(true);
	});

	it('should list Phase 1 entries by IPSec config if configs exist', async () => {
		await delay();
		const configs = await client.ipsec.list({ limit: 1 });
		if (configs.length === 0) {
			return; // No IPSec configs to test with
		}

		const ipsecConfig = configs[0];
		if (!ipsecConfig) return;
		await delay();
		const phase1s = await client.ipsecPhase1s.listByIPSec(ipsecConfig.$key);
		expect(Array.isArray(phase1s)).toBe(true);

		// All returned entries should belong to this IPSec config
		for (const p1 of phase1s) {
			expect(p1.ipsec).toBe(ipsecConfig.$key);
		}
	});

	// --- IPSec Phase 2 (Child SA) ---

	it('should list IPSec Phase 2 entries', async () => {
		await delay();
		const phase2s = await client.ipsecPhase2s.list();
		expect(Array.isArray(phase2s)).toBe(true);
	});

	it('should list Phase 2 entries by Phase 1 if Phase 1 entries exist', async () => {
		await delay();
		const phase1s = await client.ipsecPhase1s.list({ limit: 1 });
		if (phase1s.length === 0) {
			return; // No Phase 1 entries to test with
		}

		const phase1 = phase1s[0];
		if (!phase1) return;
		await delay();
		const phase2s = await client.ipsecPhase2s.listByPhase1(phase1.$key);
		expect(Array.isArray(phase2s)).toBe(true);

		// All returned entries should belong to this Phase 1
		for (const p2 of phase2s) {
			expect(p2.phase1).toBe(phase1.$key);
		}
	});

	// --- IPSec Connections (read-only status) ---

	it('should list IPSec connections', async () => {
		await delay();
		const connections = await client.ipsecConnections.list();
		expect(Array.isArray(connections)).toBe(true);
	});

	it('should list connections by network if configs exist', async () => {
		await delay();
		const configs = await client.ipsec.list({ limit: 1 });
		if (configs.length === 0) {
			return; // No IPSec configs to test with
		}

		const ipsecConfig = configs[0];
		if (!ipsecConfig) return;
		await delay();
		const connections = await client.ipsecConnections.listByNetwork(ipsecConfig.vnet);
		expect(Array.isArray(connections)).toBe(true);
	});

	it('should list connections by Phase 1 if Phase 1 entries exist', async () => {
		await delay();
		const phase1s = await client.ipsecPhase1s.list({ limit: 1 });
		if (phase1s.length === 0) {
			return; // No Phase 1 entries to test with
		}

		const phase1 = phase1s[0];
		if (!phase1) return;
		await delay();
		const connections = await client.ipsecConnections.listByPhase1(phase1.$key);
		expect(Array.isArray(connections)).toBe(true);
	});
});
