import { NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type { Member, MemberCreateParams, MemberUpdateParams } from './types.js';

/**
 * Service for managing VergeOS group memberships.
 *
 * Members represent the join table linking users or groups to parent groups.
 * Provides CRUD operations plus convenience methods for adding/removing
 * members from groups and filtering by group.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/member';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List members of a group
 * const members = await client.members.listByGroup(1);
 *
 * // Add a user to a group
 * const membership = await client.members.add(1, 'users/3');
 *
 * // Remove a user from a group
 * await client.members.remove(1, 'users/3');
 * ```
 */
export class MemberService extends BaseService<Member, MemberCreateParams, MemberUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/members', 'Member');
	}

	/**
	 * List members belonging to a specific group.
	 *
	 * @param groupKey - The group ID to filter by
	 * @returns Array of memberships for the specified group
	 */
	async listByGroup(groupKey: FlexKey): Promise<Member[]> {
		return this.list({ filter: `parent_group eq ${groupKey}` });
	}

	/**
	 * Add a user or group to a group.
	 *
	 * Convenience wrapper around {@link create} that constructs the
	 * appropriate create params.
	 *
	 * @param groupKey - The parent group ID
	 * @param member - The member reference string (e.g., `users/3` or `groups/5`)
	 * @returns The created membership
	 */
	async add(groupKey: FlexKey, member: string): Promise<Member> {
		return this.create({ parent_group: groupKey, member });
	}

	/**
	 * Remove a user or group from a group.
	 *
	 * Finds the membership by filtering on `parent_group` and `member`,
	 * then deletes it.
	 *
	 * @param groupKey - The parent group ID
	 * @param member - The member reference string (e.g., `users/3` or `groups/5`)
	 * @throws {@link NotFoundError} if the membership does not exist
	 */
	async remove(groupKey: FlexKey, member: string): Promise<void> {
		const results = await this.list({
			filter: `parent_group eq ${groupKey} and member eq '${member}'`,
		});
		if (results.length === 0) {
			throw new NotFoundError('Member', `${groupKey}/${member}`);
		}
		const match = results[0];
		if (!match) {
			throw new NotFoundError('Member', `${groupKey}/${member}`);
		}
		await this.delete(match.$key);
	}
}
