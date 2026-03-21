import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { MachineLogService } from '../../src/services/machine-log/service.js';
import type { MachineLog } from '../../src/services/machine-log/types.js';

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

const sampleLog: MachineLog = {
	$key: 1,
	machine: 42,
	level: 'message',
	text: 'VM started successfully',
	timestamp: 1700000000000000,
	user: 'admin',
};

const sampleErrorLog: MachineLog = {
	$key: 2,
	machine: 42,
	level: 'error',
	text: 'Disk I/O error on drive 1',
	timestamp: 1700000001000000,
	user: 'system',
};

// ---------------------------------------------------------------------------
// MachineLogService Tests
// ---------------------------------------------------------------------------

describe('MachineLogService', () => {
	describe('constructor', () => {
		it('uses /machine_logs resource path', async () => {
			const http = mockHttp();
			const svc = new MachineLogService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_logs', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only methods', () => {
		it('get() calls /machine_logs/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineLogService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleLog);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/machine_logs/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleLog);
		});

		it('list() returns log entries', async () => {
			const http = mockHttp();
			const svc = new MachineLogService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleLog, sampleErrorLog]);

			const result = await svc.list();

			expect(result).toEqual([sampleLog, sampleErrorLog]);
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new MachineLogService(http);
			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new MachineLogService(http);
			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new MachineLogService(http);
			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByMachine', () => {
		it('filters by machine FK and returns results', async () => {
			const http = mockHttp();
			const svc = new MachineLogService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleLog, sampleErrorLog]);

			const result = await svc.listByMachine(42);

			expect(http.get).toHaveBeenCalledWith('/machine_logs', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
			expect(result).toEqual([sampleLog, sampleErrorLog]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new MachineLogService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

			await svc.listByMachine('42');

			expect(http.get).toHaveBeenCalledWith('/machine_logs', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
		});

		it('returns empty array when no logs exist for machine', async () => {
			const http = mockHttp();
			const svc = new MachineLogService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.listByMachine(999);

			expect(result).toEqual([]);
		});

		it('combines machine filter with additional filter options', async () => {
			const http = mockHttp();
			const svc = new MachineLogService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleErrorLog]);

			const result = await svc.listByMachine(42, {
				filter: "level eq 'error'",
			});

			expect(http.get).toHaveBeenCalledWith('/machine_logs', {
				params: {
					fields: 'most',
					filter: "(machine eq 42) and (level eq 'error')",
				},
			});
			expect(result).toEqual([sampleErrorLog]);
		});

		it('passes through limit and sort options', async () => {
			const http = mockHttp();
			const svc = new MachineLogService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

			await svc.listByMachine(42, { limit: 10, sort: '-timestamp' });

			expect(http.get).toHaveBeenCalledWith('/machine_logs', {
				params: {
					fields: 'most',
					filter: 'machine eq 42',
					limit: 10,
					sort: '-timestamp',
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineLogs', async () => {
			await import('../../src/services/machine-log/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineLogs).toBeDefined();
			expect(client.machineLogs).toBeInstanceOf(MachineLogService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/machine-log/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.machineLogs;
			const second = client.machineLogs;
			expect(first).toBe(second);
		});
	});
});
