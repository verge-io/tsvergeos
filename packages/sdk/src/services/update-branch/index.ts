/**
 * Update branch service registration module.
 *
 * Importing this module registers the {@link UpdateBranchService} on {@link VergeClient},
 * making `client.updateBranches` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/update-branch';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { UpdateBranchService } from './service.js';

VergeClient.registerService('updateBranches', UpdateBranchService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying update branches (read-only). */
		readonly updateBranches: UpdateBranchService;
	}
}

export { UpdateBranchService } from './service.js';
export type { UpdateBranch } from './types.js';
