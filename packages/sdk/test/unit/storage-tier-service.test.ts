import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { ClusterTierService } from '../../src/services/cluster-tier/service.js';
import type { ClusterTier } from '../../src/services/cluster-tier/types.js';
import { ClusterTierStatsService } from '../../src/services/cluster-tier-stats/service.js';
import type { ClusterTierStats } from '../../src/services/cluster-tier-stats/types.js';
import { ClusterTierStatusService } from '../../src/services/cluster-tier-status/service.js';
import type {
	ClusterTierState,
	ClusterTierStatus,
	ClusterTierStatusValue,
} from '../../src/services/cluster-tier-status/types.js';
import { StorageTierService } from '../../src/services/storage-tier/service.js';
import type { StorageTier } from '../../src/services/storage-tier/types.js';
import { StorageTierStatsService } from '../../src/services/storage-tier-stats/service.js';
import type { StorageTierStats } from '../../src/services/storage-tier-stats/types.js';

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

const sampleStorageTier: StorageTier = {
	$key: 1,
	tier: 0,
	description: 'SSD Tier',
	capacity: 1099511627776,
	used: 549755813888,
	allocated: 600000000000,
	used_pct: 50,
	used_inflated: 700000000000,
	dedupe_ratio: 1.27,
	modified: 1700000000,
};

const sampleStorageTierStats: StorageTierStats = {
	$key: 10,
	tier: 1,
	rops: 5000,
	wops: 2500,
	rbps: 524288000,
	wbps: 262144000,
	reads: 1000000,
	writes: 500000,
	read_bytes: 1073741824000,
	write_bytes: 536870912000,
	last_update: 1700000000,
};

const sampleClusterTier: ClusterTier = {
	$key: 20,
	cluster: 1,
	tier: 0,
	description: 'Cluster 1 SSD Tier',
	cost_per_gb: 0.1,
	price_per_gb: 0.15,
};

const sampleClusterTierStats: ClusterTierStats = {
	$key: 30,
	tier: 20,
	rops: 3000,
	wops: 1500,
	rbps: 314572800,
	wbps: 157286400,
	reads: 600000,
	writes: 300000,
	read_bytes: 644245094400,
	write_bytes: 322122547200,
	last_update: 1700000000,
};

const sampleClusterTierStatus: ClusterTierStatus = {
	$key: 40,
	tier: 20,
	status: 'online',
	state: 'online',
	capacity: 549755813888,
	used: 274877906944,
	used_pct: 50,
	redundant: true,
	encrypted: false,
	working: false,
	last_walk_time_ms: 1234,
	last_fullwalk_time_ms: 5678,
	transaction: 42,
	repairs: 0,
	bad_drives: 0,
	fullwalk: false,
	progress: 0,
	index_unique: 100000,
	state_timestamp: 1700000000,
	cur_space_throttle_ms: 0,
	transaction_start_stamp: 1699999000,
};

// ---------------------------------------------------------------------------
// StorageTierService Tests
// ---------------------------------------------------------------------------

describe('StorageTierService', () => {
	describe('constructor', () => {
		it('uses /storage_tiers resource path', async () => {
			const http = mockHttp();
			const svc = new StorageTierService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleStorageTier]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/storage_tiers', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /storage_tiers/{key}', async () => {
			const http = mockHttp();
			const svc = new StorageTierService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleStorageTier);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/storage_tiers/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleStorageTier);
		});

		it('list() returns storage tier entries', async () => {
			const http = mockHttp();
			const svc = new StorageTierService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleStorageTier]);

			const result = await svc.list();

			expect(result).toEqual([sampleStorageTier]);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const svc = new StorageTierService(mockHttp());
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const svc = new StorageTierService(mockHttp());
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const svc = new StorageTierService(mockHttp());
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.storageTiers', async () => {
			await import('../../src/services/storage-tier/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.storageTiers).toBeDefined();
			expect(client.storageTiers).toBeInstanceOf(StorageTierService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/storage-tier/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.storageTiers).toBe(client.storageTiers);
		});
	});
});

// ---------------------------------------------------------------------------
// StorageTierStatsService Tests
// ---------------------------------------------------------------------------

describe('StorageTierStatsService', () => {
	describe('constructor', () => {
		it('uses /storage_tier_stats resource path', async () => {
			const http = mockHttp();
			const svc = new StorageTierStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleStorageTierStats]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/storage_tier_stats', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /storage_tier_stats/{key}', async () => {
			const http = mockHttp();
			const svc = new StorageTierStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleStorageTierStats);

			const result = await svc.get(10);

			expect(http.get).toHaveBeenCalledWith('/storage_tier_stats/10', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleStorageTierStats);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const svc = new StorageTierStatsService(mockHttp());
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const svc = new StorageTierStatsService(mockHttp());
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const svc = new StorageTierStatsService(mockHttp());
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByTier', () => {
		it('filters by tier FK', async () => {
			const http = mockHttp();
			const svc = new StorageTierStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleStorageTierStats]);

			const result = await svc.listByTier(1);

			expect(http.get).toHaveBeenCalledWith('/storage_tier_stats', {
				params: { fields: 'most', filter: 'tier eq 1' },
			});
			expect(result).toEqual([sampleStorageTierStats]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new StorageTierStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByTier('1');

			expect(http.get).toHaveBeenCalledWith('/storage_tier_stats', {
				params: { fields: 'most', filter: 'tier eq 1' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.storageTierStats', async () => {
			await import('../../src/services/storage-tier-stats/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.storageTierStats).toBeDefined();
			expect(client.storageTierStats).toBeInstanceOf(StorageTierStatsService);
		});
	});
});

// ---------------------------------------------------------------------------
// ClusterTierService Tests
// ---------------------------------------------------------------------------

describe('ClusterTierService', () => {
	describe('constructor', () => {
		it('uses /cluster_tiers resource path', async () => {
			const http = mockHttp();
			const svc = new ClusterTierService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleClusterTier]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/cluster_tiers', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /cluster_tiers/{key}', async () => {
			const http = mockHttp();
			const svc = new ClusterTierService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleClusterTier);

			const result = await svc.get(20);

			expect(http.get).toHaveBeenCalledWith('/cluster_tiers/20', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleClusterTier);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const svc = new ClusterTierService(mockHttp());
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const svc = new ClusterTierService(mockHttp());
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const svc = new ClusterTierService(mockHttp());
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByCluster', () => {
		it('filters by cluster FK', async () => {
			const http = mockHttp();
			const svc = new ClusterTierService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleClusterTier]);

			const result = await svc.listByCluster(1);

			expect(http.get).toHaveBeenCalledWith('/cluster_tiers', {
				params: { fields: 'most', filter: 'cluster eq 1' },
			});
			expect(result).toEqual([sampleClusterTier]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new ClusterTierService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByCluster('1');

			expect(http.get).toHaveBeenCalledWith('/cluster_tiers', {
				params: { fields: 'most', filter: 'cluster eq 1' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.clusterTiers', async () => {
			await import('../../src/services/cluster-tier/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.clusterTiers).toBeDefined();
			expect(client.clusterTiers).toBeInstanceOf(ClusterTierService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/cluster-tier/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.clusterTiers).toBe(client.clusterTiers);
		});
	});
});

// ---------------------------------------------------------------------------
// ClusterTierStatsService Tests
// ---------------------------------------------------------------------------

describe('ClusterTierStatsService', () => {
	describe('constructor', () => {
		it('uses /cluster_tier_stats resource path', async () => {
			const http = mockHttp();
			const svc = new ClusterTierStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleClusterTierStats]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/cluster_tier_stats', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /cluster_tier_stats/{key}', async () => {
			const http = mockHttp();
			const svc = new ClusterTierStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleClusterTierStats);

			const result = await svc.get(30);

			expect(http.get).toHaveBeenCalledWith('/cluster_tier_stats/30', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleClusterTierStats);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const svc = new ClusterTierStatsService(mockHttp());
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const svc = new ClusterTierStatsService(mockHttp());
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const svc = new ClusterTierStatsService(mockHttp());
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByClusterTier', () => {
		it('filters by tier FK (pointing to cluster_tiers.$key)', async () => {
			const http = mockHttp();
			const svc = new ClusterTierStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleClusterTierStats]);

			const result = await svc.listByClusterTier(20);

			expect(http.get).toHaveBeenCalledWith('/cluster_tier_stats', {
				params: { fields: 'most', filter: 'tier eq 20' },
			});
			expect(result).toEqual([sampleClusterTierStats]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new ClusterTierStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByClusterTier('20');

			expect(http.get).toHaveBeenCalledWith('/cluster_tier_stats', {
				params: { fields: 'most', filter: 'tier eq 20' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.clusterTierStats', async () => {
			await import('../../src/services/cluster-tier-stats/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.clusterTierStats).toBeDefined();
			expect(client.clusterTierStats).toBeInstanceOf(ClusterTierStatsService);
		});
	});
});

// ---------------------------------------------------------------------------
// ClusterTierStatusService Tests
// ---------------------------------------------------------------------------

describe('ClusterTierStatusService', () => {
	describe('constructor', () => {
		it('uses /cluster_tier_status resource path', async () => {
			const http = mockHttp();
			const svc = new ClusterTierStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleClusterTierStatus]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/cluster_tier_status', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /cluster_tier_status/{key}', async () => {
			const http = mockHttp();
			const svc = new ClusterTierStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleClusterTierStatus);

			const result = await svc.get(40);

			expect(http.get).toHaveBeenCalledWith('/cluster_tier_status/40', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleClusterTierStatus);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const svc = new ClusterTierStatusService(mockHttp());
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const svc = new ClusterTierStatusService(mockHttp());
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const svc = new ClusterTierStatusService(mockHttp());
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByClusterTier', () => {
		it('filters by tier FK (pointing to cluster_tiers.$key)', async () => {
			const http = mockHttp();
			const svc = new ClusterTierStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleClusterTierStatus]);

			const result = await svc.listByClusterTier(20);

			expect(http.get).toHaveBeenCalledWith('/cluster_tier_status', {
				params: { fields: 'most', filter: 'tier eq 20' },
			});
			expect(result).toEqual([sampleClusterTierStatus]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new ClusterTierStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByClusterTier('20');

			expect(http.get).toHaveBeenCalledWith('/cluster_tier_status', {
				params: { fields: 'most', filter: 'tier eq 20' },
			});
		});
	});

	describe('type enums', () => {
		it('ClusterTierStatusValue includes all 7 values', () => {
			const values: ClusterTierStatusValue[] = [
				'online',
				'offline',
				'repairing',
				'initializing',
				'verifying',
				'noredundant',
				'outofspace',
			];
			// Verify all values are assignable (compile-time check via type annotation)
			expect(values).toHaveLength(7);
		});

		it('ClusterTierState includes all 4 values', () => {
			const values: ClusterTierState[] = ['online', 'offline', 'warning', 'error'];
			expect(values).toHaveLength(4);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.clusterTierStatus', async () => {
			await import('../../src/services/cluster-tier-status/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.clusterTierStatus).toBeDefined();
			expect(client.clusterTierStatus).toBeInstanceOf(ClusterTierStatusService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/cluster-tier-status/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.clusterTierStatus).toBe(client.clusterTierStatus);
		});
	});
});
