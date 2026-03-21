import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/**
 * Device type — determines the type of device attached to a machine.
 *
 * - `gpu` — GPU passthrough (legacy)
 * - `nvidia_vgpu` — NVIDIA vGPU (legacy)
 * - `tpm` — Trusted Platform Module (vTPM)
 * - `node_usb_devices` — USB device
 * - `node_sriov_nic_devices` — SR-IOV NIC
 * - `node_pci_devices` — PCI device
 * - `node_host_gpu_devices` — Host GPU
 * - `node_nvidia_vgpu_devices` — NVIDIA vGPU (current)
 */
export type DeviceType =
	| 'gpu'
	| 'nvidia_vgpu'
	| 'tpm'
	| 'node_usb_devices'
	| 'node_sriov_nic_devices'
	| 'node_pci_devices'
	| 'node_host_gpu_devices'
	| 'node_nvidia_vgpu_devices'
	| (string & {});

/**
 * Machine type — the type of machine a device is attached to.
 */
export type MachineType =
	| 'vm'
	| 'container'
	| 'vmware_container'
	| 'service_container'
	| 'metal'
	| 'vdi'
	| 'node'
	| 'tenant'
	| 'vnet';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine device resource.
 *
 * Machine devices represent hardware or virtual devices attached to a machine
 * (VM or physical node), including GPUs, TPMs, USB devices, PCI devices, and
 * SR-IOV NICs. The `machine` FK links to the parent machine, and the `type`
 * field determines the device behavior and available settings.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineDevice extends Resource {
	/** Parent machine reference (FK to `machines`). */
	machine: FlexKey;

	/** Type of the parent machine. Read-only. */
	machine_type?: MachineType;

	/** Boot/device order position. Min 0, max 64. */
	orderid?: number;

	/** Device type. Read-only after creation. */
	type?: DeviceType;

	/** Device display name. Min 1, max 128 characters. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Resource group reference (FK to `resource_groups`). Read-only. */
	resource_group?: FlexKey;

	/** Device UUID. */
	uuid?: string;

	/** Whether the device is enabled. Default: `true`. */
	enabled?: boolean;

	/** Whether the device is optional (VM can start without it). Default: `false`. */
	optional?: boolean;

	/** Asset tag for recipe/snapshot identification. Min 1, max 40 characters. */
	asset?: string;

	/** Number of device instances. Min 1, max 16. Default: `1`. */
	count?: number;

	/** Device-specific settings as JSON. */
	settings_args?: Record<string, unknown>;

	/** Creation timestamp (epoch seconds). Read-only. */
	created?: number;

	/** Last modification timestamp (epoch seconds). Read-only. */
	modified?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new machine device.
 *
 * `machine` and `type` are required. Read-only fields (`machine_type`,
 * `resource_group`, `created`, `modified`) are excluded.
 */
export interface MachineDeviceCreateParams {
	/** Parent machine reference (FK to `machines`). */
	machine: FlexKey;

	/** Device type. */
	type: DeviceType;

	/** Device display name. Min 1, max 128 characters. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Device UUID. */
	uuid?: string;

	/** Whether the device is enabled. Default: `true`. */
	enabled?: boolean;

	/** Whether the device is optional. Default: `false`. */
	optional?: boolean;

	/** Boot/device order position. Min 0, max 64. */
	orderid?: number;

	/** Asset tag. Min 1, max 40 characters. */
	asset?: string;

	/** Number of device instances. Min 1, max 16. Default: `1`. */
	count?: number;

	/** Device-specific settings passed on create. */
	settings_args?: Record<string, unknown>;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing machine device.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields and `machine`/`type` are excluded.
 */
export interface MachineDeviceUpdateParams {
	/** Device display name. Min 1, max 128 characters. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Device UUID. */
	uuid?: string;

	/** Whether the device is enabled. */
	enabled?: boolean;

	/** Whether the device is optional. */
	optional?: boolean;

	/** Boot/device order position. Min 0, max 64. */
	orderid?: number;

	/** Asset tag. Min 1, max 40 characters. */
	asset?: string;

	/** Number of device instances. Min 1, max 16. */
	count?: number;

	/** Device-specific settings. */
	settings_args?: Record<string, unknown>;
}
