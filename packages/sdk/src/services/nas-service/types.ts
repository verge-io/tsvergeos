import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ──────────────────────────────────────────────────

/** Read-ahead buffer size in kilobytes (string values). */
export type NASReadAheadKb = '0' | '64' | '128' | '256' | '512' | '1024' | '2048' | '4096';

// ─── Resource Type ──────────────────────────────────────────────────────────

/**
 * A VergeOS NAS service resource.
 *
 * NAS services manage file sharing (CIFS/NFS) for volumes. The actual API
 * endpoint is `/vm_services` — each NAS service is backed by a dedicated VM.
 * The `vm` FK references the underlying VM.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface NASService extends Resource {
	/** Parent VM reference (FK to `vms`). Read-only, unique. */
	vm: FlexKey;

	/** NAS service name. Trimmed. */
	name: string;

	/** CIFS configuration reference (FK to `vm_service_cifs`). Read-only. */
	cifs?: FlexKey;

	/** NFS configuration reference (FK to `vm_service_nfs`). Read-only. */
	nfs?: FlexKey;

	/** Antivirus configuration reference (FK to `vm_service_antivirus`). Read-only. */
	antivirus?: FlexKey;

	/** Maximum simultaneous import jobs. Min 1, max 200. Default: 4. */
	max_imports?: number;

	/** Maximum simultaneous sync jobs. Min 0, max 200. Default: 0. */
	max_syncs?: number;

	/** Whether swap is disabled. Default: false. */
	disable_swap?: boolean;

	/** Read-ahead buffer size in kilobytes. Default: '0' (automatic). */
	read_ahead_kb_default?: NASReadAheadKb;
}

// ─── Create Params ──────────────────────────────────────────────────────────

/**
 * Parameters for creating a new NAS service.
 *
 * The `vm` FK is typically set by the system when creating the service.
 * Most fields have sensible defaults.
 */
export interface NASServiceCreateParams {
	/** NAS service name. */
	name?: string;

	/** Maximum simultaneous import jobs. Min 1, max 200. Default: 4. */
	max_imports?: number;

	/** Maximum simultaneous sync jobs. Min 0, max 200. Default: 0. */
	max_syncs?: number;

	/** Whether swap is disabled. Default: false. */
	disable_swap?: boolean;

	/** Read-ahead buffer size in kilobytes. Default: '0' (automatic). */
	read_ahead_kb_default?: NASReadAheadKb;
}

// ─── Update Params ──────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing NAS service.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`vm`, `cifs`, `nfs`, `antivirus`) are excluded.
 */
export interface NASServiceUpdateParams {
	/** NAS service name. */
	name?: string;

	/** Maximum simultaneous import jobs. Min 1, max 200. */
	max_imports?: number;

	/** Maximum simultaneous sync jobs. Min 0, max 200. */
	max_syncs?: number;

	/** Whether swap is disabled. */
	disable_swap?: boolean;

	/** Read-ahead buffer size in kilobytes. */
	read_ahead_kb_default?: NASReadAheadKb;
}
