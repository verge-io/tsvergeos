import { NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey, MutationOptions } from '../../types.js';
import { WritableService } from '../base.js';
import type {
	UserAPIKey,
	UserAPIKeyCreateParams,
	UserAPIKeyCreateResult,
	UserAPIKeyUpdateParams,
} from './types.js';

/**
 * Raw response shape from the API when creating an API key.
 * The `response` object contains the one-time `token`.
 * @internal
 */
interface ApiKeyCreateResponse {
	$key: FlexKey;
	response?: {
		token?: string;
	};
}

/**
 * Service for managing VergeOS user API keys.
 *
 * Provides CRUD operations for API keys with a custom {@link create} method
 * that captures the one-time token returned only at creation time.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/api-key';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // Create an API key (token is only available at creation)
 * const { apiKey, token } = await client.apiKeys.create({ user: 1, name: 'my-key' });
 * console.log('Save this token:', token);
 *
 * // List API keys for a user
 * const keys = await client.apiKeys.listByUser(1);
 * ```
 */
export class APIKeyService extends WritableService<UserAPIKey, UserAPIKeyUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/user_api_keys', 'API Key');
	}

	/**
	 * Create a new API key and capture the one-time token.
	 *
	 * The VergeOS API returns the token only at creation time — it cannot
	 * be retrieved later. This method returns both the created resource
	 * and the token.
	 *
	 * @param params - The API key creation parameters
	 * @param options - Mutation options (e.g., `readBack: false` to skip re-fetch)
	 * @returns The created API key resource and the one-time token
	 */
	async create(
		params: UserAPIKeyCreateParams,
		options?: MutationOptions,
	): Promise<UserAPIKeyCreateResult> {
		const response = await this.http.post<ApiKeyCreateResponse>(this.resource, {
			body: params,
		});

		const key = response.$key;
		const token = response.response?.token ?? '';

		if (options?.readBack === false) {
			return { apiKey: { $key: key } as UserAPIKey, token };
		}

		const apiKey = await this.get(key);
		return { apiKey, token };
	}

	/**
	 * List API keys for a specific user.
	 *
	 * @param userKey - The user ID to filter by
	 * @returns Array of API keys for the specified user
	 */
	async listByUser(userKey: FlexKey): Promise<UserAPIKey[]> {
		return this.list({ filter: `user eq ${userKey}` });
	}

	/**
	 * Get an API key by name within a specific user's keys.
	 *
	 * Uses a compound filter on `user` and `name` to find the key.
	 * Unlike the base `getByName()`, this scopes the search to a specific user.
	 *
	 * @param userKey - The user ID to search within
	 * @param name - The API key name to search for
	 * @returns The matching API key
	 * @throws {@link NotFoundError} if no API key with that name exists for the user
	 */
	async getByUserAndName(userKey: FlexKey, name: string): Promise<UserAPIKey> {
		const results = await this.list({
			filter: `user eq ${userKey} and name eq '${name}'`,
		});
		if (results.length === 0) {
			throw new NotFoundError('API Key', name);
		}
		return results[0] as UserAPIKey;
	}
}
