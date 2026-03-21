import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type { Group, GroupCreateParams, GroupUpdateParams } from './types.js';

/**
 * Service for managing VergeOS groups.
 *
 * Provides full CRUD operations for groups, which organize users for
 * collective permission management and access control.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/group';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all groups
 * const groups = await client.groups.list();
 *
 * // Create a group
 * const group = await client.groups.create({ name: 'developers' });
 * ```
 */
export class GroupService extends BaseService<Group, GroupCreateParams, GroupUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/groups', 'Group');
	}

	/**
	 * Apply a tag to a group.
	 *
	 * Uses the inline action endpoint: `POST /groups/{key}/tag`.
	 *
	 * @param key - The group ID
	 * @param tag - The tag member reference (e.g., `"tags/123"`)
	 */
	async tag(key: FlexKey, tag: string): Promise<void> {
		await this.inlineAction(key, 'tag', { member: tag });
	}

	/**
	 * Remove a tag from a group.
	 *
	 * Uses the inline action endpoint: `POST /groups/{key}/untag`.
	 *
	 * @param key - The group ID
	 * @param tag - The tag member reference (e.g., `"tags/123"`)
	 */
	async untag(key: FlexKey, tag: string): Promise<void> {
		await this.inlineAction(key, 'untag', { member: tag });
	}
}
