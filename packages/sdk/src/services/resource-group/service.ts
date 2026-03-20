import type { HttpClient } from '../../http.js';
import { BaseService } from '../base.js';
import type {
	ResourceGroup,
	ResourceGroupCreateParams,
	ResourceGroupUpdateParams,
} from './types.js';

/**
 * Service for managing resource groups.
 *
 * Resource groups define collections of physical hardware (GPUs, SR-IOV NICs,
 * USB devices) that can be assigned to virtual machines.
 */
export class ResourceGroupService extends BaseService<
	ResourceGroup,
	ResourceGroupCreateParams,
	ResourceGroupUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/resource_groups', 'ResourceGroup');
	}
}
