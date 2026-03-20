import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { VolumeNFSShareService } from '../../src/services/volume-nfs-share/service.js';
import type { VolumeNFSShare } from '../../src/services/volume-nfs-share/types.js';

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

const SHA1_KEY = '1a2b3c4d5e6f1a2b3c4d5e6f1a2b3c4d5e6f1a2b';
const VOLUME_KEY = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2';

const sampleShare: VolumeNFSShare = {
	$key: SHA1_KEY,
	id: SHA1_KEY,
	name: 'test-nfs-share',
	volume: VOLUME_KEY,
	description: 'A test NFS share',
	enabled: true,
	squash: 'root_squash',
	data_access: 'rw',
};

// ---------------------------------------------------------------------------
// VolumeNFSShareService Tests
// ---------------------------------------------------------------------------

describe('VolumeNFSShareService', () => {
	describe('resource path', () => {
		it('list() calls /volume_nfs_shares', async () => {
			const http = mockHttp();
			const svc = new VolumeNFSShareService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShare]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/volume_nfs_shares', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleShare]);
		});

		it('get() uses string key in URL', async () => {
			const http = mockHttp();
			const svc = new VolumeNFSShareService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleShare);

			const result = await svc.get(SHA1_KEY);

			expect(http.get).toHaveBeenCalledWith(`/volume_nfs_shares/${SHA1_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleShare);
		});

		it('create() extracts string $key and does read-back', async () => {
			const http = mockHttp();
			const svc = new VolumeNFSShareService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: SHA1_KEY });
			vi.mocked(http.get).mockResolvedValueOnce(sampleShare);

			const result = await svc.create({
				name: 'test-nfs-share',
				volume: VOLUME_KEY,
			});

			expect(http.post).toHaveBeenCalledWith('/volume_nfs_shares', {
				body: { name: 'test-nfs-share', volume: VOLUME_KEY },
			});
			expect(http.get).toHaveBeenCalledWith(`/volume_nfs_shares/${SHA1_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(SHA1_KEY);
		});

		it('delete() uses string key', async () => {
			const http = mockHttp();
			const svc = new VolumeNFSShareService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(SHA1_KEY);

			expect(http.del).toHaveBeenCalledWith(`/volume_nfs_shares/${SHA1_KEY}`);
		});
	});

	describe('listByVolume', () => {
		it('filters by volume key with string quoting', async () => {
			const http = mockHttp();
			const svc = new VolumeNFSShareService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShare]);

			const result = await svc.listByVolume(VOLUME_KEY);

			expect(http.get).toHaveBeenCalledWith('/volume_nfs_shares', {
				params: {
					fields: 'most',
					filter: `volume eq '${VOLUME_KEY}'`,
				},
			});
			expect(result).toEqual([sampleShare]);
		});

		it('combines volume filter with additional filter', async () => {
			const http = mockHttp();
			const svc = new VolumeNFSShareService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShare]);

			await svc.listByVolume(VOLUME_KEY, {
				filter: "squash eq 'root_squash'",
			});

			expect(http.get).toHaveBeenCalledWith('/volume_nfs_shares', {
				params: {
					fields: 'most',
					filter: `volume eq '${VOLUME_KEY}' and squash eq 'root_squash'`,
				},
			});
		});

		it('passes through other list options', async () => {
			const http = mockHttp();
			const svc = new VolumeNFSShareService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShare]);

			await svc.listByVolume(VOLUME_KEY, {
				sort: 'name',
				limit: 5,
			});

			expect(http.get).toHaveBeenCalledWith('/volume_nfs_shares', {
				params: {
					fields: 'most',
					filter: `volume eq '${VOLUME_KEY}'`,
					sort: 'name',
					limit: 5,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.volumeNfsShares', async () => {
			await import('../../src/services/volume-nfs-share/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.volumeNfsShares).toBeDefined();
			expect(client.volumeNfsShares).toBeInstanceOf(VolumeNFSShareService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/volume-nfs-share/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.volumeNfsShares;
			const second = client.volumeNfsShares;
			expect(first).toBe(second);
		});
	});
});
