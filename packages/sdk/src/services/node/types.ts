import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** IPMI connection status for a node. */
export type IpmiStatus = 'offline' | 'ready' | 'connecting' | 'error';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * VergeOS node resource.
 *
 * Nodes are physical or virtual servers that belong to a cluster.
 * They provide compute and/or storage resources. Nodes are
 * infrastructure-managed — they cannot be created or deleted via
 * the API, only updated.
 */
export interface Node extends Resource {
	/** Parent cluster FK. */
	cluster?: FlexKey;
	/** Node hostname (read-only). */
	name: string;
	/** Node description (up to 2048 chars). */
	description?: string;
	/** System node FK (read-only). */
	sysnode?: FlexKey;
	/** Unique node identifier (read-only). */
	id?: number;
	/** Machine FK (read-only). */
	machine?: FlexKey;
	/** Console status FK (read-only). */
	console_status?: FlexKey;
	/** Hardware model. */
	model?: string;
	/** CPU model. */
	cpu?: string;
	/** CPU speed. */
	cpu_speed?: string;
	/** Whether this is a physical node. */
	physical?: boolean;
	/** Total RAM in MB (read-only). */
	ram?: number;
	/** Overcommit RAM in MB. */
	overcommit?: number;
	/** VM RAM allocation in MB. */
	vm_ram?: number;
	/** VM failover RAM in MB. */
	failover_ram?: number;
	/** Number of CPU cores (read-only). */
	cores?: number;
	/** Whether the node is in maintenance mode. */
	maintenance?: boolean;
	/** Skip maintenance validation checks. */
	verify_maintenance?: string;
	/** Reset maintenance mode on reset. */
	maintenance_reset?: boolean;
	/** Whether this node supports network migration. */
	feature_vnet_migration?: boolean;
	/** VergeOS YB version. */
	yb_version?: string;
	/** OS version. */
	os_version?: string;
	/** Kernel version. */
	kernel_version?: string;
	/** Appserver version. */
	appserver_version?: string;
	/** vSAN version. */
	vsan_version?: string;
	/** QEMU version. */
	qemu_version?: string;
	/** Asset tag. */
	asset_tag?: string;
	/** IPMI network address. */
	ipmi_address?: string;
	/** IPMI username. */
	ipmi_user?: string;
	/** IPMI password. */
	ipmi_password?: string;
	/** IPMI connection status. */
	ipmi_status?: IpmiStatus;
	/** IPMI status info message. */
	ipmi_status_info?: string;
	/** IPMI last connected timestamp (epoch seconds). */
	ipmi_status_last_connected?: number;
	/** Whether to capture system logs. */
	capture_logs?: boolean;
	/** Whether to send/receive LLDP advertisements. */
	lldp?: boolean;
	/** PXE network FK. */
	pxe_vnet?: FlexKey;
	/** vSAN node ID (-1 = unset). */
	vsan_nodeid?: number;
	/** Whether vSAN is connected. */
	vsan_connected?: boolean;
	/** Maximum core temperature in Celsius (0 = disabled). */
	max_core_temp?: number;
	/** Maximum core temperature warning threshold percentage. */
	max_core_temp_warn_perc?: number;
	/** Critical core temperature in Celsius (0 = disabled). */
	critical_core_temp?: number;
	/** IOMMU (VT-d) support (read-only). */
	iommu?: boolean;
	/** Whether the node needs a reboot (read-only). */
	need_restart?: boolean;
	/** Reason for needing reboot (read-only). */
	restart_reason?: string;
	/** IPMI SEL records free. */
	ipmi_sel_free?: number;
	/** IPMI SEL records used. */
	ipmi_sel_used?: number;
	/** Do not check persistent storage on start-up. */
	ignore_pstore?: boolean;
	/** User-visible note (up to 1024 chars). */
	note?: string;
	/** Node stats FK (read-only). */
	stats?: FlexKey;
	/** Whether a driver reload is required (read-only). */
	reload_drivers_required?: boolean;
}

/**
 * Parameters for updating a node.
 *
 * Nodes are infrastructure-managed — only update is supported (no create/delete).
 * Excludes read-only fields: `name`, `sysnode`, `id`, `machine`, `console_status`,
 * `ram`, `cores`, `iommu`, `need_restart`, `restart_reason`, `stats`,
 * `reload_drivers_required`.
 */
export interface NodeUpdateParams {
	/** Node description. */
	description?: string;
	/** Hardware model. */
	model?: string;
	/** CPU model. */
	cpu?: string;
	/** CPU speed. */
	cpu_speed?: string;
	/** Whether this is a physical node. */
	physical?: boolean;
	/** Overcommit RAM in MB. */
	overcommit?: number;
	/** VM RAM allocation in MB. */
	vm_ram?: number;
	/** VM failover RAM in MB. */
	failover_ram?: number;
	/** Whether the node is in maintenance mode. */
	maintenance?: boolean;
	/** Skip maintenance validation checks. */
	verify_maintenance?: string;
	/** Reset maintenance mode on reset. */
	maintenance_reset?: boolean;
	/** Asset tag. */
	asset_tag?: string;
	/** IPMI network address. */
	ipmi_address?: string;
	/** IPMI username. */
	ipmi_user?: string;
	/** IPMI password. */
	ipmi_password?: string;
	/** Whether to capture system logs. */
	capture_logs?: boolean;
	/** Whether to send/receive LLDP advertisements. */
	lldp?: boolean;
	/** Do not check persistent storage on start-up. */
	ignore_pstore?: boolean;
	/** User-visible note (up to 1024 chars). */
	note?: string;
	/** Maximum core temperature in Celsius. */
	max_core_temp?: number;
	/** Maximum core temperature warning threshold %. */
	max_core_temp_warn_perc?: number;
	/** Critical core temperature in Celsius. */
	critical_core_temp?: number;
	/** PXE network FK. */
	pxe_vnet?: FlexKey;
}
