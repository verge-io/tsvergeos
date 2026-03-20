import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	NASServiceUser,
	NASServiceUserCreateParams,
	NASServiceUserUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS NAS service users.
 *
 * NAS service users are per-NAS-service accounts for CIFS/NFS file sharing
 * access. The API endpoint is `/vm_service_users`. Keys are 40-character
 * SHA1 hash strings.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/nas-service-user';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List users for a specific NAS service
 * const users = await client.nasServiceUsers.listByService(1);
 *
 * // Create a new user
 * const user = await client.nasServiceUsers.create({
 *   service: 1,
 *   name: 'john',
 *   password: 'secret',
 * });
 * ```
 */
export class NASServiceUserService extends BaseService<
	NASServiceUser,
	NASServiceUserCreateParams,
	NASServiceUserUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/vm_service_users', 'NAS Service User');
	}

	/**
	 * List NAS service users belonging to a specific NAS service.
	 *
	 * Convenience method that filters by the `service` foreign key.
	 *
	 * @param serviceKey - The parent NAS service's key
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of NAS service users for the specified service
	 */
	async listByService(serviceKey: FlexKey, options?: ListOptions): Promise<NASServiceUser[]> {
		const serviceFilter = `service eq ${serviceKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter
			? `${serviceFilter} and ${existingFilter}`
			: serviceFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
