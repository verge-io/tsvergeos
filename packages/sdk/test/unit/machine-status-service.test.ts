import { describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../src/errors.js';
import type { HttpClient } from '../../src/http.js';
import { MachineStatusService } from '../../src/services/machine-status/service.js';
import type { MachineStatus } from '../../src/services/machine-status/types.js';

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
// Sample resource
// ---------------------------------------------------------------------------

const sampleMachineStatus: MachineStatus = {
	$key: 1,
	machine: 42,
	running: true,
	migratable: true,
	node: 1,
	migrated_node: 0,
	migration_destination: 0,
	config: {},
	started: 1700000000,
	local_time: 1700001000,
	status: 'running',
	status_info: '',
	state: 'online',
	powerstate: true,
	last_update: 1700001000,
	running_cores: 4,
	running_ram: 8192,
	agent_version: '4.2.0',
	agent_features: {},
	agent_guest_info: {},
};

// ---------------------------------------------------------------------------
// MachineStatusService Tests
// ---------------------------------------------------------------------------

describe('MachineStatusService', () => {
	describe('constructor', () => {
		it('uses /machine_status resource path', async () => {
			const http = mockHttp();
			const svc = new MachineStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineStatus]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_status', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /machine_status/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleMachineStatus);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/machine_status/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleMachineStatus);
		});

		it('list() returns status entries', async () => {
			const http = mockHttp();
			const svc = new MachineStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineStatus]);

			const result = await svc.list();

			expect(result).toEqual([sampleMachineStatus]);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new MachineStatusService(http);
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new MachineStatusService(http);
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new MachineStatusService(http);
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('getByMachine', () => {
		it('filters by machine FK and returns first result', async () => {
			const http = mockHttp();
			const svc = new MachineStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineStatus]);

			const result = await svc.getByMachine(42);

			expect(http.get).toHaveBeenCalledWith('/machine_status', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
			expect(result).toEqual(sampleMachineStatus);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new MachineStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleMachineStatus]);

			await svc.getByMachine('42');

			expect(http.get).toHaveBeenCalledWith('/machine_status', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
		});

		it('throws NotFoundError when no status exists for machine', async () => {
			const http = mockHttp();
			const svc = new MachineStatusService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getByMachine(999)).rejects.toThrow(NotFoundError);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineStatuses', async () => {
			await import('../../src/services/machine-status/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineStatuses).toBeDefined();
			expect(client.machineStatuses).toBeInstanceOf(MachineStatusService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/machine-status/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.machineStatuses;
			const second = client.machineStatuses;
			expect(first).toBe(second);
		});
	});
});
