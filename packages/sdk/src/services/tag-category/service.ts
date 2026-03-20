import type { HttpClient } from '../../http.js';
import { BaseService } from '../base.js';
import type { TagCategory, TagCategoryCreateParams, TagCategoryUpdateParams } from './types.js';

/**
 * Service for managing VergeOS tag categories.
 *
 * Tag categories group related tags (e.g., "Environment" → "production", "staging").
 * Each category controls which resource types can be tagged via `taggable_*` boolean
 * fields and whether only a single tag from the category can be applied
 * (`single_tag_selection`).
 *
 * Deleting a category cascades to all tags within it and their tag members.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/tag-category';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all tag categories
 * const categories = await client.tagCategories.list();
 *
 * // Create a new category for VM environments
 * const category = await client.tagCategories.create({
 *   name: 'Environment',
 *   taggable_vms: true,
 *   single_tag_selection: true,
 * });
 * ```
 */
export class TagCategoryService extends BaseService<
	TagCategory,
	TagCategoryCreateParams,
	TagCategoryUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/tag_categories', 'Tag Category');
	}
}
