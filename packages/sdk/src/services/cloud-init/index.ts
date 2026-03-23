/**
 * Cloud-init file service registration module.
 *
 * Importing this module registers the {@link CloudInitFileService} on {@link VergeClient},
 * making `client.cloudInitFiles` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/cloud-init';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { CloudInitFileService } from './service.js';

VergeClient.registerService('cloudInitFiles', CloudInitFileService);

declare module '../../client.js' {
	interface VergeClient {
		/** Cloud-init file template management. */
		readonly cloudInitFiles: CloudInitFileService;
	}
}

export { CloudInitFileService } from './service.js';
export type {
	CloudInitFile,
	CloudInitFileCreateParams,
	CloudInitFileRender,
	CloudInitFileUpdateParams,
} from './types.js';
