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
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/resource-group';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all resource groups
 * const groups = await client.resourceGroups.list();
 *
 * // Create a GPU passthrough group
 * const group = await client.resourceGroups.create({
 *   name: 'gpu-pool',
 *   class: 'pci',
 *   type: 'gpu',
 * });
 * ```
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
