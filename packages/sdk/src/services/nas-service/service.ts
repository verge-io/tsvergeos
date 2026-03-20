import { NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { NASService, NASServiceCreateParams, NASServiceUpdateParams } from './types.js';

/**
 * Service for managing VergeOS NAS services.
 *
 * NAS services manage file sharing (CIFS/NFS) for volumes. Each NAS service
 * is backed by a dedicated VM. The API endpoint is `/vm_services`.
 *
 * Power actions on the NAS service VM are handled through the VM service,
 * not through this service.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/nas-service';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all NAS services
 * const services = await client.nasServices.list();
 *
 * // Get the NAS service for a specific VM
 * const svc = await client.nasServices.getByVM(42);
 * ```
 */
export class NASServiceService extends BaseService<
	NASService,
	NASServiceCreateParams,
	NASServiceUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vm_services', 'NAS Service');
	}

	/**
	 * Get the NAS service associated with a specific VM.
	 *
	 * Convenience method that filters by the `vm` foreign key and returns
	 * the first match, since each VM has at most one NAS service.
	 *
	 * @param vmKey - The VM's key
	 * @returns The NAS service for the VM
	 * @throws {@link NotFoundError} if no NAS service exists for the VM
	 */
	async getByVM(vmKey: FlexKey): Promise<NASService> {
		const results = await this.list({ filter: `vm eq ${vmKey}` });
		if (results.length === 0) {
			throw new NotFoundError(this.displayName, vmKey);
		}
		return results[0] as NASService;
	}

	/**
	 * List NAS services filtered by VM.
	 *
	 * @param vmKey - The VM's key
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of NAS services for the specified VM
	 */
	async listByVM(vmKey: FlexKey, options?: ListOptions): Promise<NASService[]> {
		const vmFilter = `vm eq ${vmKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${vmFilter} and ${existingFilter}` : vmFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
