import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/**
 * Drive media type — determines what kind of storage the drive represents.
 *
 * - `disk` — standard virtual disk (default)
 * - `cdrom` — CD/DVD-ROM drive
 * - `efidisk` — EFI system partition
 * - `import` — imported disk image
 * - `9p` — Plan 9 filesystem share
 * - `dir` — directory share
 * - `clone` — cloned disk
 * - `clone9p` — cloned Plan 9 share
 * - `clonedir` — cloned directory share
 * - `nonpersistent` — non-persistent disk (reverts on reboot)
 * - `nonpersistent9p` — non-persistent Plan 9 share
 * - `nonpersistentdir` — non-persistent directory share
 */
export type DriveMedia =
	| 'disk'
	| 'cdrom'
	| 'efidisk'
	| 'import'
	| '9p'
	| 'dir'
	| 'clone'
	| 'clone9p'
	| 'clonedir'
	| 'nonpersistent'
	| 'nonpersistent9p'
	| 'nonpersistentdir'
	| (string & {});

/**
 * Drive bus interface — controls how the drive is attached to the machine.
 *
 * - `virtio-scsi` — recommended default (SCSI over virtio)
 * - `virtio` — legacy paravirtual block device
 * - `ide` — IDE controller
 * - `ahci` — SATA (AHCI) controller
 * - `nvme` — NVMe controller
 * - `cifs` — CIFS/SMB pass-through
 * - `nfs` — NFS pass-through
 * - `vsan` — vSAN pass-through
 * - `lsi53c895a` — LSI Logic SCSI
 * - `megasas` — MegaRAID SAS
 * - `megasas-gen2` — MegaRAID SAS Gen2
 * - `mptsas1068` — Fusion-MPT SAS
 * - `virtio-scsi-dedicated` — dedicated virtio-scsi controller
 * - `pflash` — platform flash
 * - `direct` — direct device pass-through
 * - `tpm_state` — TPM state storage
 * - `usb` — USB mass storage
 */
export type DriveInterface =
	| 'virtio-scsi'
	| 'virtio'
	| 'ide'
	| 'ahci'
	| 'nvme'
	| 'cifs'
	| 'nfs'
	| 'vsan'
	| 'lsi53c895a'
	| 'megasas'
	| 'megasas-gen2'
	| 'mptsas1068'
	| 'virtio-scsi-dedicated'
	| 'pflash'
	| 'direct'
	| 'tpm_state'
	| 'usb'
	| (string & {});

/** Drive optimization setting. */
export type DriveOptimize = 'general' | 'large' | (string & {});

/** Drive preferred storage tier. */
export type DrivePreferredTier = '1' | '2' | '3' | '4' | '5' | (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine drive resource.
 *
 * Machine drives represent virtual disks and storage devices attached to a
 * machine (VM or physical node). The `machine` FK links to the parent machine.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineDrive extends Resource {
	/** Parent machine reference (FK to `machines`). */
	machine: FlexKey;

	/** Boot order position. */
	orderid?: number;

	/** Drive display name. Min 1, max 128 characters. */
	name: string;

	/** Human-readable description. */
	description?: string;

	/** Bus interface type. Default: `virtio-scsi`. */
	interface?: DriveInterface;

	/** Media type. Default: `disk`. Read-only. */
	media?: DriveMedia;

	/** Whether the drive is enabled. Default: `true`. */
	enabled?: boolean;

	/** Drive serial number. */
	serial?: string;

	/** Disk size in bytes. */
	disksize?: number;

	/** Actual used space in bytes. Read-only. */
	used_bytes?: number;

	/** File reference for cdrom/import media (FK to `files`). */
	media_source?: FlexKey;

	/** Preferred storage tier (`1`–`5`). */
	preferred_tier?: DrivePreferredTier;

	/** Whether the drive is read-only. */
	readonly?: boolean;

	/** Optimization setting. */
	optimize?: DriveOptimize;

	/** Whether to preserve the drive format. */
	preserve_drive_format?: boolean;

	/** Strict fsync setting. Empty = system default, `0` = off, `1` = on. */
	fsync?: '' | '0' | '1';

	/** Whether TRIM/discard is enabled. Default: `true`. */
	discard?: boolean;

	/** Advanced properties (newline-delimited key=value pairs). */
	advanced?: string;

	/** Asset tag (used for recipe/snapshot identification). */
	asset?: string;

	/** Whether the drive was skipped during creation. */
	nocreate?: boolean;

	/** Whether this is a hot-spare drive. */
	spare?: boolean;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new machine drive.
 *
 * Only `name` and `machine` are required. Read-only fields (`used_bytes`)
 * are excluded.
 */
export interface MachineDriveCreateParams {
	/** Parent machine reference (FK to `machines`). */
	machine: FlexKey;

	/** Drive display name. Min 1, max 128 characters. */
	name: string;

	/** Boot order position. */
	orderid?: number;

	/** Human-readable description. */
	description?: string;

	/** Bus interface type. Default: `virtio-scsi`. */
	interface?: DriveInterface;

	/** Media type. Default: `disk`. */
	media?: DriveMedia;

	/** Whether the drive is enabled. Default: `true`. */
	enabled?: boolean;

	/** Drive serial number. */
	serial?: string;

	/** Disk size in bytes. */
	disksize?: number;

	/** File reference for cdrom/import media (FK to `files`). */
	media_source?: FlexKey;

	/** Preferred storage tier (`1`–`5`). */
	preferred_tier?: DrivePreferredTier;

	/** Whether the drive is read-only. */
	readonly?: boolean;

	/** Optimization setting. */
	optimize?: DriveOptimize;

	/** Whether to preserve the drive format. */
	preserve_drive_format?: boolean;

	/** Strict fsync setting. Empty = system default, `0` = off, `1` = on. */
	fsync?: '' | '0' | '1';

	/** Whether TRIM/discard is enabled. */
	discard?: boolean;

	/** Advanced properties (newline-delimited key=value pairs). */
	advanced?: string;

	/** Asset tag. */
	asset?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing machine drive.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`media`, `used_bytes`) are excluded.
 */
export interface MachineDriveUpdateParams {
	/** Parent machine reference (FK to `machines`). Used for hotplug attach/detach. */
	machine?: FlexKey;

	/** Drive display name. Min 1, max 128 characters. */
	name?: string;

	/** Boot order position. */
	orderid?: number;

	/** Human-readable description. */
	description?: string;

	/** Bus interface type. */
	interface?: DriveInterface;

	/** Whether the drive is enabled. */
	enabled?: boolean;

	/** Drive serial number. */
	serial?: string;

	/** Disk size in bytes (can only increase). */
	disksize?: number;

	/** Preferred storage tier (`1`–`5`). */
	preferred_tier?: DrivePreferredTier;

	/** Whether the drive is read-only. */
	readonly?: boolean;

	/** Optimization setting. */
	optimize?: DriveOptimize;

	/** Whether to preserve the drive format. */
	preserve_drive_format?: boolean;

	/** Strict fsync setting. Empty = system default, `0` = off, `1` = on. */
	fsync?: '' | '0' | '1';

	/** Whether TRIM/discard is enabled. */
	discard?: boolean;

	/** Advanced properties (newline-delimited key=value pairs). */
	advanced?: string;

	/** Asset tag. */
	asset?: string;
}
