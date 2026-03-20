import type { HttpClient } from '../../http.js';
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
}
