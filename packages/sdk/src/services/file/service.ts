import { ApiError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type { FileUploadOptions, VgFile, VgFileCreateParams, VgFileUpdateParams } from './types.js';

/** Default chunk size for file uploads (256KB). Matches verge-cli and other SDKs. */
export const DEFAULT_CHUNK_SIZE = 262_144;

/**
 * Service for managing files in VergeOS.
 *
 * Provides standard CRUD for file metadata, plus upload and download
 * methods for file content. Uses `VgFile` (not `File`) to avoid
 * collision with the global `File` type.
 *
 * **Upload workflow** (two-step):
 * 1. Create the file entry with {@link create} (sets name, allocated_bytes, etc.)
 * 2. Upload content with {@link upload} (sends binary data in chunks)
 *
 * **Download**: Use {@link download} to get a raw `Response` for streaming.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/file';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // Create file entry and upload
 * const file = await client.files.create({
 *   name: 'my-image.iso',
 *   allocated_bytes: data.byteLength,
 *   type: 'iso',
 * });
 * await client.files.upload(file.$key, data, data.byteLength);
 *
 * // Download a file
 * const response = await client.files.download(file.$key);
 * const blob = await response.blob();
 * ```
 */
export class FileService extends BaseService<VgFile, VgFileCreateParams, VgFileUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/files', 'File');
	}

	/**
	 * Upload file content to a previously created file entry.
	 *
	 * Sends the data in chunks using sequential PUT requests with
	 * `?filepos={offset}` and `application/octet-stream` content type.
	 * Each chunk uses `Connection: close` as VergeOS closes connections
	 * between chunks.
	 *
	 * @param key - The file ID (from {@link create})
	 * @param data - File content as `Uint8Array` or `ReadableStream<Uint8Array>`
	 * @param size - Total file size in bytes
	 * @param options - Upload options (chunk size)
	 */
	async upload(
		key: FlexKey,
		data: Uint8Array | ReadableStream<Uint8Array>,
		size: number,
		options?: FileUploadOptions,
	): Promise<void> {
		const chunkSize = options?.chunkSize ?? DEFAULT_CHUNK_SIZE;

		if (data instanceof Uint8Array) {
			await this.uploadUint8Array(key, data, chunkSize);
		} else {
			await this.uploadStream(key, data, size, chunkSize);
		}
	}

	/**
	 * Download a file's content from VergeOS.
	 *
	 * Returns the raw `Response` object. The caller is responsible for
	 * reading the body (e.g., `response.arrayBuffer()`, `response.blob()`,
	 * or streaming via `response.body`).
	 *
	 * @param key - The file ID to download
	 * @returns Raw `Response` with file content
	 */
	async download(key: FlexKey): Promise<Response> {
		return this.http.getRaw(`${this.resource}/${key}`, {
			download: '1',
		});
	}

	/**
	 * List ISO files. Convenience method that filters by `type eq 'iso'`.
	 *
	 * @returns Array of ISO file resources
	 */
	async listISOs(): Promise<VgFile[]> {
		return this.list({ filter: "type eq 'iso'" });
	}

	/**
	 * Overwrite an existing file's content.
	 *
	 * @param key - The file ID
	 */
	async overwrite(key: FlexKey): Promise<void> {
		await this.dispatchAction('overwrite', key);
	}

	/**
	 * Add a link to a file.
	 *
	 * @param key - The file ID
	 * @param params - Link parameters
	 */
	async addLink(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('add_link', key, params);
	}

	/**
	 * Delete a link from a file.
	 *
	 * @param key - The file ID
	 * @param params - Link parameters
	 */
	async deleteLink(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('delete_link', key, params);
	}

	/**
	 * Delete a reference from a file.
	 *
	 * @param key - The file ID
	 * @param params - Reference parameters
	 */
	async deleteReference(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('delete_reference', key, params);
	}

	/**
	 * Create an ISO image from files.
	 *
	 * @param key - The file ID
	 * @param params - ISO creation parameters
	 */
	async makeISO(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('make_iso', key, params);
	}

	/**
	 * Upload a Uint8Array in chunks.
	 */
	private async uploadUint8Array(key: FlexKey, data: Uint8Array, chunkSize: number): Promise<void> {
		let offset = 0;

		while (offset < data.byteLength) {
			const end = Math.min(offset + chunkSize, data.byteLength);
			const chunk = data.subarray(offset, end);

			await this.uploadChunk(key, chunk, offset);
			offset = end;
		}
	}

	/**
	 * Upload a ReadableStream in chunks.
	 */
	private async uploadStream(
		key: FlexKey,
		stream: ReadableStream<Uint8Array>,
		size: number,
		chunkSize: number,
	): Promise<void> {
		const reader = stream.getReader();
		let offset = 0;
		let buffer = new Uint8Array(0);

		try {
			while (offset < size) {
				// Fill buffer until we have a full chunk or stream ends
				while (buffer.byteLength < chunkSize) {
					const { done, value } = await reader.read();
					if (done) break;

					const newBuffer = new Uint8Array(buffer.byteLength + value.byteLength);
					newBuffer.set(buffer);
					newBuffer.set(value, buffer.byteLength);
					buffer = newBuffer;
				}

				if (buffer.byteLength === 0) break;

				const sendSize = Math.min(chunkSize, buffer.byteLength);
				const chunk = buffer.subarray(0, sendSize);

				await this.uploadChunk(key, chunk, offset);
				offset += sendSize;

				// Keep remainder in buffer
				buffer = buffer.subarray(sendSize);
			}
		} finally {
			reader.releaseLock();
		}
	}

	/**
	 * Upload a single chunk of data to a file.
	 */
	private async uploadChunk(key: FlexKey, chunk: Uint8Array, offset: number): Promise<void> {
		if (chunk.byteLength === 0) {
			throw new ApiError(0, `${this.resource}/${key}`, 'Cannot upload empty chunk');
		}

		await this.http.putRaw(`${this.resource}/${key}`, chunk, 'application/octet-stream', {
			filepos: String(offset),
		});
	}
}
