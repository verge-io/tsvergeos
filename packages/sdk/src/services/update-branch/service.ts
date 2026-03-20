import type { HttpClient } from '../../http.js';
import { ReadOnlyService } from '../base.js';
import type { UpdateBranch } from './types.js';

/**
 * Service for querying VergeOS update branches.
 *
 * Update branches are read-only release channels. The display field is
 * `description` rather than `name`.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/update-branch';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all update branches
 * const branches = await client.updateBranches.list();
 * ```
 */
export class UpdateBranchService extends ReadOnlyService<UpdateBranch> {
	constructor(http: HttpClient) {
		super(http, '/update_branches', 'UpdateBranch');
	}
}
