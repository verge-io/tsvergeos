import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { MachineStatsHistoryLongService } from '../../src/services/machine-stats-history-long/service.js';
import type { MachineStatsHistoryLong } from '../../src/services/machine-stats-history-long/types.js';
import { MachineStatsHistoryShortService } from '../../src/services/machine-stats-history-short/service.js';
import type { MachineStatsHistoryShort } from '../../src/services/machine-stats-history-short/types.js';
import { VnetMonitorStatsHistoryLongService } from '../../src/services/vnet-monitor-stats-history-long/service.js';
import type { VnetMonitorStatsHistoryLong } from '../../src/services/vnet-monitor-stats-history-long/types.js';
import { VnetMonitorStatsHistoryShortService } from '../../src/services/vnet-monitor-stats-history-short/service.js';
import type { VnetMonitorStatsHistoryShort } from '../../src/services/vnet-monitor-stats-history-short/types.js';

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

const sampleMachineHistoryShort: MachineStatsHistoryShort = {
	$key: 1,
	machine: 42,
	total_cpu: 35,
	user_cpu: 20,
	system_cpu: 10,
	iowait_cpu: 3,
	vmusage_cpu: 15,
	irq_cpu: 2,
	ram_used: 8589934592,
	vram_used: 4294967296,
	core_temp: 55,
	core_temp_top: 62,
	core_peak: 90,
	core_count_gt_25: 3,
	core_count_gt_50: 1,
	core_count_gt_75: 0,
	timestamp: 1700000000,
};

const sampleMachineHistoryLong: MachineStatsHistoryLong = {
	...sampleMachineHistoryShort,
	$key: 2,
	core_temp_peak: 68,
	core_average: 25,
	core_count_gt_25_avg: 2,
	core_count_gt_50_avg: 1,
	core_count_gt_75_avg: 0,
	core_count_gt_25_peak: 4,
	core_count_gt_50_peak: 2,
	core_count_gt_75_peak: 1,
};

const sampleVnetMonitorShort: VnetMonitorStatsHistoryShort = {
	$key: 10,
	vnet: 5,
	sent: 100,
	quality: 95,
	dropped_pct: 1,
	latency_usec_avg: 1200,
	latency_usec_peak: 5000,
	duplicates: 0,
	truncated: 0,
	dropped: 1,
	bad_checksums: 0,
	bad_data: 0,
	timestamp: 1700000000,
};

const sampleVnetMonitorLong: VnetMonitorStatsHistoryLong = {
	...sampleVnetMonitorShort,
	$key: 11,
};

// ---------------------------------------------------------------------------
// MachineStatsHistoryShortService Tests
// ---------------------------------------------------------------------------

describe('MachineStatsHistoryShortService', () => {
	describe('constructor', () => {
		it('uses /machine_stats_history_short resource path', async () => {
			const http = mockHttp();
			const svc = new MachineStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineHistoryShort]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_stats_history_short', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const svc = new MachineStatsHistoryShortService(mockHttp());
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const svc = new MachineStatsHistoryShortService(mockHttp());
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const svc = new MachineStatsHistoryShortService(mockHttp());
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByMachine', () => {
		it('filters by machine FK', async () => {
			const http = mockHttp();
			const svc = new MachineStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineHistoryShort]);

			const result = await svc.listByMachine(42);

			expect(http.get).toHaveBeenCalledWith('/machine_stats_history_short', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
			expect(result).toEqual([sampleMachineHistoryShort]);
		});

		it('merges additional list options', async () => {
			const http = mockHttp();
			const svc = new MachineStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineHistoryShort]);

			await svc.listByMachine(42, { sort: '-timestamp', limit: 10 });

			expect(http.get).toHaveBeenCalledWith('/machine_stats_history_short', {
				params: {
					fields: 'most',
					sort: '-timestamp',
					limit: 10,
					filter: 'machine eq 42',
				},
			});
		});

		it('returns empty array when no history exists', async () => {
			const http = mockHttp();
			const svc = new MachineStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.listByMachine(999);

			expect(result).toEqual([]);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineStatsHistoryShort', async () => {
			await import('../../src/services/machine-stats-history-short/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineStatsHistoryShort).toBeDefined();
			expect(client.machineStatsHistoryShort).toBeInstanceOf(MachineStatsHistoryShortService);
		});
	});
});

// ---------------------------------------------------------------------------
// MachineStatsHistoryLongService Tests
// ---------------------------------------------------------------------------

describe('MachineStatsHistoryLongService', () => {
	describe('constructor', () => {
		it('uses /machine_stats_history_long resource path', async () => {
			const http = mockHttp();
			const svc = new MachineStatsHistoryLongService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineHistoryLong]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_stats_history_long', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const svc = new MachineStatsHistoryLongService(mockHttp());
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const svc = new MachineStatsHistoryLongService(mockHttp());
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const svc = new MachineStatsHistoryLongService(mockHttp());
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByMachine', () => {
		it('filters by machine FK', async () => {
			const http = mockHttp();
			const svc = new MachineStatsHistoryLongService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineHistoryLong]);

			const result = await svc.listByMachine(42);

			expect(http.get).toHaveBeenCalledWith('/machine_stats_history_long', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
			expect(result).toEqual([sampleMachineHistoryLong]);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineStatsHistoryLong', async () => {
			await import('../../src/services/machine-stats-history-long/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineStatsHistoryLong).toBeDefined();
			expect(client.machineStatsHistoryLong).toBeInstanceOf(MachineStatsHistoryLongService);
		});
	});
});

// ---------------------------------------------------------------------------
// VnetMonitorStatsHistoryShortService Tests
// ---------------------------------------------------------------------------

describe('VnetMonitorStatsHistoryShortService', () => {
	describe('constructor', () => {
		it('uses /vnet_monitor_stats_history_short resource path', async () => {
			const http = mockHttp();
			const svc = new VnetMonitorStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVnetMonitorShort]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_monitor_stats_history_short', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const svc = new VnetMonitorStatsHistoryShortService(mockHttp());
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const svc = new VnetMonitorStatsHistoryShortService(mockHttp());
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const svc = new VnetMonitorStatsHistoryShortService(mockHttp());
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByVnet', () => {
		it('filters by vnet FK', async () => {
			const http = mockHttp();
			const svc = new VnetMonitorStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVnetMonitorShort]);

			const result = await svc.listByVnet(5);

			expect(http.get).toHaveBeenCalledWith('/vnet_monitor_stats_history_short', {
				params: { fields: 'most', filter: 'vnet eq 5' },
			});
			expect(result).toEqual([sampleVnetMonitorShort]);
		});

		it('merges additional list options', async () => {
			const http = mockHttp();
			const svc = new VnetMonitorStatsHistoryShortService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVnetMonitorShort]);

			await svc.listByVnet(5, { sort: '-timestamp', limit: 50 });

			expect(http.get).toHaveBeenCalledWith('/vnet_monitor_stats_history_short', {
				params: {
					fields: 'most',
					sort: '-timestamp',
					limit: 50,
					filter: 'vnet eq 5',
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.vnetMonitorStatsHistoryShort', async () => {
			await import('../../src/services/vnet-monitor-stats-history-short/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.vnetMonitorStatsHistoryShort).toBeDefined();
			expect(client.vnetMonitorStatsHistoryShort).toBeInstanceOf(
				VnetMonitorStatsHistoryShortService,
			);
		});
	});
});

// ---------------------------------------------------------------------------
// VnetMonitorStatsHistoryLongService Tests
// ---------------------------------------------------------------------------

describe('VnetMonitorStatsHistoryLongService', () => {
	describe('constructor', () => {
		it('uses /vnet_monitor_stats_history_long resource path', async () => {
			const http = mockHttp();
			const svc = new VnetMonitorStatsHistoryLongService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVnetMonitorLong]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_monitor_stats_history_long', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const svc = new VnetMonitorStatsHistoryLongService(mockHttp());
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const svc = new VnetMonitorStatsHistoryLongService(mockHttp());
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const svc = new VnetMonitorStatsHistoryLongService(mockHttp());
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByVnet', () => {
		it('filters by vnet FK', async () => {
			const http = mockHttp();
			const svc = new VnetMonitorStatsHistoryLongService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVnetMonitorLong]);

			const result = await svc.listByVnet(5);

			expect(http.get).toHaveBeenCalledWith('/vnet_monitor_stats_history_long', {
				params: { fields: 'most', filter: 'vnet eq 5' },
			});
			expect(result).toEqual([sampleVnetMonitorLong]);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.vnetMonitorStatsHistoryLong', async () => {
			await import('../../src/services/vnet-monitor-stats-history-long/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.vnetMonitorStatsHistoryLong).toBeDefined();
			expect(client.vnetMonitorStatsHistoryLong).toBeInstanceOf(VnetMonitorStatsHistoryLongService);
		});
	});
});
