import { quoteFilterString } from '../../filter.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { TagMember, TagMemberCreateParams } from './types.js';

/**
 * Service for managing VergeOS tag members.
 *
 * Tag members link tags to resources. Both fields (`tag` and `member`) are
 * read-only after creation, so this service does not expose `update()`.
 * To reassign, delete the tag member and create a new one.
 *
 * Use the convenience methods {@link assign} and {@link unassign} for
 * idiomatic tag operations.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/tag-member';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // Assign a tag to a VM
 * await client.tagMembers.assign(1, 'vms/42');
 *
 * // List all resources tagged with tag 1
 * const members = await client.tagMembers.listByTag(1);
 *
 * // Unassign (idempotent — no-op if not found)
 * await client.tagMembers.unassign(1, 'vms/42');
 * ```
 */
export class TagMemberService extends BaseService<TagMember, TagMemberCreateParams, never> {
	constructor(http: HttpClient) {
		super(http, '/tag_members', 'TagMember');
	}

	/**
	 * List tag members for a specific tag.
	 *
	 * Convenience method that filters by the `tag` foreign key.
	 *
	 * @param tagKey - The tag ID to filter by
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of tag members for the specified tag
	 */
	async listByTag(tagKey: FlexKey, options?: ListOptions): Promise<TagMember[]> {
		const tagFilter = `tag eq ${tagKey}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${tagFilter} and ${existingFilter}` : tagFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}

	/**
	 * List tag members for a specific resource.
	 *
	 * Convenience method that filters by the `member` field (polymorphic
	 * reference in `"type/id"` format).
	 *
	 * @param member - The resource reference to filter by, e.g. `"vms/123"`
	 * @param options - Additional list options (filter, sort, fields, pagination)
	 * @returns Array of tag members for the specified resource
	 */
	async listByMember(member: string, options?: ListOptions): Promise<TagMember[]> {
		const memberFilter = `member eq ${quoteFilterString(member)}`;
		const existingFilter = options?.filter;
		const combinedFilter = existingFilter ? `${memberFilter} and ${existingFilter}` : memberFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}

	/**
	 * Assign a tag to a resource.
	 *
	 * Convenience wrapper around {@link create} that accepts the tag key and
	 * member reference directly.
	 *
	 * @param tagKey - The tag ID to assign
	 * @param member - The resource reference in `"type/id"` format, e.g. `"vms/123"`
	 * @returns The created tag member
	 */
	async assign(tagKey: FlexKey, member: string): Promise<TagMember> {
		return this.create({ tag: tagKey, member });
	}

	/**
	 * Unassign a tag from a resource.
	 *
	 * Looks up the tag member by tag + member filter, then deletes it.
	 * No-op if the assignment does not exist.
	 *
	 * @param tagKey - The tag ID to unassign
	 * @param member - The resource reference in `"type/id"` format, e.g. `"vms/123"`
	 */
	async unassign(tagKey: FlexKey, member: string): Promise<void> {
		const matches = await this.list({
			filter: `tag eq ${tagKey} and member eq ${quoteFilterString(member)}`,
		});

		const first = matches[0];
		if (!first) {
			return;
		}

		await this.delete(first.$key);
	}
}
