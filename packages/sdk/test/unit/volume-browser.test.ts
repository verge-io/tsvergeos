import { describe, expect, it, vi } from 'vitest';
import { ApiError } from '../../src/errors.js';
import type { HttpClient } from '../../src/http.js';
import { VolumeBrowserService } from '../../src/services/volume-browser/service.js';
import type {
	VolumeBrowserEntry,
	VolumeBrowserJob,
} from '../../src/services/volume-browser/types.js';

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
// Sample data
// ---------------------------------------------------------------------------

const VOLUME_KEY = 'abc123def456abc123def456abc123def456abc12';
const JOB_KEY = 'job111222333444555666777888999000aaabbbccc';

const JOB_GET_FIELDS = '$key,id,volume,query,status,result,command,created,modified,expires';

const sampleEntries: VolumeBrowserEntry[] = [
	{
		name: 'documents',
		n_name: 'documents',
		size: 0,
		date: 1700000000,
		type: 'directory',
	},
	{
		name: 'readme.txt',
		n_name: 'readme.txt',
		size: 1024,
		date: 1700000001,
		type: 'file',
	},
];

const completedJob: VolumeBrowserJob = {
	$key: JOB_KEY,
	id: JOB_KEY,
	volume: VOLUME_KEY,
	query: 'get-dir',
	status: 'complete',
	result: sampleEntries,
};

const runningJob: VolumeBrowserJob = {
	$key: JOB_KEY,
	id: JOB_KEY,
	volume: VOLUME_KEY,
	query: 'get-dir',
	status: 'running',
};

// ---------------------------------------------------------------------------
// VolumeBrowserService Tests
// ---------------------------------------------------------------------------

describe('VolumeBrowserService', () => {
	describe('createJob', () => {
		it('POSTs to /volume_browser and returns job', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: JOB_KEY });

			const job = await svc.createJob({
				volume: VOLUME_KEY,
				query: 'get-dir',
				params: { dir: '' },
			});

			expect(http.post).toHaveBeenCalledWith('/volume_browser', {
				body: {
					volume: VOLUME_KEY,
					query: 'get-dir',
					params: { dir: '' },
				},
			});
			expect(job.$key).toBe(JOB_KEY);
			expect(job.id).toBe(JOB_KEY);
			expect(job.status).toBe('running');
		});

		it('throws ApiError when no key returned', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.post).mockResolvedValueOnce({});

			await expect(
				svc.createJob({
					volume: VOLUME_KEY,
					query: 'get-dir',
					params: { dir: '' },
				}),
			).rejects.toThrow(ApiError);
		});
	});

	describe('getJob', () => {
		it('GETs with explicit fields param including result', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.get).mockResolvedValueOnce(completedJob);

			const job = await svc.getJob(JOB_KEY);

			expect(http.get).toHaveBeenCalledWith(`/volume_browser/${JOB_KEY}`, {
				params: { fields: JOB_GET_FIELDS },
			});
			expect(job.status).toBe('complete');
			expect(job.result).toEqual(sampleEntries);
		});
	});

	describe('waitForResult', () => {
		it('returns entries when job completes immediately', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.get).mockResolvedValueOnce(completedJob);

			const result = await svc.waitForResult(JOB_KEY);

			expect(result).toEqual(sampleEntries);
		});

		it('polls until job completes', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			// First poll: running, second poll: complete
			vi.mocked(http.get).mockResolvedValueOnce(runningJob).mockResolvedValueOnce(completedJob);

			const result = await svc.waitForResult(JOB_KEY, {
				pollInterval: 1,
				timeout: 5000,
			});

			expect(result).toEqual(sampleEntries);
			expect(http.get).toHaveBeenCalledTimes(2);
		});

		it('throws on error status', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.get).mockResolvedValueOnce({
				...completedJob,
				status: 'error',
				result: 'Permission denied',
			});

			await expect(svc.waitForResult(JOB_KEY, { pollInterval: 1 })).rejects.toThrow(
				'Permission denied',
			);
		});

		it('throws on timeout', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			// Always return running
			vi.mocked(http.get).mockResolvedValue(runningJob);

			await expect(svc.waitForResult(JOB_KEY, { timeout: 50, pollInterval: 10 })).rejects.toThrow(
				/timed out/,
			);
		});

		it('returns empty array when result is null', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.get).mockResolvedValueOnce({
				...completedJob,
				result: null,
			});

			const result = await svc.waitForResult(JOB_KEY);

			expect(result).toEqual([]);
		});

		it('throws on unexpected status', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.get).mockResolvedValueOnce({
				...completedJob,
				status: 'unknown-status',
			});

			await expect(svc.waitForResult(JOB_KEY, { pollInterval: 1 })).rejects.toThrow(
				/Unexpected job status/,
			);
		});
	});

	describe('list', () => {
		it('lists jobs via GET /volume_browser', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.get).mockResolvedValueOnce([completedJob]);

			const jobs = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/volume_browser', {
				params: undefined,
			});
			expect(jobs).toEqual([completedJob]);
		});
	});

	describe('browse (convenience)', () => {
		it('creates get-dir job and waits for result', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			// createJob POST
			vi.mocked(http.post).mockResolvedValueOnce({ $key: JOB_KEY });
			// waitForResult GET (immediate complete)
			vi.mocked(http.get).mockResolvedValueOnce(completedJob);

			const entries = await svc.browse(VOLUME_KEY, '', undefined, {
				pollInterval: 1,
			});

			expect(http.post).toHaveBeenCalledWith('/volume_browser', {
				body: {
					volume: VOLUME_KEY,
					query: 'get-dir',
					params: {
						dir: '',
						limit: undefined,
						offset: undefined,
						filter: undefined,
						volume: VOLUME_KEY,
						sort: undefined,
					},
				},
			});
			expect(entries).toEqual(sampleEntries);
		});

		it('passes browse options through', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: JOB_KEY });
			vi.mocked(http.get).mockResolvedValueOnce(completedJob);

			await svc.browse(
				VOLUME_KEY,
				'subdir',
				{ limit: 50, offset: 10, extensions: '.txt', sort: 'name' },
				{ pollInterval: 1 },
			);

			expect(http.post).toHaveBeenCalledWith('/volume_browser', {
				body: {
					volume: VOLUME_KEY,
					query: 'get-dir',
					params: {
						dir: 'subdir',
						limit: 50,
						offset: 10,
						filter: { extensions: '.txt' },
						volume: VOLUME_KEY,
						sort: 'name',
					},
				},
			});
		});

		it('uses empty string for root directory, not "/"', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: JOB_KEY });
			vi.mocked(http.get).mockResolvedValueOnce(completedJob);

			await svc.browse(VOLUME_KEY, '', undefined, { pollInterval: 1 });

			const postCall = vi.mocked(http.post).mock.calls[0];
			const body = (postCall as unknown[])[1] as {
				body: { params: { dir: string } };
			};
			expect(body.body.params.dir).toBe('');
		});
	});

	describe('rename (convenience)', () => {
		it('creates rename job with correct params', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: JOB_KEY });
			vi.mocked(http.get).mockResolvedValueOnce({
				...completedJob,
				query: 'rename',
				result: null,
			});

			await svc.rename(VOLUME_KEY, 'docs', 'old.txt', 'new.txt', {
				pollInterval: 1,
			});

			expect(http.post).toHaveBeenCalledWith('/volume_browser', {
				body: {
					volume: VOLUME_KEY,
					query: 'rename',
					params: {
						dir: 'docs',
						name: 'new.txt',
						items: ['old.txt'],
					},
				},
			});
		});
	});

	describe('deleteFiles (convenience)', () => {
		it('creates delete job with correct params', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: JOB_KEY });
			vi.mocked(http.get).mockResolvedValueOnce({
				...completedJob,
				query: 'delete',
				result: null,
			});

			await svc.deleteFiles(VOLUME_KEY, 'docs', ['file1.txt', 'file2.txt'], {
				pollInterval: 1,
			});

			expect(http.post).toHaveBeenCalledWith('/volume_browser', {
				body: {
					volume: VOLUME_KEY,
					query: 'delete',
					params: {
						dir: 'docs',
						items: ['file1.txt', 'file2.txt'],
					},
				},
			});
		});
	});

	describe('paste (convenience)', () => {
		it('creates paste job with copy mode', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: JOB_KEY });
			vi.mocked(http.get).mockResolvedValueOnce({
				...completedJob,
				query: 'paste',
				result: null,
			});

			await svc.paste(VOLUME_KEY, 'src', ['file.txt'], 'dest', 'copy', {
				pollInterval: 1,
			});

			expect(http.post).toHaveBeenCalledWith('/volume_browser', {
				body: {
					volume: VOLUME_KEY,
					query: 'paste',
					params: {
						dir: 'src',
						items: ['file.txt'],
						dest_dir: 'dest',
						mode: 'copy',
					},
				},
			});
		});

		it('creates paste job with move mode', async () => {
			const http = mockHttp();
			const svc = new VolumeBrowserService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: JOB_KEY });
			vi.mocked(http.get).mockResolvedValueOnce({
				...completedJob,
				query: 'paste',
				result: null,
			});

			await svc.paste(VOLUME_KEY, 'src', ['file.txt'], 'dest', 'move', {
				pollInterval: 1,
			});

			const postCall = vi.mocked(http.post).mock.calls[0];
			const body = (postCall as unknown[])[1] as {
				body: { params: { mode: string } };
			};
			expect(body.body.params.mode).toBe('move');
		});
	});

	describe('service registration', () => {
		it('registers as client.volumeBrowser', async () => {
			await import('../../src/services/volume-browser/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://verge.example.com',
				apiKey: 'test-key',
			});

			expect(client.volumeBrowser).toBeInstanceOf(VolumeBrowserService);
			expect(client.volumeBrowser).toBe(client.volumeBrowser);
		});
	});
});
