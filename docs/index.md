[**tsvergeos**](README.md)

***

[tsvergeos](README.md) / index

# index

## Classes

### VergeClient

Defined in: [client.ts:30](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/client.ts#L30)

Primary entry point for interacting with a VergeOS server.

Manages authentication, HTTP transport, version checking, and lazy
service instantiation via a `Proxy`-based registration pattern.

Services register themselves via [VergeClient.registerService](#registerservice) and
TypeScript declaration merging, enabling tree-shakeable imports:

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/vm'; // registers client.vms

const client = await VergeClient.connect({ host: '...', apiKey: '...' });
const vms = await client.vms.list();
```

#### Constructors

##### Constructor

> **new VergeClient**(`config`): [`VergeClient`](#vergeclient)

Defined in: [client.ts:56](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/client.ts#L56)

Create a new `VergeClient` without performing a version check.

Prefer [VergeClient.connect](#connect) for production use — it validates
the server version before returning. Use the constructor directly
for testing or offline scenarios.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`ClientConfig`](types.md#clientconfig) | Connection and authentication configuration |

###### Returns

[`VergeClient`](#vergeclient)

###### Throws

[ValidationError](#validationerror) if `host` is missing or no auth is provided

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-alarmtypes"></a> `alarmTypes` | `readonly` | [`AlarmTypeService`](services/alarm-type.md#alarmtypeservice) | Service for querying alarm type definitions. | [services/alarm-type/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/alarm-type/index.ts#L22) |
| <a id="property-alarms"></a> `alarms` | `readonly` | [`AlarmService`](services/alarm.md#alarmservice) | Service for managing alarms. | [services/alarm/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/alarm/index.ts#L22) |
| <a id="property-apikeys"></a> `apiKeys` | `readonly` | [`APIKeyService`](services/api-key.md#apikeyservice) | Service for managing user API keys. | [services/api-key/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/api-key/index.ts#L22) |
| <a id="property-catalogrepositories"></a> `catalogRepositories` | `readonly` | [`CatalogRepositoryService`](services/catalog-repository.md#catalogrepositoryservice) | Service for managing catalog repositories. | [services/catalog-repository/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/catalog-repository/index.ts#L22) |
| <a id="property-catalogs"></a> `catalogs` | `readonly` | [`CatalogService`](services/catalog.md#catalogservice) | Service for managing catalogs. | [services/catalog/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/catalog/index.ts#L22) |
| <a id="property-certificates"></a> `certificates` | `readonly` | [`CertificateService`](services/certificate.md#certificateservice) | Service for managing TLS certificates. | [services/certificate/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/certificate/index.ts#L22) |
| <a id="property-cloudinitfiles"></a> `cloudInitFiles` | `readonly` | [`CloudInitFileService`](services/cloud-init.md#cloudinitfileservice) | Cloud-init file template management. | [services/cloud-init/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/cloud-init/index.ts#L22) |
| <a id="property-cloudsnapshottenants"></a> `cloudSnapshotTenants` | `readonly` | [`CloudSnapshotTenantService`](services/cloud-snapshot-tenant.md#cloudsnapshottenantservice) | Service for querying tenants captured in cloud snapshots. | [services/cloud-snapshot-tenant/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/cloud-snapshot-tenant/index.ts#L22) |
| <a id="property-cloudsnapshotvms"></a> `cloudSnapshotVms` | `readonly` | [`CloudSnapshotVMService`](services/cloud-snapshot-vm.md#cloudsnapshotvmservice) | Service for querying VMs captured in cloud snapshots. | [services/cloud-snapshot-vm/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/cloud-snapshot-vm/index.ts#L22) |
| <a id="property-cloudsnapshots"></a> `cloudSnapshots` | `readonly` | [`CloudSnapshotService`](services/cloud-snapshot.md#cloudsnapshotservice) | Service for managing cloud snapshots. | [services/cloud-snapshot/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/cloud-snapshot/index.ts#L22) |
| <a id="property-clustertierstats"></a> `clusterTierStats` | `readonly` | [`ClusterTierStatsService`](services/cluster-tier-stats.md#clustertierstatsservice) | Service for querying cluster tier I/O statistics (read-only). | [services/cluster-tier-stats/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/cluster-tier-stats/index.ts#L22) |
| <a id="property-clustertierstatus"></a> `clusterTierStatus` | `readonly` | [`ClusterTierStatusService`](services/cluster-tier-status.md#clustertierstatusservice) | Service for querying cluster tier health and redundancy status (read-only). | [services/cluster-tier-status/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/cluster-tier-status/index.ts#L22) |
| <a id="property-clustertiers"></a> `clusterTiers` | `readonly` | [`ClusterTierService`](services/cluster-tier.md#clustertierservice) | Service for querying cluster tier capacity and cost data (read-only). | [services/cluster-tier/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/cluster-tier/index.ts#L22) |
| <a id="property-clusters"></a> `clusters` | `readonly` | [`ClusterService`](services/cluster.md#clusterservice) | Service for managing VergeOS clusters. | [services/cluster/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/cluster/index.ts#L22) |
| <a id="property-files"></a> `files` | `readonly` | [`FileService`](services/file.md#fileservice) | Service for managing files (upload, download, metadata CRUD). | [services/file/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/file/index.ts#L22) |
| <a id="property-groups"></a> `groups` | `readonly` | [`GroupService`](services/group.md#groupservice) | Service for managing groups. | [services/group/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/group/index.ts#L22) |
| <a id="property-ipsecconnections"></a> `ipsecConnections` | `readonly` | [`IPSecConnectionService`](services/ipsec-connection.md#ipsecconnectionservice) | Service for querying IPSec VPN connection status (read-only). | [services/ipsec-connection/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/ipsec-connection/index.ts#L22) |
| <a id="property-ipsecphase1s"></a> `ipsecPhase1s` | `readonly` | [`IPSecPhase1Service`](services/ipsec-phase1.md#ipsecphase1service) | Service for managing IPSec Phase 1 (IKE SA) configurations. | [services/ipsec-phase1/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/ipsec-phase1/index.ts#L22) |
| <a id="property-ipsecphase2s"></a> `ipsecPhase2s` | `readonly` | [`IPSecPhase2Service`](services/ipsec-phase2.md#ipsecphase2service) | Service for managing IPSec Phase 2 (child SA) configurations. | [services/ipsec-phase2/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/ipsec-phase2/index.ts#L22) |
| <a id="property-ipsec"></a> `ipsec` | `readonly` | [`IPSecService`](services/ipsec.md#ipsecservice) | Service for managing IPSec VPN configurations on virtual networks. | [services/ipsec/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/ipsec/index.ts#L22) |
| <a id="property-logs"></a> `logs` | `readonly` | [`LogService`](services/log.md#logservice) | Service for querying VergeOS system logs. | [services/log/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/log/index.ts#L22) |
| <a id="property-machinedevices"></a> `machineDevices` | `readonly` | [`MachineDeviceService`](services/machine-device.md#machinedeviceservice) | Service for managing machine devices. | [services/machine-device/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-device/index.ts#L22) |
| <a id="property-machinedrivephys"></a> `machineDrivePhys` | `readonly` | [`MachineDrivePhysService`](services/machine-drive-phys.md#machinedrivephysservice) | Service for querying physical drive hardware information (read-only). | [services/machine-drive-phys/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-drive-phys/index.ts#L22) |
| <a id="property-machinedrivestats"></a> `machineDriveStats` | `readonly` | [`MachineDriveStatsService`](services/machine-drive-stats.md#machinedrivestatsservice) | Service for querying machine drive I/O statistics (read-only). | [services/machine-drive-stats/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-drive-stats/index.ts#L22) |
| <a id="property-machinedrives"></a> `machineDrives` | `readonly` | [`MachineDriveService`](services/machine-drive.md#machinedriveservice) | Service for managing machine drives. | [services/machine-drive/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-drive/index.ts#L22) |
| <a id="property-machinelogs"></a> `machineLogs` | `readonly` | [`MachineLogService`](services/machine-log.md#machinelogservice) | Service for querying machine log entries (read-only). | [services/machine-log/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-log/index.ts#L22) |
| <a id="property-machinenicstatshistorylong"></a> `machineNicStatsHistoryLong` | `readonly` | [`MachineNicStatsHistoryLongService`](services/machine-nic-stats-history-long.md#machinenicstatshistorylongservice) | Service for querying long-term machine NIC stats history (read-only). | [services/machine-nic-stats-history-long/index.ts:23](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-nic-stats-history-long/index.ts#L23) |
| <a id="property-machinenicstatshistoryshort"></a> `machineNicStatsHistoryShort` | `readonly` | [`MachineNicStatsHistoryShortService`](services/machine-nic-stats-history-short.md#machinenicstatshistoryshortservice) | Service for querying short-term machine NIC stats history (read-only). | [services/machine-nic-stats-history-short/index.ts:23](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-nic-stats-history-short/index.ts#L23) |
| <a id="property-machinenicstats"></a> `machineNicStats` | `readonly` | [`MachineNicStatsService`](services/machine-nic-stats.md#machinenicstatsservice) | Service for querying machine NIC traffic statistics (read-only). | [services/machine-nic-stats/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-nic-stats/index.ts#L22) |
| <a id="property-machinenics"></a> `machineNics` | `readonly` | [`MachineNicService`](services/machine-nic.md#machinenicservice) | Service for managing machine NICs. | [services/machine-nic/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-nic/index.ts#L22) |
| <a id="property-machinesnapshots"></a> `machineSnapshots` | `readonly` | [`MachineSnapshotService`](services/machine-snapshot.md#machinesnapshotservice) | Service for managing machine snapshots. | [services/machine-snapshot/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-snapshot/index.ts#L22) |
| <a id="property-machinestatshistorylong"></a> `machineStatsHistoryLong` | `readonly` | [`MachineStatsHistoryLongService`](services/machine-stats-history-long.md#machinestatshistorylongservice) | Service for querying long-term machine stats history (read-only). | [services/machine-stats-history-long/index.ts:23](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-stats-history-long/index.ts#L23) |
| <a id="property-machinestatshistoryshort"></a> `machineStatsHistoryShort` | `readonly` | [`MachineStatsHistoryShortService`](services/machine-stats-history-short.md#machinestatshistoryshortservice) | Service for querying short-term machine stats history (read-only). | [services/machine-stats-history-short/index.ts:23](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-stats-history-short/index.ts#L23) |
| <a id="property-machinestats"></a> `machineStats` | `readonly` | [`MachineStatsService`](services/machine-stats.md#machinestatsservice) | Service for querying machine CPU and RAM statistics (read-only). | [services/machine-stats/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-stats/index.ts#L22) |
| <a id="property-machinestatuses"></a> `machineStatuses` | `readonly` | [`MachineStatusService`](services/machine-status.md#machinestatusservice) | Service for querying machine runtime status — power state, health, migration, agent info (read-only). | [services/machine-status/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-status/index.ts#L22) |
| <a id="property-members"></a> `members` | `readonly` | [`MemberService`](services/member.md#memberservice) | Service for managing group memberships. | [services/member/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/member/index.ts#L22) |
| <a id="property-nasserviceusers"></a> `nasServiceUsers` | `readonly` | [`NASServiceUserService`](services/nas-service-user.md#nasserviceuserservice) | Service for managing NAS service users. | [services/nas-service-user/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/nas-service-user/index.ts#L22) |
| <a id="property-nasservices"></a> `nasServices` | `readonly` | [`NASServiceService`](services/nas-service.md#nasserviceservice) | Service for managing NAS services. | [services/nas-service/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/nas-service/index.ts#L22) |
| <a id="property-networkaddresses"></a> `networkAddresses` | `readonly` | [`NetworkAddressService`](services/network-address.md#networkaddressservice) | Service for managing network addresses (DHCP leases, static IPs, aliases, etc.). | [services/network-address/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network-address/index.ts#L22) |
| <a id="property-networkdnsrecords"></a> `networkDnsRecords` | `readonly` | [`NetworkDnsRecordService`](services/network-dns-record.md#networkdnsrecordservice) | Service for managing DNS zone records. | [services/network-dns-record/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network-dns-record/index.ts#L22) |
| <a id="property-networkdnsviews"></a> `networkDnsViews` | `readonly` | [`NetworkDnsViewService`](services/network-dns-view.md#networkdnsviewservice) | Service for managing DNS views on virtual networks. | [services/network-dns-view/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network-dns-view/index.ts#L22) |
| <a id="property-networkdnszones"></a> `networkDnsZones` | `readonly` | [`NetworkDnsZoneService`](services/network-dns-zone.md#networkdnszoneservice) | Service for managing DNS zones within DNS views. | [services/network-dns-zone/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network-dns-zone/index.ts#L22) |
| <a id="property-networkhosts"></a> `networkHosts` | `readonly` | [`NetworkHostService`](services/network-host.md#networkhostservice) | Service for managing DNS/DHCP host overrides on virtual networks. | [services/network-host/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network-host/index.ts#L22) |
| <a id="property-networkrulealiases"></a> `networkRuleAliases` | `readonly` | [`NetworkRuleAliasService`](services/network-rule-alias.md#networkrulealiasservice) | Service for managing network rule aliases (global named address groups). | [services/network-rule-alias/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network-rule-alias/index.ts#L22) |
| <a id="property-networkrules"></a> `networkRules` | `readonly` | [`NetworkRuleService`](services/network-rule.md#networkruleservice) | Service for managing network firewall rules. | [services/network-rule/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network-rule/index.ts#L22) |
| <a id="property-networks"></a> `networks` | `readonly` | [`NetworkService`](services/network.md#networkservice) | Service for managing virtual networks. | [services/network/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network/index.ts#L22) |
| <a id="property-nodes"></a> `nodes` | `readonly` | [`NodeService`](services/node.md#nodeservice) | Service for managing VergeOS nodes. | [services/node/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/node/index.ts#L22) |
| <a id="property-permissions"></a> `permissions` | `readonly` | [`PermissionService`](services/permission.md#permissionservice) | Service for managing permissions. | [services/permission/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/permission/index.ts#L22) |
| <a id="property-resourcegroups"></a> `resourceGroups` | `readonly` | [`ResourceGroupService`](services/resource-group.md#resourcegroupservice) | Physical hardware resource group management. | [services/resource-group/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/resource-group/index.ts#L22) |
| <a id="property-settings"></a> `settings` | `readonly` | [`SettingsService`](services/settings.md#settingsservice) | Service for managing VergeOS system settings (key-value configuration). | [services/settings/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/settings/index.ts#L22) |
| <a id="property-sitesyncsincoming"></a> `siteSyncsIncoming` | `readonly` | [`SiteSyncIncomingService`](services/site-sync-incoming.md#sitesyncincomingservice) | Service for managing incoming site syncs. | [services/site-sync-incoming/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/site-sync-incoming/index.ts#L22) |
| <a id="property-sitesyncsoutgoing"></a> `siteSyncsOutgoing` | `readonly` | [`SiteSyncOutgoingService`](services/site-sync-outgoing.md#sitesyncoutgoingservice) | Service for managing outgoing site syncs. | [services/site-sync-outgoing/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/site-sync-outgoing/index.ts#L22) |
| <a id="property-sitesyncprofileperiods"></a> `siteSyncProfilePeriods` | `readonly` | [`SiteSyncProfilePeriodService`](services/site-sync-profile-period.md#sitesyncprofileperiodservice) | Service for managing site sync profile periods. | [services/site-sync-profile-period/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/site-sync-profile-period/index.ts#L22) |
| <a id="property-sites"></a> `sites` | `readonly` | [`SiteService`](services/site.md#siteservice) | Service for managing remote sites. | [services/site/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/site/index.ts#L22) |
| <a id="property-snapshotprofileperiods"></a> `snapshotProfilePeriods` | `readonly` | [`SnapshotProfilePeriodService`](services/snapshot-profile-period.md#snapshotprofileperiodservice) | Service for managing snapshot profile periods. | [services/snapshot-profile-period/index.ts:23](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/snapshot-profile-period/index.ts#L23) |
| <a id="property-snapshotprofiles"></a> `snapshotProfiles` | `readonly` | [`SnapshotProfileService`](services/snapshot-profile.md#snapshotprofileservice) | Service for managing snapshot profiles. | [services/snapshot-profile/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/snapshot-profile/index.ts#L22) |
| <a id="property-storagetierstats"></a> `storageTierStats` | `readonly` | [`StorageTierStatsService`](services/storage-tier-stats.md#storagetierstatsservice) | Service for querying storage tier I/O statistics (read-only). | [services/storage-tier-stats/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/storage-tier-stats/index.ts#L22) |
| <a id="property-storagetiers"></a> `storageTiers` | `readonly` | [`StorageTierService`](services/storage-tier.md#storagetierservice) | Service for querying storage tier capacity and utilization (read-only). | [services/storage-tier/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/storage-tier/index.ts#L22) |
| <a id="property-system"></a> `system` | `readonly` | [`SystemService`](services/system.md#systemservice) | Service for accessing VergeOS system information and version data. | [services/system/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/system/index.ts#L22) |
| <a id="property-tagcategories"></a> `tagCategories` | `readonly` | [`TagCategoryService`](services/tag-category.md#tagcategoryservice) | Service for managing tag categories. | [services/tag-category/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/tag-category/index.ts#L22) |
| <a id="property-tagmembers"></a> `tagMembers` | `readonly` | [`TagMemberService`](services/tag-member.md#tagmemberservice) | Service for managing tag members (tag-to-resource assignments). | [services/tag-member/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/tag-member/index.ts#L22) |
| <a id="property-tags"></a> `tags` | `readonly` | [`TagService`](services/tag.md#tagservice) | Service for managing tags. | [services/tag/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/tag/index.ts#L22) |
| <a id="property-tasks"></a> `tasks` | `readonly` | [`TaskService`](services/task.md#taskservice) | Service for managing tasks. | [services/task/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/task/index.ts#L22) |
| <a id="property-tenantlayer2networks"></a> `tenantLayer2Networks` | `readonly` | [`TenantLayer2Service`](services/tenant-layer2.md#tenantlayer2service) | Service for managing tenant Layer 2 network assignments. | [services/tenant-layer2/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/tenant-layer2/index.ts#L22) |
| <a id="property-tenantnodes"></a> `tenantNodes` | `readonly` | [`TenantNodeService`](services/tenant-node.md#tenantnodeservice) | Service for managing tenant nodes. | [services/tenant-node/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/tenant-node/index.ts#L22) |
| <a id="property-tenantrecipeinstances"></a> `tenantRecipeInstances` | `readonly` | [`TenantRecipeInstanceService`](services/tenant-recipe-instance.md#tenantrecipeinstanceservice) | Service for managing tenant recipe instances. | [services/tenant-recipe-instance/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/tenant-recipe-instance/index.ts#L22) |
| <a id="property-tenantrecipes"></a> `tenantRecipes` | `readonly` | [`TenantRecipeService`](services/tenant-recipe.md#tenantrecipeservice) | Service for managing tenant recipes. | [services/tenant-recipe/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/tenant-recipe/index.ts#L22) |
| <a id="property-tenantsnapshots"></a> `tenantSnapshots` | `readonly` | [`TenantSnapshotService`](services/tenant-snapshot.md#tenantsnapshotservice) | Service for managing tenant snapshots. | [services/tenant-snapshot/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/tenant-snapshot/index.ts#L22) |
| <a id="property-tenantstorage"></a> `tenantStorage` | `readonly` | [`TenantStorageService`](services/tenant-storage.md#tenantstorageservice) | Service for managing tenant storage allocations. | [services/tenant-storage/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/tenant-storage/index.ts#L22) |
| <a id="property-tenants"></a> `tenants` | `readonly` | [`TenantService`](services/tenant.md#tenantservice) | Service for managing tenants. | [services/tenant/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/tenant/index.ts#L22) |
| <a id="property-updatebranches"></a> `updateBranches` | `readonly` | [`UpdateBranchService`](services/update-branch.md#updatebranchservice) | Service for querying update branches (read-only). | [services/update-branch/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/update-branch/index.ts#L22) |
| <a id="property-updatesettings"></a> `updateSettings` | `readonly` | [`UpdateSettingsService`](services/update-settings.md#updatesettingsservice) | Service for managing system update settings (singleton). | [services/update-settings/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/update-settings/index.ts#L22) |
| <a id="property-updatesourcepackages"></a> `updateSourcePackages` | `readonly` | [`UpdateSourcePackageService`](services/update-source-package.md#updatesourcepackageservice) | Service for querying update source packages (read-only). | [services/update-source-package/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/update-source-package/index.ts#L22) |
| <a id="property-updatesources"></a> `updateSources` | `readonly` | [`UpdateSourceService`](services/update-source.md#updatesourceservice) | Service for managing update sources. | [services/update-source/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/update-source/index.ts#L22) |
| <a id="property-users"></a> `users` | `readonly` | [`UserService`](services/user.md#userservice) | Service for managing users. | [services/user/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/user/index.ts#L22) |
| <a id="property-vmrecipeinstances"></a> `vmRecipeInstances` | `readonly` | [`VMRecipeInstanceService`](services/vm-recipe-instance.md#vmrecipeinstanceservice) | Service for managing VM recipe instances. | [services/vm-recipe-instance/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm-recipe-instance/index.ts#L22) |
| <a id="property-vmrecipes"></a> `vmRecipes` | `readonly` | [`VMRecipeService`](services/vm-recipe.md#vmrecipeservice) | Service for managing VM recipes. | [services/vm-recipe/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm-recipe/index.ts#L22) |
| <a id="property-vms"></a> `vms` | `readonly` | [`VMService`](services/vm.md#vmservice) | Service for managing virtual machines. | [services/vm/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/index.ts#L22) |
| <a id="property-vnetmonitorstatshistorylong"></a> `vnetMonitorStatsHistoryLong` | `readonly` | [`VnetMonitorStatsHistoryLongService`](services/vnet-monitor-stats-history-long.md#vnetmonitorstatshistorylongservice) | Service for querying long-term vnet monitor statistics (read-only). | [services/vnet-monitor-stats-history-long/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vnet-monitor-stats-history-long/index.ts#L22) |
| <a id="property-vnetmonitorstatshistoryshort"></a> `vnetMonitorStatsHistoryShort` | `readonly` | [`VnetMonitorStatsHistoryShortService`](services/vnet-monitor-stats-history-short.md#vnetmonitorstatshistoryshortservice) | Service for querying short-term vnet monitor statistics (read-only). | [services/vnet-monitor-stats-history-short/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vnet-monitor-stats-history-short/index.ts#L22) |
| <a id="property-volumebrowser"></a> `volumeBrowser` | `readonly` | [`VolumeBrowserService`](services/volume-browser.md#volumebrowserservice) | Service for browsing and manipulating files within volumes. | [services/volume-browser/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/volume-browser/index.ts#L22) |
| <a id="property-volumecifsshares"></a> `volumeCifsShares` | `readonly` | [`VolumeCIFSShareService`](services/volume-cifs-share.md#volumecifsshareservice) | Service for managing CIFS shares. | [services/volume-cifs-share/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/volume-cifs-share/index.ts#L22) |
| <a id="property-volumenfsshares"></a> `volumeNfsShares` | `readonly` | [`VolumeNFSShareService`](services/volume-nfs-share.md#volumenfsshareservice) | Service for managing NFS shares. | [services/volume-nfs-share/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/volume-nfs-share/index.ts#L22) |
| <a id="property-volumesnapshots"></a> `volumeSnapshots` | `readonly` | [`VolumeSnapshotService`](services/volume-snapshot.md#volumesnapshotservice) | Service for managing volume snapshots. | [services/volume-snapshot/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/volume-snapshot/index.ts#L22) |
| <a id="property-volumesyncs"></a> `volumeSyncs` | `readonly` | [`VolumeSyncService`](services/volume-sync.md#volumesyncservice) | Service for managing volume syncs. | [services/volume-sync/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/volume-sync/index.ts#L22) |
| <a id="property-volumes"></a> `volumes` | `readonly` | [`VolumeService`](services/volume.md#volumeservice) | Service for managing volumes. | [services/volume/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/volume/index.ts#L22) |
| <a id="property-webhookurls"></a> `webhookUrls` | `readonly` | [`WebhookURLService`](services/webhook-url.md#webhookurlservice) | Service for managing webhook URL destinations. | [services/webhook-url/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/webhook-url/index.ts#L22) |
| <a id="property-webhooks"></a> `webhooks` | `readonly` | [`WebhookService`](services/webhook.md#webhookservice) | Service for querying webhook delivery logs. | [services/webhook/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/webhook/index.ts#L22) |
| <a id="property-wireguardpeerstatus"></a> `wireguardPeerStatus` | `readonly` | [`WireGuardPeerStatusService`](services/wireguard-peer-status.md#wireguardpeerstatusservice) | Service for querying WireGuard peer connection status (read-only). | [services/wireguard-peer-status/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/wireguard-peer-status/index.ts#L22) |
| <a id="property-wireguardpeers"></a> `wireguardPeers` | `readonly` | [`WireGuardPeerService`](services/wireguard-peer.md#wireguardpeerservice) | Service for managing WireGuard VPN peers. | [services/wireguard-peer/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/wireguard-peer/index.ts#L22) |
| <a id="property-wireguard"></a> `wireguard` | `readonly` | [`WireGuardService`](services/wireguard.md#wireguardservice) | Service for managing WireGuard VPN interfaces on virtual networks. | [services/wireguard/index.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/wireguard/index.ts#L22) |

#### Accessors

##### host

###### Get Signature

> **get** **host**(): `string`

Defined in: [client.ts:105](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/client.ts#L105)

The base URL of the connected VergeOS server.

###### Returns

`string`

##### serverVersion

###### Get Signature

> **get** **serverVersion**(): `string` \| `undefined`

Defined in: [client.ts:113](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/client.ts#L113)

The server version string (e.g., `"26.1.0"`), or `undefined` if
the client was created without a version check.

###### Returns

`string` \| `undefined`

#### Methods

##### registerService()

> `static` **registerService**(`name`, `ctor`): `void`

Defined in: [client.ts:136](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/client.ts#L136)

Register a service constructor to be lazily instantiated on property access.

Called as a side effect in each service's `index.ts`:
```typescript
VergeClient.registerService('vms', VMService);
```

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The property name on `VergeClient` (e.g., `'vms'`) |
| `ctor` | `ServiceConstructor` | The service class constructor |

###### Returns

`void`

##### connect()

> `static` **connect**(`config`): `Promise`\<[`VergeClient`](#vergeclient)\>

Defined in: [client.ts:150](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/client.ts#L150)

Create a connected client with server version validation.

This is the recommended way to create a `VergeClient` for production use.
Fetches `/version.json` from the server and validates compatibility.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`ClientConfig`](types.md#clientconfig) | Connection and authentication configuration |

###### Returns

`Promise`\<[`VergeClient`](#vergeclient)\>

A connected `VergeClient` with `serverVersion` populated

###### Throws

[UnsupportedVersionError](#unsupportedversionerror) if the server version is incompatible

##### fromEnv()

> `static` **fromEnv**(): [`VergeClient`](#vergeclient)

Defined in: [client.ts:170](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/client.ts#L170)

Create a client from environment variables without a version check.

Reads the following env vars (prefix: `VERGEOS_`):
- `VERGEOS_HOST` — server hostname or URL (required)
- `VERGEOS_API_KEY` — API key for bearer auth
- `VERGEOS_USERNAME` — username for basic auth
- `VERGEOS_PASSWORD` — password for basic auth
- `VERGEOS_VERIFY_SSL` — set to `"false"` to disable TLS verification
- `VERGEOS_TIMEOUT` — timeout in seconds (converted to milliseconds)

###### Returns

[`VergeClient`](#vergeclient)

A `VergeClient` configured from environment variables

###### Throws

[ValidationError](#validationerror) if required env vars are missing

##### connectFromEnv()

> `static` **connectFromEnv**(): `Promise`\<[`VergeClient`](#vergeclient)\>

Defined in: [client.ts:185](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/client.ts#L185)

Create a connected client from environment variables with version validation.

Combines [VergeClient.fromEnv](#fromenv) and [VergeClient.connect](#connect) —
reads env vars and validates the server version.

###### Returns

`Promise`\<[`VergeClient`](#vergeclient)\>

A connected `VergeClient` with `serverVersion` populated

###### Throws

[ValidationError](#validationerror) if required env vars are missing

###### Throws

[UnsupportedVersionError](#unsupportedversionerror) if the server version is incompatible

***

### CrossSiteReadProxy

Defined in: [cross-site.ts:97](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/cross-site.ts#L97)

Read-only fan-out proxy that queries multiple sites in parallel.

Exposes only `list()` for every registered service — no `get()`, no mutations.
Uses `Promise.allSettled` so partial failures don't block results from healthy sites.

Not instantiated directly — obtain via [SiteManager.all](#all) or [SiteManager.tagged](#tagged).

#### Example

```typescript
const result = await manager.all.vms.list({ filter: "status eq 'running'" });
for (const item of result.data) {
  console.log(`${item.site}: ${item.resource.name}`);
}
for (const err of result.errors) {
  console.error(`${err.site}: ${err.message}`);
}
```

***

### VergeError

Defined in: [errors.ts:6](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L6)

Base error class for all tsvergeos SDK errors.
All SDK-specific errors extend this class, enabling catch blocks
to distinguish SDK errors from other runtime errors.

#### Extends

- `Error`

#### Extended by

- [`ApiError`](#apierror)
- [`AuthError`](#autherror)
- [`NotFoundError`](#notfounderror)
- [`SiteError`](#siteerror)
- [`TaskError`](#taskerror)
- [`UnsupportedVersionError`](#unsupportedversionerror)
- [`ValidationError`](#validationerror)

#### Constructors

##### Constructor

> **new VergeError**(`message`): [`VergeError`](#vergeerror)

Defined in: [errors.ts:7](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L7)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

###### Returns

[`VergeError`](#vergeerror)

###### Overrides

`Error.constructor`

***

### ApiError

Defined in: [errors.ts:18](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L18)

Error thrown when the VergeOS API returns an HTTP error response.
Contains the HTTP status code and the endpoint that was called.

#### Extends

- [`VergeError`](#vergeerror)

#### Extended by

- [`ConflictError`](#conflicterror)

#### Constructors

##### Constructor

> **new ApiError**(`statusCode`, `endpoint`, `message`): [`ApiError`](#apierror)

Defined in: [errors.ts:25](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L25)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `statusCode` | `number` |
| `endpoint` | `string` |
| `message` | `string` |

###### Returns

[`ApiError`](#apierror)

###### Overrides

[`VergeError`](#vergeerror).[`constructor`](#constructor-1)

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-statuscode"></a> `statusCode` | `readonly` | `number` | HTTP status code from the API response. | [errors.ts:20](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L20) |
| <a id="property-endpoint"></a> `endpoint` | `readonly` | `string` | API endpoint that returned the error. | [errors.ts:23](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L23) |

***

### ConflictError

Defined in: [errors.ts:38](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L38)

Error thrown when the API returns a 409 Conflict response.
Extends [ApiError](#apierror) with statusCode always set to 409.

#### Extends

- [`ApiError`](#apierror)

#### Constructors

##### Constructor

> **new ConflictError**(`endpoint`, `message`): [`ConflictError`](#conflicterror)

Defined in: [errors.ts:39](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L39)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `endpoint` | `string` |
| `message` | `string` |

###### Returns

[`ConflictError`](#conflicterror)

###### Overrides

[`ApiError`](#apierror).[`constructor`](#constructor-2)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-statuscode-1"></a> `statusCode` | `readonly` | `number` | HTTP status code from the API response. | [`ApiError`](#apierror).[`statusCode`](#property-statuscode) | [errors.ts:20](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L20) |
| <a id="property-endpoint-1"></a> `endpoint` | `readonly` | `string` | API endpoint that returned the error. | [`ApiError`](#apierror).[`endpoint`](#property-endpoint) | [errors.ts:23](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L23) |

***

### AuthError

Defined in: [errors.ts:49](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L49)

Error thrown when authentication fails (invalid credentials or insufficient permissions).

#### Extends

- [`VergeError`](#vergeerror)

#### Constructors

##### Constructor

> **new AuthError**(`message`): [`AuthError`](#autherror)

Defined in: [errors.ts:50](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L50)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

###### Returns

[`AuthError`](#autherror)

###### Overrides

[`VergeError`](#vergeerror).[`constructor`](#constructor-1)

***

### NotFoundError

Defined in: [errors.ts:60](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L60)

Error thrown when a requested resource is not found.

#### Extends

- [`VergeError`](#vergeerror)

#### Constructors

##### Constructor

> **new NotFoundError**(`resource`, `id`, `message?`): [`NotFoundError`](#notfounderror)

Defined in: [errors.ts:67](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L67)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `resource` | `string` |
| `id` | `string` \| `number` |
| `message?` | `string` |

###### Returns

[`NotFoundError`](#notfounderror)

###### Overrides

[`VergeError`](#vergeerror).[`constructor`](#constructor-1)

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource-1"></a> `resource` | `readonly` | `string` | The type of resource that was not found (e.g., "vms", "networks"). | [errors.ts:62](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L62) |
| <a id="property-id"></a> `id` | `readonly` | `string` \| `number` | The ID of the resource that was not found. | [errors.ts:65](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L65) |

***

### ValidationError

Defined in: [errors.ts:79](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L79)

Error thrown when input validation fails.

#### Extends

- [`VergeError`](#vergeerror)

#### Constructors

##### Constructor

> **new ValidationError**(`message`, `field?`): [`ValidationError`](#validationerror)

Defined in: [errors.ts:83](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L83)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `field?` | `string` |

###### Returns

[`ValidationError`](#validationerror)

###### Overrides

[`VergeError`](#vergeerror).[`constructor`](#constructor-1)

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-field"></a> `field?` | `readonly` | `string` | The field that failed validation, if applicable. | [errors.ts:81](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L81) |

***

### TaskError

Defined in: [errors.ts:94](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L94)

Error thrown when a VergeOS task fails.

#### Extends

- [`VergeError`](#vergeerror)

#### Extended by

- [`TaskTimeoutError`](#tasktimeouterror)

#### Constructors

##### Constructor

> **new TaskError**(`taskId`, `message`): [`TaskError`](#taskerror)

Defined in: [errors.ts:98](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L98)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `taskId` | `string` \| `number` |
| `message` | `string` |

###### Returns

[`TaskError`](#taskerror)

###### Overrides

[`VergeError`](#vergeerror).[`constructor`](#constructor-1)

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-taskid"></a> `taskId` | `readonly` | `string` \| `number` | The ID of the task that failed. | [errors.ts:96](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L96) |

***

### TaskTimeoutError

Defined in: [errors.ts:110](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L110)

Error thrown when a task exceeds its timeout waiting for completion.
Extends [TaskError](#taskerror) with the timeout duration that was exceeded.

#### Extends

- [`TaskError`](#taskerror)

#### Constructors

##### Constructor

> **new TaskTimeoutError**(`taskId`, `timeout`, `message?`): [`TaskTimeoutError`](#tasktimeouterror)

Defined in: [errors.ts:114](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L114)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `taskId` | `string` \| `number` |
| `timeout` | `number` |
| `message?` | `string` |

###### Returns

[`TaskTimeoutError`](#tasktimeouterror)

###### Overrides

[`TaskError`](#taskerror).[`constructor`](#constructor-7)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-taskid-1"></a> `taskId` | `readonly` | `string` \| `number` | The ID of the task that failed. | [`TaskError`](#taskerror).[`taskId`](#property-taskid) | [errors.ts:96](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L96) |
| <a id="property-timeout"></a> `timeout` | `readonly` | `number` | The timeout duration in milliseconds that was exceeded. | - | [errors.ts:112](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L112) |

***

### UnsupportedVersionError

Defined in: [errors.ts:125](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L125)

Error thrown when the VergeOS server version is below the required minimum.

#### Extends

- [`VergeError`](#vergeerror)

#### Constructors

##### Constructor

> **new UnsupportedVersionError**(`serverVersion`, `required`): [`UnsupportedVersionError`](#unsupportedversionerror)

Defined in: [errors.ts:132](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L132)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `serverVersion` | `string` |
| `required` | `string` |

###### Returns

[`UnsupportedVersionError`](#unsupportedversionerror)

###### Overrides

[`VergeError`](#vergeerror).[`constructor`](#constructor-1)

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-serverversion"></a> `serverVersion` | `readonly` | `string` | The server version that was detected. | [errors.ts:127](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L127) |
| <a id="property-required"></a> `required` | `readonly` | `string` | The minimum required version. | [errors.ts:130](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L130) |

***

### SiteError

Defined in: [errors.ts:145](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L145)

Error thrown when an operation on a specific site fails in a multi-site context.
Wraps the original error using the standard ES2022 `Error.cause` property.

#### Extends

- [`VergeError`](#vergeerror)

#### Constructors

##### Constructor

> **new SiteError**(`site`, `message`, `cause?`): [`SiteError`](#siteerror)

Defined in: [errors.ts:149](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L149)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `site` | `string` |
| `message` | `string` |
| `cause?` | `Error` |

###### Returns

[`SiteError`](#siteerror)

###### Overrides

[`VergeError`](#vergeerror).[`constructor`](#constructor-1)

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-site-1"></a> `site` | `readonly` | `string` | The name of the site where the error occurred. | [errors.ts:147](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L147) |

***

### Filter

Defined in: [filter.ts:81](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L81)

Fluent filter expression builder for VergeOS API queries.

Conditions are implicitly joined with `and`. Use `.or()` for explicit `or` conjunction.

#### Example

```typescript
const filter = new Filter()
  .eq('status', 'running')
  .gt('cpu_cores', 2)
  .build();
// → "status eq 'running' and cpu_cores gt 2"
```

#### Constructors

##### Constructor

> **new Filter**(): [`Filter`](#filter)

###### Returns

[`Filter`](#filter)

#### Methods

##### eq()

> **eq**(`field`, `value`): `this`

Defined in: [filter.ts:107](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L107)

Add an equals condition: `field eq value`.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `string` |
| `value` | [`FilterValue`](#filtervalue) |

###### Returns

`this`

##### ne()

> **ne**(`field`, `value`): `this`

Defined in: [filter.ts:113](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L113)

Add a not-equals condition: `field ne value`.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `string` |
| `value` | [`FilterValue`](#filtervalue) |

###### Returns

`this`

##### gt()

> **gt**(`field`, `value`): `this`

Defined in: [filter.ts:119](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L119)

Add a greater-than condition: `field gt value`.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `string` |
| `value` | [`FilterValue`](#filtervalue) |

###### Returns

`this`

##### ge()

> **ge**(`field`, `value`): `this`

Defined in: [filter.ts:125](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L125)

Add a greater-than-or-equal condition: `field ge value`.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `string` |
| `value` | [`FilterValue`](#filtervalue) |

###### Returns

`this`

##### lt()

> **lt**(`field`, `value`): `this`

Defined in: [filter.ts:131](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L131)

Add a less-than condition: `field lt value`.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `string` |
| `value` | [`FilterValue`](#filtervalue) |

###### Returns

`this`

##### le()

> **le**(`field`, `value`): `this`

Defined in: [filter.ts:137](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L137)

Add a less-than-or-equal condition: `field le value`.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `string` |
| `value` | [`FilterValue`](#filtervalue) |

###### Returns

`this`

##### like()

> **like**(`field`, `pattern`): `this`

Defined in: [filter.ts:149](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L149)

Add a LIKE pattern condition: `field like 'pattern'`.

User-friendly wildcards are converted automatically:
- `*` → `%` (match any characters)
- `?` → `_` (match single character)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `string` |
| `pattern` | `string` |

###### Returns

`this`

##### in()

> **in**(`field`, `values`): `this`

Defined in: [filter.ts:162](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L162)

Add an IN condition: `field in ('val1', 'val2', ...)`.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | `string` | The field name |
| `values` | [`FilterValue`](#filtervalue)[] | Array of values to match against |

###### Returns

`this`

##### or()

> **or**(): `this`

Defined in: [filter.ts:179](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L179)

Add an explicit `or` conjunction.

By default, conditions are joined with `and`. Use this to switch to `or`.

###### Returns

`this`

###### Example

```typescript
new Filter().eq('status', 'running').or().eq('status', 'stopped').build()
// → "status eq 'running' or status eq 'stopped'"
```

##### build()

> **build**(): `string`

Defined in: [filter.ts:189](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L189)

Build the filter expression string.

###### Returns

`string`

The complete filter string, or empty string if no conditions were added.

***

### HttpClient

Defined in: [http.ts:84](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/http.ts#L84)

Low-level HTTP transport for the VergeOS API.

Handles URL construction, authentication headers, JSON serialization,
retry with exponential backoff, timeout via `AbortSignal`, and
error mapping to the SDK's typed error hierarchy.

#### Constructors

##### Constructor

> **new HttpClient**(`config`): [`HttpClient`](#httpclient)

Defined in: [http.ts:114](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/http.ts#L114)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`ClientConfig`](types.md#clientconfig) |

###### Returns

[`HttpClient`](#httpclient)

#### Accessors

##### host

###### Get Signature

> **get** **host**(): `string`

Defined in: [http.ts:97](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/http.ts#L97)

The base URL of the connected server (e.g., `https://my-vergeos.example.com`).
Excludes the API path prefix.

###### Returns

`string`

#### Methods

##### get()

> **get**\<`T`\>(`path`, `options?`): `Promise`\<`T`\>

Defined in: [http.ts:141](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/http.ts#L141)

Perform a GET request to an API endpoint.

###### Type Parameters

| Type Parameter |
| ------ |
| `T` |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | API path relative to `/api/v4/` (e.g., `/vms`) |
| `options?` | `RequestOptions` | Optional query params and abort signal |

###### Returns

`Promise`\<`T`\>

Parsed JSON response body typed as `T`

##### post()

> **post**\<`T`\>(`path`, `options?`): `Promise`\<`T`\>

Defined in: [http.ts:152](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/http.ts#L152)

Perform a POST request to an API endpoint.

###### Type Parameters

| Type Parameter |
| ------ |
| `T` |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | API path relative to `/api/v4/` |
| `options?` | `RequestOptions` | Request body, query params, and abort signal |

###### Returns

`Promise`\<`T`\>

Parsed JSON response body typed as `T`

##### put()

> **put**\<`T`\>(`path`, `options?`): `Promise`\<`T`\>

Defined in: [http.ts:163](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/http.ts#L163)

Perform a PUT request to an API endpoint.

###### Type Parameters

| Type Parameter |
| ------ |
| `T` |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | API path relative to `/api/v4/` |
| `options?` | `RequestOptions` | Request body, query params, and abort signal |

###### Returns

`Promise`\<`T`\>

Parsed JSON response body typed as `T`

##### del()

> **del**(`path`, `options?`): `Promise`\<`void`\>

Defined in: [http.ts:173](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/http.ts#L173)

Perform a DELETE request to an API endpoint.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | API path relative to `/api/v4/` |
| `options?` | `RequestOptions` | Optional abort signal |

###### Returns

`Promise`\<`void`\>

##### getAbsolute()

> **getAbsolute**\<`T`\>(`path`, `options?`): `Promise`\<`T`\>

Defined in: [http.ts:185](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/http.ts#L185)

Perform a GET request to an absolute path (not prefixed with `/api/v4/`).
Used for endpoints like `/version.json` that live outside the API base path.

###### Type Parameters

| Type Parameter |
| ------ |
| `T` |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Absolute path on the server (e.g., `/version.json`) |
| `options?` | `RequestOptions` | Optional abort signal |

###### Returns

`Promise`\<`T`\>

Parsed JSON response body typed as `T`

##### putRaw()

> **putRaw**(`path`, `body`, `contentType`, `queryParams?`): `Promise`\<`void`\>

Defined in: [http.ts:200](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/http.ts#L200)

Perform a raw PUT request with a non-JSON body (e.g., binary upload).

Unlike [put](#put), this method sends the body as-is without JSON serialization,
using the specified content type. Used for file upload chunks.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | API path relative to `/api/v4/` |
| `body` | `string` \| `ArrayBuffer` \| `Uint8Array`\<`ArrayBufferLike`\> | Raw request body (e.g., `Uint8Array`) |
| `contentType` | `string` | MIME type of the body (e.g., `'application/octet-stream'`) |
| `queryParams?` | `Record`\<`string`, `string`\> | Optional query string parameters as key-value pairs |

###### Returns

`Promise`\<`void`\>

##### getRaw()

> **getRaw**(`path`, `queryParams?`): `Promise`\<`Response`\>

Defined in: [http.ts:238](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/http.ts#L238)

Perform a raw GET request returning the full `Response` object.

Unlike [get](#get), this method does not parse JSON. The caller is
responsible for reading and closing the response body. Used for
file downloads.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | API path relative to `/api/v4/` |
| `queryParams?` | `Record`\<`string`, `string`\> | Optional query string parameters as key-value pairs |

###### Returns

`Promise`\<`Response`\>

The raw `Response` object

***

### ReadOnlyService

Defined in: [services/base.ts:118](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L118)

Read-only service base class providing list, get, and pagination operations.

Extend this class for resources that the SDK should only read — never create,
update, delete, or send actions to. Examples: logs, audit entries, stats.

#### Extended by

- [`WritableService`](#writableservice)
- [`AlarmTypeService`](services/alarm-type.md#alarmtypeservice)
- [`CloudSnapshotTenantService`](services/cloud-snapshot-tenant.md#cloudsnapshottenantservice)
- [`CloudSnapshotVMService`](services/cloud-snapshot-vm.md#cloudsnapshotvmservice)
- [`ClusterTierService`](services/cluster-tier.md#clustertierservice)
- [`ClusterTierStatsService`](services/cluster-tier-stats.md#clustertierstatsservice)
- [`ClusterTierStatusService`](services/cluster-tier-status.md#clustertierstatusservice)
- [`IPSecConnectionService`](services/ipsec-connection.md#ipsecconnectionservice)
- [`LogService`](services/log.md#logservice)
- [`MachineDrivePhysService`](services/machine-drive-phys.md#machinedrivephysservice)
- [`MachineDriveStatsService`](services/machine-drive-stats.md#machinedrivestatsservice)
- [`MachineLogService`](services/machine-log.md#machinelogservice)
- [`MachineNicStatsService`](services/machine-nic-stats.md#machinenicstatsservice)
- [`MachineNicStatsHistoryLongService`](services/machine-nic-stats-history-long.md#machinenicstatshistorylongservice)
- [`MachineNicStatsHistoryShortService`](services/machine-nic-stats-history-short.md#machinenicstatshistoryshortservice)
- [`MachineStatsService`](services/machine-stats.md#machinestatsservice)
- [`MachineStatsHistoryLongService`](services/machine-stats-history-long.md#machinestatshistorylongservice)
- [`MachineStatsHistoryShortService`](services/machine-stats-history-short.md#machinestatshistoryshortservice)
- [`MachineStatusService`](services/machine-status.md#machinestatusservice)
- [`StorageTierService`](services/storage-tier.md#storagetierservice)
- [`StorageTierStatsService`](services/storage-tier-stats.md#storagetierstatsservice)
- [`UpdateBranchService`](services/update-branch.md#updatebranchservice)
- [`UpdateSourcePackageService`](services/update-source-package.md#updatesourcepackageservice)
- [`VnetMonitorStatsHistoryLongService`](services/vnet-monitor-stats-history-long.md#vnetmonitorstatshistorylongservice)
- [`VnetMonitorStatsHistoryShortService`](services/vnet-monitor-stats-history-short.md#vnetmonitorstatshistoryshortservice)
- [`WebhookService`](services/webhook.md#webhookservice)
- [`WireGuardPeerStatusService`](services/wireguard-peer-status.md#wireguardpeerstatusservice)

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`Resource`](types.md#resource) | The resource type returned by the API (must extend [Resource](types.md#resource)) |

#### Constructors

##### Constructor

> **new ReadOnlyService**\<`T`\>(`http`, `resource`, `displayName`): [`ReadOnlyService`](#readonlyservice)\<`T`\>

Defined in: [services/base.ts:145](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L145)

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `http` | [`HttpClient`](#httpclient) | The HTTP client for making API requests |
| `resource` | `string` | The API resource path (e.g., `'/vms'`) |
| `displayName` | `string` | Human-readable name for error messages (e.g., `'VM'`) |

###### Returns

[`ReadOnlyService`](#readonlyservice)\<`T`\>

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource-2"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L138) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<`T`[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<`T`[]\>

Array of matching resources

##### get()

> **get**(`key`): `Promise`\<`T`\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<`T`\>

The matching resource

###### Throws

[NotFoundError](#notfounderror) if the resource does not exist

##### getByName()

> **getByName**(`name`): `Promise`\<`T`\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<`T`\>

The matching resource

###### Throws

[NotFoundError](#notfounderror) if no resource with that name exists

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<`T`\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<`T`\>

###### Yields

Individual resources across all pages

***

### WritableService

Defined in: [services/base.ts:254](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L254)

Writable service base class that adds update, delete, and action dispatch.

Extend this class for resources that can be modified but not created via the SDK.
For full CRUD, extend [BaseService](#baseservice) instead.

#### Extends

- [`ReadOnlyService`](#readonlyservice)\<`T`\>

#### Extended by

- [`BaseService`](#baseservice)
- [`AlarmService`](services/alarm.md#alarmservice)
- [`APIKeyService`](services/api-key.md#apikeyservice)
- [`CatalogService`](services/catalog.md#catalogservice)
- [`NodeService`](services/node.md#nodeservice)
- [`SettingsService`](services/settings.md#settingsservice)
- [`TenantRecipeService`](services/tenant-recipe.md#tenantrecipeservice)
- [`TenantSnapshotService`](services/tenant-snapshot.md#tenantsnapshotservice)
- [`VMRecipeService`](services/vm-recipe.md#vmrecipeservice)

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`Resource`](types.md#resource) | The resource type returned by the API |
| `U` | The update params type accepted by `update()` |

#### Constructors

##### Constructor

> **new WritableService**\<`T`, `U`\>(`http`, `resource`, `displayName`, `actionConfig?`): [`WritableService`](#writableservice)\<`T`, `U`\>

Defined in: [services/base.ts:264](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L264)

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `http` | [`HttpClient`](#httpclient) | The HTTP client for making API requests |
| `resource` | `string` | The API resource path (e.g., `'/vms'`) |
| `displayName` | `string` | Human-readable name for error messages (e.g., `'VM'`) |
| `actionConfig?` | [`ActionConfig`](#actionconfig) | Override the action endpoint and body key derivation |

###### Returns

[`WritableService`](#writableservice)\<`T`, `U`\>

###### Overrides

[`ReadOnlyService`](#readonlyservice).[`constructor`](#constructor-13)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource-3"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`ReadOnlyService`](#readonlyservice).[`resource`](#property-resource-2) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname-1"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`ReadOnlyService`](#readonlyservice).[`displayName`](#property-displayname) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields-1"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`ReadOnlyService`](#readonlyservice).[`defaultFields`](#property-defaultfields) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L138) |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](#actionconfig) | Derived or overridden action endpoint configuration. | - | [services/base.ts:256](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L256) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<`T`[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<`T`[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](#readonlyservice).[`list`](#list)

##### get()

> **get**(`key`): `Promise`\<`T`\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<`T`\>

The matching resource

###### Throws

[NotFoundError](#notfounderror) if the resource does not exist

###### Inherited from

[`ReadOnlyService`](#readonlyservice).[`get`](#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<`T`\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<`T`\>

The matching resource

###### Throws

[NotFoundError](#notfounderror) if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](#readonlyservice).[`getByName`](#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<`T`\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<`T`\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](#readonlyservice).[`listAll`](#listall)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<`T`\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](types.md#flexkey) | The resource ID to update |
| `params` | `U` | The fields to update |
| `options?` | [`MutationOptions`](types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<`T`\>

The updated resource (or the resource with just `$key` if `readBack` is false)

##### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [services/base.ts:309](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L309)

Delete a resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](types.md#flexkey) | The resource ID to delete |

###### Returns

`Promise`\<`void`\>

###### Throws

[NotFoundError](#notfounderror) if the resource does not exist

##### inlineAction()

> `protected` **inlineAction**(`key`, `action`, `params?`): `Promise`\<`void`\>

Defined in: [services/base.ts:330](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L330)

Execute an inline action on a specific resource.

Sends a POST to `/{resource}/{key}/{action}` with optional body params.
Used for record-level actions (e.g., `POST /users/3/enable`).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](types.md#flexkey) | The resource ID to act on |
| `action` | `string` | The action name (e.g., `'enable'`, `'disable'`) |
| `params?` | `Record`\<`string`, `unknown`\> | Optional action parameters |

###### Returns

`Promise`\<`void`\>

##### dispatchAction()

> `protected` **dispatchAction**(`action`, `key`, `params?`): `Promise`\<`void`\>

Defined in: [services/base.ts:356](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L356)

Dispatch an action to the dedicated `_actions` endpoint.

Sends a POST to `/{actionEndpoint}` with the body:
```json
{ "[actionKey]": key, "action": actionName, "params": { ... } }
```

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `action` | `string` | The action name (e.g., `'poweron'`, `'poweroff'`) |
| `key` | [`FlexKey`](types.md#flexkey) | The resource ID to act on |
| `params?` | `Record`\<`string`, `unknown`\> | Optional action parameters |

###### Returns

`Promise`\<`void`\>

***

### BaseService

Defined in: [services/base.ts:384](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L384)

Full CRUD service base class that adds resource creation.

This is the most commonly extended base class. Use it for any resource
that supports create, read, update, delete, and actions.

#### Extends

- [`WritableService`](#writableservice)\<`T`, `U`\>

#### Extended by

- [`CatalogRepositoryService`](services/catalog-repository.md#catalogrepositoryservice)
- [`CertificateService`](services/certificate.md#certificateservice)
- [`CloudInitFileService`](services/cloud-init.md#cloudinitfileservice)
- [`CloudSnapshotService`](services/cloud-snapshot.md#cloudsnapshotservice)
- [`ClusterService`](services/cluster.md#clusterservice)
- [`FileService`](services/file.md#fileservice)
- [`GroupService`](services/group.md#groupservice)
- [`IPSecService`](services/ipsec.md#ipsecservice)
- [`IPSecPhase1Service`](services/ipsec-phase1.md#ipsecphase1service)
- [`IPSecPhase2Service`](services/ipsec-phase2.md#ipsecphase2service)
- [`MachineDeviceService`](services/machine-device.md#machinedeviceservice)
- [`MachineDriveService`](services/machine-drive.md#machinedriveservice)
- [`MachineNicService`](services/machine-nic.md#machinenicservice)
- [`MachineSnapshotService`](services/machine-snapshot.md#machinesnapshotservice)
- [`MemberService`](services/member.md#memberservice)
- [`NASServiceService`](services/nas-service.md#nasserviceservice)
- [`NASServiceUserService`](services/nas-service-user.md#nasserviceuserservice)
- [`NetworkService`](services/network.md#networkservice)
- [`NetworkAddressService`](services/network-address.md#networkaddressservice)
- [`NetworkDnsRecordService`](services/network-dns-record.md#networkdnsrecordservice)
- [`NetworkDnsViewService`](services/network-dns-view.md#networkdnsviewservice)
- [`NetworkDnsZoneService`](services/network-dns-zone.md#networkdnszoneservice)
- [`NetworkHostService`](services/network-host.md#networkhostservice)
- [`NetworkRuleService`](services/network-rule.md#networkruleservice)
- [`NetworkRuleAliasService`](services/network-rule-alias.md#networkrulealiasservice)
- [`PermissionService`](services/permission.md#permissionservice)
- [`ResourceGroupService`](services/resource-group.md#resourcegroupservice)
- [`SiteService`](services/site.md#siteservice)
- [`SiteSyncIncomingService`](services/site-sync-incoming.md#sitesyncincomingservice)
- [`SiteSyncOutgoingService`](services/site-sync-outgoing.md#sitesyncoutgoingservice)
- [`SiteSyncProfilePeriodService`](services/site-sync-profile-period.md#sitesyncprofileperiodservice)
- [`SnapshotProfileService`](services/snapshot-profile.md#snapshotprofileservice)
- [`SnapshotProfilePeriodService`](services/snapshot-profile-period.md#snapshotprofileperiodservice)
- [`TagService`](services/tag.md#tagservice)
- [`TagCategoryService`](services/tag-category.md#tagcategoryservice)
- [`TagMemberService`](services/tag-member.md#tagmemberservice)
- [`TaskService`](services/task.md#taskservice)
- [`TenantService`](services/tenant.md#tenantservice)
- [`TenantLayer2Service`](services/tenant-layer2.md#tenantlayer2service)
- [`TenantNodeService`](services/tenant-node.md#tenantnodeservice)
- [`TenantRecipeInstanceService`](services/tenant-recipe-instance.md#tenantrecipeinstanceservice)
- [`TenantStorageService`](services/tenant-storage.md#tenantstorageservice)
- [`UpdateSourceService`](services/update-source.md#updatesourceservice)
- [`UserService`](services/user.md#userservice)
- [`VMService`](services/vm.md#vmservice)
- [`VMRecipeInstanceService`](services/vm-recipe-instance.md#vmrecipeinstanceservice)
- [`VolumeService`](services/volume.md#volumeservice)
- [`VolumeCIFSShareService`](services/volume-cifs-share.md#volumecifsshareservice)
- [`VolumeNFSShareService`](services/volume-nfs-share.md#volumenfsshareservice)
- [`VolumeSnapshotService`](services/volume-snapshot.md#volumesnapshotservice)
- [`VolumeSyncService`](services/volume-sync.md#volumesyncservice)
- [`WebhookURLService`](services/webhook-url.md#webhookurlservice)
- [`WireGuardService`](services/wireguard.md#wireguardservice)
- [`WireGuardPeerService`](services/wireguard-peer.md#wireguardpeerservice)

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`Resource`](types.md#resource) | The resource type returned by the API |
| `C` | The create params type accepted by `create()` |
| `U` | The update params type accepted by `update()` |

#### Constructors

##### Constructor

> **new BaseService**\<`T`, `C`, `U`\>(`http`, `resource`, `displayName`, `actionConfig?`): [`BaseService`](#baseservice)\<`T`, `C`, `U`\>

Defined in: [services/base.ts:264](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L264)

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `http` | [`HttpClient`](#httpclient) | The HTTP client for making API requests |
| `resource` | `string` | The API resource path (e.g., `'/vms'`) |
| `displayName` | `string` | Human-readable name for error messages (e.g., `'VM'`) |
| `actionConfig?` | [`ActionConfig`](#actionconfig) | Override the action endpoint and body key derivation |

###### Returns

[`BaseService`](#baseservice)\<`T`, `C`, `U`\>

###### Inherited from

[`WritableService`](#writableservice).[`constructor`](#constructor-14)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource-4"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`WritableService`](#writableservice).[`resource`](#property-resource-3) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname-2"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`WritableService`](#writableservice).[`displayName`](#property-displayname-1) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields-2"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`WritableService`](#writableservice).[`defaultFields`](#property-defaultfields-1) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L138) |
| <a id="property-actionconfig-1"></a> `actionConfig` | `readonly` | [`ActionConfig`](#actionconfig) | Derived or overridden action endpoint configuration. | [`WritableService`](#writableservice).[`actionConfig`](#property-actionconfig) | [services/base.ts:256](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L256) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<`T`[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<`T`[]\>

Array of matching resources

###### Inherited from

[`WritableService`](#writableservice).[`list`](#list-1)

##### get()

> **get**(`key`): `Promise`\<`T`\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<`T`\>

The matching resource

###### Throws

[NotFoundError](#notfounderror) if the resource does not exist

###### Inherited from

[`WritableService`](#writableservice).[`get`](#get-2)

##### getByName()

> **getByName**(`name`): `Promise`\<`T`\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<`T`\>

The matching resource

###### Throws

[NotFoundError](#notfounderror) if no resource with that name exists

###### Inherited from

[`WritableService`](#writableservice).[`getByName`](#getbyname-1)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<`T`\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<`T`\>

###### Yields

Individual resources across all pages

###### Inherited from

[`WritableService`](#writableservice).[`listAll`](#listall-1)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<`T`\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](types.md#flexkey) | The resource ID to update |
| `params` | `U` | The fields to update |
| `options?` | [`MutationOptions`](types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<`T`\>

The updated resource (or the resource with just `$key` if `readBack` is false)

###### Inherited from

[`WritableService`](#writableservice).[`update`](#update)

##### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [services/base.ts:309](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L309)

Delete a resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](types.md#flexkey) | The resource ID to delete |

###### Returns

`Promise`\<`void`\>

###### Throws

[NotFoundError](#notfounderror) if the resource does not exist

###### Inherited from

[`WritableService`](#writableservice).[`delete`](#delete)

##### inlineAction()

> `protected` **inlineAction**(`key`, `action`, `params?`): `Promise`\<`void`\>

Defined in: [services/base.ts:330](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L330)

Execute an inline action on a specific resource.

Sends a POST to `/{resource}/{key}/{action}` with optional body params.
Used for record-level actions (e.g., `POST /users/3/enable`).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](types.md#flexkey) | The resource ID to act on |
| `action` | `string` | The action name (e.g., `'enable'`, `'disable'`) |
| `params?` | `Record`\<`string`, `unknown`\> | Optional action parameters |

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`WritableService`](#writableservice).[`inlineAction`](#inlineaction)

##### dispatchAction()

> `protected` **dispatchAction**(`action`, `key`, `params?`): `Promise`\<`void`\>

Defined in: [services/base.ts:356](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L356)

Dispatch an action to the dedicated `_actions` endpoint.

Sends a POST to `/{actionEndpoint}` with the body:
```json
{ "[actionKey]": key, "action": actionName, "params": { ... } }
```

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `action` | `string` | The action name (e.g., `'poweron'`, `'poweroff'`) |
| `key` | [`FlexKey`](types.md#flexkey) | The resource ID to act on |
| `params?` | `Record`\<`string`, `unknown`\> | Optional action parameters |

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`WritableService`](#writableservice).[`dispatchAction`](#dispatchaction)

##### create()

> **create**(`params`, `options?`): `Promise`\<`T`\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | `C` | The resource creation parameters |
| `options?` | [`MutationOptions`](types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<`T`\>

The created resource (or a partial with just `$key` if `readBack` is false)

***

### SiteManager

Defined in: [site-manager.ts:67](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L67)

Multi-site orchestration layer that manages named [VergeClient](#vergeclient) instances.

Provides site-level access, tagging, and passive health status tracking.
Sites can be added either by providing a [SiteConfig](#siteconfig) (async, performs
version check) or a pre-built [VergeClient](#vergeclient) (sync).

#### Example

```typescript
const manager = new SiteManager();

// Async: connect and register
await manager.addSite({ name: 'dc-east', host: '10.0.0.1', apiKey: '...' });

// Sync: register a pre-built client
const client = new VergeClient({ host: '10.0.0.2', apiKey: '...' });
manager.addSite('dc-west', client);

// Access by name
const vms = await manager.site('dc-east').vms.list();
```

#### Constructors

##### Constructor

> **new SiteManager**(`options?`): [`SiteManager`](#sitemanager)

Defined in: [site-manager.ts:83](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L83)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | [`SiteManagerOptions`](#sitemanageroptions) |

###### Returns

[`SiteManager`](#sitemanager)

#### Accessors

##### timeout

###### Get Signature

> **get** **timeout**(): `number` \| `undefined`

Defined in: [site-manager.ts:90](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L90)

The default timeout in milliseconds for fan-out operations, if configured.

###### Returns

`number` \| `undefined`

##### all

###### Get Signature

> **get** **all**(): [`CrossSiteReadProxy`](#crosssitereadproxy) & [`CrossSiteServices`](#crosssiteservices)

Defined in: [site-manager.ts:212](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L212)

Get a [CrossSiteReadProxy](#crosssitereadproxy) that fans out read queries across all registered sites.

Only exposes `list()` for each service — mutations must go through a named site.

###### Example

```typescript
const result = await manager.all.vms.list();
for (const item of result.data) {
  console.log(`${item.site}: ${item.resource.name}`);
}
```

###### Returns

[`CrossSiteReadProxy`](#crosssitereadproxy) & [`CrossSiteServices`](#crosssiteservices)

#### Methods

##### removeSite()

> **removeSite**(`name`): `void`

Defined in: [site-manager.ts:152](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L152)

Remove a site by name. No-op if the site is not registered.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The site name to remove |

###### Returns

`void`

##### site()

> **site**(`name`): [`VergeClient`](#vergeclient)

Defined in: [site-manager.ts:165](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L165)

Get a registered client by site name.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The site name |

###### Returns

[`VergeClient`](#vergeclient)

The [VergeClient](#vergeclient) for the named site

###### Throws

[NotFoundError](#notfounderror) if no site with that name is registered

##### sites()

> **sites**(): `Map`\<`string`, [`VergeClient`](#vergeclient)\>

Defined in: [site-manager.ts:177](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L177)

Get all registered sites as a map of name → client.
Returns a shallow copy — mutations do not affect the SiteManager.

###### Returns

`Map`\<`string`, [`VergeClient`](#vergeclient)\>

##### status()

> **status**(): `Map`\<`string`, [`SiteStatus`](#sitestatus)\>

Defined in: [site-manager.ts:185](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L185)

Get passive health status for all registered sites.
Returns a shallow copy — mutations do not affect the SiteManager.

###### Returns

`Map`\<`string`, [`SiteStatus`](#sitestatus)\>

##### getTags()

> **getTags**(`name`): `string`[]

Defined in: [site-manager.ts:195](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L195)

Get the tags for a registered site.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The site name |

###### Returns

`string`[]

The tags array, or an empty array if no tags are set

##### tagged()

> **tagged**(`tag`): [`CrossSiteReadProxy`](#crosssitereadproxy) & [`CrossSiteServices`](#crosssiteservices)

Defined in: [site-manager.ts:232](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L232)

Get a [CrossSiteReadProxy](#crosssitereadproxy) that fans out read queries across sites matching the given tag.

Only exposes `list()` for each service — mutations must go through a named site.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tag` | `string` | The tag to filter sites by |

###### Returns

[`CrossSiteReadProxy`](#crosssitereadproxy) & [`CrossSiteServices`](#crosssiteservices)

A proxy that queries only sites with the specified tag

###### Example

```typescript
const result = await manager.tagged('production').vms.list();
```

## Interfaces

### SiteResource

Defined in: [cross-site.ts:15](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/cross-site.ts#L15)

A resource tagged with the site it came from.
One entry per resource item, not per site.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The resource type |

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-site"></a> `site` | `string` | Site name as registered via `addSite()`. | [cross-site.ts:17](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/cross-site.ts#L17) |
| <a id="property-resource"></a> `resource` | `T` | The resource from that site. | [cross-site.ts:19](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/cross-site.ts#L19) |

***

### CrossSiteResult

Defined in: [cross-site.ts:28](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/cross-site.ts#L28)

Aggregated result from a cross-site fan-out query.
Contains both successful results and per-site errors.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The resource type |

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-data"></a> `data` | [`SiteResource`](#siteresource)\<`T`\>[] | Resources from all successful sites, flattened and tagged with site name. | [cross-site.ts:30](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/cross-site.ts#L30) |
| <a id="property-errors"></a> `errors` | [`SiteError`](#siteerror)[] | One [SiteError](#siteerror) per site that failed. | [cross-site.ts:32](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/cross-site.ts#L32) |

***

### ActionConfig

Defined in: [services/base.ts:11](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L11)

Configuration for the dedicated `_actions` endpoint used by a service.
Most services derive these from the resource name, but some require overrides.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-endpoint-2"></a> `endpoint` | `string` | The action endpoint path (e.g., `'vm_actions'`). | [services/base.ts:13](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L13) |
| <a id="property-key"></a> `key` | `string` | The body key that identifies the target resource (e.g., `'vm'`). | [services/base.ts:15](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L15) |

***

### SiteConfig

Defined in: [site-manager.ts:11](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L11)

Configuration for adding a site to the [SiteManager](#sitemanager).
Extends [ClientConfig](types.md#clientconfig) with a required site name and optional tags.

#### Extends

- [`ClientConfig`](types.md#clientconfig)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name"></a> `name` | `string` | Unique name for this site (e.g., "dc-east", "edge-01"). | - | [site-manager.ts:13](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L13) |
| <a id="property-tags-1"></a> `tags?` | `string`[] | Optional tags for grouping sites in fan-out queries. | - | [site-manager.ts:16](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L16) |
| <a id="property-host"></a> `host` | `string` | VergeOS server hostname or URL (e.g., "192.168.1.100" or "https://my-verge.example.com"). | [`ClientConfig`](types.md#clientconfig).[`host`](types.md#property-host-7) | [types.ts:30](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/types.ts#L30) |
| <a id="property-username"></a> `username?` | `string` | Username for authentication (used with password-based auth). | [`ClientConfig`](types.md#clientconfig).[`username`](types.md#property-username-2) | [types.ts:33](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/types.ts#L33) |
| <a id="property-password"></a> `password?` | `string` | Password for authentication (used with password-based auth). | [`ClientConfig`](types.md#clientconfig).[`password`](types.md#property-password-20) | [types.ts:36](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/types.ts#L36) |
| <a id="property-apikey"></a> `apiKey?` | `string` | API key for token-based authentication. | [`ClientConfig`](types.md#clientconfig).[`apiKey`](types.md#property-apikey-2) | [types.ts:39](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/types.ts#L39) |
| <a id="property-verifyssl"></a> `verifySsl?` | `boolean` | Whether to verify SSL certificates. Defaults to `true`. **Note:** The SDK uses the platform's native `fetch` implementation, which does not expose certificate validation controls. This option is respected when you supply a custom `fetch` that honours it (e.g., `undici` with a custom `Agent`, or Node.js `https.Agent` with `rejectUnauthorized`). In browsers, certificate validation is always enforced by the runtime. | [`ClientConfig`](types.md#clientconfig).[`verifySsl`](types.md#property-verifyssl) | [types.ts:50](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/types.ts#L50) |
| <a id="property-timeout-1"></a> `timeout?` | `number` | Request timeout in milliseconds. Defaults to `DEFAULT_TIMEOUT`. | [`ClientConfig`](types.md#clientconfig).[`timeout`](types.md#property-timeout-5) | [types.ts:53](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/types.ts#L53) |
| <a id="property-retries"></a> `retries?` | `number` | Number of retry attempts for failed requests. Defaults to `DEFAULT_RETRIES`. | [`ClientConfig`](types.md#clientconfig).[`retries`](types.md#property-retries-3) | [types.ts:56](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/types.ts#L56) |
| <a id="property-retrybackoff"></a> `retryBackoff?` | `number` | Backoff interval between retries in milliseconds. Defaults to `DEFAULT_RETRY_BACKOFF`. | [`ClientConfig`](types.md#clientconfig).[`retryBackoff`](types.md#property-retrybackoff) | [types.ts:59](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/types.ts#L59) |
| <a id="property-fetch"></a> `fetch?` | (`input`, `init?`) => `Promise`\<`Response`\> | Custom fetch implementation for testing or platform-specific overrides. | [`ClientConfig`](types.md#clientconfig).[`fetch`](types.md#property-fetch) | [types.ts:62](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/types.ts#L62) |
| <a id="property-signal"></a> `signal?` | `AbortSignal` | AbortSignal for cancelling requests. | [`ClientConfig`](types.md#clientconfig).[`signal`](types.md#property-signal) | [types.ts:65](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/types.ts#L65) |

***

### SiteManagerOptions

Defined in: [site-manager.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L22)

Options for constructing a [SiteManager](#sitemanager).

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-timeout-2"></a> `timeout?` | `number` | Default timeout in milliseconds for fan-out operations. | [site-manager.ts:24](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L24) |

***

### SiteStatus

Defined in: [site-manager.ts:31](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L31)

Passive health snapshot for a registered site.
Updated lazily when fan-out queries succeed or fail.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-connected"></a> `connected` | `boolean` | Whether the site is believed to be reachable. | [site-manager.ts:33](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L33) |
| <a id="property-version"></a> `version?` | `string` | Server version string from the last successful connection. | [site-manager.ts:36](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L36) |
| <a id="property-systemid"></a> `systemId?` | `string` | System ID from the server, if available. | [site-manager.ts:39](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L39) |
| <a id="property-lasterror"></a> `lastError?` | `Error` | Last error encountered when communicating with this site. | [site-manager.ts:42](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/site-manager.ts#L42) |

## Type Aliases

### CrossSiteServices

> **CrossSiteServices** = `{ [K in ServiceKeys<VergeClient>]: VergeClient[K] extends ReadOnlyService<infer T> ? { list: any } : never }`

Defined in: [cross-site.ts:53](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/cross-site.ts#L53)

Mapped type that mirrors [VergeClient](#vergeclient)'s registered services,
but exposes only a `list()` method returning [CrossSiteResult](#crosssiteresult).

Provides TypeScript autocomplete for `manager.all.vms.list(...)`.

***

### FilterValue

> **FilterValue** = `string` \| `number` \| `boolean` \| `null`

Defined in: [filter.ts:32](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L32)

A primitive value that can appear in a filter expression.

***

### OperatorObject

> **OperatorObject** = \{ \[K in Exclude\<FilterOperator, "like" \| "in"\>\]?: FilterValue \}

Defined in: [filter.ts:35](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L35)

Operator object for the `buildFilter` functional shorthand.

***

### BuildFilterValue

> **BuildFilterValue** = [`FilterValue`](#filtervalue) \| [`FilterValue`](#filtervalue)[] \| [`OperatorObject`](#operatorobject)

Defined in: [filter.ts:40](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L40)

Value types accepted by `buildFilter`.

## Variables

### SDK\_VERSION

> `const` **SDK\_VERSION**: `"0.1.0"` = `'0.1.0'`

Defined in: [constants.ts:2](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L2)

Current version of the tsvergeos SDK.

***

### API\_VERSION

> `const` **API\_VERSION**: `"v4"` = `'v4'`

Defined in: [constants.ts:5](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L5)

VergeOS API version string.

***

### API\_BASE\_PATH

> `const` **API\_BASE\_PATH**: `"/api/v4"` = `'/api/v4'`

Defined in: [constants.ts:8](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L8)

Base path prefix for all VergeOS API endpoints.

***

### DEFAULT\_TIMEOUT

> `const` **DEFAULT\_TIMEOUT**: `30000` = `30_000`

Defined in: [constants.ts:11](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L11)

Default request timeout in milliseconds (30 seconds).

***

### DEFAULT\_RETRIES

> `const` **DEFAULT\_RETRIES**: `3` = `3`

Defined in: [constants.ts:14](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L14)

Default number of retry attempts for failed requests.

***

### DEFAULT\_RETRY\_BACKOFF

> `const` **DEFAULT\_RETRY\_BACKOFF**: `1000` = `1_000`

Defined in: [constants.ts:17](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L17)

Default backoff interval between retries in milliseconds (1 second).

***

### DEFAULT\_PAGE\_SIZE

> `const` **DEFAULT\_PAGE\_SIZE**: `100` = `100`

Defined in: [constants.ts:20](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L20)

Default number of items per page for list requests.

***

### MAX\_PAGE\_SIZE

> `const` **MAX\_PAGE\_SIZE**: `1000` = `1_000`

Defined in: [constants.ts:23](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L23)

Maximum number of items per page for list requests.

***

### TASK\_WAIT\_TIMEOUT

> `const` **TASK\_WAIT\_TIMEOUT**: `300000` = `300_000`

Defined in: [constants.ts:26](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L26)

Default timeout for waiting on task completion in milliseconds (5 minutes).

***

### TASK\_POLL\_INTERVAL

> `const` **TASK\_POLL\_INTERVAL**: `2000` = `2_000`

Defined in: [constants.ts:29](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L29)

Default polling interval for task status checks in milliseconds (2 seconds).

***

### MIN\_MAJOR\_VERSION

> `const` **MIN\_MAJOR\_VERSION**: `25` = `25`

Defined in: [constants.ts:32](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L32)

Minimum supported major version of the VergeOS server.

***

### UPLOAD\_CHUNK\_SIZE

> `const` **UPLOAD\_CHUNK\_SIZE**: `262144` = `262_144`

Defined in: [constants.ts:35](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L35)

Chunk size for file uploads in bytes (256 KB).

***

### ENV\_PREFIX

> `const` **ENV\_PREFIX**: `"VERGEOS_"` = `'VERGEOS_'`

Defined in: [constants.ts:38](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/constants.ts#L38)

Prefix for environment variables used by the SDK.

## Functions

### isVergeError()

> **isVergeError**(`err`): `err is VergeError`

Defined in: [errors.ts:167](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L167)

Type guard that returns `true` for any [VergeError](#vergeerror) instance.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `unknown` |

#### Returns

`err is VergeError`

***

### isApiError()

> **isApiError**(`err`): `err is ApiError`

Defined in: [errors.ts:173](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L173)

Type guard that returns `true` for [ApiError](#apierror) instances,
including subclasses like [ConflictError](#conflicterror).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `unknown` |

#### Returns

`err is ApiError`

***

### isAuthError()

> **isAuthError**(`err`): `err is AuthError`

Defined in: [errors.ts:179](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L179)

Type guard that returns `true` for [AuthError](#autherror) instances
OR [ApiError](#apierror) instances with status 401 or 403 (dual-check pattern).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `unknown` |

#### Returns

`err is AuthError`

***

### isNotFoundError()

> **isNotFoundError**(`err`): `err is NotFoundError`

Defined in: [errors.ts:187](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L187)

Type guard that returns `true` for [NotFoundError](#notfounderror) instances
OR [ApiError](#apierror) instances with status 404 (dual-check pattern).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `unknown` |

#### Returns

`err is NotFoundError`

***

### isValidationError()

> **isValidationError**(`err`): `err is ValidationError`

Defined in: [errors.ts:194](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L194)

Type guard that returns `true` for [ValidationError](#validationerror) instances
OR [ApiError](#apierror) instances with status 400 (dual-check pattern).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `unknown` |

#### Returns

`err is ValidationError`

***

### isConflictError()

> **isConflictError**(`err`): `err is ConflictError`

Defined in: [errors.ts:201](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L201)

Type guard that returns `true` for [ConflictError](#conflicterror) instances
OR [ApiError](#apierror) instances with status 409 (dual-check pattern).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `unknown` |

#### Returns

`err is ConflictError`

***

### isTaskError()

> **isTaskError**(`err`): `err is TaskError`

Defined in: [errors.ts:208](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L208)

Type guard that returns `true` for [TaskError](#taskerror) instances,
including subclasses like [TaskTimeoutError](#tasktimeouterror).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `unknown` |

#### Returns

`err is TaskError`

***

### isTaskTimeoutError()

> **isTaskTimeoutError**(`err`): `err is TaskTimeoutError`

Defined in: [errors.ts:213](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L213)

Type guard that returns `true` for [TaskTimeoutError](#tasktimeouterror) instances only.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `unknown` |

#### Returns

`err is TaskTimeoutError`

***

### isUnsupportedVersionError()

> **isUnsupportedVersionError**(`err`): `err is UnsupportedVersionError`

Defined in: [errors.ts:219](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L219)

Type guard that returns `true` for [UnsupportedVersionError](#unsupportedversionerror) instances only.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `unknown` |

#### Returns

`err is UnsupportedVersionError`

***

### isSiteError()

> **isSiteError**(`err`): `err is SiteError`

Defined in: [errors.ts:225](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/errors.ts#L225)

Type guard that returns `true` for [SiteError](#siteerror) instances only.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `unknown` |

#### Returns

`err is SiteError`

***

### buildFilter()

> **buildFilter**(`conditions`): `string`

Defined in: [filter.ts:231](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L231)

Build a filter string from a plain object using convention-based detection.

Supports three value patterns:
- **Simple equality**: `{ status: 'running' }` → `"status eq 'running'"`
- **Wildcard strings**: `{ name: 'web*' }` → `"name like 'web%'"` (auto-detects `*` and `?`)
- **Arrays**: `{ status: ['running', 'stopped'] }` → `"status in ('running', 'stopped')"`
- **Operator objects**: `{ cpu_cores: { gt: 2 } }` → `"cpu_cores gt 2"`

Multiple fields are joined with `and`. Null values are skipped.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `conditions` | `Record`\<`string`, [`BuildFilterValue`](#buildfiltervalue)\> | Object mapping field names to filter values |

#### Returns

`string`

OData filter string

#### Example

```typescript
buildFilter({
  status: 'running',
  name: 'web*',
  cpu_cores: { gt: 2 },
  ram: { ge: 4096, le: 65536 },
});
// → "status eq 'running' and name like 'web%' and cpu_cores gt 2 and ram ge 4096 and ram le 65536"
```

***

### quoteFilterString()

> **quoteFilterString**(`value`): `string`

Defined in: [filter.ts:275](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/filter.ts#L275)

Escape and single-quote a string value for safe embedding in a filter expression.

Prevents filter injection by escaping single quotes before wrapping.
Use this instead of manual template-literal quoting in filter strings.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`string`

#### Example

```typescript
const filter = `name eq ${quoteFilterString(userInput)}`;
// userInput = "O'Brien" → "name eq 'O''Brien'"
```

## References

### ApiResponse

Re-exports [ApiResponse](types.md#apiresponse)

***

### ClientConfig

Re-exports [ClientConfig](types.md#clientconfig)

***

### FlexKey

Re-exports [FlexKey](types.md#flexkey)

***

### ListAllOptions

Re-exports [ListAllOptions](types.md#listalloptions)

***

### ListOptions

Re-exports [ListOptions](types.md#listoptions)

***

### MutationOptions

Re-exports [MutationOptions](types.md#mutationoptions)

***

### Resource

Re-exports [Resource](types.md#resource)
