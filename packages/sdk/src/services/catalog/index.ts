/**
 * Catalog service registration module.
 *
 * Importing this module registers the {@link CatalogService} on {@link VergeClient},
 * making `client.catalogs` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/catalog';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { CatalogService } from './service.js';

VergeClient.registerService('catalogs', CatalogService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing catalogs. */
		readonly catalogs: CatalogService;
	}
}

export { CatalogService } from './service.js';
export type {
	Catalog,
	CatalogPublishingScope,
	CatalogUpdateParams,
} from './types.js';
