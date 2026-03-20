import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/system/index.js';
import '../../src/services/settings/index.js';
import '../../src/services/cluster/index.js';
import '../../src/services/node/index.js';
import '../../src/services/log/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('System, Settings, Clusters, Nodes & Logs integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should get system version info from /version.json', async () => {
		await delay();
		const info = await client.system.getInfo();

		expect(info).toBeDefined();
		expect(info.version).toBeDefined();
		expect(typeof info.version).toBe('string');
		expect(info.name).toBeDefined();
	});

	it('should get the full system record', async () => {
		await delay();
		const system = await client.system.get();

		expect(system).toBeDefined();
		expect(system.cloud_name).toBeDefined();
		expect(typeof system.cloud_name).toBe('string');
		expect(system.key).toBe('self');
	});

	it('should list settings (at least some exist)', async () => {
		await delay();
		const settings = await client.settings.list({ limit: 20 });

		expect(Array.isArray(settings)).toBe(true);
		expect(settings.length).toBeGreaterThan(0);
		for (const setting of settings) {
			expect(setting.key).toBeDefined();
			expect(setting.value).toBeDefined();
		}
	});

	it('should list clusters', async () => {
		await delay();
		const clusters = await client.clusters.list({ limit: 10 });

		expect(Array.isArray(clusters)).toBe(true);
		expect(clusters.length).toBeGreaterThan(0);
		for (const cluster of clusters) {
			expect(cluster.$key).toBeDefined();
			expect(cluster.name).toBeDefined();
		}
	});

	it('should get a specific cluster by key', async () => {
		await delay();
		const clusters = await client.clusters.list({ limit: 1 });
		expect(clusters.length).toBeGreaterThan(0);

		await delay();
		const cluster = await client.clusters.get(clusters[0].$key);

		expect(cluster.name).toBe(clusters[0].name);
	});

	it('should list nodes', async () => {
		await delay();
		const nodes = await client.nodes.list({ limit: 10 });

		expect(Array.isArray(nodes)).toBe(true);
		expect(nodes.length).toBeGreaterThan(0);
		for (const node of nodes) {
			expect(node.name).toBeDefined();
			expect(node.cluster).toBeDefined();
		}
	});

	it('should get a specific node by key', async () => {
		await delay();
		// Request $key explicitly since it's not in 'most' for nodes
		const nodes = await client.nodes.list({ limit: 1, fields: '$key,name' });
		expect(nodes.length).toBeGreaterThan(0);
		expect(nodes[0].$key).toBeDefined();

		await delay();
		const node = await client.nodes.get(nodes[0].$key);

		expect(node.name).toBe(nodes[0].name);
	});

	it('should list nodes by cluster', async () => {
		await delay();
		const clusters = await client.clusters.list({ limit: 1 });
		expect(clusters.length).toBeGreaterThan(0);

		await delay();
		const nodes = await client.nodes.listByCluster(clusters[0].$key);

		expect(Array.isArray(nodes)).toBe(true);
		// All returned nodes should belong to this cluster
		for (const node of nodes) {
			expect(node.cluster).toBe(clusters[0].$key);
		}
	});

	it('should list recent logs with a limit', async () => {
		await delay();
		const logs = await client.logs.list({ limit: 10 });

		expect(Array.isArray(logs)).toBe(true);
		// Logs should exist on any active system
		expect(logs.length).toBeGreaterThan(0);
		for (const log of logs) {
			expect(log.$key).toBeDefined();
			expect(log.level).toBeDefined();
			expect(log.text).toBeDefined();
			expect(log.timestamp).toBeDefined();
		}
	});

	it('should list logs filtered by level', async () => {
		await delay();
		const auditLogs = await client.logs.listByLevel('audit', { limit: 10 });

		expect(Array.isArray(auditLogs)).toBe(true);
		for (const log of auditLogs) {
			expect(log.level).toBe('audit');
		}
	});

	it('should list logs with timestamp filter', async () => {
		await delay();
		// Get the most recent log to find a reasonable timestamp
		const recentLogs = await client.logs.list({ limit: 1 });
		expect(recentLogs.length).toBeGreaterThan(0);

		// Use a timestamp slightly before the most recent log
		const timestamp = Number(recentLogs[0].timestamp) - 60_000_000; // 60 seconds before

		await delay();
		const logs = await client.logs.listSince(timestamp, { limit: 10 });

		expect(Array.isArray(logs)).toBe(true);
		for (const log of logs) {
			expect(Number(log.timestamp)).toBeGreaterThanOrEqual(timestamp);
		}
	});
});
