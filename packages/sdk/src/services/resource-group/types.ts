import type { Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Hardware device type for a resource group. */
export type ResourceGroupType =
	| 'node_pci_devices'
	| 'node_sriov_nic_devices'
	| 'node_usb_devices'
	| 'node_host_gpu_devices'
	| 'node_nvidia_vgpu_devices';

/** Device class categorization for a resource group. */
export type ResourceGroupClass =
	| 'unknown'
	| 'gpu'
	| 'vgpu'
	| 'storage'
	| 'hid'
	| 'usb'
	| 'network'
	| 'media'
	| 'audio'
	| 'fpga'
	| 'pci';

// ─── Resource Type ───────────────────────────────────────────────────────────

/** A grouping of physical hardware resources for assignment to VMs. */
export interface ResourceGroup extends Resource {
	uuid?: string;
	enabled?: boolean;
	name?: string;
	description?: string;
	type?: ResourceGroupType;
	class?: ResourceGroupClass;
	settings?: number;
	settings_args?: Record<string, unknown>;
	key_args?: Record<string, unknown>;
	modified?: number;
	created?: number;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/** Parameters for creating a new resource group. */
export interface ResourceGroupCreateParams {
	/** Group name (required, 1–256 chars). */
	name: string;
	/** Optional description (max 2048 chars). */
	description?: string;
	/** Whether the group is enabled. */
	enabled?: boolean;
	/** Device class categorization. */
	class?: ResourceGroupClass;
	/** Foreign key to settings. */
	settings?: number;
	/** Settings arguments. */
	settings_args?: Record<string, unknown>;
	/** Key arguments. */
	key_args?: Record<string, unknown>;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/** Parameters for updating an existing resource group. */
export interface ResourceGroupUpdateParams {
	name?: string;
	description?: string;
	enabled?: boolean;
	class?: ResourceGroupClass;
	settings?: number;
	settings_args?: Record<string, unknown>;
	key_args?: Record<string, unknown>;
}
