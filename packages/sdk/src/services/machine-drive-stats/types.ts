import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine drive stats resource.
 *
 * Provides per-drive I/O performance metrics including read/write operations,
 * throughput, utilization, and capacity. Each machine drive has one stats row
 * that is continuously updated by the system. This is a read-only monitoring resource.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineDriveStats extends Resource {
	/** Parent drive reference (FK to `machine_drives`). */
	parent_drive: FlexKey;

	/** Read operations per second. */
	rops?: number;

	/** Write operations per second. */
	wops?: number;

	/** Read bytes per second. */
	rbps?: number;

	/** Write bytes per second. */
	wbps?: number;

	/** Total bytes per second (read + write). */
	totalbps?: number;

	/** Total write operations. */
	writes?: number;

	/** Total read operations. */
	reads?: number;

	/** Total bytes written. */
	write_bytes?: number;

	/** Total bytes read. */
	read_bytes?: number;

	/** Currently used bytes. */
	used_bytes?: number;

	/** Maximum bytes capacity. */
	max_bytes?: number;

	/** Average service time for I/O requests. */
	service_time?: number;

	/** Percentage of time during which I/O requests were issued. */
	util?: number;

	/** Whether this is a physical drive. */
	physical?: boolean;

	/** Last update timestamp (Unix epoch). Read-only. */
	last_update?: number;

	/** Bulk update data (JSON). */
	bulk_update?: unknown;

	/** Up-since timestamp (Unix epoch). */
	up_since?: number;
}
