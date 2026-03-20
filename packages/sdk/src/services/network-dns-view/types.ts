import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS DNS view resource.
 *
 * DNS views are part of the BIND DNS subsystem on virtual networks. Views
 * contain zones and control which clients see which DNS data. Views are
 * scoped to a parent network via the `vnet` foreign key.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface NetworkDnsView extends Resource {
	/** Parent network reference (FK to `vnets`). */
	vnet: FlexKey;

	/** View display name. */
	name: string;

	/** Whether recursive queries are allowed. */
	recursion?: boolean;

	/** ACL of clients that match this view. */
	match_clients?: string;

	/** ACL of destinations that match this view. */
	match_destinations?: string;

	/** Maximum cache size in bytes. */
	max_cache_size?: number;

	/** Ordering position. */
	orderid?: number;

	/** Query source address (FK to `vnet_addresses`). */
	query_source?: FlexKey;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new DNS view.
 *
 * `vnet` and `name` are required.
 */
export interface NetworkDnsViewCreateParams {
	/** Parent network reference (FK to `vnets`). */
	vnet: FlexKey;

	/** View display name. */
	name: string;

	/** Whether recursive queries are allowed. */
	recursion?: boolean;

	/** ACL of clients that match this view. */
	match_clients?: string;

	/** ACL of destinations that match this view. */
	match_destinations?: string;

	/** Maximum cache size in bytes. */
	max_cache_size?: number;

	/** Ordering position. */
	orderid?: number;

	/** Query source address (FK to `vnet_addresses`). */
	query_source?: FlexKey;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing DNS view.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`modified`) are excluded.
 */
export interface NetworkDnsViewUpdateParams {
	/** Parent network reference (FK to `vnets`). */
	vnet?: FlexKey;

	/** View display name. */
	name?: string;

	/** Whether recursive queries are allowed. */
	recursion?: boolean;

	/** ACL of clients that match this view. */
	match_clients?: string;

	/** ACL of destinations that match this view. */
	match_destinations?: string;

	/** Maximum cache size in bytes. */
	max_cache_size?: number;

	/** Ordering position. */
	orderid?: number;

	/** Query source address (FK to `vnet_addresses`). */
	query_source?: FlexKey;
}
