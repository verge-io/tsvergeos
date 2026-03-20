/**
 * Update source service registration module.
 *
 * Importing this module registers the {@link UpdateSourceService} on {@link VergeClient},
 * making `client.updateSources` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/update-source';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { UpdateSourceService } from './service.js';

VergeClient.registerService('updateSources', UpdateSourceService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing update sources. */
		readonly updateSources: UpdateSourceService;
	}
}

export { UpdateSourceService } from './service.js';
export type {
	UpdateSource,
	UpdateSourceAction,
	UpdateSourceCreateParams,
	UpdateSourceUpdateParams,
} from './types.js';
