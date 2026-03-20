/**
 * Flexible key type that handles VergeOS's inconsistent ID serialization.
 * The API may return resource IDs as either numbers or strings.
 */
export type FlexKey = number | string;

/**
 * Base interface for all VergeOS resources.
 * Every resource returned by the API includes a `$key` identifier.
 */
export interface Resource {
  $key: FlexKey;
}

/**
 * Envelope type for VergeOS API responses.
 * Wraps the response data with optional key and error information.
 */
export interface ApiResponse<T = unknown> {
  $key?: FlexKey;
  response?: T;
  err?: string;
}

/**
 * Configuration for creating a VergeClient instance.
 */
export interface ClientConfig {
  /** VergeOS server hostname or URL (e.g., "192.168.1.100" or "https://my-verge.example.com"). */
  host: string;

  /** Username for authentication (used with password-based auth). */
  username?: string;

  /** Password for authentication (used with password-based auth). */
  password?: string;

  /** API key for token-based authentication. */
  apiKey?: string;

  /** Whether to verify SSL certificates. Defaults to `true`. */
  verifySsl?: boolean;

  /** Request timeout in milliseconds. Defaults to `DEFAULT_TIMEOUT`. */
  timeout?: number;

  /** Number of retry attempts for failed requests. Defaults to `DEFAULT_RETRIES`. */
  retries?: number;

  /** Backoff interval between retries in milliseconds. Defaults to `DEFAULT_RETRY_BACKOFF`. */
  retryBackoff?: number;

  /** Custom fetch implementation for testing or platform-specific overrides. */
  fetch?: typeof globalThis.fetch;

  /** AbortSignal for cancelling requests. */
  signal?: AbortSignal;
}

/**
 * Options for list (query) operations.
 */
export interface ListOptions {
  /** Filter expression string for the VergeOS API query. */
  filter?: string;

  /** Fields to include in the response. Accepts a comma-separated string or an array of field names. */
  fields?: string | string[];

  /** Sort expression (e.g., "name" or "-created"). */
  sort?: string;

  /** Maximum number of items to return per request. */
  limit?: number;

  /** Number of items to skip (for pagination). */
  offset?: number;
}

/**
 * Options for auto-paginated list operations that fetch all matching resources.
 * Omits `limit` and `offset` (managed internally) and adds `pageSize` control.
 */
export interface ListAllOptions extends Omit<ListOptions, "limit" | "offset"> {
  /** Number of items to fetch per page during auto-pagination. Defaults to `DEFAULT_PAGE_SIZE`. */
  pageSize?: number;
}

/**
 * Options for mutation operations (create, update, delete).
 */
export interface MutationOptions {
  /** Whether to perform a follow-up GET to return the full resource after mutation. Defaults to `true`. */
  readBack?: boolean;
}

// ─── Service Infrastructure Types ────────────────────────────────────────────
// Re-exported here for convenient type-only imports via `tsvergeos/types`.

export type {
  CrossSiteResult,
  CrossSiteServices,
  SiteResource,
} from "./cross-site.js";
export type { ActionConfig } from "./services/base.js";
export type {
  SiteConfig,
  SiteManagerOptions,
  SiteStatus,
} from "./site-manager.js";

// ─── Service Resource Types ──────────────────────────────────────────────────

export type {
  ApiKeyExpiresType,
  UserAPIKey,
  UserAPIKeyCreateParams,
  UserAPIKeyCreateResult,
  UserAPIKeyUpdateParams,
} from "./services/api-key/types.js";
export type {
  Catalog,
  CatalogPublishingScope,
  CatalogUpdateParams,
} from "./services/catalog/types.js";
export type {
  CatalogMaxTier,
  CatalogRepository,
  CatalogRepositoryCreateParams,
  CatalogRepositoryOverrideScope,
  CatalogRepositoryType,
  CatalogRepositoryUpdateParams,
} from "./services/catalog-repository/types.js";
export type {
  Cluster,
  ClusterCreateParams,
  ClusterUpdateParams,
  CpuType,
  EnergyPerfPolicy,
  ScalingGovernor,
} from "./services/cluster/types.js";
export type { ClusterTier } from "./services/cluster-tier/types.js";
export type { ClusterTierStats } from "./services/cluster-tier-stats/types.js";
export type {
  ClusterTierState,
  ClusterTierStatus,
  ClusterTierStatusValue,
} from "./services/cluster-tier-status/types.js";
export type {
  FilePreferredTier,
  FileUploadOptions,
  VgFile,
  VgFileCreateParams,
  VgFileType,
  VgFileUpdateParams,
} from "./services/file/types.js";
export type {
  Group,
  GroupCreateParams,
  GroupUpdateParams,
} from "./services/group/types.js";
export type {
  IPSec,
  IPSecCreateParams,
  IPSecUpdateParams,
} from "./services/ipsec/types.js";
export type { IPSecConnection } from "./services/ipsec-connection/types.js";
export type {
  IPSecPhase1,
  IPSecPhase1CreateParams,
  IPSecPhase1UpdateParams,
} from "./services/ipsec-phase1/types.js";
export type {
  IPSecPhase2,
  IPSecPhase2CreateParams,
  IPSecPhase2UpdateParams,
} from "./services/ipsec-phase2/types.js";
export type {
  DeviceType,
  MachineDevice,
  MachineDeviceCreateParams,
  MachineDeviceUpdateParams,
  MachineType,
} from "./services/machine-device/types.js";
export type {
  DriveInterface,
  DriveMedia,
  DriveOptimize,
  MachineDrive,
  MachineDriveCreateParams,
  MachineDriveUpdateParams,
} from "./services/machine-drive/types.js";
export type {
  LocateStatus,
  MachineDrivePhys,
} from "./services/machine-drive-phys/types.js";
export type { MachineDriveStats } from "./services/machine-drive-stats/types.js";
export type {
  MachineNIC,
  MachineNICCreateParams,
  MachineNICUpdateParams,
  NicInterface,
} from "./services/machine-nic/types.js";
export type { MachineNicStats } from "./services/machine-nic-stats/types.js";
export type {
  ExpiresType,
  MachineSnapshot,
  MachineSnapshotCreateParams,
  MachineSnapshotUpdateParams,
} from "./services/machine-snapshot/types.js";
export type { MachineStats } from "./services/machine-stats/types.js";
export type {
  Member,
  MemberCreateParams,
  MemberUpdateParams,
} from "./services/member/types.js";
export type {
  NASReadAheadKb,
  NASService,
  NASServiceCreateParams,
  NASServiceUpdateParams,
} from "./services/nas-service/types.js";
export type {
  NASServiceUser,
  NASServiceUserCreateParams,
  NASServiceUserUpdateParams,
} from "./services/nas-service-user/types.js";
export type {
  DnsMode,
  IpAddressType,
  Layer2Type,
  Network,
  NetworkCreateParams,
  NetworkOnPowerLoss,
  NetworkType,
  NetworkUpdateParams,
  PortMirroringMode,
  PxeMode,
  RateLimitType,
} from "./services/network/types.js";
export type {
  AddressType,
  NetworkAddress,
  NetworkAddressCreateParams,
  NetworkAddressUpdateParams,
} from "./services/network-address/types.js";
export type {
  DnsRecordType,
  NetworkDnsRecord,
  NetworkDnsRecordCreateParams,
  NetworkDnsRecordUpdateParams,
} from "./services/network-dns-record/types.js";
export type {
  NetworkDnsView,
  NetworkDnsViewCreateParams,
  NetworkDnsViewUpdateParams,
} from "./services/network-dns-view/types.js";
export type {
  DnsZoneNotify,
  DnsZoneType,
  NetworkDnsZone,
  NetworkDnsZoneCreateParams,
  NetworkDnsZoneUpdateParams,
} from "./services/network-dns-zone/types.js";
export type {
  HostType,
  NetworkHost,
  NetworkHostCreateParams,
  NetworkHostUpdateParams,
} from "./services/network-host/types.js";
export type {
  NetworkRule,
  NetworkRuleCreateParams,
  NetworkRuleUpdateParams,
  RuleAction,
  RuleDirection,
  RuleInterface,
  RulePin,
  RuleProtocol,
} from "./services/network-rule/types.js";
export type {
  NetworkRuleAlias,
  NetworkRuleAliasCreateParams,
  NetworkRuleAliasUpdateParams,
  PublishingScope,
} from "./services/network-rule-alias/types.js";
export type {
  Permission,
  PermissionCreateParams,
  PermissionUpdateParams,
} from "./services/permission/types.js";
export type {
  Setting,
  SettingUpdateParams,
} from "./services/settings/types.js";
export type { StorageTier } from "./services/storage-tier/types.js";
export type { StorageTierStats } from "./services/storage-tier-stats/types.js";
export type {
  System,
  SystemUpdateParams,
  VersionInfo,
} from "./services/system/types.js";
export type {
  Tenant,
  TenantCloneOptions,
  TenantCreateParams,
  TenantUpdateParams,
  ThemeAccess,
} from "./services/tenant/types.js";
export type {
  TenantLayer2CreateParams,
  TenantLayer2Network,
  TenantLayer2UpdateParams,
} from "./services/tenant-layer2/types.js";
export type {
  TenantNode,
  TenantNodeCreateParams,
  TenantNodeOnPowerLoss,
  TenantNodeUpdateParams,
} from "./services/tenant-node/types.js";
export type {
  TenantRecipe,
  TenantRecipeAction,
  TenantRecipeDeployOptions,
  TenantRecipeUpdateParams,
} from "./services/tenant-recipe/types.js";
export type {
  TenantRecipeInstance,
  TenantRecipeInstanceCreateParams,
  TenantRecipeInstanceUpdateParams,
} from "./services/tenant-recipe-instance/types.js";
export type {
  TenantSnapshot,
  TenantSnapshotUpdateParams,
} from "./services/tenant-snapshot/types.js";
export type {
  TenantStorage,
  TenantStorageCreateParams,
  TenantStorageUpdateParams,
} from "./services/tenant-storage/types.js";
export type {
  TwoFactorType,
  User,
  UserCreateParams,
  UserType,
  UserUpdateParams,
} from "./services/user/types.js";
export type {
  BootOrder,
  CloudInitDatasource,
  ConsoleType,
  CreatedFrom,
  MigrationMethod,
  OnPowerLoss,
  OSFamily,
  RTCBase,
  SoundType,
  VideoType,
  VM,
  VMCloneOptions,
  VMCreateParams,
  VMSnapshotOptions,
  VMUpdateParams,
} from "./services/vm/types.js";
export type {
  RecipeDatabaseContext,
  RecipeQuestion,
  RecipeQuestionPostprocess,
  RecipeQuestionType,
  RecipeSection,
  VMRecipe,
  VMRecipeAction,
  VMRecipeDeployOptions,
  VMRecipeUpdateParams,
} from "./services/vm-recipe/types.js";
export type {
  VMRecipeInstance,
  VMRecipeInstanceCreateParams,
  VMRecipeInstanceUpdateParams,
} from "./services/vm-recipe-instance/types.js";
export type {
  CifsProtocol,
  NfsProtocol,
  ReadAheadKb,
  Volume,
  VolumeCreateParams,
  VolumeFsType,
  VolumeOptimize,
  VolumePreferredTier,
  VolumeUpdateParams,
} from "./services/volume/types.js";
export type {
  BrowseOptions,
  VolumeBrowserEntry,
  VolumeBrowserFilter,
  VolumeBrowserJob,
  VolumeBrowserParams,
  VolumeBrowserPasteMode,
  VolumeBrowserQuery,
  VolumeBrowserRequest,
  VolumeBrowserStatus,
  WaitOptions,
} from "./services/volume-browser/types.js";
export type {
  VolumeCIFSShare,
  VolumeCIFSShareCreateParams,
  VolumeCIFSShareUpdateParams,
} from "./services/volume-cifs-share/types.js";
export type {
  NfsDataAccess,
  NfsSquash,
  VolumeNFSShare,
  VolumeNFSShareCreateParams,
  VolumeNFSShareUpdateParams,
} from "./services/volume-nfs-share/types.js";
export type {
  VolumeSnapshot,
  VolumeSnapshotCreateParams,
  VolumeSnapshotExpiresType,
  VolumeSnapshotUpdateParams,
} from "./services/volume-snapshot/types.js";
export type {
  VolumeSync,
  VolumeSyncCreateParams,
  VolumeSyncDestinationDelete,
  VolumeSyncMethod,
  VolumeSyncPreferredTier,
  VolumeSyncType,
  VolumeSyncUpdateParams,
} from "./services/volume-sync/types.js";
export type {
  WireGuard,
  WireGuardCreateParams,
  WireGuardUpdateParams,
} from "./services/wireguard/types.js";
export type {
  WireGuardPeer,
  WireGuardPeerCreateParams,
  WireGuardPeerFirewallConfig,
  WireGuardPeerUpdateParams,
} from "./services/wireguard-peer/types.js";
export type { WireGuardPeerStatus } from "./services/wireguard-peer-status/types.js";
