import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/tenant/index.js';
import '../../src/services/tenant-stats-history-short/index.js';
import '../../src/services/tenant-stats-history-long/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Tenant stats history integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list short-term tenant stats history', async () => {
		await delay();
		const history = await client.tenantStatsHistoryShort.list({ limit: 5 });

		expect(Array.isArray(history)).toBe(true);

		for (const entry of history) {
			expect(entry.$key).toBeDefined();
			expect(entry.tenant).toBeDefined();
			// Timestamp should be a Unix epoch
			if (entry.timestamp !== undefined) {
				expect(typeof entry.timestamp).toBe('number');
			}
		}
	});

	it('should list long-term tenant stats history', async () => {
		await delay();
		const history = await client.tenantStatsHistoryLong.list({ limit: 5 });

		expect(Array.isArray(history)).toBe(true);

		for (const entry of history) {
			expect(entry.$key).toBeDefined();
			expect(entry.tenant).toBeDefined();
			if (entry.timestamp !== undefined) {
				expect(typeof entry.timestamp).toBe('number');
			}
		}
	});

	it('should filter short-term history by tenant via listByTenant', async () => {
		await delay();
		// Get a tenant key from the first available history entry
		const all = await client.tenantStatsHistoryShort.list({ limit: 1 });
		if (all.length === 0) return; // no tenants with history — skip

		const tenantKey = all[0].tenant;
		await delay();
		const filtered = await client.tenantStatsHistoryShort.listByTenant(tenantKey, { limit: 5 });

		expect(filtered.length).toBeGreaterThan(0);
		for (const entry of filtered) {
			expect(Number(entry.tenant)).toBe(Number(tenantKey));
		}
	});

	it('should filter long-term history by tenant via listByTenant', async () => {
		await delay();
		const all = await client.tenantStatsHistoryLong.list({ limit: 1 });
		if (all.length === 0) return; // no tenants with history — skip

		const tenantKey = all[0].tenant;
		await delay();
		const filtered = await client.tenantStatsHistoryLong.listByTenant(tenantKey, { limit: 5 });

		expect(filtered.length).toBeGreaterThan(0);
		for (const entry of filtered) {
			expect(Number(entry.tenant)).toBe(Number(tenantKey));
		}
	});

	it('should include CPU and RAM fields in short-term history', async () => {
		await delay();
		const history = await client.tenantStatsHistoryShort.list({
			limit: 1,
			fields: ['total_cpu', 'ram_used', 'ram_pct', 'ram_allocated'],
		});

		if (history.length === 0) return;

		const entry = history[0];
		// These fields should be present when explicitly requested
		expect(entry.total_cpu !== undefined || entry.ram_used !== undefined).toBe(true);
	});
});
