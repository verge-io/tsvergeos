import { ApiError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { ApiResponse, ListOptions } from '../../types.js';
import type {
	BrowseOptions,
	VolumeBrowserEntry,
	VolumeBrowserJob,
	VolumeBrowserPasteMode,
	VolumeBrowserRequest,
	WaitOptions,
} from './types.js';

/** Default poll interval for waiting on job results (500ms). */
const DEFAULT_POLL_INTERVAL = 500;

/** Default timeout for waiting on job results (30s). */
const DEFAULT_WAIT_TIMEOUT = 30_000;

/** Fields to request when getting a job (result is not returned by default). */
const JOB_GET_FIELDS = '$key,id,volume,query,status,result,command,created,modified,expires';

/**
 * Service for browsing and manipulating files within VergeOS volumes.
 *
 * The volume browser API is asynchronous: operations create a job (POST),
 * which must then be polled (GET) until it completes. This service provides
 * both low-level job management and high-level convenience methods.
 *
 * **Important**: The NAS service VM must be running to browse volumes.
 * Use `""` for root directory, not `"/"`.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/volume-browser';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // Browse root directory of a volume
 * const entries = await client.volumeBrowser.browse('abc123sha1', '');
 *
 * // Rename a file
 * await client.volumeBrowser.rename('abc123sha1', 'subdir', 'old.txt', 'new.txt');
 * ```
 */
export class VolumeBrowserService {
	private readonly http: HttpClient;
	private readonly resource = '/volume_browser';

	constructor(http: HttpClient) {
		this.http = http;
	}

	/**
	 * Browse a directory in a volume and return the file/directory entries.
	 *
	 * This is a convenience method that handles the full async job flow:
	 * creates the job, polls until complete, and returns parsed entries.
	 *
	 * @param volumeKey - The volume's SHA1 key
	 * @param dir - Directory path to browse. Use `""` for root, NOT `"/"`
	 * @param options - Optional browse parameters (limit, offset, extensions, sort)
	 * @param waitOptions - Optional polling configuration (timeout, pollInterval)
	 * @returns Array of file/directory entries
	 */
	async browse(
		volumeKey: string,
		dir: string,
		options?: BrowseOptions,
		waitOptions?: WaitOptions,
	): Promise<VolumeBrowserEntry[]> {
		const job = await this.createJob({
			volume: volumeKey,
			query: 'get-dir',
			params: {
				dir,
				limit: options?.limit,
				offset: options?.offset,
				filter: options?.extensions ? { extensions: options.extensions } : undefined,
				volume: volumeKey,
				sort: options?.sort,
			},
		});

		return this.waitForResult(job.id, waitOptions);
	}

	/**
	 * Create a volume browser job.
	 *
	 * Use {@link getJob} or {@link waitForResult} to poll for results.
	 *
	 * @param request - The job request with volume, query type, and parameters
	 * @returns The created job with its SHA1 ID
	 */
	async createJob(request: VolumeBrowserRequest): Promise<VolumeBrowserJob> {
		const resp = await this.http.post<ApiResponse>(this.resource, {
			body: request,
		});

		const key = resp?.$key;
		if (key === undefined || key === null) {
			throw new ApiError(0, this.resource, 'Volume browser job creation did not return a key');
		}

		return {
			$key: String(key),
			id: String(key),
			volume: request.volume,
			query: request.query,
			status: 'running',
		};
	}

	/**
	 * Get a volume browser job by ID.
	 *
	 * **Important**: Explicitly requests the `result` field, which is not
	 * returned by default.
	 *
	 * @param id - The job's SHA1 ID
	 * @returns The job record including result data
	 */
	async getJob(id: string): Promise<VolumeBrowserJob> {
		return this.http.get<VolumeBrowserJob>(`${this.resource}/${id}`, {
			params: { fields: JOB_GET_FIELDS },
		});
	}

	/**
	 * Poll a volume browser job until it completes or times out.
	 *
	 * Returns the parsed file/directory entries on success.
	 * Throws on error status or timeout.
	 *
	 * @param jobId - The job's SHA1 ID
	 * @param options - Optional polling configuration
	 * @returns Array of file/directory entries
	 */
	async waitForResult(jobId: string, options?: WaitOptions): Promise<VolumeBrowserEntry[]> {
		const timeout = options?.timeout ?? DEFAULT_WAIT_TIMEOUT;
		const pollInterval = options?.pollInterval ?? DEFAULT_POLL_INTERVAL;
		const deadline = Date.now() + timeout;

		while (Date.now() < deadline) {
			const job = await this.getJob(jobId);

			switch (job.status) {
				case 'complete':
					return this.parseResult(job.result);
				case 'error': {
					const errMsg =
						typeof job.result === 'string' ? job.result : 'Volume browser operation failed';
					throw new ApiError(0, this.resource, errMsg);
				}
				case 'running':
					await this.sleep(pollInterval);
					break;
				default:
					throw new ApiError(0, this.resource, `Unexpected job status: ${job.status}`);
			}
		}

		throw new ApiError(0, this.resource, `Volume browser operation timed out after ${timeout}ms`);
	}

	/**
	 * List volume browser jobs with optional filtering.
	 *
	 * @param options - List options (filter, sort, fields, pagination)
	 * @returns Array of job records
	 */
	async list(options?: ListOptions): Promise<VolumeBrowserJob[]> {
		return this.http.get<VolumeBrowserJob[]>(this.resource, {
			params: options,
		});
	}

	/**
	 * Rename a file or directory within a volume.
	 *
	 * @param volumeKey - The volume's SHA1 key
	 * @param dir - Directory containing the item
	 * @param oldName - Current item name
	 * @param newName - New item name
	 * @param waitOptions - Optional polling configuration
	 * @returns Parsed result entries (typically empty for rename)
	 */
	async rename(
		volumeKey: string,
		dir: string,
		oldName: string,
		newName: string,
		waitOptions?: WaitOptions,
	): Promise<VolumeBrowserEntry[]> {
		const job = await this.createJob({
			volume: volumeKey,
			query: 'rename',
			params: {
				dir,
				name: newName,
				items: [oldName],
			},
		});

		return this.waitForResult(job.id, waitOptions);
	}

	/**
	 * Delete files or directories within a volume.
	 *
	 * @param volumeKey - The volume's SHA1 key
	 * @param dir - Directory containing the items
	 * @param items - Names of items to delete
	 * @param waitOptions - Optional polling configuration
	 * @returns Parsed result entries (typically empty for delete)
	 */
	async deleteFiles(
		volumeKey: string,
		dir: string,
		items: string[],
		waitOptions?: WaitOptions,
	): Promise<VolumeBrowserEntry[]> {
		const job = await this.createJob({
			volume: volumeKey,
			query: 'delete',
			params: {
				dir,
				items,
			},
		});

		return this.waitForResult(job.id, waitOptions);
	}

	/**
	 * Copy or move files/directories within a volume.
	 *
	 * @param volumeKey - The volume's SHA1 key
	 * @param sourceDir - Source directory containing the items
	 * @param items - Names of items to copy/move
	 * @param destDir - Destination directory
	 * @param mode - Operation mode: `'copy'` or `'move'`
	 * @param waitOptions - Optional polling configuration
	 * @returns Parsed result entries (typically empty for paste)
	 */
	async paste(
		volumeKey: string,
		sourceDir: string,
		items: string[],
		destDir: string,
		mode: VolumeBrowserPasteMode,
		waitOptions?: WaitOptions,
	): Promise<VolumeBrowserEntry[]> {
		const job = await this.createJob({
			volume: volumeKey,
			query: 'paste',
			params: {
				dir: sourceDir,
				items,
				dest_dir: destDir,
				mode,
			},
		});

		return this.waitForResult(job.id, waitOptions);
	}

	/**
	 * Parse the result field from a completed job into entries.
	 * Empty directories return null/undefined — normalized to empty array.
	 */
	private parseResult(result: unknown): VolumeBrowserEntry[] {
		if (result === null || result === undefined) {
			return [];
		}
		if (Array.isArray(result)) {
			return result as VolumeBrowserEntry[];
		}
		return [];
	}

	/** Promise-based sleep for poll intervals. */
	private sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
