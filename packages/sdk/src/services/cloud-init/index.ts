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
