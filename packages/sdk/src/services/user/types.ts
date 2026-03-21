import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** User type classification in VergeOS. */
export type UserType = 'normal' | 'api' | 'vdi' | 'site_sync' | 'site_user';

/** Two-factor authentication method. */
export type TwoFactorType = 'email' | 'authenticator' | (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS user resource.
 *
 * Users represent accounts that can authenticate and interact with the VergeOS
 * system. Each user has credentials, optional two-factor authentication, and
 * can be assigned to groups with specific permissions.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface User extends Resource {
	/** Username. Min 1, max 128 characters. Unique. */
	name: string;

	/** 40-character unique identifier string. Read-only. */
	id?: string;

	/** Authorization source reference (FK to `auth_sources`). Read-only. */
	auth_source?: FlexKey;

	/** Remote username for external auth sources. */
	remote_name?: string;

	/** Whether the user account is enabled. Default: `true`. */
	enabled?: boolean;

	/** Display name. */
	displayname?: string;

	/** Email address. */
	email?: string;

	/** User type classification. Read-only. */
	type?: UserType;

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;

	/** Whether user must change password on next login. Default: `false`. */
	change_password?: boolean;

	/** Whether user has physical access to hardware. Default: `false`. */
	physical_access?: boolean;

	/** SSH public keys. */
	ssh_keys?: string;

	/** Number of consecutive failed login attempts. */
	failed_attempts?: number;

	/** Timestamp when account was locked (0 = not locked). */
	account_locked?: number;

	/** Last login timestamp. Read-only. */
	last_login?: number;

	/** Last forgot password request timestamp. */
	last_forgot_password?: number;

	/** Last forgot username request timestamp. */
	last_forgot_username?: number;

	/** Whether two-factor authentication is enabled. */
	two_factor_authentication?: boolean;

	/** Two-factor authentication method. Default: `email`. */
	two_factor_type?: TwoFactorType;

	/** Whether to configure 2FA at next login. Default: `false`. */
	two_factor_setup_next_login?: boolean;

	/** Theme override reference (FK to `themes`). */
	theme?: FlexKey;

	/** Identity reference (FK to `/sys/identities`). Read-only. */
	identity?: FlexKey;

	/** Credential reference (FK to `/sys/credentials`). Read-only. */
	credential?: FlexKey;

	/** User settings reference (FK to `user_settings`). Read-only. */
	settings?: FlexKey;

	/** User who created this account. Read-only. */
	creator?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new user.
 *
 * `name` and `password` are required. Read-only fields (`id`, `auth_source`,
 * `type`, `created`, `last_login`, `identity`, `credential`, `settings`,
 * `creator`) are excluded.
 */
export interface UserCreateParams {
	/** Username. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Password. Min 1, max 256 characters. Write-only — not returned in responses. */
	password: string;

	/** Remote username for external auth sources. */
	remote_name?: string;

	/** Whether the user account is enabled. Default: `true`. */
	enabled?: boolean;

	/** Display name. */
	displayname?: string;

	/** Email address. */
	email?: string;

	/** Whether user must change password on next login. Default: `false`. */
	change_password?: boolean;

	/** Whether user has physical access to hardware. Default: `false`. */
	physical_access?: boolean;

	/** SSH public keys. */
	ssh_keys?: string;

	/** Whether two-factor authentication is enabled. */
	two_factor_authentication?: boolean;

	/** Two-factor authentication method. */
	two_factor_type?: TwoFactorType;

	/** Whether to configure 2FA at next login. Default: `false`. */
	two_factor_setup_next_login?: boolean;

	/** Theme override reference (FK to `themes`). */
	theme?: FlexKey;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing user.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields are excluded.
 */
export interface UserUpdateParams {
	/** Username. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** New password. Min 1, max 256 characters. Write-only. */
	password?: string;

	/** Remote username for external auth sources. */
	remote_name?: string;

	/** Whether the user account is enabled. */
	enabled?: boolean;

	/** Display name. */
	displayname?: string;

	/** Email address. */
	email?: string;

	/** Whether user must change password on next login. */
	change_password?: boolean;

	/** Whether user has physical access to hardware. */
	physical_access?: boolean;

	/** SSH public keys. */
	ssh_keys?: string;

	/** Number of consecutive failed login attempts. */
	failed_attempts?: number;

	/** Timestamp when account was locked (0 = not locked). */
	account_locked?: number;

	/** Whether two-factor authentication is enabled. */
	two_factor_authentication?: boolean;

	/** Two-factor authentication method. */
	two_factor_type?: TwoFactorType;

	/** Whether to configure 2FA at next login. */
	two_factor_setup_next_login?: boolean;

	/** Theme override reference (FK to `themes`). */
	theme?: FlexKey;
}
