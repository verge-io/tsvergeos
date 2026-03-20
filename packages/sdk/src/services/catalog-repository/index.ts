/**
 * Catalog repository service registration module.
 *
 * Importing this module registers the {@link CatalogRepositoryService} on {@link VergeClient},
 * making `client.catalogRepositories` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/catalog-repository';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { CatalogRepositoryService } from './service.js';

VergeClient.registerService('catalogRepositories', CatalogRepositoryService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing catalog repositories. */
		readonly catalogRepositories: CatalogRepositoryService;
	}
}

export { CatalogRepositoryService } from './service.js';
export type {
	CatalogMaxTier,
	CatalogRepository,
	CatalogRepositoryCreateParams,
	CatalogRepositoryOverrideScope,
	CatalogRepositoryType,
	CatalogRepositoryUpdateParams,
} from './types.js';
