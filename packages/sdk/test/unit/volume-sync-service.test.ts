import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { VolumeSyncService } from '../../src/services/volume-sync/service.js';
import type { VolumeSync } from '../../src/services/volume-sync/types.js';

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

const SHA1_KEY = '2a3b4c5d6e7f2a3b4c5d6e7f2a3b4c5d6e7f2a3b';
const SOURCE_VOL = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2';
const DEST_VOL = 'f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5';

const sampleSync: VolumeSync = {
	$key: SHA1_KEY,
	id: SHA1_KEY,
	name: 'test-sync',
	service: 42,
	source_volume: SOURCE_VOL,
	destination_volume: DEST_VOL,
	enabled: true,
	sync_method: 'ysync',
	destination_delete: 'never',
};

// ---------------------------------------------------------------------------
// VolumeSyncService Tests
// ---------------------------------------------------------------------------

describe('VolumeSyncService', () => {
	describe('resource path', () => {
		it('list() calls /volume_syncs', async () => {
			const http = mockHttp();
			const svc = new VolumeSyncService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSync]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/volume_syncs', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleSync]);
		});

		it('get() uses string key in URL', async () => {
			const http = mockHttp();
			const svc = new VolumeSyncService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleSync);

			const result = await svc.get(SHA1_KEY);

			expect(http.get).toHaveBeenCalledWith(`/volume_syncs/${SHA1_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleSync);
		});

		it('create() extracts string $key and does read-back', async () => {
			const http = mockHttp();
			const svc = new VolumeSyncService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: SHA1_KEY });
			vi.mocked(http.get).mockResolvedValueOnce(sampleSync);

			const result = await svc.create({
				name: 'test-sync',
				service: 42,
				source_volume: SOURCE_VOL,
				destination_volume: DEST_VOL,
			});

			expect(http.post).toHaveBeenCalledWith('/volume_syncs', {
				body: {
					name: 'test-sync',
					service: 42,
					source_volume: SOURCE_VOL,
					destination_volume: DEST_VOL,
				},
			});
			expect(http.get).toHaveBeenCalledWith(`/volume_syncs/${SHA1_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(SHA1_KEY);
		});

		it('delete() uses string key', async () => {
			const http = mockHttp();
			const svc = new VolumeSyncService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(SHA1_KEY);

			expect(http.del).toHaveBeenCalledWith(`/volume_syncs/${SHA1_KEY}`);
		});
	});

	describe('listByService', () => {
		it('filters by service key', async () => {
			const http = mockHttp();
			const svc = new VolumeSyncService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSync]);

			const result = await svc.listByService(42);

			expect(http.get).toHaveBeenCalledWith('/volume_syncs', {
				params: {
					fields: 'most',
					filter: "service eq '42'",
				},
			});
			expect(result).toEqual([sampleSync]);
		});

		it('combines service filter with additional filter', async () => {
			const http = mockHttp();
			const svc = new VolumeSyncService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSync]);

			await svc.listByService(42, {
				filter: 'enabled eq true',
			});

			expect(http.get).toHaveBeenCalledWith('/volume_syncs', {
				params: {
					fields: 'most',
					filter: "service eq '42' and enabled eq true",
				},
			});
		});

		it('passes through other list options', async () => {
			const http = mockHttp();
			const svc = new VolumeSyncService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSync]);

			await svc.listByService(42, {
				sort: 'name',
				limit: 10,
			});

			expect(http.get).toHaveBeenCalledWith('/volume_syncs', {
				params: {
					fields: 'most',
					filter: "service eq '42'",
					sort: 'name',
					limit: 10,
				},
			});
		});
	});

	describe('actions', () => {
		it('startSync() dispatches start_sync to /volume_sync_actions', async () => {
			const http = mockHttp();
			const svc = new VolumeSyncService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.startSync(SHA1_KEY);

			expect(http.post).toHaveBeenCalledWith('/volume_sync_actions', {
				body: { sync: SHA1_KEY, action: 'start_sync' },
			});
		});

		it('stopSync() dispatches stop_sync to /volume_sync_actions', async () => {
			const http = mockHttp();
			const svc = new VolumeSyncService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.stopSync(SHA1_KEY);

			expect(http.post).toHaveBeenCalledWith('/volume_sync_actions', {
				body: { sync: SHA1_KEY, action: 'stop_sync' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.volumeSyncs', async () => {
			await import('../../src/services/volume-sync/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.volumeSyncs).toBeDefined();
			expect(client.volumeSyncs).toBeInstanceOf(VolumeSyncService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/volume-sync/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.volumeSyncs;
			const second = client.volumeSyncs;
			expect(first).toBe(second);
		});
	});
});
