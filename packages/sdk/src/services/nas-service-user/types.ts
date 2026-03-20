import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ──────────────────────────────────────────────────────────

/**
 * A VergeOS NAS service user resource.
 *
 * NAS service users are per-NAS-service accounts for CIFS/NFS access.
 * The API endpoint is `/vm_service_users`. Keys are 40-character SHA1
 * hash strings. The `service` FK references the parent NAS service
 * (`vm_services`).
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface NASServiceUser extends Resource {
	/** User ID — 40-character SHA1 hash. Read-only, unique. */
	id: string;

	/** Parent NAS service reference (FK to `vm_services`). Required, read-only. */
	service: FlexKey;

	/** Username. Min 1, max 32 characters. Required, read-only after creation, unique. */
	name: string;

	/** Whether the user is enabled. Default: true. */
	enabled?: boolean;

	/** Home CIFS share (FK to `volume_cifs_shares`). */
	home_share?: FlexKey;

	/** Home drive letter. */
	home_drive?: string;

	/** User display name. */
	displayname?: string;

	/** User description. Max 2048 characters. */
	description?: string;

	/** Creation timestamp (Unix epoch, uint32). */
	created?: number;

	/** User password. Max 256 characters. */
	password?: string;

	/** User status reference (FK to `vm_service_user_status`). Read-only. */
	status?: FlexKey;
}

// ─── Create Params ──────────────────────────────────────────────────────────

/**
 * Parameters for creating a new NAS service user.
 *
 * `service`, `name`, and `password` are required.
 * `name` is read-only after creation.
 */
export interface NASServiceUserCreateParams {
	/** Parent NAS service reference (FK to `vm_services`). Required. */
	service: FlexKey;

	/** Username. Min 1, max 32 characters. Required, unique. */
	name: string;

	/** User password. Required. Max 256 characters. */
	password: string;

	/** Whether the user is enabled. Default: true. */
	enabled?: boolean;

	/** Home CIFS share (FK to `volume_cifs_shares`). */
	home_share?: FlexKey;

	/** Home drive letter. */
	home_drive?: string;

	/** User display name. */
	displayname?: string;

	/** User description. Max 2048 characters. */
	description?: string;
}

// ─── Update Params ──────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing NAS service user.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`id`, `service`, `name`, `status`) are excluded.
 */
export interface NASServiceUserUpdateParams {
	/** User password. Max 256 characters. */
	password?: string;

	/** Whether the user is enabled. */
	enabled?: boolean;

	/** Home CIFS share (FK to `volume_cifs_shares`). */
	home_share?: FlexKey;

	/** Home drive letter. */
	home_drive?: string;

	/** User display name. */
	displayname?: string;

	/** User description. Max 2048 characters. */
	description?: string;
}
