import type { FlexKey, Resource } from "../../types.js";

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Console display protocol for the VM. */
export type ConsoleType = "vnc" | "spice" | "serial" | "none" | (string & {});

/** Behavior when host power is restored after an outage. */
export type OnPowerLoss =
  | "power_on"
  | "last_state"
  | "leave_off"
  | (string & {});

/** Guest operating system family hint. */
export type OSFamily =
  | "linux"
  | "windows"
  | "freebsd"
  | "other"
  | (string & {});

/** Boot device priority order. */
export type BootOrder =
  | "cd"
  | "cdn"
  | "dc"
  | "nc"
  | "n"
  | "c"
  | "d"
  | "strict"
  | (string & {});

/** Cloud-init metadata source configuration. */
export type CloudInitDatasource =
  | "none"
  | "config_drive_v2"
  | "nocloud"
  | (string & {});

/** VM live-migration strategy. */
export type MigrationMethod = "auto" | "live" | (string & {});

/** How the VM was originally created. */
export type CreatedFrom =
  | "import"
  | "import_vmx"
  | "import_ovf"
  | "import_vmware"
  | "import_shared"
  | "clone"
  | "recipe"
  | "custom"
  | "terraform"
  | (string & {});

/** Video card emulation type. */
export type VideoType =
  | "std"
  | "cirrus"
  | "vmware"
  | "qxl"
  | "virtio"
  | "none"
  | (string & {});

/** Sound card emulation type. */
export type SoundType =
  | "none"
  | "sb16"
  | "es1370"
  | "ac97"
  | "adlib"
  | "gus"
  | "cs4231a"
  | "hda"
  | "pcspk"
  | (string & {});

/** Real-time clock base setting. */
export type RTCBase = "utc" | "localtime" | (string & {});

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

  /**
   * Current power state. `true` = powered on.
   *
   * **Note:** The API often omits this field on VM responses. For reliable
   * power state, use {@link MachineStatus} via `client.machineStatuses.getByMachine()`.
   */
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

  // ─── Joined status fields (from machine#status) ─────────────────────

  /** Machine status value (joined from machine_status). Present in default list/get responses. */
  status?: string;

  /** Whether the VM is currently running (joined from machine_status). */
  running?: boolean;

  /** Node key where this VM is running (joined from machine_status). */
  node_key?: FlexKey;

  /** Node name where this VM is running (joined from machine_status). */
  node_name?: string;
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

/**
 * Authentication for a console session.
 *
 * The VergeOS WebSocket console endpoint supports three authentication methods:
 *
 * - `{ username, password }` — exchanged for a session token via
 *   `POST /api/sys/tokens` (local VergeOS users). The session token is
 *   embedded in the WebSocket URL as `?token=`.
 * - `{ token }` — a pre-existing session token, e.g., from an OIDC login
 *   flow. Embedded in the WebSocket URL as `?token=`.
 * - `{ apiKey }` — a VergeOS API key. The console endpoint accepts
 *   `Authorization: Bearer <apiKey>` directly. The WebSocket URL is returned
 *   **without** a token — the caller must set the `Authorization` header
 *   during the WebSocket handshake (supported in Node.js, Deno, and Bun;
 *   not available in browser `WebSocket` — use username/password or a
 *   session token for browser-based consoles).
 */
export type ConsoleAuth = ConsoleCredentials | ConsoleToken | ConsoleApiKey;

/** Username/password credentials for local VergeOS users. */
export interface ConsoleCredentials {
  /** VergeOS username (login name). */
  username: string;

  /** VergeOS password. */
  password: string;
}

/** Pre-existing session token (e.g., from OIDC authentication). */
export interface ConsoleToken {
  /** A valid VergeOS session token. */
  token: string;
}

/**
 * API key authentication for console sessions.
 *
 * The console endpoint accepts `Authorization: Bearer <apiKey>` directly,
 * bypassing the need for a session token. The caller is responsible for
 * setting the `Authorization` header on the WebSocket handshake.
 *
 * **Browser limitation:** The browser `WebSocket` API does not support
 * custom headers. Use {@link ConsoleCredentials} or {@link ConsoleToken}
 * for browser-based console connections.
 */
export interface ConsoleApiKey {
  /** A valid VergeOS API key. */
  apiKey: string;
}

/**
 * Console connection information for a virtual machine.
 *
 * Provides everything needed to establish a direct console connection
 * (VNC, SPICE, or serial) from a custom frontend using libraries like
 * noVNC, SpiceHTML5, or xterm.js.
 *
 * The `authMethod` field indicates how to authenticate the WebSocket:
 *
 * - `'token'` — the `websocketUrl` already contains `?token=<sessionToken>`.
 *   Pass it directly to your WebSocket client with no extra headers.
 * - `'bearer'` — the `websocketUrl` has no embedded token. Set the
 *   `Authorization: Bearer <apiKey>` header on the WebSocket handshake.
 *   The API key is available in the `apiKey` field.
 *
 * @example Token-based auth (browser-compatible)
 * ```typescript
 * const info = await client.vms.getConsoleInfo(42, {
 *   username: 'admin', password: 'secret',
 * });
 * if (info.isAvailable) {
 *   const rfb = new RFB(container, info.websocketUrl!);
 * }
 * ```
 *
 * @example Bearer auth (Node.js / Deno / Bun)
 * ```typescript
 * const info = await client.vms.getConsoleInfo(42, {
 *   apiKey: 'my-api-key',
 * });
 * if (info.isAvailable) {
 *   const ws = new WebSocket(info.websocketUrl!, {
 *     headers: { Authorization: `Bearer ${info.apiKey}` },
 *   });
 * }
 * ```
 */
export interface VMConsoleInfo {
  /** Console display protocol configured on the VM. */
  consoleType: ConsoleType;

  /** Hostname or IP of the console service. `null` when the VM is not running. */
  host: string | null;

  /** TCP port of the console service. `null` when the VM is not running. */
  port: number | null;

  /** Key of the `machine_console` record (used to build the WebSocket URL). `null` when unavailable. */
  consoleKey: number | null;

  /**
   * WebSocket URL for connecting to the console.
   *
   * - When `authMethod` is `'token'`: includes `?token=<sessionToken>` —
   *   ready to use directly with no additional auth.
   * - When `authMethod` is `'bearer'`: no token in the URL — the caller
   *   must set `Authorization: Bearer <apiKey>` on the WebSocket handshake.
   *
   * `null` when the VM is not running or console info is unavailable.
   */
  websocketUrl: string | null;

  /**
   * How the WebSocket connection should be authenticated.
   *
   * - `'token'` — session token is embedded in `websocketUrl` as `?token=`.
   *   Works in all environments including browsers.
   * - `'bearer'` — no token in URL. Caller must pass `Authorization: Bearer`
   *   header during WebSocket handshake. Works in Node.js, Deno, and Bun
   *   but **not** in browser `WebSocket`.
   *
   * `null` when the console is unavailable.
   */
  authMethod: "token" | "bearer" | null;

  /** Session token used to authenticate the WebSocket connection. `null` when using bearer auth or unavailable. */
  token: string | null;

  /** API key for bearer auth on the WebSocket handshake. `null` when using token auth or unavailable. */
  apiKey: string | null;

  /** VergeOS web UI console URL (e.g., `https://host/#/vm-console/42`). */
  webUrl: string;

  /** Whether the console requires a password (`console_pass_enabled`). */
  isPasswordProtected: boolean;

  /** Whether the console connection is available (VM is running and has a console service). */
  isAvailable: boolean;
}
