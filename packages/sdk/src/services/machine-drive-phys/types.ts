import type { FlexKey, Resource } from '../../types.js';

// ─── Enums ──────────────────────────────────────────────────────────────────

/**
 * Drive locate LED status.
 *
 * - `unsupported` — Drive does not support locate LED
 * - `on` — Locate LED is on
 * - `off` — Locate LED is off
 */
export type LocateStatus = 'unsupported' | 'on' | 'off';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine drive physical resource.
 *
 * Provides physical drive hardware information including SMART data,
 * temperature, wear level, vSAN status, and partition layout. Each
 * machine drive has one corresponding phys entry. This is a read-only
 * monitoring resource.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineDrivePhys extends Resource {
	/** Parent drive reference (FK to `machine_drives`). Required. */
	parent_drive: FlexKey;

	/** Local drive path. */
	path?: string;

	/** All drive paths. */
	all_paths?: string;

	/** Last modified timestamp (Unix epoch). Read-only. */
	modified?: number;

	/** Disk size in bytes. */
	size?: number;

	/** Drive model string. */
	model?: string;

	/** Firmware version. */
	fw?: string;

	/** Serial number. */
	serial?: string;

	/** Drive temperature. */
	temp?: number;

	/** Whether the drive is encrypted. */
	encrypted?: boolean;

	/** Temperature warning flag. */
	temp_warn?: boolean;

	/** Enclosure slot identifier. */
	enclosure_slot?: string;

	/** Locate LED status. */
	locate_status?: LocateStatus;

	/** Physical location string. */
	location?: string;

	/** vSAN drive ID (-1 if not assigned). */
	vsan_driveid?: number;

	/** vSAN tier (-1 if not assigned). */
	vsan_tier?: number;

	/** Reallocated sector count. */
	realloc_sectors?: number;

	/** Reallocated sectors warning flag. */
	realloc_sectors_warn?: boolean;

	/** SSD wear level indicator. */
	wear_level?: number;

	/** Wear level warning flag. */
	wear_level_warn?: boolean;

	/** Power-on hours. */
	hours?: number;

	/** Power-on hours warning flag. */
	hours_warn?: boolean;

	/** vSAN used bytes. */
	vsan_used?: number;

	/** vSAN maximum bytes. */
	vsan_max?: number;

	/** vSAN read error count. */
	vsan_read_errors?: number;

	/** vSAN write error count. */
	vsan_write_errors?: number;

	/** vSAN average latency. */
	vsan_avg_latency?: number;

	/** vSAN maximum latency. */
	vsan_max_latency?: number;

	/** vSAN repairing block count. */
	vsan_repairing?: number;

	/** vSAN repair estimate (remaining blocks). */
	vsan_repair_estimate?: number;

	/** vSAN last error message. */
	vsan_last_error?: string;

	/** vSAN write throttle (bytes/sec). */
	vsan_throttle?: number;

	/** vSAN drive path. */
	vsan_path?: string;

	/** Whether this is a vSAN spare drive. */
	spare?: boolean;

	/** Whether this drive has a swap partition. */
	swap?: boolean;

	/** Swap partition size in bytes. */
	swap_size?: number;

	/** Whether this drive has a boot partition. */
	boot?: boolean;

	/** Boot partition size in bytes. */
	boot_size?: number;

	/** Whether this drive has a VergeOS partition. */
	ybpart?: boolean;

	/** VergeOS partition size in bytes. */
	ybpart_size?: number;

	/** Drive bus type (e.g., "sata", "nvme"). */
	bus?: string;

	/** Whether drive has an encryption key. */
	encryption_key?: boolean;

	/** Current pending sector count. */
	current_pending_sector?: number;

	/** Current pending sectors warning flag. */
	current_pending_sector_warn?: boolean;

	/** Offline uncorrectable sector count. */
	offline_uncorrectable?: number;

	/** Offline uncorrectable sectors warning flag. */
	offline_uncorrectable_warn?: boolean;

	/** Last vSAN connection time (Unix epoch). */
	vsan_online_since?: number;

	/** Whether SMART status is available for this drive. */
	smart?: boolean;
}
