import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Network type — determines routing behavior and infrastructure role. */
export type NetworkType =
	| 'internal'
	| 'external'
	| 'bgp'
	| 'dmz'
	| 'core'
	| 'physical'
	| 'port_mirror'
	| 'vpn'
	| (string & {});

/** Layer 2 encapsulation type. */
export type Layer2Type = 'vlan' | 'vxlan' | 'none' | 'bond' | 'bond_slave' | (string & {});

/** DNS service mode for the network router. */
export type DnsMode = 'disabled' | 'simple' | 'bind' | 'network' | (string & {});

/** IP address assignment method. */
export type IpAddressType = 'static' | 'dynamic' | 'bgp' | 'none' | (string & {});

/** Behavior when host power is restored after an outage. */
export type NetworkOnPowerLoss = 'power_on' | 'last_state' | 'leave_off' | (string & {});

/** Port mirroring mode. */
export type PortMirroringMode = 'off' | 'east_west' | 'north_south' | (string & {});

/** PXE boot mode. */
export type PxeMode = 'none' | 'ybos' | 'custom' | (string & {});

/** Rate limit unit type. */
export type RateLimitType =
	| 'bytes/second'
	| 'kbytes/second'
	| 'mbytes/second'
	| 'bytes/minute'
	| 'kbytes/minute'
	| 'mbytes/minute'
	| 'bytes/hour'
	| 'kbytes/hour'
	| 'mbytes/hour'
	| 'bytes/day'
	| 'kbytes/day'
	| 'mbytes/day'
	| 'second'
	| 'minute'
	| 'hour'
	| 'day'
	| (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS virtual network (vnet) resource.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 * Read-only fields are included since they appear in GET responses.
 */
export interface Network extends Resource {
	/** Network display name. Min 1, max 128 characters. Unique within the system. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the network is enabled. */
	enabled?: boolean;

	// ─── Network configuration ──────────────────────────────────────────

	/** Network type. Set on create, read-only after. */
	type?: NetworkType;

	/** Layer 2 encapsulation type. */
	layer2_type?: Layer2Type;

	/** VLAN/VXLAN tag ID. */
	layer2_id?: number;

	/** vxLan multicast address. */
	vxlan_multicast?: string;

	/** Whether this is a bridged physical network. */
	physical_bridged?: boolean;

	/** Port mirroring mode. */
	port_mirroring?: PortMirroringMode;

	/** Network ID for mirrored traffic (FK to `vnets`). */
	port_mirroring_vnet?: FlexKey;

	/** Interface vnet ID (FK to `vnets`). */
	interface_vnet?: FlexKey;

	/** Whether bonding is enabled. */
	enable_bonding?: boolean;

	/** Bonding interface arguments (JSON). */
	bond_interfaces_args?: unknown;

	/** Maximum transmission unit. Min 1000, max 65536. */
	mtu?: number;

	/** Advanced options (JSON). */
	advanced_options?: unknown;

	// ─── IP configuration ───────────────────────────────────────────────

	/** IP address assignment method. */
	ipaddress_type?: IpAddressType;

	/** Network router IP address. */
	ipaddress?: string;

	/** DMZ IP address for this router. */
	dmz_ipaddress?: string;

	/** Network address in CIDR notation (e.g., "10.0.0.0/24"). */
	network?: string;

	/** Gateway IP address sent to DHCP clients. */
	gateway?: string;

	/** Default gateway network ID (FK to `vnets`). */
	vnet_default_gateway?: FlexKey;

	/** Router hostname. */
	hostname?: string;

	// ─── DNS configuration ──────────────────────────────────────────────

	/** DNS service mode. */
	dns?: DnsMode;

	/** Domain name for the network. */
	domain?: string;

	/** DNS server list (newline, space, or comma separated). */
	dnslist?: string;

	/** Whether to ignore DNS servers from DHCP. */
	override_dhcp_dns?: boolean;

	/** DNS network ID for forwarding (FK to `vnets`). */
	network_dns?: FlexKey;

	/** DNS zone reference (FK to `vnet_dns_zones`). */
	network_dns_zone?: FlexKey;

	// ─── DHCP configuration ─────────────────────────────────────────────

	/** Whether DHCP is enabled. */
	dhcp_enabled?: boolean;

	/** Whether dynamic DHCP is enabled. */
	dhcp_dynamic?: boolean;

	/** Whether DHCP assigns IPs sequentially. */
	dhcp_sequential?: boolean;

	/** Start of the DHCP range. */
	dhcp_start?: string;

	/** End of the DHCP range. */
	dhcp_stop?: string;

	// ─── Power and scheduling ───────────────────────────────────────────

	/** Whether the network automatically starts. */
	autostart?: boolean;

	/**
	 * Current power state. `true` = running.
	 *
	 * **Note:** The API often omits this field. For reliable power state,
	 * use {@link MachineStatus} via `client.machineStatuses.getByMachine()`.
	 */
	powerstate?: boolean;

	/** Behavior when host power is restored. */
	on_power_loss?: NetworkOnPowerLoss;

	/** Primary cluster reference (FK to `clusters`). */
	cluster?: FlexKey;

	/** Failover cluster reference (FK to `clusters`). */
	cluster_failover?: FlexKey;

	/** Preferred node for scheduling (FK to `nodes`). */
	preferred_node?: FlexKey;

	/** HA group for anti-affinity. */
	ha_group?: string;

	// ─── Firewall and statistics ────────────────────────────────────────

	/** Whether to track statistics for all rules. */
	statistics?: boolean;

	/** Whether to track DMZ statistics. */
	dmz_statistics?: boolean;

	/** Whether to trace/debug firewall rules. */
	trace?: boolean;

	/** Whether to mirror syslog to UI. */
	mirror_logs?: boolean;

	/** Whether the network needs a restart. */
	need_restart?: boolean;

	/** Whether firewall rules need to be applied. */
	need_fw_apply?: boolean;

	/** Whether DNS configuration needs to be applied. */
	need_dns_apply?: boolean;

	/** Whether proxy configuration needs to be applied. */
	need_proxy_apply?: boolean;

	/** Whether interface configuration needs to be applied. */
	need_interface_apply?: boolean;

	/** Whether to apply firewall rules on next start. */
	apply_fw_on_start?: boolean;

	/** Last firewall apply timestamp. */
	last_fw_apply?: number;

	/** Last DNS apply timestamp. */
	last_dns_apply?: number;

	// ─── Rate limiting ──────────────────────────────────────────────────

	/** Rate limit value. */
	rate_limit?: number;

	/** Rate limit unit type. */
	rate_limit_type?: RateLimitType;

	/** Rate limit burst value. */
	rate_limit_burst?: number;

	// ─── BGP ────────────────────────────────────────────────────────────

	/** BGP autonomous system number. Min 1, max 4294967295. */
	bgp_asn?: number;

	// ─── Proxy ──────────────────────────────────────────────────────────

	/** Whether the proxy is enabled. */
	proxy_enabled?: boolean;

	/** Proxy listen address. */
	proxy_listen_address?: string;

	// ─── PXE boot ───────────────────────────────────────────────────────

	/** PXE boot mode. */
	pxe?: PxeMode;

	/** TFTP server IP for custom PXE. */
	tftp_server?: string;

	// ─── Gateway monitoring ─────────────────────────────────────────────

	/** Whether to monitor the gateway. */
	monitor_gateway?: boolean;

	/** IP address to monitor (blank for default route). */
	monitor_ip?: string;

	/** Monitoring interval in milliseconds. Min 1000, max 120000. */
	monitor_interval_ms?: number;

	// ─── Notes ──────────────────────────────────────────────────────────

	/** Free-form note. Max 1024 characters. */
	note?: string;

	// ─── Read-only fields ───────────────────────────────────────────────

	/** Machine reference (FK to `machines`). Read-only. */
	machine?: FlexKey;

	/** Owner reference. Read-only. */
	owner?: FlexKey;

	/** Router MAC address. Read-only. */
	macaddress?: string;

	/** NIC reference (FK to `machine_nics`). Read-only. */
	nic?: FlexKey;

	/** DMZ NIC reference (FK to `machine_nics`). Read-only. */
	nic_dmz?: FlexKey;

	/** Network block reference (FK to `vnet_cidrs`). Read-only. */
	cidr?: FlexKey;

	/** Bond reference (FK to `vnet_bonds`). Read-only. */
	bond?: FlexKey;

	/** BGP reference (FK to `vnet_bgp`). Read-only. */
	bgp?: FlexKey;

	/** IPSec configuration reference (FK to `vnet_ipsecs`). Locked. */
	ipsec?: FlexKey;

	/** Whether IPsec is enabled. Read-only. */
	ipsec_enabled?: boolean;

	/** Proxy reference (FK to `vnet_proxies`). Read-only. */
	proxy?: FlexKey;

	/** User who created this network. Read-only. */
	creator?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new virtual network.
 *
 * Only `name` is required. The API provides sensible defaults for everything
 * else (e.g., `type: 'internal'`, `layer2_type: 'vxlan'`).
 *
 * Read-only fields (`machine`, `owner`, `macaddress`, `nic`, `nic_dmz`,
 * `cidr`, `bond`, `bgp`, `ipsec_enabled`, `creator`) are excluded.
 */
export interface NetworkCreateParams {
	/** Network display name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the network is enabled. Default: `true`. */
	enabled?: boolean;

	/** Network type. Default: `internal`. */
	type?: NetworkType;

	/** Layer 2 encapsulation type. Default: `vxlan`. */
	layer2_type?: Layer2Type;

	/** VLAN/VXLAN tag ID. */
	layer2_id?: number;

	/** vxLan multicast address. */
	vxlan_multicast?: string;

	/** Whether this is a bridged physical network. Default: `false`. */
	physical_bridged?: boolean;

	/** Port mirroring mode. Default: `off`. */
	port_mirroring?: PortMirroringMode;

	/** Network ID for mirrored traffic (FK to `vnets`). */
	port_mirroring_vnet?: FlexKey;

	/** Interface vnet ID (FK to `vnets`). */
	interface_vnet?: FlexKey;

	/** Whether bonding is enabled. Default: `false`. */
	enable_bonding?: boolean;

	/** Bonding interface arguments (JSON). */
	bond_interfaces_args?: unknown;

	/** Maximum transmission unit. Min 1000, max 65536. */
	mtu?: number;

	/** Advanced options (JSON). */
	advanced_options?: unknown;

	/** IP address assignment method. Default: `static`. */
	ipaddress_type?: IpAddressType;

	/** Network router IP address. */
	ipaddress?: string;

	/** DMZ IP address for this router. */
	dmz_ipaddress?: string;

	/** Network address in CIDR notation. */
	network?: string;

	/** Gateway IP address. */
	gateway?: string;

	/** Default gateway network ID (FK to `vnets`). */
	vnet_default_gateway?: FlexKey;

	/** Router hostname. Default: `router`. */
	hostname?: string;

	/** DNS service mode. Default: `simple`. */
	dns?: DnsMode;

	/** Domain name for the network. */
	domain?: string;

	/** DNS server list. */
	dnslist?: string;

	/** Whether to ignore DNS servers from DHCP. Default: `false`. */
	override_dhcp_dns?: boolean;

	/** DNS network ID for forwarding (FK to `vnets`). */
	network_dns?: FlexKey;

	/** DNS zone reference (FK to `vnet_dns_zones`). */
	network_dns_zone?: FlexKey;

	/** Whether DHCP is enabled. */
	dhcp_enabled?: boolean;

	/** Whether dynamic DHCP is enabled. */
	dhcp_dynamic?: boolean;

	/** Whether DHCP assigns IPs sequentially. */
	dhcp_sequential?: boolean;

	/** Start of the DHCP range. */
	dhcp_start?: string;

	/** End of the DHCP range. */
	dhcp_stop?: string;

	/** Whether the network automatically starts. Default: `true`. */
	autostart?: boolean;

	/** Behavior when host power is restored. Default: `last_state`. */
	on_power_loss?: NetworkOnPowerLoss;

	/** Primary cluster reference (FK to `clusters`). */
	cluster?: FlexKey;

	/** Failover cluster reference (FK to `clusters`). */
	cluster_failover?: FlexKey;

	/** Preferred node for scheduling (FK to `nodes`). */
	preferred_node?: FlexKey;

	/** HA group for anti-affinity. */
	ha_group?: string;

	/** Whether to track statistics for all rules. Default: `false`. */
	statistics?: boolean;

	/** Whether to track DMZ statistics. Default: `false`. */
	dmz_statistics?: boolean;

	/** Whether to trace/debug firewall rules. Default: `false`. */
	trace?: boolean;

	/** Whether to mirror syslog to UI. Default: `false`. */
	mirror_logs?: boolean;

	/** Whether to apply firewall rules on next start. Default: `false`. */
	apply_fw_on_start?: boolean;

	/** Rate limit value. Default: `0`. */
	rate_limit?: number;

	/** Rate limit unit type. Default: `mbytes/second`. */
	rate_limit_type?: RateLimitType;

	/** Rate limit burst value. Default: `0`. */
	rate_limit_burst?: number;

	/** BGP autonomous system number. Min 1, max 4294967295. */
	bgp_asn?: number;

	/** Whether the proxy is enabled. Default: `false`. */
	proxy_enabled?: boolean;

	/** Proxy listen address. */
	proxy_listen_address?: string;

	/** PXE boot mode. Default: `none`. */
	pxe?: PxeMode;

	/** TFTP server IP for custom PXE. */
	tftp_server?: string;

	/** Whether to monitor the gateway. Default: `false`. */
	monitor_gateway?: boolean;

	/** IP address to monitor. */
	monitor_ip?: string;

	/** Monitoring interval in milliseconds. Min 1000, max 120000. Default: `2000`. */
	monitor_interval_ms?: number;

	/** Free-form note. Max 1024 characters. */
	note?: string;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing virtual network.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields and `type` (set only on creation) are excluded.
 */
export interface NetworkUpdateParams {
	/** Network display name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the network is enabled. */
	enabled?: boolean;

	/** Layer 2 encapsulation type. */
	layer2_type?: Layer2Type;

	/** VLAN/VXLAN tag ID. */
	layer2_id?: number;

	/** vxLan multicast address. */
	vxlan_multicast?: string;

	/** Whether this is a bridged physical network. */
	physical_bridged?: boolean;

	/** Port mirroring mode. */
	port_mirroring?: PortMirroringMode;

	/** Network ID for mirrored traffic (FK to `vnets`). */
	port_mirroring_vnet?: FlexKey;

	/** Interface vnet ID (FK to `vnets`). */
	interface_vnet?: FlexKey;

	/** Whether bonding is enabled. */
	enable_bonding?: boolean;

	/** Bonding interface arguments (JSON). */
	bond_interfaces_args?: unknown;

	/** Maximum transmission unit. Min 1000, max 65536. */
	mtu?: number;

	/** Advanced options (JSON). */
	advanced_options?: unknown;

	/** IP address assignment method. */
	ipaddress_type?: IpAddressType;

	/** Network router IP address. */
	ipaddress?: string;

	/** DMZ IP address for this router. */
	dmz_ipaddress?: string;

	/** Network address in CIDR notation. */
	network?: string;

	/** Gateway IP address. */
	gateway?: string;

	/** Default gateway network ID (FK to `vnets`). */
	vnet_default_gateway?: FlexKey;

	/** Router hostname. */
	hostname?: string;

	/** DNS service mode. */
	dns?: DnsMode;

	/** Domain name for the network. */
	domain?: string;

	/** DNS server list. */
	dnslist?: string;

	/** Whether to ignore DNS servers from DHCP. */
	override_dhcp_dns?: boolean;

	/** DNS network ID for forwarding (FK to `vnets`). */
	network_dns?: FlexKey;

	/** DNS zone reference (FK to `vnet_dns_zones`). */
	network_dns_zone?: FlexKey;

	/** Whether DHCP is enabled. */
	dhcp_enabled?: boolean;

	/** Whether dynamic DHCP is enabled. */
	dhcp_dynamic?: boolean;

	/** Whether DHCP assigns IPs sequentially. */
	dhcp_sequential?: boolean;

	/** Start of the DHCP range. */
	dhcp_start?: string;

	/** End of the DHCP range. */
	dhcp_stop?: string;

	/** Whether the network automatically starts. */
	autostart?: boolean;

	/** Behavior when host power is restored. */
	on_power_loss?: NetworkOnPowerLoss;

	/** Primary cluster reference (FK to `clusters`). */
	cluster?: FlexKey;

	/** Failover cluster reference (FK to `clusters`). */
	cluster_failover?: FlexKey;

	/** Preferred node for scheduling (FK to `nodes`). */
	preferred_node?: FlexKey;

	/** HA group for anti-affinity. */
	ha_group?: string;

	/** Whether to track statistics for all rules. */
	statistics?: boolean;

	/** Whether to track DMZ statistics. */
	dmz_statistics?: boolean;

	/** Whether to trace/debug firewall rules. */
	trace?: boolean;

	/** Whether to mirror syslog to UI. */
	mirror_logs?: boolean;

	/** Whether to apply firewall rules on next start. */
	apply_fw_on_start?: boolean;

	/** Whether the network needs a restart. */
	need_restart?: boolean;

	/** Whether firewall rules need to be applied. */
	need_fw_apply?: boolean;

	/** Whether DNS configuration needs to be applied. */
	need_dns_apply?: boolean;

	/** Whether proxy configuration needs to be applied. */
	need_proxy_apply?: boolean;

	/** Whether interface configuration needs to be applied. */
	need_interface_apply?: boolean;

	/** Rate limit value. */
	rate_limit?: number;

	/** Rate limit unit type. */
	rate_limit_type?: RateLimitType;

	/** Rate limit burst value. */
	rate_limit_burst?: number;

	/** BGP autonomous system number. */
	bgp_asn?: number;

	/** Whether the proxy is enabled. */
	proxy_enabled?: boolean;

	/** Proxy listen address. */
	proxy_listen_address?: string;

	/** PXE boot mode. */
	pxe?: PxeMode;

	/** TFTP server IP for custom PXE. */
	tftp_server?: string;

	/** Whether to monitor the gateway. */
	monitor_gateway?: boolean;

	/** IP address to monitor. */
	monitor_ip?: string;

	/** Monitoring interval in milliseconds. Min 1000, max 120000. */
	monitor_interval_ms?: number;

	/** Free-form note. Max 1024 characters. */
	note?: string;
}
