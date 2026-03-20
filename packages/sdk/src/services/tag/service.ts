import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { Tag, TagCreateParams, TagUpdateParams } from './types.js';

/**
 * Service for managing VergeOS tags.
 *
 * Tags are named labels belonging to a {@link TagCategory}. They can be applied
 * to resources via tag members. Tag names are unique across the system.
 *
 * Deleting a tag cascades to all its tag members.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/tag';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all tags
 * const tags = await client.tags.list();
 *
 * // Create a tag in a category
 * const tag = await client.tags.create({
 *   name: 'production',
 *   category: 1,
 * });
 *
 * // List tags in a specific category
 * const envTags = await client.tags.listByCategory(1);
 * ```
 */
export class TagService extends BaseService<Tag, TagCreateParams, TagUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/tags', 'Tag');
	}

	/**
	 * List tags belonging to a specific category.
	 *
	 * Convenience method that filters by the `category` foreign key.
	 *
	 * @param categoryKey - The parent tag category ID
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of tags in the specified category
	 */
	async listByCategory(categoryKey: FlexKey, options?: ListOptions): Promise<Tag[]> {
		const categoryFilter = `category eq ${categoryKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter
			? `${categoryFilter} and ${existingFilter}`
			: categoryFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
