import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { TenantStatsHistoryLongService } from '../../src/services/tenant-stats-history-long/service.js';
import type { TenantStatsHistoryLong } from '../../src/services/tenant-stats-history-long/types.js';
import { TenantStatsHistoryShortService } from '../../src/services/tenant-stats-history-short/service.js';
import type { TenantStatsHistoryShort } from '../../src/services/tenant-stats-history-short/types.js';

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

const sampleShort: TenantStatsHistoryShort = {
	$key: 1,
	tenant: 5,
	total_cpu: 42,
	ram_used: 4294967296,
	ram_pct: 55,
	ram_allocated: 8589934592,
	vram_used: 2147483648,
	core_count: 8,
	ip_count: 3,
	tier0_provisioned: 1099511627776,
	tier0_used: 549755813888,
	tier0_pct: 50,
	tier0_allocated: 1099511627776,
	gpus_used: 1,
	gpus_total: 2,
	gpus_pct: 50,
	vgpus_used: 4,
	vgpus_total: 8,
	vgpus_pct: 50,
	timestamp: 1700000000,
};

const sampleLong: TenantStatsHistoryLong = {
	$key: 2,
	tenant: 5,
	total_cpu: 38,
	ram_used: 4294967296,
	ram_allocated: 8589934592,
	vram_used: 2147483648,
	core_count: 8,
	ip_count: 3,
	tier0_provisioned: 1099511627776,
	tier0_used: 549755813888,
	tier0_allocated: 1099511627776,
	gpus_used: 1,
	gpus_total: 2,
	vgpus_used: 4,
	vgpus_total: 8,
	timestamp: 1700000000,
};

// ---------------------------------------------------------------------------
// TenantStatsHistoryShortService Tests
// ---------------------------------------------------------------------------

describe('TenantStatsHistoryShortService', () => {
	describe('constructor', () => {
		it('uses /tenant_stats_history_short resource path', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShort]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tenant_stats_history_short', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /tenant_stats_history_short/{key}', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleShort);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/tenant_stats_history_short/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleShort);
		});

		it('list() returns stats entries', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShort]);

			const result = await svc.list();

			expect(result).toEqual([sampleShort]);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryShortService(http);
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryShortService(http);
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryShortService(http);
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByTenant', () => {
		it('filters by tenant FK', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShort]);

			const result = await svc.listByTenant(5);

			expect(http.get).toHaveBeenCalledWith('/tenant_stats_history_short', {
				params: { fields: 'most', filter: 'tenant eq 5' },
			});
			expect(result).toEqual([sampleShort]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShort]);

			await svc.listByTenant('5');

			expect(http.get).toHaveBeenCalledWith('/tenant_stats_history_short', {
				params: { fields: 'most', filter: 'tenant eq 5' },
			});
		});

		it('merges additional list options', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShort]);

			await svc.listByTenant(5, { limit: 10, sort: '-timestamp' });

			expect(http.get).toHaveBeenCalledWith('/tenant_stats_history_short', {
				params: {
					fields: 'most',
					filter: 'tenant eq 5',
					limit: 10,
					sort: '-timestamp',
				},
			});
		});

		it('returns empty array when no history exists', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.listByTenant(999);

			expect(result).toEqual([]);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tenantStatsHistoryShort', async () => {
			await import('../../src/services/tenant-stats-history-short/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tenantStatsHistoryShort).toBeDefined();
			expect(client.tenantStatsHistoryShort).toBeInstanceOf(TenantStatsHistoryShortService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/tenant-stats-history-short/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.tenantStatsHistoryShort;
			const second = client.tenantStatsHistoryShort;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// TenantStatsHistoryLongService Tests
// ---------------------------------------------------------------------------

describe('TenantStatsHistoryLongService', () => {
	describe('constructor', () => {
		it('uses /tenant_stats_history_long resource path', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryLongService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleLong]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tenant_stats_history_long', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /tenant_stats_history_long/{key}', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryLongService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleLong);

			const result = await svc.get(2);

			expect(http.get).toHaveBeenCalledWith('/tenant_stats_history_long/2', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleLong);
		});

		it('list() returns stats entries', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryLongService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleLong]);

			const result = await svc.list();

			expect(result).toEqual([sampleLong]);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryLongService(http);
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryLongService(http);
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryLongService(http);
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByTenant', () => {
		it('filters by tenant FK', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryLongService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleLong]);

			const result = await svc.listByTenant(5);

			expect(http.get).toHaveBeenCalledWith('/tenant_stats_history_long', {
				params: { fields: 'most', filter: 'tenant eq 5' },
			});
			expect(result).toEqual([sampleLong]);
		});

		it('merges additional list options', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryLongService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleLong]);

			await svc.listByTenant(5, { limit: 50, sort: '-timestamp' });

			expect(http.get).toHaveBeenCalledWith('/tenant_stats_history_long', {
				params: {
					fields: 'most',
					filter: 'tenant eq 5',
					limit: 50,
					sort: '-timestamp',
				},
			});
		});

		it('returns empty array when no history exists', async () => {
			const http = mockHttp();
			const svc = new TenantStatsHistoryLongService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.listByTenant(999);

			expect(result).toEqual([]);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tenantStatsHistoryLong', async () => {
			await import('../../src/services/tenant-stats-history-long/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tenantStatsHistoryLong).toBeDefined();
			expect(client.tenantStatsHistoryLong).toBeInstanceOf(TenantStatsHistoryLongService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/tenant-stats-history-long/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.tenantStatsHistoryLong;
			const second = client.tenantStatsHistoryLong;
			expect(first).toBe(second);
		});
	});
});
