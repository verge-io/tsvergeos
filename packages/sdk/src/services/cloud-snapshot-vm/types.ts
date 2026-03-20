import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ──────────────────────────────────────────────────

/** Cloud snapshot VM import/recovery status. */
export type CloudSnapshotVMStatus = 'idle' | 'importing' | 'complete' | 'error';

// ─── Resource Type ──────────────────────────────────────────────────────────

/**
 * A VM captured within a VergeOS cloud snapshot.
 *
 * Cloud snapshot VMs are read-only records representing the VMs that
 * existed at the time a cloud snapshot was taken. Use these records to
 * browse snapshot contents or recover individual VMs.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface CloudSnapshotVM extends Resource {
	/** FK to the parent cloud snapshot. Read-only. */
	cloud_snapshot: FlexKey;

	/** Original VM key at the time the snapshot was taken. Read-only. */
	original_key: number;

	/** VM name at the time of snapshot. Read-only. */
	name: string;

	/** VM description at the time of snapshot. Read-only. */
	description?: string;

	/** VM UUID. Read-only. */
	uuid?: string;

	/** Machine UUID of the VM. Read-only. */
	machine_uuid?: string;

	/** Number of CPU cores assigned to the VM. Read-only. */
	cpu_cores?: number;

	/** RAM assigned to the VM in bytes. Read-only. */
	ram?: number;

	/** OS family of the VM (e.g., "linux", "windows"). Read-only. */
	os_family?: string;

	/** Whether this entry itself is a snapshot. */
	is_snapshot?: boolean;

	/** Import/recovery status. */
	status?: CloudSnapshotVMStatus;

	/** Additional status information (e.g., error details). */
	status_info?: string;
}
