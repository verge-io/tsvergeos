import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { VolumeService } from '../../src/services/volume/service.js';
import type { Volume } from '../../src/services/volume/types.js';
import { VolumeSnapshotService } from '../../src/services/volume-snapshot/service.js';
import type { VolumeSnapshot } from '../../src/services/volume-snapshot/types.js';

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

const SHA1_KEY = '0d25c256a0c561c0b5bb9087f04fcb49f16a8048';

const sampleVolume: Volume = {
	$key: SHA1_KEY,
	id: SHA1_KEY,
	name: 'test-volume',
	description: 'A test volume',
	service: 1,
	enabled: true,
	maxsize: 10737418240,
	fs_type: 'ext4',
	preferred_tier: '1',
	optimize: 'general',
};

const sampleSnapshot: VolumeSnapshot = {
	$key: 1,
	name: 'snap-1',
	volume: SHA1_KEY,
	description: 'A test snapshot',
	enabled: false,
	expires_type: 'never',
};

// ---------------------------------------------------------------------------
// VolumeService Tests
// ---------------------------------------------------------------------------

describe('VolumeService', () => {
	describe('CRUD with string keys', () => {
		it('list() calls /volumes', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVolume]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/volumes', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleVolume]);
		});

		it('get() uses string key in URL', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleVolume);

			const result = await svc.get(SHA1_KEY);

			expect(http.get).toHaveBeenCalledWith(`/volumes/${SHA1_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleVolume);
		});

		it('create() extracts string $key and does read-back', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: SHA1_KEY });
			vi.mocked(http.get).mockResolvedValueOnce(sampleVolume);

			const result = await svc.create({
				name: 'test-volume',
				service: 1,
				maxsize: 10737418240,
			});

			expect(http.post).toHaveBeenCalledWith('/volumes', {
				body: { name: 'test-volume', service: 1, maxsize: 10737418240 },
			});
			expect(http.get).toHaveBeenCalledWith(`/volumes/${SHA1_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(SHA1_KEY);
		});

		it('create() with readBack: false skips GET', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: SHA1_KEY });

			const result = await svc.create({ name: 'test-volume', service: 1 }, { readBack: false });

			expect(http.post).toHaveBeenCalledWith('/volumes', {
				body: { name: 'test-volume', service: 1 },
			});
			expect(http.get).not.toHaveBeenCalled();
			expect(result.$key).toBe(SHA1_KEY);
		});

		it('update() uses string key in URL and does read-back', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleVolume,
				description: 'updated',
			});

			const result = await svc.update(SHA1_KEY, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith(`/volumes/${SHA1_KEY}`, {
				body: { description: 'updated' },
			});
			expect(http.get).toHaveBeenCalledWith(`/volumes/${SHA1_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() uses string key in URL', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(SHA1_KEY);

			expect(http.del).toHaveBeenCalledWith(`/volumes/${SHA1_KEY}`);
		});
	});

	describe('actions', () => {
		it('enable() dispatches to /volume_actions', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.enable(SHA1_KEY);

			expect(http.post).toHaveBeenCalledWith('/volume_actions', {
				body: { volume: SHA1_KEY, action: 'enable' },
			});
		});

		it('disable() dispatches to /volume_actions', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.disable(SHA1_KEY);

			expect(http.post).toHaveBeenCalledWith('/volume_actions', {
				body: { volume: SHA1_KEY, action: 'disable' },
			});
		});

		it('reset() dispatches to /volume_actions', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.reset(SHA1_KEY);

			expect(http.post).toHaveBeenCalledWith('/volume_actions', {
				body: { volume: SHA1_KEY, action: 'reset' },
			});
		});

		it('restore() dispatches restore action without restore_type by default', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.restore(SHA1_KEY);

			expect(http.post).toHaveBeenCalledWith('/volume_actions', {
				body: { volume: SHA1_KEY, action: 'restore' },
			});
		});

		it('restore() passes restore_type at top level when specified', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.restore(SHA1_KEY, { restoreType: 'all' });

			expect(http.post).toHaveBeenCalledWith('/volume_actions', {
				body: { volume: SHA1_KEY, action: 'restore', restore_type: 'all' },
			});
		});

		it('clone() dispatches to /volume_actions', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.clone(SHA1_KEY);

			expect(http.post).toHaveBeenCalledWith('/volume_actions', {
				body: { volume: SHA1_KEY, action: 'clone' },
			});
		});

		it('recoverCloudSnapshot() dispatches to /volume_actions', async () => {
			const http = mockHttp();
			const svc = new VolumeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.recoverCloudSnapshot(SHA1_KEY);

			expect(http.post).toHaveBeenCalledWith('/volume_actions', {
				body: { volume: SHA1_KEY, action: 'recover_cloudsnapshot' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.volumes', async () => {
			await import('../../src/services/volume/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.volumes).toBeDefined();
			expect(client.volumes).toBeInstanceOf(VolumeService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/volume/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.volumes;
			const second = client.volumes;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// VolumeSnapshotService Tests
// ---------------------------------------------------------------------------

describe('VolumeSnapshotService', () => {
	describe('CRUD with integer keys', () => {
		it('list() calls /volume_snapshots', async () => {
			const http = mockHttp();
			const svc = new VolumeSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSnapshot]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/volume_snapshots', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleSnapshot]);
		});

		it('get() uses integer key', async () => {
			const http = mockHttp();
			const svc = new VolumeSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleSnapshot);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/volume_snapshots/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleSnapshot);
		});

		it('create() uses integer key from response', async () => {
			const http = mockHttp();
			const svc = new VolumeSnapshotService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleSnapshot);

			const result = await svc.create({
				name: 'snap-1',
				volume: SHA1_KEY,
			});

			expect(http.post).toHaveBeenCalledWith('/volume_snapshots', {
				body: { name: 'snap-1', volume: SHA1_KEY },
			});
			expect(http.get).toHaveBeenCalledWith('/volume_snapshots/1', {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(1);
		});

		it('delete() uses integer key', async () => {
			const http = mockHttp();
			const svc = new VolumeSnapshotService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/volume_snapshots/1');
		});
	});

	describe('listByVolume', () => {
		it('filters by volume SHA1 key with string quoting', async () => {
			const http = mockHttp();
			const svc = new VolumeSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSnapshot]);

			const result = await svc.listByVolume(SHA1_KEY);

			expect(http.get).toHaveBeenCalledWith('/volume_snapshots', {
				params: {
					fields: 'most',
					filter: `volume eq '${SHA1_KEY}'`,
				},
			});
			expect(result).toEqual([sampleSnapshot]);
		});

		it('combines volume filter with additional filter', async () => {
			const http = mockHttp();
			const svc = new VolumeSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSnapshot]);

			await svc.listByVolume(SHA1_KEY, {
				filter: 'enabled eq true',
			});

			expect(http.get).toHaveBeenCalledWith('/volume_snapshots', {
				params: {
					fields: 'most',
					filter: `volume eq '${SHA1_KEY}' and enabled eq true`,
				},
			});
		});

		it('passes through other list options', async () => {
			const http = mockHttp();
			const svc = new VolumeSnapshotService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSnapshot]);

			await svc.listByVolume(SHA1_KEY, {
				sort: 'name',
				limit: 10,
			});

			expect(http.get).toHaveBeenCalledWith('/volume_snapshots', {
				params: {
					fields: 'most',
					filter: `volume eq '${SHA1_KEY}'`,
					sort: 'name',
					limit: 10,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.volumeSnapshots', async () => {
			await import('../../src/services/volume-snapshot/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.volumeSnapshots).toBeDefined();
			expect(client.volumeSnapshots).toBeInstanceOf(VolumeSnapshotService);
		});
	});
});
