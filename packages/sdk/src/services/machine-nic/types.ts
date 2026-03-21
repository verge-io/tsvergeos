import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/**
 * NIC interface type — determines the virtual network adapter model.
 *
 * - `virtio` — paravirtualized (recommended, best performance)
 * - `e1000` — Intel e1000 (broad guest support)
 * - `e1000e` — Intel e1000e (newer Intel emulation)
 * - `rtl8139` — Realtek 8139 (legacy)
 * - `pcnet` — AMD PCnet (legacy)
 * - `igb` — Intel 82576 (advanced features)
 * - `vmxnet3` — VMware Paravirtualized Ethernet v3
 * - `direct` — direct device pass-through
 */
export type NicInterface =
	| 'virtio'
	| 'e1000'
	| 'e1000e'
	| 'rtl8139'
	| 'pcnet'
	| 'igb'
	| 'vmxnet3'
	| 'direct'
	| (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine NIC resource.
 *
 * Machine NICs represent virtual network interfaces attached to a machine
 * (VM or physical node). The `machine` FK links to the parent machine,
 * and `vnet` links to the attached virtual network.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineNIC extends Resource {
	/** Parent machine reference (FK to `machines`). */
	machine: FlexKey;

	/** Boot/device order position. Min 0, max 30. */
	orderid?: number;

	/** NIC display name. Min 1, max 128 characters. */
	name?: string;

	/** Virtual network adapter type. Default: `virtio`. */
	interface?: NicInterface;

	/** Physical NIC driver (free-text, for hardware NICs). */
	driver?: string;

	/** Physical NIC model (free-text, for hardware NICs). */
	model?: string;

	/** Physical NIC vendor (free-text, for hardware NICs). */
	vendor?: string;

	/** Port number. */
	port?: number;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the NIC is enabled. Default: `true`. */
	enabled?: boolean;

	/** Whether to disable multiqueue. Default: `false`. */
	disable_mq?: boolean;

	/** Attached virtual network (FK to `vnets`). */
	vnet?: FlexKey;

	/** MAC address. */
	macaddress?: string;

	/** IPv4 configuration reference (FK to `machine_nic_ipv4_configs`). */
	ipv4_config?: FlexKey;

	/** Asset tag for recipe/snapshot identification. Min 1, max 32 characters. */
	asset?: string;

	/** IP address. */
	ipaddress?: string;

	/** Device path. Read-only. */
	device?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new machine NIC.
 *
 * Only `machine` is required. Read-only fields (`device`, `stats`, `status`)
 * are excluded.
 */
export interface MachineNICCreateParams {
	/** Parent machine reference (FK to `machines`). */
	machine: FlexKey;

	/** NIC display name. Min 1, max 128 characters. */
	name?: string;

	/** Virtual network adapter type. Default: `virtio`. */
	interface?: NicInterface;

	/** Physical NIC driver. */
	driver?: string;

	/** Physical NIC model. */
	model?: string;

	/** Physical NIC vendor. */
	vendor?: string;

	/** Port number. */
	port?: number;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the NIC is enabled. Default: `true`. */
	enabled?: boolean;

	/** Whether to disable multiqueue. Default: `false`. */
	disable_mq?: boolean;

	/** Attached virtual network (FK to `vnets`). */
	vnet?: FlexKey;

	/** MAC address. */
	macaddress?: string;

	/** IP address. */
	ipaddress?: string;

	/** Boot/device order position. Min 0, max 30. */
	orderid?: number;

	/** Asset tag. Min 1, max 32 characters. */
	asset?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing machine NIC.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`device`, `stats`, `status`) and `machine` are excluded.
 */
export interface MachineNICUpdateParams {
	/** NIC display name. Min 1, max 128 characters. */
	name?: string;

	/** Virtual network adapter type. */
	interface?: NicInterface;

	/** Physical NIC driver. */
	driver?: string;

	/** Physical NIC model. */
	model?: string;

	/** Physical NIC vendor. */
	vendor?: string;

	/** Port number. */
	port?: number;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the NIC is enabled. */
	enabled?: boolean;

	/** Whether to disable multiqueue. */
	disable_mq?: boolean;

	/** Attached virtual network (FK to `vnets`). */
	vnet?: FlexKey;

	/** MAC address. */
	macaddress?: string;

	/** IP address. */
	ipaddress?: string;

	/** Boot/device order position. Min 0, max 30. */
	orderid?: number;

	/** Asset tag. Min 1, max 32 characters. */
	asset?: string;
}
