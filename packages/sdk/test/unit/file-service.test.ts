import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { DEFAULT_CHUNK_SIZE, FileService } from '../../src/services/file/service.js';
import type { VgFile } from '../../src/services/file/types.js';

// ---------------------------------------------------------------------------
// Mock HttpClient factory (includes putRaw and getRaw for file ops)
// ---------------------------------------------------------------------------

function mockHttp(host = 'https://verge.example.com'): HttpClient {
	return {
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
		del: vi.fn(),
		putRaw: vi.fn(),
		getRaw: vi.fn(),
		host,
	} as unknown as HttpClient;
}

// ---------------------------------------------------------------------------
// Sample resources
// ---------------------------------------------------------------------------

const sampleFile: VgFile = {
	$key: 1,
	name: 'test-image.iso',
	description: 'A test ISO file',
	type: 'iso',
	allocated_bytes: 1048576,
	used_bytes: 524288,
	filesize: 1048576,
	preferred_tier: '1',
};

// ---------------------------------------------------------------------------
// FileService Tests
// ---------------------------------------------------------------------------

describe('FileService', () => {
	describe('CRUD', () => {
		it('list() calls /files', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleFile]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/files', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleFile]);
		});

		it('get() calls /files/{key}', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleFile);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/files/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleFile);
		});

		it('create() POSTs to /files and reads back', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce({ ...sampleFile, $key: 2 });

			const result = await svc.create({
				name: 'new-file.iso',
				type: 'iso',
				allocated_bytes: 1048576,
			});

			expect(http.post).toHaveBeenCalledWith('/files', {
				body: { name: 'new-file.iso', type: 'iso', allocated_bytes: 1048576 },
			});
			expect(http.get).toHaveBeenCalledWith('/files/2', {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(2);
		});

		it('update() PUTs to /files/{key} and reads back', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.put).mockResolvedValueOnce({});
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleFile,
				name: 'renamed.iso',
			});

			const result = await svc.update(1, { name: 'renamed.iso' });

			expect(http.put).toHaveBeenCalledWith('/files/1', {
				body: { name: 'renamed.iso' },
			});
			expect(result.name).toBe('renamed.iso');
		});

		it('delete() calls DELETE /files/{key}', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/files/1');
		});
	});

	describe('listISOs', () => {
		it('filters by type eq iso', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleFile]);

			const result = await svc.listISOs();

			expect(http.get).toHaveBeenCalledWith('/files', {
				params: { fields: 'most', filter: "type eq 'iso'" },
			});
			expect(result).toEqual([sampleFile]);
		});
	});

	describe('upload', () => {
		it('uploads small data in a single chunk', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.putRaw).mockResolvedValue(undefined);

			const data = new Uint8Array(100);
			await svc.upload(1, data, data.byteLength);

			expect(http.putRaw).toHaveBeenCalledTimes(1);
			expect(http.putRaw).toHaveBeenCalledWith(
				'/files/1',
				expect.any(Uint8Array),
				'application/octet-stream',
				{ filepos: '0' },
			);
		});

		it('chunks data at the default chunk size boundary', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.putRaw).mockResolvedValue(undefined);

			// Data slightly larger than one chunk
			const data = new Uint8Array(DEFAULT_CHUNK_SIZE + 100);
			await svc.upload(1, data, data.byteLength);

			expect(http.putRaw).toHaveBeenCalledTimes(2);
			// First chunk at offset 0
			expect(http.putRaw).toHaveBeenNthCalledWith(
				1,
				'/files/1',
				expect.any(Uint8Array),
				'application/octet-stream',
				{ filepos: '0' },
			);
			// Second chunk at offset DEFAULT_CHUNK_SIZE
			expect(http.putRaw).toHaveBeenNthCalledWith(
				2,
				'/files/1',
				expect.any(Uint8Array),
				'application/octet-stream',
				{ filepos: String(DEFAULT_CHUNK_SIZE) },
			);
		});

		it('respects custom chunk size', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.putRaw).mockResolvedValue(undefined);

			const data = new Uint8Array(300);
			await svc.upload(1, data, data.byteLength, { chunkSize: 100 });

			expect(http.putRaw).toHaveBeenCalledTimes(3);
			expect(http.putRaw).toHaveBeenNthCalledWith(
				1,
				'/files/1',
				expect.any(Uint8Array),
				'application/octet-stream',
				{ filepos: '0' },
			);
			expect(http.putRaw).toHaveBeenNthCalledWith(
				2,
				'/files/1',
				expect.any(Uint8Array),
				'application/octet-stream',
				{ filepos: '100' },
			);
			expect(http.putRaw).toHaveBeenNthCalledWith(
				3,
				'/files/1',
				expect.any(Uint8Array),
				'application/octet-stream',
				{ filepos: '200' },
			);
		});

		it('uploads ReadableStream in chunks', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.putRaw).mockResolvedValue(undefined);

			// Create a stream that yields two chunks
			const chunk1 = new Uint8Array(50).fill(1);
			const chunk2 = new Uint8Array(50).fill(2);
			const stream = new ReadableStream<Uint8Array>({
				start(controller) {
					controller.enqueue(chunk1);
					controller.enqueue(chunk2);
					controller.close();
				},
			});

			await svc.upload(1, stream, 100, { chunkSize: 100 });

			expect(http.putRaw).toHaveBeenCalledTimes(1);
			expect(http.putRaw).toHaveBeenCalledWith(
				'/files/1',
				expect.any(Uint8Array),
				'application/octet-stream',
				{ filepos: '0' },
			);
		});

		it('uses application/octet-stream content type', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.putRaw).mockResolvedValue(undefined);

			const data = new Uint8Array(10);
			await svc.upload(1, data, data.byteLength);

			const callArgs = vi.mocked(http.putRaw).mock.calls[0];
			expect(callArgs?.[2]).toBe('application/octet-stream');
		});

		it('uses correct filepos offsets', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			vi.mocked(http.putRaw).mockResolvedValue(undefined);

			const data = new Uint8Array(250);
			await svc.upload(1, data, data.byteLength, { chunkSize: 100 });

			const offsets = vi.mocked(http.putRaw).mock.calls.map((call) => call[3]?.filepos);
			expect(offsets).toEqual(['0', '100', '200']);
		});
	});

	describe('download', () => {
		it('calls getRaw with download=1 param', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			const mockResponse = new Response('file-content');
			vi.mocked(http.getRaw).mockResolvedValueOnce(mockResponse);

			const response = await svc.download(1);

			expect(http.getRaw).toHaveBeenCalledWith('/files/1', { download: '1' });
			expect(response).toBe(mockResponse);
		});
	});

	describe('two-step create-then-upload workflow', () => {
		it('creates file entry then uploads content', async () => {
			const http = mockHttp();
			const svc = new FileService(http);
			const data = new Uint8Array(1024);

			// Step 1: create
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 5 });
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleFile,
				$key: 5,
				allocated_bytes: data.byteLength,
			});

			const file = await svc.create({
				name: 'upload-test.iso',
				allocated_bytes: data.byteLength,
				type: 'iso',
			});

			// Step 2: upload
			vi.mocked(http.putRaw).mockResolvedValue(undefined);

			await svc.upload(file.$key, data, data.byteLength);

			// Verify both steps happened
			expect(http.post).toHaveBeenCalledWith('/files', {
				body: {
					name: 'upload-test.iso',
					allocated_bytes: data.byteLength,
					type: 'iso',
				},
			});
			expect(http.putRaw).toHaveBeenCalled();
		});
	});

	describe('DEFAULT_CHUNK_SIZE', () => {
		it('is 256KB (262144 bytes)', () => {
			expect(DEFAULT_CHUNK_SIZE).toBe(262_144);
		});
	});

	describe('service registration', () => {
		it('registers as client.files', async () => {
			await import('../../src/services/file/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://verge.example.com',
				apiKey: 'test-key',
			});

			expect(client.files).toBeInstanceOf(FileService);
			expect(client.files).toBe(client.files);
		});
	});
});
