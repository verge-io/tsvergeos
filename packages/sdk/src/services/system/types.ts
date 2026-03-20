import type { Resource } from '../../types.js';

/**
 * VergeOS system information from the `/api/v4/system` endpoint.
 *
 * This is a singleton resource (max 1 row) representing the current VergeOS system.
 */
export interface System extends Resource {
	/** Unique system key (always `'self'`). */
	key: string;
	/** 40-character unique system ID. */
	id: string;
	/** Display name of this VergeOS cloud. */
	cloud_name: string;
	/** VergeOS application version (e.g., `"6.1.2"`). */
	yb_version: string;
	/** Underlying OS version. */
	os_version: string;
	/** Release branch (e.g., `"stable"`, `"beta"`). */
	branch: string;
	/** Whether this system is running as a tenant. */
	is_tenant: boolean;
	/** System description. */
	description: string;
	/** Configured domain name. */
	domain: string;
	/** City location. */
	city: string;
	/** ISO 3166-1 alpha-2 country code (e.g., `"US"`). */
	country: string;
	/** IANA timezone identifier (e.g., `"America/New_York"`). */
	timezone: string;
	/** System URL. */
	url: string;
	/** Geographic latitude (-90 to 90). */
	latitude: number;
	/** Geographic longitude (-180 to 180). */
	longitude: number;
	/** vSAN host address. */
	vsan_host: string;
	/** vSAN port (0–65535, default 14201). */
	vsan_port: number;
	/** Map pin color for multi-site dashboards. */
	map_color: string;
	/** UI branding FK. */
	ui_branding: number;
	/** Default system theme FK. */
	theme: number;
}

/**
 * Fields that can be updated on the system record.
 *
 * Excludes read-only fields: `key`, `id`, `is_tenant`, `ui_branding`, `licenses`.
 */
export interface SystemUpdateParams {
	cloud_name?: string;
	yb_version?: string;
	os_version?: string;
	branch?: string;
	description?: string;
	domain?: string;
	city?: string;
	country?: string;
	timezone?: string;
	url?: string;
	latitude?: number;
	longitude?: number;
	vsan_host?: string;
	vsan_port?: number;
	map_color?: string;
	theme?: number;
}

/**
 * Lightweight version information from `/version.json`.
 *
 * This endpoint lives outside the API path and does not require authentication
 * on some configurations.
 */
export interface VersionInfo {
	/** Product name (e.g., `"VergeOS"`). */
	name: string;
	/** Version string (e.g., `"6.1.2"`). */
	version: string;
	/** Build hash. */
	hash: string;
}
