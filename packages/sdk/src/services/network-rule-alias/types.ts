import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Publishing scope for a rule alias. Controls visibility across tenants. */
export type PublishingScope = 'private' | 'global' | 'tenant' | 'none' | (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS network rule alias resource.
 *
 * Rule aliases are **global** named address groups that can be referenced in
 * firewall rules across networks. Unlike rules and addresses, aliases are not
 * scoped to a parent network — they exist at the system level with visibility
 * controlled by `publishing_scope`.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface NetworkRuleAlias extends Resource {
	/** Alias display name. Min 1, max 128 characters. Unique. */
	name: string;

	/** SHA1 hash identifier. Read-only. Min/max 40 characters. Unique. */
	id?: string;

	/** Comma-delimited list of addresses (IPs, CIDRs, or other alias references). */
	value: string;

	/** Publishing scope controlling visibility. Default: `private`. */
	publishing_scope?: PublishingScope;

	/** Owner reference. Read-only. */
	owner?: FlexKey;

	/** Human-readable description. Max 2048 characters. */
	description?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new network rule alias.
 *
 * `name` and `value` are required per the API schema.
 */
export interface NetworkRuleAliasCreateParams {
	/** Alias display name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Comma-delimited list of addresses (IPs, CIDRs, or other alias references). */
	value: string;

	/** Publishing scope controlling visibility. Default: `private`. */
	publishing_scope?: PublishingScope;

	/** Human-readable description. Max 2048 characters. */
	description?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing network rule alias.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`id`, `owner`) are excluded.
 */
export interface NetworkRuleAliasUpdateParams {
	/** Alias display name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** Comma-delimited list of addresses (IPs, CIDRs, or other alias references). */
	value?: string;

	/** Publishing scope controlling visibility. */
	publishing_scope?: PublishingScope;

	/** Human-readable description. Max 2048 characters. */
	description?: string;
}
