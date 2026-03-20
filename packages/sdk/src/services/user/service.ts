import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type { User, UserCreateParams, UserUpdateParams } from './types.js';

/**
 * Service for managing VergeOS users.
 *
 * Provides full CRUD operations plus enable/disable actions for user account
 * management including authentication, two-factor setup, and access control.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/user';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all users
 * const users = await client.users.list();
 *
 * // Enable a user
 * await client.users.enable(3);
 *
 * // Disable a user
 * await client.users.disable(3);
 * ```
 */
export class UserService extends BaseService<User, UserCreateParams, UserUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/users', 'User');
	}

	/**
	 * Enable a user account.
	 *
	 * @param key - The user ID
	 */
	async enable(key: FlexKey): Promise<void> {
		await this.dispatchAction('enable', key);
	}

	/**
	 * Disable a user account.
	 *
	 * @param key - The user ID
	 */
	async disable(key: FlexKey): Promise<void> {
		await this.dispatchAction('disable', key);
	}
}
