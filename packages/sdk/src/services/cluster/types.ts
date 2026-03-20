import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** CPU type identifier for cluster configuration. */
export type CpuType =
	| 'Broadwell'
	| 'Cascadelake-Server'
	| 'Conroe'
	| 'Cooperlake'
	| 'core2duo'
	| 'coreduo'
	| 'Denverton'
	| 'EPYC'
	| 'EPYC-Genoa'
	| 'EPYC-Milan'
	| 'EPYC-Rome'
	| 'GraniteRapids'
	| 'Haswell'
	| 'host'
	| 'Icelake-Server'
	| 'IvyBridge'
	| 'KnightsMill'
	| 'kvm64'
	| 'n270'
	| 'Nehalem'
	| 'Opteron_G1'
	| 'Opteron_G2'
	| 'Opteron_G3'
	| 'Opteron_G4'
	| 'Opteron_G5'
	| 'Penryn'
	| 'phenom'
	| 'qemu64'
	| 'SandyBridge'
	| 'SapphireRapids'
	| 'Skylake-Client'
	| 'Skylake-Server'
	| 'Snowridge'
	| 'Westmere';

/** Energy-performance policy for cluster CPUs. */
export type EnergyPerfPolicy =
	| 'balance-performance'
	| 'balance-power'
	| 'normal'
	| 'performance'
	| 'power';

/** CPU scaling governor for cluster nodes. */
export type ScalingGovernor = 'ondemand' | 'performance' | 'powersave';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * VergeOS cluster resource.
 *
 * Clusters group physical nodes for compute and/or storage purposes.
 * A system typically has at least one storage cluster and one or more
 * compute clusters.
 */
export interface Cluster extends Resource {
	/** Parent system FK. */
	system: FlexKey;
	/** Cluster name (unique, 1–128 chars). */
	name: string;
	/** 40-character unique cluster ID. */
	id: string;
	/** Cluster description (up to 2048 chars). */
	description: string;
	/** Whether the cluster is enabled. */
	enabled: boolean;
	/** Creation timestamp (epoch seconds). */
	created: number;
	/** Whether this is a storage cluster (read-only, system-set). */
	storage: boolean;
	/** Whether this cluster provides compute resources. */
	compute: boolean;
	/** Enable nested virtualization (KVM-in-KVM). */
	kvm_nested: boolean;
	/** Allow live migration of nested-virt VMs. */
	allow_nested_virt_migration: boolean;
	/** Allow live migration of vGPU VMs. */
	allow_vgpu_migration: boolean;
	/** Enable split lock detection. */
	enable_split_lock_detection: boolean;
	/** Auto-detected recommended CPU type (locked after detection). */
	recommended_cpu_type: CpuType;
	/** Default CPU type for new VMs. */
	default_cpu: CpuType;
	/** Disable CPU security mitigations (Spectre/Meltdown). */
	disable_cpu_security_mitigations: boolean;
	/** Disable speculative store bypass. */
	spec_store_bypass_disable: boolean;
	/** Disable simultaneous multithreading (Hyper-Threading). */
	disable_smt: boolean;
	/** Enable NVMe power management. */
	enable_nvme_power_management: boolean;
	/** Energy-performance policy. */
	x86_energy_perf_policy: EnergyPerfPolicy;
	/** CPU scaling governor. */
	scaling_governor: ScalingGovernor;
	/** RAM per resource unit (MB). */
	ram_per_unit: number;
	/** Cores per resource unit. */
	cores_per_unit: number;
	/** Cost per resource unit. */
	cost_per_unit: number;
	/** Price per resource unit. */
	price_per_unit: number;
	/** Maximum RAM per VM (MB). */
	max_ram_per_vm: number;
	/** Maximum cores per VM. */
	max_cores_per_vm: number;
	/** Storage cache size per node (MB). */
	storage_cachesize: number;
	/** Storage buffer size per node (MB). */
	storage_buffersize: number;
	/** Allocate hugepages for storage. */
	storage_hugepages: boolean;
	/** Target maximum RAM utilization percentage. */
	target_ram_pct: number;
	/** Percentage of reserve RAM available for VMs. */
	ram_overcommit_pct: number;
	/** Tier used for swap (-1 = disabled, 0–5). */
	swap_tier: number;
	/** Swap space per drive (MB). */
	swap_per_drive: number;
	/** System log filter string. */
	log_filter: string;
	/** Maximum core temperature (Celsius, 0 = disabled). */
	max_core_temp: number;
	/** Maximum core temperature warning threshold percentage. */
	max_core_temp_warn_perc: number;
	/** Critical core temperature (Celsius, 0 = disabled). */
	critical_core_temp: number;
	/** Disable CPU sleep states. */
	disable_sleep: boolean;
	/** Cluster status FK. */
	status: FlexKey;
}

/**
 * Parameters for creating a new cluster.
 *
 * Excludes read-only fields: `system`, `created`, `storage`, `recommended_cpu_type`, `status`.
 */
export interface ClusterCreateParams {
	/** Cluster name (required, unique, 1–128 chars). */
	name: string;
	/** Cluster description. */
	description?: string;
	/** Whether the cluster is enabled (default: `true`). */
	enabled?: boolean;
	/** Whether this cluster provides compute resources. */
	compute?: boolean;
	/** Enable nested virtualization. */
	kvm_nested?: boolean;
	/** Allow live migration of nested-virt VMs. */
	allow_nested_virt_migration?: boolean;
	/** Allow live migration of vGPU VMs. */
	allow_vgpu_migration?: boolean;
	/** Enable split lock detection. */
	enable_split_lock_detection?: boolean;
	/** Default CPU type for new VMs. */
	default_cpu?: CpuType;
	/** Disable CPU security mitigations. */
	disable_cpu_security_mitigations?: boolean;
	/** Disable speculative store bypass. */
	spec_store_bypass_disable?: boolean;
	/** Disable SMT. */
	disable_smt?: boolean;
	/** Enable NVMe power management. */
	enable_nvme_power_management?: boolean;
	/** Energy-performance policy. */
	x86_energy_perf_policy?: EnergyPerfPolicy;
	/** CPU scaling governor. */
	scaling_governor?: ScalingGovernor;
	/** RAM per resource unit (MB). */
	ram_per_unit?: number;
	/** Cores per resource unit. */
	cores_per_unit?: number;
	/** Cost per resource unit. */
	cost_per_unit?: number;
	/** Price per resource unit. */
	price_per_unit?: number;
	/** Maximum RAM per VM (MB). */
	max_ram_per_vm?: number;
	/** Maximum cores per VM. */
	max_cores_per_vm?: number;
	/** Storage cache per node (MB). */
	storage_cachesize?: number;
	/** Storage buffer per node (MB). */
	storage_buffersize?: number;
	/** Allocate hugepages for storage. */
	storage_hugepages?: boolean;
	/** Target max RAM utilization percentage. */
	target_ram_pct?: number;
	/** Percentage of reserve RAM available for VMs. */
	ram_overcommit_pct?: number;
	/** Tier used for swap (-1 = disabled). */
	swap_tier?: number;
	/** Swap per drive (MB). */
	swap_per_drive?: number;
	/** System log filter string. */
	log_filter?: string;
	/** Maximum core temperature (Celsius). */
	max_core_temp?: number;
	/** Maximum core temperature warning threshold %. */
	max_core_temp_warn_perc?: number;
	/** Critical core temperature (Celsius). */
	critical_core_temp?: number;
	/** Disable CPU sleep states. */
	disable_sleep?: boolean;
}

/**
 * Parameters for updating a cluster.
 *
 * All fields optional. Excludes read-only fields: `system`, `created`, `storage`,
 * `recommended_cpu_type`, `status`.
 */
export interface ClusterUpdateParams {
	/** Cluster name. */
	name?: string;
	/** Cluster description. */
	description?: string;
	/** Whether the cluster is enabled. */
	enabled?: boolean;
	/** Whether this cluster provides compute resources. */
	compute?: boolean;
	/** Enable nested virtualization. */
	kvm_nested?: boolean;
	/** Allow live migration of nested-virt VMs. */
	allow_nested_virt_migration?: boolean;
	/** Allow live migration of vGPU VMs. */
	allow_vgpu_migration?: boolean;
	/** Enable split lock detection. */
	enable_split_lock_detection?: boolean;
	/** Default CPU type for new VMs. */
	default_cpu?: CpuType;
	/** Disable CPU security mitigations. */
	disable_cpu_security_mitigations?: boolean;
	/** Disable speculative store bypass. */
	spec_store_bypass_disable?: boolean;
	/** Disable SMT. */
	disable_smt?: boolean;
	/** Enable NVMe power management. */
	enable_nvme_power_management?: boolean;
	/** Energy-performance policy. */
	x86_energy_perf_policy?: EnergyPerfPolicy;
	/** CPU scaling governor. */
	scaling_governor?: ScalingGovernor;
	/** RAM per resource unit (MB). */
	ram_per_unit?: number;
	/** Cores per resource unit. */
	cores_per_unit?: number;
	/** Cost per resource unit. */
	cost_per_unit?: number;
	/** Price per resource unit. */
	price_per_unit?: number;
	/** Maximum RAM per VM (MB). */
	max_ram_per_vm?: number;
	/** Maximum cores per VM. */
	max_cores_per_vm?: number;
	/** Storage cache per node (MB). */
	storage_cachesize?: number;
	/** Storage buffer per node (MB). */
	storage_buffersize?: number;
	/** Allocate hugepages for storage. */
	storage_hugepages?: boolean;
	/** Target max RAM utilization percentage. */
	target_ram_pct?: number;
	/** Percentage of reserve RAM available for VMs. */
	ram_overcommit_pct?: number;
	/** Tier used for swap (-1 = disabled). */
	swap_tier?: number;
	/** Swap per drive (MB). */
	swap_per_drive?: number;
	/** System log filter string. */
	log_filter?: string;
	/** Maximum core temperature (Celsius). */
	max_core_temp?: number;
	/** Maximum core temperature warning threshold %. */
	max_core_temp_warn_perc?: number;
	/** Critical core temperature (Celsius). */
	critical_core_temp?: number;
	/** Disable CPU sleep states. */
	disable_sleep?: boolean;
}
