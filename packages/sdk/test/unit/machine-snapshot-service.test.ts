import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { MachineSnapshotService } from '../../src/services/machine-snapshot/service.js';
import type { MachineSnapshot } from '../../src/services/machine-snapshot/types.js';

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
// Sample snapshot resource
// ---------------------------------------------------------------------------

const sampleSnapshot: MachineSnapshot = {
	$key: 10,
	machine: 42,
	name: 'snap-daily-2024',
	description: 'Daily snapshot',
	expires_type: 'date',
	expires: 1700000000,
	created: 1699900000,
	created_manually: true,
	quiesce: false,
	quiesced: false,
	queue_delete: false,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('MachineSnapshotService', () => {
	describe('constructor', () => {
		it('uses /machine_snapshots resource path', async () => {
			const http = mockHttp();
			const svc = new MachineSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSnapshot]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_snapshots', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('list() calls /machine_snapshots', async () => {
			const http = mockHttp();
			const svc = new MachineSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSnapshot]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_snapshots', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleSnapshot]);
		});

		it('get() calls /machine_snapshots/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleSnapshot);

			const result = await svc.get(10);

			expect(http.get).toHaveBeenCalledWith('/machine_snapshots/10', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleSnapshot);
		});

		it('create() POSTs to /machine_snapshots and does read-back', async () => {
			const http = mockHttp();
			const svc = new MachineSnapshotService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 10 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleSnapshot);

			const result = await svc.create({ name: 'snap-daily-2024', machine: 42 });

			expect(http.post).toHaveBeenCalledWith('/machine_snapshots', {
				body: { name: 'snap-daily-2024', machine: 42 },
			});
			expect(http.get).toHaveBeenCalledWith('/machine_snapshots/10', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleSnapshot);
		});

		it('update() PUTs to /machine_snapshots/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new MachineSnapshotService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleSnapshot,
				description: 'updated',
			});

			const result = await svc.update(10, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/machine_snapshots/10', {
				body: { description: 'updated' },
			});
			expect(http.get).toHaveBeenCalledWith('/machine_snapshots/10', {
				params: { fields: 'most' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() DELETEs /machine_snapshots/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineSnapshotService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(10);

			expect(http.del).toHaveBeenCalledWith('/machine_snapshots/10');
		});
	});

	describe('listByMachine', () => {
		it('filters by machine FK', async () => {
			const http = mockHttp();
			const svc = new MachineSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSnapshot]);

			const result = await svc.listByMachine(42);

			expect(http.get).toHaveBeenCalledWith('/machine_snapshots', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
			expect(result).toEqual([sampleSnapshot]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new MachineSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine('42');

			expect(http.get).toHaveBeenCalledWith('/machine_snapshots', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new MachineSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine(42, { filter: "name eq 'snap-daily-2024'" });

			expect(http.get).toHaveBeenCalledWith('/machine_snapshots', {
				params: {
					fields: 'most',
					filter: "machine eq 42 and name eq 'snap-daily-2024'",
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new MachineSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine(42, { sort: 'name', limit: 10 });

			expect(http.get).toHaveBeenCalledWith('/machine_snapshots', {
				params: {
					fields: 'most',
					filter: 'machine eq 42',
					sort: 'name',
					limit: 10,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineSnapshots', async () => {
			await import('../../src/services/machine-snapshot/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineSnapshots).toBeDefined();
			expect(client.machineSnapshots).toBeInstanceOf(MachineSnapshotService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/machine-snapshot/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.machineSnapshots;
			const second = client.machineSnapshots;
			expect(first).toBe(second);
		});
	});
});
