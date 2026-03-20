import type { Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Rendering mode for cloud-init file contents. */
export type CloudInitFileRender = 'no' | 'variables' | 'jinja2';

// ─── Resource Type ───────────────────────────────────────────────────────────

/** A cloud-init file template used by VM recipes and manual VM creation. */
export interface CloudInitFile extends Resource {
	id?: string;
	owner?: number;
	name?: string;
	allocated_bytes?: number;
	used_bytes?: number;
	filesize?: number;
	modified?: number;
	contents?: string;
	contains_variables?: boolean;
	render?: CloudInitFileRender;
	creator?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/** Parameters for creating a new cloud-init file. */
export interface CloudInitFileCreateParams {
	/** File name (required, 1–256 chars). */
	name: string;
	/** File contents (max 65536 chars). */
	contents?: string;
	/** Whether the file contains template variables. */
	contains_variables?: boolean;
	/** Rendering mode. */
	render?: CloudInitFileRender;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/** Parameters for updating an existing cloud-init file. */
export interface CloudInitFileUpdateParams {
	name?: string;
	contents?: string;
	contains_variables?: boolean;
	render?: CloudInitFileRender;
}
