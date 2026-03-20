# SDK Code Review Issues

> Exhaustive review of 84 services against 337 API endpoint docs.
> Generated: 2026-03-20

## Summary

| Severity | Count |
| -------- | ----- |
| Critical | 8     |
| High     | 42    |
| Medium   | 30    |
| Low      | 18    |

---

## Critical — Must Fix

> Runtime failures: wrong action names, wrong dispatch patterns, missing critical actions

### Runtime Bugs — Will Produce API Errors

- [ ] **node/service.ts** — `enableMaintenance()` dispatches `'enable_maintenance'` but API action name is `'maintenance'`. Will 400.
- [ ] **node/service.ts** — `disableMaintenance()` dispatches `'disable_maintenance'` but API action name is `'leavemaintenance'`. Will 400.
- [ ] **node/service.ts** — `clearPStore()` dispatches `'clear_pstore'` but this action does not exist in node_actions API. Will 400.
- [ ] **user/service.ts** — `enable()` and `disable()` use `dispatchAction()` (dedicated `user_actions` endpoint) but `enable`/`disable` are NOT in the user_actions schema. They are inline record actions (`POST /users/{id}/enable`). Will 400.
- [ ] **vm/service.ts** — `guestShutdown()` dispatches `'guestshutdown'` but this action does not exist in vm_actions API. Will 400. Valid actions include `poweron`, `poweroff`, `reset`, `migrate`, `kill`, `hibernate`, etc.

### Missing Critical Actions

- [ ] **cloud-snapshot-vm/service.ts** — Missing `recover` action. API defines `cloud_snapshot_vm_actions` endpoint with action `recover`. No method exists.
- [ ] **cloud-snapshot-tenant/service.ts** — Missing `recover` action. API defines `cloud_snapshot_tenant_actions` endpoint with action `recover`. No method exists.
- [ ] **file/service.ts** — Missing ALL 5 file actions: `overwrite`, `add_link`, `delete_link`, `delete_reference`, `make_iso`. Service has no `dispatchAction()` calls whatsoever.

---

## High — Should Fix

> Wrong types, missing enum unions, locked fields in params, FK typing errors, missing actions

### Wrong Types

- [ ] **update-settings/types.ts** — `installed` typed as `string` but API defines it as `Boolean`. Should be `boolean`.
- [ ] **update-source/types.ts** — `last_updated` typed as `string` but API defines it as `Number`. Should be `number`.
- [ ] **update-source/types.ts** — `last_refreshed` typed as `string` but API defines it as `Number`. Should be `number`.
- [ ] **update-source-package/types.ts** — `created` typed as `string` but API defines it as `Unsigned Integer (32-bit)`. Should be `number`.
- [ ] **update-branch/types.ts** — `created` typed as `string` but API defines it as `Unsigned Integer (32-bit)`. Should be `number`.
- [ ] **task/types.ts** — `last_run` typed as `number` but API defines it as `String` (formatted timestamp). Should be `string`.
- [ ] **update-settings/types.ts** — `applying_updates_status` and `applying_updates_progress` are present in SDK but do NOT exist in the API field table. These are invented fields.

### ReadOnly / Locked Fields in Params

- [ ] **certificate/types.ts** — `type` is ReadOnly:Yes in API but appears in both `CertificateCreateParams` and `CertificateUpdateParams`.
- [ ] **resource-group/types.ts** — `settings` is `locked` in API but appears in both `ResourceGroupCreateParams` and `ResourceGroupUpdateParams`.
- [ ] **member/types.ts** — `system` is `locked` in API but appears in `MemberUpdateParams`.
- [ ] **site-sync-profile-period/types.ts** — `profile_period` is ReadOnly:Yes in API but appears as required in `SiteSyncProfilePeriodCreateParams`.

### FK Fields Typed as `number` or `string` Instead of `FlexKey`

- [ ] **alarm/types.ts** — `owner`, `sub_owner`, `alarm_type` are FK fields but typed as `string` instead of `FlexKey`.
- [ ] **task/types.ts** — `owner` and `creator` are FK fields but typed as `string` instead of `FlexKey`.
- [ ] **site-sync-incoming/types.ts** — FK fields `site`, `sync_back`, `current_stats`, `user` typed as `number` instead of `FlexKey`.
- [ ] **site-sync-outgoing/types.ts** — FK fields `site`, `sync_back`, `current_stats`, `repair_server` typed as `number` instead of `FlexKey`.
- [ ] **site-sync-profile-period/types.ts** — FK fields `site_syncs_outgoing`, `profile_period`, `schedule_task`, `task` typed as `number` instead of `FlexKey`.
- [ ] **cloud-init/types.ts** — `owner` FK typed as `number` instead of `FlexKey`.
- [ ] **resource-group/types.ts** — `settings` FK typed as `number` instead of `FlexKey`.
- [ ] **system/types.ts** — `ui_branding` and `theme` FK fields typed as `number` instead of `FlexKey`.

### Missing Enum Unions (plain `string` where API defines Values)

- [ ] **ipsec/types.ts** — `mode` should be `'advanced' | 'normal'`, not `string`.
- [ ] **ipsec/types.ts** — `uniqueids` should be `'yes' | 'no' | 'never' | 'replace' | 'keep'`, not `string`.
- [ ] **ipsec/types.ts** — `strictcrlpolicy` should be `'yes' | 'ifuri' | 'no'`, not `string`.
- [ ] **ipsec-phase1/types.ts** — `keyexchange` should be `'ikev1' | 'ikev2' | 'ike'`, not `string`.
- [ ] **ipsec-phase1/types.ts** — `auth` should be `'psk' | 'pubkey'`, not `string`.
- [ ] **ipsec-phase1/types.ts** — `negotiation` should be `'main' | 'aggressive'`, not `string`.
- [ ] **ipsec-phase1/types.ts** — `auto` should be `'add' | 'route' | 'start'`, not `string`.
- [ ] **ipsec-phase1/types.ts** — `dpdaction` should be `'none' | 'clear' | 'hold' | 'restart'`, not `string`.
- [ ] **ipsec-phase2/types.ts** — `mode` should be `'tunnel' | 'transport'`, not `string`.
- [ ] **ipsec-phase2/types.ts** — `protocol` should be `'esp' | 'ah'`, not `string`.
- [ ] **vm/types.ts** — `machine_type` has 57 enumerated values, typed as plain `string`.
- [ ] **vm/types.ts** — `cpu_type` has 34 enumerated values, typed as plain `string`.
- [ ] **alarm/types.ts** — `owner_type` has enum values (`vms`, `vnets`, `tenant_nodes`, etc.), typed as `AlarmOwnerType = string`.
- [ ] **alarm/types.ts** — `sub_owner_type` has enum values (`""`, `machine_drives`, `machine_nics`, etc.), typed as plain `string`.
- [ ] **machine-drive/types.ts** — `preferred_tier` has values `'1'`–`'5'`, typed as plain `string`.
- [ ] **site/types.ts** — `country` has 250+ ISO country codes, typed as plain `string`.
- [ ] **site/types.ts** — `timezone` has 400+ IANA timezone values, typed as plain `string`.
- [ ] **system/types.ts** — `country` has 249 enumerated country codes, typed as plain `string`.
- [ ] **system/types.ts** — `timezone` has ~400 IANA timezone values, typed as plain `string`.

### Missing Actions

- [ ] **vm/service.ts** — Missing 12 actions: `migrate`, `hibernate`, `changecd`, `changenet`, `paste`, `restore`, `recover_cloudsnapshot`, `hotplugdrive`, `hotplugnic`, `fsync_strict`, `erase_drive`, `refresh`.
- [ ] **network/service.ts** — Missing actions: `migrate`, `execute`, `clear_statistics`.
- [ ] **tenant/service.ts** — Missing actions: `execute`, `restore`, `convert_cloud_snapshot`, `recover_cloudsnapshot`, `give_file`.
- [ ] **volume/service.ts** — Missing actions: `restore`, `clone`, `recover_cloudsnapshot`.
- [ ] **node/service.ts** — Missing actions: `poweron`, `poweroff`, `reset`, `refresh`, `kill`, `refresh_status`, `receive_file`, `interfaces`, `ipmi_test`, `clear_sel`, `refresh_fabric_status`.
- [ ] **site/service.ts** — Missing actions: `delete_remote_task`, `auto_create_sync`, `move_sync`.
- [ ] **tenant-node/service.ts** — Missing actions: `poweronmigrate`, `poweroffmaintenance`, `refresh`, `execute`.
- [ ] **site-sync-outgoing/service.ts** — Missing action: `throttle_disable`.

### Wrong Optionality in Resource Interfaces

- [ ] **cluster/types.ts** — Nearly all fields are non-optional but API says Required:No for everything except `name`. Affects: `id`, `description`, `enabled`, `storage`, `compute`, `recommended_cpu_type`, etc.
- [ ] **node/types.ts** — Most fields non-optional but API says Required:No. Affects: `description`, `model`, `cpu`, `physical`, `overcommit`, `ram`, `cores`, etc.
- [ ] **settings/types.ts** — `value`, `default_value`, `description` are required but API marks them Required:No. Should be optional.

### Missing Fields from Resource Interface

- [ ] **update-settings/types.ts** — `applying_updates_force` (Boolean, ReadOnly) exists in API but missing from SDK.

### Incomplete CreateParams

- [ ] **ipsec/types.ts** — `IPSecCreateParams` missing writable fields that ARE in UpdateParams: `charon.cisco_unity`, `charon.accept_unencrypted_mainmode_messages`, `charon.plugins.kernel-netlink.mss`, `charon.make_before_break`, `strictcrlpolicy`.

### Plumbing Gaps

- [ ] **tsup.config.ts** — Missing entry point for `cloud-init` service. Present in `full.ts` and `types.ts` but not buildable as standalone import.
- [ ] **tsup.config.ts** — Missing entry point for `resource-group` service. Present in `full.ts` and `types.ts` but not buildable as standalone import.

---

## Medium — Nice to Fix

> Wrong optionality in params, missing optional fields, missing non-critical actions, TSDoc gaps

### Wrong Optionality in Params

- [ ] **ipsec-phase1/types.ts** — `ike` is Required:Yes in API but optional in `IPSecPhase1CreateParams`. Should be required.
- [ ] **ipsec-phase2/types.ts** — `ciphers` is Required:Yes in API but optional in `IPSecPhase2CreateParams`. Should be required.
- [ ] **cloud-init/types.ts** — `name` is Required:Yes in API but optional (`name?: string`) in `CloudInitFile` resource interface.
- [ ] **tenant-snapshot/types.ts** — `name` is Required:Yes + ReadOnly:Yes but optional in `TenantSnapshot` resource interface. Should be `name: string`.
- [ ] **tenant-recipe/types.ts** — `catalog` and `version` are Required:Yes but optional in resource interface.
- [ ] **tenant-recipe-instance/types.ts** — `recipe` is Required:Yes but optional in resource interface.
- [ ] **vm-recipe/types.ts** — `catalog` and `version` are Required:Yes but optional in resource interface.
- [ ] **vm-recipe-instance/types.ts** — `recipe` is Required:Yes but optional in resource interface.
- [ ] **site-sync-incoming/types.ts** — `site` and `name` are Required:Yes but optional in resource interface.
- [ ] **site-sync-outgoing/types.ts** — `site` and `name` are Required:Yes but optional in resource interface.
- [ ] **webhook/types.ts** — `message` is Required:Yes but optional in `Webhook` resource interface.

### Missing Fields from Resource / Params

- [ ] **update-settings/types.ts** — `snapshot_cloud_expire_seconds`, `release_notes_url`, `anonymize_statistics` missing from Resource (and params where applicable).
- [ ] **tenant-recipe/types.ts** — `TenantRecipeUpdateParams` missing 6 writable fields: `catalog`, `build`, `downloaded`, `update_available`, `needs_republish`, `dependencies`.
- [ ] **tenant-recipe-instance/types.ts** — `tenant` is ReadOnly but appears in `CreateParams`. `UpdateParams` missing `version`/`build`.
- [ ] **vm-recipe/types.ts** — `VMRecipeUpdateParams` missing 8 writable fields: `build`, `downloaded`, `update_available`, `needs_republish`, `dependencies`, `question_assets`, `size`, `assets`.
- [ ] **cluster-tier/types.ts** — Missing `status` FK, `stats` FK, and `dashboard` JSON fields from resource interface.
- [ ] **site-sync-incoming/types.ts** — `verified` field (FK) entirely absent from resource and params.
- [ ] **site-sync-outgoing/types.ts** — `remote_site_id` writable but absent from Create/UpdateParams.
- [ ] **network/types.ts** — `ipsec` FK field (locked) absent from Network resource interface.
- [ ] **site/types.ts** — Missing fields: `user` FK, `remote_token`, `site_data` FK, `last_log_timestamp`.
- [ ] **cloud-snapshot/types.ts** — `snapshot_profile`, `snapshot_period`, `schedule_task`, `task` are writable but absent from `CloudSnapshotUpdateParams`.
- [ ] **node/types.ts** — Missing fields: `packages` (JSON, locked), `ipmi_sel_last_id`, `ras_mc_last_timestamp`.
- [ ] **system/types.ts** — Most fields required in `System` interface but API marks them Required:No. Should be optional.
- [ ] **file/types.ts** — `url` is ReadOnly:Yes but appears in `VgFileCreateParams`. Should be excluded.

### Missing Non-Critical Actions

- [ ] **volume-sync/service.ts** — Missing `enable` and `disable` actions.
- [ ] **group/service.ts** — Missing `tag` and `untag` record actions.
- [ ] **network-rule/service.ts** — Missing `tag` and `untag` record actions.
- [ ] **machine-snapshot/service.ts** — Missing `expires_timer` record action.
- [ ] **update-source-package/types.ts** — `type` field is plain `string` but API defines Values: `['ybpkg']`. Should be literal type.

### Wrong Optionality — Resource Interface

- [ ] **alarm-type/types.ts** — `level` field has API-defined enum values but typed as plain `string`. Should use a literal union.
- [ ] **log/types.ts** — All resource fields are non-optional but API marks them all Required:No. Should be optional.

---

## Low — Informational

> Minor inconsistencies, missing non-critical fields, extra fields

### Minor Type Issues

- [ ] **machine-drive/types.ts** — `fsync` typed as plain `string`. API has 3 values: `''`, `'0'`, `'1'`. Should be literal union.
- [ ] **network/types.ts** — `bond_interfaces_args` typed as `number[]`. API says JSON. Should be `unknown` or a proper shape.
- [ ] **alarm/index.ts** — `AlarmOwnerType` exported as a public type but is just an alias for `string` with no constraint.
- [ ] **wireguard-peer/types.ts** — `wg_config` excluded from params (treated as read-only) but not marked ReadOnly in API. Defensible but undocumented.
- [ ] **snapshot-profile-period/types.ts** — UpdateParams JSDoc says "profile excluded as ReadOnly" but API says profile is NOT ReadOnly. Comment is misleading.

### Missing Optional Fields

- [ ] **alarm/types.ts** — `snoozed_by` is writable per API but absent from `AlarmUpdateParams`.
- [ ] **vm/types.ts** — `ha_group` missing from `VMCreateParams` and `VMUpdateParams` (present in Resource).
- [ ] **tenant/types.ts** — `resolved_theme_access_list` absent from resource interface.
- [ ] **machine-drive/types.ts** — `nocreate` and `spare` boolean fields absent from resource interface.
- [ ] **volume/types.ts** — `additional_setting_values` (JSON) absent from all SDK types.
- [ ] **network/types.ts** — `proxy` FK field absent from Network resource interface.
- [ ] **site/types.ts** — `force_refresh` and `automatically_create_syncs` absent from resource interface.
- [ ] **wireguard-peer-status/types.ts** — `bulk_update` JSON field missing.
- [ ] **storage-tier/types.ts** — `stats` FK field missing from resource.
- [ ] **cluster-tier/types.ts** — `cluster` and `tier` are Required in API but optional in SDK resource interface.
- [ ] **update-source/types.ts** — `name` and `url` optional in resource but API marks them Required:Yes.
- [ ] **update-source-package/types.ts** — `name`, `version`, `branch`, `source` optional but API marks them Required:Yes.
- [ ] **update-branch/types.ts** — `name` optional in resource but API marks it Required:Yes.

---

## Coverage Notes

### Test Coverage

All 84 services have both unit and integration tests. **No coverage gaps.**

### Plumbing

83 service directories (not 84 — `base.ts` is the shared base, not a service). All 83 are present in `full.ts` and `types.ts`. Two are missing from `tsup.config.ts` (noted above in High).

### Patterns Worth Noting (Not Bugs)

Several services include ReadOnly fields in `CreateParams` where the API marks them ReadOnly:Yes. In VergeOS, ReadOnly often means "cannot change after creation" rather than "cannot set at creation." The following are **intentional and correct**:

- `volume/types.ts` — `fs_type`, `encrypt`, `service` in VolumeCreateParams
- `machine-drive/types.ts` — `media` in MachineDriveCreateParams
- `cloud-snapshot/types.ts` — `name` in CloudSnapshotCreateParams
- `network/types.ts` — `type` in NetworkCreateParams

These follow the VergeOS convention and should NOT be changed.
