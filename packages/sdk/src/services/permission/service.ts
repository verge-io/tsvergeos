import { NotFoundError } from '../../errors.js';
import { quoteFilterString } from '../../filter.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type { Permission, PermissionCreateParams, PermissionUpdateParams } from './types.js';

/**
 * Service for managing VergeOS permissions.
 *
 * Provides full CRUD operations plus convenience methods for granting,
 * revoking, and querying identity-based resource permissions.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/permission';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // Grant full access to a resource
 * await client.permissions.grantFullAccess(identityKey, 'vms', 42);
 *
 * // List permissions for an identity
 * const perms = await client.permissions.listByIdentity(identityKey);
 *
 * // Revoke access
 * await client.permissions.revoke(identityKey, 'vms', 42);
 * ```
 */
export class PermissionService extends BaseService<
	Permission,
	PermissionCreateParams,
	PermissionUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/permissions', 'Permission');
	}

	/**
	 * List permissions for a specific identity.
	 *
	 * @param identityKey - The identity ID to filter by
	 * @returns Array of permissions for the specified identity
	 */
	async listByIdentity(identityKey: FlexKey): Promise<Permission[]> {
		return this.list({ filter: `identity eq ${identityKey}` });
	}

	/**
	 * List permissions for a specific resource table.
	 *
	 * @param table - The resource type string (e.g., `vms`, `networks`)
	 * @returns Array of permissions for the specified table
	 */
	async listByTable(table: string): Promise<Permission[]> {
		return this.list({ filter: `table eq ${quoteFilterString(table)}` });
	}

	/**
	 * List permissions for a specific resource (table + row).
	 *
	 * @param table - The resource type string (e.g., `vms`, `networks`)
	 * @param rowId - The resource row ID
	 * @returns Array of permissions for the specified resource
	 */
	async listByResource(table: string, rowId: number): Promise<Permission[]> {
		return this.list({
			filter: `table eq ${quoteFilterString(table)} and row eq ${rowId}`,
		});
	}

	/**
	 * Get the permission for a specific identity and resource combination.
	 *
	 * @param identityKey - The identity ID
	 * @param table - The resource type string
	 * @param rowId - The resource row ID
	 * @returns The matching permission
	 * @throws {@link NotFoundError} if no permission exists for this combination
	 */
	async getByIdentityAndResource(
		identityKey: FlexKey,
		table: string,
		rowId: number,
	): Promise<Permission> {
		const results = await this.list({
			filter: `identity eq ${identityKey} and table eq ${quoteFilterString(table)} and row eq ${rowId}`,
		});
		if (results.length === 0) {
			throw new NotFoundError('Permission', `${identityKey}/${table}/${rowId}`);
		}
		return results[0] as Permission;
	}

	/**
	 * Grant specific permissions to an identity on a resource.
	 *
	 * Creates a new permission entry with the specified capability flags.
	 *
	 * @param identityKey - The identity ID
	 * @param table - The resource type string
	 * @param rowId - The resource row ID
	 * @param flags - Permission flags to set
	 * @returns The created permission
	 */
	async grant(
		identityKey: FlexKey,
		table: string,
		rowId: number,
		flags: {
			list?: boolean;
			read?: boolean;
			create?: boolean;
			modify?: boolean;
			delete?: boolean;
		},
	): Promise<Permission> {
		return this.create({
			identity: identityKey,
			table,
			row: rowId,
			...flags,
		});
	}

	/**
	 * Grant read-only access to an identity on a resource.
	 *
	 * Sets `list` and `read` to `true`, all others to `false`.
	 *
	 * @param identityKey - The identity ID
	 * @param table - The resource type string
	 * @param rowId - The resource row ID
	 * @returns The created permission
	 */
	async grantReadOnly(identityKey: FlexKey, table: string, rowId: number): Promise<Permission> {
		return this.grant(identityKey, table, rowId, {
			list: true,
			read: true,
			create: false,
			modify: false,
			delete: false,
		});
	}

	/**
	 * Grant full access to an identity on a resource.
	 *
	 * Sets all five capability flags to `true`.
	 *
	 * @param identityKey - The identity ID
	 * @param table - The resource type string
	 * @param rowId - The resource row ID
	 * @returns The created permission
	 */
	async grantFullAccess(identityKey: FlexKey, table: string, rowId: number): Promise<Permission> {
		return this.grant(identityKey, table, rowId, {
			list: true,
			read: true,
			create: true,
			modify: true,
			delete: true,
		});
	}

	/**
	 * Revoke all permissions for an identity on a specific resource.
	 *
	 * Finds the permission by identity/table/row and deletes it.
	 *
	 * @param identityKey - The identity ID
	 * @param table - The resource type string
	 * @param rowId - The resource row ID
	 * @throws {@link NotFoundError} if no permission exists for this combination
	 */
	async revoke(identityKey: FlexKey, table: string, rowId: number): Promise<void> {
		const perm = await this.getByIdentityAndResource(identityKey, table, rowId);
		await this.delete(perm.$key);
	}
}
