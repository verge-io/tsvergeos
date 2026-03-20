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
