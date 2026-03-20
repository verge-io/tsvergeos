import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	CatalogRepository,
	CatalogRepositoryCreateParams,
	CatalogRepositoryUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS catalog repositories.
 *
 * Catalog repositories are sources of recipes. They can be local,
 * remote, or provider-type. Refreshing a repository discovers and
 * imports catalogs and their recipes.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/catalog-repository';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all repositories
 * const repos = await client.catalogRepositories.list();
 *
 * // Refresh a repository to discover new catalogs/recipes
 * await client.catalogRepositories.refresh(repos[0].$key);
 *
 * // Create a new remote repository
 * await client.catalogRepositories.create({
 *   name: 'my-repo',
 *   url: 'https://recipes.example.com',
 * });
 * ```
 */
export class CatalogRepositoryService extends BaseService<
	CatalogRepository,
	CatalogRepositoryCreateParams,
	CatalogRepositoryUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/catalog_repositories', 'Catalog Repository', {
			endpoint: 'catalog_repository_actions',
			key: 'repository',
		});
	}

	/**
	 * Refresh a catalog repository to discover new catalogs and recipes.
	 *
	 * Dispatches the `refresh` action to the `catalog_repository_actions` endpoint.
	 *
	 * @param key - The repository ID
	 */
	async refresh(key: FlexKey): Promise<void> {
		await this.dispatchAction('refresh', key);
	}
}
