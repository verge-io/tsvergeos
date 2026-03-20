import { describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../src/errors.js';
import type { HttpClient } from '../../src/http.js';
import { MachineDrivePhysService } from '../../src/services/machine-drive-phys/service.js';
import type { MachineDrivePhys } from '../../src/services/machine-drive-phys/types.js';
import { MachineDriveStatsService } from '../../src/services/machine-drive-stats/service.js';
import type { MachineDriveStats } from '../../src/services/machine-drive-stats/types.js';
import { MachineNicStatsService } from '../../src/services/machine-nic-stats/service.js';
import type { MachineNicStats } from '../../src/services/machine-nic-stats/types.js';
import { MachineStatsService } from '../../src/services/machine-stats/service.js';
import type { MachineStats } from '../../src/services/machine-stats/types.js';

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

const sampleMachineStats: MachineStats = {
	$key: 1,
	machine: 42,
	total_cpu: 35,
	user_cpu: 20,
	system_cpu: 10,
	iowait_cpu: 3,
	vmusage_cpu: 15,
	irq_cpu: 2,
	ram_used: 8589934592,
	ram_pct: 65,
	vram_used: 4294967296,
	core_usagelist: [10, 20, 30, 40],
	core_temp: 55,
	core_temp_top: 62,
	core_peak: 90,
	core_count_gt_25: 3,
	core_count_gt_50: 1,
	core_count_gt_75: 0,
	modified: 1700000000,
};

const sampleDriveStats: MachineDriveStats = {
	$key: 10,
	parent_drive: 5,
	rops: 150,
	wops: 75,
	rbps: 5242880,
	wbps: 2621440,
	totalbps: 7864320,
	reads: 100000,
	writes: 50000,
	read_bytes: 1073741824,
	write_bytes: 536870912,
	used_bytes: 214748364800,
	max_bytes: 1099511627776,
	service_time: 0.5,
	util: 12.3,
	physical: true,
	last_update: 1700000000,
	up_since: 1699000000,
};

const sampleNicStats: MachineNicStats = {
	$key: 20,
	parent_nic: 8,
	txpps: 1000,
	rxpps: 2000,
	txbps: 1048576,
	rxbps: 2097152,
	totalxbps: 3145728,
	tx_pckts: 500000,
	rx_pckts: 1000000,
	tx_bytes: 536870912,
	rx_bytes: 1073741824,
	tx_pckts_cur: 100,
	rx_pckts_cur: 200,
	tx_bytes_cur: 51200,
	rx_bytes_cur: 102400,
	last_update: 1700000000,
};

const sampleDrivePhys: MachineDrivePhys = {
	$key: 30,
	parent_drive: 5,
	path: '/dev/sda',
	model: 'Samsung SSD 970 EVO',
	serial: 'S4EVNF0M123456',
	fw: '2B2QEXE7',
	size: 500107862016,
	temp: 38,
	temp_warn: false,
	encrypted: true,
	wear_level: 5,
	wear_level_warn: false,
	hours: 12000,
	hours_warn: false,
	realloc_sectors: 0,
	realloc_sectors_warn: false,
	vsan_tier: 1,
	vsan_used: 214748364800,
	vsan_max: 499000000000,
	locate_status: 'off',
	bus: 'nvme',
	smart: true,
	modified: 1700000000,
};

// ---------------------------------------------------------------------------
// MachineStatsService Tests
// ---------------------------------------------------------------------------

describe('MachineStatsService', () => {
	describe('constructor', () => {
		it('uses /machine_stats resource path', async () => {
			const http = mockHttp();
			const svc = new MachineStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineStats]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_stats', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /machine_stats/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleMachineStats);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/machine_stats/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleMachineStats);
		});

		it('list() returns stats entries', async () => {
			const http = mockHttp();
			const svc = new MachineStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineStats]);

			const result = await svc.list();

			expect(result).toEqual([sampleMachineStats]);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new MachineStatsService(http);
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new MachineStatsService(http);
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new MachineStatsService(http);
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('getByMachine', () => {
		it('filters by machine FK and returns first result', async () => {
			const http = mockHttp();
			const svc = new MachineStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineStats]);

			const result = await svc.getByMachine(42);

			expect(http.get).toHaveBeenCalledWith('/machine_stats', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
			expect(result).toEqual(sampleMachineStats);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new MachineStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineStats]);

			await svc.getByMachine('42');

			expect(http.get).toHaveBeenCalledWith('/machine_stats', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
		});

		it('throws NotFoundError when no stats exist for machine', async () => {
			const http = mockHttp();
			const svc = new MachineStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getByMachine(999)).rejects.toThrow(NotFoundError);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineStats', async () => {
			await import('../../src/services/machine-stats/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineStats).toBeDefined();
			expect(client.machineStats).toBeInstanceOf(MachineStatsService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/machine-stats/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.machineStats;
			const second = client.machineStats;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// MachineDriveStatsService Tests
// ---------------------------------------------------------------------------

describe('MachineDriveStatsService', () => {
	describe('constructor', () => {
		it('uses /machine_drive_stats resource path', async () => {
			const http = mockHttp();
			const svc = new MachineDriveStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDriveStats]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_drive_stats', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /machine_drive_stats/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineDriveStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleDriveStats);

			const result = await svc.get(10);

			expect(http.get).toHaveBeenCalledWith('/machine_drive_stats/10', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleDriveStats);
		});

		it('list() returns drive stats entries', async () => {
			const http = mockHttp();
			const svc = new MachineDriveStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDriveStats]);

			const result = await svc.list();

			expect(result).toEqual([sampleDriveStats]);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new MachineDriveStatsService(http);
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new MachineDriveStatsService(http);
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new MachineDriveStatsService(http);
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('getByDrive', () => {
		it('filters by parent_drive FK and returns first result', async () => {
			const http = mockHttp();
			const svc = new MachineDriveStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDriveStats]);

			const result = await svc.getByDrive(5);

			expect(http.get).toHaveBeenCalledWith('/machine_drive_stats', {
				params: { fields: 'most', filter: 'parent_drive eq 5' },
			});
			expect(result).toEqual(sampleDriveStats);
		});

		it('throws NotFoundError when no stats exist for drive', async () => {
			const http = mockHttp();
			const svc = new MachineDriveStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getByDrive(999)).rejects.toThrow(NotFoundError);
		});
	});

	describe('listPhysical', () => {
		it('filters by physical eq true', async () => {
			const http = mockHttp();
			const svc = new MachineDriveStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDriveStats]);

			const result = await svc.listPhysical();

			expect(http.get).toHaveBeenCalledWith('/machine_drive_stats', {
				params: { fields: 'most', filter: 'physical eq true' },
			});
			expect(result).toEqual([sampleDriveStats]);
		});

		it('returns empty array when no physical drives', async () => {
			const http = mockHttp();
			const svc = new MachineDriveStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.listPhysical();

			expect(result).toEqual([]);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineDriveStats', async () => {
			await import('../../src/services/machine-drive-stats/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineDriveStats).toBeDefined();
			expect(client.machineDriveStats).toBeInstanceOf(MachineDriveStatsService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/machine-drive-stats/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.machineDriveStats;
			const second = client.machineDriveStats;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// MachineNicStatsService Tests
// ---------------------------------------------------------------------------

describe('MachineNicStatsService', () => {
	describe('constructor', () => {
		it('uses /machine_nic_stats resource path', async () => {
			const http = mockHttp();
			const svc = new MachineNicStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNicStats]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_nic_stats', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /machine_nic_stats/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineNicStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleNicStats);

			const result = await svc.get(20);

			expect(http.get).toHaveBeenCalledWith('/machine_nic_stats/20', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleNicStats);
		});

		it('list() returns NIC stats entries', async () => {
			const http = mockHttp();
			const svc = new MachineNicStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNicStats]);

			const result = await svc.list();

			expect(result).toEqual([sampleNicStats]);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new MachineNicStatsService(http);
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new MachineNicStatsService(http);
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new MachineNicStatsService(http);
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('getByNic', () => {
		it('filters by parent_nic FK and returns first result', async () => {
			const http = mockHttp();
			const svc = new MachineNicStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNicStats]);

			const result = await svc.getByNic(8);

			expect(http.get).toHaveBeenCalledWith('/machine_nic_stats', {
				params: { fields: 'most', filter: 'parent_nic eq 8' },
			});
			expect(result).toEqual(sampleNicStats);
		});

		it('throws NotFoundError when no stats exist for NIC', async () => {
			const http = mockHttp();
			const svc = new MachineNicStatsService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getByNic(999)).rejects.toThrow(NotFoundError);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineNicStats', async () => {
			await import('../../src/services/machine-nic-stats/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineNicStats).toBeDefined();
			expect(client.machineNicStats).toBeInstanceOf(MachineNicStatsService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/machine-nic-stats/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.machineNicStats;
			const second = client.machineNicStats;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// MachineDrivePhysService Tests
// ---------------------------------------------------------------------------

describe('MachineDrivePhysService', () => {
	describe('constructor', () => {
		it('uses /machine_drive_phys resource path', async () => {
			const http = mockHttp();
			const svc = new MachineDrivePhysService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDrivePhys]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_drive_phys', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /machine_drive_phys/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineDrivePhysService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleDrivePhys);

			const result = await svc.get(30);

			expect(http.get).toHaveBeenCalledWith('/machine_drive_phys/30', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleDrivePhys);
		});

		it('list() returns drive phys entries', async () => {
			const http = mockHttp();
			const svc = new MachineDrivePhysService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDrivePhys]);

			const result = await svc.list();

			expect(result).toEqual([sampleDrivePhys]);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new MachineDrivePhysService(http);
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new MachineDrivePhysService(http);
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new MachineDrivePhysService(http);
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('getByDrive', () => {
		it('filters by parent_drive FK and returns first result', async () => {
			const http = mockHttp();
			const svc = new MachineDrivePhysService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDrivePhys]);

			const result = await svc.getByDrive(5);

			expect(http.get).toHaveBeenCalledWith('/machine_drive_phys', {
				params: { fields: 'most', filter: 'parent_drive eq 5' },
			});
			expect(result).toEqual(sampleDrivePhys);
		});

		it('throws NotFoundError when no phys entry exists for drive', async () => {
			const http = mockHttp();
			const svc = new MachineDrivePhysService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getByDrive(999)).rejects.toThrow(NotFoundError);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineDrivePhys', async () => {
			await import('../../src/services/machine-drive-phys/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineDrivePhys).toBeDefined();
			expect(client.machineDrivePhys).toBeInstanceOf(MachineDrivePhysService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/machine-drive-phys/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.machineDrivePhys;
			const second = client.machineDrivePhys;
			expect(first).toBe(second);
		});
	});
});
