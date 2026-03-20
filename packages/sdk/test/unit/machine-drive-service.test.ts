import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { MachineDriveService } from '../../src/services/machine-drive/service.js';
import type { MachineDrive } from '../../src/services/machine-drive/types.js';

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
// Sample drive resource
// ---------------------------------------------------------------------------

const sampleDrive: MachineDrive = {
	$key: 5,
	machine: 42,
	name: 'drive0',
	description: 'Primary disk',
	interface: 'virtio-scsi',
	media: 'disk',
	enabled: true,
	disksize: 107374182400, // 100 GB
	used_bytes: 53687091200,
	preferred_tier: '1',
	discard: true,
	optimize: 'general',
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('MachineDriveService', () => {
	describe('constructor', () => {
		it('uses /machine_drives resource path', async () => {
			const http = mockHttp();
			const svc = new MachineDriveService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDrive]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_drives', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('list() calls /machine_drives', async () => {
			const http = mockHttp();
			const svc = new MachineDriveService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDrive]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_drives', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleDrive]);
		});

		it('get() calls /machine_drives/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineDriveService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleDrive);

			const result = await svc.get(5);

			expect(http.get).toHaveBeenCalledWith('/machine_drives/5', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleDrive);
		});

		it('create() POSTs to /machine_drives and does read-back', async () => {
			const http = mockHttp();
			const svc = new MachineDriveService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 5 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleDrive);

			const result = await svc.create({
				name: 'drive0',
				machine: 42,
				disksize: 107374182400,
			});

			expect(http.post).toHaveBeenCalledWith('/machine_drives', {
				body: { name: 'drive0', machine: 42, disksize: 107374182400 },
			});
			expect(http.get).toHaveBeenCalledWith('/machine_drives/5', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleDrive);
		});

		it('update() PUTs to /machine_drives/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new MachineDriveService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleDrive,
				description: 'Updated disk',
			});

			const result = await svc.update(5, { description: 'Updated disk' });

			expect(http.put).toHaveBeenCalledWith('/machine_drives/5', {
				body: { description: 'Updated disk' },
			});
			expect(http.get).toHaveBeenCalledWith('/machine_drives/5', {
				params: { fields: 'most' },
			});
			expect(result.description).toBe('Updated disk');
		});

		it('delete() DELETEs /machine_drives/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineDriveService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(5);

			expect(http.del).toHaveBeenCalledWith('/machine_drives/5');
		});
	});

	describe('listByMachine', () => {
		it('filters by machine FK', async () => {
			const http = mockHttp();
			const svc = new MachineDriveService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDrive]);

			const result = await svc.listByMachine(42);

			expect(http.get).toHaveBeenCalledWith('/machine_drives', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
			expect(result).toEqual([sampleDrive]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new MachineDriveService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine('42');

			expect(http.get).toHaveBeenCalledWith('/machine_drives', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new MachineDriveService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine(42, { filter: "media eq 'disk'" });

			expect(http.get).toHaveBeenCalledWith('/machine_drives', {
				params: {
					fields: 'most',
					filter: "machine eq 42 and media eq 'disk'",
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new MachineDriveService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine(42, { sort: 'orderid', limit: 5 });

			expect(http.get).toHaveBeenCalledWith('/machine_drives', {
				params: {
					fields: 'most',
					filter: 'machine eq 42',
					sort: 'orderid',
					limit: 5,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineDrives', async () => {
			await import('../../src/services/machine-drive/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineDrives).toBeDefined();
			expect(client.machineDrives).toBeInstanceOf(MachineDriveService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/machine-drive/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.machineDrives;
			const second = client.machineDrives;
			expect(first).toBe(second);
		});
	});
});
