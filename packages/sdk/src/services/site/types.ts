import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Types ────────────────────────────────────────────────────

/** Site connection status. Named `SiteConnectionStatus` to avoid conflict with `SiteStatus` in the multi-site manager. */
export type SiteConnectionStatus = 'idle' | 'authenticating' | 'syncing' | 'error' | 'warning';

/** Site authentication status. */
export type SiteAuthenticationStatus = 'unauthenticated' | 'authenticated' | 'legacy';

/** Site capability configuration mode for cloud snapshots, statistics, and repair server. */
export type SiteConfigMode = 'disabled' | 'send' | 'receive' | 'both';

/** Site management configuration mode. */
export type SiteManagementMode = 'disabled' | 'manage' | 'managed' | 'both';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS remote site resource.
 *
 * Sites are trusted peer VergeOS systems used for disaster recovery,
 * backup, and synchronization. Each site represents a connection to
 * a remote VergeOS instance.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface Site extends Resource {
	/** Site name. */
	name?: string;

	/** 40-character SHA1 unique identifier. Read-only. */
	id?: string;

	/** Human-readable description. */
	description?: string;

	/** Whether the site is enabled. */
	enabled?: boolean;

	/** Domain name for the remote site. */
	domain?: string;

	/** City location. */
	city?: string;

	/** 2-letter country code (e.g., "US"). */
	country?: string;

	/** Geographic latitude. */
	latitude?: number;

	/** Geographic longitude. */
	longitude?: number;

	/** Timezone identifier (e.g., "America/New_York"). */
	timezone?: string;

	/** Remote site URL. Required for creation. */
	url?: string;

	/** Whether to allow insecure SSL connections. */
	allow_insecure?: boolean;

	/** Current connection status. Read-only. */
	status?: SiteConnectionStatus;

	/** Additional status information. Read-only. */
	status_info?: string;

	/** Authentication status with the remote site. Read-only. */
	authentication_status?: SiteAuthenticationStatus;

	/** vSAN connection host. */
	vsan_host?: string;

	/** vSAN connection port (default 14201). */
	vsan_port?: number;

	/** Whether this site is a tenant. Read-only. */
	is_tenant?: boolean;

	/** Cloud snapshot sync configuration. */
	config_cloud_snapshots?: SiteConfigMode;

	/** Statistics sync configuration. */
	config_statistics?: SiteConfigMode;

	/** Management configuration. */
	config_management?: SiteManagementMode;

	/** Repair server configuration. */
	config_repair_server?: SiteConfigMode;

	/** Whether incoming syncs are enabled. Read-only. */
	incoming_syncs_enabled?: boolean;

	/** Whether outgoing syncs are enabled. Read-only. */
	outgoing_syncs_enabled?: boolean;

	/** Whether outgoing repairs are enabled. Read-only. */
	repairs_outgoing_enabled?: boolean;

	/** Whether incoming statistics are enabled. Read-only. */
	incoming_stats_enabled?: boolean;

	/** Whether outgoing statistics are enabled. Read-only. */
	outgoing_stats_enabled?: boolean;

	/** Whether outgoing management is enabled. Read-only. */
	outgoing_management_enabled?: boolean;

	/** Whether incoming management is enabled. Read-only. */
	incoming_management_enabled?: boolean;

	/** Statistics collection interval in seconds (default 600, min 300). */
	statistics_interval?: number;

	/** Statistics retention in seconds (default 3888000 = 45 days). */
	statistics_retention?: number;

	/** URL the remote system uses to connect back. */
	request_url?: string;

	/** Remote user for authentication. Read-only. */
	remote_user?: string;

	/** Remote authentication token. */
	remote_token?: string;

	/** User FK (to `users`). Locked. */
	user?: FlexKey;

	/** Site data FK (to `site_data`). Read-only. */
	site_data?: FlexKey;

	/** Last log timestamp (Unix epoch microseconds). */
	last_log_timestamp?: number;

	/** Logo URL (144x36). */
	logo_url?: string;

	/** Logo background color. */
	header_bg?: string;

	/** Map pin color. */
	map_color?: string;

	/** Last statistics update timestamp (epoch seconds). Read-only. */
	last_stat_update?: number;

	/** Last modification timestamp (epoch seconds). Read-only. */
	modified?: number;

	/** Creation timestamp (epoch seconds). Read-only. */
	created?: number;

	/** Creator username. Read-only. */
	creator?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new remote site.
 *
 * Only `url` is strictly required. `auth_user` and `auth_password` are
 * one-time credentials used during site creation for initial authentication
 * — they are not stored.
 */
export interface SiteCreateParams {
	/** Remote site URL. Required. */
	url: string;

	/** Site name. */
	name?: string;

	/** Human-readable description. */
	description?: string;

	/** Whether the site is enabled. */
	enabled?: boolean;

	/** Domain name for the remote site. */
	domain?: string;

	/** City location. */
	city?: string;

	/** 2-letter country code. */
	country?: string;

	/** Geographic latitude. */
	latitude?: number;

	/** Geographic longitude. */
	longitude?: number;

	/** Timezone identifier. */
	timezone?: string;

	/** Whether to allow insecure SSL connections. */
	allow_insecure?: boolean;

	/** Username for initial site authentication (not stored). */
	auth_user?: string;

	/** Password for initial site authentication (not stored). */
	auth_password?: string;

	/** Cloud snapshot sync configuration. */
	config_cloud_snapshots?: SiteConfigMode;

	/** Statistics sync configuration. */
	config_statistics?: SiteConfigMode;

	/** Management configuration. */
	config_management?: SiteManagementMode;

	/** Repair server configuration. */
	config_repair_server?: SiteConfigMode;

	/** Statistics collection interval in seconds. */
	statistics_interval?: number;

	/** Statistics retention in seconds. */
	statistics_retention?: number;

	/** URL the remote system uses to connect back. */
	request_url?: string;

	/** Automatically create syncs when site is added. Default true. */
	automatically_create_syncs?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing remote site.
 *
 * All fields are optional — only provided fields are changed.
 */
export interface SiteUpdateParams {
	/** Site name. */
	name?: string;

	/** Human-readable description. */
	description?: string;

	/** Whether the site is enabled. */
	enabled?: boolean;

	/** Domain name for the remote site. */
	domain?: string;

	/** City location. */
	city?: string;

	/** 2-letter country code. */
	country?: string;

	/** Geographic latitude. */
	latitude?: number;

	/** Geographic longitude. */
	longitude?: number;

	/** Timezone identifier. */
	timezone?: string;

	/** Remote site URL. */
	url?: string;

	/** Whether to allow insecure SSL connections. */
	allow_insecure?: boolean;

	/** Cloud snapshot sync configuration. */
	config_cloud_snapshots?: SiteConfigMode;

	/** Statistics sync configuration. */
	config_statistics?: SiteConfigMode;

	/** Management configuration. */
	config_management?: SiteManagementMode;

	/** Repair server configuration. */
	config_repair_server?: SiteConfigMode;

	/** Statistics collection interval in seconds. */
	statistics_interval?: number;

	/** Statistics retention in seconds. */
	statistics_retention?: number;

	/** URL the remote system uses to connect back. */
	request_url?: string;

	/** Remote user for authentication. */
	remote_user?: string;

	/** Remote password for authentication. */
	remote_password?: string;

	/** Logo URL (144x36). */
	logo_url?: string;

	/** Logo background color. */
	header_bg?: string;

	/** Map pin color. */
	map_color?: string;

	/** Force a refresh of site data. */
	force_refresh?: boolean;
}
