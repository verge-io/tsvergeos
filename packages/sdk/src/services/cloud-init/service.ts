import type { HttpClient } from '../../http.js';
import { BaseService } from '../base.js';
import type {
	CloudInitFile,
	CloudInitFileCreateParams,
	CloudInitFileUpdateParams,
} from './types.js';

/**
 * Service for managing cloud-init file templates.
 *
 * Cloud-init files are templates used by VM recipes and manual VM creation
 * to configure guest operating systems on first boot.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/cloud-init';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all cloud-init templates
 * const files = await client.cloudInitFiles.list();
 *
 * // Create a new cloud-init user-data template
 * const file = await client.cloudInitFiles.create({
 *   name: 'ubuntu-defaults',
 *   type: 'user-data',
 *   body: '#cloud-config\npackage_update: true',
 * });
 * ```
 */
export class CloudInitFileService extends BaseService<
	CloudInitFile,
	CloudInitFileCreateParams,
	CloudInitFileUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/cloudinit_files', 'CloudInitFile');
	}
}
