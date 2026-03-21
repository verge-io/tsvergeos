import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Console display protocol for the VM. */
export type ConsoleType = 'vnc' | 'spice' | 'serial' | 'none';

/** Behavior when host power is restored after an outage. */
export type OnPowerLoss = 'power_on' | 'last_state' | 'leave_off';

/** Guest operating system family hint. */
export type OSFamily = 'linux' | 'windows' | 'freebsd' | 'other';

/** Boot device priority order. */
export type BootOrder = 'cd' | 'cdn' | 'dc' | 'nc' | 'n' | 'c' | 'd' | 'strict';

/** Cloud-init metadata source configuration. */
export type CloudInitDatasource = 'none' | 'config_drive_v2' | 'nocloud';

/** VM live-migration strategy. */
export type MigrationMethod = 'auto' | 'live';

/** How the VM was originally created. */
export type CreatedFrom =
	| 'import'
	| 'import_vmx'
	| 'import_ovf'
	| 'import_vmware'
	| 'import_shared'
	| 'clone'
	| 'recipe'
	| 'custom'
	| 'terraform';

/** Video card emulation type. */
export type VideoType = 'std' | 'cirrus' | 'vmware' | 'qxl' | 'virtio' | 'none';

/** Sound card emulation type. */
export type SoundType =
	| 'none'
	| 'sb16'
	| 'es1370'
	| 'ac97'
	| 'adlib'
	| 'gus'
	| 'cs4231a'
	| 'hda'
	| 'pcspk';

/** Real-time clock base setting. */
export type RTCBase = 'utc' | 'localtime';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS virtual machine resource.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 * Read-only fields are included since they appear in GET responses.
 */
export interface VM extends Resource {
	/** VM display name. Min 1, max 128 characters. Unique within the system. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the VM is enabled. */
	enabled?: boolean;

	/** Whether this resource is a snapshot of another VM. */
	is_snapshot?: boolean;

	/** Owner reference (FK). */
	owner?: FlexKey;

	/** Owner user reference (FK to `users`). */
	owner_user?: FlexKey;

	/** QEMU machine type (e.g., `pc-q35-10.0`). */
	machine_type?: string;

	/** Whether hot-plug of devices is allowed. */
	allow_hotplug?: boolean;

	/** Whether the QEMU guest agent is enabled. */
	guest_agent?: boolean;

	/** Current power state. `true` = powered on. Note: no underscore. */
	powerstate?: boolean;

	/** Behavior when host power is restored. */
	on_power_loss?: OnPowerLoss;

	/** Whether power-cycle operations are disabled. */
	disable_powercycle?: boolean;

	/** Number of virtual CPU cores. Min 1, max 1024. */
	cpu_cores?: number;

	/** HA group name. */
	ha_group?: string;

	/** Primary cluster reference (FK to `clusters`). */
	cluster?: FlexKey;

	/** Failover cluster reference (FK to `clusters`). */
	cluster_failover?: FlexKey;

	/** CPU emulation type (e.g., `host`, `EPYC`, `kvm64`). */
	cpu_type?: string;

	/** RAM in megabytes. Min 256, max 1048576. */
	ram?: number;

	/** Console display protocol. */
	console?: ConsoleType;

	/** Video card emulation. */
	video?: VideoType;

	/** Sound card emulation. */
	sound?: SoundType;

	/** Guest OS family hint. */
	os_family?: OSFamily;

	/** Free-text OS description. Max 2048 characters. */
	os_description?: string;

	/** Real-time clock base. */
	rtc_base?: RTCBase;

	/** Boot device priority order. */
	boot_order?: BootOrder;

	/** Whether a console password is required. */
	console_pass_enabled?: boolean;

	/** Console password. Min 1, max 256 characters. */
	console_pass?: string;

	/** Whether a USB tablet device is attached (improves mouse tracking). */
	usb_tablet?: boolean;

	/** Whether UEFI firmware is used instead of legacy BIOS. */
	uefi?: boolean;

	/** Whether UEFI Secure Boot is enabled. */
	secure_boot?: boolean;

	/** Whether a serial port is attached. */
	serial_port?: boolean;

	/** Delay in seconds before boot. Min 0, max 60. */
	boot_delay?: number;

	/** Preferred node for scheduling (FK to `nodes`). */
	preferred_node?: FlexKey;

	/** Snapshot profile reference (FK to `snapshot_profiles`). */
	snapshot_profile?: FlexKey;

	/** Metadata JSON blob. Locked field. */
	meta?: unknown;

	/** VM UUID string. */
	uuid?: string;

	/** Advanced QEMU properties string. */
	advanced?: string;

	/** Whether the VM needs a restart to apply pending changes. */
	need_restart?: boolean;

	/** Cloud-init metadata source. */
	cloudinit_datasource?: CloudInitDatasource;

	/** How this VM was originally created. */
	created_from?: CreatedFrom;

	/** Whether this VM was imported. */
	imported?: boolean;

	/** Live-migration strategy. */
	migration_method?: MigrationMethod;

	/** User-facing note. Max 1024 characters. */
	note?: string;

	/** Timeout in seconds for power-cycle during migration. Min 0, max 65535. */
	power_cycle_timeout?: number;

	/** Whether the VM can be exported. */
	allow_export?: boolean;

	/** Paste key mapping configuration (FK to `vm_paste_configs`). */
	paste_key_config?: FlexKey;

	/** Whether nested virtualization is enabled. */
	nested_virtualization?: boolean;

	/** Whether an IOMMU device is attached. */
	iommu?: boolean;

	/** Whether the hypervisor flag is hidden from the guest. */
	disable_hypervisor?: boolean;

	/** Whether to use a legacy USB controller for older operating systems. */
	usb_legacy?: boolean;

	// ─── Read-only fields ────────────────────────────────────────────────

	/** Machine reference (FK to `machines`). Read-only. */
	machine?: FlexKey;

	/** Recipe instance reference (FK to `vm_recipe_instances`). Read-only. */
	recipe_instance?: FlexKey;

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;

	/** Console status reference (FK to `machine_console`). Read-only. */
	console_status?: FlexKey;

	/** VM service reference (FK to `vm_services`). Read-only. */
	service?: FlexKey;

	/** User who created this VM. Read-only. */
	creator?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new virtual machine.
 *
 * Only `name` is required. The API provides sensible defaults for everything
 * else (e.g., `cpu_cores: 1`, `ram: 1024`).
 *
 * Read-only fields (`created`, `modified`, `machine`, `creator`,
 * `console_status`, `recipe_instance`, `service`) are excluded.
 */
export interface VMCreateParams {
	/** VM display name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the VM is enabled. Default: `true`. */
	enabled?: boolean;

	/** Whether this is a snapshot. */
	is_snapshot?: boolean;

	/** Owner reference (FK). */
	owner?: FlexKey;

	/** Owner user reference (FK to `users`). */
	owner_user?: FlexKey;

	/** QEMU machine type. Default: `pc-q35-10.0`. */
	machine_type?: string;

	/** Whether hot-plug is allowed. Default: `true`. */
	allow_hotplug?: boolean;

	/** Whether the QEMU guest agent is enabled. Default: `false`. */
	guest_agent?: boolean;

	/** Behavior when host power is restored. Default: `last_state`. */
	on_power_loss?: OnPowerLoss;

	/** Whether power-cycle is disabled. Default: `false`. */
	disable_powercycle?: boolean;

	/** Number of virtual CPU cores. Min 1, max 1024. Default: `1`. */
	cpu_cores?: number;

	/** HA group name. */
	ha_group?: string;

	/** Primary cluster reference (FK to `clusters`). */
	cluster?: FlexKey;

	/** Failover cluster reference (FK to `clusters`). */
	cluster_failover?: FlexKey;

	/** CPU emulation type. */
	cpu_type?: string;

	/** RAM in megabytes. Min 256, max 1048576. Default: `1024`. */
	ram?: number;

	/** Console display protocol. Default: `vnc`. */
	console?: ConsoleType;

	/** Video card emulation. Default: `std`. */
	video?: VideoType;

	/** Sound card emulation. Default: `none`. */
	sound?: SoundType;

	/** Guest OS family hint. Default: `linux`. */
	os_family?: OSFamily;

	/** Free-text OS description. Max 2048 characters. */
	os_description?: string;

	/** Real-time clock base. */
	rtc_base?: RTCBase;

	/** Boot device priority order. Default: `cd`. */
	boot_order?: BootOrder;

	/** Whether a console password is required. Default: `false`. */
	console_pass_enabled?: boolean;

	/** Console password. Min 1, max 256 characters. */
	console_pass?: string;

	/** Whether a USB tablet device is attached. Default: `true`. */
	usb_tablet?: boolean;

	/** Whether UEFI firmware is used. Default: `false`. */
	uefi?: boolean;

	/** Whether Secure Boot is enabled. Default: `false`. */
	secure_boot?: boolean;

	/** Whether a serial port is attached. Default: `false`. */
	serial_port?: boolean;

	/** Boot delay in seconds. Min 0, max 60. Default: `5`. */
	boot_delay?: number;

	/** Preferred node for scheduling (FK to `nodes`). */
	preferred_node?: FlexKey;

	/** Snapshot profile reference (FK to `snapshot_profiles`). */
	snapshot_profile?: FlexKey;

	/** VM UUID string. */
	uuid?: string;

	/** Advanced QEMU properties string. */
	advanced?: string;

	/** Cloud-init metadata source. Default: `none`. */
	cloudinit_datasource?: CloudInitDatasource;

	/** How this VM was created. Default: `custom`. */
	created_from?: CreatedFrom;

	/** Whether this VM was imported. Default: `false`. */
	imported?: boolean;

	/** Live-migration strategy. Default: `auto`. */
	migration_method?: MigrationMethod;

	/** User-facing note. Max 1024 characters. */
	note?: string;

	/** Power-cycle timeout during migration (seconds). Min 0, max 65535. Default: `0`. */
	power_cycle_timeout?: number;

	/** Whether the VM can be exported. Default: `true`. */
	allow_export?: boolean;

	/** Paste key mapping configuration (FK to `vm_paste_configs`). */
	paste_key_config?: FlexKey;

	/** Whether nested virtualization is enabled. Default: `false`. */
	nested_virtualization?: boolean;

	/** Whether an IOMMU device is attached. Default: `false`. */
	iommu?: boolean;

	/** Whether the hypervisor flag is hidden. Default: `false`. */
	disable_hypervisor?: boolean;

	/** Whether to use a legacy USB controller. */
	usb_legacy?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing virtual machine.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields are excluded.
 */
export interface VMUpdateParams {
	/** VM display name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the VM is enabled. */
	enabled?: boolean;

	/** Whether this is a snapshot. */
	is_snapshot?: boolean;

	/** Owner reference (FK). */
	owner?: FlexKey;

	/** Owner user reference (FK to `users`). */
	owner_user?: FlexKey;

	/** QEMU machine type. */
	machine_type?: string;

	/** Whether hot-plug is allowed. */
	allow_hotplug?: boolean;

	/** Whether the QEMU guest agent is enabled. */
	guest_agent?: boolean;

	/** Behavior when host power is restored. */
	on_power_loss?: OnPowerLoss;

	/** Whether power-cycle is disabled. */
	disable_powercycle?: boolean;

	/** Number of virtual CPU cores. Min 1, max 1024. */
	cpu_cores?: number;

	/** HA group name. */
	ha_group?: string;

	/** Primary cluster reference (FK to `clusters`). */
	cluster?: FlexKey;

	/** Failover cluster reference (FK to `clusters`). */
	cluster_failover?: FlexKey;

	/** CPU emulation type. */
	cpu_type?: string;

	/** RAM in megabytes. Min 256, max 1048576. */
	ram?: number;

	/** Console display protocol. */
	console?: ConsoleType;

	/** Video card emulation. */
	video?: VideoType;

	/** Sound card emulation. */
	sound?: SoundType;

	/** Guest OS family hint. */
	os_family?: OSFamily;

	/** Free-text OS description. Max 2048 characters. */
	os_description?: string;

	/** Real-time clock base. */
	rtc_base?: RTCBase;

	/** Boot device priority order. */
	boot_order?: BootOrder;

	/** Whether a console password is required. */
	console_pass_enabled?: boolean;

	/** Console password. Min 1, max 256 characters. */
	console_pass?: string;

	/** Whether a USB tablet device is attached. */
	usb_tablet?: boolean;

	/** Whether UEFI firmware is used. */
	uefi?: boolean;

	/** Whether Secure Boot is enabled. */
	secure_boot?: boolean;

	/** Whether a serial port is attached. */
	serial_port?: boolean;

	/** Boot delay in seconds. Min 0, max 60. */
	boot_delay?: number;

	/** Preferred node for scheduling (FK to `nodes`). */
	preferred_node?: FlexKey;

	/** Snapshot profile reference (FK to `snapshot_profiles`). */
	snapshot_profile?: FlexKey;

	/** VM UUID string. */
	uuid?: string;

	/** Advanced QEMU properties string. */
	advanced?: string;

	/** Whether the VM needs a restart. */
	need_restart?: boolean;

	/** Cloud-init metadata source. */
	cloudinit_datasource?: CloudInitDatasource;

	/** How this VM was created. */
	created_from?: CreatedFrom;

	/** Whether this VM was imported. */
	imported?: boolean;

	/** Live-migration strategy. */
	migration_method?: MigrationMethod;

	/** User-facing note. Max 1024 characters. */
	note?: string;

	/** Power-cycle timeout during migration (seconds). Min 0, max 65535. */
	power_cycle_timeout?: number;

	/** Whether the VM can be exported. */
	allow_export?: boolean;

	/** Paste key mapping configuration (FK to `vm_paste_configs`). */
	paste_key_config?: FlexKey;

	/** Whether nested virtualization is enabled. */
	nested_virtualization?: boolean;

	/** Whether an IOMMU device is attached. */
	iommu?: boolean;

	/** Whether the hypervisor flag is hidden. */
	disable_hypervisor?: boolean;

	/** Whether to use a legacy USB controller. */
	usb_legacy?: boolean;
}

// ─── Action Option Types ─────────────────────────────────────────────────────

/** Options for the VM clone action. */
export interface VMCloneOptions {
	/** Name for the cloned VM. */
	name?: string;

	/** Whether to preserve MAC addresses on NICs. */
	preserve_macs?: boolean;
}

/** Options for the VM snapshot action. */
export interface VMSnapshotOptions {
	/** Name for the snapshot. */
	name?: string;

	/** Whether to quiesce the guest filesystem before snapshotting. Requires guest agent. */
	quiesce?: boolean;
}

/** Options for the VM migrate action. */
export interface VMMigrateOptions {
	/** Target node ID to migrate to. Pass `null` to auto-select the node with the least RAM usage. */
	preferred_node?: FlexKey | null;
}

/** Options for the VM restore action. */
export interface VMRestoreOptions {
	/** Snapshot reference to restore from. */
	snapshot?: FlexKey;
	/** Whether to preserve MAC addresses. */
	preserve_macs?: boolean;
	/** Name for the restored VM. */
	name?: string;
}

/** Options for hot-plugging a drive to a running VM. */
export interface VMHotplugDriveOptions {
	/** Drive name. */
	name?: string;
	/** Disk size in GB. */
	disksize?: number;
	/** Drive interface type (e.g., 'virtio-blk', 'virtio-scsi'). */
	interface?: string;
	/** Media type. */
	media?: string;
	/** Preferred storage tier. */
	preferred_tier?: string;
}

/** Options for hot-plugging a NIC to a running VM. */
export interface VMHotplugNicOptions {
	/** NIC name. */
	name?: string;
	/** Virtual network reference (FK to vnets). */
	vnet?: FlexKey;
	/** NIC interface type. */
	interface?: string;
}

/** Options for pasting text to a VM console. */
export interface VMPasteOptions {
	/** The text to paste. */
	text?: string;
}

/** Options for erasing a VM drive. */
export interface VMEraseDriveOptions {
	/** Drive reference to erase. */
	drive?: FlexKey;
}

/** Options for executing a command on a VM. */
export interface VMExecuteOptions {
	/** Command to execute. */
	[key: string]: unknown;
}
