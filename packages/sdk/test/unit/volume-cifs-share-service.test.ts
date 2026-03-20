import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { VolumeCIFSShareService } from '../../src/services/volume-cifs-share/service.js';
import type { VolumeCIFSShare } from '../../src/services/volume-cifs-share/types.js';

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
const VOLUME_KEY = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2';

const sampleShare: VolumeCIFSShare = {
	$key: SHA1_KEY,
	id: SHA1_KEY,
	name: 'test-cifs-share',
	volume: VOLUME_KEY,
	description: 'A test CIFS share',
	enabled: true,
	browseable: true,
	read_only: false,
	guest_ok: false,
};

// ---------------------------------------------------------------------------
// VolumeCIFSShareService Tests
// ---------------------------------------------------------------------------

describe('VolumeCIFSShareService', () => {
	describe('resource path', () => {
		it('list() calls /volume_cifs_shares', async () => {
			const http = mockHttp();
			const svc = new VolumeCIFSShareService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShare]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/volume_cifs_shares', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleShare]);
		});

		it('get() uses string key in URL', async () => {
			const http = mockHttp();
			const svc = new VolumeCIFSShareService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleShare);

			const result = await svc.get(SHA1_KEY);

			expect(http.get).toHaveBeenCalledWith(`/volume_cifs_shares/${SHA1_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleShare);
		});

		it('create() extracts string $key and does read-back', async () => {
			const http = mockHttp();
			const svc = new VolumeCIFSShareService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: SHA1_KEY });
			vi.mocked(http.get).mockResolvedValueOnce(sampleShare);

			const result = await svc.create({
				name: 'test-cifs-share',
				volume: VOLUME_KEY,
			});

			expect(http.post).toHaveBeenCalledWith('/volume_cifs_shares', {
				body: { name: 'test-cifs-share', volume: VOLUME_KEY },
			});
			expect(http.get).toHaveBeenCalledWith(`/volume_cifs_shares/${SHA1_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(SHA1_KEY);
		});

		it('delete() uses string key', async () => {
			const http = mockHttp();
			const svc = new VolumeCIFSShareService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(SHA1_KEY);

			expect(http.del).toHaveBeenCalledWith(`/volume_cifs_shares/${SHA1_KEY}`);
		});
	});

	describe('listByVolume', () => {
		it('filters by volume key with string quoting', async () => {
			const http = mockHttp();
			const svc = new VolumeCIFSShareService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShare]);

			const result = await svc.listByVolume(VOLUME_KEY);

			expect(http.get).toHaveBeenCalledWith('/volume_cifs_shares', {
				params: {
					fields: 'most',
					filter: `volume eq '${VOLUME_KEY}'`,
				},
			});
			expect(result).toEqual([sampleShare]);
		});

		it('combines volume filter with additional filter', async () => {
			const http = mockHttp();
			const svc = new VolumeCIFSShareService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShare]);

			await svc.listByVolume(VOLUME_KEY, {
				filter: 'enabled eq true',
			});

			expect(http.get).toHaveBeenCalledWith('/volume_cifs_shares', {
				params: {
					fields: 'most',
					filter: `volume eq '${VOLUME_KEY}' and enabled eq true`,
				},
			});
		});

		it('passes through other list options', async () => {
			const http = mockHttp();
			const svc = new VolumeCIFSShareService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleShare]);

			await svc.listByVolume(VOLUME_KEY, {
				sort: 'name',
				limit: 10,
			});

			expect(http.get).toHaveBeenCalledWith('/volume_cifs_shares', {
				params: {
					fields: 'most',
					filter: `volume eq '${VOLUME_KEY}'`,
					sort: 'name',
					limit: 10,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.volumeCifsShares', async () => {
			await import('../../src/services/volume-cifs-share/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.volumeCifsShares).toBeDefined();
			expect(client.volumeCifsShares).toBeInstanceOf(VolumeCIFSShareService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/volume-cifs-share/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.volumeCifsShares;
			const second = client.volumeCifsShares;
			expect(first).toBe(second);
		});
	});
});
