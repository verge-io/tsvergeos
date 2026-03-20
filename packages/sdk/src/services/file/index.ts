/**
 * File service registration module.
 *
 * Importing this module registers the {@link FileService} on {@link VergeClient},
 * making `client.files` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/file';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { FileService } from './service.js';

VergeClient.registerService('files', FileService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing files (upload, download, metadata CRUD). */
		readonly files: FileService;
	}
}

export { DEFAULT_CHUNK_SIZE, FileService } from './service.js';
export type {
	FilePreferredTier,
	FileUploadOptions,
	VgFile,
	VgFileCreateParams,
	VgFileType,
	VgFileUpdateParams,
} from './types.js';
