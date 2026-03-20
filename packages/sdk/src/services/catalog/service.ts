import type { HttpClient } from '../../http.js';
import { WritableService } from '../base.js';
import type { Catalog, CatalogUpdateParams } from './types.js';

/**
 * Service for managing VergeOS catalogs.
 *
 * Catalogs are containers for VM and tenant recipes, organized by
 * repository. They are created automatically by the repository refresh
 * process — create is not supported via the SDK. This service supports
 * listing, getting, updating, and deleting catalogs.
 *
 * Catalog keys are 40-character hex strings (not integers).
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/catalog';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all catalogs
 * const catalogs = await client.catalogs.list();
 *
 * // Get a specific catalog
 * const catalog = await client.catalogs.get(catalogs[0].$key);
 *
 * // Update publishing scope
 * await client.catalogs.update(catalog.$key, { publishing_scope: 'global' });
 * ```
 */
export class CatalogService extends WritableService<Catalog, CatalogUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/catalogs', 'Catalog');
	}
}
