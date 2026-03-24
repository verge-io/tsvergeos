[**tsvergeos**](README.md)

***

[tsvergeos](README.md) / types

# types

## Interfaces

### AlarmType

Defined in: services/alarm-type/types.ts:13

A VergeOS alarm type definition.

Alarm types are read-only reference data that define the categories
of alarms the system can raise. Each alarm type has a unique string
`key` identifier (e.g., `"vm_cpu_high"`), unlike most resources which
use integer `$key` values.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-key"></a> `key?` | `string` | Unique string identifier for this alarm type (e.g., `"vm_cpu_high"`). | - | services/alarm-type/types.ts:15 |
| <a id="property-name"></a> `name?` | `string` | Human-readable name of the alarm type. | - | services/alarm-type/types.ts:18 |
| <a id="property-description"></a> `description?` | `string` | Description of what triggers this alarm type. | - | services/alarm-type/types.ts:21 |
| <a id="property-level"></a> `level?` | `"audit"` \| `"message"` \| `"warning"` \| `"error"` \| `"critical"` \| `"summary"` \| `"debug"` | Default severity level for alarms of this type. | - | services/alarm-type/types.ts:24 |
| <a id="property-threshold"></a> `threshold?` | `number` | Threshold value that triggers the alarm. | - | services/alarm-type/types.ts:27 |
| <a id="property-disable_logging"></a> `disable_logging?` | `boolean` | Whether logging is disabled for this alarm type. | - | services/alarm-type/types.ts:30 |
| <a id="property-allow_delete"></a> `allow_delete?` | `boolean` | Whether alarms of this type can be deleted. | - | services/alarm-type/types.ts:33 |
| <a id="property-max_snooze_threshold"></a> `max_snooze_threshold?` | `number` | Maximum snooze threshold value allowed. | - | services/alarm-type/types.ts:36 |
| <a id="property-max_snooze_seconds"></a> `max_snooze_seconds?` | `number` | Maximum snooze duration in seconds. | - | services/alarm-type/types.ts:39 |
| <a id="property-default_snooze_seconds"></a> `default_snooze_seconds?` | `number` | Default snooze duration in seconds. | - | services/alarm-type/types.ts:42 |
| <a id="property-key-1"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### Alarm

Defined in: services/alarm/types.ts:42

A VergeOS alarm resource.

Alarms are raised and lowered automatically by the platform's monitoring
system. They cannot be created via the API — only resolved, snoozed,
or unsnoozed.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-owner"></a> `owner?` | [`FlexKey`](#flexkey) | Owner resource path (e.g., `"vms/123"`). Read-only. | - | services/alarm/types.ts:44 |
| <a id="property-owner_type"></a> `owner_type?` | [`AlarmOwnerType`](#alarmownertype) | Type of the owner resource. Read-only. | - | services/alarm/types.ts:47 |
| <a id="property-sub_owner"></a> `sub_owner?` | [`FlexKey`](#flexkey) | Sub-owner resource path, if applicable. Read-only. | - | services/alarm/types.ts:50 |
| <a id="property-sub_owner_type"></a> `sub_owner_type?` | [`AlarmSubOwnerType`](#alarmsubownertype) | Type of the sub-owner resource. Read-only. | - | services/alarm/types.ts:53 |
| <a id="property-alarm_type"></a> `alarm_type?` | [`FlexKey`](#flexkey) | FK reference to the alarm type definition. Read-only. | - | services/alarm/types.ts:56 |
| <a id="property-level-1"></a> `level?` | [`AlarmLevel`](#alarmlevel) | Alarm severity level. Read-only. | - | services/alarm/types.ts:59 |
| <a id="property-status"></a> `status?` | `string` | Current alarm status. Read-only. | - | services/alarm/types.ts:62 |
| <a id="property-alarm_id"></a> `alarm_id?` | `string` | 8-character alarm identifier string. Read-only. | - | services/alarm/types.ts:65 |
| <a id="property-resolvable"></a> `resolvable?` | `boolean` | Whether this alarm can be resolved via the API. Read-only. | - | services/alarm/types.ts:68 |
| <a id="property-resolve_text"></a> `resolve_text?` | `string` | Text displayed when the alarm is resolved. Read-only. | - | services/alarm/types.ts:71 |
| <a id="property-resolve_action"></a> `resolve_action?` | `string` | Action to take when resolving. Read-only. | - | services/alarm/types.ts:74 |
| <a id="property-created"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/alarm/types.ts:77 |
| <a id="property-modified"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/alarm/types.ts:80 |
| <a id="property-expires"></a> `expires?` | `number` | Expiration timestamp (Unix epoch). | - | services/alarm/types.ts:83 |
| <a id="property-snooze_threshold"></a> `snooze_threshold?` | `number` | Snooze threshold value. | - | services/alarm/types.ts:86 |
| <a id="property-snooze"></a> `snooze?` | `number` | Snooze until timestamp (Unix epoch). Set to 0 to unsnooze. | - | services/alarm/types.ts:89 |
| <a id="property-snoozed_by"></a> `snoozed_by?` | `string` | User who snoozed this alarm. | - | services/alarm/types.ts:92 |
| <a id="property-key-2"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### AlarmUpdateParams

Defined in: services/alarm/types.ts:103

Parameters for updating an alarm.

Most alarm fields are read-only. Only `snooze` and `snooze_threshold`
can be modified via the API.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-snooze-1"></a> `snooze?` | `number` | Snooze until timestamp (Unix epoch). Set to 0 to unsnooze. | services/alarm/types.ts:105 |
| <a id="property-snooze_threshold-1"></a> `snooze_threshold?` | `number` | Snooze threshold value. | services/alarm/types.ts:108 |
| <a id="property-snoozed_by-1"></a> `snoozed_by?` | `string` | User who snoozed this alarm. | services/alarm/types.ts:111 |

***

### UserAPIKey

Defined in: services/api-key/types.ts:19

A VergeOS user API key resource.

API keys provide token-based authentication for programmatic access to the
VergeOS API. The actual token value is only returned once at creation time
and cannot be retrieved afterwards.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-user"></a> `user?` | [`FlexKey`](#flexkey) | User that owns this API key (FK to `users`). | - | services/api-key/types.ts:21 |
| <a id="property-user_name"></a> `user_name?` | `string` | Joined user name. Read-only. | - | services/api-key/types.ts:24 |
| <a id="property-name-1"></a> `name?` | `string` | Display name for this API key. Min 1, max 128 characters. | - | services/api-key/types.ts:27 |
| <a id="property-description-1"></a> `description?` | `string` | Description. Max 2048 characters. | - | services/api-key/types.ts:30 |
| <a id="property-ip_allow_list"></a> `ip_allow_list?` | `string` | IP allow list for restricting key usage. | - | services/api-key/types.ts:33 |
| <a id="property-ip_deny_list"></a> `ip_deny_list?` | `string` | IP deny list for restricting key usage. | - | services/api-key/types.ts:36 |
| <a id="property-lastlogin_stamp"></a> `lastlogin_stamp?` | `number` | Last login timestamp (Unix epoch). Read-only. | - | services/api-key/types.ts:39 |
| <a id="property-lastlogin_ip"></a> `lastlogin_ip?` | `string` | IP address of last login. Read-only. | - | services/api-key/types.ts:42 |
| <a id="property-created-1"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/api-key/types.ts:45 |
| <a id="property-expires_type"></a> `expires_type?` | [`ApiKeyExpiresType`](#apikeyexpirestype) | Expiration type. Default: `date`. | - | services/api-key/types.ts:48 |
| <a id="property-expires-1"></a> `expires?` | `number` | Expiration timestamp (Unix epoch). Only relevant when `expires_type` is `date`. | - | services/api-key/types.ts:51 |
| <a id="property-credential"></a> `credential?` | [`FlexKey`](#flexkey) | Credential reference (FK to `/sys/credentials`). Read-only. | - | services/api-key/types.ts:54 |
| <a id="property-key-3"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### UserAPIKeyCreateParams

Defined in: services/api-key/types.ts:65

Parameters for creating a new API key.

`user` and `name` are required. Read-only fields (`user_name`,
`lastlogin_stamp`, `lastlogin_ip`, `created`, `credential`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-user-1"></a> `user` | [`FlexKey`](#flexkey) | User that will own this API key (FK to `users`). | services/api-key/types.ts:67 |
| <a id="property-name-2"></a> `name` | `string` | Display name for this API key. Min 1, max 128 characters. | services/api-key/types.ts:70 |
| <a id="property-description-2"></a> `description?` | `string` | Description. Max 2048 characters. | services/api-key/types.ts:73 |
| <a id="property-ip_allow_list-1"></a> `ip_allow_list?` | `string` | IP allow list for restricting key usage. | services/api-key/types.ts:76 |
| <a id="property-ip_deny_list-1"></a> `ip_deny_list?` | `string` | IP deny list for restricting key usage. | services/api-key/types.ts:79 |
| <a id="property-expires_type-1"></a> `expires_type?` | [`ApiKeyExpiresType`](#apikeyexpirestype) | Expiration type. Default: `date`. | services/api-key/types.ts:82 |
| <a id="property-expires-2"></a> `expires?` | `number` | Expiration timestamp (Unix epoch). Only relevant when `expires_type` is `date`. | services/api-key/types.ts:85 |

***

### UserAPIKeyUpdateParams

Defined in: services/api-key/types.ts:96

Parameters for updating an existing API key.

All fields are optional — only provided fields are changed.
`user` cannot be changed after creation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-3"></a> `name?` | `string` | Display name for this API key. Min 1, max 128 characters. | services/api-key/types.ts:98 |
| <a id="property-description-3"></a> `description?` | `string` | Description. Max 2048 characters. | services/api-key/types.ts:101 |
| <a id="property-ip_allow_list-2"></a> `ip_allow_list?` | `string` | IP allow list for restricting key usage. | services/api-key/types.ts:104 |
| <a id="property-ip_deny_list-2"></a> `ip_deny_list?` | `string` | IP deny list for restricting key usage. | services/api-key/types.ts:107 |
| <a id="property-expires_type-2"></a> `expires_type?` | [`ApiKeyExpiresType`](#apikeyexpirestype) | Expiration type. | services/api-key/types.ts:110 |
| <a id="property-expires-3"></a> `expires?` | `number` | Expiration timestamp (Unix epoch). Only relevant when `expires_type` is `date`. | services/api-key/types.ts:113 |

***

### UserAPIKeyCreateResult

Defined in: services/api-key/types.ts:124

Result of creating an API key.

The `token` is the one-time API key value that can only be retrieved at
creation time. It is not stored and cannot be retrieved later.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-apikey"></a> `apiKey` | [`UserAPIKey`](#userapikey) | The created API key resource. | services/api-key/types.ts:126 |
| <a id="property-token"></a> `token` | `string` | The one-time API key token. Store securely — it cannot be retrieved again. | services/api-key/types.ts:129 |

***

### CatalogRepository

Defined in: services/catalog-repository/types.ts:31

A VergeOS catalog repository resource.

Catalog repositories are sources of recipes. They can be local,
remote, or provider-type. Refreshing a repository discovers and
imports catalogs and their recipes.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-4"></a> `name` | `string` | Repository name. 1–255 chars, unique. | - | services/catalog-repository/types.ts:33 |
| <a id="property-description-4"></a> `description?` | `string` | Repository description. 1–256 chars. | - | services/catalog-repository/types.ts:36 |
| <a id="property-type"></a> `type?` | [`CatalogRepositoryType`](#catalogrepositorytype) | Repository type. Default: `"local"`. Read-only. | - | services/catalog-repository/types.ts:39 |
| <a id="property-url"></a> `url?` | `string` | Repository URL (for remote types). | - | services/catalog-repository/types.ts:42 |
| <a id="property-user-2"></a> `user?` | `string` | Authentication username. Max 64 chars. | - | services/catalog-repository/types.ts:45 |
| <a id="property-password"></a> `password?` | `string` | Authentication password. 8–256 chars. | - | services/catalog-repository/types.ts:48 |
| <a id="property-allow_insecure"></a> `allow_insecure?` | `boolean` | Whether to allow insecure (self-signed) certificates. Default: `false`. | - | services/catalog-repository/types.ts:51 |
| <a id="property-auto_refresh"></a> `auto_refresh?` | `boolean` | Whether to auto-refresh the repository. Default: `true`. | - | services/catalog-repository/types.ts:54 |
| <a id="property-max_tier"></a> `max_tier?` | [`CatalogMaxTier`](#catalogmaxtier) | Maximum storage tier for recipe downloads. Default: `"1"`. | - | services/catalog-repository/types.ts:57 |
| <a id="property-override_default_scope"></a> `override_default_scope?` | [`CatalogRepositoryOverrideScope`](#catalogrepositoryoverridescope) | Override the default publishing scope. Default: `"none"`. | - | services/catalog-repository/types.ts:60 |
| <a id="property-last_refreshed"></a> `last_refreshed?` | `number` | Timestamp of last refresh. | - | services/catalog-repository/types.ts:63 |
| <a id="property-status-1"></a> `status?` | [`FlexKey`](#flexkey) | Repository status (FK to `catalog_repository_status`). Read-only. | - | services/catalog-repository/types.ts:66 |
| <a id="property-enabled"></a> `enabled?` | `boolean` | Whether the repository is enabled. Default: `true`. | - | services/catalog-repository/types.ts:69 |
| <a id="property-key-4"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### CatalogRepositoryCreateParams

Defined in: services/catalog-repository/types.ts:75

Parameters for creating a new catalog repository.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-5"></a> `name` | `string` | Repository name. Required. | services/catalog-repository/types.ts:77 |
| <a id="property-description-5"></a> `description?` | `string` | Repository description. | services/catalog-repository/types.ts:80 |
| <a id="property-url-1"></a> `url?` | `string` | Repository URL (for remote types). | services/catalog-repository/types.ts:83 |
| <a id="property-user-3"></a> `user?` | `string` | Authentication username. | services/catalog-repository/types.ts:86 |
| <a id="property-password-1"></a> `password?` | `string` | Authentication password. | services/catalog-repository/types.ts:89 |
| <a id="property-allow_insecure-1"></a> `allow_insecure?` | `boolean` | Whether to allow insecure certificates. | services/catalog-repository/types.ts:92 |
| <a id="property-auto_refresh-1"></a> `auto_refresh?` | `boolean` | Whether to auto-refresh. | services/catalog-repository/types.ts:95 |
| <a id="property-max_tier-1"></a> `max_tier?` | [`CatalogMaxTier`](#catalogmaxtier) | Maximum storage tier. | services/catalog-repository/types.ts:98 |
| <a id="property-override_default_scope-1"></a> `override_default_scope?` | [`CatalogRepositoryOverrideScope`](#catalogrepositoryoverridescope) | Override default publishing scope. | services/catalog-repository/types.ts:101 |
| <a id="property-enabled-1"></a> `enabled?` | `boolean` | Whether the repository is enabled. | services/catalog-repository/types.ts:104 |

***

### CatalogRepositoryUpdateParams

Defined in: services/catalog-repository/types.ts:110

Parameters for updating an existing catalog repository.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-6"></a> `name?` | `string` | Repository name. | services/catalog-repository/types.ts:112 |
| <a id="property-description-6"></a> `description?` | `string` | Repository description. | services/catalog-repository/types.ts:115 |
| <a id="property-url-2"></a> `url?` | `string` | Repository URL. | services/catalog-repository/types.ts:118 |
| <a id="property-user-4"></a> `user?` | `string` | Authentication username. | services/catalog-repository/types.ts:121 |
| <a id="property-password-2"></a> `password?` | `string` | Authentication password. | services/catalog-repository/types.ts:124 |
| <a id="property-allow_insecure-2"></a> `allow_insecure?` | `boolean` | Whether to allow insecure certificates. | services/catalog-repository/types.ts:127 |
| <a id="property-auto_refresh-2"></a> `auto_refresh?` | `boolean` | Whether to auto-refresh. | services/catalog-repository/types.ts:130 |
| <a id="property-max_tier-2"></a> `max_tier?` | [`CatalogMaxTier`](#catalogmaxtier) | Maximum storage tier. | services/catalog-repository/types.ts:133 |
| <a id="property-override_default_scope-2"></a> `override_default_scope?` | [`CatalogRepositoryOverrideScope`](#catalogrepositoryoverridescope) | Override default publishing scope. | services/catalog-repository/types.ts:136 |
| <a id="property-enabled-2"></a> `enabled?` | `boolean` | Whether the repository is enabled. | services/catalog-repository/types.ts:139 |

***

### Catalog

Defined in: services/catalog/types.ts:21

A VergeOS catalog resource.

Catalogs are containers for VM and tenant recipes, managed by the
repository refresh process. They cannot be created directly via the SDK.
Catalog keys are 40-character hex strings.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id"></a> `id?` | `string` | 40-character hex string identifier. Read-only. | - | services/catalog/types.ts:23 |
| <a id="property-repository"></a> `repository?` | [`FlexKey`](#flexkey) | Parent repository (FK to `catalog_repositories`). Read-only. | - | services/catalog/types.ts:26 |
| <a id="property-name-7"></a> `name` | `string` | Catalog name. 1–255 chars. | - | services/catalog/types.ts:29 |
| <a id="property-publishing_scope"></a> `publishing_scope?` | [`CatalogPublishingScope`](#catalogpublishingscope) | Publishing scope controlling visibility. Default: `"private"`. | - | services/catalog/types.ts:32 |
| <a id="property-description-7"></a> `description?` | `string` | Catalog description. 0–512 chars. | - | services/catalog/types.ts:35 |
| <a id="property-vm_recipes"></a> `vm_recipes?` | `unknown` | VM recipes in this catalog. | - | services/catalog/types.ts:38 |
| <a id="property-tenant_recipes"></a> `tenant_recipes?` | `unknown` | Tenant recipes in this catalog. | - | services/catalog/types.ts:41 |
| <a id="property-enabled-3"></a> `enabled?` | `boolean` | Whether the catalog is enabled. Default: `true`. | - | services/catalog/types.ts:44 |
| <a id="property-created-2"></a> `created?` | `number` | Creation timestamp. Read-only. | - | services/catalog/types.ts:47 |
| <a id="property-key-5"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### CatalogUpdateParams

Defined in: services/catalog/types.ts:53

Parameters for updating an existing catalog.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-8"></a> `name?` | `string` | Catalog name. | services/catalog/types.ts:55 |
| <a id="property-publishing_scope-1"></a> `publishing_scope?` | [`CatalogPublishingScope`](#catalogpublishingscope) | Publishing scope. | services/catalog/types.ts:58 |
| <a id="property-description-8"></a> `description?` | `string` | Catalog description. | services/catalog/types.ts:61 |
| <a id="property-enabled-4"></a> `enabled?` | `boolean` | Whether the catalog is enabled. | services/catalog/types.ts:64 |

***

### Certificate

Defined in: services/certificate/types.ts:20

A VergeOS TLS certificate resource.

Field names use snake_case to match the VergeOS API exactly.
The `public`, `private`, and `chain` fields are excluded from default
responses — use CertificateService.getWithKeys to include them.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-cert"></a> `cert?` | [`FlexKey`](#flexkey) | Internal cert reference (FK → `/sys/certs`). Read-only. | - | services/certificate/types.ts:22 |
| <a id="property-domain"></a> `domain?` | `string` | Primary domain for this certificate. Read-only. | - | services/certificate/types.ts:25 |
| <a id="property-domainname"></a> `domainname?` | `string` | Primary domain (alias field). Read-only. | - | services/certificate/types.ts:28 |
| <a id="property-domainlist"></a> `domainlist?` | `string` | Comma-separated list of additional domains (SANs). | - | services/certificate/types.ts:31 |
| <a id="property-description-9"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/certificate/types.ts:34 |
| <a id="property-public"></a> `public?` | `string` | Public certificate in PEM format. Only returned when explicitly requested. | - | services/certificate/types.ts:37 |
| <a id="property-private"></a> `private?` | `string` | Private key in PEM format. Only returned when explicitly requested. | - | services/certificate/types.ts:40 |
| <a id="property-chain"></a> `chain?` | `string` | Certificate chain in PEM format. Only returned when explicitly requested. | - | services/certificate/types.ts:43 |
| <a id="property-type-1"></a> `type?` | [`CertificateType`](#certificatetype) | Certificate provisioning type. Read-only. | - | services/certificate/types.ts:46 |
| <a id="property-acme_server"></a> `acme_server?` | `string` | ACME server URL for Let's Encrypt certificates. | - | services/certificate/types.ts:49 |
| <a id="property-eab_kid"></a> `eab_kid?` | `string` | Key Identifier for External Account Binding (ACME). | - | services/certificate/types.ts:52 |
| <a id="property-eab_hmac_key"></a> `eab_hmac_key?` | `string` | HMAC key for External Account Binding (ACME). | - | services/certificate/types.ts:55 |
| <a id="property-key_type"></a> `key_type?` | [`CertificateKeyType`](#certificatekeytype) | Cryptographic key type. | - | services/certificate/types.ts:58 |
| <a id="property-rsa_key_size"></a> `rsa_key_size?` | `string` | RSA key size (e.g., "2048", "4096"). | - | services/certificate/types.ts:61 |
| <a id="property-renew"></a> `renew?` | `boolean` | Whether to force certificate renewal. | - | services/certificate/types.ts:64 |
| <a id="property-contact"></a> `contact?` | [`FlexKey`](#flexkey) | Contact user for Let's Encrypt (FK → `users`). | - | services/certificate/types.ts:67 |
| <a id="property-agree_tos"></a> `agree_tos?` | `boolean` | Whether the user agreed to the ACME terms of service. | - | services/certificate/types.ts:70 |
| <a id="property-valid"></a> `valid?` | `boolean` | Whether the certificate is currently valid. Read-only. | - | services/certificate/types.ts:73 |
| <a id="property-autocreated"></a> `autocreated?` | `boolean` | Whether the certificate was auto-created. Read-only. | - | services/certificate/types.ts:76 |
| <a id="property-expires-4"></a> `expires?` | `number` | Certificate expiration timestamp (Unix epoch). Read-only. | - | services/certificate/types.ts:79 |
| <a id="property-modified-1"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/certificate/types.ts:82 |
| <a id="property-created-3"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/certificate/types.ts:85 |
| <a id="property-ignore_refresh"></a> `ignore_refresh?` | `boolean` | Internal flag. Read-only. | - | services/certificate/types.ts:88 |
| <a id="property-key-6"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### CertificateCreateParams

Defined in: services/certificate/types.ts:100

Parameters for creating a new TLS certificate.

For manual certificates, provide `public` and `private` PEM content.
For Let's Encrypt, set `type` to `'letsencrypt'` and provide `domainlist`.
For self-signed, set `type` to `'self_signed'`.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-domainlist-1"></a> `domainlist?` | `string` | Comma-separated list of domains (SANs). | services/certificate/types.ts:102 |
| <a id="property-description-10"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/certificate/types.ts:105 |
| <a id="property-type-2"></a> `type?` | [`CertificateType`](#certificatetype) | Certificate provisioning type. Default: `'manual'`. | services/certificate/types.ts:108 |
| <a id="property-public-1"></a> `public?` | `string` | Public certificate in PEM format (required for manual). | services/certificate/types.ts:111 |
| <a id="property-private-1"></a> `private?` | `string` | Private key in PEM format (required for manual). | services/certificate/types.ts:114 |
| <a id="property-chain-1"></a> `chain?` | `string` | Certificate chain in PEM format. | services/certificate/types.ts:117 |
| <a id="property-acme_server-1"></a> `acme_server?` | `string` | ACME server URL (for Let's Encrypt type). | services/certificate/types.ts:120 |
| <a id="property-eab_kid-1"></a> `eab_kid?` | `string` | Key Identifier for External Account Binding. | services/certificate/types.ts:123 |
| <a id="property-eab_hmac_key-1"></a> `eab_hmac_key?` | `string` | HMAC key for External Account Binding. | services/certificate/types.ts:126 |
| <a id="property-key_type-1"></a> `key_type?` | [`CertificateKeyType`](#certificatekeytype) | Cryptographic key type. | services/certificate/types.ts:129 |
| <a id="property-rsa_key_size-1"></a> `rsa_key_size?` | `string` | RSA key size. | services/certificate/types.ts:132 |
| <a id="property-contact-1"></a> `contact?` | [`FlexKey`](#flexkey) | Contact user ID for Let's Encrypt (FK → `users`). | services/certificate/types.ts:135 |
| <a id="property-agree_tos-1"></a> `agree_tos?` | `boolean` | Whether you agree to the ACME terms of service. | services/certificate/types.ts:138 |
| <a id="property-renew-1"></a> `renew?` | `boolean` | Whether to force renewal. | services/certificate/types.ts:141 |

***

### CertificateUpdateParams

Defined in: services/certificate/types.ts:153

Parameters for updating an existing TLS certificate.

All fields are optional — only provided fields are changed.
Read-only fields (`domain`, `domainname`, `type`, `valid`, `autocreated`,
`expires`, `created`, `modified`, `cert`, `ignore_refresh`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-domainlist-2"></a> `domainlist?` | `string` | Comma-separated list of domains (SANs). | services/certificate/types.ts:155 |
| <a id="property-description-11"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/certificate/types.ts:158 |
| <a id="property-public-2"></a> `public?` | `string` | Public certificate in PEM format. | services/certificate/types.ts:161 |
| <a id="property-private-2"></a> `private?` | `string` | Private key in PEM format. | services/certificate/types.ts:164 |
| <a id="property-chain-2"></a> `chain?` | `string` | Certificate chain in PEM format. | services/certificate/types.ts:167 |
| <a id="property-acme_server-2"></a> `acme_server?` | `string` | ACME server URL. | services/certificate/types.ts:170 |
| <a id="property-eab_kid-2"></a> `eab_kid?` | `string` | Key Identifier for External Account Binding. | services/certificate/types.ts:173 |
| <a id="property-eab_hmac_key-2"></a> `eab_hmac_key?` | `string` | HMAC key for External Account Binding. | services/certificate/types.ts:176 |
| <a id="property-key_type-2"></a> `key_type?` | [`CertificateKeyType`](#certificatekeytype) | Cryptographic key type. | services/certificate/types.ts:179 |
| <a id="property-rsa_key_size-2"></a> `rsa_key_size?` | `string` | RSA key size. | services/certificate/types.ts:182 |
| <a id="property-contact-2"></a> `contact?` | [`FlexKey`](#flexkey) | Contact user ID (FK → `users`). | services/certificate/types.ts:185 |
| <a id="property-agree_tos-2"></a> `agree_tos?` | `boolean` | Whether you agree to the ACME terms of service. | services/certificate/types.ts:188 |
| <a id="property-renew-2"></a> `renew?` | `boolean` | Whether to force renewal. | services/certificate/types.ts:191 |

***

### CloudInitFile

Defined in: services/cloud-init/types.ts:11

A cloud-init file template used by VM recipes and manual VM creation.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-id-1"></a> `id?` | `string` | - | services/cloud-init/types.ts:12 |
| <a id="property-owner-1"></a> `owner?` | [`FlexKey`](#flexkey) | - | services/cloud-init/types.ts:13 |
| <a id="property-name-9"></a> `name` | `string` | - | services/cloud-init/types.ts:14 |
| <a id="property-allocated_bytes"></a> `allocated_bytes?` | `number` | - | services/cloud-init/types.ts:15 |
| <a id="property-used_bytes"></a> `used_bytes?` | `number` | - | services/cloud-init/types.ts:16 |
| <a id="property-filesize"></a> `filesize?` | `number` | - | services/cloud-init/types.ts:17 |
| <a id="property-modified-2"></a> `modified?` | `number` | - | services/cloud-init/types.ts:18 |
| <a id="property-contents"></a> `contents?` | `string` | - | services/cloud-init/types.ts:19 |
| <a id="property-contains_variables"></a> `contains_variables?` | `boolean` | - | services/cloud-init/types.ts:20 |
| <a id="property-render"></a> `render?` | [`CloudInitFileRender`](#cloudinitfilerender) | - | services/cloud-init/types.ts:21 |
| <a id="property-creator"></a> `creator?` | `string` | - | services/cloud-init/types.ts:22 |
| <a id="property-key-7"></a> `$key` | [`FlexKey`](#flexkey) | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### CloudInitFileCreateParams

Defined in: services/cloud-init/types.ts:28

Parameters for creating a new cloud-init file.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-10"></a> `name` | `string` | File name (required, 1–256 chars). | services/cloud-init/types.ts:30 |
| <a id="property-contents-1"></a> `contents?` | `string` | File contents (max 65536 chars). | services/cloud-init/types.ts:32 |
| <a id="property-contains_variables-1"></a> `contains_variables?` | `boolean` | Whether the file contains template variables. | services/cloud-init/types.ts:34 |
| <a id="property-render-1"></a> `render?` | [`CloudInitFileRender`](#cloudinitfilerender) | Rendering mode. | services/cloud-init/types.ts:36 |

***

### CloudInitFileUpdateParams

Defined in: services/cloud-init/types.ts:42

Parameters for updating an existing cloud-init file.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-name-11"></a> `name?` | `string` | services/cloud-init/types.ts:43 |
| <a id="property-contents-2"></a> `contents?` | `string` | services/cloud-init/types.ts:44 |
| <a id="property-contains_variables-2"></a> `contains_variables?` | `boolean` | services/cloud-init/types.ts:45 |
| <a id="property-render-2"></a> `render?` | [`CloudInitFileRender`](#cloudinitfilerender) | services/cloud-init/types.ts:46 |

***

### CloudSnapshotTenant

Defined in: services/cloud-snapshot-tenant/types.ts:19

A tenant captured within a VergeOS cloud snapshot.

Cloud snapshot tenants are read-only records representing the tenants that
existed at the time a cloud snapshot was taken. Use these records to
browse snapshot contents or recover individual tenants.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-cloud_snapshot"></a> `cloud_snapshot` | [`FlexKey`](#flexkey) | FK to the parent cloud snapshot. Read-only. | - | services/cloud-snapshot-tenant/types.ts:21 |
| <a id="property-original_key"></a> `original_key` | `number` | Original tenant key at the time the snapshot was taken. Read-only. | - | services/cloud-snapshot-tenant/types.ts:24 |
| <a id="property-name-12"></a> `name` | `string` | Tenant name at the time of snapshot. Read-only. | - | services/cloud-snapshot-tenant/types.ts:27 |
| <a id="property-description-12"></a> `description?` | `string` | Tenant description at the time of snapshot. Read-only. | - | services/cloud-snapshot-tenant/types.ts:30 |
| <a id="property-uuid"></a> `uuid?` | `string` | Tenant UUID. Read-only. | - | services/cloud-snapshot-tenant/types.ts:33 |
| <a id="property-nodes"></a> `nodes?` | `number` | Number of nodes assigned to the tenant. Read-only. | - | services/cloud-snapshot-tenant/types.ts:36 |
| <a id="property-cpu_cores"></a> `cpu_cores?` | `number` | Number of CPU cores assigned to the tenant. Read-only. | - | services/cloud-snapshot-tenant/types.ts:39 |
| <a id="property-ram"></a> `ram?` | `number` | RAM assigned to the tenant in bytes. Read-only. | - | services/cloud-snapshot-tenant/types.ts:42 |
| <a id="property-is_snapshot"></a> `is_snapshot?` | `boolean` | Whether this entry itself is a snapshot. | - | services/cloud-snapshot-tenant/types.ts:45 |
| <a id="property-status-2"></a> `status?` | [`CloudSnapshotTenantStatus`](#cloudsnapshottenantstatus) | Import/recovery status. | - | services/cloud-snapshot-tenant/types.ts:48 |
| <a id="property-status_info"></a> `status_info?` | `string` | Additional status information (e.g., error details). | - | services/cloud-snapshot-tenant/types.ts:51 |
| <a id="property-key-8"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### CloudSnapshotVM

Defined in: services/cloud-snapshot-vm/types.ts:19

A VM captured within a VergeOS cloud snapshot.

Cloud snapshot VMs are read-only records representing the VMs that
existed at the time a cloud snapshot was taken. Use these records to
browse snapshot contents or recover individual VMs.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-cloud_snapshot-1"></a> `cloud_snapshot` | [`FlexKey`](#flexkey) | FK to the parent cloud snapshot. Read-only. | - | services/cloud-snapshot-vm/types.ts:21 |
| <a id="property-original_key-1"></a> `original_key` | `number` | Original VM key at the time the snapshot was taken. Read-only. | - | services/cloud-snapshot-vm/types.ts:24 |
| <a id="property-name-13"></a> `name` | `string` | VM name at the time of snapshot. Read-only. | - | services/cloud-snapshot-vm/types.ts:27 |
| <a id="property-description-13"></a> `description?` | `string` | VM description at the time of snapshot. Read-only. | - | services/cloud-snapshot-vm/types.ts:30 |
| <a id="property-uuid-1"></a> `uuid?` | `string` | VM UUID. Read-only. | - | services/cloud-snapshot-vm/types.ts:33 |
| <a id="property-machine_uuid"></a> `machine_uuid?` | `string` | Machine UUID of the VM. Read-only. | - | services/cloud-snapshot-vm/types.ts:36 |
| <a id="property-cpu_cores-1"></a> `cpu_cores?` | `number` | Number of CPU cores assigned to the VM. Read-only. | - | services/cloud-snapshot-vm/types.ts:39 |
| <a id="property-ram-1"></a> `ram?` | `number` | RAM assigned to the VM in bytes. Read-only. | - | services/cloud-snapshot-vm/types.ts:42 |
| <a id="property-os_family"></a> `os_family?` | `string` | OS family of the VM (e.g., "linux", "windows"). Read-only. | - | services/cloud-snapshot-vm/types.ts:45 |
| <a id="property-is_snapshot-1"></a> `is_snapshot?` | `boolean` | Whether this entry itself is a snapshot. | - | services/cloud-snapshot-vm/types.ts:48 |
| <a id="property-status-3"></a> `status?` | [`CloudSnapshotVMStatus`](#cloudsnapshotvmstatus) | Import/recovery status. | - | services/cloud-snapshot-vm/types.ts:51 |
| <a id="property-status_info-1"></a> `status_info?` | `string` | Additional status information (e.g., error details). | - | services/cloud-snapshot-vm/types.ts:54 |
| <a id="property-key-9"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### CloudSnapshot

Defined in: services/cloud-snapshot/types.ts:13

A VergeOS cloud snapshot resource.

Cloud snapshots are system-level point-in-time captures that preserve
VMs, tenants, and volumes. They form the foundation of VergeOS DR.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-14"></a> `name` | `string` | Snapshot name. Unique, 1-128 characters. Read-only after creation. | - | services/cloud-snapshot/types.ts:15 |
| <a id="property-created-4"></a> `created?` | `number` | Creation timestamp (epoch seconds). Read-only. | - | services/cloud-snapshot/types.ts:18 |
| <a id="property-description-14"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/cloud-snapshot/types.ts:21 |
| <a id="property-snapshot_profile"></a> `snapshot_profile?` | [`FlexKey`](#flexkey) | FK to the snapshot profile that created this snapshot. | - | services/cloud-snapshot/types.ts:24 |
| <a id="property-snapshot_period"></a> `snapshot_period?` | [`FlexKey`](#flexkey) | FK to the snapshot profile period that triggered this snapshot. | - | services/cloud-snapshot/types.ts:27 |
| <a id="property-schedule_task"></a> `schedule_task?` | [`FlexKey`](#flexkey) | FK to the scheduled task that created this snapshot. | - | services/cloud-snapshot/types.ts:30 |
| <a id="property-task"></a> `task?` | [`FlexKey`](#flexkey) | FK to the task currently operating on this snapshot. | - | services/cloud-snapshot/types.ts:33 |
| <a id="property-expires_type-3"></a> `expires_type?` | [`CloudSnapshotExpiresType`](#cloudsnapshotexpirestype) | Expiration type. `"date"` expires at the `expires` timestamp; `"never"` does not expire. Default: `"date"`. | - | services/cloud-snapshot/types.ts:36 |
| <a id="property-expires-5"></a> `expires?` | `number` | Expiration timestamp (epoch seconds). Only meaningful when `expires_type` is `"date"`. | - | services/cloud-snapshot/types.ts:39 |
| <a id="property-provider"></a> `provider?` | `boolean` | Whether this snapshot is provided to other sites. | - | services/cloud-snapshot/types.ts:42 |
| <a id="property-private-3"></a> `private?` | `boolean` | Whether this snapshot is private (not visible to tenants). | - | services/cloud-snapshot/types.ts:45 |
| <a id="property-remote_sync"></a> `remote_sync?` | `boolean` | Whether this snapshot is synced to a remote site. | - | services/cloud-snapshot/types.ts:48 |
| <a id="property-incoming_sync"></a> `incoming_sync?` | [`FlexKey`](#flexkey) | FK to the incoming sync that received this snapshot. | - | services/cloud-snapshot/types.ts:51 |
| <a id="property-immutable"></a> `immutable?` | `boolean` | Whether this snapshot is immutable (cannot be deleted until lock expires). | - | services/cloud-snapshot/types.ts:54 |
| <a id="property-immutable_status"></a> `immutable_status?` | [`CloudSnapshotImmutableStatus`](#cloudsnapshotimmutablestatus) | Current immutability lock status. Read-only. | - | services/cloud-snapshot/types.ts:57 |
| <a id="property-immutable_lock_expires"></a> `immutable_lock_expires?` | `number` | Timestamp when the immutability lock expires (epoch seconds). Read-only. | - | services/cloud-snapshot/types.ts:60 |
| <a id="property-status-4"></a> `status?` | [`CloudSnapshotStatus`](#cloudsnapshotstatus) | Snapshot status. | - | services/cloud-snapshot/types.ts:63 |
| <a id="property-status_info-2"></a> `status_info?` | `string` | Additional status information. | - | services/cloud-snapshot/types.ts:66 |
| <a id="property-key-10"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### CloudSnapshotCreateParams

Defined in: services/cloud-snapshot/types.ts:88

Parameters for creating a new cloud snapshot.

Cloud snapshot creation uses a table action (`POST /cloud_snapshots?action=create`)
rather than a standard POST.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-15"></a> `name` | `string` | Snapshot name. Required. Unique, 1-128 characters. | services/cloud-snapshot/types.ts:90 |
| <a id="property-description-15"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/cloud-snapshot/types.ts:93 |
| <a id="property-retention"></a> `retention?` | `number` | Retention period in seconds. Default: 259200 (3 days). | services/cloud-snapshot/types.ts:96 |
| <a id="property-min_snapshots"></a> `min_snapshots?` | `number` | Minimum number of snapshots to retain. Default: 1. | services/cloud-snapshot/types.ts:99 |
| <a id="property-immutable-1"></a> `immutable?` | `boolean` | Whether the snapshot should be immutable (locked from deletion). | services/cloud-snapshot/types.ts:102 |
| <a id="property-private-4"></a> `private?` | `boolean` | Whether the snapshot is private (not visible to tenants). | services/cloud-snapshot/types.ts:105 |

***

### CloudSnapshotUpdateParams

Defined in: services/cloud-snapshot/types.ts:116

Parameters for updating an existing cloud snapshot.

Note: `name` and `immutable_lock_expires` are read-only and cannot be updated.
All fields are optional — only provided fields are changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-description-16"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/cloud-snapshot/types.ts:118 |
| <a id="property-expires-6"></a> `expires?` | `number` | Expiration timestamp (epoch seconds). | services/cloud-snapshot/types.ts:121 |
| <a id="property-expires_type-4"></a> `expires_type?` | [`CloudSnapshotExpiresType`](#cloudsnapshotexpirestype) | Expiration type. `"date"` or `"never"`. | services/cloud-snapshot/types.ts:124 |
| <a id="property-private-5"></a> `private?` | `boolean` | Whether this snapshot is private (not visible to tenants). | services/cloud-snapshot/types.ts:127 |
| <a id="property-immutable-2"></a> `immutable?` | `boolean` | Whether this snapshot is immutable. | services/cloud-snapshot/types.ts:130 |
| <a id="property-status-5"></a> `status?` | [`CloudSnapshotStatus`](#cloudsnapshotstatus) | Snapshot status. | services/cloud-snapshot/types.ts:133 |
| <a id="property-status_info-3"></a> `status_info?` | `string` | Additional status information. | services/cloud-snapshot/types.ts:136 |
| <a id="property-provider-1"></a> `provider?` | `boolean` | Whether this snapshot is provided to other sites. | services/cloud-snapshot/types.ts:139 |
| <a id="property-remote_sync-1"></a> `remote_sync?` | `boolean` | Whether this snapshot is synced to a remote site. | services/cloud-snapshot/types.ts:142 |

***

### ClusterTierStats

Defined in: services/cluster-tier-stats/types.ts:14

A VergeOS cluster tier stats resource.

Provides I/O metrics for a per-cluster storage tier. Each cluster tier
has one stats row that is continuously updated by the system. This is
a read-only monitoring resource.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-tier"></a> `tier` | [`FlexKey`](#flexkey) | Parent cluster tier reference (FK to `cluster_tiers`). | - | services/cluster-tier-stats/types.ts:16 |
| <a id="property-rops"></a> `rops?` | `number` | Read operations per second. | - | services/cluster-tier-stats/types.ts:19 |
| <a id="property-wops"></a> `wops?` | `number` | Write operations per second. | - | services/cluster-tier-stats/types.ts:22 |
| <a id="property-rbps"></a> `rbps?` | `number` | Read bytes per second. | - | services/cluster-tier-stats/types.ts:25 |
| <a id="property-wbps"></a> `wbps?` | `number` | Write bytes per second. | - | services/cluster-tier-stats/types.ts:28 |
| <a id="property-reads"></a> `reads?` | `number` | Total read operations. | - | services/cluster-tier-stats/types.ts:31 |
| <a id="property-writes"></a> `writes?` | `number` | Total write operations. | - | services/cluster-tier-stats/types.ts:34 |
| <a id="property-read_bytes"></a> `read_bytes?` | `number` | Total bytes read. | - | services/cluster-tier-stats/types.ts:37 |
| <a id="property-write_bytes"></a> `write_bytes?` | `number` | Total bytes written. | - | services/cluster-tier-stats/types.ts:40 |
| <a id="property-last_update"></a> `last_update?` | `number` | Last update timestamp (Unix epoch). Read-only. | - | services/cluster-tier-stats/types.ts:43 |
| <a id="property-key-11"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### ClusterTierStatus

Defined in: services/cluster-tier-status/types.ts:37

A VergeOS cluster tier status resource.

Provides health, redundancy, and repair state for a per-cluster storage tier.
Each cluster tier has one status row that is continuously updated by the system.
This is a read-only monitoring resource.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-tier-1"></a> `tier` | [`FlexKey`](#flexkey) | Parent cluster tier reference (FK to `cluster_tiers`). | - | services/cluster-tier-status/types.ts:39 |
| <a id="property-status-6"></a> `status?` | [`ClusterTierStatusValue`](#clustertierstatusvalue) | Current operational status of the cluster tier. | - | services/cluster-tier-status/types.ts:42 |
| <a id="property-state"></a> `state?` | [`ClusterTierState`](#clustertierstate) | High-level health state for dashboard display. | - | services/cluster-tier-status/types.ts:45 |
| <a id="property-capacity"></a> `capacity?` | `number` | Total capacity in bytes. | - | services/cluster-tier-status/types.ts:48 |
| <a id="property-used"></a> `used?` | `number` | Used space in bytes. | - | services/cluster-tier-status/types.ts:51 |
| <a id="property-used_pct"></a> `used_pct?` | `number` | Used space as a percentage of capacity. Read-only. | - | services/cluster-tier-status/types.ts:54 |
| <a id="property-redundant"></a> `redundant?` | `boolean` | Whether the tier has redundancy enabled. | - | services/cluster-tier-status/types.ts:57 |
| <a id="property-encrypted"></a> `encrypted?` | `boolean` | Whether the tier is encrypted. | - | services/cluster-tier-status/types.ts:60 |
| <a id="property-working"></a> `working?` | `boolean` | Whether the tier is currently performing work (repair/verify). | - | services/cluster-tier-status/types.ts:63 |
| <a id="property-last_walk_time_ms"></a> `last_walk_time_ms?` | `number` | Duration of the last walk operation in milliseconds. | - | services/cluster-tier-status/types.ts:66 |
| <a id="property-last_fullwalk_time_ms"></a> `last_fullwalk_time_ms?` | `number` | Duration of the last full walk operation in milliseconds. | - | services/cluster-tier-status/types.ts:69 |
| <a id="property-transaction"></a> `transaction?` | `number` | Current transaction counter. | - | services/cluster-tier-status/types.ts:72 |
| <a id="property-repairs"></a> `repairs?` | `number` | Number of repairs performed. | - | services/cluster-tier-status/types.ts:75 |
| <a id="property-bad_drives"></a> `bad_drives?` | `number` | Number of bad drives detected. | - | services/cluster-tier-status/types.ts:78 |
| <a id="property-fullwalk"></a> `fullwalk?` | `boolean` | Whether a full walk is in progress. | - | services/cluster-tier-status/types.ts:81 |
| <a id="property-progress"></a> `progress?` | `number` | Progress of current operation (0-100). | - | services/cluster-tier-status/types.ts:84 |
| <a id="property-index_unique"></a> `index_unique?` | `number` | Number of unique index entries. | - | services/cluster-tier-status/types.ts:87 |
| <a id="property-state_timestamp"></a> `state_timestamp?` | `number` | Timestamp of last state change (Unix epoch). | - | services/cluster-tier-status/types.ts:90 |
| <a id="property-cur_space_throttle_ms"></a> `cur_space_throttle_ms?` | `number` | Current space throttle delay in milliseconds. | - | services/cluster-tier-status/types.ts:93 |
| <a id="property-transaction_start_stamp"></a> `transaction_start_stamp?` | `number` | Timestamp when the current transaction started (Unix epoch). | - | services/cluster-tier-status/types.ts:96 |
| <a id="property-key-12"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### ClusterTier

Defined in: services/cluster-tier/types.ts:17

A VergeOS cluster tier resource.

Cluster tiers are per-cluster breakdowns of vSAN storage tiers. Each cluster
may have up to 6 tiers (0-5), providing cluster-specific capacity, cost, and
performance data. This is a read-only monitoring resource.

Related child resources: [ClusterTierStats](#clustertierstats) for I/O metrics,
[ClusterTierStatus](#clustertierstatus) for health/redundancy state.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-cluster"></a> `cluster` | [`FlexKey`](#flexkey) | FK to the parent cluster. | - | services/cluster-tier/types.ts:19 |
| <a id="property-tier-2"></a> `tier` | `number` | Tier number (0-5). | - | services/cluster-tier/types.ts:22 |
| <a id="property-description-17"></a> `description?` | `string` | Human-readable tier description. | - | services/cluster-tier/types.ts:25 |
| <a id="property-cost_per_gb"></a> `cost_per_gb?` | `number` | Cost per GB for this tier. | - | services/cluster-tier/types.ts:28 |
| <a id="property-price_per_gb"></a> `price_per_gb?` | `number` | Price per GB for this tier. | - | services/cluster-tier/types.ts:31 |
| <a id="property-status-7"></a> `status?` | [`FlexKey`](#flexkey) | Tier status FK (to `cluster_tier_status`). Read-only. | - | services/cluster-tier/types.ts:34 |
| <a id="property-stats"></a> `stats?` | [`FlexKey`](#flexkey) | Tier stats FK (to `cluster_tier_stats`). Read-only. | - | services/cluster-tier/types.ts:37 |
| <a id="property-dashboard"></a> `dashboard?` | [`FlexKey`](#flexkey) | Tier dashboard FK (to `cluster_tier_dashboards`). Read-only. | - | services/cluster-tier/types.ts:40 |
| <a id="property-key-13"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### Cluster

Defined in: services/cluster/types.ts:62

VergeOS cluster resource.

Clusters group physical nodes for compute and/or storage purposes.
A system typically has at least one storage cluster and one or more
compute clusters.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-system"></a> `system?` | [`FlexKey`](#flexkey) | Parent system FK. | - | services/cluster/types.ts:64 |
| <a id="property-name-16"></a> `name` | `string` | Cluster name (unique, 1–128 chars). | - | services/cluster/types.ts:66 |
| <a id="property-id-2"></a> `id?` | `string` | 40-character unique cluster ID. | - | services/cluster/types.ts:68 |
| <a id="property-description-18"></a> `description?` | `string` | Cluster description (up to 2048 chars). | - | services/cluster/types.ts:70 |
| <a id="property-enabled-5"></a> `enabled?` | `boolean` | Whether the cluster is enabled. | - | services/cluster/types.ts:72 |
| <a id="property-created-5"></a> `created?` | `number` | Creation timestamp (epoch seconds). | - | services/cluster/types.ts:74 |
| <a id="property-storage"></a> `storage?` | `boolean` | Whether this is a storage cluster (read-only, system-set). | - | services/cluster/types.ts:76 |
| <a id="property-compute"></a> `compute?` | `boolean` | Whether this cluster provides compute resources. | - | services/cluster/types.ts:78 |
| <a id="property-kvm_nested"></a> `kvm_nested?` | `boolean` | Enable nested virtualization (KVM-in-KVM). | - | services/cluster/types.ts:80 |
| <a id="property-allow_nested_virt_migration"></a> `allow_nested_virt_migration?` | `boolean` | Allow live migration of nested-virt VMs. | - | services/cluster/types.ts:82 |
| <a id="property-allow_vgpu_migration"></a> `allow_vgpu_migration?` | `boolean` | Allow live migration of vGPU VMs. | - | services/cluster/types.ts:84 |
| <a id="property-enable_split_lock_detection"></a> `enable_split_lock_detection?` | `boolean` | Enable split lock detection. | - | services/cluster/types.ts:86 |
| <a id="property-recommended_cpu_type"></a> `recommended_cpu_type?` | [`CpuType`](#cputype) | Auto-detected recommended CPU type (locked after detection). | - | services/cluster/types.ts:88 |
| <a id="property-default_cpu"></a> `default_cpu?` | [`CpuType`](#cputype) | Default CPU type for new VMs. | - | services/cluster/types.ts:90 |
| <a id="property-disable_cpu_security_mitigations"></a> `disable_cpu_security_mitigations?` | `boolean` | Disable CPU security mitigations (Spectre/Meltdown). | - | services/cluster/types.ts:92 |
| <a id="property-spec_store_bypass_disable"></a> `spec_store_bypass_disable?` | `boolean` | Disable speculative store bypass. | - | services/cluster/types.ts:94 |
| <a id="property-disable_smt"></a> `disable_smt?` | `boolean` | Disable simultaneous multithreading (Hyper-Threading). | - | services/cluster/types.ts:96 |
| <a id="property-enable_nvme_power_management"></a> `enable_nvme_power_management?` | `boolean` | Enable NVMe power management. | - | services/cluster/types.ts:98 |
| <a id="property-x86_energy_perf_policy"></a> `x86_energy_perf_policy?` | [`EnergyPerfPolicy`](#energyperfpolicy) | Energy-performance policy. | - | services/cluster/types.ts:100 |
| <a id="property-scaling_governor"></a> `scaling_governor?` | [`ScalingGovernor`](#scalinggovernor) | CPU scaling governor. | - | services/cluster/types.ts:102 |
| <a id="property-ram_per_unit"></a> `ram_per_unit?` | `number` | RAM per resource unit (MB). | - | services/cluster/types.ts:104 |
| <a id="property-cores_per_unit"></a> `cores_per_unit?` | `number` | Cores per resource unit. | - | services/cluster/types.ts:106 |
| <a id="property-cost_per_unit"></a> `cost_per_unit?` | `number` | Cost per resource unit. | - | services/cluster/types.ts:108 |
| <a id="property-price_per_unit"></a> `price_per_unit?` | `number` | Price per resource unit. | - | services/cluster/types.ts:110 |
| <a id="property-max_ram_per_vm"></a> `max_ram_per_vm?` | `number` | Maximum RAM per VM (MB). | - | services/cluster/types.ts:112 |
| <a id="property-max_cores_per_vm"></a> `max_cores_per_vm?` | `number` | Maximum cores per VM. | - | services/cluster/types.ts:114 |
| <a id="property-storage_cachesize"></a> `storage_cachesize?` | `number` | Storage cache size per node (MB). | - | services/cluster/types.ts:116 |
| <a id="property-storage_buffersize"></a> `storage_buffersize?` | `number` | Storage buffer size per node (MB). | - | services/cluster/types.ts:118 |
| <a id="property-storage_hugepages"></a> `storage_hugepages?` | `boolean` | Allocate hugepages for storage. | - | services/cluster/types.ts:120 |
| <a id="property-target_ram_pct"></a> `target_ram_pct?` | `number` | Target maximum RAM utilization percentage. | - | services/cluster/types.ts:122 |
| <a id="property-ram_overcommit_pct"></a> `ram_overcommit_pct?` | `number` | Percentage of reserve RAM available for VMs. | - | services/cluster/types.ts:124 |
| <a id="property-swap_tier"></a> `swap_tier?` | `number` | Tier used for swap (-1 = disabled, 0–5). | - | services/cluster/types.ts:126 |
| <a id="property-swap_per_drive"></a> `swap_per_drive?` | `number` | Swap space per drive (MB). | - | services/cluster/types.ts:128 |
| <a id="property-log_filter"></a> `log_filter?` | `string` | System log filter string. | - | services/cluster/types.ts:130 |
| <a id="property-max_core_temp"></a> `max_core_temp?` | `number` | Maximum core temperature (Celsius, 0 = disabled). | - | services/cluster/types.ts:132 |
| <a id="property-max_core_temp_warn_perc"></a> `max_core_temp_warn_perc?` | `number` | Maximum core temperature warning threshold percentage. | - | services/cluster/types.ts:134 |
| <a id="property-critical_core_temp"></a> `critical_core_temp?` | `number` | Critical core temperature (Celsius, 0 = disabled). | - | services/cluster/types.ts:136 |
| <a id="property-disable_sleep"></a> `disable_sleep?` | `boolean` | Disable CPU sleep states. | - | services/cluster/types.ts:138 |
| <a id="property-status-8"></a> `status?` | [`FlexKey`](#flexkey) | Cluster status FK. | - | services/cluster/types.ts:140 |
| <a id="property-key-14"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### ClusterCreateParams

Defined in: services/cluster/types.ts:148

Parameters for creating a new cluster.

Excludes read-only fields: `system`, `created`, `storage`, `recommended_cpu_type`, `status`.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-17"></a> `name` | `string` | Cluster name (required, unique, 1–128 chars). | services/cluster/types.ts:150 |
| <a id="property-description-19"></a> `description?` | `string` | Cluster description. | services/cluster/types.ts:152 |
| <a id="property-enabled-6"></a> `enabled?` | `boolean` | Whether the cluster is enabled (default: `true`). | services/cluster/types.ts:154 |
| <a id="property-compute-1"></a> `compute?` | `boolean` | Whether this cluster provides compute resources. | services/cluster/types.ts:156 |
| <a id="property-kvm_nested-1"></a> `kvm_nested?` | `boolean` | Enable nested virtualization. | services/cluster/types.ts:158 |
| <a id="property-allow_nested_virt_migration-1"></a> `allow_nested_virt_migration?` | `boolean` | Allow live migration of nested-virt VMs. | services/cluster/types.ts:160 |
| <a id="property-allow_vgpu_migration-1"></a> `allow_vgpu_migration?` | `boolean` | Allow live migration of vGPU VMs. | services/cluster/types.ts:162 |
| <a id="property-enable_split_lock_detection-1"></a> `enable_split_lock_detection?` | `boolean` | Enable split lock detection. | services/cluster/types.ts:164 |
| <a id="property-default_cpu-1"></a> `default_cpu?` | [`CpuType`](#cputype) | Default CPU type for new VMs. | services/cluster/types.ts:166 |
| <a id="property-disable_cpu_security_mitigations-1"></a> `disable_cpu_security_mitigations?` | `boolean` | Disable CPU security mitigations. | services/cluster/types.ts:168 |
| <a id="property-spec_store_bypass_disable-1"></a> `spec_store_bypass_disable?` | `boolean` | Disable speculative store bypass. | services/cluster/types.ts:170 |
| <a id="property-disable_smt-1"></a> `disable_smt?` | `boolean` | Disable SMT. | services/cluster/types.ts:172 |
| <a id="property-enable_nvme_power_management-1"></a> `enable_nvme_power_management?` | `boolean` | Enable NVMe power management. | services/cluster/types.ts:174 |
| <a id="property-x86_energy_perf_policy-1"></a> `x86_energy_perf_policy?` | [`EnergyPerfPolicy`](#energyperfpolicy) | Energy-performance policy. | services/cluster/types.ts:176 |
| <a id="property-scaling_governor-1"></a> `scaling_governor?` | [`ScalingGovernor`](#scalinggovernor) | CPU scaling governor. | services/cluster/types.ts:178 |
| <a id="property-ram_per_unit-1"></a> `ram_per_unit?` | `number` | RAM per resource unit (MB). | services/cluster/types.ts:180 |
| <a id="property-cores_per_unit-1"></a> `cores_per_unit?` | `number` | Cores per resource unit. | services/cluster/types.ts:182 |
| <a id="property-cost_per_unit-1"></a> `cost_per_unit?` | `number` | Cost per resource unit. | services/cluster/types.ts:184 |
| <a id="property-price_per_unit-1"></a> `price_per_unit?` | `number` | Price per resource unit. | services/cluster/types.ts:186 |
| <a id="property-max_ram_per_vm-1"></a> `max_ram_per_vm?` | `number` | Maximum RAM per VM (MB). | services/cluster/types.ts:188 |
| <a id="property-max_cores_per_vm-1"></a> `max_cores_per_vm?` | `number` | Maximum cores per VM. | services/cluster/types.ts:190 |
| <a id="property-storage_cachesize-1"></a> `storage_cachesize?` | `number` | Storage cache per node (MB). | services/cluster/types.ts:192 |
| <a id="property-storage_buffersize-1"></a> `storage_buffersize?` | `number` | Storage buffer per node (MB). | services/cluster/types.ts:194 |
| <a id="property-storage_hugepages-1"></a> `storage_hugepages?` | `boolean` | Allocate hugepages for storage. | services/cluster/types.ts:196 |
| <a id="property-target_ram_pct-1"></a> `target_ram_pct?` | `number` | Target max RAM utilization percentage. | services/cluster/types.ts:198 |
| <a id="property-ram_overcommit_pct-1"></a> `ram_overcommit_pct?` | `number` | Percentage of reserve RAM available for VMs. | services/cluster/types.ts:200 |
| <a id="property-swap_tier-1"></a> `swap_tier?` | `number` | Tier used for swap (-1 = disabled). | services/cluster/types.ts:202 |
| <a id="property-swap_per_drive-1"></a> `swap_per_drive?` | `number` | Swap per drive (MB). | services/cluster/types.ts:204 |
| <a id="property-log_filter-1"></a> `log_filter?` | `string` | System log filter string. | services/cluster/types.ts:206 |
| <a id="property-max_core_temp-1"></a> `max_core_temp?` | `number` | Maximum core temperature (Celsius). | services/cluster/types.ts:208 |
| <a id="property-max_core_temp_warn_perc-1"></a> `max_core_temp_warn_perc?` | `number` | Maximum core temperature warning threshold %. | services/cluster/types.ts:210 |
| <a id="property-critical_core_temp-1"></a> `critical_core_temp?` | `number` | Critical core temperature (Celsius). | services/cluster/types.ts:212 |
| <a id="property-disable_sleep-1"></a> `disable_sleep?` | `boolean` | Disable CPU sleep states. | services/cluster/types.ts:214 |

***

### ClusterUpdateParams

Defined in: services/cluster/types.ts:223

Parameters for updating a cluster.

All fields optional. Excludes read-only fields: `system`, `created`, `storage`,
`recommended_cpu_type`, `status`.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-18"></a> `name?` | `string` | Cluster name. | services/cluster/types.ts:225 |
| <a id="property-description-20"></a> `description?` | `string` | Cluster description. | services/cluster/types.ts:227 |
| <a id="property-enabled-7"></a> `enabled?` | `boolean` | Whether the cluster is enabled. | services/cluster/types.ts:229 |
| <a id="property-compute-2"></a> `compute?` | `boolean` | Whether this cluster provides compute resources. | services/cluster/types.ts:231 |
| <a id="property-kvm_nested-2"></a> `kvm_nested?` | `boolean` | Enable nested virtualization. | services/cluster/types.ts:233 |
| <a id="property-allow_nested_virt_migration-2"></a> `allow_nested_virt_migration?` | `boolean` | Allow live migration of nested-virt VMs. | services/cluster/types.ts:235 |
| <a id="property-allow_vgpu_migration-2"></a> `allow_vgpu_migration?` | `boolean` | Allow live migration of vGPU VMs. | services/cluster/types.ts:237 |
| <a id="property-enable_split_lock_detection-2"></a> `enable_split_lock_detection?` | `boolean` | Enable split lock detection. | services/cluster/types.ts:239 |
| <a id="property-default_cpu-2"></a> `default_cpu?` | [`CpuType`](#cputype) | Default CPU type for new VMs. | services/cluster/types.ts:241 |
| <a id="property-disable_cpu_security_mitigations-2"></a> `disable_cpu_security_mitigations?` | `boolean` | Disable CPU security mitigations. | services/cluster/types.ts:243 |
| <a id="property-spec_store_bypass_disable-2"></a> `spec_store_bypass_disable?` | `boolean` | Disable speculative store bypass. | services/cluster/types.ts:245 |
| <a id="property-disable_smt-2"></a> `disable_smt?` | `boolean` | Disable SMT. | services/cluster/types.ts:247 |
| <a id="property-enable_nvme_power_management-2"></a> `enable_nvme_power_management?` | `boolean` | Enable NVMe power management. | services/cluster/types.ts:249 |
| <a id="property-x86_energy_perf_policy-2"></a> `x86_energy_perf_policy?` | [`EnergyPerfPolicy`](#energyperfpolicy) | Energy-performance policy. | services/cluster/types.ts:251 |
| <a id="property-scaling_governor-2"></a> `scaling_governor?` | [`ScalingGovernor`](#scalinggovernor) | CPU scaling governor. | services/cluster/types.ts:253 |
| <a id="property-ram_per_unit-2"></a> `ram_per_unit?` | `number` | RAM per resource unit (MB). | services/cluster/types.ts:255 |
| <a id="property-cores_per_unit-2"></a> `cores_per_unit?` | `number` | Cores per resource unit. | services/cluster/types.ts:257 |
| <a id="property-cost_per_unit-2"></a> `cost_per_unit?` | `number` | Cost per resource unit. | services/cluster/types.ts:259 |
| <a id="property-price_per_unit-2"></a> `price_per_unit?` | `number` | Price per resource unit. | services/cluster/types.ts:261 |
| <a id="property-max_ram_per_vm-2"></a> `max_ram_per_vm?` | `number` | Maximum RAM per VM (MB). | services/cluster/types.ts:263 |
| <a id="property-max_cores_per_vm-2"></a> `max_cores_per_vm?` | `number` | Maximum cores per VM. | services/cluster/types.ts:265 |
| <a id="property-storage_cachesize-2"></a> `storage_cachesize?` | `number` | Storage cache per node (MB). | services/cluster/types.ts:267 |
| <a id="property-storage_buffersize-2"></a> `storage_buffersize?` | `number` | Storage buffer per node (MB). | services/cluster/types.ts:269 |
| <a id="property-storage_hugepages-2"></a> `storage_hugepages?` | `boolean` | Allocate hugepages for storage. | services/cluster/types.ts:271 |
| <a id="property-target_ram_pct-2"></a> `target_ram_pct?` | `number` | Target max RAM utilization percentage. | services/cluster/types.ts:273 |
| <a id="property-ram_overcommit_pct-2"></a> `ram_overcommit_pct?` | `number` | Percentage of reserve RAM available for VMs. | services/cluster/types.ts:275 |
| <a id="property-swap_tier-2"></a> `swap_tier?` | `number` | Tier used for swap (-1 = disabled). | services/cluster/types.ts:277 |
| <a id="property-swap_per_drive-2"></a> `swap_per_drive?` | `number` | Swap per drive (MB). | services/cluster/types.ts:279 |
| <a id="property-log_filter-2"></a> `log_filter?` | `string` | System log filter string. | services/cluster/types.ts:281 |
| <a id="property-max_core_temp-2"></a> `max_core_temp?` | `number` | Maximum core temperature (Celsius). | services/cluster/types.ts:283 |
| <a id="property-max_core_temp_warn_perc-2"></a> `max_core_temp_warn_perc?` | `number` | Maximum core temperature warning threshold %. | services/cluster/types.ts:285 |
| <a id="property-critical_core_temp-2"></a> `critical_core_temp?` | `number` | Critical core temperature (Celsius). | services/cluster/types.ts:287 |
| <a id="property-disable_sleep-2"></a> `disable_sleep?` | `boolean` | Disable CPU sleep states. | services/cluster/types.ts:289 |

***

### VgFile

Defined in: services/file/types.ts:48

A file resource in VergeOS.

Uses `VgFile` to avoid collision with the global `File` type.
Represents file metadata (name, type, size, etc.). Actual file
content is uploaded/downloaded via separate methods.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Overrides | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-key-15"></a> `$key` | [`FlexKey`](#flexkey) | Unique file identifier. | [`Resource`](#resource).[`$key`](#property-key-98) | services/file/types.ts:50 |
| <a id="property-name-19"></a> `name` | `string` | File name. | - | services/file/types.ts:52 |
| <a id="property-description-21"></a> `description?` | `string` | File description. | - | services/file/types.ts:54 |
| <a id="property-type-3"></a> `type?` | [`VgFileType`](#vgfiletype) | File type (iso, img, qcow2, etc.). | - | services/file/types.ts:56 |
| <a id="property-owner-2"></a> `owner?` | [`FlexKey`](#flexkey) | Owning machine drive ID (FK to machine_drives). | - | services/file/types.ts:58 |
| <a id="property-allocated_bytes-1"></a> `allocated_bytes?` | `number` | Allocated size in bytes. | - | services/file/types.ts:60 |
| <a id="property-used_bytes-1"></a> `used_bytes?` | `number` | Actual size on disk in bytes. | - | services/file/types.ts:62 |
| <a id="property-filesize-1"></a> `filesize?` | `number` | Logical file size in bytes. | - | services/file/types.ts:64 |
| <a id="property-modified-3"></a> `modified?` | `number` | Last modified timestamp (Unix epoch). | - | services/file/types.ts:66 |
| <a id="property-used_pct-1"></a> `used_pct?` | `number` | Used percentage (read-only). | - | services/file/types.ts:68 |
| <a id="property-preferred_tier"></a> `preferred_tier?` | [`FilePreferredTier`](#filepreferredtier) | Preferred storage tier (1-5). | - | services/file/types.ts:70 |
| <a id="property-url-3"></a> `url?` | `string` | Source URL if imported from URL (read-only). | - | services/file/types.ts:72 |
| <a id="property-public_link"></a> `public_link?` | [`FlexKey`](#flexkey) | Public link FK (FK to files_public_links). | - | services/file/types.ts:74 |
| <a id="property-creator-1"></a> `creator?` | `string` | Username that created this file (read-only). | - | services/file/types.ts:76 |
| <a id="property-skip_upload_head_check"></a> `skip_upload_head_check?` | `boolean` | Skip upload head check flag. | - | services/file/types.ts:78 |

***

### VgFileCreateParams

Defined in: services/file/types.ts:87

Parameters for creating a new file entry in VergeOS.

After creating the entry, use FileService.upload to upload content.
If `url` is provided, VergeOS will import the file from that URL automatically.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-20"></a> `name` | `string` | File name (required). | services/file/types.ts:89 |
| <a id="property-description-22"></a> `description?` | `string` | File description. | services/file/types.ts:91 |
| <a id="property-type-4"></a> `type?` | [`VgFileType`](#vgfiletype) | File type. | services/file/types.ts:93 |
| <a id="property-allocated_bytes-2"></a> `allocated_bytes?` | `number` | Expected file size in bytes (required for uploads). | services/file/types.ts:95 |
| <a id="property-preferred_tier-1"></a> `preferred_tier?` | [`FilePreferredTier`](#filepreferredtier) | Preferred storage tier (1-5). | services/file/types.ts:97 |

***

### VgFileUpdateParams

Defined in: services/file/types.ts:103

Parameters for updating a file's metadata.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-21"></a> `name?` | `string` | Updated file name. | services/file/types.ts:105 |
| <a id="property-description-23"></a> `description?` | `string` | Updated description. | services/file/types.ts:107 |
| <a id="property-preferred_tier-2"></a> `preferred_tier?` | [`FilePreferredTier`](#filepreferredtier) | Updated preferred storage tier. | services/file/types.ts:109 |

***

### FileUploadOptions

Defined in: services/file/types.ts:115

Options for file upload operations.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-chunksize"></a> `chunkSize?` | `number` | Chunk size in bytes for upload. Defaults to DEFAULT\_CHUNK\_SIZE (256KB). | services/file/types.ts:117 |

***

### Group

Defined in: services/group/types.ts:13

A VergeOS group resource.

Groups organize users for collective permission management and access control.
Users and other groups can be added as members.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-22"></a> `name` | `string` | Group name. Min 1, max 128 characters. Unique. | - | services/group/types.ts:15 |
| <a id="property-id-3"></a> `id?` | `string` | User-settable identifier string. Unique. | - | services/group/types.ts:18 |
| <a id="property-enabled-8"></a> `enabled?` | `boolean` | Whether the group is enabled. Default: `true`. | - | services/group/types.ts:21 |
| <a id="property-description-24"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/group/types.ts:24 |
| <a id="property-email"></a> `email?` | `string` | Email address. | - | services/group/types.ts:27 |
| <a id="property-created-6"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/group/types.ts:30 |
| <a id="property-system_group"></a> `system_group?` | `boolean` | Whether this is a system-managed group. Read-only. | - | services/group/types.ts:33 |
| <a id="property-auth_source"></a> `auth_source?` | [`FlexKey`](#flexkey) | Authorization source reference (FK to `auth_sources`). Read-only. | - | services/group/types.ts:36 |
| <a id="property-sysgroup"></a> `sysgroup?` | [`FlexKey`](#flexkey) | System group reference (FK to `/sys/groups`). Read-only. | - | services/group/types.ts:39 |
| <a id="property-identity"></a> `identity?` | [`FlexKey`](#flexkey) | Identity reference (FK to `/sys/identities`). Read-only. | - | services/group/types.ts:42 |
| <a id="property-creator-2"></a> `creator?` | `string` | User who created this group. Read-only. | - | services/group/types.ts:45 |
| <a id="property-key-16"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### GroupCreateParams

Defined in: services/group/types.ts:56

Parameters for creating a new group.

Only `name` is required. Read-only fields (`created`, `system_group`,
`auth_source`, `sysgroup`, `identity`, `creator`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-23"></a> `name` | `string` | Group name. Min 1, max 128 characters. Must be unique. | services/group/types.ts:58 |
| <a id="property-id-4"></a> `id?` | `string` | User-settable identifier string. | services/group/types.ts:61 |
| <a id="property-enabled-9"></a> `enabled?` | `boolean` | Whether the group is enabled. Default: `true`. | services/group/types.ts:64 |
| <a id="property-description-25"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/group/types.ts:67 |
| <a id="property-email-1"></a> `email?` | `string` | Email address. | services/group/types.ts:70 |

***

### GroupUpdateParams

Defined in: services/group/types.ts:81

Parameters for updating an existing group.

All fields are optional — only provided fields are changed.
Read-only fields are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-24"></a> `name?` | `string` | Group name. Min 1, max 128 characters. Must be unique. | services/group/types.ts:83 |
| <a id="property-id-5"></a> `id?` | `string` | User-settable identifier string. | services/group/types.ts:86 |
| <a id="property-enabled-10"></a> `enabled?` | `boolean` | Whether the group is enabled. | services/group/types.ts:89 |
| <a id="property-description-26"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/group/types.ts:92 |
| <a id="property-email-2"></a> `email?` | `string` | Email address. | services/group/types.ts:95 |

***

### IPSecConnection

Defined in: services/ipsec-connection/types.ts:16

A VergeOS IPSec VPN connection status resource.

Connections are **read-only** runtime status records showing active
Security Association (SA) state. Each entry represents an established
IPSec tunnel with local/remote endpoints and traffic selectors.

Parent: `vnet` FK. Also references `phase1` and `phase2` entries.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-vnet"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | - | services/ipsec-connection/types.ts:18 |
| <a id="property-phase1"></a> `phase1?` | [`FlexKey`](#flexkey) | Phase 1 (IKE SA) reference (FK to `vnet_ipsec_phase1s`). | - | services/ipsec-connection/types.ts:21 |
| <a id="property-phase2"></a> `phase2?` | [`FlexKey`](#flexkey) | Phase 2 (child SA) reference (FK to `vnet_ipsec_phase2s`). | - | services/ipsec-connection/types.ts:24 |
| <a id="property-uniqueid"></a> `uniqueid?` | `number` | Unique SA identifier assigned by the IKE daemon. | - | services/ipsec-connection/types.ts:27 |
| <a id="property-local"></a> `local?` | `string` | Local endpoint address (IP or IP:port). | - | services/ipsec-connection/types.ts:30 |
| <a id="property-remote"></a> `remote?` | `string` | Remote endpoint address (IP or IP:port). | - | services/ipsec-connection/types.ts:33 |
| <a id="property-local_network"></a> `local_network?` | `string` | Local traffic selector (CIDR). | - | services/ipsec-connection/types.ts:36 |
| <a id="property-remote_network"></a> `remote_network?` | `string` | Remote traffic selector (CIDR). | - | services/ipsec-connection/types.ts:39 |
| <a id="property-connection"></a> `connection?` | `string` | Connection name / SA identifier string. | - | services/ipsec-connection/types.ts:42 |
| <a id="property-reqid"></a> `reqid?` | `string` | Request ID for kernel SA. | - | services/ipsec-connection/types.ts:45 |
| <a id="property-interface"></a> `interface?` | `string` | Network interface used by this SA. | - | services/ipsec-connection/types.ts:48 |
| <a id="property-protocol"></a> `protocol?` | `string` | IPSec protocol (e.g., `ESP`, `AH`). | - | services/ipsec-connection/types.ts:51 |
| <a id="property-created-7"></a> `created?` | `number` | SA creation timestamp (Unix epoch). | - | services/ipsec-connection/types.ts:54 |
| <a id="property-key-17"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### IPSecPhase1

Defined in: services/ipsec-phase1/types.ts:31

A VergeOS IPSec Phase 1 (IKE SA) configuration resource.

Phase 1 entries define IKE Security Associations — the initial key exchange
and authentication between IPSec peers. Parent: `ipsec` FK (to `vnet_ipsecs`).
Each Phase 1 has child Phase 2 (child SA) entries.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-ipsec"></a> `ipsec` | [`FlexKey`](#flexkey) | Parent IPSec configuration reference (FK to `vnet_ipsecs`). Read-only. | - | services/ipsec-phase1/types.ts:33 |
| <a id="property-enabled-11"></a> `enabled?` | `boolean` | Whether this Phase 1 configuration is enabled. Default: `true`. | - | services/ipsec-phase1/types.ts:36 |
| <a id="property-name-25"></a> `name` | `string` | Phase 1 configuration name. Min 1, max 128 characters. Unique. | - | services/ipsec-phase1/types.ts:39 |
| <a id="property-description-27"></a> `description?` | `string` | Human-readable description. | - | services/ipsec-phase1/types.ts:42 |
| <a id="property-keyexchange"></a> `keyexchange?` | [`IPSecKeyExchange`](#ipseckeyexchange) | IKE version: `ikev1`, `ikev2`, `ike` (auto). Default: `ike`. | - | services/ipsec-phase1/types.ts:45 |
| <a id="property-remote_gateway"></a> `remote_gateway` | `string` | Remote peer IP address or hostname. | - | services/ipsec-phase1/types.ts:48 |
| <a id="property-auth"></a> `auth?` | [`IPSecAuth`](#ipsecauth) | Authentication method: `psk` (mutual PSK) or `pubkey` (mutual RSA). Default: `psk`. | - | services/ipsec-phase1/types.ts:51 |
| <a id="property-negotiation"></a> `negotiation?` | [`IPSecNegotiation`](#ipsecnegotiation) | Negotiation mode: `main` or `aggressive`. Default: `main`. | - | services/ipsec-phase1/types.ts:54 |
| <a id="property-identifier"></a> `identifier?` | `string` | Local identifier (blank = current IP). | - | services/ipsec-phase1/types.ts:57 |
| <a id="property-peer_identifier"></a> `peer_identifier?` | `string` | Peer identifier (blank = remote gateway). | - | services/ipsec-phase1/types.ts:60 |
| <a id="property-psk"></a> `psk?` | `string` | Pre-shared key (hidden in API responses). | - | services/ipsec-phase1/types.ts:63 |
| <a id="property-ike"></a> `ike` | `string` | IKE encryption algorithm(s). Default: `aes256-sha256-modp2048`. | - | services/ipsec-phase1/types.ts:66 |
| <a id="property-ikelifetime"></a> `ikelifetime?` | `number` | IKE SA lifetime in seconds. Min: 60. Default: `10800`. | - | services/ipsec-phase1/types.ts:69 |
| <a id="property-auto"></a> `auto?` | [`IPSecAuto`](#ipsecauto) | Connection behavior: `add` (responder only), `route` (on-demand), `start`. Default: `route`. | - | services/ipsec-phase1/types.ts:72 |
| <a id="property-mobike"></a> `mobike?` | `boolean` | Enable IKEv2 MOBIKE protocol. Default: `false`. | - | services/ipsec-phase1/types.ts:75 |
| <a id="property-split_connections"></a> `split_connections?` | `boolean` | Create separate connections for each Phase 2. Default: `false`. | - | services/ipsec-phase1/types.ts:78 |
| <a id="property-forceencaps"></a> `forceencaps?` | `boolean` | Force UDP encapsulation even without NAT. Default: `false`. | - | services/ipsec-phase1/types.ts:81 |
| <a id="property-keyingtries"></a> `keyingtries?` | `number` | Number of negotiation attempts (0 = never give up). Default: `3`. | - | services/ipsec-phase1/types.ts:84 |
| <a id="property-rekey"></a> `rekey?` | `boolean` | Enable renegotiation before expiry. Default: `true`. | - | services/ipsec-phase1/types.ts:87 |
| <a id="property-reauth"></a> `reauth?` | `boolean` | Enable reauthentication during rekey (IKEv2). Default: `true`. | - | services/ipsec-phase1/types.ts:90 |
| <a id="property-margintime"></a> `margintime?` | `number` | Time before expiry to start rekeying, in seconds. Default: `540`. | - | services/ipsec-phase1/types.ts:93 |
| <a id="property-dpdaction"></a> `dpdaction?` | [`IPSecDpdAction`](#ipsecdpdaction) | Dead peer detection action: `none`, `clear`, `hold`, `restart`. Default: `restart`. | - | services/ipsec-phase1/types.ts:96 |
| <a id="property-dpddelay"></a> `dpddelay?` | `number` | DPD check interval in seconds. Default: `30`. | - | services/ipsec-phase1/types.ts:99 |
| <a id="property-dpdfailures"></a> `dpdfailures?` | `number` | Max DPD failures before disconnect (IKEv1). Default: `5`. | - | services/ipsec-phase1/types.ts:102 |
| <a id="property-modified-4"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/ipsec-phase1/types.ts:105 |
| <a id="property-key-18"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### IPSecPhase1CreateParams

Defined in: services/ipsec-phase1/types.ts:115

Parameters for creating an IPSec Phase 1 (IKE SA) configuration.

`ipsec`, `name`, `remote_gateway`, and `ike` are required.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-ipsec-1"></a> `ipsec` | [`FlexKey`](#flexkey) | Parent IPSec configuration reference (FK to `vnet_ipsecs`). | services/ipsec-phase1/types.ts:117 |
| <a id="property-name-26"></a> `name` | `string` | Phase 1 configuration name. Min 1, max 128 characters. Must be unique. | services/ipsec-phase1/types.ts:120 |
| <a id="property-description-28"></a> `description?` | `string` | Human-readable description. | services/ipsec-phase1/types.ts:123 |
| <a id="property-enabled-12"></a> `enabled?` | `boolean` | Whether this Phase 1 is enabled. Default: `true`. | services/ipsec-phase1/types.ts:126 |
| <a id="property-keyexchange-1"></a> `keyexchange?` | [`IPSecKeyExchange`](#ipseckeyexchange) | IKE version: `ikev1`, `ikev2`, `ike` (auto). Default: `ike`. | services/ipsec-phase1/types.ts:129 |
| <a id="property-remote_gateway-1"></a> `remote_gateway` | `string` | Remote peer IP address or hostname. | services/ipsec-phase1/types.ts:132 |
| <a id="property-auth-1"></a> `auth?` | [`IPSecAuth`](#ipsecauth) | Authentication method: `psk` or `pubkey`. Default: `psk`. | services/ipsec-phase1/types.ts:135 |
| <a id="property-negotiation-1"></a> `negotiation?` | [`IPSecNegotiation`](#ipsecnegotiation) | Negotiation mode: `main` or `aggressive`. Default: `main`. | services/ipsec-phase1/types.ts:138 |
| <a id="property-identifier-1"></a> `identifier?` | `string` | Local identifier. | services/ipsec-phase1/types.ts:141 |
| <a id="property-peer_identifier-1"></a> `peer_identifier?` | `string` | Peer identifier. | services/ipsec-phase1/types.ts:144 |
| <a id="property-psk-1"></a> `psk?` | `string` | Pre-shared key (required for `psk` auth). | services/ipsec-phase1/types.ts:147 |
| <a id="property-ike-1"></a> `ike` | `string` | IKE encryption algorithm(s). Default: `aes256-sha256-modp2048`. | services/ipsec-phase1/types.ts:150 |
| <a id="property-ikelifetime-1"></a> `ikelifetime?` | `number` | IKE SA lifetime in seconds. Min: 60. Default: `10800`. | services/ipsec-phase1/types.ts:153 |
| <a id="property-auto-1"></a> `auto?` | [`IPSecAuto`](#ipsecauto) | Connection behavior: `add`, `route`, `start`. Default: `route`. | services/ipsec-phase1/types.ts:156 |
| <a id="property-mobike-1"></a> `mobike?` | `boolean` | Enable IKEv2 MOBIKE protocol. | services/ipsec-phase1/types.ts:159 |
| <a id="property-split_connections-1"></a> `split_connections?` | `boolean` | Create separate connections for each Phase 2. | services/ipsec-phase1/types.ts:162 |
| <a id="property-forceencaps-1"></a> `forceencaps?` | `boolean` | Force UDP encapsulation. | services/ipsec-phase1/types.ts:165 |
| <a id="property-keyingtries-1"></a> `keyingtries?` | `number` | Number of negotiation attempts. Default: `3`. | services/ipsec-phase1/types.ts:168 |
| <a id="property-rekey-1"></a> `rekey?` | `boolean` | Enable renegotiation. Default: `true`. | services/ipsec-phase1/types.ts:171 |
| <a id="property-reauth-1"></a> `reauth?` | `boolean` | Enable reauthentication. Default: `true`. | services/ipsec-phase1/types.ts:174 |
| <a id="property-margintime-1"></a> `margintime?` | `number` | Rekeying margin time in seconds. Default: `540`. | services/ipsec-phase1/types.ts:177 |
| <a id="property-dpdaction-1"></a> `dpdaction?` | [`IPSecDpdAction`](#ipsecdpdaction) | Dead peer detection action. Default: `restart`. | services/ipsec-phase1/types.ts:180 |
| <a id="property-dpddelay-1"></a> `dpddelay?` | `number` | DPD check interval. Default: `30`. | services/ipsec-phase1/types.ts:183 |
| <a id="property-dpdfailures-1"></a> `dpdfailures?` | `number` | Max DPD failures. Default: `5`. | services/ipsec-phase1/types.ts:186 |

***

### IPSecPhase1UpdateParams

Defined in: services/ipsec-phase1/types.ts:197

Parameters for updating an existing IPSec Phase 1 configuration.

All fields are optional — only provided fields are changed.
Read-only fields (`ipsec`, `modified`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-27"></a> `name?` | `string` | Phase 1 configuration name. | services/ipsec-phase1/types.ts:199 |
| <a id="property-description-29"></a> `description?` | `string` | Human-readable description. | services/ipsec-phase1/types.ts:202 |
| <a id="property-enabled-13"></a> `enabled?` | `boolean` | Whether this Phase 1 is enabled. | services/ipsec-phase1/types.ts:205 |
| <a id="property-keyexchange-2"></a> `keyexchange?` | [`IPSecKeyExchange`](#ipseckeyexchange) | IKE version. | services/ipsec-phase1/types.ts:208 |
| <a id="property-remote_gateway-2"></a> `remote_gateway?` | `string` | Remote peer IP address or hostname. | services/ipsec-phase1/types.ts:211 |
| <a id="property-auth-2"></a> `auth?` | [`IPSecAuth`](#ipsecauth) | Authentication method. | services/ipsec-phase1/types.ts:214 |
| <a id="property-negotiation-2"></a> `negotiation?` | [`IPSecNegotiation`](#ipsecnegotiation) | Negotiation mode. | services/ipsec-phase1/types.ts:217 |
| <a id="property-identifier-2"></a> `identifier?` | `string` | Local identifier. | services/ipsec-phase1/types.ts:220 |
| <a id="property-peer_identifier-2"></a> `peer_identifier?` | `string` | Peer identifier. | services/ipsec-phase1/types.ts:223 |
| <a id="property-psk-2"></a> `psk?` | `string` | Pre-shared key. | services/ipsec-phase1/types.ts:226 |
| <a id="property-ike-2"></a> `ike?` | `string` | IKE encryption algorithm(s). | services/ipsec-phase1/types.ts:229 |
| <a id="property-ikelifetime-2"></a> `ikelifetime?` | `number` | IKE SA lifetime in seconds. | services/ipsec-phase1/types.ts:232 |
| <a id="property-auto-2"></a> `auto?` | [`IPSecAuto`](#ipsecauto) | Connection behavior. | services/ipsec-phase1/types.ts:235 |
| <a id="property-mobike-2"></a> `mobike?` | `boolean` | Enable IKEv2 MOBIKE protocol. | services/ipsec-phase1/types.ts:238 |
| <a id="property-split_connections-2"></a> `split_connections?` | `boolean` | Create separate connections for each Phase 2. | services/ipsec-phase1/types.ts:241 |
| <a id="property-forceencaps-2"></a> `forceencaps?` | `boolean` | Force UDP encapsulation. | services/ipsec-phase1/types.ts:244 |
| <a id="property-keyingtries-2"></a> `keyingtries?` | `number` | Number of negotiation attempts. | services/ipsec-phase1/types.ts:247 |
| <a id="property-rekey-2"></a> `rekey?` | `boolean` | Enable renegotiation. | services/ipsec-phase1/types.ts:250 |
| <a id="property-reauth-2"></a> `reauth?` | `boolean` | Enable reauthentication. | services/ipsec-phase1/types.ts:253 |
| <a id="property-margintime-2"></a> `margintime?` | `number` | Rekeying margin time in seconds. | services/ipsec-phase1/types.ts:256 |
| <a id="property-dpdaction-2"></a> `dpdaction?` | [`IPSecDpdAction`](#ipsecdpdaction) | Dead peer detection action. | services/ipsec-phase1/types.ts:259 |
| <a id="property-dpddelay-2"></a> `dpddelay?` | `number` | DPD check interval. | services/ipsec-phase1/types.ts:262 |
| <a id="property-dpdfailures-2"></a> `dpdfailures?` | `number` | Max DPD failures. | services/ipsec-phase1/types.ts:265 |

***

### IPSecPhase2

Defined in: services/ipsec-phase2/types.ts:22

A VergeOS IPSec Phase 2 (child SA) configuration resource.

Phase 2 entries define the IPSec Security Association parameters —
encryption ciphers, local/remote networks, mode, and protocol.
Parent: `phase1` FK (to `vnet_ipsec_phase1s`).

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-phase1-1"></a> `phase1` | [`FlexKey`](#flexkey) | Parent Phase 1 configuration reference (FK to `vnet_ipsec_phase1s`). Read-only. | - | services/ipsec-phase2/types.ts:24 |
| <a id="property-enabled-14"></a> `enabled?` | `boolean` | Whether this Phase 2 configuration is enabled. Default: `true`. | - | services/ipsec-phase2/types.ts:27 |
| <a id="property-name-28"></a> `name` | `string` | Phase 2 configuration name. Min 1, max 128 characters. Unique. | - | services/ipsec-phase2/types.ts:30 |
| <a id="property-description-30"></a> `description?` | `string` | Human-readable description. | - | services/ipsec-phase2/types.ts:33 |
| <a id="property-mode"></a> `mode?` | [`IPSecPhase2Mode`](#ipsecphase2mode) | IPSec mode: `tunnel` (subnet-to-subnet) or `transport` (host-to-host). Default: `tunnel`. | - | services/ipsec-phase2/types.ts:36 |
| <a id="property-local-1"></a> `local` | `string` | Local network/subnet in CIDR notation. | - | services/ipsec-phase2/types.ts:39 |
| <a id="property-remote-1"></a> `remote?` | `string` | Remote network/subnet in CIDR notation. | - | services/ipsec-phase2/types.ts:42 |
| <a id="property-lifetime"></a> `lifetime?` | `number` | IPSec SA lifetime in seconds. Range: 60–86400. Default: `3600`. | - | services/ipsec-phase2/types.ts:45 |
| <a id="property-protocol-1"></a> `protocol?` | [`IPSecProtocol`](#ipsecprotocol) | IPSec protocol: `esp` (encryption) or `ah` (auth only). Default: `esp`. | - | services/ipsec-phase2/types.ts:48 |
| <a id="property-ciphers"></a> `ciphers` | `string` | Cipher suites for IPSec SA. Default: `aes128-sha256-modp2048,aes128gcm128-sha256-modp2048`. | - | services/ipsec-phase2/types.ts:51 |
| <a id="property-modified-5"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/ipsec-phase2/types.ts:54 |
| <a id="property-key-19"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### IPSecPhase2CreateParams

Defined in: services/ipsec-phase2/types.ts:64

Parameters for creating an IPSec Phase 2 (child SA) configuration.

`phase1`, `name`, `local`, and `ciphers` are required.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-phase1-2"></a> `phase1` | [`FlexKey`](#flexkey) | Parent Phase 1 configuration reference (FK to `vnet_ipsec_phase1s`). | services/ipsec-phase2/types.ts:66 |
| <a id="property-name-29"></a> `name` | `string` | Phase 2 configuration name. Min 1, max 128 characters. Must be unique. | services/ipsec-phase2/types.ts:69 |
| <a id="property-description-31"></a> `description?` | `string` | Human-readable description. | services/ipsec-phase2/types.ts:72 |
| <a id="property-enabled-15"></a> `enabled?` | `boolean` | Whether this Phase 2 is enabled. Default: `true`. | services/ipsec-phase2/types.ts:75 |
| <a id="property-mode-1"></a> `mode?` | [`IPSecPhase2Mode`](#ipsecphase2mode) | IPSec mode: `tunnel` or `transport`. Default: `tunnel`. | services/ipsec-phase2/types.ts:78 |
| <a id="property-local-2"></a> `local` | `string` | Local network/subnet in CIDR notation. | services/ipsec-phase2/types.ts:81 |
| <a id="property-remote-2"></a> `remote?` | `string` | Remote network/subnet in CIDR notation. | services/ipsec-phase2/types.ts:84 |
| <a id="property-lifetime-1"></a> `lifetime?` | `number` | IPSec SA lifetime in seconds. Range: 60–86400. Default: `3600`. | services/ipsec-phase2/types.ts:87 |
| <a id="property-protocol-2"></a> `protocol?` | [`IPSecProtocol`](#ipsecprotocol) | IPSec protocol: `esp` or `ah`. Default: `esp`. | services/ipsec-phase2/types.ts:90 |
| <a id="property-ciphers-1"></a> `ciphers` | `string` | Cipher suites. Default: `aes128-sha256-modp2048,aes128gcm128-sha256-modp2048`. | services/ipsec-phase2/types.ts:93 |

***

### IPSecPhase2UpdateParams

Defined in: services/ipsec-phase2/types.ts:104

Parameters for updating an existing IPSec Phase 2 configuration.

All fields are optional — only provided fields are changed.
Read-only fields (`phase1`, `modified`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-30"></a> `name?` | `string` | Phase 2 configuration name. | services/ipsec-phase2/types.ts:106 |
| <a id="property-description-32"></a> `description?` | `string` | Human-readable description. | services/ipsec-phase2/types.ts:109 |
| <a id="property-enabled-16"></a> `enabled?` | `boolean` | Whether this Phase 2 is enabled. | services/ipsec-phase2/types.ts:112 |
| <a id="property-mode-2"></a> `mode?` | [`IPSecPhase2Mode`](#ipsecphase2mode) | IPSec mode: `tunnel` or `transport`. | services/ipsec-phase2/types.ts:115 |
| <a id="property-local-3"></a> `local?` | `string` | Local network/subnet in CIDR notation. | services/ipsec-phase2/types.ts:118 |
| <a id="property-remote-3"></a> `remote?` | `string` | Remote network/subnet in CIDR notation. | services/ipsec-phase2/types.ts:121 |
| <a id="property-lifetime-2"></a> `lifetime?` | `number` | IPSec SA lifetime in seconds. | services/ipsec-phase2/types.ts:124 |
| <a id="property-protocol-3"></a> `protocol?` | [`IPSecProtocol`](#ipsecprotocol) | IPSec protocol: `esp` or `ah`. | services/ipsec-phase2/types.ts:127 |
| <a id="property-ciphers-2"></a> `ciphers?` | `string` | Cipher suites. | services/ipsec-phase2/types.ts:130 |

***

### IPSec

Defined in: services/ipsec/types.ts:28

A VergeOS IPSec VPN configuration resource.

IPSec configs are per-network singletons (parent: `vnet` FK).
Each config holds Phase 1 (IKE SA) children and global IPSec settings
like unique ID handling, compression, and vendor compatibility options.

Note: IPSec configs have no `name` field — use `getByNetwork()` to look up
the config for a specific network.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-vnet-1"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). Read-only. | - | services/ipsec/types.ts:30 |
| <a id="property-enabled-17"></a> `enabled?` | `boolean` | Whether IPSec is enabled on this network. Default: `true`. | - | services/ipsec/types.ts:33 |
| <a id="property-mode-3"></a> `mode?` | [`IPSecMode`](#ipsecmode) | Configuration mode: `normal` (GUI-based) or `advanced` (raw config files). Default: `normal`. | - | services/ipsec/types.ts:36 |
| <a id="property-strongswan_conf"></a> `strongswan_conf?` | `string` | Raw strongswan.conf content (advanced mode only). | - | services/ipsec/types.ts:39 |
| <a id="property-ipsec_conf"></a> `ipsec_conf?` | `string` | Raw ipsec.conf content (advanced mode only). | - | services/ipsec/types.ts:42 |
| <a id="property-ipsec_secrets"></a> `ipsec_secrets?` | `string` | Raw ipsec.secrets content (advanced mode only). | - | services/ipsec/types.ts:45 |
| <a id="property-uniqueids"></a> `uniqueids?` | [`IPSecUniqueIds`](#ipsecuniqueids) | Unique participant ID handling: `yes`, `no`, `never`, `replace`, `keep`. Default: `yes`. | - | services/ipsec/types.ts:48 |
| <a id="property-compress"></a> `compress?` | `boolean` | Whether to propose IPComp compression. Default: `false`. | - | services/ipsec/types.ts:51 |
| <a id="property-exclude_network"></a> `exclude_network?` | `boolean` | Whether to exclude local subnet traffic from IPSec. Default: `true`. | - | services/ipsec/types.ts:54 |
| <a id="property-charoncisco_unity"></a> `charon.cisco_unity?` | `boolean` | Send Cisco Unity vendor ID payload (IKEv1 only). Default: `false`. | - | services/ipsec/types.ts:57 |
| <a id="property-charonaccept_unencrypted_mainmode_messages"></a> `charon.accept_unencrypted_mainmode_messages?` | `boolean` | Accept unencrypted ID/HASH payloads in IKEv1 Main Mode. Default: `false`. | - | services/ipsec/types.ts:60 |
| <a id="property-charonpluginskernel-netlinkmss"></a> `charon.plugins.kernel-netlink.mss?` | `number` | MSS to set on installed routes (0 = disabled). Default: `0`. | - | services/ipsec/types.ts:63 |
| <a id="property-strictcrlpolicy"></a> `strictcrlpolicy?` | [`IPSecStrictCrlPolicy`](#ipsecstrictcrlpolicy) | CRL validation policy: `yes`, `ifuri`, `no`. Default: `no`. | - | services/ipsec/types.ts:66 |
| <a id="property-charonmake_before_break"></a> `charon.make_before_break?` | `boolean` | Use make-before-break reauthentication (IKEv2). Default: `false`. | - | services/ipsec/types.ts:69 |
| <a id="property-modified-6"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/ipsec/types.ts:72 |
| <a id="property-key-20"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### IPSecCreateParams

Defined in: services/ipsec/types.ts:82

Parameters for creating an IPSec VPN configuration.

`vnet` is required. Only one IPSec config may exist per network.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-vnet-2"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | services/ipsec/types.ts:84 |
| <a id="property-enabled-18"></a> `enabled?` | `boolean` | Whether IPSec is enabled. Default: `true`. | services/ipsec/types.ts:87 |
| <a id="property-mode-4"></a> `mode?` | [`IPSecMode`](#ipsecmode) | Configuration mode: `normal` or `advanced`. Default: `normal`. | services/ipsec/types.ts:90 |
| <a id="property-strongswan_conf-1"></a> `strongswan_conf?` | `string` | Raw strongswan.conf content (advanced mode). | services/ipsec/types.ts:93 |
| <a id="property-ipsec_conf-1"></a> `ipsec_conf?` | `string` | Raw ipsec.conf content (advanced mode). | services/ipsec/types.ts:96 |
| <a id="property-ipsec_secrets-1"></a> `ipsec_secrets?` | `string` | Raw ipsec.secrets content (advanced mode). | services/ipsec/types.ts:99 |
| <a id="property-uniqueids-1"></a> `uniqueids?` | [`IPSecUniqueIds`](#ipsecuniqueids) | Unique participant ID handling. Default: `yes`. | services/ipsec/types.ts:102 |
| <a id="property-compress-1"></a> `compress?` | `boolean` | Whether to propose IPComp compression. | services/ipsec/types.ts:105 |
| <a id="property-exclude_network-1"></a> `exclude_network?` | `boolean` | Whether to exclude local subnet traffic from IPSec. | services/ipsec/types.ts:108 |
| <a id="property-charoncisco_unity-1"></a> `charon.cisco_unity?` | `boolean` | Send Cisco Unity vendor ID payload (IKEv1 only). | services/ipsec/types.ts:111 |
| <a id="property-charonaccept_unencrypted_mainmode_messages-1"></a> `charon.accept_unencrypted_mainmode_messages?` | `boolean` | Accept unencrypted ID/HASH payloads in IKEv1 Main Mode. | services/ipsec/types.ts:114 |
| <a id="property-charonpluginskernel-netlinkmss-1"></a> `charon.plugins.kernel-netlink.mss?` | `number` | MSS to set on installed routes (0 = disabled). | services/ipsec/types.ts:117 |
| <a id="property-strictcrlpolicy-1"></a> `strictcrlpolicy?` | [`IPSecStrictCrlPolicy`](#ipsecstrictcrlpolicy) | CRL validation policy: `yes`, `ifuri`, `no`. | services/ipsec/types.ts:120 |
| <a id="property-charonmake_before_break-1"></a> `charon.make_before_break?` | `boolean` | Use make-before-break reauthentication (IKEv2). | services/ipsec/types.ts:123 |

***

### IPSecUpdateParams

Defined in: services/ipsec/types.ts:134

Parameters for updating an existing IPSec VPN configuration.

All fields are optional — only provided fields are changed.
Read-only fields (`vnet`, `modified`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-enabled-19"></a> `enabled?` | `boolean` | Whether IPSec is enabled. | services/ipsec/types.ts:136 |
| <a id="property-mode-5"></a> `mode?` | [`IPSecMode`](#ipsecmode) | Configuration mode: `normal` or `advanced`. | services/ipsec/types.ts:139 |
| <a id="property-strongswan_conf-2"></a> `strongswan_conf?` | `string` | Raw strongswan.conf content. | services/ipsec/types.ts:142 |
| <a id="property-ipsec_conf-2"></a> `ipsec_conf?` | `string` | Raw ipsec.conf content. | services/ipsec/types.ts:145 |
| <a id="property-ipsec_secrets-2"></a> `ipsec_secrets?` | `string` | Raw ipsec.secrets content. | services/ipsec/types.ts:148 |
| <a id="property-uniqueids-2"></a> `uniqueids?` | [`IPSecUniqueIds`](#ipsecuniqueids) | Unique participant ID handling. | services/ipsec/types.ts:151 |
| <a id="property-compress-2"></a> `compress?` | `boolean` | Whether to propose IPComp compression. | services/ipsec/types.ts:154 |
| <a id="property-exclude_network-2"></a> `exclude_network?` | `boolean` | Whether to exclude local subnet traffic from IPSec. | services/ipsec/types.ts:157 |
| <a id="property-charoncisco_unity-2"></a> `charon.cisco_unity?` | `boolean` | Send Cisco Unity vendor ID payload. | services/ipsec/types.ts:160 |
| <a id="property-charonaccept_unencrypted_mainmode_messages-2"></a> `charon.accept_unencrypted_mainmode_messages?` | `boolean` | Accept unencrypted ID/HASH in IKEv1 Main Mode. | services/ipsec/types.ts:163 |
| <a id="property-charonpluginskernel-netlinkmss-2"></a> `charon.plugins.kernel-netlink.mss?` | `number` | MSS to set on installed routes. | services/ipsec/types.ts:166 |
| <a id="property-strictcrlpolicy-2"></a> `strictcrlpolicy?` | [`IPSecStrictCrlPolicy`](#ipsecstrictcrlpolicy) | CRL validation policy. | services/ipsec/types.ts:169 |
| <a id="property-charonmake_before_break-2"></a> `charon.make_before_break?` | `boolean` | Use make-before-break reauthentication. | services/ipsec/types.ts:172 |

***

### Log

Defined in: services/log/types.ts:58

VergeOS log entry resource.

Logs are system-generated records with a maximum of 25,000 rows that
auto-expire after approximately 31 days. Always use filters when querying
to avoid retrieving excessively large result sets.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-level-2"></a> `level?` | [`LogLevel`](#loglevel) | Log severity level. | - | services/log/types.ts:60 |
| <a id="property-text"></a> `text?` | `string` | Log message text. | - | services/log/types.ts:62 |
| <a id="property-timestamp"></a> `timestamp?` | `number` | Timestamp in microseconds since epoch (read-only). | - | services/log/types.ts:64 |
| <a id="property-user-5"></a> `user?` | `string` | Username associated with this log entry. | - | services/log/types.ts:66 |
| <a id="property-object_type"></a> `object_type?` | [`LogObjectType`](#logobjecttype) | Type of object this log relates to. | - | services/log/types.ts:68 |
| <a id="property-object_name"></a> `object_name?` | `string` | Name of the object this log relates to. | - | services/log/types.ts:70 |
| <a id="property-key-21"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineDevice

Defined in: services/machine-device/types.ts:54

A VergeOS machine device resource.

Machine devices represent hardware or virtual devices attached to a machine
(VM or physical node), including GPUs, TPMs, USB devices, PCI devices, and
SR-IOV NICs. The `machine` FK links to the parent machine, and the `type`
field determines the device behavior and available settings.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-machine"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | - | services/machine-device/types.ts:56 |
| <a id="property-machine_type"></a> `machine_type?` | [`MachineType`](#machinetype) | Type of the parent machine. Read-only. | - | services/machine-device/types.ts:59 |
| <a id="property-orderid"></a> `orderid?` | `number` | Boot/device order position. Min 0, max 64. | - | services/machine-device/types.ts:62 |
| <a id="property-type-5"></a> `type?` | [`DeviceType`](#devicetype) | Device type. Read-only after creation. | - | services/machine-device/types.ts:65 |
| <a id="property-name-31"></a> `name?` | `string` | Device display name. Min 1, max 128 characters. | - | services/machine-device/types.ts:68 |
| <a id="property-description-33"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/machine-device/types.ts:71 |
| <a id="property-resource_group"></a> `resource_group?` | [`FlexKey`](#flexkey) | Resource group reference (FK to `resource_groups`). Read-only. | - | services/machine-device/types.ts:74 |
| <a id="property-uuid-2"></a> `uuid?` | `string` | Device UUID. | - | services/machine-device/types.ts:77 |
| <a id="property-enabled-20"></a> `enabled?` | `boolean` | Whether the device is enabled. Default: `true`. | - | services/machine-device/types.ts:80 |
| <a id="property-optional"></a> `optional?` | `boolean` | Whether the device is optional (VM can start without it). Default: `false`. | - | services/machine-device/types.ts:83 |
| <a id="property-asset"></a> `asset?` | `string` | Asset tag for recipe/snapshot identification. Min 1, max 40 characters. | - | services/machine-device/types.ts:86 |
| <a id="property-count"></a> `count?` | `number` | Number of device instances. Min 1, max 16. Default: `1`. | - | services/machine-device/types.ts:89 |
| <a id="property-settings_args"></a> `settings_args?` | `Record`\<`string`, `unknown`\> | Device-specific settings as JSON. | - | services/machine-device/types.ts:92 |
| <a id="property-created-8"></a> `created?` | `number` | Creation timestamp (epoch seconds). Read-only. | - | services/machine-device/types.ts:95 |
| <a id="property-modified-7"></a> `modified?` | `number` | Last modification timestamp (epoch seconds). Read-only. | - | services/machine-device/types.ts:98 |
| <a id="property-key-22"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineDeviceCreateParams

Defined in: services/machine-device/types.ts:109

Parameters for creating a new machine device.

`machine` and `type` are required. Read-only fields (`machine_type`,
`resource_group`, `created`, `modified`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-machine-1"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | services/machine-device/types.ts:111 |
| <a id="property-type-6"></a> `type` | [`DeviceType`](#devicetype) | Device type. | services/machine-device/types.ts:114 |
| <a id="property-name-32"></a> `name?` | `string` | Device display name. Min 1, max 128 characters. | services/machine-device/types.ts:117 |
| <a id="property-description-34"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/machine-device/types.ts:120 |
| <a id="property-uuid-3"></a> `uuid?` | `string` | Device UUID. | services/machine-device/types.ts:123 |
| <a id="property-enabled-21"></a> `enabled?` | `boolean` | Whether the device is enabled. Default: `true`. | services/machine-device/types.ts:126 |
| <a id="property-optional-1"></a> `optional?` | `boolean` | Whether the device is optional. Default: `false`. | services/machine-device/types.ts:129 |
| <a id="property-orderid-1"></a> `orderid?` | `number` | Boot/device order position. Min 0, max 64. | services/machine-device/types.ts:132 |
| <a id="property-asset-1"></a> `asset?` | `string` | Asset tag. Min 1, max 40 characters. | services/machine-device/types.ts:135 |
| <a id="property-count-1"></a> `count?` | `number` | Number of device instances. Min 1, max 16. Default: `1`. | services/machine-device/types.ts:138 |
| <a id="property-settings_args-1"></a> `settings_args?` | `Record`\<`string`, `unknown`\> | Device-specific settings passed on create. | services/machine-device/types.ts:141 |

***

### MachineDeviceUpdateParams

Defined in: services/machine-device/types.ts:152

Parameters for updating an existing machine device.

All fields are optional — only provided fields are changed.
Read-only fields and `machine`/`type` are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-33"></a> `name?` | `string` | Device display name. Min 1, max 128 characters. | services/machine-device/types.ts:154 |
| <a id="property-description-35"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/machine-device/types.ts:157 |
| <a id="property-uuid-4"></a> `uuid?` | `string` | Device UUID. | services/machine-device/types.ts:160 |
| <a id="property-enabled-22"></a> `enabled?` | `boolean` | Whether the device is enabled. | services/machine-device/types.ts:163 |
| <a id="property-optional-2"></a> `optional?` | `boolean` | Whether the device is optional. | services/machine-device/types.ts:166 |
| <a id="property-orderid-2"></a> `orderid?` | `number` | Boot/device order position. Min 0, max 64. | services/machine-device/types.ts:169 |
| <a id="property-asset-2"></a> `asset?` | `string` | Asset tag. Min 1, max 40 characters. | services/machine-device/types.ts:172 |
| <a id="property-count-2"></a> `count?` | `number` | Number of device instances. Min 1, max 16. | services/machine-device/types.ts:175 |
| <a id="property-settings_args-2"></a> `settings_args?` | `Record`\<`string`, `unknown`\> | Device-specific settings. | services/machine-device/types.ts:178 |

***

### MachineDrivePhys

Defined in: services/machine-drive-phys/types.ts:26

A VergeOS machine drive physical resource.

Provides physical drive hardware information including SMART data,
temperature, wear level, vSAN status, and partition layout. Each
machine drive has one corresponding phys entry. This is a read-only
monitoring resource.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-parent_drive"></a> `parent_drive` | [`FlexKey`](#flexkey) | Parent drive reference (FK to `machine_drives`). Required. | - | services/machine-drive-phys/types.ts:28 |
| <a id="property-path"></a> `path?` | `string` | Local drive path. | - | services/machine-drive-phys/types.ts:31 |
| <a id="property-all_paths"></a> `all_paths?` | `string` | All drive paths. | - | services/machine-drive-phys/types.ts:34 |
| <a id="property-modified-8"></a> `modified?` | `number` | Last modified timestamp (Unix epoch). Read-only. | - | services/machine-drive-phys/types.ts:37 |
| <a id="property-size"></a> `size?` | `number` | Disk size in bytes. | - | services/machine-drive-phys/types.ts:40 |
| <a id="property-model"></a> `model?` | `string` | Drive model string. | - | services/machine-drive-phys/types.ts:43 |
| <a id="property-fw"></a> `fw?` | `string` | Firmware version. | - | services/machine-drive-phys/types.ts:46 |
| <a id="property-serial"></a> `serial?` | `string` | Serial number. | - | services/machine-drive-phys/types.ts:49 |
| <a id="property-temp"></a> `temp?` | `number` | Drive temperature. | - | services/machine-drive-phys/types.ts:52 |
| <a id="property-encrypted-1"></a> `encrypted?` | `boolean` | Whether the drive is encrypted. | - | services/machine-drive-phys/types.ts:55 |
| <a id="property-temp_warn"></a> `temp_warn?` | `boolean` | Temperature warning flag. | - | services/machine-drive-phys/types.ts:58 |
| <a id="property-enclosure_slot"></a> `enclosure_slot?` | `string` | Enclosure slot identifier. | - | services/machine-drive-phys/types.ts:61 |
| <a id="property-locate_status"></a> `locate_status?` | [`LocateStatus`](#locatestatus) | Locate LED status. | - | services/machine-drive-phys/types.ts:64 |
| <a id="property-location"></a> `location?` | `string` | Physical location string. | - | services/machine-drive-phys/types.ts:67 |
| <a id="property-vsan_driveid"></a> `vsan_driveid?` | `number` | vSAN drive ID (-1 if not assigned). | - | services/machine-drive-phys/types.ts:70 |
| <a id="property-vsan_tier"></a> `vsan_tier?` | `number` | vSAN tier (-1 if not assigned). | - | services/machine-drive-phys/types.ts:73 |
| <a id="property-realloc_sectors"></a> `realloc_sectors?` | `number` | Reallocated sector count. | - | services/machine-drive-phys/types.ts:76 |
| <a id="property-realloc_sectors_warn"></a> `realloc_sectors_warn?` | `boolean` | Reallocated sectors warning flag. | - | services/machine-drive-phys/types.ts:79 |
| <a id="property-wear_level"></a> `wear_level?` | `number` | SSD wear level indicator. | - | services/machine-drive-phys/types.ts:82 |
| <a id="property-wear_level_warn"></a> `wear_level_warn?` | `boolean` | Wear level warning flag. | - | services/machine-drive-phys/types.ts:85 |
| <a id="property-hours"></a> `hours?` | `number` | Power-on hours. | - | services/machine-drive-phys/types.ts:88 |
| <a id="property-hours_warn"></a> `hours_warn?` | `boolean` | Power-on hours warning flag. | - | services/machine-drive-phys/types.ts:91 |
| <a id="property-vsan_used"></a> `vsan_used?` | `number` | vSAN used bytes. | - | services/machine-drive-phys/types.ts:94 |
| <a id="property-vsan_max"></a> `vsan_max?` | `number` | vSAN maximum bytes. | - | services/machine-drive-phys/types.ts:97 |
| <a id="property-vsan_read_errors"></a> `vsan_read_errors?` | `number` | vSAN read error count. | - | services/machine-drive-phys/types.ts:100 |
| <a id="property-vsan_write_errors"></a> `vsan_write_errors?` | `number` | vSAN write error count. | - | services/machine-drive-phys/types.ts:103 |
| <a id="property-vsan_avg_latency"></a> `vsan_avg_latency?` | `number` | vSAN average latency. | - | services/machine-drive-phys/types.ts:106 |
| <a id="property-vsan_max_latency"></a> `vsan_max_latency?` | `number` | vSAN maximum latency. | - | services/machine-drive-phys/types.ts:109 |
| <a id="property-vsan_repairing"></a> `vsan_repairing?` | `number` | vSAN repairing block count. | - | services/machine-drive-phys/types.ts:112 |
| <a id="property-vsan_repair_estimate"></a> `vsan_repair_estimate?` | `number` | vSAN repair estimate (remaining blocks). | - | services/machine-drive-phys/types.ts:115 |
| <a id="property-vsan_last_error"></a> `vsan_last_error?` | `string` | vSAN last error message. | - | services/machine-drive-phys/types.ts:118 |
| <a id="property-vsan_throttle"></a> `vsan_throttle?` | `number` | vSAN write throttle (bytes/sec). | - | services/machine-drive-phys/types.ts:121 |
| <a id="property-vsan_path"></a> `vsan_path?` | `string` | vSAN drive path. | - | services/machine-drive-phys/types.ts:124 |
| <a id="property-spare"></a> `spare?` | `boolean` | Whether this is a vSAN spare drive. | - | services/machine-drive-phys/types.ts:127 |
| <a id="property-swap"></a> `swap?` | `boolean` | Whether this drive has a swap partition. | - | services/machine-drive-phys/types.ts:130 |
| <a id="property-swap_size"></a> `swap_size?` | `number` | Swap partition size in bytes. | - | services/machine-drive-phys/types.ts:133 |
| <a id="property-boot"></a> `boot?` | `boolean` | Whether this drive has a boot partition. | - | services/machine-drive-phys/types.ts:136 |
| <a id="property-boot_size"></a> `boot_size?` | `number` | Boot partition size in bytes. | - | services/machine-drive-phys/types.ts:139 |
| <a id="property-ybpart"></a> `ybpart?` | `boolean` | Whether this drive has a VergeOS partition. | - | services/machine-drive-phys/types.ts:142 |
| <a id="property-ybpart_size"></a> `ybpart_size?` | `number` | VergeOS partition size in bytes. | - | services/machine-drive-phys/types.ts:145 |
| <a id="property-bus"></a> `bus?` | `string` | Drive bus type (e.g., "sata", "nvme"). | - | services/machine-drive-phys/types.ts:148 |
| <a id="property-encryption_key"></a> `encryption_key?` | `boolean` | Whether drive has an encryption key. | - | services/machine-drive-phys/types.ts:151 |
| <a id="property-current_pending_sector"></a> `current_pending_sector?` | `number` | Current pending sector count. | - | services/machine-drive-phys/types.ts:154 |
| <a id="property-current_pending_sector_warn"></a> `current_pending_sector_warn?` | `boolean` | Current pending sectors warning flag. | - | services/machine-drive-phys/types.ts:157 |
| <a id="property-offline_uncorrectable"></a> `offline_uncorrectable?` | `number` | Offline uncorrectable sector count. | - | services/machine-drive-phys/types.ts:160 |
| <a id="property-offline_uncorrectable_warn"></a> `offline_uncorrectable_warn?` | `boolean` | Offline uncorrectable sectors warning flag. | - | services/machine-drive-phys/types.ts:163 |
| <a id="property-vsan_online_since"></a> `vsan_online_since?` | `number` | Last vSAN connection time (Unix epoch). | - | services/machine-drive-phys/types.ts:166 |
| <a id="property-smart"></a> `smart?` | `boolean` | Whether SMART status is available for this drive. | - | services/machine-drive-phys/types.ts:169 |
| <a id="property-key-23"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineDriveStats

Defined in: services/machine-drive-stats/types.ts:14

A VergeOS machine drive stats resource.

Provides per-drive I/O performance metrics including read/write operations,
throughput, utilization, and capacity. Each machine drive has one stats row
that is continuously updated by the system. This is a read-only monitoring resource.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-parent_drive-1"></a> `parent_drive` | [`FlexKey`](#flexkey) | Parent drive reference (FK to `machine_drives`). | - | services/machine-drive-stats/types.ts:16 |
| <a id="property-rops-1"></a> `rops?` | `number` | Read operations per second. | - | services/machine-drive-stats/types.ts:19 |
| <a id="property-wops-1"></a> `wops?` | `number` | Write operations per second. | - | services/machine-drive-stats/types.ts:22 |
| <a id="property-rbps-1"></a> `rbps?` | `number` | Read bytes per second. | - | services/machine-drive-stats/types.ts:25 |
| <a id="property-wbps-1"></a> `wbps?` | `number` | Write bytes per second. | - | services/machine-drive-stats/types.ts:28 |
| <a id="property-totalbps"></a> `totalbps?` | `number` | Total bytes per second (read + write). | - | services/machine-drive-stats/types.ts:31 |
| <a id="property-writes-1"></a> `writes?` | `number` | Total write operations. | - | services/machine-drive-stats/types.ts:34 |
| <a id="property-reads-1"></a> `reads?` | `number` | Total read operations. | - | services/machine-drive-stats/types.ts:37 |
| <a id="property-write_bytes-1"></a> `write_bytes?` | `number` | Total bytes written. | - | services/machine-drive-stats/types.ts:40 |
| <a id="property-read_bytes-1"></a> `read_bytes?` | `number` | Total bytes read. | - | services/machine-drive-stats/types.ts:43 |
| <a id="property-used_bytes-2"></a> `used_bytes?` | `number` | Currently used bytes. | - | services/machine-drive-stats/types.ts:46 |
| <a id="property-max_bytes"></a> `max_bytes?` | `number` | Maximum bytes capacity. | - | services/machine-drive-stats/types.ts:49 |
| <a id="property-service_time"></a> `service_time?` | `number` | Average service time for I/O requests. | - | services/machine-drive-stats/types.ts:52 |
| <a id="property-util"></a> `util?` | `number` | Percentage of time during which I/O requests were issued. | - | services/machine-drive-stats/types.ts:55 |
| <a id="property-physical"></a> `physical?` | `boolean` | Whether this is a physical drive. | - | services/machine-drive-stats/types.ts:58 |
| <a id="property-last_update-1"></a> `last_update?` | `number` | Last update timestamp (Unix epoch). Read-only. | - | services/machine-drive-stats/types.ts:61 |
| <a id="property-bulk_update"></a> `bulk_update?` | `unknown` | Bulk update data (JSON). | - | services/machine-drive-stats/types.ts:64 |
| <a id="property-up_since"></a> `up_since?` | `number` | Up-since timestamp (Unix epoch). | - | services/machine-drive-stats/types.ts:67 |
| <a id="property-key-24"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineDrive

Defined in: services/machine-drive/types.ts:93

A VergeOS machine drive resource.

Machine drives represent virtual disks and storage devices attached to a
machine (VM or physical node). The `machine` FK links to the parent machine.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-machine-2"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | - | services/machine-drive/types.ts:95 |
| <a id="property-orderid-3"></a> `orderid?` | `number` | Boot order position. | - | services/machine-drive/types.ts:98 |
| <a id="property-name-34"></a> `name` | `string` | Drive display name. Min 1, max 128 characters. | - | services/machine-drive/types.ts:101 |
| <a id="property-description-36"></a> `description?` | `string` | Human-readable description. | - | services/machine-drive/types.ts:104 |
| <a id="property-interface-1"></a> `interface?` | [`DriveInterface`](#driveinterface) | Bus interface type. Default: `virtio-scsi`. | - | services/machine-drive/types.ts:107 |
| <a id="property-media"></a> `media?` | [`DriveMedia`](#drivemedia) | Media type. Default: `disk`. Read-only. | - | services/machine-drive/types.ts:110 |
| <a id="property-enabled-23"></a> `enabled?` | `boolean` | Whether the drive is enabled. Default: `true`. | - | services/machine-drive/types.ts:113 |
| <a id="property-serial-1"></a> `serial?` | `string` | Drive serial number. | - | services/machine-drive/types.ts:116 |
| <a id="property-disksize"></a> `disksize?` | `number` | Disk size in bytes. | - | services/machine-drive/types.ts:119 |
| <a id="property-used_bytes-3"></a> `used_bytes?` | `number` | Actual used space in bytes. Read-only. | - | services/machine-drive/types.ts:122 |
| <a id="property-media_source"></a> `media_source?` | [`FlexKey`](#flexkey) | File reference for cdrom/import media (FK to `files`). | - | services/machine-drive/types.ts:125 |
| <a id="property-preferred_tier-3"></a> `preferred_tier?` | [`DrivePreferredTier`](#drivepreferredtier) | Preferred storage tier (`1`–`5`). | - | services/machine-drive/types.ts:128 |
| <a id="property-readonly"></a> `readonly?` | `boolean` | Whether the drive is read-only. | - | services/machine-drive/types.ts:131 |
| <a id="property-optimize"></a> `optimize?` | [`DriveOptimize`](#driveoptimize) | Optimization setting. | - | services/machine-drive/types.ts:134 |
| <a id="property-preserve_drive_format"></a> `preserve_drive_format?` | `boolean` | Whether to preserve the drive format. | - | services/machine-drive/types.ts:137 |
| <a id="property-fsync"></a> `fsync?` | `""` \| `"0"` \| `"1"` | Strict fsync setting. Empty = system default, `0` = off, `1` = on. | - | services/machine-drive/types.ts:140 |
| <a id="property-discard"></a> `discard?` | `boolean` | Whether TRIM/discard is enabled. Default: `true`. | - | services/machine-drive/types.ts:143 |
| <a id="property-advanced"></a> `advanced?` | `string` | Advanced properties (newline-delimited key=value pairs). | - | services/machine-drive/types.ts:146 |
| <a id="property-asset-3"></a> `asset?` | `string` | Asset tag (used for recipe/snapshot identification). | - | services/machine-drive/types.ts:149 |
| <a id="property-nocreate"></a> `nocreate?` | `boolean` | Whether the drive was skipped during creation. | - | services/machine-drive/types.ts:152 |
| <a id="property-spare-1"></a> `spare?` | `boolean` | Whether this is a hot-spare drive. | - | services/machine-drive/types.ts:155 |
| <a id="property-key-25"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineDriveCreateParams

Defined in: services/machine-drive/types.ts:166

Parameters for creating a new machine drive.

Only `name` and `machine` are required. Read-only fields (`used_bytes`)
are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-machine-3"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | services/machine-drive/types.ts:168 |
| <a id="property-name-35"></a> `name` | `string` | Drive display name. Min 1, max 128 characters. | services/machine-drive/types.ts:171 |
| <a id="property-orderid-4"></a> `orderid?` | `number` | Boot order position. | services/machine-drive/types.ts:174 |
| <a id="property-description-37"></a> `description?` | `string` | Human-readable description. | services/machine-drive/types.ts:177 |
| <a id="property-interface-2"></a> `interface?` | [`DriveInterface`](#driveinterface) | Bus interface type. Default: `virtio-scsi`. | services/machine-drive/types.ts:180 |
| <a id="property-media-1"></a> `media?` | [`DriveMedia`](#drivemedia) | Media type. Default: `disk`. | services/machine-drive/types.ts:183 |
| <a id="property-enabled-24"></a> `enabled?` | `boolean` | Whether the drive is enabled. Default: `true`. | services/machine-drive/types.ts:186 |
| <a id="property-serial-2"></a> `serial?` | `string` | Drive serial number. | services/machine-drive/types.ts:189 |
| <a id="property-disksize-1"></a> `disksize?` | `number` | Disk size in bytes. | services/machine-drive/types.ts:192 |
| <a id="property-media_source-1"></a> `media_source?` | [`FlexKey`](#flexkey) | File reference for cdrom/import media (FK to `files`). | services/machine-drive/types.ts:195 |
| <a id="property-preferred_tier-4"></a> `preferred_tier?` | [`DrivePreferredTier`](#drivepreferredtier) | Preferred storage tier (`1`–`5`). | services/machine-drive/types.ts:198 |
| <a id="property-readonly-1"></a> `readonly?` | `boolean` | Whether the drive is read-only. | services/machine-drive/types.ts:201 |
| <a id="property-optimize-1"></a> `optimize?` | [`DriveOptimize`](#driveoptimize) | Optimization setting. | services/machine-drive/types.ts:204 |
| <a id="property-preserve_drive_format-1"></a> `preserve_drive_format?` | `boolean` | Whether to preserve the drive format. | services/machine-drive/types.ts:207 |
| <a id="property-fsync-1"></a> `fsync?` | `""` \| `"0"` \| `"1"` | Strict fsync setting. Empty = system default, `0` = off, `1` = on. | services/machine-drive/types.ts:210 |
| <a id="property-discard-1"></a> `discard?` | `boolean` | Whether TRIM/discard is enabled. | services/machine-drive/types.ts:213 |
| <a id="property-advanced-1"></a> `advanced?` | `string` | Advanced properties (newline-delimited key=value pairs). | services/machine-drive/types.ts:216 |
| <a id="property-asset-4"></a> `asset?` | `string` | Asset tag. | services/machine-drive/types.ts:219 |

***

### MachineDriveUpdateParams

Defined in: services/machine-drive/types.ts:230

Parameters for updating an existing machine drive.

All fields are optional — only provided fields are changed.
Read-only fields (`media`, `used_bytes`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-machine-4"></a> `machine?` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). Used for hotplug attach/detach. | services/machine-drive/types.ts:232 |
| <a id="property-name-36"></a> `name?` | `string` | Drive display name. Min 1, max 128 characters. | services/machine-drive/types.ts:235 |
| <a id="property-orderid-5"></a> `orderid?` | `number` | Boot order position. | services/machine-drive/types.ts:238 |
| <a id="property-description-38"></a> `description?` | `string` | Human-readable description. | services/machine-drive/types.ts:241 |
| <a id="property-interface-3"></a> `interface?` | [`DriveInterface`](#driveinterface) | Bus interface type. | services/machine-drive/types.ts:244 |
| <a id="property-enabled-25"></a> `enabled?` | `boolean` | Whether the drive is enabled. | services/machine-drive/types.ts:247 |
| <a id="property-serial-3"></a> `serial?` | `string` | Drive serial number. | services/machine-drive/types.ts:250 |
| <a id="property-disksize-2"></a> `disksize?` | `number` | Disk size in bytes (can only increase). | services/machine-drive/types.ts:253 |
| <a id="property-preferred_tier-5"></a> `preferred_tier?` | [`DrivePreferredTier`](#drivepreferredtier) | Preferred storage tier (`1`–`5`). | services/machine-drive/types.ts:256 |
| <a id="property-readonly-2"></a> `readonly?` | `boolean` | Whether the drive is read-only. | services/machine-drive/types.ts:259 |
| <a id="property-optimize-2"></a> `optimize?` | [`DriveOptimize`](#driveoptimize) | Optimization setting. | services/machine-drive/types.ts:262 |
| <a id="property-preserve_drive_format-2"></a> `preserve_drive_format?` | `boolean` | Whether to preserve the drive format. | services/machine-drive/types.ts:265 |
| <a id="property-fsync-2"></a> `fsync?` | `""` \| `"0"` \| `"1"` | Strict fsync setting. Empty = system default, `0` = off, `1` = on. | services/machine-drive/types.ts:268 |
| <a id="property-discard-2"></a> `discard?` | `boolean` | Whether TRIM/discard is enabled. | services/machine-drive/types.ts:271 |
| <a id="property-advanced-2"></a> `advanced?` | `string` | Advanced properties (newline-delimited key=value pairs). | services/machine-drive/types.ts:274 |
| <a id="property-asset-5"></a> `asset?` | `string` | Asset tag. | services/machine-drive/types.ts:277 |

***

### MachineLog

Defined in: services/machine-log/types.ts:39

A VergeOS machine log resource.

Machine logs are system-generated entries that record events, errors,
and audit activity for machines. Each log entry is associated with a
parent machine and auto-expires after ~31 days.

This is a **read-only** resource — log entries are created by the system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-machine-5"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | - | services/machine-log/types.ts:41 |
| <a id="property-level-3"></a> `level?` | [`MachineLogLevel`](#machineloglevel) | Log severity level. Default: `message`. | - | services/machine-log/types.ts:44 |
| <a id="property-text-1"></a> `text?` | `string` | Log message text. | - | services/machine-log/types.ts:47 |
| <a id="property-timestamp-1"></a> `timestamp?` | `number` | Creation timestamp (Unix epoch, microseconds). Read-only, auto-expires ~31 days. | - | services/machine-log/types.ts:50 |
| <a id="property-user-6"></a> `user?` | `string` | User or source that generated the log entry. | - | services/machine-log/types.ts:53 |
| <a id="property-key-26"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineNicStatsHistoryLong

Defined in: services/machine-nic-stats-history-long/types.ts:15

A VergeOS machine NIC stats history (long-term) resource.

Provides long-term historical per-NIC network traffic metrics including
aggregate averages and peaks for packet rates and data rates, plus
cumulative counters. This is a read-only monitoring resource managed
by the system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-parent_nic"></a> `parent_nic` | [`FlexKey`](#flexkey) | Parent NIC reference (FK to `machine_nics`). | - | services/machine-nic-stats-history-long/types.ts:17 |
| <a id="property-txpps_avg"></a> `txpps_avg?` | `number` | Average transmit packets per second over the long-term period. | - | services/machine-nic-stats-history-long/types.ts:20 |
| <a id="property-rxpps_avg"></a> `rxpps_avg?` | `number` | Average receive packets per second over the long-term period. | - | services/machine-nic-stats-history-long/types.ts:23 |
| <a id="property-txbps_avg"></a> `txbps_avg?` | `number` | Average transmit bytes per second over the long-term period. | - | services/machine-nic-stats-history-long/types.ts:26 |
| <a id="property-rxbps_avg"></a> `rxbps_avg?` | `number` | Average receive bytes per second over the long-term period. | - | services/machine-nic-stats-history-long/types.ts:29 |
| <a id="property-txpps_peak"></a> `txpps_peak?` | `number` | Peak transmit packets per second over the long-term period. | - | services/machine-nic-stats-history-long/types.ts:32 |
| <a id="property-rxpps_peak"></a> `rxpps_peak?` | `number` | Peak receive packets per second over the long-term period. | - | services/machine-nic-stats-history-long/types.ts:35 |
| <a id="property-txbps_peak"></a> `txbps_peak?` | `number` | Peak transmit bytes per second over the long-term period. | - | services/machine-nic-stats-history-long/types.ts:38 |
| <a id="property-rxbps_peak"></a> `rxbps_peak?` | `number` | Peak receive bytes per second over the long-term period. | - | services/machine-nic-stats-history-long/types.ts:41 |
| <a id="property-totalxbps_avg"></a> `totalxbps_avg?` | `number` | Average total bytes per second (transmit + receive). | - | services/machine-nic-stats-history-long/types.ts:44 |
| <a id="property-totalxbps_peak"></a> `totalxbps_peak?` | `number` | Peak total bytes per second (transmit + receive). | - | services/machine-nic-stats-history-long/types.ts:47 |
| <a id="property-tx_pckts"></a> `tx_pckts?` | `number` | Total transmitted packets. | - | services/machine-nic-stats-history-long/types.ts:50 |
| <a id="property-rx_pckts"></a> `rx_pckts?` | `number` | Total received packets. | - | services/machine-nic-stats-history-long/types.ts:53 |
| <a id="property-tx_bytes"></a> `tx_bytes?` | `number` | Total transmitted bytes. | - | services/machine-nic-stats-history-long/types.ts:56 |
| <a id="property-rx_bytes"></a> `rx_bytes?` | `number` | Total received bytes. | - | services/machine-nic-stats-history-long/types.ts:59 |
| <a id="property-timestamp-2"></a> `timestamp?` | `number` | Snapshot timestamp (Unix epoch). | - | services/machine-nic-stats-history-long/types.ts:62 |
| <a id="property-key-27"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineNicStatsHistoryShort

Defined in: services/machine-nic-stats-history-short/types.ts:15

A VergeOS machine NIC stats history (short-term) resource.

Provides short-term historical per-NIC network traffic metrics including
packet rates, data rates, and cumulative counters. Each row captures a
point-in-time snapshot of NIC performance. This is a read-only monitoring
resource managed by the system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-parent_nic-1"></a> `parent_nic` | [`FlexKey`](#flexkey) | Parent NIC reference (FK to `machine_nics`). | - | services/machine-nic-stats-history-short/types.ts:17 |
| <a id="property-txpps"></a> `txpps?` | `number` | Transmit packets per second. | - | services/machine-nic-stats-history-short/types.ts:20 |
| <a id="property-rxpps"></a> `rxpps?` | `number` | Receive packets per second. | - | services/machine-nic-stats-history-short/types.ts:23 |
| <a id="property-txbps"></a> `txbps?` | `number` | Transmit bytes per second. | - | services/machine-nic-stats-history-short/types.ts:26 |
| <a id="property-rxbps"></a> `rxbps?` | `number` | Receive bytes per second. | - | services/machine-nic-stats-history-short/types.ts:29 |
| <a id="property-totalxbps"></a> `totalxbps?` | `number` | Total bytes per second (transmit + receive). | - | services/machine-nic-stats-history-short/types.ts:32 |
| <a id="property-tx_pckts-1"></a> `tx_pckts?` | `number` | Total transmitted packets. | - | services/machine-nic-stats-history-short/types.ts:35 |
| <a id="property-rx_pckts-1"></a> `rx_pckts?` | `number` | Total received packets. | - | services/machine-nic-stats-history-short/types.ts:38 |
| <a id="property-tx_bytes-1"></a> `tx_bytes?` | `number` | Total transmitted bytes. | - | services/machine-nic-stats-history-short/types.ts:41 |
| <a id="property-rx_bytes-1"></a> `rx_bytes?` | `number` | Total received bytes. | - | services/machine-nic-stats-history-short/types.ts:44 |
| <a id="property-timestamp-3"></a> `timestamp?` | `number` | Snapshot timestamp (Unix epoch). | - | services/machine-nic-stats-history-short/types.ts:47 |
| <a id="property-key-28"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineNicStats

Defined in: services/machine-nic-stats/types.ts:15

A VergeOS machine NIC stats resource.

Provides per-NIC network traffic metrics including packets per second,
bytes per second, and cumulative counters. Each machine NIC has one stats
row that is continuously updated by the system. This is a read-only
monitoring resource.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-parent_nic-2"></a> `parent_nic` | [`FlexKey`](#flexkey) | Parent NIC reference (FK to `machine_nics`). | - | services/machine-nic-stats/types.ts:17 |
| <a id="property-txpps-1"></a> `txpps?` | `number` | Transmit packets per second. | - | services/machine-nic-stats/types.ts:20 |
| <a id="property-rxpps-1"></a> `rxpps?` | `number` | Receive packets per second. | - | services/machine-nic-stats/types.ts:23 |
| <a id="property-txbps-1"></a> `txbps?` | `number` | Transmit bytes per second. | - | services/machine-nic-stats/types.ts:26 |
| <a id="property-rxbps-1"></a> `rxbps?` | `number` | Receive bytes per second. | - | services/machine-nic-stats/types.ts:29 |
| <a id="property-totalxbps-1"></a> `totalxbps?` | `number` | Total bytes per second (transmit + receive). | - | services/machine-nic-stats/types.ts:32 |
| <a id="property-tx_pckts-2"></a> `tx_pckts?` | `number` | Total transmitted packets. | - | services/machine-nic-stats/types.ts:35 |
| <a id="property-rx_pckts-2"></a> `rx_pckts?` | `number` | Total received packets. | - | services/machine-nic-stats/types.ts:38 |
| <a id="property-tx_bytes-2"></a> `tx_bytes?` | `number` | Total transmitted bytes. | - | services/machine-nic-stats/types.ts:41 |
| <a id="property-rx_bytes-2"></a> `rx_bytes?` | `number` | Total received bytes. | - | services/machine-nic-stats/types.ts:44 |
| <a id="property-tx_pckts_cur"></a> `tx_pckts_cur?` | `number` | Current transmitted packets counter. | - | services/machine-nic-stats/types.ts:47 |
| <a id="property-rx_pckts_cur"></a> `rx_pckts_cur?` | `number` | Current received packets counter. | - | services/machine-nic-stats/types.ts:50 |
| <a id="property-tx_bytes_cur"></a> `tx_bytes_cur?` | `number` | Current transmitted bytes counter. | - | services/machine-nic-stats/types.ts:53 |
| <a id="property-rx_bytes_cur"></a> `rx_bytes_cur?` | `number` | Current received bytes counter. | - | services/machine-nic-stats/types.ts:56 |
| <a id="property-last_update-2"></a> `last_update?` | `number` | Last update timestamp (Unix epoch). Read-only. | - | services/machine-nic-stats/types.ts:59 |
| <a id="property-bulk_update-1"></a> `bulk_update?` | `unknown` | Bulk update data (JSON). | - | services/machine-nic-stats/types.ts:62 |
| <a id="property-key-29"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineNIC

Defined in: services/machine-nic/types.ts:39

A VergeOS machine NIC resource.

Machine NICs represent virtual network interfaces attached to a machine
(VM or physical node). The `machine` FK links to the parent machine,
and `vnet` links to the attached virtual network.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-machine-6"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | - | services/machine-nic/types.ts:41 |
| <a id="property-orderid-6"></a> `orderid?` | `number` | Boot/device order position. Min 0, max 30. | - | services/machine-nic/types.ts:44 |
| <a id="property-name-37"></a> `name?` | `string` | NIC display name. Min 1, max 128 characters. | - | services/machine-nic/types.ts:47 |
| <a id="property-interface-4"></a> `interface?` | [`NicInterface`](#nicinterface) | Virtual network adapter type. Default: `virtio`. | - | services/machine-nic/types.ts:50 |
| <a id="property-driver"></a> `driver?` | `string` | Physical NIC driver (free-text, for hardware NICs). | - | services/machine-nic/types.ts:53 |
| <a id="property-model-1"></a> `model?` | `string` | Physical NIC model (free-text, for hardware NICs). | - | services/machine-nic/types.ts:56 |
| <a id="property-vendor"></a> `vendor?` | `string` | Physical NIC vendor (free-text, for hardware NICs). | - | services/machine-nic/types.ts:59 |
| <a id="property-port"></a> `port?` | `number` | Port number. | - | services/machine-nic/types.ts:62 |
| <a id="property-description-39"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/machine-nic/types.ts:65 |
| <a id="property-enabled-26"></a> `enabled?` | `boolean` | Whether the NIC is enabled. Default: `true`. | - | services/machine-nic/types.ts:68 |
| <a id="property-disable_mq"></a> `disable_mq?` | `boolean` | Whether to disable multiqueue. Default: `false`. | - | services/machine-nic/types.ts:71 |
| <a id="property-vnet-3"></a> `vnet?` | [`FlexKey`](#flexkey) | Attached virtual network (FK to `vnets`). | - | services/machine-nic/types.ts:74 |
| <a id="property-macaddress"></a> `macaddress?` | `string` | MAC address. | - | services/machine-nic/types.ts:77 |
| <a id="property-ipv4_config"></a> `ipv4_config?` | [`FlexKey`](#flexkey) | IPv4 configuration reference (FK to `machine_nic_ipv4_configs`). | - | services/machine-nic/types.ts:80 |
| <a id="property-asset-6"></a> `asset?` | `string` | Asset tag for recipe/snapshot identification. Min 1, max 32 characters. | - | services/machine-nic/types.ts:83 |
| <a id="property-ipaddress"></a> `ipaddress?` | `string` | IP address. | - | services/machine-nic/types.ts:86 |
| <a id="property-device"></a> `device?` | `string` | Device path. Read-only. | - | services/machine-nic/types.ts:89 |
| <a id="property-key-30"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineNICCreateParams

Defined in: services/machine-nic/types.ts:100

Parameters for creating a new machine NIC.

Only `machine` is required. Read-only fields (`device`, `stats`, `status`)
are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-machine-7"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | services/machine-nic/types.ts:102 |
| <a id="property-name-38"></a> `name?` | `string` | NIC display name. Min 1, max 128 characters. | services/machine-nic/types.ts:105 |
| <a id="property-interface-5"></a> `interface?` | [`NicInterface`](#nicinterface) | Virtual network adapter type. Default: `virtio`. | services/machine-nic/types.ts:108 |
| <a id="property-driver-1"></a> `driver?` | `string` | Physical NIC driver. | services/machine-nic/types.ts:111 |
| <a id="property-model-2"></a> `model?` | `string` | Physical NIC model. | services/machine-nic/types.ts:114 |
| <a id="property-vendor-1"></a> `vendor?` | `string` | Physical NIC vendor. | services/machine-nic/types.ts:117 |
| <a id="property-port-1"></a> `port?` | `number` | Port number. | services/machine-nic/types.ts:120 |
| <a id="property-description-40"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/machine-nic/types.ts:123 |
| <a id="property-enabled-27"></a> `enabled?` | `boolean` | Whether the NIC is enabled. Default: `true`. | services/machine-nic/types.ts:126 |
| <a id="property-disable_mq-1"></a> `disable_mq?` | `boolean` | Whether to disable multiqueue. Default: `false`. | services/machine-nic/types.ts:129 |
| <a id="property-vnet-4"></a> `vnet?` | [`FlexKey`](#flexkey) | Attached virtual network (FK to `vnets`). | services/machine-nic/types.ts:132 |
| <a id="property-macaddress-1"></a> `macaddress?` | `string` | MAC address. | services/machine-nic/types.ts:135 |
| <a id="property-ipaddress-1"></a> `ipaddress?` | `string` | IP address. | services/machine-nic/types.ts:138 |
| <a id="property-orderid-7"></a> `orderid?` | `number` | Boot/device order position. Min 0, max 30. | services/machine-nic/types.ts:141 |
| <a id="property-asset-7"></a> `asset?` | `string` | Asset tag. Min 1, max 32 characters. | services/machine-nic/types.ts:144 |

***

### MachineNICUpdateParams

Defined in: services/machine-nic/types.ts:155

Parameters for updating an existing machine NIC.

All fields are optional — only provided fields are changed.
Read-only fields (`device`, `stats`, `status`) and `machine` are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-39"></a> `name?` | `string` | NIC display name. Min 1, max 128 characters. | services/machine-nic/types.ts:157 |
| <a id="property-interface-6"></a> `interface?` | [`NicInterface`](#nicinterface) | Virtual network adapter type. | services/machine-nic/types.ts:160 |
| <a id="property-driver-2"></a> `driver?` | `string` | Physical NIC driver. | services/machine-nic/types.ts:163 |
| <a id="property-model-3"></a> `model?` | `string` | Physical NIC model. | services/machine-nic/types.ts:166 |
| <a id="property-vendor-2"></a> `vendor?` | `string` | Physical NIC vendor. | services/machine-nic/types.ts:169 |
| <a id="property-port-2"></a> `port?` | `number` | Port number. | services/machine-nic/types.ts:172 |
| <a id="property-description-41"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/machine-nic/types.ts:175 |
| <a id="property-enabled-28"></a> `enabled?` | `boolean` | Whether the NIC is enabled. | services/machine-nic/types.ts:178 |
| <a id="property-disable_mq-2"></a> `disable_mq?` | `boolean` | Whether to disable multiqueue. | services/machine-nic/types.ts:181 |
| <a id="property-vnet-5"></a> `vnet?` | [`FlexKey`](#flexkey) | Attached virtual network (FK to `vnets`). | services/machine-nic/types.ts:184 |
| <a id="property-macaddress-2"></a> `macaddress?` | `string` | MAC address. | services/machine-nic/types.ts:187 |
| <a id="property-ipaddress-2"></a> `ipaddress?` | `string` | IP address. | services/machine-nic/types.ts:190 |
| <a id="property-orderid-8"></a> `orderid?` | `number` | Boot/device order position. Min 0, max 30. | services/machine-nic/types.ts:193 |
| <a id="property-asset-8"></a> `asset?` | `string` | Asset tag. Min 1, max 32 characters. | services/machine-nic/types.ts:196 |

***

### MachineSnapshot

Defined in: services/machine-snapshot/types.ts:18

A VergeOS machine snapshot resource.

Machine snapshots capture the state of a machine (VM or physical node)
at a point in time. The `machine` FK links to the parent machine.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-machine-8"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). Read-only. | - | services/machine-snapshot/types.ts:20 |
| <a id="property-snap_machine"></a> `snap_machine?` | [`FlexKey`](#flexkey) | Snapshot machine copy reference (FK to `machines`). | - | services/machine-snapshot/types.ts:23 |
| <a id="property-name-40"></a> `name` | `string` | Snapshot display name. Min 1, max 128 characters. Unique. | - | services/machine-snapshot/types.ts:26 |
| <a id="property-created-9"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/machine-snapshot/types.ts:29 |
| <a id="property-description-42"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/machine-snapshot/types.ts:32 |
| <a id="property-expires_type-5"></a> `expires_type?` | [`ExpiresType`](#expirestype) | Expiration policy. Default: `date`. | - | services/machine-snapshot/types.ts:35 |
| <a id="property-expires-7"></a> `expires?` | `number` | Expiration timestamp (Unix epoch). | - | services/machine-snapshot/types.ts:38 |
| <a id="property-created_manually"></a> `created_manually?` | `boolean` | Whether this snapshot was created manually. Default: `false`. | - | services/machine-snapshot/types.ts:41 |
| <a id="property-quiesce"></a> `quiesce?` | `boolean` | Whether to quiesce the guest filesystem before snapshotting. | - | services/machine-snapshot/types.ts:44 |
| <a id="property-quiesced"></a> `quiesced?` | `boolean` | Whether the guest filesystem was successfully quiesced. Read-only (locked). | - | services/machine-snapshot/types.ts:47 |
| <a id="property-queue_delete"></a> `queue_delete?` | `boolean` | Whether this snapshot is queued for deletion. Default: `false`. | - | services/machine-snapshot/types.ts:50 |
| <a id="property-expires_timer"></a> `expires_timer?` | `number` | Expiration timer value. | - | services/machine-snapshot/types.ts:53 |
| <a id="property-snapshot_period-1"></a> `snapshot_period?` | [`FlexKey`](#flexkey) | Snapshot profile period reference (FK to `snapshot_profile_periods`). | - | services/machine-snapshot/types.ts:56 |
| <a id="property-key-31"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineSnapshotCreateParams

Defined in: services/machine-snapshot/types.ts:67

Parameters for creating a new machine snapshot.

Only `name` and `machine` are required. Read-only fields (`created`, `quiesced`)
are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-machine-9"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | services/machine-snapshot/types.ts:69 |
| <a id="property-name-41"></a> `name` | `string` | Snapshot display name. Min 1, max 128 characters. Must be unique. | services/machine-snapshot/types.ts:72 |
| <a id="property-snap_machine-1"></a> `snap_machine?` | [`FlexKey`](#flexkey) | Snapshot machine copy reference (FK to `machines`). | services/machine-snapshot/types.ts:75 |
| <a id="property-description-43"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/machine-snapshot/types.ts:78 |
| <a id="property-expires_type-6"></a> `expires_type?` | [`ExpiresType`](#expirestype) | Expiration policy. Default: `date`. | services/machine-snapshot/types.ts:81 |
| <a id="property-expires-8"></a> `expires?` | `number` | Expiration timestamp (Unix epoch). | services/machine-snapshot/types.ts:84 |
| <a id="property-created_manually-1"></a> `created_manually?` | `boolean` | Whether this snapshot was created manually. Default: `false`. | services/machine-snapshot/types.ts:87 |
| <a id="property-quiesce-1"></a> `quiesce?` | `boolean` | Whether to quiesce the guest filesystem before snapshotting. | services/machine-snapshot/types.ts:90 |
| <a id="property-queue_delete-1"></a> `queue_delete?` | `boolean` | Whether this snapshot is queued for deletion. Default: `false`. | services/machine-snapshot/types.ts:93 |
| <a id="property-expires_timer-1"></a> `expires_timer?` | `number` | Expiration timer value. | services/machine-snapshot/types.ts:96 |
| <a id="property-snapshot_period-2"></a> `snapshot_period?` | [`FlexKey`](#flexkey) | Snapshot profile period reference (FK to `snapshot_profile_periods`). | services/machine-snapshot/types.ts:99 |

***

### MachineSnapshotUpdateParams

Defined in: services/machine-snapshot/types.ts:110

Parameters for updating an existing machine snapshot.

All fields are optional — only provided fields are changed.
Read-only fields (`machine`, `created`, `quiesced`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-42"></a> `name?` | `string` | Snapshot display name. Min 1, max 128 characters. Must be unique. | services/machine-snapshot/types.ts:112 |
| <a id="property-snap_machine-2"></a> `snap_machine?` | [`FlexKey`](#flexkey) | Snapshot machine copy reference (FK to `machines`). | services/machine-snapshot/types.ts:115 |
| <a id="property-description-44"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/machine-snapshot/types.ts:118 |
| <a id="property-expires_type-7"></a> `expires_type?` | [`ExpiresType`](#expirestype) | Expiration policy. | services/machine-snapshot/types.ts:121 |
| <a id="property-expires-9"></a> `expires?` | `number` | Expiration timestamp (Unix epoch). | services/machine-snapshot/types.ts:124 |
| <a id="property-created_manually-2"></a> `created_manually?` | `boolean` | Whether this snapshot was created manually. | services/machine-snapshot/types.ts:127 |
| <a id="property-quiesce-2"></a> `quiesce?` | `boolean` | Whether to quiesce the guest filesystem before snapshotting. | services/machine-snapshot/types.ts:130 |
| <a id="property-queue_delete-2"></a> `queue_delete?` | `boolean` | Whether this snapshot is queued for deletion. | services/machine-snapshot/types.ts:133 |
| <a id="property-expires_timer-2"></a> `expires_timer?` | `number` | Expiration timer value. | services/machine-snapshot/types.ts:136 |
| <a id="property-snapshot_period-3"></a> `snapshot_period?` | [`FlexKey`](#flexkey) | Snapshot profile period reference (FK to `snapshot_profile_periods`). | services/machine-snapshot/types.ts:139 |

***

### MachineStatsHistoryLong

Defined in: services/machine-stats-history-long/types.ts:15

A VergeOS machine stats history (long-term) resource.

Provides long-term historical CPU and RAM utilization metrics per machine.
Includes all fields from the short-term history plus additional aggregate
metrics (peaks and averages). This is a read-only monitoring resource
managed by the system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-machine-10"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | - | services/machine-stats-history-long/types.ts:17 |
| <a id="property-total_cpu"></a> `total_cpu?` | `number` | Total CPU usage percentage. | - | services/machine-stats-history-long/types.ts:20 |
| <a id="property-user_cpu"></a> `user_cpu?` | `number` | User-space CPU usage percentage. | - | services/machine-stats-history-long/types.ts:23 |
| <a id="property-system_cpu"></a> `system_cpu?` | `number` | System/kernel CPU usage percentage. | - | services/machine-stats-history-long/types.ts:26 |
| <a id="property-iowait_cpu"></a> `iowait_cpu?` | `number` | I/O wait CPU percentage. | - | services/machine-stats-history-long/types.ts:29 |
| <a id="property-vmusage_cpu"></a> `vmusage_cpu?` | `number` | VM usage CPU percentage. | - | services/machine-stats-history-long/types.ts:32 |
| <a id="property-irq_cpu"></a> `irq_cpu?` | `number` | IRQ CPU usage percentage. | - | services/machine-stats-history-long/types.ts:35 |
| <a id="property-ram_used"></a> `ram_used?` | `number` | RAM used in bytes. | - | services/machine-stats-history-long/types.ts:38 |
| <a id="property-vram_used"></a> `vram_used?` | `number` | Virtual RAM used in bytes. | - | services/machine-stats-history-long/types.ts:41 |
| <a id="property-core_usagelist"></a> `core_usagelist?` | `unknown` | Per-core usage data (JSON). | - | services/machine-stats-history-long/types.ts:44 |
| <a id="property-core_temp"></a> `core_temp?` | `number` | Core temperature. | - | services/machine-stats-history-long/types.ts:47 |
| <a id="property-core_temp_top"></a> `core_temp_top?` | `number` | Top core temperature. | - | services/machine-stats-history-long/types.ts:50 |
| <a id="property-core_peak"></a> `core_peak?` | `number` | Core peak usage. | - | services/machine-stats-history-long/types.ts:53 |
| <a id="property-core_count_gt_25"></a> `core_count_gt_25?` | `number` | Number of cores with usage > 25%. | - | services/machine-stats-history-long/types.ts:56 |
| <a id="property-core_count_gt_50"></a> `core_count_gt_50?` | `number` | Number of cores with usage > 50%. | - | services/machine-stats-history-long/types.ts:59 |
| <a id="property-core_count_gt_75"></a> `core_count_gt_75?` | `number` | Number of cores with usage > 75%. | - | services/machine-stats-history-long/types.ts:62 |
| <a id="property-timestamp-4"></a> `timestamp?` | `number` | Snapshot timestamp (Unix epoch). | - | services/machine-stats-history-long/types.ts:65 |
| <a id="property-core_temp_peak"></a> `core_temp_peak?` | `number` | Peak core temperature over the long-term period. | - | services/machine-stats-history-long/types.ts:68 |
| <a id="property-core_average"></a> `core_average?` | `number` | Average core usage over the long-term period. | - | services/machine-stats-history-long/types.ts:71 |
| <a id="property-core_count_gt_25_avg"></a> `core_count_gt_25_avg?` | `number` | Average number of cores with usage > 25%. | - | services/machine-stats-history-long/types.ts:74 |
| <a id="property-core_count_gt_50_avg"></a> `core_count_gt_50_avg?` | `number` | Average number of cores with usage > 50%. | - | services/machine-stats-history-long/types.ts:77 |
| <a id="property-core_count_gt_75_avg"></a> `core_count_gt_75_avg?` | `number` | Average number of cores with usage > 75%. | - | services/machine-stats-history-long/types.ts:80 |
| <a id="property-core_count_gt_25_peak"></a> `core_count_gt_25_peak?` | `number` | Peak number of cores with usage > 25%. | - | services/machine-stats-history-long/types.ts:83 |
| <a id="property-core_count_gt_50_peak"></a> `core_count_gt_50_peak?` | `number` | Peak number of cores with usage > 50%. | - | services/machine-stats-history-long/types.ts:86 |
| <a id="property-core_count_gt_75_peak"></a> `core_count_gt_75_peak?` | `number` | Peak number of cores with usage > 75%. | - | services/machine-stats-history-long/types.ts:89 |
| <a id="property-key-32"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineStatsHistoryShort

Defined in: services/machine-stats-history-short/types.ts:14

A VergeOS machine stats history (short-term) resource.

Provides short-term historical CPU and RAM utilization metrics per machine.
Each row captures a point-in-time snapshot of machine performance. This is
a read-only monitoring resource managed by the system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-machine-11"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | - | services/machine-stats-history-short/types.ts:16 |
| <a id="property-total_cpu-1"></a> `total_cpu?` | `number` | Total CPU usage percentage. | - | services/machine-stats-history-short/types.ts:19 |
| <a id="property-user_cpu-1"></a> `user_cpu?` | `number` | User-space CPU usage percentage. | - | services/machine-stats-history-short/types.ts:22 |
| <a id="property-system_cpu-1"></a> `system_cpu?` | `number` | System/kernel CPU usage percentage. | - | services/machine-stats-history-short/types.ts:25 |
| <a id="property-iowait_cpu-1"></a> `iowait_cpu?` | `number` | I/O wait CPU percentage. | - | services/machine-stats-history-short/types.ts:28 |
| <a id="property-vmusage_cpu-1"></a> `vmusage_cpu?` | `number` | VM usage CPU percentage. | - | services/machine-stats-history-short/types.ts:31 |
| <a id="property-irq_cpu-1"></a> `irq_cpu?` | `number` | IRQ CPU usage percentage. | - | services/machine-stats-history-short/types.ts:34 |
| <a id="property-ram_used-1"></a> `ram_used?` | `number` | RAM used in bytes. | - | services/machine-stats-history-short/types.ts:37 |
| <a id="property-vram_used-1"></a> `vram_used?` | `number` | Virtual RAM used in bytes. | - | services/machine-stats-history-short/types.ts:40 |
| <a id="property-core_usagelist-1"></a> `core_usagelist?` | `unknown` | Per-core usage data (JSON). | - | services/machine-stats-history-short/types.ts:43 |
| <a id="property-core_temp-1"></a> `core_temp?` | `number` | Core temperature. | - | services/machine-stats-history-short/types.ts:46 |
| <a id="property-core_temp_top-1"></a> `core_temp_top?` | `number` | Top core temperature. | - | services/machine-stats-history-short/types.ts:49 |
| <a id="property-core_peak-1"></a> `core_peak?` | `number` | Core peak usage. | - | services/machine-stats-history-short/types.ts:52 |
| <a id="property-core_count_gt_25-1"></a> `core_count_gt_25?` | `number` | Number of cores with usage > 25%. | - | services/machine-stats-history-short/types.ts:55 |
| <a id="property-core_count_gt_50-1"></a> `core_count_gt_50?` | `number` | Number of cores with usage > 50%. | - | services/machine-stats-history-short/types.ts:58 |
| <a id="property-core_count_gt_75-1"></a> `core_count_gt_75?` | `number` | Number of cores with usage > 75%. | - | services/machine-stats-history-short/types.ts:61 |
| <a id="property-timestamp-5"></a> `timestamp?` | `number` | Snapshot timestamp (Unix epoch). | - | services/machine-stats-history-short/types.ts:64 |
| <a id="property-key-33"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineStats

Defined in: services/machine-stats/types.ts:14

A VergeOS machine stats resource.

Provides per-machine CPU and RAM utilization metrics. Each machine
(VM or physical node) has one stats row that is continuously updated
by the system. This is a read-only monitoring resource.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-machine-12"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | - | services/machine-stats/types.ts:16 |
| <a id="property-total_cpu-2"></a> `total_cpu?` | `number` | Total CPU usage percentage. | - | services/machine-stats/types.ts:19 |
| <a id="property-user_cpu-2"></a> `user_cpu?` | `number` | User-space CPU usage percentage. | - | services/machine-stats/types.ts:22 |
| <a id="property-system_cpu-2"></a> `system_cpu?` | `number` | System/kernel CPU usage percentage. | - | services/machine-stats/types.ts:25 |
| <a id="property-iowait_cpu-2"></a> `iowait_cpu?` | `number` | I/O wait CPU percentage. | - | services/machine-stats/types.ts:28 |
| <a id="property-vmusage_cpu-2"></a> `vmusage_cpu?` | `number` | VM usage CPU percentage. | - | services/machine-stats/types.ts:31 |
| <a id="property-irq_cpu-2"></a> `irq_cpu?` | `number` | IRQ CPU usage percentage. | - | services/machine-stats/types.ts:34 |
| <a id="property-ram_used-2"></a> `ram_used?` | `number` | RAM used in bytes (32-bit unsigned). | - | services/machine-stats/types.ts:37 |
| <a id="property-ram_pct"></a> `ram_pct?` | `number` | Physical RAM used percentage. | - | services/machine-stats/types.ts:40 |
| <a id="property-vram_used-2"></a> `vram_used?` | `number` | Virtual RAM used in bytes (32-bit unsigned). | - | services/machine-stats/types.ts:43 |
| <a id="property-core_usagelist-2"></a> `core_usagelist?` | `unknown` | Per-core usage data (JSON). | - | services/machine-stats/types.ts:46 |
| <a id="property-core_temp-2"></a> `core_temp?` | `number` | Core temperature. | - | services/machine-stats/types.ts:49 |
| <a id="property-core_temp_top-2"></a> `core_temp_top?` | `number` | Top core temperature. | - | services/machine-stats/types.ts:52 |
| <a id="property-core_peak-2"></a> `core_peak?` | `number` | Core peak usage. | - | services/machine-stats/types.ts:55 |
| <a id="property-core_count_gt_25-2"></a> `core_count_gt_25?` | `number` | Number of cores with usage > 25%. | - | services/machine-stats/types.ts:58 |
| <a id="property-core_count_gt_50-2"></a> `core_count_gt_50?` | `number` | Number of cores with usage > 50%. | - | services/machine-stats/types.ts:61 |
| <a id="property-core_count_gt_75-2"></a> `core_count_gt_75?` | `number` | Number of cores with usage > 75%. | - | services/machine-stats/types.ts:64 |
| <a id="property-modified-9"></a> `modified?` | `number` | Last modified timestamp (Unix epoch). Read-only. | - | services/machine-stats/types.ts:67 |
| <a id="property-key-34"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MachineStatus

Defined in: services/machine-status/types.ts:51

A VergeOS machine status resource.

Provides the authoritative runtime state for a machine (VM, tenant node,
or physical node) — power state, detailed status, migration tracking,
live resource consumption, and guest agent info. Each machine has exactly
one status row that is continuously updated by the system.

This is a **read-only** resource — status entries are managed by the
platform and cannot be created, updated, or deleted via the API.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-machine-13"></a> `machine` | [`FlexKey`](#flexkey) | Parent machine reference (FK to `machines`). | - | services/machine-status/types.ts:53 |
| <a id="property-running"></a> `running?` | `boolean` | Whether the machine process is currently running. | - | services/machine-status/types.ts:56 |
| <a id="property-migratable"></a> `migratable?` | `boolean` | Whether the machine supports live migration. Default: `true`. | - | services/machine-status/types.ts:59 |
| <a id="property-node"></a> `node?` | [`FlexKey`](#flexkey) | Physical node the machine is running on (FK to `nodes`). | - | services/machine-status/types.ts:62 |
| <a id="property-migrated_node"></a> `migrated_node?` | [`FlexKey`](#flexkey) | Node the machine was migrated from (FK to `nodes`). | - | services/machine-status/types.ts:65 |
| <a id="property-migration_destination"></a> `migration_destination?` | [`FlexKey`](#flexkey) | Target node for an in-progress migration (FK to `nodes`). | - | services/machine-status/types.ts:68 |
| <a id="property-config"></a> `config?` | `unknown` | Runtime configuration snapshot (JSON). | - | services/machine-status/types.ts:71 |
| <a id="property-started"></a> `started?` | `number` | Timestamp when the machine was started (Unix epoch). | - | services/machine-status/types.ts:74 |
| <a id="property-local_time"></a> `local_time?` | `number` | Local time of the machine (Unix epoch). | - | services/machine-status/types.ts:77 |
| <a id="property-status-9"></a> `status?` | [`MachineStatusValue`](#machinestatusvalue) | Detailed runtime status. See [MachineStatusValue](#machinestatusvalue) for all possible values. Default: `stopped`. | - | services/machine-status/types.ts:84 |
| <a id="property-status_info-4"></a> `status_info?` | `string` | Human-readable status information or error details. | - | services/machine-status/types.ts:87 |
| <a id="property-state-1"></a> `state?` | [`MachineState`](#machinestate) | High-level health state. See [MachineState](#machinestate) for all possible values. Default: `offline`. | - | services/machine-status/types.ts:94 |
| <a id="property-powerstate"></a> `powerstate?` | `boolean` | Whether the machine is powered on. Default: `false`. | - | services/machine-status/types.ts:97 |
| <a id="property-last_update-3"></a> `last_update?` | `number` | Last status update timestamp (Unix epoch). Read-only. | - | services/machine-status/types.ts:100 |
| <a id="property-running_cores"></a> `running_cores?` | `number` | Number of CPU cores currently allocated to the running machine. | - | services/machine-status/types.ts:103 |
| <a id="property-running_ram"></a> `running_ram?` | `number` | Amount of RAM (MB) currently allocated to the running machine. | - | services/machine-status/types.ts:106 |
| <a id="property-agent_version"></a> `agent_version?` | `string` | Version string of the guest agent, if installed. | - | services/machine-status/types.ts:109 |
| <a id="property-agent_features"></a> `agent_features?` | `unknown` | Feature flags reported by the guest agent (JSON). | - | services/machine-status/types.ts:112 |
| <a id="property-agent_guest_info"></a> `agent_guest_info?` | `unknown` | Guest OS information reported by the agent (JSON). | - | services/machine-status/types.ts:115 |
| <a id="property-key-35"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### Member

Defined in: services/member/types.ts:14

A VergeOS group membership resource.

Members represent the join table linking users or groups to parent groups.
Both `parent_group` and `member` are read-only after creation, so updates
are effectively limited to the `system` flag.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-parent_group"></a> `parent_group?` | [`FlexKey`](#flexkey) | Parent group FK (FK to `groups`). Read-only after creation. | - | services/member/types.ts:16 |
| <a id="property-member"></a> `member?` | `string` | Member reference string (e.g., `users/3` or `groups/5`). Read-only after creation. | - | services/member/types.ts:19 |
| <a id="property-sys_member"></a> `sys_member?` | [`FlexKey`](#flexkey) | System member FK (FK to `/sys/members`). Read-only. | - | services/member/types.ts:22 |
| <a id="property-system-1"></a> `system?` | `boolean` | Whether this is a system-managed membership. Locked. | - | services/member/types.ts:25 |
| <a id="property-creator-3"></a> `creator?` | `string` | User who created this membership. Read-only. | - | services/member/types.ts:28 |
| <a id="property-key-36"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### MemberCreateParams

Defined in: services/member/types.ts:38

Parameters for creating a new group membership.

Both `parent_group` and `member` become read-only after creation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-parent_group-1"></a> `parent_group` | [`FlexKey`](#flexkey) | Parent group to add the member to (FK to `groups`). | services/member/types.ts:40 |
| <a id="property-member-1"></a> `member` | `string` | Member reference string (e.g., `users/3` or `groups/5`). | services/member/types.ts:43 |

***

### NASServiceUser

Defined in: services/nas-service-user/types.ts:15

A VergeOS NAS service user resource.

NAS service users are per-NAS-service accounts for CIFS/NFS access.
The API endpoint is `/vm_service_users`. Keys are 40-character SHA1
hash strings. The `service` FK references the parent NAS service
(`vm_services`).

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id-6"></a> `id` | `string` | User ID — 40-character SHA1 hash. Read-only, unique. | - | services/nas-service-user/types.ts:17 |
| <a id="property-service"></a> `service` | [`FlexKey`](#flexkey) | Parent NAS service reference (FK to `vm_services`). Required, read-only. | - | services/nas-service-user/types.ts:20 |
| <a id="property-name-43"></a> `name` | `string` | Username. Min 1, max 32 characters. Required, read-only after creation, unique. | - | services/nas-service-user/types.ts:23 |
| <a id="property-enabled-29"></a> `enabled?` | `boolean` | Whether the user is enabled. Default: true. | - | services/nas-service-user/types.ts:26 |
| <a id="property-home_share"></a> `home_share?` | [`FlexKey`](#flexkey) | Home CIFS share (FK to `volume_cifs_shares`). | - | services/nas-service-user/types.ts:29 |
| <a id="property-home_drive"></a> `home_drive?` | `string` | Home drive letter. | - | services/nas-service-user/types.ts:32 |
| <a id="property-displayname"></a> `displayname?` | `string` | User display name. | - | services/nas-service-user/types.ts:35 |
| <a id="property-description-45"></a> `description?` | `string` | User description. Max 2048 characters. | - | services/nas-service-user/types.ts:38 |
| <a id="property-created-10"></a> `created?` | `number` | Creation timestamp (Unix epoch, uint32). | - | services/nas-service-user/types.ts:41 |
| <a id="property-password-3"></a> `password?` | `string` | User password. Max 256 characters. | - | services/nas-service-user/types.ts:44 |
| <a id="property-status-10"></a> `status?` | [`FlexKey`](#flexkey) | User status reference (FK to `vm_service_user_status`). Read-only. | - | services/nas-service-user/types.ts:47 |
| <a id="property-key-37"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### NASServiceUserCreateParams

Defined in: services/nas-service-user/types.ts:58

Parameters for creating a new NAS service user.

`service`, `name`, and `password` are required.
`name` is read-only after creation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-service-1"></a> `service` | [`FlexKey`](#flexkey) | Parent NAS service reference (FK to `vm_services`). Required. | services/nas-service-user/types.ts:60 |
| <a id="property-name-44"></a> `name` | `string` | Username. Min 1, max 32 characters. Required, unique. | services/nas-service-user/types.ts:63 |
| <a id="property-password-4"></a> `password` | `string` | User password. Required. Max 256 characters. | services/nas-service-user/types.ts:66 |
| <a id="property-enabled-30"></a> `enabled?` | `boolean` | Whether the user is enabled. Default: true. | services/nas-service-user/types.ts:69 |
| <a id="property-home_share-1"></a> `home_share?` | [`FlexKey`](#flexkey) | Home CIFS share (FK to `volume_cifs_shares`). | services/nas-service-user/types.ts:72 |
| <a id="property-home_drive-1"></a> `home_drive?` | `string` | Home drive letter. | services/nas-service-user/types.ts:75 |
| <a id="property-displayname-1"></a> `displayname?` | `string` | User display name. | services/nas-service-user/types.ts:78 |
| <a id="property-description-46"></a> `description?` | `string` | User description. Max 2048 characters. | services/nas-service-user/types.ts:81 |

***

### NASServiceUserUpdateParams

Defined in: services/nas-service-user/types.ts:92

Parameters for updating an existing NAS service user.

All fields are optional — only provided fields are changed.
Read-only fields (`id`, `service`, `name`, `status`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-password-5"></a> `password?` | `string` | User password. Max 256 characters. | services/nas-service-user/types.ts:94 |
| <a id="property-enabled-31"></a> `enabled?` | `boolean` | Whether the user is enabled. | services/nas-service-user/types.ts:97 |
| <a id="property-home_share-2"></a> `home_share?` | [`FlexKey`](#flexkey) | Home CIFS share (FK to `volume_cifs_shares`). | services/nas-service-user/types.ts:100 |
| <a id="property-home_drive-2"></a> `home_drive?` | `string` | Home drive letter. | services/nas-service-user/types.ts:103 |
| <a id="property-displayname-2"></a> `displayname?` | `string` | User display name. | services/nas-service-user/types.ts:106 |
| <a id="property-description-47"></a> `description?` | `string` | User description. Max 2048 characters. | services/nas-service-user/types.ts:109 |

***

### NASService

Defined in: services/nas-service/types.ts:28

A VergeOS NAS service resource.

NAS services manage file sharing (CIFS/NFS) for volumes. The actual API
endpoint is `/vm_services` — each NAS service is backed by a dedicated VM.
The `vm` FK references the underlying VM.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-vm"></a> `vm` | [`FlexKey`](#flexkey) | Parent VM reference (FK to `vms`). Read-only, unique. | - | services/nas-service/types.ts:30 |
| <a id="property-name-45"></a> `name` | `string` | NAS service name. Trimmed. | - | services/nas-service/types.ts:33 |
| <a id="property-cifs"></a> `cifs?` | [`FlexKey`](#flexkey) | CIFS configuration reference (FK to `vm_service_cifs`). Read-only. | - | services/nas-service/types.ts:36 |
| <a id="property-nfs"></a> `nfs?` | [`FlexKey`](#flexkey) | NFS configuration reference (FK to `vm_service_nfs`). Read-only. | - | services/nas-service/types.ts:39 |
| <a id="property-antivirus"></a> `antivirus?` | [`FlexKey`](#flexkey) | Antivirus configuration reference (FK to `vm_service_antivirus`). Read-only. | - | services/nas-service/types.ts:42 |
| <a id="property-max_imports"></a> `max_imports?` | `number` | Maximum simultaneous import jobs. Min 1, max 200. Default: 4. | - | services/nas-service/types.ts:45 |
| <a id="property-max_syncs"></a> `max_syncs?` | `number` | Maximum simultaneous sync jobs. Min 0, max 200. Default: 0. | - | services/nas-service/types.ts:48 |
| <a id="property-disable_swap"></a> `disable_swap?` | `boolean` | Whether swap is disabled. Default: false. | - | services/nas-service/types.ts:51 |
| <a id="property-read_ahead_kb_default"></a> `read_ahead_kb_default?` | [`NASReadAheadKb`](#nasreadaheadkb) | Read-ahead buffer size in kilobytes. Default: '0' (automatic). | - | services/nas-service/types.ts:54 |
| <a id="property-key-38"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### NASServiceCreateParams

Defined in: services/nas-service/types.ts:65

Parameters for creating a new NAS service.

The `vm` FK is typically set by the system when creating the service.
Most fields have sensible defaults.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-46"></a> `name?` | `string` | NAS service name. | services/nas-service/types.ts:67 |
| <a id="property-max_imports-1"></a> `max_imports?` | `number` | Maximum simultaneous import jobs. Min 1, max 200. Default: 4. | services/nas-service/types.ts:70 |
| <a id="property-max_syncs-1"></a> `max_syncs?` | `number` | Maximum simultaneous sync jobs. Min 0, max 200. Default: 0. | services/nas-service/types.ts:73 |
| <a id="property-disable_swap-1"></a> `disable_swap?` | `boolean` | Whether swap is disabled. Default: false. | services/nas-service/types.ts:76 |
| <a id="property-read_ahead_kb_default-1"></a> `read_ahead_kb_default?` | [`NASReadAheadKb`](#nasreadaheadkb) | Read-ahead buffer size in kilobytes. Default: '0' (automatic). | services/nas-service/types.ts:79 |

***

### NASServiceUpdateParams

Defined in: services/nas-service/types.ts:90

Parameters for updating an existing NAS service.

All fields are optional — only provided fields are changed.
Read-only fields (`vm`, `cifs`, `nfs`, `antivirus`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-47"></a> `name?` | `string` | NAS service name. | services/nas-service/types.ts:92 |
| <a id="property-max_imports-2"></a> `max_imports?` | `number` | Maximum simultaneous import jobs. Min 1, max 200. | services/nas-service/types.ts:95 |
| <a id="property-max_syncs-2"></a> `max_syncs?` | `number` | Maximum simultaneous sync jobs. Min 0, max 200. | services/nas-service/types.ts:98 |
| <a id="property-disable_swap-2"></a> `disable_swap?` | `boolean` | Whether swap is disabled. | services/nas-service/types.ts:101 |
| <a id="property-read_ahead_kb_default-2"></a> `read_ahead_kb_default?` | [`NASReadAheadKb`](#nasreadaheadkb) | Read-ahead buffer size in kilobytes. | services/nas-service/types.ts:104 |

***

### NetworkAddress

Defined in: services/network-address/types.ts:19

A VergeOS network address resource.

Network addresses represent DHCP leases, static IP assignments, IP aliases,
proxy ARP entries, and virtual IPs on a virtual network. Scoped to a parent
network via the `vnet` foreign key.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-vnet-6"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | - | services/network-address/types.ts:21 |
| <a id="property-mac"></a> `mac?` | `string` | MAC address associated with this entry. | - | services/network-address/types.ts:24 |
| <a id="property-ip"></a> `ip?` | `string` | IP address. | - | services/network-address/types.ts:27 |
| <a id="property-type-7"></a> `type` | [`AddressType`](#addresstype) | Address type. | - | services/network-address/types.ts:30 |
| <a id="property-hostname"></a> `hostname?` | `string` | Hostname associated with this address. | - | services/network-address/types.ts:33 |
| <a id="property-expiration"></a> `expiration?` | `number` | Expiration timestamp (Unix epoch, unsigned 32-bit). | - | services/network-address/types.ts:36 |
| <a id="property-owner-3"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference. | - | services/network-address/types.ts:39 |
| <a id="property-vendor-3"></a> `vendor?` | `string` | Hardware vendor string (trimmed). | - | services/network-address/types.ts:42 |
| <a id="property-description-48"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/network-address/types.ts:45 |
| <a id="property-key-39"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### NetworkAddressCreateParams

Defined in: services/network-address/types.ts:55

Parameters for creating a new network address.

`vnet` and `type` are required per the API schema.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-vnet-7"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | services/network-address/types.ts:57 |
| <a id="property-mac-1"></a> `mac?` | `string` | MAC address. | services/network-address/types.ts:60 |
| <a id="property-ip-1"></a> `ip?` | `string` | IP address. | services/network-address/types.ts:63 |
| <a id="property-type-8"></a> `type` | [`AddressType`](#addresstype) | Address type. | services/network-address/types.ts:66 |
| <a id="property-hostname-1"></a> `hostname?` | `string` | Hostname. | services/network-address/types.ts:69 |
| <a id="property-expiration-1"></a> `expiration?` | `number` | Expiration timestamp (Unix epoch, unsigned 32-bit). | services/network-address/types.ts:72 |
| <a id="property-owner-4"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference. | services/network-address/types.ts:75 |
| <a id="property-vendor-4"></a> `vendor?` | `string` | Hardware vendor string. | services/network-address/types.ts:78 |
| <a id="property-description-49"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/network-address/types.ts:81 |

***

### NetworkAddressUpdateParams

Defined in: services/network-address/types.ts:91

Parameters for updating an existing network address.

All fields are optional — only provided fields are changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-mac-2"></a> `mac?` | `string` | MAC address. | services/network-address/types.ts:93 |
| <a id="property-ip-2"></a> `ip?` | `string` | IP address. | services/network-address/types.ts:96 |
| <a id="property-type-9"></a> `type?` | [`AddressType`](#addresstype) | Address type. | services/network-address/types.ts:99 |
| <a id="property-hostname-2"></a> `hostname?` | `string` | Hostname. | services/network-address/types.ts:102 |
| <a id="property-expiration-2"></a> `expiration?` | `number` | Expiration timestamp (Unix epoch, unsigned 32-bit). | services/network-address/types.ts:105 |
| <a id="property-owner-5"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference. | services/network-address/types.ts:108 |
| <a id="property-vendor-5"></a> `vendor?` | `string` | Hardware vendor string. | services/network-address/types.ts:111 |
| <a id="property-description-50"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/network-address/types.ts:114 |

***

### NetworkDnsRecord

Defined in: services/network-dns-record/types.ts:28

A VergeOS DNS zone record resource.

DNS records belong to a DNS zone and represent individual DNS entries
(A, CNAME, MX, etc.). The `zone` field is set at creation and is
read-only afterward.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-zone"></a> `zone` | [`FlexKey`](#flexkey) | Parent DNS zone reference (FK to `vnet_dns_zones`). Read-only after creation. | - | services/network-dns-record/types.ts:30 |
| <a id="property-description-51"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/network-dns-record/types.ts:33 |
| <a id="property-host"></a> `host?` | `string` | Hostname or subdomain for this record. | - | services/network-dns-record/types.ts:36 |
| <a id="property-ttl"></a> `ttl?` | `string` | TTL for this record. | - | services/network-dns-record/types.ts:39 |
| <a id="property-type-10"></a> `type` | [`DnsRecordType`](#dnsrecordtype) | DNS record type. | - | services/network-dns-record/types.ts:42 |
| <a id="property-value"></a> `value` | `string` | Record value (IP address, hostname, text, etc.). | - | services/network-dns-record/types.ts:45 |
| <a id="property-mx_preference"></a> `mx_preference?` | `number` | MX preference value (lower = higher priority). | - | services/network-dns-record/types.ts:48 |
| <a id="property-weight"></a> `weight?` | `number` | SRV weight for load balancing. | - | services/network-dns-record/types.ts:51 |
| <a id="property-port-3"></a> `port?` | `number` | SRV port number. | - | services/network-dns-record/types.ts:54 |
| <a id="property-issue_wildcard"></a> `issue_wildcard?` | `boolean` | Whether to issue wildcard (CAA records). | - | services/network-dns-record/types.ts:57 |
| <a id="property-orderid-9"></a> `orderid?` | `number` | Ordering position. | - | services/network-dns-record/types.ts:60 |
| <a id="property-modified-10"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/network-dns-record/types.ts:63 |
| <a id="property-key-40"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### NetworkDnsRecordCreateParams

Defined in: services/network-dns-record/types.ts:73

Parameters for creating a new DNS record.

`zone`, `type`, and `value` are required.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-zone-1"></a> `zone` | [`FlexKey`](#flexkey) | Parent DNS zone reference (FK to `vnet_dns_zones`). | services/network-dns-record/types.ts:75 |
| <a id="property-description-52"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/network-dns-record/types.ts:78 |
| <a id="property-host-1"></a> `host?` | `string` | Hostname or subdomain for this record. | services/network-dns-record/types.ts:81 |
| <a id="property-ttl-1"></a> `ttl?` | `string` | TTL for this record. | services/network-dns-record/types.ts:84 |
| <a id="property-type-11"></a> `type` | [`DnsRecordType`](#dnsrecordtype) | DNS record type. | services/network-dns-record/types.ts:87 |
| <a id="property-value-1"></a> `value` | `string` | Record value (IP address, hostname, text, etc.). | services/network-dns-record/types.ts:90 |
| <a id="property-mx_preference-1"></a> `mx_preference?` | `number` | MX preference value (lower = higher priority). | services/network-dns-record/types.ts:93 |
| <a id="property-weight-1"></a> `weight?` | `number` | SRV weight for load balancing. | services/network-dns-record/types.ts:96 |
| <a id="property-port-4"></a> `port?` | `number` | SRV port number. | services/network-dns-record/types.ts:99 |
| <a id="property-issue_wildcard-1"></a> `issue_wildcard?` | `boolean` | Whether to issue wildcard (CAA records). | services/network-dns-record/types.ts:102 |
| <a id="property-orderid-10"></a> `orderid?` | `number` | Ordering position. | services/network-dns-record/types.ts:105 |

***

### NetworkDnsRecordUpdateParams

Defined in: services/network-dns-record/types.ts:116

Parameters for updating an existing DNS record.

All fields are optional — only provided fields are changed.
Read-only fields (`zone`, `modified`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-description-53"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/network-dns-record/types.ts:118 |
| <a id="property-host-2"></a> `host?` | `string` | Hostname or subdomain for this record. | services/network-dns-record/types.ts:121 |
| <a id="property-ttl-2"></a> `ttl?` | `string` | TTL for this record. | services/network-dns-record/types.ts:124 |
| <a id="property-type-12"></a> `type?` | [`DnsRecordType`](#dnsrecordtype) | DNS record type. | services/network-dns-record/types.ts:127 |
| <a id="property-value-2"></a> `value?` | `string` | Record value (IP address, hostname, text, etc.). | services/network-dns-record/types.ts:130 |
| <a id="property-mx_preference-2"></a> `mx_preference?` | `number` | MX preference value (lower = higher priority). | services/network-dns-record/types.ts:133 |
| <a id="property-weight-2"></a> `weight?` | `number` | SRV weight for load balancing. | services/network-dns-record/types.ts:136 |
| <a id="property-port-5"></a> `port?` | `number` | SRV port number. | services/network-dns-record/types.ts:139 |
| <a id="property-issue_wildcard-2"></a> `issue_wildcard?` | `boolean` | Whether to issue wildcard (CAA records). | services/network-dns-record/types.ts:142 |
| <a id="property-orderid-11"></a> `orderid?` | `number` | Ordering position. | services/network-dns-record/types.ts:145 |

***

### NetworkDnsView

Defined in: services/network-dns-view/types.ts:14

A VergeOS DNS view resource.

DNS views are part of the BIND DNS subsystem on virtual networks. Views
contain zones and control which clients see which DNS data. Views are
scoped to a parent network via the `vnet` foreign key.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-vnet-8"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | - | services/network-dns-view/types.ts:16 |
| <a id="property-name-48"></a> `name` | `string` | View display name. | - | services/network-dns-view/types.ts:19 |
| <a id="property-recursion"></a> `recursion?` | `boolean` | Whether recursive queries are allowed. | - | services/network-dns-view/types.ts:22 |
| <a id="property-match_clients"></a> `match_clients?` | `string` | ACL of clients that match this view. | - | services/network-dns-view/types.ts:25 |
| <a id="property-match_destinations"></a> `match_destinations?` | `string` | ACL of destinations that match this view. | - | services/network-dns-view/types.ts:28 |
| <a id="property-max_cache_size"></a> `max_cache_size?` | `number` | Maximum cache size in bytes. | - | services/network-dns-view/types.ts:31 |
| <a id="property-orderid-12"></a> `orderid?` | `number` | Ordering position. | - | services/network-dns-view/types.ts:34 |
| <a id="property-query_source"></a> `query_source?` | [`FlexKey`](#flexkey) | Query source address (FK to `vnet_addresses`). | - | services/network-dns-view/types.ts:37 |
| <a id="property-modified-11"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/network-dns-view/types.ts:40 |
| <a id="property-key-41"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### NetworkDnsViewCreateParams

Defined in: services/network-dns-view/types.ts:50

Parameters for creating a new DNS view.

`vnet` and `name` are required.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-vnet-9"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | services/network-dns-view/types.ts:52 |
| <a id="property-name-49"></a> `name` | `string` | View display name. | services/network-dns-view/types.ts:55 |
| <a id="property-recursion-1"></a> `recursion?` | `boolean` | Whether recursive queries are allowed. | services/network-dns-view/types.ts:58 |
| <a id="property-match_clients-1"></a> `match_clients?` | `string` | ACL of clients that match this view. | services/network-dns-view/types.ts:61 |
| <a id="property-match_destinations-1"></a> `match_destinations?` | `string` | ACL of destinations that match this view. | services/network-dns-view/types.ts:64 |
| <a id="property-max_cache_size-1"></a> `max_cache_size?` | `number` | Maximum cache size in bytes. | services/network-dns-view/types.ts:67 |
| <a id="property-orderid-13"></a> `orderid?` | `number` | Ordering position. | services/network-dns-view/types.ts:70 |
| <a id="property-query_source-1"></a> `query_source?` | [`FlexKey`](#flexkey) | Query source address (FK to `vnet_addresses`). | services/network-dns-view/types.ts:73 |

***

### NetworkDnsViewUpdateParams

Defined in: services/network-dns-view/types.ts:84

Parameters for updating an existing DNS view.

All fields are optional — only provided fields are changed.
Read-only fields (`modified`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-vnet-10"></a> `vnet?` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | services/network-dns-view/types.ts:86 |
| <a id="property-name-50"></a> `name?` | `string` | View display name. | services/network-dns-view/types.ts:89 |
| <a id="property-recursion-2"></a> `recursion?` | `boolean` | Whether recursive queries are allowed. | services/network-dns-view/types.ts:92 |
| <a id="property-match_clients-2"></a> `match_clients?` | `string` | ACL of clients that match this view. | services/network-dns-view/types.ts:95 |
| <a id="property-match_destinations-2"></a> `match_destinations?` | `string` | ACL of destinations that match this view. | services/network-dns-view/types.ts:98 |
| <a id="property-max_cache_size-2"></a> `max_cache_size?` | `number` | Maximum cache size in bytes. | services/network-dns-view/types.ts:101 |
| <a id="property-orderid-14"></a> `orderid?` | `number` | Ordering position. | services/network-dns-view/types.ts:104 |
| <a id="property-query_source-2"></a> `query_source?` | [`FlexKey`](#flexkey) | Query source address (FK to `vnet_addresses`). | services/network-dns-view/types.ts:107 |

***

### NetworkDnsZone

Defined in: services/network-dns-zone/types.ts:29

A VergeOS DNS zone resource.

DNS zones belong to a DNS view and contain DNS records. Zones represent
a DNS domain (e.g., `example.com`) and its configuration. The `view` field
is set at creation and is read-only afterward.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-view"></a> `view` | [`FlexKey`](#flexkey) | Parent DNS view reference (FK to `vnet_dns_views`). Read-only after creation. | - | services/network-dns-zone/types.ts:31 |
| <a id="property-domain-1"></a> `domain?` | `string` | Zone domain name. | - | services/network-dns-zone/types.ts:34 |
| <a id="property-type-13"></a> `type` | [`DnsZoneType`](#dnszonetype) | Zone type. | - | services/network-dns-zone/types.ts:37 |
| <a id="property-nameserver"></a> `nameserver?` | `string` | Primary nameserver for this zone. | - | services/network-dns-zone/types.ts:40 |
| <a id="property-email-3"></a> `email?` | `string` | SOA email address. | - | services/network-dns-zone/types.ts:43 |
| <a id="property-notify"></a> `notify?` | [`DnsZoneNotify`](#dnszonenotify) | Notify setting for zone transfers. | - | services/network-dns-zone/types.ts:46 |
| <a id="property-allow_notify"></a> `allow_notify?` | `string` | ACL of servers allowed to send NOTIFY. | - | services/network-dns-zone/types.ts:49 |
| <a id="property-also_notify"></a> `also_notify?` | `string` | Additional servers to notify on changes. | - | services/network-dns-zone/types.ts:52 |
| <a id="property-masters"></a> `masters?` | `string` | Master server addresses (for slave zones). | - | services/network-dns-zone/types.ts:55 |
| <a id="property-allow_transfer"></a> `allow_transfer?` | `string` | ACL of servers allowed to transfer this zone. | - | services/network-dns-zone/types.ts:58 |
| <a id="property-serial_number"></a> `serial_number?` | `number` | SOA serial number. Auto-incremented on record changes. Read-only. | - | services/network-dns-zone/types.ts:61 |
| <a id="property-default_ttl"></a> `default_ttl?` | `string` | Default TTL for records in this zone. | - | services/network-dns-zone/types.ts:64 |
| <a id="property-refresh_interval"></a> `refresh_interval?` | `string` | SOA refresh interval. | - | services/network-dns-zone/types.ts:67 |
| <a id="property-retry_interval"></a> `retry_interval?` | `string` | SOA retry interval. | - | services/network-dns-zone/types.ts:70 |
| <a id="property-expiry_period"></a> `expiry_period?` | `string` | SOA expiry period. | - | services/network-dns-zone/types.ts:73 |
| <a id="property-negative_ttl"></a> `negative_ttl?` | `string` | SOA negative TTL (NXDOMAIN cache time). | - | services/network-dns-zone/types.ts:76 |
| <a id="property-forwarders"></a> `forwarders?` | `string` | Forwarder addresses (for forward zones). | - | services/network-dns-zone/types.ts:79 |
| <a id="property-modified-12"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/network-dns-zone/types.ts:82 |
| <a id="property-key-42"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### NetworkDnsZoneCreateParams

Defined in: services/network-dns-zone/types.ts:92

Parameters for creating a new DNS zone.

`view` and `type` are required. `serial_number` is read-only and excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-view-1"></a> `view` | [`FlexKey`](#flexkey) | Parent DNS view reference (FK to `vnet_dns_views`). | services/network-dns-zone/types.ts:94 |
| <a id="property-domain-2"></a> `domain?` | `string` | Zone domain name. | services/network-dns-zone/types.ts:97 |
| <a id="property-type-14"></a> `type` | [`DnsZoneType`](#dnszonetype) | Zone type. | services/network-dns-zone/types.ts:100 |
| <a id="property-nameserver-1"></a> `nameserver?` | `string` | Primary nameserver for this zone. | services/network-dns-zone/types.ts:103 |
| <a id="property-email-4"></a> `email?` | `string` | SOA email address. | services/network-dns-zone/types.ts:106 |
| <a id="property-notify-1"></a> `notify?` | [`DnsZoneNotify`](#dnszonenotify) | Notify setting for zone transfers. | services/network-dns-zone/types.ts:109 |
| <a id="property-allow_notify-1"></a> `allow_notify?` | `string` | ACL of servers allowed to send NOTIFY. | services/network-dns-zone/types.ts:112 |
| <a id="property-also_notify-1"></a> `also_notify?` | `string` | Additional servers to notify on changes. | services/network-dns-zone/types.ts:115 |
| <a id="property-masters-1"></a> `masters?` | `string` | Master server addresses (for slave zones). | services/network-dns-zone/types.ts:118 |
| <a id="property-allow_transfer-1"></a> `allow_transfer?` | `string` | ACL of servers allowed to transfer this zone. | services/network-dns-zone/types.ts:121 |
| <a id="property-default_ttl-1"></a> `default_ttl?` | `string` | Default TTL for records in this zone. | services/network-dns-zone/types.ts:124 |
| <a id="property-refresh_interval-1"></a> `refresh_interval?` | `string` | SOA refresh interval. | services/network-dns-zone/types.ts:127 |
| <a id="property-retry_interval-1"></a> `retry_interval?` | `string` | SOA retry interval. | services/network-dns-zone/types.ts:130 |
| <a id="property-expiry_period-1"></a> `expiry_period?` | `string` | SOA expiry period. | services/network-dns-zone/types.ts:133 |
| <a id="property-negative_ttl-1"></a> `negative_ttl?` | `string` | SOA negative TTL (NXDOMAIN cache time). | services/network-dns-zone/types.ts:136 |
| <a id="property-forwarders-1"></a> `forwarders?` | `string` | Forwarder addresses (for forward zones). | services/network-dns-zone/types.ts:139 |

***

### NetworkDnsZoneUpdateParams

Defined in: services/network-dns-zone/types.ts:150

Parameters for updating an existing DNS zone.

All fields are optional — only provided fields are changed.
Read-only fields (`view`, `serial_number`, `modified`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-domain-3"></a> `domain?` | `string` | Zone domain name. | services/network-dns-zone/types.ts:152 |
| <a id="property-type-15"></a> `type?` | [`DnsZoneType`](#dnszonetype) | Zone type. | services/network-dns-zone/types.ts:155 |
| <a id="property-nameserver-2"></a> `nameserver?` | `string` | Primary nameserver for this zone. | services/network-dns-zone/types.ts:158 |
| <a id="property-email-5"></a> `email?` | `string` | SOA email address. | services/network-dns-zone/types.ts:161 |
| <a id="property-notify-2"></a> `notify?` | [`DnsZoneNotify`](#dnszonenotify) | Notify setting for zone transfers. | services/network-dns-zone/types.ts:164 |
| <a id="property-allow_notify-2"></a> `allow_notify?` | `string` | ACL of servers allowed to send NOTIFY. | services/network-dns-zone/types.ts:167 |
| <a id="property-also_notify-2"></a> `also_notify?` | `string` | Additional servers to notify on changes. | services/network-dns-zone/types.ts:170 |
| <a id="property-masters-2"></a> `masters?` | `string` | Master server addresses (for slave zones). | services/network-dns-zone/types.ts:173 |
| <a id="property-allow_transfer-2"></a> `allow_transfer?` | `string` | ACL of servers allowed to transfer this zone. | services/network-dns-zone/types.ts:176 |
| <a id="property-default_ttl-2"></a> `default_ttl?` | `string` | Default TTL for records in this zone. | services/network-dns-zone/types.ts:179 |
| <a id="property-refresh_interval-2"></a> `refresh_interval?` | `string` | SOA refresh interval. | services/network-dns-zone/types.ts:182 |
| <a id="property-retry_interval-2"></a> `retry_interval?` | `string` | SOA retry interval. | services/network-dns-zone/types.ts:185 |
| <a id="property-expiry_period-2"></a> `expiry_period?` | `string` | SOA expiry period. | services/network-dns-zone/types.ts:188 |
| <a id="property-negative_ttl-2"></a> `negative_ttl?` | `string` | SOA negative TTL (NXDOMAIN cache time). | services/network-dns-zone/types.ts:191 |
| <a id="property-forwarders-2"></a> `forwarders?` | `string` | Forwarder addresses (for forward zones). | services/network-dns-zone/types.ts:194 |

***

### NetworkHost

Defined in: services/network-host/types.ts:19

A VergeOS network host override resource.

Host overrides are DNS/DHCP static hostname-to-IP mappings on a virtual
network. They are NOT MAC-based DHCP reservations — they map a hostname
or domain to an IP address.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-vnet-11"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | - | services/network-host/types.ts:21 |
| <a id="property-type-16"></a> `type?` | [`HostType`](#hosttype) | Host override type. | - | services/network-host/types.ts:24 |
| <a id="property-host-3"></a> `host` | `string` | Hostname or domain name. | - | services/network-host/types.ts:27 |
| <a id="property-ip-3"></a> `ip` | `string` | IP address mapped to the hostname. | - | services/network-host/types.ts:30 |
| <a id="property-key-43"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### NetworkHostCreateParams

Defined in: services/network-host/types.ts:40

Parameters for creating a new network host override.

`vnet`, `host`, and `ip` are required.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-vnet-12"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | services/network-host/types.ts:42 |
| <a id="property-type-17"></a> `type?` | [`HostType`](#hosttype) | Host override type. Defaults to `'host'`. | services/network-host/types.ts:45 |
| <a id="property-host-4"></a> `host` | `string` | Hostname or domain name. | services/network-host/types.ts:48 |
| <a id="property-ip-4"></a> `ip` | `string` | IP address mapped to the hostname. | services/network-host/types.ts:51 |

***

### NetworkHostUpdateParams

Defined in: services/network-host/types.ts:61

Parameters for updating an existing network host override.

All fields are optional — only provided fields are changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-vnet-13"></a> `vnet?` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | services/network-host/types.ts:63 |
| <a id="property-type-18"></a> `type?` | [`HostType`](#hosttype) | Host override type. | services/network-host/types.ts:66 |
| <a id="property-host-5"></a> `host?` | `string` | Hostname or domain name. | services/network-host/types.ts:69 |
| <a id="property-ip-5"></a> `ip?` | `string` | IP address mapped to the hostname. | services/network-host/types.ts:72 |

***

### NetworkRuleAlias

Defined in: services/network-rule-alias/types.ts:20

A VergeOS network rule alias resource.

Rule aliases are **global** named address groups that can be referenced in
firewall rules across networks. Unlike rules and addresses, aliases are not
scoped to a parent network — they exist at the system level with visibility
controlled by `publishing_scope`.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-51"></a> `name` | `string` | Alias display name. Min 1, max 128 characters. Unique. | - | services/network-rule-alias/types.ts:22 |
| <a id="property-id-7"></a> `id?` | `string` | SHA1 hash identifier. Read-only. Min/max 40 characters. Unique. | - | services/network-rule-alias/types.ts:25 |
| <a id="property-value-3"></a> `value` | `string` | Comma-delimited list of addresses (IPs, CIDRs, or other alias references). | - | services/network-rule-alias/types.ts:28 |
| <a id="property-publishing_scope-2"></a> `publishing_scope?` | [`PublishingScope`](#publishingscope) | Publishing scope controlling visibility. Default: `private`. | - | services/network-rule-alias/types.ts:31 |
| <a id="property-owner-6"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference. Read-only. | - | services/network-rule-alias/types.ts:34 |
| <a id="property-description-54"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/network-rule-alias/types.ts:37 |
| <a id="property-key-44"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### NetworkRuleAliasCreateParams

Defined in: services/network-rule-alias/types.ts:47

Parameters for creating a new network rule alias.

`name` and `value` are required per the API schema.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-52"></a> `name` | `string` | Alias display name. Min 1, max 128 characters. Must be unique. | services/network-rule-alias/types.ts:49 |
| <a id="property-value-4"></a> `value` | `string` | Comma-delimited list of addresses (IPs, CIDRs, or other alias references). | services/network-rule-alias/types.ts:52 |
| <a id="property-publishing_scope-3"></a> `publishing_scope?` | [`PublishingScope`](#publishingscope) | Publishing scope controlling visibility. Default: `private`. | services/network-rule-alias/types.ts:55 |
| <a id="property-description-55"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/network-rule-alias/types.ts:58 |

***

### NetworkRuleAliasUpdateParams

Defined in: services/network-rule-alias/types.ts:69

Parameters for updating an existing network rule alias.

All fields are optional — only provided fields are changed.
Read-only fields (`id`, `owner`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-53"></a> `name?` | `string` | Alias display name. Min 1, max 128 characters. Must be unique. | services/network-rule-alias/types.ts:71 |
| <a id="property-value-5"></a> `value?` | `string` | Comma-delimited list of addresses (IPs, CIDRs, or other alias references). | services/network-rule-alias/types.ts:74 |
| <a id="property-publishing_scope-4"></a> `publishing_scope?` | [`PublishingScope`](#publishingscope) | Publishing scope controlling visibility. | services/network-rule-alias/types.ts:77 |
| <a id="property-description-56"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/network-rule-alias/types.ts:80 |

***

### NetworkRule

Defined in: services/network-rule/types.ts:43

A VergeOS network firewall rule resource.

Rules control firewall behavior (accept/drop/reject), NAT/PAT translation,
and static routing on a virtual network. The `action` field determines which
fields are relevant — `target_ip` and `target_ports` only apply to `translate`
and `route` actions.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-vnet-14"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). Read-only. | - | services/network-rule/types.ts:45 |
| <a id="property-name-54"></a> `name` | `string` | Rule display name. Min 1, max 128 characters. Unique. | - | services/network-rule/types.ts:48 |
| <a id="property-orderid-15"></a> `orderid?` | `number` | Processing order within the parent network. | - | services/network-rule/types.ts:51 |
| <a id="property-pin"></a> `pin?` | [`RulePin`](#rulepin) | Pin position for auto-ordering. Default: `no`. | - | services/network-rule/types.ts:54 |
| <a id="property-description-57"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/network-rule/types.ts:57 |
| <a id="property-modified-13"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/network-rule/types.ts:60 |
| <a id="property-enabled-32"></a> `enabled?` | `boolean` | Whether the rule is enabled. Default: `true`. | - | services/network-rule/types.ts:63 |
| <a id="property-trace"></a> `trace?` | `boolean` | Whether trace/debug mode is enabled for this rule. Default: `false`. | - | services/network-rule/types.ts:66 |
| <a id="property-system_rule"></a> `system_rule?` | `boolean` | Whether this is a system-managed rule. Read-only. | - | services/network-rule/types.ts:69 |
| <a id="property-owner-7"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference. Read-only. | - | services/network-rule/types.ts:72 |
| <a id="property-protocol-4"></a> `protocol?` | [`RuleProtocol`](#ruleprotocol) | Network protocol. Default: `any`. | - | services/network-rule/types.ts:75 |
| <a id="property-direction"></a> `direction?` | [`RuleDirection`](#ruledirection) | Traffic direction. Default: `incoming`. | - | services/network-rule/types.ts:78 |
| <a id="property-ct_state"></a> `ct_state?` | `string` | Connection tracking state filter. | - | services/network-rule/types.ts:81 |
| <a id="property-interface-7"></a> `interface?` | [`RuleInterface`](#ruleinterface) | Network interface. Default: `auto`. | - | services/network-rule/types.ts:84 |
| <a id="property-action"></a> `action?` | [`RuleAction`](#ruleaction) | Rule action type. Default: `accept`. | - | services/network-rule/types.ts:87 |
| <a id="property-source_ip"></a> `source_ip?` | `string` | Source IP address or CIDR filter. | - | services/network-rule/types.ts:90 |
| <a id="property-source_ports"></a> `source_ports?` | `string` | Source port(s) or port ranges. | - | services/network-rule/types.ts:93 |
| <a id="property-destination_ip"></a> `destination_ip?` | `string` | Destination IP address or CIDR filter. | - | services/network-rule/types.ts:96 |
| <a id="property-destination_ports"></a> `destination_ports?` | `string` | Destination port(s) or port ranges. | - | services/network-rule/types.ts:99 |
| <a id="property-target_ip"></a> `target_ip?` | `string` | Target IP for translate/route actions. | - | services/network-rule/types.ts:102 |
| <a id="property-target_ports"></a> `target_ports?` | `string` | Target port(s) or port ranges for translate/route actions. | - | services/network-rule/types.ts:105 |
| <a id="property-statistics"></a> `statistics?` | `boolean` | Whether to track rule hit statistics. Default: `false`. | - | services/network-rule/types.ts:108 |
| <a id="property-log"></a> `log?` | `boolean` | Whether to log rule matches. Default: `false`. | - | services/network-rule/types.ts:111 |
| <a id="property-throttle"></a> `throttle?` | `string` | Throttle expression. | - | services/network-rule/types.ts:114 |
| <a id="property-drop_throttle"></a> `drop_throttle?` | `boolean` | Whether to drop throttled traffic. | - | services/network-rule/types.ts:117 |
| <a id="property-packets"></a> `packets?` | `number` | Packet count (statistics). | - | services/network-rule/types.ts:120 |
| <a id="property-bytes"></a> `bytes?` | `number` | Byte count (statistics). | - | services/network-rule/types.ts:123 |
| <a id="property-creator-4"></a> `creator?` | `string` | Creator identifier. Read-only. | - | services/network-rule/types.ts:126 |
| <a id="property-key-45"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### NetworkRuleCreateParams

Defined in: services/network-rule/types.ts:136

Parameters for creating a new network rule.

`vnet` and `name` are required. Read-only fields are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-vnet-15"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | services/network-rule/types.ts:138 |
| <a id="property-name-55"></a> `name` | `string` | Rule display name. Min 1, max 128 characters. Must be unique. | services/network-rule/types.ts:141 |
| <a id="property-orderid-16"></a> `orderid?` | `number` | Processing order within the parent network. | services/network-rule/types.ts:144 |
| <a id="property-pin-1"></a> `pin?` | [`RulePin`](#rulepin) | Pin position for auto-ordering. Default: `no`. | services/network-rule/types.ts:147 |
| <a id="property-description-58"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/network-rule/types.ts:150 |
| <a id="property-enabled-33"></a> `enabled?` | `boolean` | Whether the rule is enabled. Default: `true`. | services/network-rule/types.ts:153 |
| <a id="property-trace-1"></a> `trace?` | `boolean` | Whether trace/debug mode is enabled. Default: `false`. | services/network-rule/types.ts:156 |
| <a id="property-protocol-5"></a> `protocol?` | [`RuleProtocol`](#ruleprotocol) | Network protocol. Default: `any`. | services/network-rule/types.ts:159 |
| <a id="property-direction-1"></a> `direction?` | [`RuleDirection`](#ruledirection) | Traffic direction. Default: `incoming`. | services/network-rule/types.ts:162 |
| <a id="property-ct_state-1"></a> `ct_state?` | `string` | Connection tracking state filter. | services/network-rule/types.ts:165 |
| <a id="property-interface-8"></a> `interface?` | [`RuleInterface`](#ruleinterface) | Network interface. Default: `auto`. | services/network-rule/types.ts:168 |
| <a id="property-action-1"></a> `action?` | [`RuleAction`](#ruleaction) | Rule action type. Default: `accept`. | services/network-rule/types.ts:171 |
| <a id="property-source_ip-1"></a> `source_ip?` | `string` | Source IP address or CIDR filter. | services/network-rule/types.ts:174 |
| <a id="property-source_ports-1"></a> `source_ports?` | `string` | Source port(s) or port ranges. | services/network-rule/types.ts:177 |
| <a id="property-destination_ip-1"></a> `destination_ip?` | `string` | Destination IP address or CIDR filter. | services/network-rule/types.ts:180 |
| <a id="property-destination_ports-1"></a> `destination_ports?` | `string` | Destination port(s) or port ranges. | services/network-rule/types.ts:183 |
| <a id="property-target_ip-1"></a> `target_ip?` | `string` | Target IP for translate/route actions. | services/network-rule/types.ts:186 |
| <a id="property-target_ports-1"></a> `target_ports?` | `string` | Target port(s) or port ranges for translate/route actions. | services/network-rule/types.ts:189 |
| <a id="property-statistics-1"></a> `statistics?` | `boolean` | Whether to track rule hit statistics. Default: `false`. | services/network-rule/types.ts:192 |
| <a id="property-log-1"></a> `log?` | `boolean` | Whether to log rule matches. Default: `false`. | services/network-rule/types.ts:195 |
| <a id="property-throttle-1"></a> `throttle?` | `string` | Throttle expression. | services/network-rule/types.ts:198 |
| <a id="property-drop_throttle-1"></a> `drop_throttle?` | `boolean` | Whether to drop throttled traffic. | services/network-rule/types.ts:201 |

***

### NetworkRuleUpdateParams

Defined in: services/network-rule/types.ts:212

Parameters for updating an existing network rule.

All fields are optional — only provided fields are changed.
Read-only fields (`vnet`, `modified`, `system_rule`, `owner`, `creator`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-56"></a> `name?` | `string` | Rule display name. Min 1, max 128 characters. Must be unique. | services/network-rule/types.ts:214 |
| <a id="property-orderid-17"></a> `orderid?` | `number` | Processing order within the parent network. | services/network-rule/types.ts:217 |
| <a id="property-pin-2"></a> `pin?` | [`RulePin`](#rulepin) | Pin position for auto-ordering. | services/network-rule/types.ts:220 |
| <a id="property-description-59"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/network-rule/types.ts:223 |
| <a id="property-enabled-34"></a> `enabled?` | `boolean` | Whether the rule is enabled. | services/network-rule/types.ts:226 |
| <a id="property-trace-2"></a> `trace?` | `boolean` | Whether trace/debug mode is enabled. | services/network-rule/types.ts:229 |
| <a id="property-protocol-6"></a> `protocol?` | [`RuleProtocol`](#ruleprotocol) | Network protocol. | services/network-rule/types.ts:232 |
| <a id="property-direction-2"></a> `direction?` | [`RuleDirection`](#ruledirection) | Traffic direction. | services/network-rule/types.ts:235 |
| <a id="property-ct_state-2"></a> `ct_state?` | `string` | Connection tracking state filter. | services/network-rule/types.ts:238 |
| <a id="property-interface-9"></a> `interface?` | [`RuleInterface`](#ruleinterface) | Network interface. | services/network-rule/types.ts:241 |
| <a id="property-action-2"></a> `action?` | [`RuleAction`](#ruleaction) | Rule action type. | services/network-rule/types.ts:244 |
| <a id="property-source_ip-2"></a> `source_ip?` | `string` | Source IP address or CIDR filter. | services/network-rule/types.ts:247 |
| <a id="property-source_ports-2"></a> `source_ports?` | `string` | Source port(s) or port ranges. | services/network-rule/types.ts:250 |
| <a id="property-destination_ip-2"></a> `destination_ip?` | `string` | Destination IP address or CIDR filter. | services/network-rule/types.ts:253 |
| <a id="property-destination_ports-2"></a> `destination_ports?` | `string` | Destination port(s) or port ranges. | services/network-rule/types.ts:256 |
| <a id="property-target_ip-2"></a> `target_ip?` | `string` | Target IP for translate/route actions. | services/network-rule/types.ts:259 |
| <a id="property-target_ports-2"></a> `target_ports?` | `string` | Target port(s) or port ranges for translate/route actions. | services/network-rule/types.ts:262 |
| <a id="property-statistics-2"></a> `statistics?` | `boolean` | Whether to track rule hit statistics. | services/network-rule/types.ts:265 |
| <a id="property-log-2"></a> `log?` | `boolean` | Whether to log rule matches. | services/network-rule/types.ts:268 |
| <a id="property-throttle-2"></a> `throttle?` | `string` | Throttle expression. | services/network-rule/types.ts:271 |
| <a id="property-drop_throttle-2"></a> `drop_throttle?` | `boolean` | Whether to drop throttled traffic. | services/network-rule/types.ts:274 |
| <a id="property-packets-1"></a> `packets?` | `number` | Packet count (statistics). | services/network-rule/types.ts:277 |
| <a id="property-bytes-1"></a> `bytes?` | `number` | Byte count (statistics). | services/network-rule/types.ts:280 |

***

### Network

Defined in: services/network/types.ts:63

A VergeOS virtual network (vnet) resource.

Field names use snake_case to match the VergeOS API exactly.
Read-only fields are included since they appear in GET responses.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-57"></a> `name` | `string` | Network display name. Min 1, max 128 characters. Unique within the system. | - | services/network/types.ts:65 |
| <a id="property-description-60"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/network/types.ts:68 |
| <a id="property-enabled-35"></a> `enabled?` | `boolean` | Whether the network is enabled. | - | services/network/types.ts:71 |
| <a id="property-type-19"></a> `type?` | [`NetworkType`](#networktype) | Network type. Set on create, read-only after. | - | services/network/types.ts:76 |
| <a id="property-layer2_type"></a> `layer2_type?` | [`Layer2Type`](#layer2type) | Layer 2 encapsulation type. | - | services/network/types.ts:79 |
| <a id="property-layer2_id"></a> `layer2_id?` | `number` | VLAN/VXLAN tag ID. | - | services/network/types.ts:82 |
| <a id="property-vxlan_multicast"></a> `vxlan_multicast?` | `string` | vxLan multicast address. | - | services/network/types.ts:85 |
| <a id="property-physical_bridged"></a> `physical_bridged?` | `boolean` | Whether this is a bridged physical network. | - | services/network/types.ts:88 |
| <a id="property-port_mirroring"></a> `port_mirroring?` | [`PortMirroringMode`](#portmirroringmode) | Port mirroring mode. | - | services/network/types.ts:91 |
| <a id="property-port_mirroring_vnet"></a> `port_mirroring_vnet?` | [`FlexKey`](#flexkey) | Network ID for mirrored traffic (FK to `vnets`). | - | services/network/types.ts:94 |
| <a id="property-interface_vnet"></a> `interface_vnet?` | [`FlexKey`](#flexkey) | Interface vnet ID (FK to `vnets`). | - | services/network/types.ts:97 |
| <a id="property-enable_bonding"></a> `enable_bonding?` | `boolean` | Whether bonding is enabled. | - | services/network/types.ts:100 |
| <a id="property-bond_interfaces_args"></a> `bond_interfaces_args?` | `unknown` | Bonding interface arguments (JSON). | - | services/network/types.ts:103 |
| <a id="property-mtu"></a> `mtu?` | `number` | Maximum transmission unit. Min 1000, max 65536. | - | services/network/types.ts:106 |
| <a id="property-advanced_options"></a> `advanced_options?` | `unknown` | Advanced options (JSON). | - | services/network/types.ts:109 |
| <a id="property-ipaddress_type"></a> `ipaddress_type?` | [`IpAddressType`](#ipaddresstype) | IP address assignment method. | - | services/network/types.ts:114 |
| <a id="property-ipaddress-3"></a> `ipaddress?` | `string` | Network router IP address. | - | services/network/types.ts:117 |
| <a id="property-dmz_ipaddress"></a> `dmz_ipaddress?` | `string` | DMZ IP address for this router. | - | services/network/types.ts:120 |
| <a id="property-network"></a> `network?` | `string` | Network address in CIDR notation (e.g., "10.0.0.0/24"). | - | services/network/types.ts:123 |
| <a id="property-gateway"></a> `gateway?` | `string` | Gateway IP address sent to DHCP clients. | - | services/network/types.ts:126 |
| <a id="property-vnet_default_gateway"></a> `vnet_default_gateway?` | [`FlexKey`](#flexkey) | Default gateway network ID (FK to `vnets`). | - | services/network/types.ts:129 |
| <a id="property-hostname-3"></a> `hostname?` | `string` | Router hostname. | - | services/network/types.ts:132 |
| <a id="property-dns"></a> `dns?` | [`DnsMode`](#dnsmode) | DNS service mode. | - | services/network/types.ts:137 |
| <a id="property-domain-4"></a> `domain?` | `string` | Domain name for the network. | - | services/network/types.ts:140 |
| <a id="property-dnslist"></a> `dnslist?` | `string` | DNS server list (newline, space, or comma separated). | - | services/network/types.ts:143 |
| <a id="property-override_dhcp_dns"></a> `override_dhcp_dns?` | `boolean` | Whether to ignore DNS servers from DHCP. | - | services/network/types.ts:146 |
| <a id="property-network_dns"></a> `network_dns?` | [`FlexKey`](#flexkey) | DNS network ID for forwarding (FK to `vnets`). | - | services/network/types.ts:149 |
| <a id="property-network_dns_zone"></a> `network_dns_zone?` | [`FlexKey`](#flexkey) | DNS zone reference (FK to `vnet_dns_zones`). | - | services/network/types.ts:152 |
| <a id="property-dhcp_enabled"></a> `dhcp_enabled?` | `boolean` | Whether DHCP is enabled. | - | services/network/types.ts:157 |
| <a id="property-dhcp_dynamic"></a> `dhcp_dynamic?` | `boolean` | Whether dynamic DHCP is enabled. | - | services/network/types.ts:160 |
| <a id="property-dhcp_sequential"></a> `dhcp_sequential?` | `boolean` | Whether DHCP assigns IPs sequentially. | - | services/network/types.ts:163 |
| <a id="property-dhcp_start"></a> `dhcp_start?` | `string` | Start of the DHCP range. | - | services/network/types.ts:166 |
| <a id="property-dhcp_stop"></a> `dhcp_stop?` | `string` | End of the DHCP range. | - | services/network/types.ts:169 |
| <a id="property-autostart"></a> `autostart?` | `boolean` | Whether the network automatically starts. | - | services/network/types.ts:174 |
| <a id="property-powerstate-1"></a> `powerstate?` | `boolean` | Current power state. `true` = running. **Note:** The API often omits this field. For reliable power state, use [MachineStatus](#machinestatus) via `client.machineStatuses.getByMachine()`. | - | services/network/types.ts:182 |
| <a id="property-on_power_loss"></a> `on_power_loss?` | [`NetworkOnPowerLoss`](#networkonpowerloss) | Behavior when host power is restored. | - | services/network/types.ts:185 |
| <a id="property-cluster-1"></a> `cluster?` | [`FlexKey`](#flexkey) | Primary cluster reference (FK to `clusters`). | - | services/network/types.ts:188 |
| <a id="property-cluster_failover"></a> `cluster_failover?` | [`FlexKey`](#flexkey) | Failover cluster reference (FK to `clusters`). | - | services/network/types.ts:191 |
| <a id="property-preferred_node"></a> `preferred_node?` | [`FlexKey`](#flexkey) | Preferred node for scheduling (FK to `nodes`). | - | services/network/types.ts:194 |
| <a id="property-ha_group"></a> `ha_group?` | `string` | HA group for anti-affinity. | - | services/network/types.ts:197 |
| <a id="property-statistics-3"></a> `statistics?` | `boolean` | Whether to track statistics for all rules. | - | services/network/types.ts:202 |
| <a id="property-dmz_statistics"></a> `dmz_statistics?` | `boolean` | Whether to track DMZ statistics. | - | services/network/types.ts:205 |
| <a id="property-trace-3"></a> `trace?` | `boolean` | Whether to trace/debug firewall rules. | - | services/network/types.ts:208 |
| <a id="property-mirror_logs"></a> `mirror_logs?` | `boolean` | Whether to mirror syslog to UI. | - | services/network/types.ts:211 |
| <a id="property-need_restart"></a> `need_restart?` | `boolean` | Whether the network needs a restart. | - | services/network/types.ts:214 |
| <a id="property-need_fw_apply"></a> `need_fw_apply?` | `boolean` | Whether firewall rules need to be applied. | - | services/network/types.ts:217 |
| <a id="property-need_dns_apply"></a> `need_dns_apply?` | `boolean` | Whether DNS configuration needs to be applied. | - | services/network/types.ts:220 |
| <a id="property-need_proxy_apply"></a> `need_proxy_apply?` | `boolean` | Whether proxy configuration needs to be applied. | - | services/network/types.ts:223 |
| <a id="property-need_interface_apply"></a> `need_interface_apply?` | `boolean` | Whether interface configuration needs to be applied. | - | services/network/types.ts:226 |
| <a id="property-apply_fw_on_start"></a> `apply_fw_on_start?` | `boolean` | Whether to apply firewall rules on next start. | - | services/network/types.ts:229 |
| <a id="property-last_fw_apply"></a> `last_fw_apply?` | `number` | Last firewall apply timestamp. | - | services/network/types.ts:232 |
| <a id="property-last_dns_apply"></a> `last_dns_apply?` | `number` | Last DNS apply timestamp. | - | services/network/types.ts:235 |
| <a id="property-rate_limit"></a> `rate_limit?` | `number` | Rate limit value. | - | services/network/types.ts:240 |
| <a id="property-rate_limit_type"></a> `rate_limit_type?` | [`RateLimitType`](#ratelimittype) | Rate limit unit type. | - | services/network/types.ts:243 |
| <a id="property-rate_limit_burst"></a> `rate_limit_burst?` | `number` | Rate limit burst value. | - | services/network/types.ts:246 |
| <a id="property-bgp_asn"></a> `bgp_asn?` | `number` | BGP autonomous system number. Min 1, max 4294967295. | - | services/network/types.ts:251 |
| <a id="property-proxy_enabled"></a> `proxy_enabled?` | `boolean` | Whether the proxy is enabled. | - | services/network/types.ts:256 |
| <a id="property-proxy_listen_address"></a> `proxy_listen_address?` | `string` | Proxy listen address. | - | services/network/types.ts:259 |
| <a id="property-pxe"></a> `pxe?` | [`PxeMode`](#pxemode) | PXE boot mode. | - | services/network/types.ts:264 |
| <a id="property-tftp_server"></a> `tftp_server?` | `string` | TFTP server IP for custom PXE. | - | services/network/types.ts:267 |
| <a id="property-monitor_gateway"></a> `monitor_gateway?` | `boolean` | Whether to monitor the gateway. | - | services/network/types.ts:272 |
| <a id="property-monitor_ip"></a> `monitor_ip?` | `string` | IP address to monitor (blank for default route). | - | services/network/types.ts:275 |
| <a id="property-monitor_interval_ms"></a> `monitor_interval_ms?` | `number` | Monitoring interval in milliseconds. Min 1000, max 120000. | - | services/network/types.ts:278 |
| <a id="property-note"></a> `note?` | `string` | Free-form note. Max 1024 characters. | - | services/network/types.ts:283 |
| <a id="property-machine-14"></a> `machine?` | [`FlexKey`](#flexkey) | Machine reference (FK to `machines`). Read-only. | - | services/network/types.ts:288 |
| <a id="property-owner-8"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference. Read-only. | - | services/network/types.ts:291 |
| <a id="property-macaddress-3"></a> `macaddress?` | `string` | Router MAC address. Read-only. | - | services/network/types.ts:294 |
| <a id="property-nic"></a> `nic?` | [`FlexKey`](#flexkey) | NIC reference (FK to `machine_nics`). Read-only. | - | services/network/types.ts:297 |
| <a id="property-nic_dmz"></a> `nic_dmz?` | [`FlexKey`](#flexkey) | DMZ NIC reference (FK to `machine_nics`). Read-only. | - | services/network/types.ts:300 |
| <a id="property-cidr"></a> `cidr?` | [`FlexKey`](#flexkey) | Network block reference (FK to `vnet_cidrs`). Read-only. | - | services/network/types.ts:303 |
| <a id="property-bond"></a> `bond?` | [`FlexKey`](#flexkey) | Bond reference (FK to `vnet_bonds`). Read-only. | - | services/network/types.ts:306 |
| <a id="property-bgp"></a> `bgp?` | [`FlexKey`](#flexkey) | BGP reference (FK to `vnet_bgp`). Read-only. | - | services/network/types.ts:309 |
| <a id="property-ipsec-2"></a> `ipsec?` | [`FlexKey`](#flexkey) | IPSec configuration reference (FK to `vnet_ipsecs`). Locked. | - | services/network/types.ts:312 |
| <a id="property-ipsec_enabled"></a> `ipsec_enabled?` | `boolean` | Whether IPsec is enabled. Read-only. | - | services/network/types.ts:315 |
| <a id="property-proxy"></a> `proxy?` | [`FlexKey`](#flexkey) | Proxy reference (FK to `vnet_proxies`). Read-only. | - | services/network/types.ts:318 |
| <a id="property-creator-5"></a> `creator?` | `string` | User who created this network. Read-only. | - | services/network/types.ts:321 |
| <a id="property-status-11"></a> `status?` | `string` | Machine status value (joined from machine_status). Present in default list/get responses. | - | services/network/types.ts:326 |
| <a id="property-key-46"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### NetworkCreateParams

Defined in: services/network/types.ts:340

Parameters for creating a new virtual network.

Only `name` is required. The API provides sensible defaults for everything
else (e.g., `type: 'internal'`, `layer2_type: 'vxlan'`).

Read-only fields (`machine`, `owner`, `macaddress`, `nic`, `nic_dmz`,
`cidr`, `bond`, `bgp`, `ipsec_enabled`, `creator`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-58"></a> `name` | `string` | Network display name. Min 1, max 128 characters. Must be unique. | services/network/types.ts:342 |
| <a id="property-description-61"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/network/types.ts:345 |
| <a id="property-enabled-36"></a> `enabled?` | `boolean` | Whether the network is enabled. Default: `true`. | services/network/types.ts:348 |
| <a id="property-type-20"></a> `type?` | [`NetworkType`](#networktype) | Network type. Default: `internal`. | services/network/types.ts:351 |
| <a id="property-layer2_type-1"></a> `layer2_type?` | [`Layer2Type`](#layer2type) | Layer 2 encapsulation type. Default: `vxlan`. | services/network/types.ts:354 |
| <a id="property-layer2_id-1"></a> `layer2_id?` | `number` | VLAN/VXLAN tag ID. | services/network/types.ts:357 |
| <a id="property-vxlan_multicast-1"></a> `vxlan_multicast?` | `string` | vxLan multicast address. | services/network/types.ts:360 |
| <a id="property-physical_bridged-1"></a> `physical_bridged?` | `boolean` | Whether this is a bridged physical network. Default: `false`. | services/network/types.ts:363 |
| <a id="property-port_mirroring-1"></a> `port_mirroring?` | [`PortMirroringMode`](#portmirroringmode) | Port mirroring mode. Default: `off`. | services/network/types.ts:366 |
| <a id="property-port_mirroring_vnet-1"></a> `port_mirroring_vnet?` | [`FlexKey`](#flexkey) | Network ID for mirrored traffic (FK to `vnets`). | services/network/types.ts:369 |
| <a id="property-interface_vnet-1"></a> `interface_vnet?` | [`FlexKey`](#flexkey) | Interface vnet ID (FK to `vnets`). | services/network/types.ts:372 |
| <a id="property-enable_bonding-1"></a> `enable_bonding?` | `boolean` | Whether bonding is enabled. Default: `false`. | services/network/types.ts:375 |
| <a id="property-bond_interfaces_args-1"></a> `bond_interfaces_args?` | `unknown` | Bonding interface arguments (JSON). | services/network/types.ts:378 |
| <a id="property-mtu-1"></a> `mtu?` | `number` | Maximum transmission unit. Min 1000, max 65536. | services/network/types.ts:381 |
| <a id="property-advanced_options-1"></a> `advanced_options?` | `unknown` | Advanced options (JSON). | services/network/types.ts:384 |
| <a id="property-ipaddress_type-1"></a> `ipaddress_type?` | [`IpAddressType`](#ipaddresstype) | IP address assignment method. Default: `static`. | services/network/types.ts:387 |
| <a id="property-ipaddress-4"></a> `ipaddress?` | `string` | Network router IP address. | services/network/types.ts:390 |
| <a id="property-dmz_ipaddress-1"></a> `dmz_ipaddress?` | `string` | DMZ IP address for this router. | services/network/types.ts:393 |
| <a id="property-network-1"></a> `network?` | `string` | Network address in CIDR notation. | services/network/types.ts:396 |
| <a id="property-gateway-1"></a> `gateway?` | `string` | Gateway IP address. | services/network/types.ts:399 |
| <a id="property-vnet_default_gateway-1"></a> `vnet_default_gateway?` | [`FlexKey`](#flexkey) | Default gateway network ID (FK to `vnets`). | services/network/types.ts:402 |
| <a id="property-hostname-4"></a> `hostname?` | `string` | Router hostname. Default: `router`. | services/network/types.ts:405 |
| <a id="property-dns-1"></a> `dns?` | [`DnsMode`](#dnsmode) | DNS service mode. Default: `simple`. | services/network/types.ts:408 |
| <a id="property-domain-5"></a> `domain?` | `string` | Domain name for the network. | services/network/types.ts:411 |
| <a id="property-dnslist-1"></a> `dnslist?` | `string` | DNS server list. | services/network/types.ts:414 |
| <a id="property-override_dhcp_dns-1"></a> `override_dhcp_dns?` | `boolean` | Whether to ignore DNS servers from DHCP. Default: `false`. | services/network/types.ts:417 |
| <a id="property-network_dns-1"></a> `network_dns?` | [`FlexKey`](#flexkey) | DNS network ID for forwarding (FK to `vnets`). | services/network/types.ts:420 |
| <a id="property-network_dns_zone-1"></a> `network_dns_zone?` | [`FlexKey`](#flexkey) | DNS zone reference (FK to `vnet_dns_zones`). | services/network/types.ts:423 |
| <a id="property-dhcp_enabled-1"></a> `dhcp_enabled?` | `boolean` | Whether DHCP is enabled. | services/network/types.ts:426 |
| <a id="property-dhcp_dynamic-1"></a> `dhcp_dynamic?` | `boolean` | Whether dynamic DHCP is enabled. | services/network/types.ts:429 |
| <a id="property-dhcp_sequential-1"></a> `dhcp_sequential?` | `boolean` | Whether DHCP assigns IPs sequentially. | services/network/types.ts:432 |
| <a id="property-dhcp_start-1"></a> `dhcp_start?` | `string` | Start of the DHCP range. | services/network/types.ts:435 |
| <a id="property-dhcp_stop-1"></a> `dhcp_stop?` | `string` | End of the DHCP range. | services/network/types.ts:438 |
| <a id="property-autostart-1"></a> `autostart?` | `boolean` | Whether the network automatically starts. Default: `true`. | services/network/types.ts:441 |
| <a id="property-on_power_loss-1"></a> `on_power_loss?` | [`NetworkOnPowerLoss`](#networkonpowerloss) | Behavior when host power is restored. Default: `last_state`. | services/network/types.ts:444 |
| <a id="property-cluster-2"></a> `cluster?` | [`FlexKey`](#flexkey) | Primary cluster reference (FK to `clusters`). | services/network/types.ts:447 |
| <a id="property-cluster_failover-1"></a> `cluster_failover?` | [`FlexKey`](#flexkey) | Failover cluster reference (FK to `clusters`). | services/network/types.ts:450 |
| <a id="property-preferred_node-1"></a> `preferred_node?` | [`FlexKey`](#flexkey) | Preferred node for scheduling (FK to `nodes`). | services/network/types.ts:453 |
| <a id="property-ha_group-1"></a> `ha_group?` | `string` | HA group for anti-affinity. | services/network/types.ts:456 |
| <a id="property-statistics-4"></a> `statistics?` | `boolean` | Whether to track statistics for all rules. Default: `false`. | services/network/types.ts:459 |
| <a id="property-dmz_statistics-1"></a> `dmz_statistics?` | `boolean` | Whether to track DMZ statistics. Default: `false`. | services/network/types.ts:462 |
| <a id="property-trace-4"></a> `trace?` | `boolean` | Whether to trace/debug firewall rules. Default: `false`. | services/network/types.ts:465 |
| <a id="property-mirror_logs-1"></a> `mirror_logs?` | `boolean` | Whether to mirror syslog to UI. Default: `false`. | services/network/types.ts:468 |
| <a id="property-apply_fw_on_start-1"></a> `apply_fw_on_start?` | `boolean` | Whether to apply firewall rules on next start. Default: `false`. | services/network/types.ts:471 |
| <a id="property-rate_limit-1"></a> `rate_limit?` | `number` | Rate limit value. Default: `0`. | services/network/types.ts:474 |
| <a id="property-rate_limit_type-1"></a> `rate_limit_type?` | [`RateLimitType`](#ratelimittype) | Rate limit unit type. Default: `mbytes/second`. | services/network/types.ts:477 |
| <a id="property-rate_limit_burst-1"></a> `rate_limit_burst?` | `number` | Rate limit burst value. Default: `0`. | services/network/types.ts:480 |
| <a id="property-bgp_asn-1"></a> `bgp_asn?` | `number` | BGP autonomous system number. Min 1, max 4294967295. | services/network/types.ts:483 |
| <a id="property-proxy_enabled-1"></a> `proxy_enabled?` | `boolean` | Whether the proxy is enabled. Default: `false`. | services/network/types.ts:486 |
| <a id="property-proxy_listen_address-1"></a> `proxy_listen_address?` | `string` | Proxy listen address. | services/network/types.ts:489 |
| <a id="property-pxe-1"></a> `pxe?` | [`PxeMode`](#pxemode) | PXE boot mode. Default: `none`. | services/network/types.ts:492 |
| <a id="property-tftp_server-1"></a> `tftp_server?` | `string` | TFTP server IP for custom PXE. | services/network/types.ts:495 |
| <a id="property-monitor_gateway-1"></a> `monitor_gateway?` | `boolean` | Whether to monitor the gateway. Default: `false`. | services/network/types.ts:498 |
| <a id="property-monitor_ip-1"></a> `monitor_ip?` | `string` | IP address to monitor. | services/network/types.ts:501 |
| <a id="property-monitor_interval_ms-1"></a> `monitor_interval_ms?` | `number` | Monitoring interval in milliseconds. Min 1000, max 120000. Default: `2000`. | services/network/types.ts:504 |
| <a id="property-note-1"></a> `note?` | `string` | Free-form note. Max 1024 characters. | services/network/types.ts:507 |

***

### NetworkUpdateParams

Defined in: services/network/types.ts:518

Parameters for updating an existing virtual network.

All fields are optional — only provided fields are changed.
Read-only fields and `type` (set only on creation) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-59"></a> `name?` | `string` | Network display name. Min 1, max 128 characters. Must be unique. | services/network/types.ts:520 |
| <a id="property-description-62"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/network/types.ts:523 |
| <a id="property-enabled-37"></a> `enabled?` | `boolean` | Whether the network is enabled. | services/network/types.ts:526 |
| <a id="property-layer2_type-2"></a> `layer2_type?` | [`Layer2Type`](#layer2type) | Layer 2 encapsulation type. | services/network/types.ts:529 |
| <a id="property-layer2_id-2"></a> `layer2_id?` | `number` | VLAN/VXLAN tag ID. | services/network/types.ts:532 |
| <a id="property-vxlan_multicast-2"></a> `vxlan_multicast?` | `string` | vxLan multicast address. | services/network/types.ts:535 |
| <a id="property-physical_bridged-2"></a> `physical_bridged?` | `boolean` | Whether this is a bridged physical network. | services/network/types.ts:538 |
| <a id="property-port_mirroring-2"></a> `port_mirroring?` | [`PortMirroringMode`](#portmirroringmode) | Port mirroring mode. | services/network/types.ts:541 |
| <a id="property-port_mirroring_vnet-2"></a> `port_mirroring_vnet?` | [`FlexKey`](#flexkey) | Network ID for mirrored traffic (FK to `vnets`). | services/network/types.ts:544 |
| <a id="property-interface_vnet-2"></a> `interface_vnet?` | [`FlexKey`](#flexkey) | Interface vnet ID (FK to `vnets`). | services/network/types.ts:547 |
| <a id="property-enable_bonding-2"></a> `enable_bonding?` | `boolean` | Whether bonding is enabled. | services/network/types.ts:550 |
| <a id="property-bond_interfaces_args-2"></a> `bond_interfaces_args?` | `unknown` | Bonding interface arguments (JSON). | services/network/types.ts:553 |
| <a id="property-mtu-2"></a> `mtu?` | `number` | Maximum transmission unit. Min 1000, max 65536. | services/network/types.ts:556 |
| <a id="property-advanced_options-2"></a> `advanced_options?` | `unknown` | Advanced options (JSON). | services/network/types.ts:559 |
| <a id="property-ipaddress_type-2"></a> `ipaddress_type?` | [`IpAddressType`](#ipaddresstype) | IP address assignment method. | services/network/types.ts:562 |
| <a id="property-ipaddress-5"></a> `ipaddress?` | `string` | Network router IP address. | services/network/types.ts:565 |
| <a id="property-dmz_ipaddress-2"></a> `dmz_ipaddress?` | `string` | DMZ IP address for this router. | services/network/types.ts:568 |
| <a id="property-network-2"></a> `network?` | `string` | Network address in CIDR notation. | services/network/types.ts:571 |
| <a id="property-gateway-2"></a> `gateway?` | `string` | Gateway IP address. | services/network/types.ts:574 |
| <a id="property-vnet_default_gateway-2"></a> `vnet_default_gateway?` | [`FlexKey`](#flexkey) | Default gateway network ID (FK to `vnets`). | services/network/types.ts:577 |
| <a id="property-hostname-5"></a> `hostname?` | `string` | Router hostname. | services/network/types.ts:580 |
| <a id="property-dns-2"></a> `dns?` | [`DnsMode`](#dnsmode) | DNS service mode. | services/network/types.ts:583 |
| <a id="property-domain-6"></a> `domain?` | `string` | Domain name for the network. | services/network/types.ts:586 |
| <a id="property-dnslist-2"></a> `dnslist?` | `string` | DNS server list. | services/network/types.ts:589 |
| <a id="property-override_dhcp_dns-2"></a> `override_dhcp_dns?` | `boolean` | Whether to ignore DNS servers from DHCP. | services/network/types.ts:592 |
| <a id="property-network_dns-2"></a> `network_dns?` | [`FlexKey`](#flexkey) | DNS network ID for forwarding (FK to `vnets`). | services/network/types.ts:595 |
| <a id="property-network_dns_zone-2"></a> `network_dns_zone?` | [`FlexKey`](#flexkey) | DNS zone reference (FK to `vnet_dns_zones`). | services/network/types.ts:598 |
| <a id="property-dhcp_enabled-2"></a> `dhcp_enabled?` | `boolean` | Whether DHCP is enabled. | services/network/types.ts:601 |
| <a id="property-dhcp_dynamic-2"></a> `dhcp_dynamic?` | `boolean` | Whether dynamic DHCP is enabled. | services/network/types.ts:604 |
| <a id="property-dhcp_sequential-2"></a> `dhcp_sequential?` | `boolean` | Whether DHCP assigns IPs sequentially. | services/network/types.ts:607 |
| <a id="property-dhcp_start-2"></a> `dhcp_start?` | `string` | Start of the DHCP range. | services/network/types.ts:610 |
| <a id="property-dhcp_stop-2"></a> `dhcp_stop?` | `string` | End of the DHCP range. | services/network/types.ts:613 |
| <a id="property-autostart-2"></a> `autostart?` | `boolean` | Whether the network automatically starts. | services/network/types.ts:616 |
| <a id="property-on_power_loss-2"></a> `on_power_loss?` | [`NetworkOnPowerLoss`](#networkonpowerloss) | Behavior when host power is restored. | services/network/types.ts:619 |
| <a id="property-cluster-3"></a> `cluster?` | [`FlexKey`](#flexkey) | Primary cluster reference (FK to `clusters`). | services/network/types.ts:622 |
| <a id="property-cluster_failover-2"></a> `cluster_failover?` | [`FlexKey`](#flexkey) | Failover cluster reference (FK to `clusters`). | services/network/types.ts:625 |
| <a id="property-preferred_node-2"></a> `preferred_node?` | [`FlexKey`](#flexkey) | Preferred node for scheduling (FK to `nodes`). | services/network/types.ts:628 |
| <a id="property-ha_group-2"></a> `ha_group?` | `string` | HA group for anti-affinity. | services/network/types.ts:631 |
| <a id="property-statistics-5"></a> `statistics?` | `boolean` | Whether to track statistics for all rules. | services/network/types.ts:634 |
| <a id="property-dmz_statistics-2"></a> `dmz_statistics?` | `boolean` | Whether to track DMZ statistics. | services/network/types.ts:637 |
| <a id="property-trace-5"></a> `trace?` | `boolean` | Whether to trace/debug firewall rules. | services/network/types.ts:640 |
| <a id="property-mirror_logs-2"></a> `mirror_logs?` | `boolean` | Whether to mirror syslog to UI. | services/network/types.ts:643 |
| <a id="property-apply_fw_on_start-2"></a> `apply_fw_on_start?` | `boolean` | Whether to apply firewall rules on next start. | services/network/types.ts:646 |
| <a id="property-need_restart-1"></a> `need_restart?` | `boolean` | Whether the network needs a restart. | services/network/types.ts:649 |
| <a id="property-need_fw_apply-1"></a> `need_fw_apply?` | `boolean` | Whether firewall rules need to be applied. | services/network/types.ts:652 |
| <a id="property-need_dns_apply-1"></a> `need_dns_apply?` | `boolean` | Whether DNS configuration needs to be applied. | services/network/types.ts:655 |
| <a id="property-need_proxy_apply-1"></a> `need_proxy_apply?` | `boolean` | Whether proxy configuration needs to be applied. | services/network/types.ts:658 |
| <a id="property-need_interface_apply-1"></a> `need_interface_apply?` | `boolean` | Whether interface configuration needs to be applied. | services/network/types.ts:661 |
| <a id="property-rate_limit-2"></a> `rate_limit?` | `number` | Rate limit value. | services/network/types.ts:664 |
| <a id="property-rate_limit_type-2"></a> `rate_limit_type?` | [`RateLimitType`](#ratelimittype) | Rate limit unit type. | services/network/types.ts:667 |
| <a id="property-rate_limit_burst-2"></a> `rate_limit_burst?` | `number` | Rate limit burst value. | services/network/types.ts:670 |
| <a id="property-bgp_asn-2"></a> `bgp_asn?` | `number` | BGP autonomous system number. | services/network/types.ts:673 |
| <a id="property-proxy_enabled-2"></a> `proxy_enabled?` | `boolean` | Whether the proxy is enabled. | services/network/types.ts:676 |
| <a id="property-proxy_listen_address-2"></a> `proxy_listen_address?` | `string` | Proxy listen address. | services/network/types.ts:679 |
| <a id="property-pxe-2"></a> `pxe?` | [`PxeMode`](#pxemode) | PXE boot mode. | services/network/types.ts:682 |
| <a id="property-tftp_server-2"></a> `tftp_server?` | `string` | TFTP server IP for custom PXE. | services/network/types.ts:685 |
| <a id="property-monitor_gateway-2"></a> `monitor_gateway?` | `boolean` | Whether to monitor the gateway. | services/network/types.ts:688 |
| <a id="property-monitor_ip-2"></a> `monitor_ip?` | `string` | IP address to monitor. | services/network/types.ts:691 |
| <a id="property-monitor_interval_ms-2"></a> `monitor_interval_ms?` | `number` | Monitoring interval in milliseconds. Min 1000, max 120000. | services/network/types.ts:694 |
| <a id="property-note-2"></a> `note?` | `string` | Free-form note. Max 1024 characters. | services/network/types.ts:697 |

***

### Node

Defined in: services/node/types.ts:18

VergeOS node resource.

Nodes are physical or virtual servers that belong to a cluster.
They provide compute and/or storage resources. Nodes are
infrastructure-managed — they cannot be created or deleted via
the API, only updated.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-cluster-4"></a> `cluster?` | [`FlexKey`](#flexkey) | Parent cluster FK. | - | services/node/types.ts:20 |
| <a id="property-name-60"></a> `name` | `string` | Node hostname (read-only). | - | services/node/types.ts:22 |
| <a id="property-description-63"></a> `description?` | `string` | Node description (up to 2048 chars). | - | services/node/types.ts:24 |
| <a id="property-sysnode"></a> `sysnode?` | [`FlexKey`](#flexkey) | System node FK (read-only). | - | services/node/types.ts:26 |
| <a id="property-id-8"></a> `id?` | `number` | Unique node identifier (read-only). | - | services/node/types.ts:28 |
| <a id="property-machine-15"></a> `machine?` | [`FlexKey`](#flexkey) | Machine FK (read-only). | - | services/node/types.ts:30 |
| <a id="property-console_status"></a> `console_status?` | [`FlexKey`](#flexkey) | Console status FK (read-only). | - | services/node/types.ts:32 |
| <a id="property-model-4"></a> `model?` | `string` | Hardware model. | - | services/node/types.ts:34 |
| <a id="property-cpu"></a> `cpu?` | `string` | CPU model. | - | services/node/types.ts:36 |
| <a id="property-cpu_speed"></a> `cpu_speed?` | `string` | CPU speed. | - | services/node/types.ts:38 |
| <a id="property-physical-1"></a> `physical?` | `boolean` | Whether this is a physical node. | - | services/node/types.ts:40 |
| <a id="property-ram-2"></a> `ram?` | `number` | Total RAM in MB (read-only). | - | services/node/types.ts:42 |
| <a id="property-overcommit"></a> `overcommit?` | `number` | Overcommit RAM in MB. | - | services/node/types.ts:44 |
| <a id="property-vm_ram"></a> `vm_ram?` | `number` | VM RAM allocation in MB. | - | services/node/types.ts:46 |
| <a id="property-failover_ram"></a> `failover_ram?` | `number` | VM failover RAM in MB. | - | services/node/types.ts:48 |
| <a id="property-cores"></a> `cores?` | `number` | Number of CPU cores (read-only). | - | services/node/types.ts:50 |
| <a id="property-maintenance"></a> `maintenance?` | `boolean` | Whether the node is in maintenance mode. | - | services/node/types.ts:52 |
| <a id="property-verify_maintenance"></a> `verify_maintenance?` | `string` | Skip maintenance validation checks. | - | services/node/types.ts:54 |
| <a id="property-maintenance_reset"></a> `maintenance_reset?` | `boolean` | Reset maintenance mode on reset. | - | services/node/types.ts:56 |
| <a id="property-feature_vnet_migration"></a> `feature_vnet_migration?` | `boolean` | Whether this node supports network migration. | - | services/node/types.ts:58 |
| <a id="property-yb_version"></a> `yb_version?` | `string` | VergeOS YB version. | - | services/node/types.ts:60 |
| <a id="property-os_version"></a> `os_version?` | `string` | OS version. | - | services/node/types.ts:62 |
| <a id="property-kernel_version"></a> `kernel_version?` | `string` | Kernel version. | - | services/node/types.ts:64 |
| <a id="property-appserver_version"></a> `appserver_version?` | `string` | Appserver version. | - | services/node/types.ts:66 |
| <a id="property-vsan_version"></a> `vsan_version?` | `string` | vSAN version. | - | services/node/types.ts:68 |
| <a id="property-qemu_version"></a> `qemu_version?` | `string` | QEMU version. | - | services/node/types.ts:70 |
| <a id="property-asset_tag"></a> `asset_tag?` | `string` | Asset tag. | - | services/node/types.ts:72 |
| <a id="property-ipmi_address"></a> `ipmi_address?` | `string` | IPMI network address. | - | services/node/types.ts:74 |
| <a id="property-ipmi_user"></a> `ipmi_user?` | `string` | IPMI username. | - | services/node/types.ts:76 |
| <a id="property-ipmi_password"></a> `ipmi_password?` | `string` | IPMI password. | - | services/node/types.ts:78 |
| <a id="property-ipmi_status"></a> `ipmi_status?` | [`IpmiStatus`](#ipmistatus) | IPMI connection status. | - | services/node/types.ts:80 |
| <a id="property-ipmi_status_info"></a> `ipmi_status_info?` | `string` | IPMI status info message. | - | services/node/types.ts:82 |
| <a id="property-ipmi_status_last_connected"></a> `ipmi_status_last_connected?` | `number` | IPMI last connected timestamp (epoch seconds). | - | services/node/types.ts:84 |
| <a id="property-capture_logs"></a> `capture_logs?` | `boolean` | Whether to capture system logs. | - | services/node/types.ts:86 |
| <a id="property-lldp"></a> `lldp?` | `boolean` | Whether to send/receive LLDP advertisements. | - | services/node/types.ts:88 |
| <a id="property-pxe_vnet"></a> `pxe_vnet?` | [`FlexKey`](#flexkey) | PXE network FK. | - | services/node/types.ts:90 |
| <a id="property-vsan_nodeid"></a> `vsan_nodeid?` | `number` | vSAN node ID (-1 = unset). | - | services/node/types.ts:92 |
| <a id="property-vsan_connected"></a> `vsan_connected?` | `boolean` | Whether vSAN is connected. | - | services/node/types.ts:94 |
| <a id="property-max_core_temp-3"></a> `max_core_temp?` | `number` | Maximum core temperature in Celsius (0 = disabled). | - | services/node/types.ts:96 |
| <a id="property-max_core_temp_warn_perc-3"></a> `max_core_temp_warn_perc?` | `number` | Maximum core temperature warning threshold percentage. | - | services/node/types.ts:98 |
| <a id="property-critical_core_temp-3"></a> `critical_core_temp?` | `number` | Critical core temperature in Celsius (0 = disabled). | - | services/node/types.ts:100 |
| <a id="property-iommu"></a> `iommu?` | `boolean` | IOMMU (VT-d) support (read-only). | - | services/node/types.ts:102 |
| <a id="property-need_restart-2"></a> `need_restart?` | `boolean` | Whether the node needs a reboot (read-only). | - | services/node/types.ts:104 |
| <a id="property-restart_reason"></a> `restart_reason?` | `string` | Reason for needing reboot (read-only). | - | services/node/types.ts:106 |
| <a id="property-ipmi_sel_free"></a> `ipmi_sel_free?` | `number` | IPMI SEL records free. | - | services/node/types.ts:108 |
| <a id="property-ipmi_sel_used"></a> `ipmi_sel_used?` | `number` | IPMI SEL records used. | - | services/node/types.ts:110 |
| <a id="property-ignore_pstore"></a> `ignore_pstore?` | `boolean` | Do not check persistent storage on start-up. | - | services/node/types.ts:112 |
| <a id="property-note-3"></a> `note?` | `string` | User-visible note (up to 1024 chars). | - | services/node/types.ts:114 |
| <a id="property-stats-1"></a> `stats?` | [`FlexKey`](#flexkey) | Node stats FK (read-only). | - | services/node/types.ts:116 |
| <a id="property-reload_drivers_required"></a> `reload_drivers_required?` | `boolean` | Whether a driver reload is required (read-only). | - | services/node/types.ts:118 |
| <a id="property-packages"></a> `packages?` | `unknown` | Installed packages (JSON). Locked. | - | services/node/types.ts:121 |
| <a id="property-ipmi_sel_last_id"></a> `ipmi_sel_last_id?` | `string` | Last processed IPMI SEL event ID. | - | services/node/types.ts:124 |
| <a id="property-ras_mc_last_timestamp"></a> `ras_mc_last_timestamp?` | `number` | Last processed RAS MC timestamp (Unix epoch). | - | services/node/types.ts:127 |
| <a id="property-key-47"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### NodeUpdateParams

Defined in: services/node/types.ts:138

Parameters for updating a node.

Nodes are infrastructure-managed — only update is supported (no create/delete).
Excludes read-only fields: `name`, `sysnode`, `id`, `machine`, `console_status`,
`ram`, `cores`, `iommu`, `need_restart`, `restart_reason`, `stats`,
`reload_drivers_required`.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-description-64"></a> `description?` | `string` | Node description. | services/node/types.ts:140 |
| <a id="property-model-5"></a> `model?` | `string` | Hardware model. | services/node/types.ts:142 |
| <a id="property-cpu-1"></a> `cpu?` | `string` | CPU model. | services/node/types.ts:144 |
| <a id="property-cpu_speed-1"></a> `cpu_speed?` | `string` | CPU speed. | services/node/types.ts:146 |
| <a id="property-physical-2"></a> `physical?` | `boolean` | Whether this is a physical node. | services/node/types.ts:148 |
| <a id="property-overcommit-1"></a> `overcommit?` | `number` | Overcommit RAM in MB. | services/node/types.ts:150 |
| <a id="property-vm_ram-1"></a> `vm_ram?` | `number` | VM RAM allocation in MB. | services/node/types.ts:152 |
| <a id="property-failover_ram-1"></a> `failover_ram?` | `number` | VM failover RAM in MB. | services/node/types.ts:154 |
| <a id="property-maintenance-1"></a> `maintenance?` | `boolean` | Whether the node is in maintenance mode. | services/node/types.ts:156 |
| <a id="property-verify_maintenance-1"></a> `verify_maintenance?` | `string` | Skip maintenance validation checks. | services/node/types.ts:158 |
| <a id="property-maintenance_reset-1"></a> `maintenance_reset?` | `boolean` | Reset maintenance mode on reset. | services/node/types.ts:160 |
| <a id="property-asset_tag-1"></a> `asset_tag?` | `string` | Asset tag. | services/node/types.ts:162 |
| <a id="property-ipmi_address-1"></a> `ipmi_address?` | `string` | IPMI network address. | services/node/types.ts:164 |
| <a id="property-ipmi_user-1"></a> `ipmi_user?` | `string` | IPMI username. | services/node/types.ts:166 |
| <a id="property-ipmi_password-1"></a> `ipmi_password?` | `string` | IPMI password. | services/node/types.ts:168 |
| <a id="property-capture_logs-1"></a> `capture_logs?` | `boolean` | Whether to capture system logs. | services/node/types.ts:170 |
| <a id="property-lldp-1"></a> `lldp?` | `boolean` | Whether to send/receive LLDP advertisements. | services/node/types.ts:172 |
| <a id="property-ignore_pstore-1"></a> `ignore_pstore?` | `boolean` | Do not check persistent storage on start-up. | services/node/types.ts:174 |
| <a id="property-note-4"></a> `note?` | `string` | User-visible note (up to 1024 chars). | services/node/types.ts:176 |
| <a id="property-max_core_temp-4"></a> `max_core_temp?` | `number` | Maximum core temperature in Celsius. | services/node/types.ts:178 |
| <a id="property-max_core_temp_warn_perc-4"></a> `max_core_temp_warn_perc?` | `number` | Maximum core temperature warning threshold %. | services/node/types.ts:180 |
| <a id="property-critical_core_temp-4"></a> `critical_core_temp?` | `number` | Critical core temperature in Celsius. | services/node/types.ts:182 |
| <a id="property-pxe_vnet-1"></a> `pxe_vnet?` | [`FlexKey`](#flexkey) | PXE network FK. | services/node/types.ts:184 |

***

### Permission

Defined in: services/permission/types.ts:14

A VergeOS permission resource.

Permissions define identity-based access control for specific resources.
Each permission links an identity to a resource table/row with five
boolean capability flags: `list`, `read`, `create`, `modify`, `delete`.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-identity-1"></a> `identity?` | [`FlexKey`](#flexkey) | Identity reference (FK to `/sys/identities`). | - | services/permission/types.ts:16 |
| <a id="property-identity_display"></a> `identity_display?` | `string` | Display name of the identity. | - | services/permission/types.ts:19 |
| <a id="property-identity_owner"></a> `identity_owner?` | `string` | Owner of the identity. | - | services/permission/types.ts:22 |
| <a id="property-table"></a> `table?` | `string` | Resource type string (e.g., `vms`, `networks`). | - | services/permission/types.ts:25 |
| <a id="property-tableid"></a> `tableid?` | `number` | Internal table ID. Read-only. | - | services/permission/types.ts:28 |
| <a id="property-row"></a> `row?` | `number` | Resource row ID. Read-only after creation. | - | services/permission/types.ts:31 |
| <a id="property-rowdisplay"></a> `rowdisplay?` | `string` | Display name of the resource row. | - | services/permission/types.ts:34 |
| <a id="property-list"></a> `list?` | `boolean` | Whether the identity can list resources in this table. Default: `true`. | - | services/permission/types.ts:37 |
| <a id="property-read"></a> `read?` | `boolean` | Whether the identity can read the resource. | - | services/permission/types.ts:40 |
| <a id="property-create"></a> `create?` | `boolean` | Whether the identity can create resources in this table. | - | services/permission/types.ts:43 |
| <a id="property-modify"></a> `modify?` | `boolean` | Whether the identity can modify the resource. | - | services/permission/types.ts:46 |
| <a id="property-delete"></a> `delete?` | `boolean` | Whether the identity can delete the resource. | - | services/permission/types.ts:49 |
| <a id="property-key-48"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### PermissionCreateParams

Defined in: services/permission/types.ts:60

Parameters for creating a new permission.

`identity`, `table`, and `row` are required. The `row` field becomes
read-only after creation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-identity-2"></a> `identity` | [`FlexKey`](#flexkey) | Identity reference (FK to `/sys/identities`). | services/permission/types.ts:62 |
| <a id="property-table-1"></a> `table` | `string` | Resource type string (e.g., `vms`, `networks`). | services/permission/types.ts:65 |
| <a id="property-row-1"></a> `row` | `number` | Resource row ID. | services/permission/types.ts:68 |
| <a id="property-rowdisplay-1"></a> `rowdisplay?` | `string` | Display name of the resource row. | services/permission/types.ts:71 |
| <a id="property-identity_display-1"></a> `identity_display?` | `string` | Display name of the identity. | services/permission/types.ts:74 |
| <a id="property-identity_owner-1"></a> `identity_owner?` | `string` | Owner of the identity. | services/permission/types.ts:77 |
| <a id="property-list-1"></a> `list?` | `boolean` | Whether the identity can list resources in this table. Default: `true`. | services/permission/types.ts:80 |
| <a id="property-read-1"></a> `read?` | `boolean` | Whether the identity can read the resource. | services/permission/types.ts:83 |
| <a id="property-create-1"></a> `create?` | `boolean` | Whether the identity can create resources in this table. | services/permission/types.ts:86 |
| <a id="property-modify-1"></a> `modify?` | `boolean` | Whether the identity can modify the resource. | services/permission/types.ts:89 |
| <a id="property-delete-1"></a> `delete?` | `boolean` | Whether the identity can delete the resource. | services/permission/types.ts:92 |

***

### PermissionUpdateParams

Defined in: services/permission/types.ts:102

Parameters for updating an existing permission.

Only the five boolean capability flags can be updated.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-list-2"></a> `list?` | `boolean` | Whether the identity can list resources in this table. | services/permission/types.ts:104 |
| <a id="property-read-2"></a> `read?` | `boolean` | Whether the identity can read the resource. | services/permission/types.ts:107 |
| <a id="property-create-2"></a> `create?` | `boolean` | Whether the identity can create resources in this table. | services/permission/types.ts:110 |
| <a id="property-modify-2"></a> `modify?` | `boolean` | Whether the identity can modify the resource. | services/permission/types.ts:113 |
| <a id="property-delete-2"></a> `delete?` | `boolean` | Whether the identity can delete the resource. | services/permission/types.ts:116 |

***

### ResourceGroup

Defined in: services/resource-group/types.ts:30

A grouping of physical hardware resources for assignment to VMs.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-uuid-5"></a> `uuid?` | `string` | - | services/resource-group/types.ts:31 |
| <a id="property-enabled-38"></a> `enabled?` | `boolean` | - | services/resource-group/types.ts:32 |
| <a id="property-name-61"></a> `name?` | `string` | - | services/resource-group/types.ts:33 |
| <a id="property-description-65"></a> `description?` | `string` | - | services/resource-group/types.ts:34 |
| <a id="property-type-21"></a> `type?` | [`ResourceGroupType`](#resourcegrouptype) | - | services/resource-group/types.ts:35 |
| <a id="property-class"></a> `class?` | [`ResourceGroupClass`](#resourcegroupclass) | - | services/resource-group/types.ts:36 |
| <a id="property-settings"></a> `settings?` | [`FlexKey`](#flexkey) | - | services/resource-group/types.ts:37 |
| <a id="property-settings_args-3"></a> `settings_args?` | `Record`\<`string`, `unknown`\> | - | services/resource-group/types.ts:38 |
| <a id="property-key_args"></a> `key_args?` | `Record`\<`string`, `unknown`\> | - | services/resource-group/types.ts:39 |
| <a id="property-modified-14"></a> `modified?` | `number` | - | services/resource-group/types.ts:40 |
| <a id="property-created-11"></a> `created?` | `number` | - | services/resource-group/types.ts:41 |
| <a id="property-key-49"></a> `$key` | [`FlexKey`](#flexkey) | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### ResourceGroupCreateParams

Defined in: services/resource-group/types.ts:47

Parameters for creating a new resource group.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-62"></a> `name` | `string` | Group name (required, 1–256 chars). | services/resource-group/types.ts:49 |
| <a id="property-description-66"></a> `description?` | `string` | Optional description (max 2048 chars). | services/resource-group/types.ts:51 |
| <a id="property-enabled-39"></a> `enabled?` | `boolean` | Whether the group is enabled. | services/resource-group/types.ts:53 |
| <a id="property-class-1"></a> `class?` | [`ResourceGroupClass`](#resourcegroupclass) | Device class categorization. | services/resource-group/types.ts:55 |
| <a id="property-settings_args-4"></a> `settings_args?` | `Record`\<`string`, `unknown`\> | Settings arguments. | services/resource-group/types.ts:57 |
| <a id="property-key_args-1"></a> `key_args?` | `Record`\<`string`, `unknown`\> | Key arguments. | services/resource-group/types.ts:59 |

***

### ResourceGroupUpdateParams

Defined in: services/resource-group/types.ts:65

Parameters for updating an existing resource group.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-name-63"></a> `name?` | `string` | services/resource-group/types.ts:66 |
| <a id="property-description-67"></a> `description?` | `string` | services/resource-group/types.ts:67 |
| <a id="property-enabled-40"></a> `enabled?` | `boolean` | services/resource-group/types.ts:68 |
| <a id="property-class-2"></a> `class?` | [`ResourceGroupClass`](#resourcegroupclass) | services/resource-group/types.ts:69 |
| <a id="property-settings_args-5"></a> `settings_args?` | `Record`\<`string`, `unknown`\> | services/resource-group/types.ts:70 |
| <a id="property-key_args-2"></a> `key_args?` | `Record`\<`string`, `unknown`\> | services/resource-group/types.ts:71 |

***

### Setting

Defined in: services/settings/types.ts:10

A VergeOS system configuration setting (key-value pair).

Settings are system-level configuration entries with a unique key,
a current value, and a default value. The `key` field is read-only
and serves as the logical identifier.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-key-50"></a> `key` | `string` | Unique setting key (e.g., `"cloud_name"`). Read-only. | - | services/settings/types.ts:12 |
| <a id="property-value-6"></a> `value?` | `string` | Current value of the setting. | - | services/settings/types.ts:14 |
| <a id="property-default_value"></a> `default_value?` | `string` | Default value of the setting. Read-only. | - | services/settings/types.ts:16 |
| <a id="property-description-68"></a> `description?` | `string` | Description of what this setting controls. | - | services/settings/types.ts:18 |
| <a id="property-key-51"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### SettingUpdateParams

Defined in: services/settings/types.ts:26

Fields that can be updated on a setting.

Only `value` and `description` are writable — `key` and `default_value` are read-only.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-value-7"></a> `value?` | `string` | New value for the setting. | services/settings/types.ts:28 |
| <a id="property-description-69"></a> `description?` | `string` | Updated description. | services/settings/types.ts:30 |

***

### SiteSyncIncoming

Defined in: services/site-sync-incoming/types.ts:30

A VergeOS incoming site sync resource.

Incoming syncs receive snapshot data from a remote site's outgoing sync.
Each incoming sync generates a registration code used to pair with
the corresponding outgoing sync on the remote system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-64"></a> `name` | `string` | Sync name. | - | services/site-sync-incoming/types.ts:32 |
| <a id="property-description-70"></a> `description?` | `string` | Human-readable description. | - | services/site-sync-incoming/types.ts:35 |
| <a id="property-enabled-41"></a> `enabled?` | `boolean` | Whether the sync is enabled. | - | services/site-sync-incoming/types.ts:38 |
| <a id="property-site"></a> `site` | [`FlexKey`](#flexkey) | Foreign key to the parent site. | - | services/site-sync-incoming/types.ts:41 |
| <a id="property-sync_id"></a> `sync_id?` | `string` | 40-character unique sync identifier. Read-only. | - | services/site-sync-incoming/types.ts:44 |
| <a id="property-registration_code"></a> `registration_code?` | `string` | Registration code for pairing with outgoing sync. Read-only. | - | services/site-sync-incoming/types.ts:47 |
| <a id="property-status-12"></a> `status?` | [`SiteSyncIncomingStatus`](#sitesyncincomingstatus) | Current sync status. | - | services/site-sync-incoming/types.ts:50 |
| <a id="property-status_info-5"></a> `status_info?` | `string` | Additional status information. | - | services/site-sync-incoming/types.ts:53 |
| <a id="property-state-2"></a> `state?` | [`SiteSyncIncomingState`](#sitesyncincomingstate) | Current state (online/offline). | - | services/site-sync-incoming/types.ts:56 |
| <a id="property-public_ip"></a> `public_ip?` | `string` | Public IP or domain for the sync connection. | - | services/site-sync-incoming/types.ts:59 |
| <a id="property-force_tier"></a> `force_tier?` | [`SiteSyncIncomingForceTier`](#sitesyncincomingforcetier) | Force storage to a specific tier. | - | services/site-sync-incoming/types.ts:62 |
| <a id="property-min_snapshots-1"></a> `min_snapshots?` | `number` | Minimum number of snapshots to retain. | - | services/site-sync-incoming/types.ts:65 |
| <a id="property-vsan_host"></a> `vsan_host?` | `string` | vSAN host address. | - | services/site-sync-incoming/types.ts:68 |
| <a id="property-vsan_port"></a> `vsan_port?` | `number` | vSAN port (default 14201). | - | services/site-sync-incoming/types.ts:71 |
| <a id="property-request_url"></a> `request_url?` | `string` | URL the remote system uses to connect. | - | services/site-sync-incoming/types.ts:74 |
| <a id="property-last_sync"></a> `last_sync?` | `number` | Last sync timestamp (epoch seconds). | - | services/site-sync-incoming/types.ts:77 |
| <a id="property-system_created"></a> `system_created?` | `boolean` | Whether this sync was system-created. Read-only. | - | services/site-sync-incoming/types.ts:80 |
| <a id="property-sync_back"></a> `sync_back?` | [`FlexKey`](#flexkey) | Foreign key to the sync-back outgoing sync. Read-only. | - | services/site-sync-incoming/types.ts:83 |
| <a id="property-current_stats"></a> `current_stats?` | [`FlexKey`](#flexkey) | Foreign key reference to current stats. Read-only. | - | services/site-sync-incoming/types.ts:86 |
| <a id="property-user-7"></a> `user?` | [`FlexKey`](#flexkey) | Foreign key to the user. Read-only. | - | services/site-sync-incoming/types.ts:89 |
| <a id="property-vsan_userid"></a> `vsan_userid?` | `string` | vSAN user ID. Read-only. | - | services/site-sync-incoming/types.ts:92 |
| <a id="property-verified"></a> `verified?` | `boolean` | Whether this sync has been verified. | - | services/site-sync-incoming/types.ts:95 |
| <a id="property-key-52"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### SiteSyncIncomingCreateParams

Defined in: services/site-sync-incoming/types.ts:105

Parameters for creating a new incoming site sync.

Both `site` and `name` are required.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-site-1"></a> `site` | [`FlexKey`](#flexkey) | Foreign key to the parent site. Required. | services/site-sync-incoming/types.ts:107 |
| <a id="property-name-65"></a> `name` | `string` | Sync name. Required. | services/site-sync-incoming/types.ts:110 |
| <a id="property-description-71"></a> `description?` | `string` | Human-readable description. | services/site-sync-incoming/types.ts:113 |
| <a id="property-enabled-42"></a> `enabled?` | `boolean` | Whether the sync is enabled. | services/site-sync-incoming/types.ts:116 |
| <a id="property-public_ip-1"></a> `public_ip?` | `string` | Public IP or domain for the sync connection. | services/site-sync-incoming/types.ts:119 |
| <a id="property-force_tier-1"></a> `force_tier?` | [`SiteSyncIncomingForceTier`](#sitesyncincomingforcetier) | Force storage to a specific tier. | services/site-sync-incoming/types.ts:122 |
| <a id="property-min_snapshots-2"></a> `min_snapshots?` | `number` | Minimum number of snapshots to retain. | services/site-sync-incoming/types.ts:125 |
| <a id="property-vsan_host-1"></a> `vsan_host?` | `string` | vSAN host address. | services/site-sync-incoming/types.ts:128 |
| <a id="property-vsan_port-1"></a> `vsan_port?` | `number` | vSAN port. | services/site-sync-incoming/types.ts:131 |
| <a id="property-request_url-1"></a> `request_url?` | `string` | URL the remote system uses to connect. | services/site-sync-incoming/types.ts:134 |

***

### SiteSyncIncomingUpdateParams

Defined in: services/site-sync-incoming/types.ts:144

Parameters for updating an existing incoming site sync.

All fields are optional — only provided fields are changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-66"></a> `name?` | `string` | Sync name. | services/site-sync-incoming/types.ts:146 |
| <a id="property-description-72"></a> `description?` | `string` | Human-readable description. | services/site-sync-incoming/types.ts:149 |
| <a id="property-enabled-43"></a> `enabled?` | `boolean` | Whether the sync is enabled. | services/site-sync-incoming/types.ts:152 |
| <a id="property-public_ip-2"></a> `public_ip?` | `string` | Public IP or domain for the sync connection. | services/site-sync-incoming/types.ts:155 |
| <a id="property-force_tier-2"></a> `force_tier?` | [`SiteSyncIncomingForceTier`](#sitesyncincomingforcetier) | Force storage to a specific tier. | services/site-sync-incoming/types.ts:158 |
| <a id="property-min_snapshots-3"></a> `min_snapshots?` | `number` | Minimum number of snapshots to retain. | services/site-sync-incoming/types.ts:161 |
| <a id="property-vsan_host-2"></a> `vsan_host?` | `string` | vSAN host address. | services/site-sync-incoming/types.ts:164 |
| <a id="property-vsan_port-2"></a> `vsan_port?` | `number` | vSAN port. | services/site-sync-incoming/types.ts:167 |
| <a id="property-request_url-2"></a> `request_url?` | `string` | URL the remote system uses to connect. | services/site-sync-incoming/types.ts:170 |

***

### SiteSyncOutgoing

Defined in: services/site-sync-outgoing/types.ts:33

A VergeOS outgoing site sync resource.

Outgoing syncs push snapshot data to a remote site's incoming sync.
They handle transport configuration, bandwidth throttling, retry behavior,
and remote snapshot management.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-67"></a> `name` | `string` | Sync name. | - | services/site-sync-outgoing/types.ts:35 |
| <a id="property-description-73"></a> `description?` | `string` | Human-readable description. | - | services/site-sync-outgoing/types.ts:38 |
| <a id="property-enabled-44"></a> `enabled?` | `boolean` | Whether the sync is enabled. | - | services/site-sync-outgoing/types.ts:41 |
| <a id="property-site-2"></a> `site` | [`FlexKey`](#flexkey) | Foreign key to the parent site. | - | services/site-sync-outgoing/types.ts:44 |
| <a id="property-status-13"></a> `status?` | [`SiteSyncOutgoingStatus`](#sitesyncoutgoingstatus) | Current sync status. | - | services/site-sync-outgoing/types.ts:47 |
| <a id="property-status_info-6"></a> `status_info?` | `string` | Additional status information. | - | services/site-sync-outgoing/types.ts:50 |
| <a id="property-state-3"></a> `state?` | [`SiteSyncOutgoingState`](#sitesyncoutgoingstate) | Current state (online/offline). | - | services/site-sync-outgoing/types.ts:53 |
| <a id="property-url-4"></a> `url?` | `string` | Remote URL for the sync destination. | - | services/site-sync-outgoing/types.ts:56 |
| <a id="property-registration_code-1"></a> `registration_code?` | `string` | Registration code for pairing with incoming sync. | - | services/site-sync-outgoing/types.ts:59 |
| <a id="property-user-8"></a> `user?` | `string` | Site user for authentication. | - | services/site-sync-outgoing/types.ts:62 |
| <a id="property-password-6"></a> `password?` | `string` | Password for authentication. Write-only. | - | services/site-sync-outgoing/types.ts:65 |
| <a id="property-remote_site_id"></a> `remote_site_id?` | `string` | Remote site ID. | - | services/site-sync-outgoing/types.ts:68 |
| <a id="property-remote_vsan_user"></a> `remote_vsan_user?` | `string` | Remote vSAN user. Read-only. | - | services/site-sync-outgoing/types.ts:71 |
| <a id="property-remote_vsan_host"></a> `remote_vsan_host?` | `string` | Remote vSAN host address. | - | services/site-sync-outgoing/types.ts:74 |
| <a id="property-remote_vsan_port"></a> `remote_vsan_port?` | `number` | Remote vSAN port (default 14201). | - | services/site-sync-outgoing/types.ts:77 |
| <a id="property-destination_tier"></a> `destination_tier?` | [`SiteSyncOutgoingDestinationTier`](#sitesyncoutgoingdestinationtier) | Override destination storage tier. | - | services/site-sync-outgoing/types.ts:80 |
| <a id="property-remote_verify_id"></a> `remote_verify_id?` | `number` | Remote verify ID. | - | services/site-sync-outgoing/types.ts:83 |
| <a id="property-threads"></a> `threads?` | `number` | Number of data threads (1-32, default 8). | - | services/site-sync-outgoing/types.ts:86 |
| <a id="property-file_threads"></a> `file_threads?` | `number` | Number of file threads (1-64, default 4). | - | services/site-sync-outgoing/types.ts:89 |
| <a id="property-sendthrottle"></a> `sendthrottle?` | `number` | Send throttle (bytes/sec, 0 = unlimited). | - | services/site-sync-outgoing/types.ts:92 |
| <a id="property-encryption"></a> `encryption?` | `boolean` | Whether to encrypt data in transit. | - | services/site-sync-outgoing/types.ts:95 |
| <a id="property-compression"></a> `compression?` | `boolean` | Whether to use compression. | - | services/site-sync-outgoing/types.ts:98 |
| <a id="property-netinteg"></a> `netinteg?` | `boolean` | Whether to checksum network traffic. | - | services/site-sync-outgoing/types.ts:101 |
| <a id="property-queue_retry_count"></a> `queue_retry_count?` | `number` | Queue retry count (0-100, default 10). | - | services/site-sync-outgoing/types.ts:104 |
| <a id="property-queue_retry_interval_seconds"></a> `queue_retry_interval_seconds?` | `number` | Queue retry interval in seconds (1-300, default 60). | - | services/site-sync-outgoing/types.ts:107 |
| <a id="property-queue_retry_interval_multiplier"></a> `queue_retry_interval_multiplier?` | `boolean` | Whether to multiply retry interval on each attempt. | - | services/site-sync-outgoing/types.ts:110 |
| <a id="property-sync_back-1"></a> `sync_back?` | [`FlexKey`](#flexkey) | Foreign key to the sync-back incoming sync. | - | services/site-sync-outgoing/types.ts:113 |
| <a id="property-remote_sync_id"></a> `remote_sync_id?` | `string` | Remote sync ID. Read-only. | - | services/site-sync-outgoing/types.ts:116 |
| <a id="property-last_run"></a> `last_run?` | `number` | Last run timestamp (epoch seconds). | - | services/site-sync-outgoing/types.ts:119 |
| <a id="property-current_stats-1"></a> `current_stats?` | [`FlexKey`](#flexkey) | Foreign key to current stats. Read-only. | - | services/site-sync-outgoing/types.ts:122 |
| <a id="property-remote_min_snapshots"></a> `remote_min_snapshots?` | `number` | Remote minimum snapshots. Read-only. | - | services/site-sync-outgoing/types.ts:125 |
| <a id="property-remote_snaps_last_refresh"></a> `remote_snaps_last_refresh?` | `number` | Last remote snapshot refresh timestamp (epoch seconds). | - | services/site-sync-outgoing/types.ts:128 |
| <a id="property-remote_snaps_status"></a> `remote_snaps_status?` | [`SiteSyncOutgoingRemoteSnapsStatus`](#sitesyncoutgoingremotesnapsstatus) | Remote snapshot status. | - | services/site-sync-outgoing/types.ts:131 |
| <a id="property-remote_snaps_status_info"></a> `remote_snaps_status_info?` | `string` | Remote snapshot status info. | - | services/site-sync-outgoing/types.ts:134 |
| <a id="property-repair_server"></a> `repair_server?` | [`FlexKey`](#flexkey) | Foreign key to the repair server. Read-only. | - | services/site-sync-outgoing/types.ts:137 |
| <a id="property-note-5"></a> `note?` | `string` | User-defined note. | - | services/site-sync-outgoing/types.ts:140 |
| <a id="property-key-53"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### SiteSyncOutgoingCreateParams

Defined in: services/site-sync-outgoing/types.ts:150

Parameters for creating a new outgoing site sync.

Both `site` and `name` are required.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-site-3"></a> `site` | [`FlexKey`](#flexkey) | Foreign key to the parent site. Required. | services/site-sync-outgoing/types.ts:152 |
| <a id="property-name-68"></a> `name` | `string` | Sync name. Required. | services/site-sync-outgoing/types.ts:155 |
| <a id="property-description-74"></a> `description?` | `string` | Human-readable description. | services/site-sync-outgoing/types.ts:158 |
| <a id="property-enabled-45"></a> `enabled?` | `boolean` | Whether the sync is enabled. | services/site-sync-outgoing/types.ts:161 |
| <a id="property-url-5"></a> `url?` | `string` | Remote URL for the sync destination. | services/site-sync-outgoing/types.ts:164 |
| <a id="property-registration_code-2"></a> `registration_code?` | `string` | Registration code for pairing with incoming sync. | services/site-sync-outgoing/types.ts:167 |
| <a id="property-user-9"></a> `user?` | `string` | Site user for authentication. | services/site-sync-outgoing/types.ts:170 |
| <a id="property-password-7"></a> `password?` | `string` | Password for authentication. | services/site-sync-outgoing/types.ts:173 |
| <a id="property-remote_vsan_host-1"></a> `remote_vsan_host?` | `string` | Remote vSAN host address. | services/site-sync-outgoing/types.ts:176 |
| <a id="property-remote_vsan_port-1"></a> `remote_vsan_port?` | `number` | Remote vSAN port. | services/site-sync-outgoing/types.ts:179 |
| <a id="property-destination_tier-1"></a> `destination_tier?` | [`SiteSyncOutgoingDestinationTier`](#sitesyncoutgoingdestinationtier) | Override destination storage tier. | services/site-sync-outgoing/types.ts:182 |
| <a id="property-threads-1"></a> `threads?` | `number` | Number of data threads (1-32). | services/site-sync-outgoing/types.ts:185 |
| <a id="property-file_threads-1"></a> `file_threads?` | `number` | Number of file threads (1-64). | services/site-sync-outgoing/types.ts:188 |
| <a id="property-sendthrottle-1"></a> `sendthrottle?` | `number` | Send throttle (bytes/sec, 0 = unlimited). | services/site-sync-outgoing/types.ts:191 |
| <a id="property-encryption-1"></a> `encryption?` | `boolean` | Whether to encrypt data in transit. | services/site-sync-outgoing/types.ts:194 |
| <a id="property-compression-1"></a> `compression?` | `boolean` | Whether to use compression. | services/site-sync-outgoing/types.ts:197 |
| <a id="property-netinteg-1"></a> `netinteg?` | `boolean` | Whether to checksum network traffic. | services/site-sync-outgoing/types.ts:200 |
| <a id="property-queue_retry_count-1"></a> `queue_retry_count?` | `number` | Queue retry count (0-100). | services/site-sync-outgoing/types.ts:203 |
| <a id="property-queue_retry_interval_seconds-1"></a> `queue_retry_interval_seconds?` | `number` | Queue retry interval in seconds (1-300). | services/site-sync-outgoing/types.ts:206 |
| <a id="property-queue_retry_interval_multiplier-1"></a> `queue_retry_interval_multiplier?` | `boolean` | Whether to multiply retry interval on each attempt. | services/site-sync-outgoing/types.ts:209 |
| <a id="property-remote_site_id-1"></a> `remote_site_id?` | `string` | Remote site ID. | services/site-sync-outgoing/types.ts:212 |
| <a id="property-note-6"></a> `note?` | `string` | User-defined note. | services/site-sync-outgoing/types.ts:215 |

***

### SiteSyncOutgoingUpdateParams

Defined in: services/site-sync-outgoing/types.ts:225

Parameters for updating an existing outgoing site sync.

All fields are optional — only provided fields are changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-69"></a> `name?` | `string` | Sync name. | services/site-sync-outgoing/types.ts:227 |
| <a id="property-description-75"></a> `description?` | `string` | Human-readable description. | services/site-sync-outgoing/types.ts:230 |
| <a id="property-enabled-46"></a> `enabled?` | `boolean` | Whether the sync is enabled. | services/site-sync-outgoing/types.ts:233 |
| <a id="property-url-6"></a> `url?` | `string` | Remote URL for the sync destination. | services/site-sync-outgoing/types.ts:236 |
| <a id="property-registration_code-3"></a> `registration_code?` | `string` | Registration code for pairing with incoming sync. | services/site-sync-outgoing/types.ts:239 |
| <a id="property-user-10"></a> `user?` | `string` | Site user for authentication. | services/site-sync-outgoing/types.ts:242 |
| <a id="property-password-8"></a> `password?` | `string` | Password for authentication. | services/site-sync-outgoing/types.ts:245 |
| <a id="property-remote_vsan_host-2"></a> `remote_vsan_host?` | `string` | Remote vSAN host address. | services/site-sync-outgoing/types.ts:248 |
| <a id="property-remote_vsan_port-2"></a> `remote_vsan_port?` | `number` | Remote vSAN port. | services/site-sync-outgoing/types.ts:251 |
| <a id="property-destination_tier-2"></a> `destination_tier?` | [`SiteSyncOutgoingDestinationTier`](#sitesyncoutgoingdestinationtier) | Override destination storage tier. | services/site-sync-outgoing/types.ts:254 |
| <a id="property-threads-2"></a> `threads?` | `number` | Number of data threads (1-32). | services/site-sync-outgoing/types.ts:257 |
| <a id="property-file_threads-2"></a> `file_threads?` | `number` | Number of file threads (1-64). | services/site-sync-outgoing/types.ts:260 |
| <a id="property-sendthrottle-2"></a> `sendthrottle?` | `number` | Send throttle (bytes/sec, 0 = unlimited). | services/site-sync-outgoing/types.ts:263 |
| <a id="property-encryption-2"></a> `encryption?` | `boolean` | Whether to encrypt data in transit. | services/site-sync-outgoing/types.ts:266 |
| <a id="property-compression-2"></a> `compression?` | `boolean` | Whether to use compression. | services/site-sync-outgoing/types.ts:269 |
| <a id="property-netinteg-2"></a> `netinteg?` | `boolean` | Whether to checksum network traffic. | services/site-sync-outgoing/types.ts:272 |
| <a id="property-queue_retry_count-2"></a> `queue_retry_count?` | `number` | Queue retry count (0-100). | services/site-sync-outgoing/types.ts:275 |
| <a id="property-queue_retry_interval_seconds-2"></a> `queue_retry_interval_seconds?` | `number` | Queue retry interval in seconds (1-300). | services/site-sync-outgoing/types.ts:278 |
| <a id="property-queue_retry_interval_multiplier-2"></a> `queue_retry_interval_multiplier?` | `boolean` | Whether to multiply retry interval on each attempt. | services/site-sync-outgoing/types.ts:281 |
| <a id="property-sync_back-2"></a> `sync_back?` | [`FlexKey`](#flexkey) | Foreign key to the sync-back incoming sync. | services/site-sync-outgoing/types.ts:284 |
| <a id="property-remote_site_id-2"></a> `remote_site_id?` | `string` | Remote site ID. | services/site-sync-outgoing/types.ts:287 |
| <a id="property-note-7"></a> `note?` | `string` | User-defined note. | services/site-sync-outgoing/types.ts:290 |

***

### SiteSyncProfilePeriod

Defined in: services/site-sync-profile-period/types.ts:14

A VergeOS site sync profile period resource.

Profile periods link an outgoing site sync to a snapshot profile period,
configuring remote retention, priority, and destination naming for
replicated snapshots.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-site_syncs_outgoing"></a> `site_syncs_outgoing?` | [`FlexKey`](#flexkey) | Foreign key to the parent outgoing sync. | - | services/site-sync-profile-period/types.ts:16 |
| <a id="property-profile_period"></a> `profile_period?` | [`FlexKey`](#flexkey) | Foreign key to the snapshot profile period. | - | services/site-sync-profile-period/types.ts:19 |
| <a id="property-schedule_task-1"></a> `schedule_task?` | [`FlexKey`](#flexkey) | Foreign key to the schedule task. Read-only. | - | services/site-sync-profile-period/types.ts:22 |
| <a id="property-task-1"></a> `task?` | [`FlexKey`](#flexkey) | Foreign key to the task. Read-only. | - | services/site-sync-profile-period/types.ts:25 |
| <a id="property-retention-1"></a> `retention?` | `number` | Remote retention in seconds. | - | services/site-sync-profile-period/types.ts:28 |
| <a id="property-priority"></a> `priority?` | `number` | Sync priority (0+). | - | services/site-sync-profile-period/types.ts:31 |
| <a id="property-do_not_expire"></a> `do_not_expire?` | `boolean` | Whether to prevent the snapshot from expiring. | - | services/site-sync-profile-period/types.ts:34 |
| <a id="property-destination_prefix"></a> `destination_prefix?` | `string` | Prefix added to the snapshot name on the destination. | - | services/site-sync-profile-period/types.ts:37 |
| <a id="property-key-54"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### SiteSyncProfilePeriodCreateParams

Defined in: services/site-sync-profile-period/types.ts:47

Parameters for creating a new site sync profile period.

`site_syncs_outgoing` and `retention` are required.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-site_syncs_outgoing-1"></a> `site_syncs_outgoing` | [`FlexKey`](#flexkey) | Foreign key to the parent outgoing sync. Required. | services/site-sync-profile-period/types.ts:49 |
| <a id="property-retention-2"></a> `retention` | `number` | Remote retention in seconds. Required. | services/site-sync-profile-period/types.ts:52 |
| <a id="property-priority-1"></a> `priority?` | `number` | Sync priority (0+). | services/site-sync-profile-period/types.ts:55 |
| <a id="property-do_not_expire-1"></a> `do_not_expire?` | `boolean` | Whether to prevent the snapshot from expiring. | services/site-sync-profile-period/types.ts:58 |
| <a id="property-destination_prefix-1"></a> `destination_prefix?` | `string` | Prefix added to the snapshot name on the destination. | services/site-sync-profile-period/types.ts:61 |

***

### SiteSyncProfilePeriodUpdateParams

Defined in: services/site-sync-profile-period/types.ts:71

Parameters for updating an existing site sync profile period.

All fields are optional — only provided fields are changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-retention-3"></a> `retention?` | `number` | Remote retention in seconds. | services/site-sync-profile-period/types.ts:73 |
| <a id="property-priority-2"></a> `priority?` | `number` | Sync priority (0+). | services/site-sync-profile-period/types.ts:76 |
| <a id="property-do_not_expire-2"></a> `do_not_expire?` | `boolean` | Whether to prevent the snapshot from expiring. | services/site-sync-profile-period/types.ts:79 |
| <a id="property-destination_prefix-2"></a> `destination_prefix?` | `string` | Prefix added to the snapshot name on the destination. | services/site-sync-profile-period/types.ts:82 |

***

### Site

Defined in: services/site/types.ts:28

A VergeOS remote site resource.

Sites are trusted peer VergeOS systems used for disaster recovery,
backup, and synchronization. Each site represents a connection to
a remote VergeOS instance.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-70"></a> `name?` | `string` | Site name. | - | services/site/types.ts:30 |
| <a id="property-id-9"></a> `id?` | `string` | 40-character SHA1 unique identifier. Read-only. | - | services/site/types.ts:33 |
| <a id="property-description-76"></a> `description?` | `string` | Human-readable description. | - | services/site/types.ts:36 |
| <a id="property-enabled-47"></a> `enabled?` | `boolean` | Whether the site is enabled. | - | services/site/types.ts:39 |
| <a id="property-domain-7"></a> `domain?` | `string` | Domain name for the remote site. | - | services/site/types.ts:42 |
| <a id="property-city"></a> `city?` | `string` | City location. | - | services/site/types.ts:45 |
| <a id="property-country"></a> `country?` | `string` | 2-letter country code (e.g., "US"). | - | services/site/types.ts:48 |
| <a id="property-latitude"></a> `latitude?` | `number` | Geographic latitude. | - | services/site/types.ts:51 |
| <a id="property-longitude"></a> `longitude?` | `number` | Geographic longitude. | - | services/site/types.ts:54 |
| <a id="property-timezone"></a> `timezone?` | `string` | Timezone identifier (e.g., "America/New_York"). | - | services/site/types.ts:57 |
| <a id="property-url-7"></a> `url?` | `string` | Remote site URL. Required for creation. | - | services/site/types.ts:60 |
| <a id="property-allow_insecure-3"></a> `allow_insecure?` | `boolean` | Whether to allow insecure SSL connections. | - | services/site/types.ts:63 |
| <a id="property-status-14"></a> `status?` | [`SiteConnectionStatus`](#siteconnectionstatus) | Current connection status. Read-only. | - | services/site/types.ts:66 |
| <a id="property-status_info-7"></a> `status_info?` | `string` | Additional status information. Read-only. | - | services/site/types.ts:69 |
| <a id="property-authentication_status"></a> `authentication_status?` | [`SiteAuthenticationStatus`](#siteauthenticationstatus) | Authentication status with the remote site. Read-only. | - | services/site/types.ts:72 |
| <a id="property-vsan_host-3"></a> `vsan_host?` | `string` | vSAN connection host. | - | services/site/types.ts:75 |
| <a id="property-vsan_port-3"></a> `vsan_port?` | `number` | vSAN connection port (default 14201). | - | services/site/types.ts:78 |
| <a id="property-is_tenant"></a> `is_tenant?` | `boolean` | Whether this site is a tenant. Read-only. | - | services/site/types.ts:81 |
| <a id="property-config_cloud_snapshots"></a> `config_cloud_snapshots?` | [`SiteConfigMode`](#siteconfigmode) | Cloud snapshot sync configuration. | - | services/site/types.ts:84 |
| <a id="property-config_statistics"></a> `config_statistics?` | [`SiteConfigMode`](#siteconfigmode) | Statistics sync configuration. | - | services/site/types.ts:87 |
| <a id="property-config_management"></a> `config_management?` | [`SiteManagementMode`](#sitemanagementmode) | Management configuration. | - | services/site/types.ts:90 |
| <a id="property-config_repair_server"></a> `config_repair_server?` | [`SiteConfigMode`](#siteconfigmode) | Repair server configuration. | - | services/site/types.ts:93 |
| <a id="property-incoming_syncs_enabled"></a> `incoming_syncs_enabled?` | `boolean` | Whether incoming syncs are enabled. Read-only. | - | services/site/types.ts:96 |
| <a id="property-outgoing_syncs_enabled"></a> `outgoing_syncs_enabled?` | `boolean` | Whether outgoing syncs are enabled. Read-only. | - | services/site/types.ts:99 |
| <a id="property-repairs_outgoing_enabled"></a> `repairs_outgoing_enabled?` | `boolean` | Whether outgoing repairs are enabled. Read-only. | - | services/site/types.ts:102 |
| <a id="property-incoming_stats_enabled"></a> `incoming_stats_enabled?` | `boolean` | Whether incoming statistics are enabled. Read-only. | - | services/site/types.ts:105 |
| <a id="property-outgoing_stats_enabled"></a> `outgoing_stats_enabled?` | `boolean` | Whether outgoing statistics are enabled. Read-only. | - | services/site/types.ts:108 |
| <a id="property-outgoing_management_enabled"></a> `outgoing_management_enabled?` | `boolean` | Whether outgoing management is enabled. Read-only. | - | services/site/types.ts:111 |
| <a id="property-incoming_management_enabled"></a> `incoming_management_enabled?` | `boolean` | Whether incoming management is enabled. Read-only. | - | services/site/types.ts:114 |
| <a id="property-statistics_interval"></a> `statistics_interval?` | `number` | Statistics collection interval in seconds (default 600, min 300). | - | services/site/types.ts:117 |
| <a id="property-statistics_retention"></a> `statistics_retention?` | `number` | Statistics retention in seconds (default 3888000 = 45 days). | - | services/site/types.ts:120 |
| <a id="property-request_url-3"></a> `request_url?` | `string` | URL the remote system uses to connect back. | - | services/site/types.ts:123 |
| <a id="property-remote_user"></a> `remote_user?` | `string` | Remote user for authentication. Read-only. | - | services/site/types.ts:126 |
| <a id="property-remote_token"></a> `remote_token?` | `string` | Remote authentication token. | - | services/site/types.ts:129 |
| <a id="property-user-11"></a> `user?` | [`FlexKey`](#flexkey) | User FK (to `users`). Locked. | - | services/site/types.ts:132 |
| <a id="property-site_data"></a> `site_data?` | [`FlexKey`](#flexkey) | Site data FK (to `site_data`). Read-only. | - | services/site/types.ts:135 |
| <a id="property-last_log_timestamp"></a> `last_log_timestamp?` | `number` | Last log timestamp (Unix epoch microseconds). | - | services/site/types.ts:138 |
| <a id="property-logo_url"></a> `logo_url?` | `string` | Logo URL (144x36). | - | services/site/types.ts:141 |
| <a id="property-header_bg"></a> `header_bg?` | `string` | Logo background color. | - | services/site/types.ts:144 |
| <a id="property-map_color"></a> `map_color?` | `string` | Map pin color. | - | services/site/types.ts:147 |
| <a id="property-last_stat_update"></a> `last_stat_update?` | `number` | Last statistics update timestamp (epoch seconds). Read-only. | - | services/site/types.ts:150 |
| <a id="property-modified-15"></a> `modified?` | `number` | Last modification timestamp (epoch seconds). Read-only. | - | services/site/types.ts:153 |
| <a id="property-created-12"></a> `created?` | `number` | Creation timestamp (epoch seconds). Read-only. | - | services/site/types.ts:156 |
| <a id="property-creator-6"></a> `creator?` | `string` | Creator username. Read-only. | - | services/site/types.ts:159 |
| <a id="property-key-55"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### SiteCreateParams

Defined in: services/site/types.ts:171

Parameters for creating a new remote site.

Only `url` is strictly required. `auth_user` and `auth_password` are
one-time credentials used during site creation for initial authentication
— they are not stored.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-url-8"></a> `url` | `string` | Remote site URL. Required. | services/site/types.ts:173 |
| <a id="property-name-71"></a> `name?` | `string` | Site name. | services/site/types.ts:176 |
| <a id="property-description-77"></a> `description?` | `string` | Human-readable description. | services/site/types.ts:179 |
| <a id="property-enabled-48"></a> `enabled?` | `boolean` | Whether the site is enabled. | services/site/types.ts:182 |
| <a id="property-domain-8"></a> `domain?` | `string` | Domain name for the remote site. | services/site/types.ts:185 |
| <a id="property-city-1"></a> `city?` | `string` | City location. | services/site/types.ts:188 |
| <a id="property-country-1"></a> `country?` | `string` | 2-letter country code. | services/site/types.ts:191 |
| <a id="property-latitude-1"></a> `latitude?` | `number` | Geographic latitude. | services/site/types.ts:194 |
| <a id="property-longitude-1"></a> `longitude?` | `number` | Geographic longitude. | services/site/types.ts:197 |
| <a id="property-timezone-1"></a> `timezone?` | `string` | Timezone identifier. | services/site/types.ts:200 |
| <a id="property-allow_insecure-4"></a> `allow_insecure?` | `boolean` | Whether to allow insecure SSL connections. | services/site/types.ts:203 |
| <a id="property-auth_user"></a> `auth_user?` | `string` | Username for initial site authentication (not stored). | services/site/types.ts:206 |
| <a id="property-auth_password"></a> `auth_password?` | `string` | Password for initial site authentication (not stored). | services/site/types.ts:209 |
| <a id="property-config_cloud_snapshots-1"></a> `config_cloud_snapshots?` | [`SiteConfigMode`](#siteconfigmode) | Cloud snapshot sync configuration. | services/site/types.ts:212 |
| <a id="property-config_statistics-1"></a> `config_statistics?` | [`SiteConfigMode`](#siteconfigmode) | Statistics sync configuration. | services/site/types.ts:215 |
| <a id="property-config_management-1"></a> `config_management?` | [`SiteManagementMode`](#sitemanagementmode) | Management configuration. | services/site/types.ts:218 |
| <a id="property-config_repair_server-1"></a> `config_repair_server?` | [`SiteConfigMode`](#siteconfigmode) | Repair server configuration. | services/site/types.ts:221 |
| <a id="property-statistics_interval-1"></a> `statistics_interval?` | `number` | Statistics collection interval in seconds. | services/site/types.ts:224 |
| <a id="property-statistics_retention-1"></a> `statistics_retention?` | `number` | Statistics retention in seconds. | services/site/types.ts:227 |
| <a id="property-request_url-4"></a> `request_url?` | `string` | URL the remote system uses to connect back. | services/site/types.ts:230 |
| <a id="property-automatically_create_syncs"></a> `automatically_create_syncs?` | `boolean` | Automatically create syncs when site is added. Default true. | services/site/types.ts:233 |

***

### SiteUpdateParams

Defined in: services/site/types.ts:243

Parameters for updating an existing remote site.

All fields are optional — only provided fields are changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-72"></a> `name?` | `string` | Site name. | services/site/types.ts:245 |
| <a id="property-description-78"></a> `description?` | `string` | Human-readable description. | services/site/types.ts:248 |
| <a id="property-enabled-49"></a> `enabled?` | `boolean` | Whether the site is enabled. | services/site/types.ts:251 |
| <a id="property-domain-9"></a> `domain?` | `string` | Domain name for the remote site. | services/site/types.ts:254 |
| <a id="property-city-2"></a> `city?` | `string` | City location. | services/site/types.ts:257 |
| <a id="property-country-2"></a> `country?` | `string` | 2-letter country code. | services/site/types.ts:260 |
| <a id="property-latitude-2"></a> `latitude?` | `number` | Geographic latitude. | services/site/types.ts:263 |
| <a id="property-longitude-2"></a> `longitude?` | `number` | Geographic longitude. | services/site/types.ts:266 |
| <a id="property-timezone-2"></a> `timezone?` | `string` | Timezone identifier. | services/site/types.ts:269 |
| <a id="property-url-9"></a> `url?` | `string` | Remote site URL. | services/site/types.ts:272 |
| <a id="property-allow_insecure-5"></a> `allow_insecure?` | `boolean` | Whether to allow insecure SSL connections. | services/site/types.ts:275 |
| <a id="property-config_cloud_snapshots-2"></a> `config_cloud_snapshots?` | [`SiteConfigMode`](#siteconfigmode) | Cloud snapshot sync configuration. | services/site/types.ts:278 |
| <a id="property-config_statistics-2"></a> `config_statistics?` | [`SiteConfigMode`](#siteconfigmode) | Statistics sync configuration. | services/site/types.ts:281 |
| <a id="property-config_management-2"></a> `config_management?` | [`SiteManagementMode`](#sitemanagementmode) | Management configuration. | services/site/types.ts:284 |
| <a id="property-config_repair_server-2"></a> `config_repair_server?` | [`SiteConfigMode`](#siteconfigmode) | Repair server configuration. | services/site/types.ts:287 |
| <a id="property-statistics_interval-2"></a> `statistics_interval?` | `number` | Statistics collection interval in seconds. | services/site/types.ts:290 |
| <a id="property-statistics_retention-2"></a> `statistics_retention?` | `number` | Statistics retention in seconds. | services/site/types.ts:293 |
| <a id="property-request_url-5"></a> `request_url?` | `string` | URL the remote system uses to connect back. | services/site/types.ts:296 |
| <a id="property-remote_user-1"></a> `remote_user?` | `string` | Remote user for authentication. | services/site/types.ts:299 |
| <a id="property-remote_password"></a> `remote_password?` | `string` | Remote password for authentication. | services/site/types.ts:302 |
| <a id="property-logo_url-1"></a> `logo_url?` | `string` | Logo URL (144x36). | services/site/types.ts:305 |
| <a id="property-header_bg-1"></a> `header_bg?` | `string` | Logo background color. | services/site/types.ts:308 |
| <a id="property-map_color-1"></a> `map_color?` | `string` | Map pin color. | services/site/types.ts:311 |
| <a id="property-force_refresh"></a> `force_refresh?` | `boolean` | Force a refresh of site data. | services/site/types.ts:314 |

***

### SnapshotProfilePeriod

Defined in: services/snapshot-profile-period/types.ts:42

A VergeOS snapshot profile period resource.

Periods define the schedule (frequency, retention count, time window) within
a snapshot profile. A profile can have multiple periods (e.g., hourly with 24
retained + daily with 7 retained). The `profile` FK links to the parent
[SnapshotProfile](#snapshotprofile).

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-profile"></a> `profile` | [`FlexKey`](#flexkey) | Parent snapshot profile reference (FK to `snapshot_profiles`). | - | services/snapshot-profile-period/types.ts:44 |
| <a id="property-name-73"></a> `name` | `string` | Period display name. | - | services/snapshot-profile-period/types.ts:47 |
| <a id="property-frequency"></a> `frequency?` | [`PeriodFrequency`](#periodfrequency) | Schedule frequency. | - | services/snapshot-profile-period/types.ts:50 |
| <a id="property-minute"></a> `minute?` | `number` | Minute of the hour (0-59). | - | services/snapshot-profile-period/types.ts:53 |
| <a id="property-hour"></a> `hour?` | `number` | Hour of the day (0-23). | - | services/snapshot-profile-period/types.ts:56 |
| <a id="property-day_of_week"></a> `day_of_week?` | [`PeriodDayOfWeek`](#perioddayofweek) | Day of week. Default: `"any"`. | - | services/snapshot-profile-period/types.ts:59 |
| <a id="property-day_of_month"></a> `day_of_month?` | `number` | Day of month (0-31, 0 = any). | - | services/snapshot-profile-period/types.ts:62 |
| <a id="property-month"></a> `month?` | `number` | Month (0-12, 0 = any). | - | services/snapshot-profile-period/types.ts:65 |
| <a id="property-retention-4"></a> `retention` | `number` | Retention period in seconds. | - | services/snapshot-profile-period/types.ts:68 |
| <a id="property-skip_missed"></a> `skip_missed?` | `boolean` | Skip if the scheduled time was missed. Default: `false`. | - | services/snapshot-profile-period/types.ts:71 |
| <a id="property-max_tier-3"></a> `max_tier?` | [`PeriodMaxTier`](#periodmaxtier) | Maximum storage tier for snapshot storage. Default: `"1"`. | - | services/snapshot-profile-period/types.ts:74 |
| <a id="property-quiesce-3"></a> `quiesce?` | `boolean` | Whether to quiesce before snapshotting. Default: `false`. | - | services/snapshot-profile-period/types.ts:77 |
| <a id="property-min_snapshots-4"></a> `min_snapshots?` | `number` | Minimum number of snapshots to retain. Default: `1`. | - | services/snapshot-profile-period/types.ts:80 |
| <a id="property-immutable-3"></a> `immutable?` | `boolean` | Whether snapshots are immutable. | - | services/snapshot-profile-period/types.ts:83 |
| <a id="property-estimated_snapshot_count"></a> `estimated_snapshot_count?` | `number` | Estimated number of snapshots. Read-only. | - | services/snapshot-profile-period/types.ts:86 |
| <a id="property-key-56"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### SnapshotProfilePeriodCreateParams

Defined in: services/snapshot-profile-period/types.ts:97

Parameters for creating a new snapshot profile period.

`profile`, `name`, and `retention` are required. Read-only fields
(`estimated_snapshot_count`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-profile-1"></a> `profile` | [`FlexKey`](#flexkey) | Parent snapshot profile reference (FK to `snapshot_profiles`). Required. | services/snapshot-profile-period/types.ts:99 |
| <a id="property-name-74"></a> `name` | `string` | Period display name. Required. | services/snapshot-profile-period/types.ts:102 |
| <a id="property-frequency-1"></a> `frequency?` | [`PeriodFrequency`](#periodfrequency) | Schedule frequency. | services/snapshot-profile-period/types.ts:105 |
| <a id="property-minute-1"></a> `minute?` | `number` | Minute of the hour (0-59). | services/snapshot-profile-period/types.ts:108 |
| <a id="property-hour-1"></a> `hour?` | `number` | Hour of the day (0-23). | services/snapshot-profile-period/types.ts:111 |
| <a id="property-day_of_week-1"></a> `day_of_week?` | [`PeriodDayOfWeek`](#perioddayofweek) | Day of week. Default: `"any"`. | services/snapshot-profile-period/types.ts:114 |
| <a id="property-day_of_month-1"></a> `day_of_month?` | `number` | Day of month (0-31, 0 = any). | services/snapshot-profile-period/types.ts:117 |
| <a id="property-month-1"></a> `month?` | `number` | Month (0-12, 0 = any). | services/snapshot-profile-period/types.ts:120 |
| <a id="property-retention-5"></a> `retention` | `number` | Retention period in seconds. Required. | services/snapshot-profile-period/types.ts:123 |
| <a id="property-skip_missed-1"></a> `skip_missed?` | `boolean` | Skip if the scheduled time was missed. Default: `false`. | services/snapshot-profile-period/types.ts:126 |
| <a id="property-max_tier-4"></a> `max_tier?` | [`PeriodMaxTier`](#periodmaxtier) | Maximum storage tier for snapshot storage. Default: `"1"`. | services/snapshot-profile-period/types.ts:129 |
| <a id="property-quiesce-4"></a> `quiesce?` | `boolean` | Whether to quiesce before snapshotting. Default: `false`. | services/snapshot-profile-period/types.ts:132 |
| <a id="property-min_snapshots-5"></a> `min_snapshots?` | `number` | Minimum number of snapshots to retain. Default: `1`. | services/snapshot-profile-period/types.ts:135 |
| <a id="property-immutable-4"></a> `immutable?` | `boolean` | Whether snapshots are immutable. | services/snapshot-profile-period/types.ts:138 |

***

### SnapshotProfilePeriodUpdateParams

Defined in: services/snapshot-profile-period/types.ts:150

Parameters for updating an existing snapshot profile period.

All fields are optional — only provided fields are changed.
Read-only fields (`estimated_snapshot_count`) are excluded.
Note: `profile` is excluded because it is set at creation and cannot be changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-75"></a> `name?` | `string` | Period display name. | services/snapshot-profile-period/types.ts:152 |
| <a id="property-frequency-2"></a> `frequency?` | [`PeriodFrequency`](#periodfrequency) | Schedule frequency. | services/snapshot-profile-period/types.ts:155 |
| <a id="property-minute-2"></a> `minute?` | `number` | Minute of the hour (0-59). | services/snapshot-profile-period/types.ts:158 |
| <a id="property-hour-2"></a> `hour?` | `number` | Hour of the day (0-23). | services/snapshot-profile-period/types.ts:161 |
| <a id="property-day_of_week-2"></a> `day_of_week?` | [`PeriodDayOfWeek`](#perioddayofweek) | Day of week. | services/snapshot-profile-period/types.ts:164 |
| <a id="property-day_of_month-2"></a> `day_of_month?` | `number` | Day of month (0-31, 0 = any). | services/snapshot-profile-period/types.ts:167 |
| <a id="property-month-2"></a> `month?` | `number` | Month (0-12, 0 = any). | services/snapshot-profile-period/types.ts:170 |
| <a id="property-retention-6"></a> `retention?` | `number` | Retention period in seconds. | services/snapshot-profile-period/types.ts:173 |
| <a id="property-skip_missed-2"></a> `skip_missed?` | `boolean` | Skip if the scheduled time was missed. | services/snapshot-profile-period/types.ts:176 |
| <a id="property-max_tier-5"></a> `max_tier?` | [`PeriodMaxTier`](#periodmaxtier) | Maximum storage tier for snapshot storage. | services/snapshot-profile-period/types.ts:179 |
| <a id="property-quiesce-5"></a> `quiesce?` | `boolean` | Whether to quiesce before snapshotting. | services/snapshot-profile-period/types.ts:182 |
| <a id="property-min_snapshots-6"></a> `min_snapshots?` | `number` | Minimum number of snapshots to retain. | services/snapshot-profile-period/types.ts:185 |
| <a id="property-immutable-5"></a> `immutable?` | `boolean` | Whether snapshots are immutable. | services/snapshot-profile-period/types.ts:188 |

***

### SnapshotProfile

Defined in: services/snapshot-profile/types.ts:14

A VergeOS snapshot profile resource.

Snapshot profiles define automated backup schedules with retention policies.
Each profile can have multiple [SnapshotProfilePeriod](#snapshotprofileperiod) entries that
control the frequency and retention of snapshots.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-76"></a> `name` | `string` | Profile display name. Min 1, max 128 characters. Unique. | - | services/snapshot-profile/types.ts:16 |
| <a id="property-description-79"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/snapshot-profile/types.ts:19 |
| <a id="property-ignore_warnings"></a> `ignore_warnings?` | `boolean` | Ignore warnings about snapshot count estimates for this profile. Default: `false`. | - | services/snapshot-profile/types.ts:22 |
| <a id="property-key-57"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### SnapshotProfileCreateParams

Defined in: services/snapshot-profile/types.ts:32

Parameters for creating a new snapshot profile.

`name` is required.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-77"></a> `name` | `string` | Profile display name. Min 1, max 128 characters. Must be unique. | services/snapshot-profile/types.ts:34 |
| <a id="property-description-80"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/snapshot-profile/types.ts:37 |
| <a id="property-ignore_warnings-1"></a> `ignore_warnings?` | `boolean` | Ignore warnings about snapshot count estimates for this profile. Default: `false`. | services/snapshot-profile/types.ts:40 |

***

### SnapshotProfileUpdateParams

Defined in: services/snapshot-profile/types.ts:50

Parameters for updating an existing snapshot profile.

All fields are optional — only provided fields are changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-78"></a> `name?` | `string` | Profile display name. Min 1, max 128 characters. Must be unique. | services/snapshot-profile/types.ts:52 |
| <a id="property-description-81"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/snapshot-profile/types.ts:55 |
| <a id="property-ignore_warnings-2"></a> `ignore_warnings?` | `boolean` | Ignore warnings about snapshot count estimates for this profile. | services/snapshot-profile/types.ts:58 |

***

### StorageTierStats

Defined in: services/storage-tier-stats/types.ts:14

A VergeOS storage tier stats resource.

Provides I/O metrics for a system-wide storage tier. Each storage tier
has one stats row that is continuously updated by the system. This is
a read-only monitoring resource.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-tier-3"></a> `tier` | [`FlexKey`](#flexkey) | Parent storage tier reference (FK to `storage_tiers`). | - | services/storage-tier-stats/types.ts:16 |
| <a id="property-rops-2"></a> `rops?` | `number` | Read operations per second. | - | services/storage-tier-stats/types.ts:19 |
| <a id="property-wops-2"></a> `wops?` | `number` | Write operations per second. | - | services/storage-tier-stats/types.ts:22 |
| <a id="property-rbps-2"></a> `rbps?` | `number` | Read bytes per second. | - | services/storage-tier-stats/types.ts:25 |
| <a id="property-wbps-2"></a> `wbps?` | `number` | Write bytes per second. | - | services/storage-tier-stats/types.ts:28 |
| <a id="property-reads-2"></a> `reads?` | `number` | Total read operations. | - | services/storage-tier-stats/types.ts:31 |
| <a id="property-writes-2"></a> `writes?` | `number` | Total write operations. | - | services/storage-tier-stats/types.ts:34 |
| <a id="property-read_bytes-2"></a> `read_bytes?` | `number` | Total bytes read. | - | services/storage-tier-stats/types.ts:37 |
| <a id="property-write_bytes-2"></a> `write_bytes?` | `number` | Total bytes written. | - | services/storage-tier-stats/types.ts:40 |
| <a id="property-last_update-4"></a> `last_update?` | `number` | Last update timestamp (Unix epoch). Read-only. | - | services/storage-tier-stats/types.ts:43 |
| <a id="property-key-58"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### StorageTier

Defined in: services/storage-tier/types.ts:14

A VergeOS storage tier resource.

Storage tiers are system-wide aggregates of vSAN capacity across all clusters.
Up to 6 tiers (0-5) may exist, representing different storage performance levels.
This is a read-only monitoring resource.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-tier-4"></a> `tier?` | `number` | Tier number (0-5). | - | services/storage-tier/types.ts:16 |
| <a id="property-description-82"></a> `description?` | `string` | Human-readable tier description. | - | services/storage-tier/types.ts:19 |
| <a id="property-capacity-1"></a> `capacity?` | `number` | Total capacity in bytes. | - | services/storage-tier/types.ts:22 |
| <a id="property-used-1"></a> `used?` | `number` | Used capacity in bytes. | - | services/storage-tier/types.ts:25 |
| <a id="property-allocated"></a> `allocated?` | `number` | Allocated capacity in bytes. | - | services/storage-tier/types.ts:28 |
| <a id="property-used_pct-2"></a> `used_pct?` | `number` | Used percentage (0-100). Read-only. | - | services/storage-tier/types.ts:31 |
| <a id="property-used_inflated"></a> `used_inflated?` | `number` | Used capacity before deduplication in bytes. | - | services/storage-tier/types.ts:34 |
| <a id="property-dedupe_ratio"></a> `dedupe_ratio?` | `number` | Deduplication ratio. | - | services/storage-tier/types.ts:37 |
| <a id="property-modified-16"></a> `modified?` | `number` | Last modified timestamp (Unix epoch). Read-only. | - | services/storage-tier/types.ts:40 |
| <a id="property-stats-2"></a> `stats?` | [`FlexKey`](#flexkey) | Tier stats FK (to `storage_tier_stats`). Read-only. | - | services/storage-tier/types.ts:43 |
| <a id="property-key-59"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### System

Defined in: services/system/types.ts:8

VergeOS system information from the `/api/v4/system` endpoint.

This is a singleton resource (max 1 row) representing the current VergeOS system.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-key-60"></a> `key?` | `string` | Unique system key (always `'self'`). | - | services/system/types.ts:10 |
| <a id="property-id-10"></a> `id?` | `string` | 40-character unique system ID. | - | services/system/types.ts:12 |
| <a id="property-cloud_name"></a> `cloud_name?` | `string` | Display name of this VergeOS cloud. | - | services/system/types.ts:14 |
| <a id="property-yb_version-1"></a> `yb_version?` | `string` | VergeOS application version (e.g., `"6.1.2"`). | - | services/system/types.ts:16 |
| <a id="property-os_version-1"></a> `os_version?` | `string` | Underlying OS version. | - | services/system/types.ts:18 |
| <a id="property-branch"></a> `branch?` | `string` | Release branch (e.g., `"stable"`, `"beta"`). | - | services/system/types.ts:20 |
| <a id="property-is_tenant-1"></a> `is_tenant?` | `boolean` | Whether this system is running as a tenant. Read-only. | - | services/system/types.ts:22 |
| <a id="property-description-83"></a> `description?` | `string` | System description. | - | services/system/types.ts:24 |
| <a id="property-domain-10"></a> `domain?` | `string` | Configured domain name. | - | services/system/types.ts:26 |
| <a id="property-city-3"></a> `city?` | `string` | City location. | - | services/system/types.ts:28 |
| <a id="property-country-3"></a> `country?` | `string` | ISO 3166-1 alpha-2 country code (e.g., `"US"`). | - | services/system/types.ts:30 |
| <a id="property-timezone-3"></a> `timezone?` | `string` | IANA timezone identifier (e.g., `"America/New_York"`). | - | services/system/types.ts:32 |
| <a id="property-url-10"></a> `url?` | `string` | System URL. | - | services/system/types.ts:34 |
| <a id="property-latitude-3"></a> `latitude?` | `number` | Geographic latitude (-90 to 90). | - | services/system/types.ts:36 |
| <a id="property-longitude-3"></a> `longitude?` | `number` | Geographic longitude (-180 to 180). | - | services/system/types.ts:38 |
| <a id="property-vsan_host-4"></a> `vsan_host?` | `string` | vSAN host address. | - | services/system/types.ts:40 |
| <a id="property-vsan_port-4"></a> `vsan_port?` | `number` | vSAN port (0–65535, default 14201). | - | services/system/types.ts:42 |
| <a id="property-map_color-2"></a> `map_color?` | `string` | Map pin color for multi-site dashboards. | - | services/system/types.ts:44 |
| <a id="property-ui_branding"></a> `ui_branding?` | [`FlexKey`](#flexkey) | UI branding FK. Read-only. | - | services/system/types.ts:46 |
| <a id="property-theme"></a> `theme?` | [`FlexKey`](#flexkey) | Default system theme FK. | - | services/system/types.ts:48 |
| <a id="property-key-61"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### SystemUpdateParams

Defined in: services/system/types.ts:56

Fields that can be updated on the system record.

Excludes read-only fields: `key`, `id`, `is_tenant`, `ui_branding`, `licenses`.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-cloud_name-1"></a> `cloud_name?` | `string` | services/system/types.ts:57 |
| <a id="property-yb_version-2"></a> `yb_version?` | `string` | services/system/types.ts:58 |
| <a id="property-os_version-2"></a> `os_version?` | `string` | services/system/types.ts:59 |
| <a id="property-branch-1"></a> `branch?` | `string` | services/system/types.ts:60 |
| <a id="property-description-84"></a> `description?` | `string` | services/system/types.ts:61 |
| <a id="property-domain-11"></a> `domain?` | `string` | services/system/types.ts:62 |
| <a id="property-city-4"></a> `city?` | `string` | services/system/types.ts:63 |
| <a id="property-country-4"></a> `country?` | `string` | services/system/types.ts:64 |
| <a id="property-timezone-4"></a> `timezone?` | `string` | services/system/types.ts:65 |
| <a id="property-url-11"></a> `url?` | `string` | services/system/types.ts:66 |
| <a id="property-latitude-4"></a> `latitude?` | `number` | services/system/types.ts:67 |
| <a id="property-longitude-4"></a> `longitude?` | `number` | services/system/types.ts:68 |
| <a id="property-vsan_host-5"></a> `vsan_host?` | `string` | services/system/types.ts:69 |
| <a id="property-vsan_port-5"></a> `vsan_port?` | `number` | services/system/types.ts:70 |
| <a id="property-map_color-3"></a> `map_color?` | `string` | services/system/types.ts:71 |
| <a id="property-theme-1"></a> `theme?` | [`FlexKey`](#flexkey) | services/system/types.ts:72 |

***

### VersionInfo

Defined in: services/system/types.ts:81

Lightweight version information from `/version.json`.

This endpoint lives outside the API path and does not require authentication
on some configurations.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-79"></a> `name` | `string` | Product name (e.g., `"VergeOS"`). | services/system/types.ts:83 |
| <a id="property-version"></a> `version` | `string` | Version string (e.g., `"6.1.2"`). | services/system/types.ts:85 |
| <a id="property-hash"></a> `hash` | `string` | Build hash. | services/system/types.ts:87 |

***

### TagCategory

Defined in: services/tag-category/types.ts:14

A VergeOS tag category resource.

Tag categories group related tags (e.g., "Environment" → "production", "staging").
Each category has `taggable_*` boolean fields that control which resource types
can be tagged with tags in this category.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-80"></a> `name` | `string` | Category display name. Unique, trimmed. | - | services/tag-category/types.ts:16 |
| <a id="property-description-85"></a> `description?` | `string` | Human-readable description. | - | services/tag-category/types.ts:19 |
| <a id="property-single_tag_selection"></a> `single_tag_selection?` | `boolean` | When true, only one tag from this category can be applied to a resource. | - | services/tag-category/types.ts:22 |
| <a id="property-created-13"></a> `created?` | `number` | Timestamp when this category was created (read-only). | - | services/tag-category/types.ts:25 |
| <a id="property-modified-17"></a> `modified?` | `number` | Timestamp when this category was last modified (read-only). | - | services/tag-category/types.ts:28 |
| <a id="property-taggable_vms"></a> `taggable_vms?` | `boolean` | Whether VMs can be tagged with tags in this category. | - | services/tag-category/types.ts:31 |
| <a id="property-taggable_vnets"></a> `taggable_vnets?` | `boolean` | Whether networks can be tagged with tags in this category. | - | services/tag-category/types.ts:34 |
| <a id="property-taggable_volumes"></a> `taggable_volumes?` | `boolean` | Whether volumes can be tagged with tags in this category. | - | services/tag-category/types.ts:37 |
| <a id="property-taggable_vnet_rules"></a> `taggable_vnet_rules?` | `boolean` | Whether network rules can be tagged with tags in this category. | - | services/tag-category/types.ts:40 |
| <a id="property-taggable_vmware_containers"></a> `taggable_vmware_containers?` | `boolean` | Whether VMware containers can be tagged with tags in this category. | - | services/tag-category/types.ts:43 |
| <a id="property-taggable_users"></a> `taggable_users?` | `boolean` | Whether users can be tagged with tags in this category. | - | services/tag-category/types.ts:46 |
| <a id="property-taggable_tenant_nodes"></a> `taggable_tenant_nodes?` | `boolean` | Whether tenant nodes can be tagged with tags in this category. | - | services/tag-category/types.ts:49 |
| <a id="property-taggable_sites"></a> `taggable_sites?` | `boolean` | Whether sites can be tagged with tags in this category. | - | services/tag-category/types.ts:52 |
| <a id="property-taggable_nodes"></a> `taggable_nodes?` | `boolean` | Whether nodes can be tagged with tags in this category. | - | services/tag-category/types.ts:55 |
| <a id="property-taggable_groups"></a> `taggable_groups?` | `boolean` | Whether groups can be tagged with tags in this category. | - | services/tag-category/types.ts:58 |
| <a id="property-taggable_clusters"></a> `taggable_clusters?` | `boolean` | Whether clusters can be tagged with tags in this category. | - | services/tag-category/types.ts:61 |
| <a id="property-taggable_tenants"></a> `taggable_tenants?` | `boolean` | Whether tenants can be tagged with tags in this category. | - | services/tag-category/types.ts:64 |
| <a id="property-key-62"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TagCategoryCreateParams

Defined in: services/tag-category/types.ts:74

Parameters for creating a new tag category.

`name` is required and must be unique.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-81"></a> `name` | `string` | Category display name. Must be unique. | services/tag-category/types.ts:76 |
| <a id="property-description-86"></a> `description?` | `string` | Human-readable description. | services/tag-category/types.ts:79 |
| <a id="property-single_tag_selection-1"></a> `single_tag_selection?` | `boolean` | When true, only one tag from this category can be applied to a resource. | services/tag-category/types.ts:82 |
| <a id="property-taggable_vms-1"></a> `taggable_vms?` | `boolean` | Whether VMs can be tagged with tags in this category. | services/tag-category/types.ts:85 |
| <a id="property-taggable_vnets-1"></a> `taggable_vnets?` | `boolean` | Whether networks can be tagged with tags in this category. | services/tag-category/types.ts:88 |
| <a id="property-taggable_volumes-1"></a> `taggable_volumes?` | `boolean` | Whether volumes can be tagged with tags in this category. | services/tag-category/types.ts:91 |
| <a id="property-taggable_vnet_rules-1"></a> `taggable_vnet_rules?` | `boolean` | Whether network rules can be tagged with tags in this category. | services/tag-category/types.ts:94 |
| <a id="property-taggable_vmware_containers-1"></a> `taggable_vmware_containers?` | `boolean` | Whether VMware containers can be tagged with tags in this category. | services/tag-category/types.ts:97 |
| <a id="property-taggable_users-1"></a> `taggable_users?` | `boolean` | Whether users can be tagged with tags in this category. | services/tag-category/types.ts:100 |
| <a id="property-taggable_tenant_nodes-1"></a> `taggable_tenant_nodes?` | `boolean` | Whether tenant nodes can be tagged with tags in this category. | services/tag-category/types.ts:103 |
| <a id="property-taggable_sites-1"></a> `taggable_sites?` | `boolean` | Whether sites can be tagged with tags in this category. | services/tag-category/types.ts:106 |
| <a id="property-taggable_nodes-1"></a> `taggable_nodes?` | `boolean` | Whether nodes can be tagged with tags in this category. | services/tag-category/types.ts:109 |
| <a id="property-taggable_groups-1"></a> `taggable_groups?` | `boolean` | Whether groups can be tagged with tags in this category. | services/tag-category/types.ts:112 |
| <a id="property-taggable_clusters-1"></a> `taggable_clusters?` | `boolean` | Whether clusters can be tagged with tags in this category. | services/tag-category/types.ts:115 |
| <a id="property-taggable_tenants-1"></a> `taggable_tenants?` | `boolean` | Whether tenants can be tagged with tags in this category. | services/tag-category/types.ts:118 |

***

### TagCategoryUpdateParams

Defined in: services/tag-category/types.ts:128

Parameters for updating an existing tag category.

All fields are optional — only provided fields are changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-82"></a> `name?` | `string` | Category display name. Must be unique. | services/tag-category/types.ts:130 |
| <a id="property-description-87"></a> `description?` | `string` | Human-readable description. | services/tag-category/types.ts:133 |
| <a id="property-single_tag_selection-2"></a> `single_tag_selection?` | `boolean` | When true, only one tag from this category can be applied to a resource. | services/tag-category/types.ts:136 |
| <a id="property-taggable_vms-2"></a> `taggable_vms?` | `boolean` | Whether VMs can be tagged with tags in this category. | services/tag-category/types.ts:139 |
| <a id="property-taggable_vnets-2"></a> `taggable_vnets?` | `boolean` | Whether networks can be tagged with tags in this category. | services/tag-category/types.ts:142 |
| <a id="property-taggable_volumes-2"></a> `taggable_volumes?` | `boolean` | Whether volumes can be tagged with tags in this category. | services/tag-category/types.ts:145 |
| <a id="property-taggable_vnet_rules-2"></a> `taggable_vnet_rules?` | `boolean` | Whether network rules can be tagged with tags in this category. | services/tag-category/types.ts:148 |
| <a id="property-taggable_vmware_containers-2"></a> `taggable_vmware_containers?` | `boolean` | Whether VMware containers can be tagged with tags in this category. | services/tag-category/types.ts:151 |
| <a id="property-taggable_users-2"></a> `taggable_users?` | `boolean` | Whether users can be tagged with tags in this category. | services/tag-category/types.ts:154 |
| <a id="property-taggable_tenant_nodes-2"></a> `taggable_tenant_nodes?` | `boolean` | Whether tenant nodes can be tagged with tags in this category. | services/tag-category/types.ts:157 |
| <a id="property-taggable_sites-2"></a> `taggable_sites?` | `boolean` | Whether sites can be tagged with tags in this category. | services/tag-category/types.ts:160 |
| <a id="property-taggable_nodes-2"></a> `taggable_nodes?` | `boolean` | Whether nodes can be tagged with tags in this category. | services/tag-category/types.ts:163 |
| <a id="property-taggable_groups-2"></a> `taggable_groups?` | `boolean` | Whether groups can be tagged with tags in this category. | services/tag-category/types.ts:166 |
| <a id="property-taggable_clusters-2"></a> `taggable_clusters?` | `boolean` | Whether clusters can be tagged with tags in this category. | services/tag-category/types.ts:169 |
| <a id="property-taggable_tenants-2"></a> `taggable_tenants?` | `boolean` | Whether tenants can be tagged with tags in this category. | services/tag-category/types.ts:172 |

***

### TagMember

Defined in: services/tag-member/types.ts:16

A VergeOS tag member resource.

Tag members link [Tag](#tag) records to specific resources via a polymorphic
`member` reference in `"resource_type/id"` format (e.g., `"vms/123"`).

Both `tag` and `member` are **read-only after creation** — to reassign,
delete and recreate. Deleting a tag cascades to all its tag members.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-tag"></a> `tag` | [`FlexKey`](#flexkey) | FK to the tag being applied (read-only after creation). | - | services/tag-member/types.ts:18 |
| <a id="property-member-2"></a> `member` | `string` | Polymorphic resource reference in `"type/id"` format, e.g. `"vms/123"` (read-only after creation). | - | services/tag-member/types.ts:21 |
| <a id="property-key-63"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TagMemberCreateParams

Defined in: services/tag-member/types.ts:32

Parameters for creating a new tag member (assigning a tag to a resource).

Both fields are required. The combination of `tag` + `member` must be unique
(the API returns "Tag member is already assigned" on duplicates).

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-tag-1"></a> `tag` | [`FlexKey`](#flexkey) | FK to the tag to apply. | services/tag-member/types.ts:34 |
| <a id="property-member-3"></a> `member` | `string` | Polymorphic resource reference in `"type/id"` format, e.g. `"vms/123"`. | services/tag-member/types.ts:37 |

***

### Tag

Defined in: services/tag/types.ts:15

A VergeOS tag resource.

Tags are named labels that belong to a [TagCategory](#tagcategory) and can be applied
to resources via [TagMember](#tagmember) records. Tag names are unique within the system.

Deleting a tag cascades to all its tag members.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-83"></a> `name` | `string` | Tag display name. Unique, trimmed. | - | services/tag/types.ts:17 |
| <a id="property-description-88"></a> `description?` | `string` | Human-readable description. | - | services/tag/types.ts:20 |
| <a id="property-category"></a> `category` | [`FlexKey`](#flexkey) | FK to the parent tag category. | - | services/tag/types.ts:23 |
| <a id="property-created-14"></a> `created?` | `number` | Timestamp when this tag was created (read-only). | - | services/tag/types.ts:26 |
| <a id="property-modified-18"></a> `modified?` | `number` | Timestamp when this tag was last modified (read-only). | - | services/tag/types.ts:29 |
| <a id="property-key-64"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TagCreateParams

Defined in: services/tag/types.ts:39

Parameters for creating a new tag.

`name` and `category` are required. Tag names must be unique.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-84"></a> `name` | `string` | Tag display name. Must be unique. | services/tag/types.ts:41 |
| <a id="property-category-1"></a> `category` | [`FlexKey`](#flexkey) | FK to the parent tag category. | services/tag/types.ts:44 |
| <a id="property-description-89"></a> `description?` | `string` | Human-readable description. | services/tag/types.ts:47 |

***

### TagUpdateParams

Defined in: services/tag/types.ts:58

Parameters for updating an existing tag.

All fields are optional — only provided fields are changed.
The `category` FK cannot be updated after creation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-85"></a> `name?` | `string` | Tag display name. Must be unique. | services/tag/types.ts:60 |
| <a id="property-description-90"></a> `description?` | `string` | Human-readable description. | services/tag/types.ts:63 |

***

### Task

Defined in: services/task/types.ts:17

A VergeOS task resource.

Tasks are the automation engine — scheduled or event-triggered jobs
(snapshots, power ops, notifications). They have both `$key` (integer)
and `id` (40-char SHA1 string) identifiers.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id-11"></a> `id` | `string` | SHA1 identifier (40-character hex string). | - | services/task/types.ts:19 |
| <a id="property-owner-9"></a> `owner?` | [`FlexKey`](#flexkey) | Owner resource path (e.g., `"vms/123"`). FK reference. | - | services/task/types.ts:22 |
| <a id="property-table-2"></a> `table?` | `string` | Resource type context for the action. | - | services/task/types.ts:25 |
| <a id="property-action-3"></a> `action?` | `string` | Action to execute. | - | services/task/types.ts:28 |
| <a id="property-action_display"></a> `action_display?` | `string` | Human-readable action display name. Read-only. | - | services/task/types.ts:31 |
| <a id="property-name-86"></a> `name` | `string` | Task display name. 1–64 characters. | - | services/task/types.ts:34 |
| <a id="property-description-91"></a> `description?` | `string` | Human-readable description. | - | services/task/types.ts:37 |
| <a id="property-enabled-50"></a> `enabled?` | `boolean` | Whether the task is enabled. | - | services/task/types.ts:40 |
| <a id="property-last_run-1"></a> `last_run?` | `string` | Timestamp of the last execution (ISO 8601 string). | - | services/task/types.ts:43 |
| <a id="property-delete_after_run"></a> `delete_after_run?` | `boolean` | Whether the task should be deleted after running once. | - | services/task/types.ts:46 |
| <a id="property-status-15"></a> `status?` | [`TaskStatus`](#taskstatus) | Current execution status. | - | services/task/types.ts:49 |
| <a id="property-system_created-1"></a> `system_created?` | `boolean` | Whether the task was created by the system. Read-only. | - | services/task/types.ts:52 |
| <a id="property-creator-7"></a> `creator?` | [`FlexKey`](#flexkey) | User who created this task. Read-only. | - | services/task/types.ts:55 |
| <a id="property-created-15"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/task/types.ts:58 |
| <a id="property-modified-19"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/task/types.ts:61 |
| <a id="property-settings_args-6"></a> `settings_args?` | `unknown` | Settings/arguments JSON blob. | - | services/task/types.ts:64 |
| <a id="property-key-65"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TaskCreateParams

Defined in: services/task/types.ts:74

Parameters for creating a new task.

`owner`, `action`, and `name` are required.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-owner-10"></a> `owner` | [`FlexKey`](#flexkey) | Owner resource path (e.g., `"vms/123"`). Required. | services/task/types.ts:76 |
| <a id="property-action-4"></a> `action` | `string` | Action to execute. Required. | services/task/types.ts:79 |
| <a id="property-name-87"></a> `name` | `string` | Task display name. 1–64 characters. Required. | services/task/types.ts:82 |
| <a id="property-table-3"></a> `table?` | `string` | Resource type context. | services/task/types.ts:85 |
| <a id="property-description-92"></a> `description?` | `string` | Human-readable description. | services/task/types.ts:88 |
| <a id="property-enabled-51"></a> `enabled?` | `boolean` | Whether the task is enabled. Default: `true`. | services/task/types.ts:91 |
| <a id="property-delete_after_run-1"></a> `delete_after_run?` | `boolean` | Whether to delete after running once. Default: `false`. | services/task/types.ts:94 |
| <a id="property-settings_args-7"></a> `settings_args?` | `unknown` | Settings/arguments for the action. | services/task/types.ts:97 |

***

### TaskUpdateParams

Defined in: services/task/types.ts:106

Parameters for updating an existing task.
All fields are optional.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-88"></a> `name?` | `string` | Task display name. 1–64 characters. | services/task/types.ts:108 |
| <a id="property-description-93"></a> `description?` | `string` | Human-readable description. | services/task/types.ts:111 |
| <a id="property-enabled-52"></a> `enabled?` | `boolean` | Whether the task is enabled. | services/task/types.ts:114 |
| <a id="property-delete_after_run-2"></a> `delete_after_run?` | `boolean` | Whether to delete after running once. | services/task/types.ts:117 |

***

### TaskWaitOptions

Defined in: services/task/types.ts:125

Options for TaskService.waitForCompletion.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-timeout"></a> `timeout?` | `number` | Timeout in milliseconds. Default: 300000 (5 minutes). | services/task/types.ts:127 |
| <a id="property-interval"></a> `interval?` | `number` | Polling interval in milliseconds. Default: 5000 (5 seconds). | services/task/types.ts:130 |

***

### TenantLayer2Network

Defined in: services/tenant-layer2/types.ts:14

A VergeOS tenant Layer 2 network assignment.

Links a host-level Layer 2 vnet to a tenant, allowing the tenant
to access the underlying network. Both `tenant` and `vnet` are
set at creation and become read-only afterward.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-tenant"></a> `tenant` | [`FlexKey`](#flexkey) | Parent tenant (FK to `tenants`). Read-only after creation. | - | services/tenant-layer2/types.ts:16 |
| <a id="property-vnet-16"></a> `vnet` | [`FlexKey`](#flexkey) | Layer 2 vnet (FK to `vnets`). Read-only after creation. | - | services/tenant-layer2/types.ts:19 |
| <a id="property-enabled-53"></a> `enabled?` | `boolean` | Whether this Layer 2 assignment is enabled. Default: `true`. | - | services/tenant-layer2/types.ts:22 |
| <a id="property-key-66"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TenantLayer2CreateParams

Defined in: services/tenant-layer2/types.ts:32

Parameters for creating a new tenant Layer 2 network assignment.

Both `tenant` and `vnet` are required and become read-only after creation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-tenant-1"></a> `tenant` | [`FlexKey`](#flexkey) | Parent tenant (FK to `tenants`). Required. | services/tenant-layer2/types.ts:34 |
| <a id="property-vnet-17"></a> `vnet` | [`FlexKey`](#flexkey) | Layer 2 vnet (FK to `vnets`). Required. | services/tenant-layer2/types.ts:37 |
| <a id="property-enabled-54"></a> `enabled?` | `boolean` | Whether this Layer 2 assignment is enabled. Default: `true`. | services/tenant-layer2/types.ts:40 |

***

### TenantLayer2UpdateParams

Defined in: services/tenant-layer2/types.ts:50

Parameters for updating an existing tenant Layer 2 network assignment.

Only `enabled` can be changed after creation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-enabled-55"></a> `enabled?` | `boolean` | Whether this Layer 2 assignment is enabled. | services/tenant-layer2/types.ts:52 |

***

### TenantNode

Defined in: services/tenant-node/types.ts:19

A VergeOS tenant node resource.

Tenant nodes represent virtual compute nodes allocated to a tenant. Each node
has CPU, RAM, and HA configuration. Tenant nodes map to underlying machine
resources on the host system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-tenant-2"></a> `tenant` | [`FlexKey`](#flexkey) | Parent tenant (FK to `tenants`). Read-only after creation. | - | services/tenant-node/types.ts:21 |
| <a id="property-nodeid-1"></a> `nodeid?` | `number` | Node ID within the tenant. Min 1. | - | services/tenant-node/types.ts:24 |
| <a id="property-name-89"></a> `name?` | `string` | Node display name. Min 1, max 128 characters. Unique. | - | services/tenant-node/types.ts:27 |
| <a id="property-description-94"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/tenant-node/types.ts:30 |
| <a id="property-enabled-56"></a> `enabled?` | `boolean` | Whether the node is enabled. Default: `true`. | - | services/tenant-node/types.ts:33 |
| <a id="property-cpu_cores-2"></a> `cpu_cores?` | `number` | Number of CPU cores. Min 1, max 1048576. Default: `4`. | - | services/tenant-node/types.ts:36 |
| <a id="property-ram-3"></a> `ram?` | `number` | RAM in MB. Min 2048, max 5242880. Default: `16384`. | - | services/tenant-node/types.ts:39 |
| <a id="property-cluster-5"></a> `cluster?` | [`FlexKey`](#flexkey) | Cluster assignment (FK to `clusters`). | - | services/tenant-node/types.ts:42 |
| <a id="property-cluster_failover-3"></a> `cluster_failover?` | [`FlexKey`](#flexkey) | Failover cluster (FK to `clusters`). | - | services/tenant-node/types.ts:45 |
| <a id="property-preferred_node-3"></a> `preferred_node?` | [`FlexKey`](#flexkey) | Preferred host node (FK to `nodes`). | - | services/tenant-node/types.ts:48 |
| <a id="property-ha_group-3"></a> `ha_group?` | `string` | HA group name. | - | services/tenant-node/types.ts:51 |
| <a id="property-on_power_loss-3"></a> `on_power_loss?` | [`TenantNodeOnPowerLoss`](#tenantnodeonpowerloss) | Behavior on host power loss. Default: `last_state`. | - | services/tenant-node/types.ts:54 |
| <a id="property-powerstate-2"></a> `powerstate?` | `boolean` | Whether the node is currently powered on. **Note:** The API often omits this field. For reliable power state, use [MachineStatus](#machinestatus) via `client.machineStatuses.getByMachine()`. | - | services/tenant-node/types.ts:62 |
| <a id="property-is_snapshot-2"></a> `is_snapshot?` | `boolean` | Whether this resource is a snapshot. | - | services/tenant-node/types.ts:65 |
| <a id="property-owner-11"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference (FK). | - | services/tenant-node/types.ts:68 |
| <a id="property-db_version"></a> `db_version?` | `string` | DB version string. | - | services/tenant-node/types.ts:71 |
| <a id="property-machine-16"></a> `machine?` | [`FlexKey`](#flexkey) | Underlying machine reference (FK to `machines`). Read-only. | - | services/tenant-node/types.ts:76 |
| <a id="property-reserve_owner"></a> `reserve_owner?` | [`FlexKey`](#flexkey) | Reserve owner (FK to `tenant_nodes`). Read-only. | - | services/tenant-node/types.ts:79 |
| <a id="property-created-16"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/tenant-node/types.ts:82 |
| <a id="property-modified-20"></a> `modified?` | `number` | Last modified timestamp (Unix epoch). Read-only. | - | services/tenant-node/types.ts:85 |
| <a id="property-creator-8"></a> `creator?` | `string` | User who created this node. Read-only. | - | services/tenant-node/types.ts:88 |
| <a id="property-status-16"></a> `status?` | `string` | Machine status value (joined from machine_status). Present in default list/get responses. | - | services/tenant-node/types.ts:93 |
| <a id="property-key-67"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TenantNodeCreateParams

Defined in: services/tenant-node/types.ts:104

Parameters for creating a new tenant node.

`tenant` is required. Read-only fields (`machine`, `reserve_owner`,
`created`, `modified`, `creator`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-tenant-3"></a> `tenant` | [`FlexKey`](#flexkey) | Parent tenant (FK to `tenants`). Required. | services/tenant-node/types.ts:106 |
| <a id="property-cpu_cores-3"></a> `cpu_cores?` | `number` | Number of CPU cores. Min 1, max 1048576. Default: `4`. | services/tenant-node/types.ts:109 |
| <a id="property-ram-4"></a> `ram?` | `number` | RAM in MB. Min 2048, max 5242880. Default: `16384`. | services/tenant-node/types.ts:112 |
| <a id="property-nodeid-2"></a> `nodeid?` | `number` | Node ID within the tenant. Min 1. | services/tenant-node/types.ts:115 |
| <a id="property-name-90"></a> `name?` | `string` | Node display name. Min 1, max 128 characters. | services/tenant-node/types.ts:118 |
| <a id="property-description-95"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/tenant-node/types.ts:121 |
| <a id="property-enabled-57"></a> `enabled?` | `boolean` | Whether the node is enabled. Default: `true`. | services/tenant-node/types.ts:124 |
| <a id="property-cluster-6"></a> `cluster?` | [`FlexKey`](#flexkey) | Cluster assignment (FK to `clusters`). | services/tenant-node/types.ts:127 |
| <a id="property-cluster_failover-4"></a> `cluster_failover?` | [`FlexKey`](#flexkey) | Failover cluster (FK to `clusters`). | services/tenant-node/types.ts:130 |
| <a id="property-preferred_node-4"></a> `preferred_node?` | [`FlexKey`](#flexkey) | Preferred host node (FK to `nodes`). | services/tenant-node/types.ts:133 |
| <a id="property-ha_group-4"></a> `ha_group?` | `string` | HA group name. | services/tenant-node/types.ts:136 |
| <a id="property-on_power_loss-4"></a> `on_power_loss?` | [`TenantNodeOnPowerLoss`](#tenantnodeonpowerloss) | Behavior on host power loss. Default: `last_state`. | services/tenant-node/types.ts:139 |
| <a id="property-is_snapshot-3"></a> `is_snapshot?` | `boolean` | Whether this resource is a snapshot. | services/tenant-node/types.ts:142 |
| <a id="property-owner-12"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference (FK). | services/tenant-node/types.ts:145 |

***

### TenantNodeUpdateParams

Defined in: services/tenant-node/types.ts:157

Parameters for updating an existing tenant node.

All fields are optional — only provided fields are changed.
Read-only fields (`tenant`, `machine`, `reserve_owner`, `created`,
`modified`, `creator`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-91"></a> `name?` | `string` | Node display name. Min 1, max 128 characters. | services/tenant-node/types.ts:159 |
| <a id="property-description-96"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/tenant-node/types.ts:162 |
| <a id="property-enabled-58"></a> `enabled?` | `boolean` | Whether the node is enabled. | services/tenant-node/types.ts:165 |
| <a id="property-cpu_cores-4"></a> `cpu_cores?` | `number` | Number of CPU cores. Min 1, max 1048576. | services/tenant-node/types.ts:168 |
| <a id="property-ram-5"></a> `ram?` | `number` | RAM in MB. Min 2048, max 5242880. | services/tenant-node/types.ts:171 |
| <a id="property-cluster-7"></a> `cluster?` | [`FlexKey`](#flexkey) | Cluster assignment (FK to `clusters`). | services/tenant-node/types.ts:174 |
| <a id="property-cluster_failover-5"></a> `cluster_failover?` | [`FlexKey`](#flexkey) | Failover cluster (FK to `clusters`). | services/tenant-node/types.ts:177 |
| <a id="property-preferred_node-5"></a> `preferred_node?` | [`FlexKey`](#flexkey) | Preferred host node (FK to `nodes`). | services/tenant-node/types.ts:180 |
| <a id="property-ha_group-5"></a> `ha_group?` | `string` | HA group name. | services/tenant-node/types.ts:183 |
| <a id="property-on_power_loss-5"></a> `on_power_loss?` | [`TenantNodeOnPowerLoss`](#tenantnodeonpowerloss) | Behavior on host power loss. | services/tenant-node/types.ts:186 |

***

### TenantRecipeInstance

Defined in: services/tenant-recipe-instance/types.ts:16

A VergeOS tenant recipe instance resource.

Tenant recipe instances represent deployed instances of tenant recipes.
They are created when a tenant recipe is deployed and track the
relationship between the recipe and the resulting tenant.

Unlike VM recipe instances, tenant instances do not have `update`,
`verify`, `simulate`, or `auto_update` fields. The `answers` field
is read-only after creation.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-recipe"></a> `recipe` | [`FlexKey`](#flexkey) | Parent recipe (FK to `tenant_recipes`). Read-only. | - | services/tenant-recipe-instance/types.ts:18 |
| <a id="property-tenant-4"></a> `tenant?` | [`FlexKey`](#flexkey) | Associated tenant (FK to `tenants`). Read-only. | - | services/tenant-recipe-instance/types.ts:21 |
| <a id="property-version-1"></a> `version?` | `string` | Recipe version string. | - | services/tenant-recipe-instance/types.ts:24 |
| <a id="property-build"></a> `build?` | `number` | Recipe build number. | - | services/tenant-recipe-instance/types.ts:27 |
| <a id="property-answers"></a> `answers?` | `Record`\<`string`, `unknown`\> | Answers to recipe questions (JSON). Read-only. | - | services/tenant-recipe-instance/types.ts:30 |
| <a id="property-name-92"></a> `name` | `string` | Instance name. 1–128 chars. | - | services/tenant-recipe-instance/types.ts:33 |
| <a id="property-created-17"></a> `created?` | `number` | Creation timestamp. Read-only. | - | services/tenant-recipe-instance/types.ts:36 |
| <a id="property-modified-21"></a> `modified?` | `number` | Last modification timestamp. Read-only. | - | services/tenant-recipe-instance/types.ts:39 |
| <a id="property-key-68"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TenantRecipeInstanceCreateParams

Defined in: services/tenant-recipe-instance/types.ts:47

Parameters for creating a tenant recipe instance (deploying a recipe).

Unlike VM recipe deployment, tenant recipes do not support `auto_update`.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-recipe-1"></a> `recipe` | [`FlexKey`](#flexkey) | Recipe key (40-char hex string FK to `tenant_recipes`). Required. | services/tenant-recipe-instance/types.ts:49 |
| <a id="property-name-93"></a> `name` | `string` | Instance name. Required. | services/tenant-recipe-instance/types.ts:52 |
| <a id="property-answers-1"></a> `answers?` | `Record`\<`string`, `unknown`\> | Answers to recipe questions, keyed by question name. | services/tenant-recipe-instance/types.ts:55 |

***

### TenantRecipeInstanceUpdateParams

Defined in: services/tenant-recipe-instance/types.ts:63

Parameters for updating a tenant recipe instance.

Only the name can be updated — answers are read-only after creation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-94"></a> `name?` | `string` | Instance name. | services/tenant-recipe-instance/types.ts:65 |
| <a id="property-version-2"></a> `version?` | `string` | Recipe version string. | services/tenant-recipe-instance/types.ts:68 |
| <a id="property-build-1"></a> `build?` | `number` | Recipe build number. | services/tenant-recipe-instance/types.ts:71 |

***

### TenantRecipe

Defined in: services/tenant-recipe/types.ts:22

A VergeOS tenant recipe resource.

Tenant recipes are marketplace templates for deploying tenants.
They are managed by the catalog system — create is not supported via
the SDK. Supports list, get, update, and delete operations.

Compared to VM recipes, tenant recipes have `preserve_certs` but lack
`size`, `assets`, and `question_assets` fields.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id-12"></a> `id?` | `string` | 40-character hex string identifier. Read-only. | - | services/tenant-recipe/types.ts:24 |
| <a id="property-name-95"></a> `name` | `string` | Recipe name. 1–128 chars. | - | services/tenant-recipe/types.ts:27 |
| <a id="property-icon"></a> `icon?` | `string` | Recipe icon identifier. | - | services/tenant-recipe/types.ts:30 |
| <a id="property-description-97"></a> `description?` | `string` | Recipe description. 0–2048 chars. | - | services/tenant-recipe/types.ts:33 |
| <a id="property-preserve_certs"></a> `preserve_certs?` | `boolean` | Whether to preserve certificates during deployment. Default: `false`. | - | services/tenant-recipe/types.ts:36 |
| <a id="property-catalog"></a> `catalog` | [`FlexKey`](#flexkey) | Parent catalog (FK to `catalogs`). | - | services/tenant-recipe/types.ts:39 |
| <a id="property-status-17"></a> `status?` | [`FlexKey`](#flexkey) | Recipe status (FK to `recipe_status`). Read-only. | - | services/tenant-recipe/types.ts:42 |
| <a id="property-tenant_snapshot"></a> `tenant_snapshot?` | [`FlexKey`](#flexkey) | Associated tenant snapshot (FK to `tenants`). | - | services/tenant-recipe/types.ts:45 |
| <a id="property-tenant-5"></a> `tenant?` | [`FlexKey`](#flexkey) | Associated tenant (FK to `tenants`). | - | services/tenant-recipe/types.ts:48 |
| <a id="property-downloaded"></a> `downloaded?` | `boolean` | Whether the recipe has been downloaded. Default: `false`. | - | services/tenant-recipe/types.ts:51 |
| <a id="property-update_available"></a> `update_available?` | `boolean` | Whether an update is available. Default: `false`. | - | services/tenant-recipe/types.ts:54 |
| <a id="property-needs_republish"></a> `needs_republish?` | `boolean` | Whether the recipe needs republishing. Default: `false`. | - | services/tenant-recipe/types.ts:57 |
| <a id="property-version-3"></a> `version?` | `string` | Recipe version string. Default: `"1.0.0"`. | - | services/tenant-recipe/types.ts:60 |
| <a id="property-build-2"></a> `build?` | `number` | Recipe build number. Default: `0`. | - | services/tenant-recipe/types.ts:63 |
| <a id="property-dependencies"></a> `dependencies?` | `string` | Recipe dependencies. | - | services/tenant-recipe/types.ts:66 |
| <a id="property-creator-9"></a> `creator?` | `string` | Recipe creator. Read-only. | - | services/tenant-recipe/types.ts:69 |
| <a id="property-key-69"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TenantRecipeUpdateParams

Defined in: services/tenant-recipe/types.ts:75

Parameters for updating an existing tenant recipe.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-96"></a> `name?` | `string` | Recipe name. | services/tenant-recipe/types.ts:77 |
| <a id="property-icon-1"></a> `icon?` | `string` | Recipe icon identifier. | services/tenant-recipe/types.ts:80 |
| <a id="property-description-98"></a> `description?` | `string` | Recipe description. | services/tenant-recipe/types.ts:83 |
| <a id="property-preserve_certs-1"></a> `preserve_certs?` | `boolean` | Whether to preserve certificates during deployment. | services/tenant-recipe/types.ts:86 |
| <a id="property-tenant_snapshot-1"></a> `tenant_snapshot?` | [`FlexKey`](#flexkey) | Associated tenant snapshot (FK to `tenants`). | services/tenant-recipe/types.ts:89 |
| <a id="property-tenant-6"></a> `tenant?` | [`FlexKey`](#flexkey) | Associated tenant (FK to `tenants`). | services/tenant-recipe/types.ts:92 |
| <a id="property-version-4"></a> `version?` | `string` | Recipe version string. | services/tenant-recipe/types.ts:95 |
| <a id="property-build-3"></a> `build?` | `number` | Recipe build number. | services/tenant-recipe/types.ts:98 |
| <a id="property-downloaded-1"></a> `downloaded?` | `boolean` | Whether the recipe has been downloaded. | services/tenant-recipe/types.ts:101 |
| <a id="property-update_available-1"></a> `update_available?` | `boolean` | Whether an update is available. | services/tenant-recipe/types.ts:104 |
| <a id="property-needs_republish-1"></a> `needs_republish?` | `boolean` | Whether the recipe needs republishing. | services/tenant-recipe/types.ts:107 |
| <a id="property-dependencies-1"></a> `dependencies?` | `string` | Recipe dependencies. | services/tenant-recipe/types.ts:110 |

***

### TenantRecipeDeployOptions

Defined in: services/tenant-recipe/types.ts:118

Options for deploying a tenant recipe instance.

Unlike VM recipe deployment, tenant recipes do not support `auto_update`.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-97"></a> `name` | `string` | Name for the deployed instance. | services/tenant-recipe/types.ts:120 |
| <a id="property-answers-2"></a> `answers?` | `Record`\<`string`, `unknown`\> | Answers to recipe questions, keyed by question name. | services/tenant-recipe/types.ts:123 |

***

### TenantSnapshot

Defined in: services/tenant-snapshot/types.ts:14

A VergeOS tenant snapshot resource.

Tenant snapshots are created automatically by snapshot profiles or
manually via tenant actions — they cannot be created directly via
the API. Supports list, get, update, and delete operations.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-tenant-7"></a> `tenant` | [`FlexKey`](#flexkey) | Parent tenant (FK to `tenants`). | - | services/tenant-snapshot/types.ts:16 |
| <a id="property-name-98"></a> `name` | `string` | Snapshot name. Read-only. | - | services/tenant-snapshot/types.ts:19 |
| <a id="property-profile-2"></a> `profile?` | `string` | Snapshot profile name. | - | services/tenant-snapshot/types.ts:22 |
| <a id="property-period"></a> `period?` | `string` | Profile period. | - | services/tenant-snapshot/types.ts:25 |
| <a id="property-min_snapshots-7"></a> `min_snapshots?` | `number` | Minimum number of snapshots to retain. Default: `0`. | - | services/tenant-snapshot/types.ts:28 |
| <a id="property-created-18"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/tenant-snapshot/types.ts:31 |
| <a id="property-description-99"></a> `description?` | `string` | Description of the snapshot. | - | services/tenant-snapshot/types.ts:34 |
| <a id="property-expires-10"></a> `expires?` | `number` | Expiration timestamp (Unix epoch). `0` means never expires. | - | services/tenant-snapshot/types.ts:37 |
| <a id="property-key-70"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TenantSnapshotUpdateParams

Defined in: services/tenant-snapshot/types.ts:47

Parameters for updating an existing tenant snapshot.

Only `description` and `expires` can be changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-description-100"></a> `description?` | `string` | Description of the snapshot. | services/tenant-snapshot/types.ts:49 |
| <a id="property-expires-11"></a> `expires?` | `number` | Expiration timestamp (Unix epoch). Set to `0` for never expires. | services/tenant-snapshot/types.ts:52 |

***

### TenantStatsHistoryLong

Defined in: services/tenant-stats-history-long/types.ts:15

A VergeOS tenant stats history (long-term) resource.

Provides long-term historical CPU, RAM, storage tier, and GPU utilization
metrics per tenant. This is a read-only monitoring resource managed by
the system. Unlike the short-term variant, long-term history does not
include percentage fields.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-tenant-8"></a> `tenant` | [`FlexKey`](#flexkey) | Parent tenant reference (FK to `tenants`). | - | services/tenant-stats-history-long/types.ts:17 |
| <a id="property-ram_used-3"></a> `ram_used?` | `number` | RAM used in bytes. | - | services/tenant-stats-history-long/types.ts:20 |
| <a id="property-vram_used-3"></a> `vram_used?` | `number` | Virtual RAM used in bytes. | - | services/tenant-stats-history-long/types.ts:23 |
| <a id="property-total_cpu-3"></a> `total_cpu?` | `number` | Total CPU usage percentage. | - | services/tenant-stats-history-long/types.ts:26 |
| <a id="property-core_count"></a> `core_count?` | `number` | Number of CPU cores allocated. | - | services/tenant-stats-history-long/types.ts:29 |
| <a id="property-ip_count"></a> `ip_count?` | `number` | Number of IP addresses in use. | - | services/tenant-stats-history-long/types.ts:32 |
| <a id="property-ram_allocated"></a> `ram_allocated?` | `number` | RAM allocated in bytes. | - | services/tenant-stats-history-long/types.ts:35 |
| <a id="property-tier0_provisioned"></a> `tier0_provisioned?` | `number` | Tier 0 storage provisioned in bytes. | - | services/tenant-stats-history-long/types.ts:38 |
| <a id="property-tier0_used"></a> `tier0_used?` | `number` | Tier 0 storage used in bytes. | - | services/tenant-stats-history-long/types.ts:41 |
| <a id="property-tier0_allocated"></a> `tier0_allocated?` | `number` | Tier 0 storage allocated in bytes. | - | services/tenant-stats-history-long/types.ts:44 |
| <a id="property-tier1_provisioned"></a> `tier1_provisioned?` | `number` | Tier 1 storage provisioned in bytes. | - | services/tenant-stats-history-long/types.ts:47 |
| <a id="property-tier1_used"></a> `tier1_used?` | `number` | Tier 1 storage used in bytes. | - | services/tenant-stats-history-long/types.ts:50 |
| <a id="property-tier1_allocated"></a> `tier1_allocated?` | `number` | Tier 1 storage allocated in bytes. | - | services/tenant-stats-history-long/types.ts:53 |
| <a id="property-tier2_provisioned"></a> `tier2_provisioned?` | `number` | Tier 2 storage provisioned in bytes. | - | services/tenant-stats-history-long/types.ts:56 |
| <a id="property-tier2_used"></a> `tier2_used?` | `number` | Tier 2 storage used in bytes. | - | services/tenant-stats-history-long/types.ts:59 |
| <a id="property-tier2_allocated"></a> `tier2_allocated?` | `number` | Tier 2 storage allocated in bytes. | - | services/tenant-stats-history-long/types.ts:62 |
| <a id="property-tier3_provisioned"></a> `tier3_provisioned?` | `number` | Tier 3 storage provisioned in bytes. | - | services/tenant-stats-history-long/types.ts:65 |
| <a id="property-tier3_used"></a> `tier3_used?` | `number` | Tier 3 storage used in bytes. | - | services/tenant-stats-history-long/types.ts:68 |
| <a id="property-tier3_allocated"></a> `tier3_allocated?` | `number` | Tier 3 storage allocated in bytes. | - | services/tenant-stats-history-long/types.ts:71 |
| <a id="property-tier4_provisioned"></a> `tier4_provisioned?` | `number` | Tier 4 storage provisioned in bytes. | - | services/tenant-stats-history-long/types.ts:74 |
| <a id="property-tier4_used"></a> `tier4_used?` | `number` | Tier 4 storage used in bytes. | - | services/tenant-stats-history-long/types.ts:77 |
| <a id="property-tier4_allocated"></a> `tier4_allocated?` | `number` | Tier 4 storage allocated in bytes. | - | services/tenant-stats-history-long/types.ts:80 |
| <a id="property-tier5_provisioned"></a> `tier5_provisioned?` | `number` | Tier 5 storage provisioned in bytes. | - | services/tenant-stats-history-long/types.ts:83 |
| <a id="property-tier5_used"></a> `tier5_used?` | `number` | Tier 5 storage used in bytes. | - | services/tenant-stats-history-long/types.ts:86 |
| <a id="property-tier5_allocated"></a> `tier5_allocated?` | `number` | Tier 5 storage allocated in bytes. | - | services/tenant-stats-history-long/types.ts:89 |
| <a id="property-vgpus_used"></a> `vgpus_used?` | `number` | Number of vGPUs in use. | - | services/tenant-stats-history-long/types.ts:92 |
| <a id="property-gpus_used"></a> `gpus_used?` | `number` | Number of physical GPUs in use. | - | services/tenant-stats-history-long/types.ts:95 |
| <a id="property-vgpus_total"></a> `vgpus_total?` | `number` | Total number of vGPUs available. | - | services/tenant-stats-history-long/types.ts:98 |
| <a id="property-gpus_total"></a> `gpus_total?` | `number` | Total number of physical GPUs available. | - | services/tenant-stats-history-long/types.ts:101 |
| <a id="property-timestamp-6"></a> `timestamp?` | `number` | Snapshot timestamp (Unix epoch). | - | services/tenant-stats-history-long/types.ts:104 |
| <a id="property-key-71"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TenantStatsHistoryShort

Defined in: services/tenant-stats-history-short/types.ts:15

A VergeOS tenant stats history (short-term) resource.

Provides short-term historical CPU, RAM, storage tier, and GPU utilization
metrics per tenant. Each row captures a point-in-time snapshot of tenant
resource consumption. This is a read-only monitoring resource managed by
the system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-tenant-9"></a> `tenant` | [`FlexKey`](#flexkey) | Parent tenant reference (FK to `tenants`). | - | services/tenant-stats-history-short/types.ts:17 |
| <a id="property-ram_used-4"></a> `ram_used?` | `number` | RAM used in bytes. | - | services/tenant-stats-history-short/types.ts:20 |
| <a id="property-vram_used-4"></a> `vram_used?` | `number` | Virtual RAM used in bytes. | - | services/tenant-stats-history-short/types.ts:23 |
| <a id="property-total_cpu-4"></a> `total_cpu?` | `number` | Total CPU usage percentage. | - | services/tenant-stats-history-short/types.ts:26 |
| <a id="property-core_count-1"></a> `core_count?` | `number` | Number of CPU cores allocated. | - | services/tenant-stats-history-short/types.ts:29 |
| <a id="property-ip_count-1"></a> `ip_count?` | `number` | Number of IP addresses in use. | - | services/tenant-stats-history-short/types.ts:32 |
| <a id="property-ram_allocated-1"></a> `ram_allocated?` | `number` | RAM allocated in bytes. | - | services/tenant-stats-history-short/types.ts:35 |
| <a id="property-ram_pct-1"></a> `ram_pct?` | `number` | RAM usage percentage. | - | services/tenant-stats-history-short/types.ts:38 |
| <a id="property-tier0_provisioned-1"></a> `tier0_provisioned?` | `number` | Tier 0 storage provisioned in bytes. | - | services/tenant-stats-history-short/types.ts:41 |
| <a id="property-tier0_used-1"></a> `tier0_used?` | `number` | Tier 0 storage used in bytes. | - | services/tenant-stats-history-short/types.ts:44 |
| <a id="property-tier0_pct"></a> `tier0_pct?` | `number` | Tier 0 storage usage percentage. | - | services/tenant-stats-history-short/types.ts:47 |
| <a id="property-tier0_allocated-1"></a> `tier0_allocated?` | `number` | Tier 0 storage allocated in bytes. | - | services/tenant-stats-history-short/types.ts:50 |
| <a id="property-tier1_provisioned-1"></a> `tier1_provisioned?` | `number` | Tier 1 storage provisioned in bytes. | - | services/tenant-stats-history-short/types.ts:53 |
| <a id="property-tier1_used-1"></a> `tier1_used?` | `number` | Tier 1 storage used in bytes. | - | services/tenant-stats-history-short/types.ts:56 |
| <a id="property-tier1_pct"></a> `tier1_pct?` | `number` | Tier 1 storage usage percentage. | - | services/tenant-stats-history-short/types.ts:59 |
| <a id="property-tier1_allocated-1"></a> `tier1_allocated?` | `number` | Tier 1 storage allocated in bytes. | - | services/tenant-stats-history-short/types.ts:62 |
| <a id="property-tier2_provisioned-1"></a> `tier2_provisioned?` | `number` | Tier 2 storage provisioned in bytes. | - | services/tenant-stats-history-short/types.ts:65 |
| <a id="property-tier2_used-1"></a> `tier2_used?` | `number` | Tier 2 storage used in bytes. | - | services/tenant-stats-history-short/types.ts:68 |
| <a id="property-tier2_pct"></a> `tier2_pct?` | `number` | Tier 2 storage usage percentage. | - | services/tenant-stats-history-short/types.ts:71 |
| <a id="property-tier2_allocated-1"></a> `tier2_allocated?` | `number` | Tier 2 storage allocated in bytes. | - | services/tenant-stats-history-short/types.ts:74 |
| <a id="property-tier3_provisioned-1"></a> `tier3_provisioned?` | `number` | Tier 3 storage provisioned in bytes. | - | services/tenant-stats-history-short/types.ts:77 |
| <a id="property-tier3_used-1"></a> `tier3_used?` | `number` | Tier 3 storage used in bytes. | - | services/tenant-stats-history-short/types.ts:80 |
| <a id="property-tier3_pct"></a> `tier3_pct?` | `number` | Tier 3 storage usage percentage. | - | services/tenant-stats-history-short/types.ts:83 |
| <a id="property-tier3_allocated-1"></a> `tier3_allocated?` | `number` | Tier 3 storage allocated in bytes. | - | services/tenant-stats-history-short/types.ts:86 |
| <a id="property-tier4_provisioned-1"></a> `tier4_provisioned?` | `number` | Tier 4 storage provisioned in bytes. | - | services/tenant-stats-history-short/types.ts:89 |
| <a id="property-tier4_used-1"></a> `tier4_used?` | `number` | Tier 4 storage used in bytes. | - | services/tenant-stats-history-short/types.ts:92 |
| <a id="property-tier4_pct"></a> `tier4_pct?` | `number` | Tier 4 storage usage percentage. | - | services/tenant-stats-history-short/types.ts:95 |
| <a id="property-tier4_allocated-1"></a> `tier4_allocated?` | `number` | Tier 4 storage allocated in bytes. | - | services/tenant-stats-history-short/types.ts:98 |
| <a id="property-tier5_provisioned-1"></a> `tier5_provisioned?` | `number` | Tier 5 storage provisioned in bytes. | - | services/tenant-stats-history-short/types.ts:101 |
| <a id="property-tier5_used-1"></a> `tier5_used?` | `number` | Tier 5 storage used in bytes. | - | services/tenant-stats-history-short/types.ts:104 |
| <a id="property-tier5_pct"></a> `tier5_pct?` | `number` | Tier 5 storage usage percentage. | - | services/tenant-stats-history-short/types.ts:107 |
| <a id="property-tier5_allocated-1"></a> `tier5_allocated?` | `number` | Tier 5 storage allocated in bytes. | - | services/tenant-stats-history-short/types.ts:110 |
| <a id="property-vgpus_used-1"></a> `vgpus_used?` | `number` | Number of vGPUs in use. | - | services/tenant-stats-history-short/types.ts:113 |
| <a id="property-gpus_used-1"></a> `gpus_used?` | `number` | Number of physical GPUs in use. | - | services/tenant-stats-history-short/types.ts:116 |
| <a id="property-vgpus_total-1"></a> `vgpus_total?` | `number` | Total number of vGPUs available. | - | services/tenant-stats-history-short/types.ts:119 |
| <a id="property-gpus_total-1"></a> `gpus_total?` | `number` | Total number of physical GPUs available. | - | services/tenant-stats-history-short/types.ts:122 |
| <a id="property-vgpus_pct"></a> `vgpus_pct?` | `number` | vGPU usage percentage. | - | services/tenant-stats-history-short/types.ts:125 |
| <a id="property-gpus_pct"></a> `gpus_pct?` | `number` | GPU usage percentage. | - | services/tenant-stats-history-short/types.ts:128 |
| <a id="property-timestamp-7"></a> `timestamp?` | `number` | Snapshot timestamp (Unix epoch). | - | services/tenant-stats-history-short/types.ts:131 |
| <a id="property-key-72"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TenantStorage

Defined in: services/tenant-storage/types.ts:14

A VergeOS tenant storage resource.

Tenant storage allocations define how much storage from a given tier
is provisioned for a tenant. Each allocation links a tenant to a
storage tier with a provisioned capacity.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-tenant-10"></a> `tenant` | [`FlexKey`](#flexkey) | Parent tenant (FK to `tenants`). | - | services/tenant-storage/types.ts:16 |
| <a id="property-tier-5"></a> `tier` | [`FlexKey`](#flexkey) | Storage tier (FK to `storage_tiers`). Read-only after creation. | - | services/tenant-storage/types.ts:19 |
| <a id="property-provisioned"></a> `provisioned?` | `number` | Provisioned storage capacity in bytes. Default: `0`. | - | services/tenant-storage/types.ts:22 |
| <a id="property-used-2"></a> `used?` | `number` | Used storage in bytes. Default: `0`. | - | services/tenant-storage/types.ts:25 |
| <a id="property-allocated-1"></a> `allocated?` | `number` | Allocated storage in bytes. Default: `0`. | - | services/tenant-storage/types.ts:28 |
| <a id="property-used_pct-3"></a> `used_pct?` | `number` | Used storage as a percentage. Read-only. | - | services/tenant-storage/types.ts:33 |
| <a id="property-last_update-5"></a> `last_update?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/tenant-storage/types.ts:36 |
| <a id="property-last_walk"></a> `last_walk?` | `number` | Last walk timestamp (Unix epoch). | - | services/tenant-storage/types.ts:39 |
| <a id="property-key-73"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TenantStorageCreateParams

Defined in: services/tenant-storage/types.ts:49

Parameters for creating a new tenant storage allocation.

`tenant` and `tier` are required. After creation, `tier` becomes read-only.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-tenant-11"></a> `tenant` | [`FlexKey`](#flexkey) | Parent tenant (FK to `tenants`). Required. | services/tenant-storage/types.ts:51 |
| <a id="property-tier-6"></a> `tier` | [`FlexKey`](#flexkey) | Storage tier (FK to `storage_tiers`). Required. | services/tenant-storage/types.ts:54 |
| <a id="property-provisioned-1"></a> `provisioned?` | `number` | Provisioned storage capacity in bytes. Default: `0`. | services/tenant-storage/types.ts:57 |

***

### TenantStorageUpdateParams

Defined in: services/tenant-storage/types.ts:67

Parameters for updating an existing tenant storage allocation.

Only `provisioned` can be changed after creation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-provisioned-2"></a> `provisioned?` | `number` | Provisioned storage capacity in bytes. | services/tenant-storage/types.ts:69 |

***

### Tenant

Defined in: services/tenant/types.ts:19

A VergeOS tenant resource.

Tenants are isolated virtual environments running their own VergeOS instance
within a host system. Each tenant has its own nodes, storage, networks, and
user management.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-99"></a> `name` | `string` | Tenant display name. Min 1, max 120 characters. Unique. | - | services/tenant/types.ts:21 |
| <a id="property-description-101"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/tenant/types.ts:24 |
| <a id="property-password-9"></a> `password?` | `string` | Admin user password. Max 256 characters. | - | services/tenant/types.ts:27 |
| <a id="property-change_password"></a> `change_password?` | `boolean` | Whether admin must change password on first login. | - | services/tenant/types.ts:30 |
| <a id="property-expose_cloud_snapshots"></a> `expose_cloud_snapshots?` | `boolean` | Whether system snapshots are exposed to the tenant. | - | services/tenant/types.ts:33 |
| <a id="property-allow_branding"></a> `allow_branding?` | `boolean` | Whether the tenant can customize branding. | - | services/tenant/types.ts:36 |
| <a id="property-url-12"></a> `url?` | `string` | URL of the tenant's VergeOS instance. | - | services/tenant/types.ts:39 |
| <a id="property-is_snapshot-4"></a> `is_snapshot?` | `boolean` | Whether this resource is a snapshot. | - | services/tenant/types.ts:42 |
| <a id="property-owner-13"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference (FK). | - | services/tenant/types.ts:45 |
| <a id="property-meta"></a> `meta?` | `unknown` | Metadata JSON blob. | - | services/tenant/types.ts:48 |
| <a id="property-vnet-18"></a> `vnet?` | [`FlexKey`](#flexkey) | Network reference (FK to `vnets`). Read-only. | - | services/tenant/types.ts:51 |
| <a id="property-oidc_application"></a> `oidc_application?` | [`FlexKey`](#flexkey) | OIDC application reference (FK to `oidc_applications`). | - | services/tenant/types.ts:54 |
| <a id="property-ui_address"></a> `ui_address?` | [`FlexKey`](#flexkey) | UI address reference (FK to `vnet_addresses`). | - | services/tenant/types.ts:57 |
| <a id="property-ui_fqdn"></a> `ui_fqdn?` | [`FlexKey`](#flexkey) | UI FQDN reference (FK to `vnet_proxy_tenants`). | - | services/tenant/types.ts:60 |
| <a id="property-help_url"></a> `help_url?` | `string` | Custom help URL. Default: `default`. | - | services/tenant/types.ts:63 |
| <a id="property-note-8"></a> `note?` | `string` | User-facing note. Max 1024 characters. | - | services/tenant/types.ts:66 |
| <a id="property-isolate"></a> `isolate?` | `boolean` | Whether the tenant network is isolated. Read-only. | - | services/tenant/types.ts:69 |
| <a id="property-theme_access"></a> `theme_access?` | [`ThemeAccess`](#themeaccess) | Theme access mode. | - | services/tenant/types.ts:72 |
| <a id="property-resolved_theme_access_list"></a> `resolved_theme_access_list?` | `string` | Resolved theme access list. Read-only. | - | services/tenant/types.ts:75 |
| <a id="property-created-19"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/tenant/types.ts:80 |
| <a id="property-uuid-6"></a> `uuid?` | `string` | Tenant UUID string. Read-only. | - | services/tenant/types.ts:83 |
| <a id="property-recipe_instance"></a> `recipe_instance?` | [`FlexKey`](#flexkey) | Recipe instance reference (FK to `tenant_recipe_instances`). Read-only. | - | services/tenant/types.ts:86 |
| <a id="property-status-18"></a> `status?` | [`FlexKey`](#flexkey) | Status reference (FK to `tenant_status`). Read-only. | - | services/tenant/types.ts:89 |
| <a id="property-stats-3"></a> `stats?` | [`FlexKey`](#flexkey) | Stats reference (FK to `tenant_stats`). Read-only. | - | services/tenant/types.ts:92 |
| <a id="property-creator-10"></a> `creator?` | `string` | User who created this tenant. Read-only. | - | services/tenant/types.ts:95 |
| <a id="property-key-74"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### TenantCreateParams

Defined in: services/tenant/types.ts:107

Parameters for creating a new tenant.

Only `name` is required. Read-only fields (`created`, `uuid`,
`recipe_instance`, `vnet`, `status`, `stats`, `creator`, `isolate`)
are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-100"></a> `name` | `string` | Tenant display name. Min 1, max 120 characters. Must be unique. | services/tenant/types.ts:109 |
| <a id="property-description-102"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/tenant/types.ts:112 |
| <a id="property-password-10"></a> `password?` | `string` | Admin user password. Max 256 characters. | services/tenant/types.ts:115 |
| <a id="property-change_password-1"></a> `change_password?` | `boolean` | Whether admin must change password on first login. Default: `false`. | services/tenant/types.ts:118 |
| <a id="property-expose_cloud_snapshots-1"></a> `expose_cloud_snapshots?` | `boolean` | Whether system snapshots are exposed. Default: `true`. | services/tenant/types.ts:121 |
| <a id="property-allow_branding-1"></a> `allow_branding?` | `boolean` | Whether the tenant can customize branding. Default: `false`. | services/tenant/types.ts:124 |
| <a id="property-url-13"></a> `url?` | `string` | URL of the tenant's VergeOS instance. | services/tenant/types.ts:127 |
| <a id="property-is_snapshot-5"></a> `is_snapshot?` | `boolean` | Whether this is a snapshot. Default: `false`. | services/tenant/types.ts:130 |
| <a id="property-owner-14"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference (FK). | services/tenant/types.ts:133 |
| <a id="property-meta-1"></a> `meta?` | `unknown` | Metadata JSON blob. | services/tenant/types.ts:136 |
| <a id="property-oidc_application-1"></a> `oidc_application?` | [`FlexKey`](#flexkey) | OIDC application reference (FK to `oidc_applications`). | services/tenant/types.ts:139 |
| <a id="property-ui_address-1"></a> `ui_address?` | [`FlexKey`](#flexkey) | UI address reference (FK to `vnet_addresses`). | services/tenant/types.ts:142 |
| <a id="property-ui_fqdn-1"></a> `ui_fqdn?` | [`FlexKey`](#flexkey) | UI FQDN reference (FK to `vnet_proxy_tenants`). | services/tenant/types.ts:145 |
| <a id="property-help_url-1"></a> `help_url?` | `string` | Custom help URL. Default: `default`. | services/tenant/types.ts:148 |
| <a id="property-note-9"></a> `note?` | `string` | User-facing note. Max 1024 characters. | services/tenant/types.ts:151 |
| <a id="property-theme_access-1"></a> `theme_access?` | [`ThemeAccess`](#themeaccess) | Theme access mode. Default: `host_only`. | services/tenant/types.ts:154 |

***

### TenantUpdateParams

Defined in: services/tenant/types.ts:165

Parameters for updating an existing tenant.

All fields are optional — only provided fields are changed.
Read-only fields are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-101"></a> `name?` | `string` | Tenant display name. Min 1, max 120 characters. Must be unique. | services/tenant/types.ts:167 |
| <a id="property-description-103"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/tenant/types.ts:170 |
| <a id="property-password-11"></a> `password?` | `string` | Admin user password. Max 256 characters. | services/tenant/types.ts:173 |
| <a id="property-change_password-2"></a> `change_password?` | `boolean` | Whether admin must change password on first login. | services/tenant/types.ts:176 |
| <a id="property-expose_cloud_snapshots-2"></a> `expose_cloud_snapshots?` | `boolean` | Whether system snapshots are exposed. | services/tenant/types.ts:179 |
| <a id="property-allow_branding-2"></a> `allow_branding?` | `boolean` | Whether the tenant can customize branding. | services/tenant/types.ts:182 |
| <a id="property-url-14"></a> `url?` | `string` | URL of the tenant's VergeOS instance. | services/tenant/types.ts:185 |
| <a id="property-is_snapshot-6"></a> `is_snapshot?` | `boolean` | Whether this is a snapshot. | services/tenant/types.ts:188 |
| <a id="property-owner-15"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference (FK). | services/tenant/types.ts:191 |
| <a id="property-meta-2"></a> `meta?` | `unknown` | Metadata JSON blob. | services/tenant/types.ts:194 |
| <a id="property-oidc_application-2"></a> `oidc_application?` | [`FlexKey`](#flexkey) | OIDC application reference (FK to `oidc_applications`). | services/tenant/types.ts:197 |
| <a id="property-ui_address-2"></a> `ui_address?` | [`FlexKey`](#flexkey) | UI address reference (FK to `vnet_addresses`). | services/tenant/types.ts:200 |
| <a id="property-ui_fqdn-2"></a> `ui_fqdn?` | [`FlexKey`](#flexkey) | UI FQDN reference (FK to `vnet_proxy_tenants`). | services/tenant/types.ts:203 |
| <a id="property-help_url-2"></a> `help_url?` | `string` | Custom help URL. | services/tenant/types.ts:206 |
| <a id="property-note-10"></a> `note?` | `string` | User-facing note. Max 1024 characters. | services/tenant/types.ts:209 |
| <a id="property-theme_access-2"></a> `theme_access?` | [`ThemeAccess`](#themeaccess) | Theme access mode. | services/tenant/types.ts:212 |

***

### TenantCloneOptions

Defined in: services/tenant/types.ts:224

Options for the tenant clone action.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-102"></a> `name?` | `string` | Name for the cloned tenant. | services/tenant/types.ts:226 |
| <a id="property-no_vnet"></a> `no_vnet?` | `boolean` | Whether to exclude virtual networks from the clone. | services/tenant/types.ts:229 |
| <a id="property-no_storage"></a> `no_storage?` | `boolean` | Whether to exclude storage from the clone. | services/tenant/types.ts:232 |
| <a id="property-no_nodes"></a> `no_nodes?` | `boolean` | Whether to exclude nodes from the clone. | services/tenant/types.ts:235 |

***

### UpdateBranch

Defined in: services/update-branch/types.ts:12

A VergeOS update branch resource (read-only).

Update branches represent release channels for updates.
Display field is `description` (not `name`).
Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-103"></a> `name` | `string` | Unique branch identifier. | - | services/update-branch/types.ts:14 |
| <a id="property-description-104"></a> `description?` | `string` | Human-readable branch description (display field). | - | services/update-branch/types.ts:17 |
| <a id="property-created-20"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/update-branch/types.ts:20 |
| <a id="property-key-75"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### UpdateSettings

Defined in: services/update-settings/types.ts:11

VergeOS update settings resource (singleton — max 1 row, key always `1`).

Controls how the system checks for, downloads, and installs updates.
Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-source"></a> `source?` | [`FlexKey`](#flexkey) | Update source (FK → `update_sources`). | - | services/update-settings/types.ts:13 |
| <a id="property-file"></a> `file?` | [`FlexKey`](#flexkey) | ISO file for manual update (FK → `files`). | - | services/update-settings/types.ts:16 |
| <a id="property-branch-2"></a> `branch?` | [`FlexKey`](#flexkey) | Update branch (FK → `update_branches`). | - | services/update-settings/types.ts:19 |
| <a id="property-name-104"></a> `name?` | `string` | Display name. | - | services/update-settings/types.ts:22 |
| <a id="property-user-12"></a> `user?` | `string` | Credentials user for the update source. | - | services/update-settings/types.ts:25 |
| <a id="property-password-12"></a> `password?` | `string` | Credentials password for the update source. | - | services/update-settings/types.ts:28 |
| <a id="property-auto_refresh-3"></a> `auto_refresh?` | `boolean` | Whether to automatically refresh available updates. | - | services/update-settings/types.ts:31 |
| <a id="property-auto_update"></a> `auto_update?` | `boolean` | Whether to automatically download available updates. | - | services/update-settings/types.ts:34 |
| <a id="property-auto_reboot"></a> `auto_reboot?` | `boolean` | Whether to automatically reboot after installing updates. | - | services/update-settings/types.ts:37 |
| <a id="property-update_time"></a> `update_time?` | `string` | Preferred time for automatic updates (HH:MM format). | - | services/update-settings/types.ts:40 |
| <a id="property-max_vsan_usage"></a> `max_vsan_usage?` | `number` | Maximum vSAN usage percentage allowed during updates. | - | services/update-settings/types.ts:43 |
| <a id="property-warm_reboot"></a> `warm_reboot?` | `boolean` | Whether to use warm reboot when possible. | - | services/update-settings/types.ts:46 |
| <a id="property-multi_cluster_update"></a> `multi_cluster_update?` | `boolean` | Whether to update multiple clusters simultaneously. | - | services/update-settings/types.ts:49 |
| <a id="property-snapshot_cloud_on_update"></a> `snapshot_cloud_on_update?` | `boolean` | Whether to create a cloud snapshot before updating. | - | services/update-settings/types.ts:52 |
| <a id="property-snapshot_cloud_expire_seconds"></a> `snapshot_cloud_expire_seconds?` | `number` | Snapshot expiration period in seconds when created before updates. Default: `21600`. | - | services/update-settings/types.ts:55 |
| <a id="property-release_notes_url"></a> `release_notes_url?` | `string` | URL for release notes. Read-only. | - | services/update-settings/types.ts:58 |
| <a id="property-anonymize_statistics"></a> `anonymize_statistics?` | `boolean` | Whether to anonymize statistics sent to the update server. | - | services/update-settings/types.ts:61 |
| <a id="property-installed"></a> `installed?` | `boolean` | Currently installed version. Read-only. | - | services/update-settings/types.ts:64 |
| <a id="property-reboot_required"></a> `reboot_required?` | `boolean` | Whether a reboot is required after the latest install. Read-only. | - | services/update-settings/types.ts:67 |
| <a id="property-applying_updates"></a> `applying_updates?` | `boolean` | Whether updates are currently being applied. Read-only. | - | services/update-settings/types.ts:70 |
| <a id="property-applying_updates_force"></a> `applying_updates_force?` | `boolean` | Whether to force applying updates. Read-only. | - | services/update-settings/types.ts:73 |
| <a id="property-key-76"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### UpdateSettingsUpdateParams

Defined in: services/update-settings/types.ts:84

Parameters for updating the system update settings.

All fields are optional — only provided fields are changed.
Read-only fields (`installed`, `reboot_required`, `applying_updates*`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-source-1"></a> `source?` | [`FlexKey`](#flexkey) | Update source (FK → `update_sources`). | services/update-settings/types.ts:86 |
| <a id="property-file-1"></a> `file?` | [`FlexKey`](#flexkey) | ISO file for manual update (FK → `files`). | services/update-settings/types.ts:89 |
| <a id="property-branch-3"></a> `branch?` | [`FlexKey`](#flexkey) | Update branch (FK → `update_branches`). | services/update-settings/types.ts:92 |
| <a id="property-name-105"></a> `name?` | `string` | Display name. | services/update-settings/types.ts:95 |
| <a id="property-user-13"></a> `user?` | `string` | Credentials user. | services/update-settings/types.ts:98 |
| <a id="property-password-13"></a> `password?` | `string` | Credentials password. | services/update-settings/types.ts:101 |
| <a id="property-auto_refresh-4"></a> `auto_refresh?` | `boolean` | Whether to automatically refresh available updates. | services/update-settings/types.ts:104 |
| <a id="property-auto_update-1"></a> `auto_update?` | `boolean` | Whether to automatically download available updates. | services/update-settings/types.ts:107 |
| <a id="property-auto_reboot-1"></a> `auto_reboot?` | `boolean` | Whether to automatically reboot after installing updates. | services/update-settings/types.ts:110 |
| <a id="property-update_time-1"></a> `update_time?` | `string` | Preferred time for automatic updates (HH:MM format). | services/update-settings/types.ts:113 |
| <a id="property-max_vsan_usage-1"></a> `max_vsan_usage?` | `number` | Maximum vSAN usage percentage allowed during updates. | services/update-settings/types.ts:116 |
| <a id="property-warm_reboot-1"></a> `warm_reboot?` | `boolean` | Whether to use warm reboot when possible. | services/update-settings/types.ts:119 |
| <a id="property-multi_cluster_update-1"></a> `multi_cluster_update?` | `boolean` | Whether to update multiple clusters simultaneously. | services/update-settings/types.ts:122 |
| <a id="property-snapshot_cloud_on_update-1"></a> `snapshot_cloud_on_update?` | `boolean` | Whether to create a cloud snapshot before updating. | services/update-settings/types.ts:125 |
| <a id="property-snapshot_cloud_expire_seconds-1"></a> `snapshot_cloud_expire_seconds?` | `number` | Snapshot expiration period in seconds when created before updates. | services/update-settings/types.ts:128 |
| <a id="property-anonymize_statistics-1"></a> `anonymize_statistics?` | `boolean` | Whether to anonymize statistics sent to the update server. | services/update-settings/types.ts:131 |

***

### UpdateSourcePackage

Defined in: services/update-source-package/types.ts:11

A VergeOS update source package resource (read-only).

Represents an available update package from an update source within a branch.
Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-106"></a> `name` | `string` | Package name. | - | services/update-source-package/types.ts:13 |
| <a id="property-description-105"></a> `description?` | `string` | Human-readable description. | - | services/update-source-package/types.ts:16 |
| <a id="property-branch-4"></a> `branch` | [`FlexKey`](#flexkey) | Branch this package belongs to (FK → `update_branches`). | - | services/update-source-package/types.ts:19 |
| <a id="property-source-2"></a> `source` | [`FlexKey`](#flexkey) | Update source this package comes from (FK → `update_sources`). | - | services/update-source-package/types.ts:22 |
| <a id="property-version-5"></a> `version` | `string` | Package version string. | - | services/update-source-package/types.ts:25 |
| <a id="property-downloaded-2"></a> `downloaded?` | `boolean` | Whether the package has been downloaded. | - | services/update-source-package/types.ts:28 |
| <a id="property-type-22"></a> `type?` | `string` | Package type (e.g., `'ybpkg'`). | - | services/update-source-package/types.ts:31 |
| <a id="property-optional-3"></a> `optional?` | `boolean` | Whether the package is optional. | - | services/update-source-package/types.ts:34 |
| <a id="property-require_license_feature"></a> `require_license_feature?` | `string` | License feature required to install this package. | - | services/update-source-package/types.ts:37 |
| <a id="property-signature"></a> `signature?` | `string` | GPG signature. Read-only. | - | services/update-source-package/types.ts:40 |
| <a id="property-created-21"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/update-source-package/types.ts:43 |
| <a id="property-key-77"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### UpdateSource

Defined in: services/update-source/types.ts:22

A VergeOS update source resource.

Update sources are the servers from which the system downloads updates.
Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-107"></a> `name` | `string` | Unique name of the update source. | - | services/update-source/types.ts:24 |
| <a id="property-description-106"></a> `description?` | `string` | Human-readable description. | - | services/update-source/types.ts:27 |
| <a id="property-url-15"></a> `url` | `string` | URL of the update source server. | - | services/update-source/types.ts:30 |
| <a id="property-user-14"></a> `user?` | `string` | Authentication username. | - | services/update-source/types.ts:33 |
| <a id="property-password-14"></a> `password?` | `string` | Authentication password. | - | services/update-source/types.ts:36 |
| <a id="property-enabled-59"></a> `enabled?` | `boolean` | Whether this source is enabled. | - | services/update-source/types.ts:39 |
| <a id="property-last_updated"></a> `last_updated?` | `number` | Last time the source was updated (Unix epoch timestamp). Read-only. | - | services/update-source/types.ts:42 |
| <a id="property-last_refreshed-1"></a> `last_refreshed?` | `number` | Last time the source was refreshed (Unix epoch timestamp). Read-only. | - | services/update-source/types.ts:45 |
| <a id="property-status-19"></a> `status?` | [`FlexKey`](#flexkey) | Status record (FK → `update_source_status`). Read-only. | - | services/update-source/types.ts:48 |
| <a id="property-key-78"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### UpdateSourceCreateParams

Defined in: services/update-source/types.ts:56

Parameters for creating a new update source.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-108"></a> `name` | `string` | Unique name for the update source. Required. | services/update-source/types.ts:58 |
| <a id="property-description-107"></a> `description?` | `string` | Human-readable description. | services/update-source/types.ts:61 |
| <a id="property-url-16"></a> `url` | `string` | URL of the update source server. Required. | services/update-source/types.ts:64 |
| <a id="property-user-15"></a> `user?` | `string` | Authentication username. | services/update-source/types.ts:67 |
| <a id="property-password-15"></a> `password?` | `string` | Authentication password. | services/update-source/types.ts:70 |
| <a id="property-enabled-60"></a> `enabled?` | `boolean` | Whether this source is enabled. Default: `true`. | services/update-source/types.ts:73 |

***

### UpdateSourceUpdateParams

Defined in: services/update-source/types.ts:83

Parameters for updating an existing update source.

All fields are optional — only provided fields are changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-109"></a> `name?` | `string` | Unique name for the update source. | services/update-source/types.ts:85 |
| <a id="property-description-108"></a> `description?` | `string` | Human-readable description. | services/update-source/types.ts:88 |
| <a id="property-url-17"></a> `url?` | `string` | URL of the update source server. | services/update-source/types.ts:91 |
| <a id="property-user-16"></a> `user?` | `string` | Authentication username. | services/update-source/types.ts:94 |
| <a id="property-password-16"></a> `password?` | `string` | Authentication password. | services/update-source/types.ts:97 |
| <a id="property-enabled-61"></a> `enabled?` | `boolean` | Whether this source is enabled. | services/update-source/types.ts:100 |

***

### User

Defined in: services/user/types.ts:22

A VergeOS user resource.

Users represent accounts that can authenticate and interact with the VergeOS
system. Each user has credentials, optional two-factor authentication, and
can be assigned to groups with specific permissions.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-110"></a> `name` | `string` | Username. Min 1, max 128 characters. Unique. | - | services/user/types.ts:24 |
| <a id="property-id-13"></a> `id?` | `string` | 40-character unique identifier string. Read-only. | - | services/user/types.ts:27 |
| <a id="property-auth_source-1"></a> `auth_source?` | [`FlexKey`](#flexkey) | Authorization source reference (FK to `auth_sources`). Read-only. | - | services/user/types.ts:30 |
| <a id="property-remote_name"></a> `remote_name?` | `string` | Remote username for external auth sources. | - | services/user/types.ts:33 |
| <a id="property-enabled-62"></a> `enabled?` | `boolean` | Whether the user account is enabled. Default: `true`. | - | services/user/types.ts:36 |
| <a id="property-displayname-3"></a> `displayname?` | `string` | Display name. | - | services/user/types.ts:39 |
| <a id="property-email-6"></a> `email?` | `string` | Email address. | - | services/user/types.ts:42 |
| <a id="property-type-23"></a> `type?` | [`UserType`](#usertype) | User type classification. Read-only. | - | services/user/types.ts:45 |
| <a id="property-created-22"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/user/types.ts:48 |
| <a id="property-change_password-3"></a> `change_password?` | `boolean` | Whether user must change password on next login. Default: `false`. | - | services/user/types.ts:51 |
| <a id="property-physical_access"></a> `physical_access?` | `boolean` | Whether user has physical access to hardware. Default: `false`. | - | services/user/types.ts:54 |
| <a id="property-ssh_keys"></a> `ssh_keys?` | `string` | SSH public keys. | - | services/user/types.ts:57 |
| <a id="property-failed_attempts"></a> `failed_attempts?` | `number` | Number of consecutive failed login attempts. | - | services/user/types.ts:60 |
| <a id="property-account_locked"></a> `account_locked?` | `number` | Timestamp when account was locked (0 = not locked). | - | services/user/types.ts:63 |
| <a id="property-last_login"></a> `last_login?` | `number` | Last login timestamp. Read-only. | - | services/user/types.ts:66 |
| <a id="property-last_forgot_password"></a> `last_forgot_password?` | `number` | Last forgot password request timestamp. | - | services/user/types.ts:69 |
| <a id="property-last_forgot_username"></a> `last_forgot_username?` | `number` | Last forgot username request timestamp. | - | services/user/types.ts:72 |
| <a id="property-two_factor_authentication"></a> `two_factor_authentication?` | `boolean` | Whether two-factor authentication is enabled. | - | services/user/types.ts:75 |
| <a id="property-two_factor_type"></a> `two_factor_type?` | [`TwoFactorType`](#twofactortype) | Two-factor authentication method. Default: `email`. | - | services/user/types.ts:78 |
| <a id="property-two_factor_setup_next_login"></a> `two_factor_setup_next_login?` | `boolean` | Whether to configure 2FA at next login. Default: `false`. | - | services/user/types.ts:81 |
| <a id="property-theme-2"></a> `theme?` | [`FlexKey`](#flexkey) | Theme override reference (FK to `themes`). | - | services/user/types.ts:84 |
| <a id="property-identity-3"></a> `identity?` | [`FlexKey`](#flexkey) | Identity reference (FK to `/sys/identities`). Read-only. | - | services/user/types.ts:87 |
| <a id="property-credential-1"></a> `credential?` | [`FlexKey`](#flexkey) | Credential reference (FK to `/sys/credentials`). Read-only. | - | services/user/types.ts:90 |
| <a id="property-settings-1"></a> `settings?` | [`FlexKey`](#flexkey) | User settings reference (FK to `user_settings`). Read-only. | - | services/user/types.ts:93 |
| <a id="property-creator-11"></a> `creator?` | `string` | User who created this account. Read-only. | - | services/user/types.ts:96 |
| <a id="property-key-79"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### UserCreateParams

Defined in: services/user/types.ts:108

Parameters for creating a new user.

`name` and `password` are required. Read-only fields (`id`, `auth_source`,
`type`, `created`, `last_login`, `identity`, `credential`, `settings`,
`creator`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-111"></a> `name` | `string` | Username. Min 1, max 128 characters. Must be unique. | services/user/types.ts:110 |
| <a id="property-password-17"></a> `password` | `string` | Password. Min 1, max 256 characters. Write-only — not returned in responses. | services/user/types.ts:113 |
| <a id="property-remote_name-1"></a> `remote_name?` | `string` | Remote username for external auth sources. | services/user/types.ts:116 |
| <a id="property-enabled-63"></a> `enabled?` | `boolean` | Whether the user account is enabled. Default: `true`. | services/user/types.ts:119 |
| <a id="property-displayname-4"></a> `displayname?` | `string` | Display name. | services/user/types.ts:122 |
| <a id="property-email-7"></a> `email?` | `string` | Email address. | services/user/types.ts:125 |
| <a id="property-change_password-4"></a> `change_password?` | `boolean` | Whether user must change password on next login. Default: `false`. | services/user/types.ts:128 |
| <a id="property-physical_access-1"></a> `physical_access?` | `boolean` | Whether user has physical access to hardware. Default: `false`. | services/user/types.ts:131 |
| <a id="property-ssh_keys-1"></a> `ssh_keys?` | `string` | SSH public keys. | services/user/types.ts:134 |
| <a id="property-two_factor_authentication-1"></a> `two_factor_authentication?` | `boolean` | Whether two-factor authentication is enabled. | services/user/types.ts:137 |
| <a id="property-two_factor_type-1"></a> `two_factor_type?` | [`TwoFactorType`](#twofactortype) | Two-factor authentication method. | services/user/types.ts:140 |
| <a id="property-two_factor_setup_next_login-1"></a> `two_factor_setup_next_login?` | `boolean` | Whether to configure 2FA at next login. Default: `false`. | services/user/types.ts:143 |
| <a id="property-theme-3"></a> `theme?` | [`FlexKey`](#flexkey) | Theme override reference (FK to `themes`). | services/user/types.ts:146 |

***

### UserUpdateParams

Defined in: services/user/types.ts:157

Parameters for updating an existing user.

All fields are optional — only provided fields are changed.
Read-only fields are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-112"></a> `name?` | `string` | Username. Min 1, max 128 characters. Must be unique. | services/user/types.ts:159 |
| <a id="property-password-18"></a> `password?` | `string` | New password. Min 1, max 256 characters. Write-only. | services/user/types.ts:162 |
| <a id="property-remote_name-2"></a> `remote_name?` | `string` | Remote username for external auth sources. | services/user/types.ts:165 |
| <a id="property-enabled-64"></a> `enabled?` | `boolean` | Whether the user account is enabled. | services/user/types.ts:168 |
| <a id="property-displayname-5"></a> `displayname?` | `string` | Display name. | services/user/types.ts:171 |
| <a id="property-email-8"></a> `email?` | `string` | Email address. | services/user/types.ts:174 |
| <a id="property-change_password-5"></a> `change_password?` | `boolean` | Whether user must change password on next login. | services/user/types.ts:177 |
| <a id="property-physical_access-2"></a> `physical_access?` | `boolean` | Whether user has physical access to hardware. | services/user/types.ts:180 |
| <a id="property-ssh_keys-2"></a> `ssh_keys?` | `string` | SSH public keys. | services/user/types.ts:183 |
| <a id="property-failed_attempts-1"></a> `failed_attempts?` | `number` | Number of consecutive failed login attempts. | services/user/types.ts:186 |
| <a id="property-account_locked-1"></a> `account_locked?` | `number` | Timestamp when account was locked (0 = not locked). | services/user/types.ts:189 |
| <a id="property-two_factor_authentication-2"></a> `two_factor_authentication?` | `boolean` | Whether two-factor authentication is enabled. | services/user/types.ts:192 |
| <a id="property-two_factor_type-2"></a> `two_factor_type?` | [`TwoFactorType`](#twofactortype) | Two-factor authentication method. | services/user/types.ts:195 |
| <a id="property-two_factor_setup_next_login-2"></a> `two_factor_setup_next_login?` | `boolean` | Whether to configure 2FA at next login. | services/user/types.ts:198 |
| <a id="property-theme-4"></a> `theme?` | [`FlexKey`](#flexkey) | Theme override reference (FK to `themes`). | services/user/types.ts:201 |

***

### VMRecipeInstance

Defined in: services/vm-recipe-instance/types.ts:12

A VergeOS VM recipe instance resource.

VM recipe instances represent deployed instances of VM recipes.
They are created when a VM recipe is deployed and track the
relationship between the recipe and the resulting VM.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-recipe-2"></a> `recipe` | [`FlexKey`](#flexkey) | Parent recipe (FK to `vm_recipes`). Read-only. | - | services/vm-recipe-instance/types.ts:14 |
| <a id="property-vm-1"></a> `vm?` | [`FlexKey`](#flexkey) | Associated VM (FK to `vms`). Read-only. | - | services/vm-recipe-instance/types.ts:17 |
| <a id="property-version-6"></a> `version?` | `string` | Recipe version string. | - | services/vm-recipe-instance/types.ts:20 |
| <a id="property-build-4"></a> `build?` | `number` | Recipe build number. | - | services/vm-recipe-instance/types.ts:23 |
| <a id="property-answers-3"></a> `answers?` | `Record`\<`string`, `unknown`\> | Answers to recipe questions (JSON). | - | services/vm-recipe-instance/types.ts:26 |
| <a id="property-name-113"></a> `name` | `string` | Instance name. 1–128 chars. | - | services/vm-recipe-instance/types.ts:29 |
| <a id="property-update"></a> `update?` | `boolean` | Whether to trigger an update. | - | services/vm-recipe-instance/types.ts:32 |
| <a id="property-verify"></a> `verify?` | `boolean` | Whether to trigger verification. | - | services/vm-recipe-instance/types.ts:35 |
| <a id="property-simulate"></a> `simulate?` | `boolean` | Whether to run in simulation mode. | - | services/vm-recipe-instance/types.ts:38 |
| <a id="property-auto_update-2"></a> `auto_update?` | `boolean` | Whether to auto-update when the recipe changes. Default: `false`. | - | services/vm-recipe-instance/types.ts:41 |
| <a id="property-created-23"></a> `created?` | `number` | Creation timestamp. Read-only. | - | services/vm-recipe-instance/types.ts:44 |
| <a id="property-modified-22"></a> `modified?` | `number` | Last modification timestamp. Read-only. | - | services/vm-recipe-instance/types.ts:47 |
| <a id="property-key-80"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### VMRecipeInstanceCreateParams

Defined in: services/vm-recipe-instance/types.ts:53

Parameters for creating a VM recipe instance (deploying a recipe).

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-recipe-3"></a> `recipe` | [`FlexKey`](#flexkey) | Recipe key (40-char hex string FK to `vm_recipes`). Required. | services/vm-recipe-instance/types.ts:55 |
| <a id="property-name-114"></a> `name` | `string` | Instance name. Required. | services/vm-recipe-instance/types.ts:58 |
| <a id="property-answers-4"></a> `answers?` | `Record`\<`string`, `unknown`\> | Answers to recipe questions, keyed by question name. | services/vm-recipe-instance/types.ts:61 |
| <a id="property-auto_update-3"></a> `auto_update?` | `boolean` | Whether to auto-update when the recipe changes. | services/vm-recipe-instance/types.ts:64 |

***

### VMRecipeInstanceUpdateParams

Defined in: services/vm-recipe-instance/types.ts:70

Parameters for updating a VM recipe instance.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-115"></a> `name?` | `string` | Instance name. | services/vm-recipe-instance/types.ts:72 |
| <a id="property-answers-5"></a> `answers?` | `Record`\<`string`, `unknown`\> | Answers to recipe questions. | services/vm-recipe-instance/types.ts:75 |
| <a id="property-update-1"></a> `update?` | `boolean` | Whether to trigger an update. | services/vm-recipe-instance/types.ts:78 |
| <a id="property-verify-1"></a> `verify?` | `boolean` | Whether to trigger verification. | services/vm-recipe-instance/types.ts:81 |
| <a id="property-simulate-1"></a> `simulate?` | `boolean` | Whether to run in simulation mode. | services/vm-recipe-instance/types.ts:84 |
| <a id="property-auto_update-4"></a> `auto_update?` | `boolean` | Whether to auto-update when the recipe changes. | services/vm-recipe-instance/types.ts:87 |

***

### RecipeQuestion

Defined in: services/vm-recipe/types.ts:65

A recipe question resource.

Questions define the input fields shown when deploying a recipe.
They are shared between VM and tenant recipes via a generic
`recipe` FK reference string (e.g., `"vm_recipes/{key}"`).

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-recipe-4"></a> `recipe?` | `string` | Parent recipe reference (e.g., `"vm_recipes/{key}"`). Read-only. | - | services/vm-recipe/types.ts:67 |
| <a id="property-section"></a> `section?` | [`FlexKey`](#flexkey) | Parent section (FK to `recipe_sections`). | - | services/vm-recipe/types.ts:70 |
| <a id="property-name-116"></a> `name` | `string` | Question identifier name. 1–64 chars, unique within recipe. | - | services/vm-recipe/types.ts:73 |
| <a id="property-orderid-18"></a> `orderid?` | `number` | Display order within section. | - | services/vm-recipe/types.ts:76 |
| <a id="property-display"></a> `display?` | `string` | Display label shown in UI. | - | services/vm-recipe/types.ts:79 |
| <a id="property-hint"></a> `hint?` | `string` | Placeholder hint text. | - | services/vm-recipe/types.ts:82 |
| <a id="property-help"></a> `help?` | `string` | Tooltip help text. | - | services/vm-recipe/types.ts:85 |
| <a id="property-note-11"></a> `note?` | `string` | Note text. | - | services/vm-recipe/types.ts:88 |
| <a id="property-type-24"></a> `type` | [`RecipeQuestionType`](#recipequestiontype) | Question input type. | - | services/vm-recipe/types.ts:91 |
| <a id="property-database_context"></a> `database_context?` | [`RecipeDatabaseContext`](#recipedatabasecontext) | Database context for database-type questions. Default: `"tenant"`. | - | services/vm-recipe/types.ts:94 |
| <a id="property-default"></a> `default?` | `string` | Default value. | - | services/vm-recipe/types.ts:97 |
| <a id="property-table-4"></a> `table?` | `string` | Database table name (for database-type questions). | - | services/vm-recipe/types.ts:100 |
| <a id="property-filter"></a> `filter?` | `string` | Database filter expression. | - | services/vm-recipe/types.ts:103 |
| <a id="property-fields"></a> `fields?` | `string` | Database fields list. | - | services/vm-recipe/types.ts:106 |
| <a id="property-regex"></a> `regex?` | `string` | Regex validation pattern. | - | services/vm-recipe/types.ts:109 |
| <a id="property-required"></a> `required?` | `boolean` | Whether the question requires an answer. | - | services/vm-recipe/types.ts:112 |
| <a id="property-min"></a> `min?` | `number` | Minimum value. | - | services/vm-recipe/types.ts:115 |
| <a id="property-max"></a> `max?` | `number` | Maximum value. | - | services/vm-recipe/types.ts:118 |
| <a id="property-normalize"></a> `normalize?` | `number` | Normalization value. | - | services/vm-recipe/types.ts:121 |
| <a id="property-postprocess_string"></a> `postprocess_string?` | [`RecipeQuestionPostprocess`](#recipequestionpostprocess) | Post-processing transformation. Default: `"none"`. | - | services/vm-recipe/types.ts:124 |
| <a id="property-list-3"></a> `list?` | `unknown` | List of options (for list-type questions). | - | services/vm-recipe/types.ts:127 |
| <a id="property-enabled-65"></a> `enabled?` | `boolean` | Whether the question is enabled. Default: `true`. | - | services/vm-recipe/types.ts:130 |
| <a id="property-hide_none"></a> `hide_none?` | `boolean` | Whether to hide the "none" option. Default: `false`. | - | services/vm-recipe/types.ts:133 |
| <a id="property-readonly-3"></a> `readonly?` | `boolean` | Whether the question is read-only. Default: `false`. | - | services/vm-recipe/types.ts:136 |
| <a id="property-dont_store"></a> `dont_store?` | `boolean` | Whether to skip storing the answer. Default: `false`. | - | services/vm-recipe/types.ts:139 |
| <a id="property-system-2"></a> `system?` | `boolean` | Whether this is a system question. Default: `false`. | - | services/vm-recipe/types.ts:142 |
| <a id="property-system_default"></a> `system_default?` | `boolean` | Whether this uses the system default. | - | services/vm-recipe/types.ts:145 |
| <a id="property-conditions"></a> `conditions?` | `unknown` | Visibility conditions (JSON array). | - | services/vm-recipe/types.ts:148 |
| <a id="property-on_change"></a> `on_change?` | `unknown` | On-change handler configuration. | - | services/vm-recipe/types.ts:151 |
| <a id="property-autocomplete"></a> `autocomplete?` | `string` | Autocomplete hint. | - | services/vm-recipe/types.ts:154 |
| <a id="property-modified-23"></a> `modified?` | `number` | Last modification timestamp. Read-only. | - | services/vm-recipe/types.ts:157 |
| <a id="property-key-81"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### RecipeSection

Defined in: services/vm-recipe/types.ts:169

A recipe section resource.

Sections group questions together in the recipe deployment form.
They are shared between VM and tenant recipes via a generic
`recipe` FK reference string.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-recipe-5"></a> `recipe?` | `string` | Parent recipe reference (e.g., `"vm_recipes/{key}"`). Read-only. | - | services/vm-recipe/types.ts:171 |
| <a id="property-orderid-19"></a> `orderid?` | `number` | Display order. | - | services/vm-recipe/types.ts:174 |
| <a id="property-name-117"></a> `name` | `string` | Section name. 1–128 chars, unique within recipe. | - | services/vm-recipe/types.ts:177 |
| <a id="property-description-109"></a> `description?` | `string` | Section description. 0–2048 chars. | - | services/vm-recipe/types.ts:180 |
| <a id="property-key-82"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### VMRecipe

Defined in: services/vm-recipe/types.ts:199

A VergeOS VM recipe resource.

VM recipes are marketplace templates for deploying virtual machines.
They are managed by the catalog system — create is not supported via
the SDK. Supports list, get, update, and delete operations.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id-14"></a> `id?` | `string` | 40-character hex string identifier. Read-only. | - | services/vm-recipe/types.ts:201 |
| <a id="property-name-118"></a> `name` | `string` | Recipe name. 1–128 chars. | - | services/vm-recipe/types.ts:204 |
| <a id="property-icon-2"></a> `icon?` | `string` | Recipe icon identifier. | - | services/vm-recipe/types.ts:207 |
| <a id="property-description-110"></a> `description?` | `string` | Recipe description. 0–2048 chars. | - | services/vm-recipe/types.ts:210 |
| <a id="property-catalog-1"></a> `catalog` | [`FlexKey`](#flexkey) | Parent catalog (FK to `catalogs`). | - | services/vm-recipe/types.ts:213 |
| <a id="property-status-20"></a> `status?` | [`FlexKey`](#flexkey) | Recipe status (FK to `recipe_status`). Read-only. | - | services/vm-recipe/types.ts:216 |
| <a id="property-vm_snapshot"></a> `vm_snapshot?` | [`FlexKey`](#flexkey) | Associated VM snapshot (FK to `vms`). | - | services/vm-recipe/types.ts:219 |
| <a id="property-vm-2"></a> `vm?` | [`FlexKey`](#flexkey) | Associated VM (FK to `vms`). | - | services/vm-recipe/types.ts:222 |
| <a id="property-downloaded-3"></a> `downloaded?` | `boolean` | Whether the recipe has been downloaded. Default: `false`. | - | services/vm-recipe/types.ts:225 |
| <a id="property-update_available-2"></a> `update_available?` | `boolean` | Whether an update is available. Default: `false`. | - | services/vm-recipe/types.ts:228 |
| <a id="property-needs_republish-2"></a> `needs_republish?` | `boolean` | Whether the recipe needs republishing. Default: `false`. | - | services/vm-recipe/types.ts:231 |
| <a id="property-version-7"></a> `version?` | `string` | Recipe version string. Default: `"1.0.0"`. | - | services/vm-recipe/types.ts:234 |
| <a id="property-build-5"></a> `build?` | `number` | Recipe build number. Default: `0`. | - | services/vm-recipe/types.ts:237 |
| <a id="property-dependencies-2"></a> `dependencies?` | `string` | Recipe dependencies. | - | services/vm-recipe/types.ts:240 |
| <a id="property-size-1"></a> `size?` | `number` | Total size in bytes. Default: `0`. | - | services/vm-recipe/types.ts:243 |
| <a id="property-assets"></a> `assets?` | `unknown` | Recipe assets (JSON). | - | services/vm-recipe/types.ts:246 |
| <a id="property-question_assets"></a> `question_assets?` | `boolean` | Whether the recipe has question assets. Default: `false`. | - | services/vm-recipe/types.ts:249 |
| <a id="property-creator-12"></a> `creator?` | `string` | Recipe creator. Read-only. | - | services/vm-recipe/types.ts:252 |
| <a id="property-key-83"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### VMRecipeUpdateParams

Defined in: services/vm-recipe/types.ts:258

Parameters for updating an existing VM recipe.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-119"></a> `name?` | `string` | Recipe name. | services/vm-recipe/types.ts:260 |
| <a id="property-icon-3"></a> `icon?` | `string` | Recipe icon identifier. | services/vm-recipe/types.ts:263 |
| <a id="property-description-111"></a> `description?` | `string` | Recipe description. | services/vm-recipe/types.ts:266 |
| <a id="property-vm_snapshot-1"></a> `vm_snapshot?` | [`FlexKey`](#flexkey) | Associated VM snapshot (FK to `vms`). | services/vm-recipe/types.ts:269 |
| <a id="property-vm-3"></a> `vm?` | [`FlexKey`](#flexkey) | Associated VM (FK to `vms`). | services/vm-recipe/types.ts:272 |
| <a id="property-version-8"></a> `version?` | `string` | Recipe version string. | services/vm-recipe/types.ts:275 |
| <a id="property-build-6"></a> `build?` | `number` | Recipe build number. | services/vm-recipe/types.ts:278 |
| <a id="property-downloaded-4"></a> `downloaded?` | `boolean` | Whether the recipe has been downloaded. | services/vm-recipe/types.ts:281 |
| <a id="property-update_available-3"></a> `update_available?` | `boolean` | Whether an update is available. | services/vm-recipe/types.ts:284 |
| <a id="property-needs_republish-3"></a> `needs_republish?` | `boolean` | Whether the recipe needs republishing. | services/vm-recipe/types.ts:287 |
| <a id="property-dependencies-3"></a> `dependencies?` | `string` | Recipe dependencies. | services/vm-recipe/types.ts:290 |
| <a id="property-size-2"></a> `size?` | `number` | Total size in bytes. | services/vm-recipe/types.ts:293 |
| <a id="property-assets-1"></a> `assets?` | `unknown` | Recipe assets (JSON). | services/vm-recipe/types.ts:296 |
| <a id="property-question_assets-1"></a> `question_assets?` | `boolean` | Whether the recipe has question assets. | services/vm-recipe/types.ts:299 |

***

### VMRecipeDeployOptions

Defined in: services/vm-recipe/types.ts:305

Options for deploying a VM recipe instance.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-120"></a> `name` | `string` | Name for the deployed instance. | services/vm-recipe/types.ts:307 |
| <a id="property-answers-6"></a> `answers?` | `Record`\<`string`, `unknown`\> | Answers to recipe questions, keyed by question name. | services/vm-recipe/types.ts:310 |
| <a id="property-auto_update-5"></a> `auto_update?` | `boolean` | Whether to auto-update the instance when the recipe changes. | services/vm-recipe/types.ts:313 |

***

### VM

Defined in: services/vm/types.ts:63

A VergeOS virtual machine resource.

Field names use snake_case to match the VergeOS API exactly.
Read-only fields are included since they appear in GET responses.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-121"></a> `name` | `string` | VM display name. Min 1, max 128 characters. Unique within the system. | - | services/vm/types.ts:65 |
| <a id="property-description-112"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/vm/types.ts:68 |
| <a id="property-enabled-66"></a> `enabled?` | `boolean` | Whether the VM is enabled. | - | services/vm/types.ts:71 |
| <a id="property-is_snapshot-7"></a> `is_snapshot?` | `boolean` | Whether this resource is a snapshot of another VM. | - | services/vm/types.ts:74 |
| <a id="property-owner-16"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference (FK). | - | services/vm/types.ts:77 |
| <a id="property-owner_user"></a> `owner_user?` | [`FlexKey`](#flexkey) | Owner user reference (FK to `users`). | - | services/vm/types.ts:80 |
| <a id="property-machine_type-1"></a> `machine_type?` | `string` | QEMU machine type (e.g., `pc-q35-10.0`). | - | services/vm/types.ts:83 |
| <a id="property-allow_hotplug"></a> `allow_hotplug?` | `boolean` | Whether hot-plug of devices is allowed. | - | services/vm/types.ts:86 |
| <a id="property-guest_agent"></a> `guest_agent?` | `boolean` | Whether the QEMU guest agent is enabled. | - | services/vm/types.ts:89 |
| <a id="property-powerstate-3"></a> `powerstate?` | `boolean` | Current power state. `true` = powered on. **Note:** The API often omits this field on VM responses. For reliable power state, use [MachineStatus](#machinestatus) via `client.machineStatuses.getByMachine()`. | - | services/vm/types.ts:97 |
| <a id="property-on_power_loss-6"></a> `on_power_loss?` | [`OnPowerLoss`](#onpowerloss) | Behavior when host power is restored. | - | services/vm/types.ts:100 |
| <a id="property-disable_powercycle"></a> `disable_powercycle?` | `boolean` | Whether power-cycle operations are disabled. | - | services/vm/types.ts:103 |
| <a id="property-cpu_cores-5"></a> `cpu_cores?` | `number` | Number of virtual CPU cores. Min 1, max 1024. | - | services/vm/types.ts:106 |
| <a id="property-ha_group-6"></a> `ha_group?` | `string` | HA group name. | - | services/vm/types.ts:109 |
| <a id="property-cluster-8"></a> `cluster?` | [`FlexKey`](#flexkey) | Primary cluster reference (FK to `clusters`). | - | services/vm/types.ts:112 |
| <a id="property-cluster_failover-6"></a> `cluster_failover?` | [`FlexKey`](#flexkey) | Failover cluster reference (FK to `clusters`). | - | services/vm/types.ts:115 |
| <a id="property-cpu_type"></a> `cpu_type?` | `string` | CPU emulation type (e.g., `host`, `EPYC`, `kvm64`). | - | services/vm/types.ts:118 |
| <a id="property-ram-6"></a> `ram?` | `number` | RAM in megabytes. Min 256, max 1048576. | - | services/vm/types.ts:121 |
| <a id="property-console"></a> `console?` | [`ConsoleType`](#consoletype) | Console display protocol. | - | services/vm/types.ts:124 |
| <a id="property-video"></a> `video?` | [`VideoType`](#videotype) | Video card emulation. | - | services/vm/types.ts:127 |
| <a id="property-sound"></a> `sound?` | [`SoundType`](#soundtype) | Sound card emulation. | - | services/vm/types.ts:130 |
| <a id="property-os_family-1"></a> `os_family?` | [`OSFamily`](#osfamily) | Guest OS family hint. | - | services/vm/types.ts:133 |
| <a id="property-os_description"></a> `os_description?` | `string` | Free-text OS description. Max 2048 characters. | - | services/vm/types.ts:136 |
| <a id="property-rtc_base"></a> `rtc_base?` | [`RTCBase`](#rtcbase) | Real-time clock base. | - | services/vm/types.ts:139 |
| <a id="property-boot_order"></a> `boot_order?` | [`BootOrder`](#bootorder) | Boot device priority order. | - | services/vm/types.ts:142 |
| <a id="property-console_pass_enabled"></a> `console_pass_enabled?` | `boolean` | Whether a console password is required. | - | services/vm/types.ts:145 |
| <a id="property-console_pass"></a> `console_pass?` | `string` | Console password. Min 1, max 256 characters. | - | services/vm/types.ts:148 |
| <a id="property-usb_tablet"></a> `usb_tablet?` | `boolean` | Whether a USB tablet device is attached (improves mouse tracking). | - | services/vm/types.ts:151 |
| <a id="property-uefi"></a> `uefi?` | `boolean` | Whether UEFI firmware is used instead of legacy BIOS. | - | services/vm/types.ts:154 |
| <a id="property-secure_boot"></a> `secure_boot?` | `boolean` | Whether UEFI Secure Boot is enabled. | - | services/vm/types.ts:157 |
| <a id="property-serial_port"></a> `serial_port?` | `boolean` | Whether a serial port is attached. | - | services/vm/types.ts:160 |
| <a id="property-boot_delay"></a> `boot_delay?` | `number` | Delay in seconds before boot. Min 0, max 60. | - | services/vm/types.ts:163 |
| <a id="property-preferred_node-6"></a> `preferred_node?` | [`FlexKey`](#flexkey) | Preferred node for scheduling (FK to `nodes`). | - | services/vm/types.ts:166 |
| <a id="property-snapshot_profile-1"></a> `snapshot_profile?` | [`FlexKey`](#flexkey) | Snapshot profile reference (FK to `snapshot_profiles`). | - | services/vm/types.ts:169 |
| <a id="property-meta-3"></a> `meta?` | `unknown` | Metadata JSON blob. Locked field. | - | services/vm/types.ts:172 |
| <a id="property-uuid-7"></a> `uuid?` | `string` | VM UUID string. | - | services/vm/types.ts:175 |
| <a id="property-advanced-3"></a> `advanced?` | `string` | Advanced QEMU properties string. | - | services/vm/types.ts:178 |
| <a id="property-need_restart-3"></a> `need_restart?` | `boolean` | Whether the VM needs a restart to apply pending changes. | - | services/vm/types.ts:181 |
| <a id="property-cloudinit_datasource"></a> `cloudinit_datasource?` | [`CloudInitDatasource`](#cloudinitdatasource) | Cloud-init metadata source. | - | services/vm/types.ts:184 |
| <a id="property-created_from"></a> `created_from?` | [`CreatedFrom`](#createdfrom) | How this VM was originally created. | - | services/vm/types.ts:187 |
| <a id="property-imported"></a> `imported?` | `boolean` | Whether this VM was imported. | - | services/vm/types.ts:190 |
| <a id="property-migration_method"></a> `migration_method?` | [`MigrationMethod`](#migrationmethod) | Live-migration strategy. | - | services/vm/types.ts:193 |
| <a id="property-note-12"></a> `note?` | `string` | User-facing note. Max 1024 characters. | - | services/vm/types.ts:196 |
| <a id="property-power_cycle_timeout"></a> `power_cycle_timeout?` | `number` | Timeout in seconds for power-cycle during migration. Min 0, max 65535. | - | services/vm/types.ts:199 |
| <a id="property-allow_export"></a> `allow_export?` | `boolean` | Whether the VM can be exported. | - | services/vm/types.ts:202 |
| <a id="property-paste_key_config"></a> `paste_key_config?` | [`FlexKey`](#flexkey) | Paste key mapping configuration (FK to `vm_paste_configs`). | - | services/vm/types.ts:205 |
| <a id="property-nested_virtualization"></a> `nested_virtualization?` | `boolean` | Whether nested virtualization is enabled. | - | services/vm/types.ts:208 |
| <a id="property-iommu-1"></a> `iommu?` | `boolean` | Whether an IOMMU device is attached. | - | services/vm/types.ts:211 |
| <a id="property-disable_hypervisor"></a> `disable_hypervisor?` | `boolean` | Whether the hypervisor flag is hidden from the guest. | - | services/vm/types.ts:214 |
| <a id="property-usb_legacy"></a> `usb_legacy?` | `boolean` | Whether to use a legacy USB controller for older operating systems. | - | services/vm/types.ts:217 |
| <a id="property-machine-17"></a> `machine?` | [`FlexKey`](#flexkey) | Machine reference (FK to `machines`). Read-only. | - | services/vm/types.ts:222 |
| <a id="property-recipe_instance-1"></a> `recipe_instance?` | [`FlexKey`](#flexkey) | Recipe instance reference (FK to `vm_recipe_instances`). Read-only. | - | services/vm/types.ts:225 |
| <a id="property-created-24"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/vm/types.ts:228 |
| <a id="property-modified-24"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/vm/types.ts:231 |
| <a id="property-console_status-1"></a> `console_status?` | [`FlexKey`](#flexkey) | Console status reference (FK to `machine_console`). Read-only. | - | services/vm/types.ts:234 |
| <a id="property-service-2"></a> `service?` | [`FlexKey`](#flexkey) | VM service reference (FK to `vm_services`). Read-only. | - | services/vm/types.ts:237 |
| <a id="property-creator-13"></a> `creator?` | `string` | User who created this VM. Read-only. | - | services/vm/types.ts:240 |
| <a id="property-status-21"></a> `status?` | `string` | Machine status value (joined from machine_status). Present in default list/get responses. | - | services/vm/types.ts:245 |
| <a id="property-running-1"></a> `running?` | `boolean` | Whether the VM is currently running (joined from machine_status). | - | services/vm/types.ts:248 |
| <a id="property-node_key"></a> `node_key?` | [`FlexKey`](#flexkey) | Node key where this VM is running (joined from machine_status). | - | services/vm/types.ts:251 |
| <a id="property-node_name"></a> `node_name?` | `string` | Node name where this VM is running (joined from machine_status). | - | services/vm/types.ts:254 |
| <a id="property-key-84"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### VMCreateParams

Defined in: services/vm/types.ts:268

Parameters for creating a new virtual machine.

Only `name` is required. The API provides sensible defaults for everything
else (e.g., `cpu_cores: 1`, `ram: 1024`).

Read-only fields (`created`, `modified`, `machine`, `creator`,
`console_status`, `recipe_instance`, `service`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-122"></a> `name` | `string` | VM display name. Min 1, max 128 characters. Must be unique. | services/vm/types.ts:270 |
| <a id="property-description-113"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/vm/types.ts:273 |
| <a id="property-enabled-67"></a> `enabled?` | `boolean` | Whether the VM is enabled. Default: `true`. | services/vm/types.ts:276 |
| <a id="property-is_snapshot-8"></a> `is_snapshot?` | `boolean` | Whether this is a snapshot. | services/vm/types.ts:279 |
| <a id="property-owner-17"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference (FK). | services/vm/types.ts:282 |
| <a id="property-owner_user-1"></a> `owner_user?` | [`FlexKey`](#flexkey) | Owner user reference (FK to `users`). | services/vm/types.ts:285 |
| <a id="property-machine_type-2"></a> `machine_type?` | `string` | QEMU machine type. Default: `pc-q35-10.0`. | services/vm/types.ts:288 |
| <a id="property-allow_hotplug-1"></a> `allow_hotplug?` | `boolean` | Whether hot-plug is allowed. Default: `true`. | services/vm/types.ts:291 |
| <a id="property-guest_agent-1"></a> `guest_agent?` | `boolean` | Whether the QEMU guest agent is enabled. Default: `false`. | services/vm/types.ts:294 |
| <a id="property-on_power_loss-7"></a> `on_power_loss?` | [`OnPowerLoss`](#onpowerloss) | Behavior when host power is restored. Default: `last_state`. | services/vm/types.ts:297 |
| <a id="property-disable_powercycle-1"></a> `disable_powercycle?` | `boolean` | Whether power-cycle is disabled. Default: `false`. | services/vm/types.ts:300 |
| <a id="property-cpu_cores-6"></a> `cpu_cores?` | `number` | Number of virtual CPU cores. Min 1, max 1024. Default: `1`. | services/vm/types.ts:303 |
| <a id="property-ha_group-7"></a> `ha_group?` | `string` | HA group name. | services/vm/types.ts:306 |
| <a id="property-cluster-9"></a> `cluster?` | [`FlexKey`](#flexkey) | Primary cluster reference (FK to `clusters`). | services/vm/types.ts:309 |
| <a id="property-cluster_failover-7"></a> `cluster_failover?` | [`FlexKey`](#flexkey) | Failover cluster reference (FK to `clusters`). | services/vm/types.ts:312 |
| <a id="property-cpu_type-1"></a> `cpu_type?` | `string` | CPU emulation type. | services/vm/types.ts:315 |
| <a id="property-ram-7"></a> `ram?` | `number` | RAM in megabytes. Min 256, max 1048576. Default: `1024`. | services/vm/types.ts:318 |
| <a id="property-console-1"></a> `console?` | [`ConsoleType`](#consoletype) | Console display protocol. Default: `vnc`. | services/vm/types.ts:321 |
| <a id="property-video-1"></a> `video?` | [`VideoType`](#videotype) | Video card emulation. Default: `std`. | services/vm/types.ts:324 |
| <a id="property-sound-1"></a> `sound?` | [`SoundType`](#soundtype) | Sound card emulation. Default: `none`. | services/vm/types.ts:327 |
| <a id="property-os_family-2"></a> `os_family?` | [`OSFamily`](#osfamily) | Guest OS family hint. Default: `linux`. | services/vm/types.ts:330 |
| <a id="property-os_description-1"></a> `os_description?` | `string` | Free-text OS description. Max 2048 characters. | services/vm/types.ts:333 |
| <a id="property-rtc_base-1"></a> `rtc_base?` | [`RTCBase`](#rtcbase) | Real-time clock base. | services/vm/types.ts:336 |
| <a id="property-boot_order-1"></a> `boot_order?` | [`BootOrder`](#bootorder) | Boot device priority order. Default: `cd`. | services/vm/types.ts:339 |
| <a id="property-console_pass_enabled-1"></a> `console_pass_enabled?` | `boolean` | Whether a console password is required. Default: `false`. | services/vm/types.ts:342 |
| <a id="property-console_pass-1"></a> `console_pass?` | `string` | Console password. Min 1, max 256 characters. | services/vm/types.ts:345 |
| <a id="property-usb_tablet-1"></a> `usb_tablet?` | `boolean` | Whether a USB tablet device is attached. Default: `true`. | services/vm/types.ts:348 |
| <a id="property-uefi-1"></a> `uefi?` | `boolean` | Whether UEFI firmware is used. Default: `false`. | services/vm/types.ts:351 |
| <a id="property-secure_boot-1"></a> `secure_boot?` | `boolean` | Whether Secure Boot is enabled. Default: `false`. | services/vm/types.ts:354 |
| <a id="property-serial_port-1"></a> `serial_port?` | `boolean` | Whether a serial port is attached. Default: `false`. | services/vm/types.ts:357 |
| <a id="property-boot_delay-1"></a> `boot_delay?` | `number` | Boot delay in seconds. Min 0, max 60. Default: `5`. | services/vm/types.ts:360 |
| <a id="property-preferred_node-7"></a> `preferred_node?` | [`FlexKey`](#flexkey) | Preferred node for scheduling (FK to `nodes`). | services/vm/types.ts:363 |
| <a id="property-snapshot_profile-2"></a> `snapshot_profile?` | [`FlexKey`](#flexkey) | Snapshot profile reference (FK to `snapshot_profiles`). | services/vm/types.ts:366 |
| <a id="property-uuid-8"></a> `uuid?` | `string` | VM UUID string. | services/vm/types.ts:369 |
| <a id="property-advanced-4"></a> `advanced?` | `string` | Advanced QEMU properties string. | services/vm/types.ts:372 |
| <a id="property-cloudinit_datasource-1"></a> `cloudinit_datasource?` | [`CloudInitDatasource`](#cloudinitdatasource) | Cloud-init metadata source. Default: `none`. | services/vm/types.ts:375 |
| <a id="property-created_from-1"></a> `created_from?` | [`CreatedFrom`](#createdfrom) | How this VM was created. Default: `custom`. | services/vm/types.ts:378 |
| <a id="property-imported-1"></a> `imported?` | `boolean` | Whether this VM was imported. Default: `false`. | services/vm/types.ts:381 |
| <a id="property-migration_method-1"></a> `migration_method?` | [`MigrationMethod`](#migrationmethod) | Live-migration strategy. Default: `auto`. | services/vm/types.ts:384 |
| <a id="property-note-13"></a> `note?` | `string` | User-facing note. Max 1024 characters. | services/vm/types.ts:387 |
| <a id="property-power_cycle_timeout-1"></a> `power_cycle_timeout?` | `number` | Power-cycle timeout during migration (seconds). Min 0, max 65535. Default: `0`. | services/vm/types.ts:390 |
| <a id="property-allow_export-1"></a> `allow_export?` | `boolean` | Whether the VM can be exported. Default: `true`. | services/vm/types.ts:393 |
| <a id="property-paste_key_config-1"></a> `paste_key_config?` | [`FlexKey`](#flexkey) | Paste key mapping configuration (FK to `vm_paste_configs`). | services/vm/types.ts:396 |
| <a id="property-nested_virtualization-1"></a> `nested_virtualization?` | `boolean` | Whether nested virtualization is enabled. Default: `false`. | services/vm/types.ts:399 |
| <a id="property-iommu-2"></a> `iommu?` | `boolean` | Whether an IOMMU device is attached. Default: `false`. | services/vm/types.ts:402 |
| <a id="property-disable_hypervisor-1"></a> `disable_hypervisor?` | `boolean` | Whether the hypervisor flag is hidden. Default: `false`. | services/vm/types.ts:405 |
| <a id="property-usb_legacy-1"></a> `usb_legacy?` | `boolean` | Whether to use a legacy USB controller. | services/vm/types.ts:408 |

***

### VMUpdateParams

Defined in: services/vm/types.ts:419

Parameters for updating an existing virtual machine.

All fields are optional — only provided fields are changed.
Read-only fields are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-123"></a> `name?` | `string` | VM display name. Min 1, max 128 characters. Must be unique. | services/vm/types.ts:421 |
| <a id="property-description-114"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/vm/types.ts:424 |
| <a id="property-enabled-68"></a> `enabled?` | `boolean` | Whether the VM is enabled. | services/vm/types.ts:427 |
| <a id="property-is_snapshot-9"></a> `is_snapshot?` | `boolean` | Whether this is a snapshot. | services/vm/types.ts:430 |
| <a id="property-owner-18"></a> `owner?` | [`FlexKey`](#flexkey) | Owner reference (FK). | services/vm/types.ts:433 |
| <a id="property-owner_user-2"></a> `owner_user?` | [`FlexKey`](#flexkey) | Owner user reference (FK to `users`). | services/vm/types.ts:436 |
| <a id="property-machine_type-3"></a> `machine_type?` | `string` | QEMU machine type. | services/vm/types.ts:439 |
| <a id="property-allow_hotplug-2"></a> `allow_hotplug?` | `boolean` | Whether hot-plug is allowed. | services/vm/types.ts:442 |
| <a id="property-guest_agent-2"></a> `guest_agent?` | `boolean` | Whether the QEMU guest agent is enabled. | services/vm/types.ts:445 |
| <a id="property-on_power_loss-8"></a> `on_power_loss?` | [`OnPowerLoss`](#onpowerloss) | Behavior when host power is restored. | services/vm/types.ts:448 |
| <a id="property-disable_powercycle-2"></a> `disable_powercycle?` | `boolean` | Whether power-cycle is disabled. | services/vm/types.ts:451 |
| <a id="property-cpu_cores-7"></a> `cpu_cores?` | `number` | Number of virtual CPU cores. Min 1, max 1024. | services/vm/types.ts:454 |
| <a id="property-ha_group-8"></a> `ha_group?` | `string` | HA group name. | services/vm/types.ts:457 |
| <a id="property-cluster-10"></a> `cluster?` | [`FlexKey`](#flexkey) | Primary cluster reference (FK to `clusters`). | services/vm/types.ts:460 |
| <a id="property-cluster_failover-8"></a> `cluster_failover?` | [`FlexKey`](#flexkey) | Failover cluster reference (FK to `clusters`). | services/vm/types.ts:463 |
| <a id="property-cpu_type-2"></a> `cpu_type?` | `string` | CPU emulation type. | services/vm/types.ts:466 |
| <a id="property-ram-8"></a> `ram?` | `number` | RAM in megabytes. Min 256, max 1048576. | services/vm/types.ts:469 |
| <a id="property-console-2"></a> `console?` | [`ConsoleType`](#consoletype) | Console display protocol. | services/vm/types.ts:472 |
| <a id="property-video-2"></a> `video?` | [`VideoType`](#videotype) | Video card emulation. | services/vm/types.ts:475 |
| <a id="property-sound-2"></a> `sound?` | [`SoundType`](#soundtype) | Sound card emulation. | services/vm/types.ts:478 |
| <a id="property-os_family-3"></a> `os_family?` | [`OSFamily`](#osfamily) | Guest OS family hint. | services/vm/types.ts:481 |
| <a id="property-os_description-2"></a> `os_description?` | `string` | Free-text OS description. Max 2048 characters. | services/vm/types.ts:484 |
| <a id="property-rtc_base-2"></a> `rtc_base?` | [`RTCBase`](#rtcbase) | Real-time clock base. | services/vm/types.ts:487 |
| <a id="property-boot_order-2"></a> `boot_order?` | [`BootOrder`](#bootorder) | Boot device priority order. | services/vm/types.ts:490 |
| <a id="property-console_pass_enabled-2"></a> `console_pass_enabled?` | `boolean` | Whether a console password is required. | services/vm/types.ts:493 |
| <a id="property-console_pass-2"></a> `console_pass?` | `string` | Console password. Min 1, max 256 characters. | services/vm/types.ts:496 |
| <a id="property-usb_tablet-2"></a> `usb_tablet?` | `boolean` | Whether a USB tablet device is attached. | services/vm/types.ts:499 |
| <a id="property-uefi-2"></a> `uefi?` | `boolean` | Whether UEFI firmware is used. | services/vm/types.ts:502 |
| <a id="property-secure_boot-2"></a> `secure_boot?` | `boolean` | Whether Secure Boot is enabled. | services/vm/types.ts:505 |
| <a id="property-serial_port-2"></a> `serial_port?` | `boolean` | Whether a serial port is attached. | services/vm/types.ts:508 |
| <a id="property-boot_delay-2"></a> `boot_delay?` | `number` | Boot delay in seconds. Min 0, max 60. | services/vm/types.ts:511 |
| <a id="property-preferred_node-8"></a> `preferred_node?` | [`FlexKey`](#flexkey) | Preferred node for scheduling (FK to `nodes`). | services/vm/types.ts:514 |
| <a id="property-snapshot_profile-3"></a> `snapshot_profile?` | [`FlexKey`](#flexkey) | Snapshot profile reference (FK to `snapshot_profiles`). | services/vm/types.ts:517 |
| <a id="property-uuid-9"></a> `uuid?` | `string` | VM UUID string. | services/vm/types.ts:520 |
| <a id="property-advanced-5"></a> `advanced?` | `string` | Advanced QEMU properties string. | services/vm/types.ts:523 |
| <a id="property-need_restart-4"></a> `need_restart?` | `boolean` | Whether the VM needs a restart. | services/vm/types.ts:526 |
| <a id="property-cloudinit_datasource-2"></a> `cloudinit_datasource?` | [`CloudInitDatasource`](#cloudinitdatasource) | Cloud-init metadata source. | services/vm/types.ts:529 |
| <a id="property-created_from-2"></a> `created_from?` | [`CreatedFrom`](#createdfrom) | How this VM was created. | services/vm/types.ts:532 |
| <a id="property-imported-2"></a> `imported?` | `boolean` | Whether this VM was imported. | services/vm/types.ts:535 |
| <a id="property-migration_method-2"></a> `migration_method?` | [`MigrationMethod`](#migrationmethod) | Live-migration strategy. | services/vm/types.ts:538 |
| <a id="property-note-14"></a> `note?` | `string` | User-facing note. Max 1024 characters. | services/vm/types.ts:541 |
| <a id="property-power_cycle_timeout-2"></a> `power_cycle_timeout?` | `number` | Power-cycle timeout during migration (seconds). Min 0, max 65535. | services/vm/types.ts:544 |
| <a id="property-allow_export-2"></a> `allow_export?` | `boolean` | Whether the VM can be exported. | services/vm/types.ts:547 |
| <a id="property-paste_key_config-2"></a> `paste_key_config?` | [`FlexKey`](#flexkey) | Paste key mapping configuration (FK to `vm_paste_configs`). | services/vm/types.ts:550 |
| <a id="property-nested_virtualization-2"></a> `nested_virtualization?` | `boolean` | Whether nested virtualization is enabled. | services/vm/types.ts:553 |
| <a id="property-iommu-3"></a> `iommu?` | `boolean` | Whether an IOMMU device is attached. | services/vm/types.ts:556 |
| <a id="property-disable_hypervisor-2"></a> `disable_hypervisor?` | `boolean` | Whether the hypervisor flag is hidden. | services/vm/types.ts:559 |
| <a id="property-usb_legacy-2"></a> `usb_legacy?` | `boolean` | Whether to use a legacy USB controller. | services/vm/types.ts:562 |

***

### VMCloneOptions

Defined in: services/vm/types.ts:568

Options for the VM clone action.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-124"></a> `name?` | `string` | Name for the cloned VM. | services/vm/types.ts:570 |
| <a id="property-preserve_macs"></a> `preserve_macs?` | `boolean` | Whether to preserve MAC addresses on NICs. | services/vm/types.ts:573 |

***

### VMSnapshotOptions

Defined in: services/vm/types.ts:577

Options for the VM snapshot action.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-125"></a> `name?` | `string` | Name for the snapshot. | services/vm/types.ts:579 |
| <a id="property-quiesce-6"></a> `quiesce?` | `boolean` | Whether to quiesce the guest filesystem before snapshotting. Requires guest agent. | services/vm/types.ts:582 |

***

### VMMigrateOptions

Defined in: services/vm/types.ts:586

Options for the VM migrate action.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-preferred_node-9"></a> `preferred_node?` | [`FlexKey`](#flexkey) \| `null` | Target node ID to migrate to. Pass `null` to auto-select the node with the least RAM usage. | services/vm/types.ts:588 |

***

### VMRestoreOptions

Defined in: services/vm/types.ts:592

Options for the VM restore action.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-snapshot"></a> `snapshot?` | [`FlexKey`](#flexkey) | Snapshot reference to restore from. | services/vm/types.ts:594 |
| <a id="property-preserve_macs-1"></a> `preserve_macs?` | `boolean` | Whether to preserve MAC addresses. | services/vm/types.ts:596 |
| <a id="property-name-126"></a> `name?` | `string` | Name for the restored VM. | services/vm/types.ts:598 |

***

### VMHotplugDriveOptions

Defined in: services/vm/types.ts:602

Options for hot-plugging a drive to a running VM.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-127"></a> `name?` | `string` | Drive name. | services/vm/types.ts:604 |
| <a id="property-disksize-3"></a> `disksize?` | `number` | Disk size in GB. | services/vm/types.ts:606 |
| <a id="property-interface-10"></a> `interface?` | `string` | Drive interface type (e.g., 'virtio-blk', 'virtio-scsi'). | services/vm/types.ts:608 |
| <a id="property-media-2"></a> `media?` | `string` | Media type. | services/vm/types.ts:610 |
| <a id="property-preferred_tier-6"></a> `preferred_tier?` | `string` | Preferred storage tier. | services/vm/types.ts:612 |

***

### VMHotplugNicOptions

Defined in: services/vm/types.ts:616

Options for hot-plugging a NIC to a running VM.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-128"></a> `name?` | `string` | NIC name. | services/vm/types.ts:618 |
| <a id="property-vnet-19"></a> `vnet?` | [`FlexKey`](#flexkey) | Virtual network reference (FK to vnets). | services/vm/types.ts:620 |
| <a id="property-interface-11"></a> `interface?` | `string` | NIC interface type. | services/vm/types.ts:622 |

***

### VMPasteOptions

Defined in: services/vm/types.ts:626

Options for pasting text to a VM console.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-text-2"></a> `text?` | `string` | The text to paste. | services/vm/types.ts:628 |

***

### VMEraseDriveOptions

Defined in: services/vm/types.ts:632

Options for erasing a VM drive.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-drive"></a> `drive?` | [`FlexKey`](#flexkey) | Drive reference to erase. | services/vm/types.ts:634 |

***

### VMExecuteOptions

Defined in: services/vm/types.ts:638

Options for executing a command on a VM.

#### Indexable

> \[`key`: `string`\]: `unknown`

Command to execute.

***

### ConsoleCredentials

Defined in: services/vm/types.ts:663

Username/password credentials for local VergeOS users.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-username-1"></a> `username` | `string` | VergeOS username (login name). | services/vm/types.ts:665 |
| <a id="property-password-19"></a> `password` | `string` | VergeOS password. | services/vm/types.ts:668 |

***

### ConsoleToken

Defined in: services/vm/types.ts:672

Pre-existing session token (e.g., from OIDC authentication).

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-token-1"></a> `token` | `string` | A valid VergeOS session token. | services/vm/types.ts:674 |

***

### ConsoleApiKey

Defined in: services/vm/types.ts:688

API key authentication for console sessions.

The console endpoint accepts `Authorization: Bearer <apiKey>` directly,
bypassing the need for a session token. The caller is responsible for
setting the `Authorization` header on the WebSocket handshake.

**Browser limitation:** The browser `WebSocket` API does not support
custom headers. Use [ConsoleCredentials](#consolecredentials) or [ConsoleToken](#consoletoken)
for browser-based console connections.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-apikey-1"></a> `apiKey` | `string` | A valid VergeOS API key. | services/vm/types.ts:690 |

***

### VMConsoleInfo

Defined in: services/vm/types.ts:730

Console connection information for a virtual machine.

Provides everything needed to establish a direct console connection
(VNC, SPICE, or serial) from a custom frontend using libraries like
noVNC, SpiceHTML5, or xterm.js.

The `authMethod` field indicates how to authenticate the WebSocket:

- `'token'` — the `websocketUrl` already contains `?token=<sessionToken>`.
  Pass it directly to your WebSocket client with no extra headers.
- `'bearer'` — the `websocketUrl` has no embedded token. Set the
  `Authorization: Bearer <apiKey>` header on the WebSocket handshake.
  The API key is available in the `apiKey` field.

#### Examples

```typescript
const info = await client.vms.getConsoleInfo(42, {
  username: 'admin', password: 'secret',
});
if (info.isAvailable) {
  const rfb = new RFB(container, info.websocketUrl!);
}
```

```typescript
const info = await client.vms.getConsoleInfo(42, {
  apiKey: 'my-api-key',
});
if (info.isAvailable) {
  const ws = new WebSocket(info.websocketUrl!, {
    headers: { Authorization: `Bearer ${info.apiKey}` },
  });
}
```

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-consoletype"></a> `consoleType` | [`ConsoleType`](#consoletype) | Console display protocol configured on the VM. | services/vm/types.ts:732 |
| <a id="property-host-6"></a> `host` | `string` \| `null` | Hostname or IP of the console service. `null` when the VM is not running. | services/vm/types.ts:735 |
| <a id="property-port-6"></a> `port` | `number` \| `null` | TCP port of the console service. `null` when the VM is not running. | services/vm/types.ts:738 |
| <a id="property-consolekey"></a> `consoleKey` | `number` \| `null` | Key of the `machine_console` record (used to build the WebSocket URL). `null` when unavailable. | services/vm/types.ts:741 |
| <a id="property-websocketurl"></a> `websocketUrl` | `string` \| `null` | WebSocket URL for connecting to the console. - When `authMethod` is `'token'`: includes `?token=<sessionToken>` — ready to use directly with no additional auth. - When `authMethod` is `'bearer'`: no token in the URL — the caller must set `Authorization: Bearer <apiKey>` on the WebSocket handshake. `null` when the VM is not running or console info is unavailable. | services/vm/types.ts:753 |
| <a id="property-authmethod"></a> `authMethod` | `"token"` \| `"bearer"` \| `null` | How the WebSocket connection should be authenticated. - `'token'` — session token is embedded in `websocketUrl` as `?token=`. Works in all environments including browsers. - `'bearer'` — no token in URL. Caller must pass `Authorization: Bearer` header during WebSocket handshake. Works in Node.js, Deno, and Bun but **not** in browser `WebSocket`. `null` when the console is unavailable. | services/vm/types.ts:766 |
| <a id="property-token-2"></a> `token` | `string` \| `null` | Session token used to authenticate the WebSocket connection. `null` when using bearer auth or unavailable. | services/vm/types.ts:769 |
| <a id="property-apikey-2"></a> `apiKey` | `string` \| `null` | API key for bearer auth on the WebSocket handshake. `null` when using token auth or unavailable. | services/vm/types.ts:772 |
| <a id="property-weburl"></a> `webUrl` | `string` | VergeOS web UI console URL (e.g., `https://host/#/vm-console/42`). | services/vm/types.ts:775 |
| <a id="property-ispasswordprotected"></a> `isPasswordProtected` | `boolean` | Whether the console requires a password (`console_pass_enabled`). | services/vm/types.ts:778 |
| <a id="property-isavailable"></a> `isAvailable` | `boolean` | Whether the console connection is available (VM is running and has a console service). | services/vm/types.ts:781 |

***

### VnetMonitorStatsHistoryLong

Defined in: services/vnet-monitor-stats-history-long/types.ts:15

A VergeOS vnet monitor stats history (long) resource.

Stores long-term network monitoring statistics for virtual networks,
including latency, packet quality, and error counters. Each row captures
a point-in-time snapshot for a specific vnet. This is a read-only
monitoring resource managed by the system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-vnet-20"></a> `vnet` | [`FlexKey`](#flexkey) | Parent vnet reference (FK to `vnets`). | - | services/vnet-monitor-stats-history-long/types.ts:17 |
| <a id="property-sent"></a> `sent?` | `number` | Number of packets sent (uint16). | - | services/vnet-monitor-stats-history-long/types.ts:20 |
| <a id="property-quality"></a> `quality?` | `number` | Link quality metric (uint8). | - | services/vnet-monitor-stats-history-long/types.ts:23 |
| <a id="property-dropped_pct"></a> `dropped_pct?` | `number` | Dropped packet percentage (uint8). | - | services/vnet-monitor-stats-history-long/types.ts:26 |
| <a id="property-latency_usec_avg"></a> `latency_usec_avg?` | `number` | Average latency in microseconds (uint32). | - | services/vnet-monitor-stats-history-long/types.ts:29 |
| <a id="property-latency_usec_peak"></a> `latency_usec_peak?` | `number` | Peak latency in microseconds (uint32). | - | services/vnet-monitor-stats-history-long/types.ts:32 |
| <a id="property-duplicates"></a> `duplicates?` | `number` | Number of duplicate packets (uint16). | - | services/vnet-monitor-stats-history-long/types.ts:35 |
| <a id="property-truncated"></a> `truncated?` | `number` | Number of truncated packets (uint16). | - | services/vnet-monitor-stats-history-long/types.ts:38 |
| <a id="property-dropped"></a> `dropped?` | `number` | Number of dropped packets (uint16). | - | services/vnet-monitor-stats-history-long/types.ts:41 |
| <a id="property-bad_checksums"></a> `bad_checksums?` | `number` | Number of bad checksums (uint16). | - | services/vnet-monitor-stats-history-long/types.ts:44 |
| <a id="property-bad_data"></a> `bad_data?` | `number` | Number of bad data packets (uint16). | - | services/vnet-monitor-stats-history-long/types.ts:47 |
| <a id="property-timestamp-8"></a> `timestamp?` | `number` | Timestamp of the stats snapshot (Unix epoch, uint32). | - | services/vnet-monitor-stats-history-long/types.ts:50 |
| <a id="property-key-85"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### VnetMonitorStatsHistoryShort

Defined in: services/vnet-monitor-stats-history-short/types.ts:15

A VergeOS vnet monitor stats history (short) resource.

Stores short-term network monitoring statistics for virtual networks,
including latency, packet quality, and error counters. Each row captures
a point-in-time snapshot for a specific vnet. This is a read-only
monitoring resource managed by the system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-vnet-21"></a> `vnet` | [`FlexKey`](#flexkey) | Parent vnet reference (FK to `vnets`). | - | services/vnet-monitor-stats-history-short/types.ts:17 |
| <a id="property-sent-1"></a> `sent?` | `number` | Number of packets sent (uint16). | - | services/vnet-monitor-stats-history-short/types.ts:20 |
| <a id="property-quality-1"></a> `quality?` | `number` | Link quality metric (uint8). | - | services/vnet-monitor-stats-history-short/types.ts:23 |
| <a id="property-dropped_pct-1"></a> `dropped_pct?` | `number` | Dropped packet percentage (uint8). | - | services/vnet-monitor-stats-history-short/types.ts:26 |
| <a id="property-latency_usec_avg-1"></a> `latency_usec_avg?` | `number` | Average latency in microseconds (uint32). | - | services/vnet-monitor-stats-history-short/types.ts:29 |
| <a id="property-latency_usec_peak-1"></a> `latency_usec_peak?` | `number` | Peak latency in microseconds (uint32). | - | services/vnet-monitor-stats-history-short/types.ts:32 |
| <a id="property-duplicates-1"></a> `duplicates?` | `number` | Number of duplicate packets (uint16). | - | services/vnet-monitor-stats-history-short/types.ts:35 |
| <a id="property-truncated-1"></a> `truncated?` | `number` | Number of truncated packets (uint16). | - | services/vnet-monitor-stats-history-short/types.ts:38 |
| <a id="property-dropped-1"></a> `dropped?` | `number` | Number of dropped packets (uint16). | - | services/vnet-monitor-stats-history-short/types.ts:41 |
| <a id="property-bad_checksums-1"></a> `bad_checksums?` | `number` | Number of bad checksums (uint16). | - | services/vnet-monitor-stats-history-short/types.ts:44 |
| <a id="property-bad_data-1"></a> `bad_data?` | `number` | Number of bad data packets (uint16). | - | services/vnet-monitor-stats-history-short/types.ts:47 |
| <a id="property-timestamp-9"></a> `timestamp?` | `number` | Timestamp of the stats snapshot (Unix epoch, uint32). | - | services/vnet-monitor-stats-history-short/types.ts:50 |
| <a id="property-key-86"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### VolumeBrowserJob

Defined in: services/volume-browser/types.ts:25

A volume browser job record.

The volume browser API is asynchronous: POST creates a job, GET polls for results.
Jobs use SHA1 string keys.

**Important**: The `result` field is NOT returned by default — you must request it
explicitly via `?fields=id,status,result`.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-key-87"></a> `$key` | `string` | SHA1 string key. | services/volume-browser/types.ts:27 |
| <a id="property-id-15"></a> `id` | `string` | SHA1 job identifier (same as $key). | services/volume-browser/types.ts:29 |
| <a id="property-volume"></a> `volume` | `string` | Volume SHA1 key being browsed. | services/volume-browser/types.ts:31 |
| <a id="property-query"></a> `query` | [`VolumeBrowserQuery`](#volumebrowserquery) | The operation type. | services/volume-browser/types.ts:33 |
| <a id="property-params"></a> `params?` | `unknown` | Query parameters (JSON). | services/volume-browser/types.ts:35 |
| <a id="property-status-22"></a> `status` | [`VolumeBrowserStatus`](#volumebrowserstatus) | Job status. | services/volume-browser/types.ts:37 |
| <a id="property-result"></a> `result?` | `unknown` | Operation result (must be explicitly requested via fields param). | services/volume-browser/types.ts:39 |
| <a id="property-command"></a> `command?` | `string` | Command used to execute the query (read-only). | services/volume-browser/types.ts:41 |
| <a id="property-created-25"></a> `created?` | `number` | Creation timestamp in microseconds. | services/volume-browser/types.ts:43 |
| <a id="property-modified-25"></a> `modified?` | `number` | Last modified timestamp. | services/volume-browser/types.ts:45 |
| <a id="property-expires-12"></a> `expires?` | `number` | Expiration timestamp. | services/volume-browser/types.ts:47 |

***

### VolumeBrowserEntry

Defined in: services/volume-browser/types.ts:53

A file or directory entry returned by a `get-dir` browse operation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-129"></a> `name` | `string` | File or directory name. | services/volume-browser/types.ts:55 |
| <a id="property-n_name"></a> `n_name?` | `string` | Normalized name (lowercase). | services/volume-browser/types.ts:57 |
| <a id="property-size-3"></a> `size` | `number` | Size in bytes. | services/volume-browser/types.ts:59 |
| <a id="property-date"></a> `date` | `number` | Modification time (Unix timestamp). | services/volume-browser/types.ts:61 |
| <a id="property-type-25"></a> `type` | `string` | Entry type: `file` or `directory`. | services/volume-browser/types.ts:63 |

***

### VolumeBrowserFilter

Defined in: services/volume-browser/types.ts:69

Filter options for browse operations.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-extensions"></a> `extensions?` | `string` | Filter by file extensions (empty for all). | services/volume-browser/types.ts:71 |

***

### VolumeBrowserParams

Defined in: services/volume-browser/types.ts:83

Parameters for browse operations.

Different query types use different subsets of these fields:
- `get-dir`: dir, limit, offset, filter, volume, sort
- `rename`: dir, name, items
- `delete`: dir, items
- `paste`: dir, items, dest_dir, mode

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-dir"></a> `dir` | `string` | Directory path. Use `""` for root, NOT `"/"`. | services/volume-browser/types.ts:85 |
| <a id="property-limit"></a> `limit?` | `number` | Maximum number of entries to return (get-dir). | services/volume-browser/types.ts:87 |
| <a id="property-offset"></a> `offset?` | `number` | Pagination offset (get-dir). | services/volume-browser/types.ts:89 |
| <a id="property-filter-1"></a> `filter?` | [`VolumeBrowserFilter`](#volumebrowserfilter) | Filter options (get-dir). | services/volume-browser/types.ts:91 |
| <a id="property-volume-1"></a> `volume?` | `string` | Volume SHA1 key (get-dir, must match top-level volume). | services/volume-browser/types.ts:93 |
| <a id="property-sort"></a> `sort?` | `string` | Sort field (get-dir, empty for default). | services/volume-browser/types.ts:95 |
| <a id="property-name-130"></a> `name?` | `string` | New name (rename). | services/volume-browser/types.ts:97 |
| <a id="property-items"></a> `items?` | `string`[] | Items to operate on (rename/delete/paste). | services/volume-browser/types.ts:99 |
| <a id="property-dest_dir"></a> `dest_dir?` | `string` | Destination directory (paste). | services/volume-browser/types.ts:101 |
| <a id="property-mode-6"></a> `mode?` | [`VolumeBrowserPasteMode`](#volumebrowserpastemode) | Paste mode: copy or move (paste). | services/volume-browser/types.ts:103 |

***

### VolumeBrowserRequest

Defined in: services/volume-browser/types.ts:109

Request body for creating a volume browser job.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-volume-2"></a> `volume` | `string` | Volume SHA1 key to browse (required). | services/volume-browser/types.ts:111 |
| <a id="property-query-1"></a> `query` | [`VolumeBrowserQuery`](#volumebrowserquery) | Operation type (required). | services/volume-browser/types.ts:113 |
| <a id="property-params-1"></a> `params` | [`VolumeBrowserParams`](#volumebrowserparams) | Query-specific parameters (required). | services/volume-browser/types.ts:115 |

***

### BrowseOptions

Defined in: services/volume-browser/types.ts:121

Options for browse convenience methods.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-limit-1"></a> `limit?` | `number` | Maximum number of entries to return. | services/volume-browser/types.ts:123 |
| <a id="property-offset-1"></a> `offset?` | `number` | Pagination offset. | services/volume-browser/types.ts:125 |
| <a id="property-extensions-1"></a> `extensions?` | `string` | Filter by file extensions. | services/volume-browser/types.ts:127 |
| <a id="property-sort-1"></a> `sort?` | `string` | Sort field. | services/volume-browser/types.ts:129 |

***

### WaitOptions

Defined in: services/volume-browser/types.ts:135

Options for polling a volume browser job.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-timeout-1"></a> `timeout?` | `number` | Timeout in milliseconds. Default: 30000 (30s). | services/volume-browser/types.ts:137 |
| <a id="property-pollinterval"></a> `pollInterval?` | `number` | Poll interval in milliseconds. Default: 500. | services/volume-browser/types.ts:139 |

***

### VolumeCIFSShare

Defined in: services/volume-cifs-share/types.ts:14

A VergeOS CIFS share resource.

CIFS shares expose volume paths via the SMB protocol. They are children
of volumes and use 40-character SHA1 hash strings as keys. The `volume`
FK references the parent volume.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id-16"></a> `id` | `string` | Share ID — 40-character SHA1 hash. Read-only. | - | services/volume-cifs-share/types.ts:16 |
| <a id="property-name-131"></a> `name` | `string` | Share display name. Min 1, max 128 characters. Unique. | - | services/volume-cifs-share/types.ts:19 |
| <a id="property-volume-3"></a> `volume` | `string` | Parent volume reference (FK to `volumes`). Read-only after create. | - | services/volume-cifs-share/types.ts:22 |
| <a id="property-description-115"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/volume-cifs-share/types.ts:25 |
| <a id="property-enabled-69"></a> `enabled?` | `boolean` | Whether the share is enabled. Default: `true`. | - | services/volume-cifs-share/types.ts:28 |
| <a id="property-created-26"></a> `created?` | `number` | Creation timestamp (Unix epoch, uint32). Read-only. | - | services/volume-cifs-share/types.ts:31 |
| <a id="property-modified-26"></a> `modified?` | `number` | Last modification timestamp (Unix epoch, uint32). Read-only. | - | services/volume-cifs-share/types.ts:34 |
| <a id="property-share_path"></a> `share_path?` | `string` | Path within the volume to share. | - | services/volume-cifs-share/types.ts:37 |
| <a id="property-comment"></a> `comment?` | `string` | Share comment. Max 64 characters. | - | services/volume-cifs-share/types.ts:40 |
| <a id="property-valid_users"></a> `valid_users?` | `string` | Valid users (newline-delimited). | - | services/volume-cifs-share/types.ts:43 |
| <a id="property-valid_groups"></a> `valid_groups?` | `string` | Valid groups (newline-delimited). | - | services/volume-cifs-share/types.ts:46 |
| <a id="property-admin_users"></a> `admin_users?` | `string` | Admin users (newline-delimited). | - | services/volume-cifs-share/types.ts:49 |
| <a id="property-admin_groups"></a> `admin_groups?` | `string` | Admin groups (newline-delimited). | - | services/volume-cifs-share/types.ts:52 |
| <a id="property-host_allow"></a> `host_allow?` | `string` | Allowed hosts (newline-delimited). | - | services/volume-cifs-share/types.ts:55 |
| <a id="property-host_deny"></a> `host_deny?` | `string` | Denied hosts (newline-delimited). | - | services/volume-cifs-share/types.ts:58 |
| <a id="property-force_user"></a> `force_user?` | `string` | Force user option. | - | services/volume-cifs-share/types.ts:61 |
| <a id="property-force_group"></a> `force_group?` | `string` | Force group option. | - | services/volume-cifs-share/types.ts:64 |
| <a id="property-browseable"></a> `browseable?` | `boolean` | Whether the share is browseable. | - | services/volume-cifs-share/types.ts:67 |
| <a id="property-read_only"></a> `read_only?` | `boolean` | Whether the share is read-only. | - | services/volume-cifs-share/types.ts:70 |
| <a id="property-guest_ok"></a> `guest_ok?` | `boolean` | Whether guest access is allowed. | - | services/volume-cifs-share/types.ts:73 |
| <a id="property-guest_only"></a> `guest_only?` | `boolean` | Whether only guest access is allowed. | - | services/volume-cifs-share/types.ts:76 |
| <a id="property-advanced-6"></a> `advanced?` | `string` | Advanced SMB configuration directives. Max 65536 characters. | - | services/volume-cifs-share/types.ts:79 |
| <a id="property-vfs_shadow_copy2"></a> `vfs_shadow_copy2?` | `boolean` | Whether shadow copy (VSS) is enabled. | - | services/volume-cifs-share/types.ts:82 |
| <a id="property-status-23"></a> `status?` | [`FlexKey`](#flexkey) | Share status reference (FK to `volume_share_status`). Read-only. | - | services/volume-cifs-share/types.ts:85 |
| <a id="property-key-88"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### VolumeCIFSShareCreateParams

Defined in: services/volume-cifs-share/types.ts:96

Parameters for creating a new CIFS share.

`name` and `volume` are required. Read-only fields (`id`, `created`,
`modified`, `status`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-132"></a> `name` | `string` | Share display name. Min 1, max 128 characters. Must be unique. | services/volume-cifs-share/types.ts:98 |
| <a id="property-volume-4"></a> `volume` | `string` | Parent volume reference (FK to `volumes`). SHA1 string key. Required. | services/volume-cifs-share/types.ts:101 |
| <a id="property-description-116"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/volume-cifs-share/types.ts:104 |
| <a id="property-enabled-70"></a> `enabled?` | `boolean` | Whether the share is enabled. Default: `true`. | services/volume-cifs-share/types.ts:107 |
| <a id="property-share_path-1"></a> `share_path?` | `string` | Path within the volume to share. | services/volume-cifs-share/types.ts:110 |
| <a id="property-comment-1"></a> `comment?` | `string` | Share comment. Max 64 characters. | services/volume-cifs-share/types.ts:113 |
| <a id="property-valid_users-1"></a> `valid_users?` | `string` | Valid users (newline-delimited). | services/volume-cifs-share/types.ts:116 |
| <a id="property-valid_groups-1"></a> `valid_groups?` | `string` | Valid groups (newline-delimited). | services/volume-cifs-share/types.ts:119 |
| <a id="property-admin_users-1"></a> `admin_users?` | `string` | Admin users (newline-delimited). | services/volume-cifs-share/types.ts:122 |
| <a id="property-admin_groups-1"></a> `admin_groups?` | `string` | Admin groups (newline-delimited). | services/volume-cifs-share/types.ts:125 |
| <a id="property-host_allow-1"></a> `host_allow?` | `string` | Allowed hosts (newline-delimited). | services/volume-cifs-share/types.ts:128 |
| <a id="property-host_deny-1"></a> `host_deny?` | `string` | Denied hosts (newline-delimited). | services/volume-cifs-share/types.ts:131 |
| <a id="property-force_user-1"></a> `force_user?` | `string` | Force user option. | services/volume-cifs-share/types.ts:134 |
| <a id="property-force_group-1"></a> `force_group?` | `string` | Force group option. | services/volume-cifs-share/types.ts:137 |
| <a id="property-browseable-1"></a> `browseable?` | `boolean` | Whether the share is browseable. | services/volume-cifs-share/types.ts:140 |
| <a id="property-read_only-1"></a> `read_only?` | `boolean` | Whether the share is read-only. | services/volume-cifs-share/types.ts:143 |
| <a id="property-guest_ok-1"></a> `guest_ok?` | `boolean` | Whether guest access is allowed. | services/volume-cifs-share/types.ts:146 |
| <a id="property-guest_only-1"></a> `guest_only?` | `boolean` | Whether only guest access is allowed. | services/volume-cifs-share/types.ts:149 |
| <a id="property-advanced-7"></a> `advanced?` | `string` | Advanced SMB configuration directives. Max 65536 characters. | services/volume-cifs-share/types.ts:152 |
| <a id="property-vfs_shadow_copy2-1"></a> `vfs_shadow_copy2?` | `boolean` | Whether shadow copy (VSS) is enabled. | services/volume-cifs-share/types.ts:155 |

***

### VolumeCIFSShareUpdateParams

Defined in: services/volume-cifs-share/types.ts:166

Parameters for updating an existing CIFS share.

All fields are optional — only provided fields are changed.
Read-only fields (`id`, `volume`, `created`, `modified`, `status`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-133"></a> `name?` | `string` | Share display name. Min 1, max 128 characters. Must be unique. | services/volume-cifs-share/types.ts:168 |
| <a id="property-description-117"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/volume-cifs-share/types.ts:171 |
| <a id="property-enabled-71"></a> `enabled?` | `boolean` | Whether the share is enabled. | services/volume-cifs-share/types.ts:174 |
| <a id="property-share_path-2"></a> `share_path?` | `string` | Path within the volume to share. | services/volume-cifs-share/types.ts:177 |
| <a id="property-comment-2"></a> `comment?` | `string` | Share comment. Max 64 characters. | services/volume-cifs-share/types.ts:180 |
| <a id="property-valid_users-2"></a> `valid_users?` | `string` | Valid users (newline-delimited). | services/volume-cifs-share/types.ts:183 |
| <a id="property-valid_groups-2"></a> `valid_groups?` | `string` | Valid groups (newline-delimited). | services/volume-cifs-share/types.ts:186 |
| <a id="property-admin_users-2"></a> `admin_users?` | `string` | Admin users (newline-delimited). | services/volume-cifs-share/types.ts:189 |
| <a id="property-admin_groups-2"></a> `admin_groups?` | `string` | Admin groups (newline-delimited). | services/volume-cifs-share/types.ts:192 |
| <a id="property-host_allow-2"></a> `host_allow?` | `string` | Allowed hosts (newline-delimited). | services/volume-cifs-share/types.ts:195 |
| <a id="property-host_deny-2"></a> `host_deny?` | `string` | Denied hosts (newline-delimited). | services/volume-cifs-share/types.ts:198 |
| <a id="property-force_user-2"></a> `force_user?` | `string` | Force user option. | services/volume-cifs-share/types.ts:201 |
| <a id="property-force_group-2"></a> `force_group?` | `string` | Force group option. | services/volume-cifs-share/types.ts:204 |
| <a id="property-browseable-2"></a> `browseable?` | `boolean` | Whether the share is browseable. | services/volume-cifs-share/types.ts:207 |
| <a id="property-read_only-2"></a> `read_only?` | `boolean` | Whether the share is read-only. | services/volume-cifs-share/types.ts:210 |
| <a id="property-guest_ok-2"></a> `guest_ok?` | `boolean` | Whether guest access is allowed. | services/volume-cifs-share/types.ts:213 |
| <a id="property-guest_only-2"></a> `guest_only?` | `boolean` | Whether only guest access is allowed. | services/volume-cifs-share/types.ts:216 |
| <a id="property-advanced-8"></a> `advanced?` | `string` | Advanced SMB configuration directives. Max 65536 characters. | services/volume-cifs-share/types.ts:219 |
| <a id="property-vfs_shadow_copy2-2"></a> `vfs_shadow_copy2?` | `boolean` | Whether shadow copy (VSS) is enabled. | services/volume-cifs-share/types.ts:222 |

***

### VolumeNFSShare

Defined in: services/volume-nfs-share/types.ts:22

A VergeOS NFS share resource.

NFS shares expose volume paths via the NFS protocol. They are children
of volumes and use 40-character SHA1 hash strings as keys. The `volume`
FK references the parent volume.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id-17"></a> `id` | `string` | Share ID — 40-character SHA1 hash. Read-only. | - | services/volume-nfs-share/types.ts:24 |
| <a id="property-name-134"></a> `name` | `string` | Share display name. Min 1, max 128 characters. Unique. | - | services/volume-nfs-share/types.ts:27 |
| <a id="property-volume-5"></a> `volume` | `string` | Parent volume reference (FK to `volumes`). Read-only after create. | - | services/volume-nfs-share/types.ts:30 |
| <a id="property-description-118"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/volume-nfs-share/types.ts:33 |
| <a id="property-enabled-72"></a> `enabled?` | `boolean` | Whether the share is enabled. Default: `true`. | - | services/volume-nfs-share/types.ts:36 |
| <a id="property-created-27"></a> `created?` | `number` | Creation timestamp (Unix epoch, uint32). Read-only. | - | services/volume-nfs-share/types.ts:39 |
| <a id="property-modified-27"></a> `modified?` | `number` | Last modification timestamp (Unix epoch, uint32). Read-only. | - | services/volume-nfs-share/types.ts:42 |
| <a id="property-share_path-3"></a> `share_path?` | `string` | Path within the volume to share. | - | services/volume-nfs-share/types.ts:45 |
| <a id="property-allowed_hosts"></a> `allowed_hosts?` | `string` | Allowed hosts (comma-delimited string). | - | services/volume-nfs-share/types.ts:48 |
| <a id="property-allow_all"></a> `allow_all?` | `boolean` | Whether all hosts are allowed. | - | services/volume-nfs-share/types.ts:51 |
| <a id="property-fsid"></a> `fsid?` | `string` | Unique filesystem ID for NFS exports. | - | services/volume-nfs-share/types.ts:54 |
| <a id="property-anonuid"></a> `anonuid?` | `string` | Anonymous UID for unmapped users. | - | services/volume-nfs-share/types.ts:57 |
| <a id="property-anongid"></a> `anongid?` | `string` | Anonymous GID for unmapped groups. | - | services/volume-nfs-share/types.ts:60 |
| <a id="property-no_acl"></a> `no_acl?` | `boolean` | Whether to disable ACL support. | - | services/volume-nfs-share/types.ts:63 |
| <a id="property-insecure"></a> `insecure?` | `boolean` | Whether to allow connections from non-privileged ports. | - | services/volume-nfs-share/types.ts:66 |
| <a id="property-async"></a> `async?` | `boolean` | Whether to allow async NFS operations. | - | services/volume-nfs-share/types.ts:69 |
| <a id="property-squash"></a> `squash?` | [`NfsSquash`](#nfssquash) | User ID squashing mode. Default: `root_squash`. | - | services/volume-nfs-share/types.ts:72 |
| <a id="property-data_access"></a> `data_access?` | [`NfsDataAccess`](#nfsdataaccess) | Data access mode. Default: `ro`. | - | services/volume-nfs-share/types.ts:75 |
| <a id="property-status-24"></a> `status?` | [`FlexKey`](#flexkey) | Share status reference (FK to `volume_share_status`). Read-only. | - | services/volume-nfs-share/types.ts:78 |
| <a id="property-key-89"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### VolumeNFSShareCreateParams

Defined in: services/volume-nfs-share/types.ts:89

Parameters for creating a new NFS share.

`name` and `volume` are required. Read-only fields (`id`, `created`,
`modified`, `status`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-135"></a> `name` | `string` | Share display name. Min 1, max 128 characters. Must be unique. | services/volume-nfs-share/types.ts:91 |
| <a id="property-volume-6"></a> `volume` | `string` | Parent volume reference (FK to `volumes`). SHA1 string key. Required. | services/volume-nfs-share/types.ts:94 |
| <a id="property-description-119"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/volume-nfs-share/types.ts:97 |
| <a id="property-enabled-73"></a> `enabled?` | `boolean` | Whether the share is enabled. Default: `true`. | services/volume-nfs-share/types.ts:100 |
| <a id="property-share_path-4"></a> `share_path?` | `string` | Path within the volume to share. | services/volume-nfs-share/types.ts:103 |
| <a id="property-allowed_hosts-1"></a> `allowed_hosts?` | `string` | Allowed hosts (comma-delimited string). | services/volume-nfs-share/types.ts:106 |
| <a id="property-allow_all-1"></a> `allow_all?` | `boolean` | Whether all hosts are allowed. | services/volume-nfs-share/types.ts:109 |
| <a id="property-fsid-1"></a> `fsid?` | `string` | Unique filesystem ID for NFS exports. | services/volume-nfs-share/types.ts:112 |
| <a id="property-anonuid-1"></a> `anonuid?` | `string` | Anonymous UID for unmapped users. | services/volume-nfs-share/types.ts:115 |
| <a id="property-anongid-1"></a> `anongid?` | `string` | Anonymous GID for unmapped groups. | services/volume-nfs-share/types.ts:118 |
| <a id="property-no_acl-1"></a> `no_acl?` | `boolean` | Whether to disable ACL support. | services/volume-nfs-share/types.ts:121 |
| <a id="property-insecure-1"></a> `insecure?` | `boolean` | Whether to allow connections from non-privileged ports. | services/volume-nfs-share/types.ts:124 |
| <a id="property-async-1"></a> `async?` | `boolean` | Whether to allow async NFS operations. | services/volume-nfs-share/types.ts:127 |
| <a id="property-squash-1"></a> `squash?` | [`NfsSquash`](#nfssquash) | User ID squashing mode. Default: `root_squash`. | services/volume-nfs-share/types.ts:130 |
| <a id="property-data_access-1"></a> `data_access?` | [`NfsDataAccess`](#nfsdataaccess) | Data access mode. Default: `ro`. | services/volume-nfs-share/types.ts:133 |

***

### VolumeNFSShareUpdateParams

Defined in: services/volume-nfs-share/types.ts:144

Parameters for updating an existing NFS share.

All fields are optional — only provided fields are changed.
Read-only fields (`id`, `volume`, `created`, `modified`, `status`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-136"></a> `name?` | `string` | Share display name. Min 1, max 128 characters. Must be unique. | services/volume-nfs-share/types.ts:146 |
| <a id="property-description-120"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/volume-nfs-share/types.ts:149 |
| <a id="property-enabled-74"></a> `enabled?` | `boolean` | Whether the share is enabled. | services/volume-nfs-share/types.ts:152 |
| <a id="property-share_path-5"></a> `share_path?` | `string` | Path within the volume to share. | services/volume-nfs-share/types.ts:155 |
| <a id="property-allowed_hosts-2"></a> `allowed_hosts?` | `string` | Allowed hosts (comma-delimited string). | services/volume-nfs-share/types.ts:158 |
| <a id="property-allow_all-2"></a> `allow_all?` | `boolean` | Whether all hosts are allowed. | services/volume-nfs-share/types.ts:161 |
| <a id="property-fsid-2"></a> `fsid?` | `string` | Unique filesystem ID for NFS exports. | services/volume-nfs-share/types.ts:164 |
| <a id="property-anonuid-2"></a> `anonuid?` | `string` | Anonymous UID for unmapped users. | services/volume-nfs-share/types.ts:167 |
| <a id="property-anongid-2"></a> `anongid?` | `string` | Anonymous GID for unmapped groups. | services/volume-nfs-share/types.ts:170 |
| <a id="property-no_acl-2"></a> `no_acl?` | `boolean` | Whether to disable ACL support. | services/volume-nfs-share/types.ts:173 |
| <a id="property-insecure-2"></a> `insecure?` | `boolean` | Whether to allow connections from non-privileged ports. | services/volume-nfs-share/types.ts:176 |
| <a id="property-async-2"></a> `async?` | `boolean` | Whether to allow async NFS operations. | services/volume-nfs-share/types.ts:179 |
| <a id="property-squash-2"></a> `squash?` | [`NfsSquash`](#nfssquash) | User ID squashing mode. | services/volume-nfs-share/types.ts:182 |
| <a id="property-data_access-2"></a> `data_access?` | [`NfsDataAccess`](#nfsdataaccess) | Data access mode. | services/volume-nfs-share/types.ts:185 |

***

### VolumeSnapshot

Defined in: services/volume-snapshot/types.ts:20

A VergeOS volume snapshot resource.

Volume snapshots capture the state of a volume at a point in time.
Unlike volumes (which use SHA1 string keys), volume snapshots use
standard integer keys. The `volume` FK references the parent volume
by its SHA1 string key.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-volume-7"></a> `volume` | `string` | Parent volume reference (FK to `volumes`). SHA1 string key. Read-only. | - | services/volume-snapshot/types.ts:22 |
| <a id="property-snap_volume"></a> `snap_volume?` | `string` | Snapshot volume copy reference (FK to `volumes`). Read-only. | - | services/volume-snapshot/types.ts:25 |
| <a id="property-name-137"></a> `name` | `string` | Snapshot display name. Min 1, max 128 characters. Unique. | - | services/volume-snapshot/types.ts:28 |
| <a id="property-created-28"></a> `created?` | `number` | Creation timestamp (Unix epoch, uint32). Read-only. | - | services/volume-snapshot/types.ts:31 |
| <a id="property-description-121"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/volume-snapshot/types.ts:34 |
| <a id="property-expires_type-8"></a> `expires_type?` | [`VolumeSnapshotExpiresType`](#volumesnapshotexpirestype) | Expiration policy. Default: `date`. | - | services/volume-snapshot/types.ts:37 |
| <a id="property-expires-13"></a> `expires?` | `number` | Expiration timestamp (Unix epoch, uint32). | - | services/volume-snapshot/types.ts:40 |
| <a id="property-enabled-75"></a> `enabled?` | `boolean` | Whether the snapshot is enabled. Default: `false`. | - | services/volume-snapshot/types.ts:43 |
| <a id="property-created_manually-3"></a> `created_manually?` | `boolean` | Whether this snapshot was created manually. Default: `false`. | - | services/volume-snapshot/types.ts:46 |
| <a id="property-quiesce-7"></a> `quiesce?` | `boolean` | Whether to quiesce the volume before snapshotting. Default: `false`. | - | services/volume-snapshot/types.ts:49 |
| <a id="property-key-90"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### VolumeSnapshotCreateParams

Defined in: services/volume-snapshot/types.ts:60

Parameters for creating a new volume snapshot.

`name` and `volume` are required. Read-only fields (`created`, `snap_volume`)
are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-volume-8"></a> `volume` | `string` | Parent volume reference (FK to `volumes`). SHA1 string key. Required. | services/volume-snapshot/types.ts:62 |
| <a id="property-name-138"></a> `name` | `string` | Snapshot display name. Min 1, max 128 characters. Must be unique. | services/volume-snapshot/types.ts:65 |
| <a id="property-description-122"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/volume-snapshot/types.ts:68 |
| <a id="property-expires_type-9"></a> `expires_type?` | [`VolumeSnapshotExpiresType`](#volumesnapshotexpirestype) | Expiration policy. Default: `date`. | services/volume-snapshot/types.ts:71 |
| <a id="property-expires-14"></a> `expires?` | `number` | Expiration timestamp (Unix epoch, uint32). | services/volume-snapshot/types.ts:74 |
| <a id="property-enabled-76"></a> `enabled?` | `boolean` | Whether the snapshot is enabled. Default: `false`. | services/volume-snapshot/types.ts:77 |
| <a id="property-created_manually-4"></a> `created_manually?` | `boolean` | Whether this snapshot was created manually. Default: `false`. | services/volume-snapshot/types.ts:80 |
| <a id="property-quiesce-8"></a> `quiesce?` | `boolean` | Whether to quiesce the volume before snapshotting. Default: `false`. | services/volume-snapshot/types.ts:83 |

***

### VolumeSnapshotUpdateParams

Defined in: services/volume-snapshot/types.ts:94

Parameters for updating an existing volume snapshot.

All fields are optional — only provided fields are changed.
Read-only fields (`volume`, `created`, `snap_volume`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-139"></a> `name?` | `string` | Snapshot display name. Min 1, max 128 characters. Must be unique. | services/volume-snapshot/types.ts:96 |
| <a id="property-description-123"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/volume-snapshot/types.ts:99 |
| <a id="property-expires_type-10"></a> `expires_type?` | [`VolumeSnapshotExpiresType`](#volumesnapshotexpirestype) | Expiration policy. | services/volume-snapshot/types.ts:102 |
| <a id="property-expires-15"></a> `expires?` | `number` | Expiration timestamp (Unix epoch, uint32). | services/volume-snapshot/types.ts:105 |
| <a id="property-enabled-77"></a> `enabled?` | `boolean` | Whether the snapshot is enabled. | services/volume-snapshot/types.ts:108 |
| <a id="property-created_manually-5"></a> `created_manually?` | `boolean` | Whether this snapshot was created manually. | services/volume-snapshot/types.ts:111 |
| <a id="property-quiesce-9"></a> `quiesce?` | `boolean` | Whether to quiesce the volume before snapshotting. | services/volume-snapshot/types.ts:114 |

***

### VolumeSync

Defined in: services/volume-sync/types.ts:35

A VergeOS volume sync resource.

Volume syncs synchronize data between volumes within a NAS service. They are
children of NAS services (`vm_services`) and use 40-character SHA1 hash
strings as keys. The `service` FK references the parent NAS service.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id-18"></a> `id` | `string` | Sync ID — 40-character SHA1 hash. Read-only. | - | services/volume-sync/types.ts:37 |
| <a id="property-name-140"></a> `name` | `string` | Sync display name. Min 1, max 128 characters. Unique. | - | services/volume-sync/types.ts:40 |
| <a id="property-service-3"></a> `service` | [`FlexKey`](#flexkey) | Parent NAS service reference (FK to `vm_services`). Read-only after create. | - | services/volume-sync/types.ts:43 |
| <a id="property-source_volume"></a> `source_volume` | `string` | Source volume reference (FK to `volumes`). | - | services/volume-sync/types.ts:46 |
| <a id="property-destination_volume"></a> `destination_volume` | `string` | Destination volume reference (FK to `volumes`). | - | services/volume-sync/types.ts:49 |
| <a id="property-description-124"></a> `description?` | `string` | Human-readable description. | - | services/volume-sync/types.ts:52 |
| <a id="property-enabled-78"></a> `enabled?` | `boolean` | Whether the sync is enabled. Default: `true`. | - | services/volume-sync/types.ts:55 |
| <a id="property-created-29"></a> `created?` | `number` | Creation timestamp (Unix epoch, uint32). Read-only. | - | services/volume-sync/types.ts:58 |
| <a id="property-modified-28"></a> `modified?` | `number` | Last modification timestamp (Unix epoch, uint32). Read-only. | - | services/volume-sync/types.ts:61 |
| <a id="property-source_path"></a> `source_path?` | `string` | Source path within the source volume. | - | services/volume-sync/types.ts:64 |
| <a id="property-destination_path"></a> `destination_path?` | `string` | Destination path within the destination volume. | - | services/volume-sync/types.ts:67 |
| <a id="property-include"></a> `include?` | `string` | Include patterns (newline-delimited). | - | services/volume-sync/types.ts:70 |
| <a id="property-exclude"></a> `exclude?` | `string` | Exclude patterns (newline-delimited). | - | services/volume-sync/types.ts:73 |
| <a id="property-fsfreeze"></a> `fsfreeze?` | `boolean` | Whether to freeze the filesystem before syncing. | - | services/volume-sync/types.ts:76 |
| <a id="property-preserve_acls"></a> `preserve_ACLs?` | `boolean` | Whether to preserve ACLs. Default: `true`. | - | services/volume-sync/types.ts:79 |
| <a id="property-copy_symlinks"></a> `copy_symlinks?` | `boolean` | Whether to copy symlinks. Default: `true`. | - | services/volume-sync/types.ts:82 |
| <a id="property-preserve_xattrs"></a> `preserve_xattrs?` | `boolean` | Whether to preserve extended attributes. Default: `true`. | - | services/volume-sync/types.ts:85 |
| <a id="property-preserve_permissions"></a> `preserve_permissions?` | `boolean` | Whether to preserve file permissions. Default: `true`. | - | services/volume-sync/types.ts:88 |
| <a id="property-preserve_mod_time"></a> `preserve_mod_time?` | `boolean` | Whether to preserve modification times. Default: `true`. | - | services/volume-sync/types.ts:91 |
| <a id="property-preserve_groups"></a> `preserve_groups?` | `boolean` | Whether to preserve group ownership. Default: `true`. | - | services/volume-sync/types.ts:94 |
| <a id="property-preserve_owner"></a> `preserve_owner?` | `boolean` | Whether to preserve file ownership. Default: `true`. | - | services/volume-sync/types.ts:97 |
| <a id="property-preserve_device_files"></a> `preserve_device_files?` | `boolean` | Whether to preserve device files. Default: `false`. | - | services/volume-sync/types.ts:100 |
| <a id="property-start_time_profile"></a> `start_time_profile?` | [`FlexKey`](#flexkey) | Snapshot profile for scheduling (FK to `snapshot_profiles`). | - | services/volume-sync/types.ts:103 |
| <a id="property-run_time"></a> `run_time?` | `number` | Maximum run time in seconds. | - | services/volume-sync/types.ts:106 |
| <a id="property-run_as_user"></a> `run_as_user?` | `string` | User to run the sync as. | - | services/volume-sync/types.ts:109 |
| <a id="property-destination_delete"></a> `destination_delete?` | [`VolumeSyncDestinationDelete`](#volumesyncdestinationdelete) | Destination delete behavior. Default: `'never'`. | - | services/volume-sync/types.ts:112 |
| <a id="property-errors_max"></a> `errors_max?` | `number` | Maximum number of errors before stopping. Default: `1000`. | - | services/volume-sync/types.ts:115 |
| <a id="property-workers"></a> `workers?` | `number` | Number of worker threads (1–128). Default: `4`. | - | services/volume-sync/types.ts:118 |
| <a id="property-preferred_tier-7"></a> `preferred_tier?` | [`VolumeSyncPreferredTier`](#volumesyncpreferredtier) | Preferred storage tier. | - | services/volume-sync/types.ts:121 |
| <a id="property-omit_dir_times"></a> `omit_dir_times?` | `boolean` | Whether to omit directory modification times. | - | services/volume-sync/types.ts:124 |
| <a id="property-omit_link_times"></a> `omit_link_times?` | `boolean` | Whether to omit symlink modification times. | - | services/volume-sync/types.ts:127 |
| <a id="property-inplace"></a> `inplace?` | `boolean` | Whether to write data directly to destination (skip temp files). | - | services/volume-sync/types.ts:130 |
| <a id="property-cifsacl"></a> `cifsacl?` | `boolean` | Whether to use CIFS ACL handling. Default: `true`. | - | services/volume-sync/types.ts:133 |
| <a id="property-sync_method"></a> `sync_method?` | [`VolumeSyncMethod`](#volumesyncmethod) | Sync method. Default: `'ysync'`. | - | services/volume-sync/types.ts:136 |
| <a id="property-ysync_extended"></a> `ysync_extended?` | `string` | Extended ysync options. | - | services/volume-sync/types.ts:139 |
| <a id="property-type-26"></a> `type?` | [`VolumeSyncType`](#volumesynctype) | Sync type. Read-only. Default: `'volsync'`. | - | services/volume-sync/types.ts:142 |
| <a id="property-progress-1"></a> `progress?` | [`FlexKey`](#flexkey) | Progress reference (FK to `volume_sync_progresses`). Read-only. | - | services/volume-sync/types.ts:145 |
| <a id="property-key-91"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### VolumeSyncCreateParams

Defined in: services/volume-sync/types.ts:156

Parameters for creating a new volume sync.

`name`, `service`, `source_volume`, and `destination_volume` are required.
Read-only fields (`id`, `created`, `modified`, `progress`, `type`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-141"></a> `name` | `string` | Sync display name. Min 1, max 128 characters. Must be unique. | services/volume-sync/types.ts:158 |
| <a id="property-service-4"></a> `service` | [`FlexKey`](#flexkey) | Parent NAS service reference (FK to `vm_services`). Required. | services/volume-sync/types.ts:161 |
| <a id="property-source_volume-1"></a> `source_volume` | `string` | Source volume reference (FK to `volumes`). Required. | services/volume-sync/types.ts:164 |
| <a id="property-destination_volume-1"></a> `destination_volume` | `string` | Destination volume reference (FK to `volumes`). Required. | services/volume-sync/types.ts:167 |
| <a id="property-description-125"></a> `description?` | `string` | Human-readable description. | services/volume-sync/types.ts:170 |
| <a id="property-enabled-79"></a> `enabled?` | `boolean` | Whether the sync is enabled. Default: `true`. | services/volume-sync/types.ts:173 |
| <a id="property-source_path-1"></a> `source_path?` | `string` | Source path within the source volume. | services/volume-sync/types.ts:176 |
| <a id="property-destination_path-1"></a> `destination_path?` | `string` | Destination path within the destination volume. | services/volume-sync/types.ts:179 |
| <a id="property-include-1"></a> `include?` | `string` | Include patterns (newline-delimited). | services/volume-sync/types.ts:182 |
| <a id="property-exclude-1"></a> `exclude?` | `string` | Exclude patterns (newline-delimited). | services/volume-sync/types.ts:185 |
| <a id="property-fsfreeze-1"></a> `fsfreeze?` | `boolean` | Whether to freeze the filesystem before syncing. | services/volume-sync/types.ts:188 |
| <a id="property-preserve_acls-1"></a> `preserve_ACLs?` | `boolean` | Whether to preserve ACLs. Default: `true`. | services/volume-sync/types.ts:191 |
| <a id="property-copy_symlinks-1"></a> `copy_symlinks?` | `boolean` | Whether to copy symlinks. Default: `true`. | services/volume-sync/types.ts:194 |
| <a id="property-preserve_xattrs-1"></a> `preserve_xattrs?` | `boolean` | Whether to preserve extended attributes. Default: `true`. | services/volume-sync/types.ts:197 |
| <a id="property-preserve_permissions-1"></a> `preserve_permissions?` | `boolean` | Whether to preserve file permissions. Default: `true`. | services/volume-sync/types.ts:200 |
| <a id="property-preserve_mod_time-1"></a> `preserve_mod_time?` | `boolean` | Whether to preserve modification times. Default: `true`. | services/volume-sync/types.ts:203 |
| <a id="property-preserve_groups-1"></a> `preserve_groups?` | `boolean` | Whether to preserve group ownership. Default: `true`. | services/volume-sync/types.ts:206 |
| <a id="property-preserve_owner-1"></a> `preserve_owner?` | `boolean` | Whether to preserve file ownership. Default: `true`. | services/volume-sync/types.ts:209 |
| <a id="property-preserve_device_files-1"></a> `preserve_device_files?` | `boolean` | Whether to preserve device files. Default: `false`. | services/volume-sync/types.ts:212 |
| <a id="property-start_time_profile-1"></a> `start_time_profile?` | [`FlexKey`](#flexkey) | Snapshot profile for scheduling (FK to `snapshot_profiles`). | services/volume-sync/types.ts:215 |
| <a id="property-run_time-1"></a> `run_time?` | `number` | Maximum run time in seconds. | services/volume-sync/types.ts:218 |
| <a id="property-run_as_user-1"></a> `run_as_user?` | `string` | User to run the sync as. | services/volume-sync/types.ts:221 |
| <a id="property-destination_delete-1"></a> `destination_delete?` | [`VolumeSyncDestinationDelete`](#volumesyncdestinationdelete) | Destination delete behavior. Default: `'never'`. | services/volume-sync/types.ts:224 |
| <a id="property-errors_max-1"></a> `errors_max?` | `number` | Maximum number of errors before stopping. Default: `1000`. | services/volume-sync/types.ts:227 |
| <a id="property-workers-1"></a> `workers?` | `number` | Number of worker threads (1–128). Default: `4`. | services/volume-sync/types.ts:230 |
| <a id="property-preferred_tier-8"></a> `preferred_tier?` | [`VolumeSyncPreferredTier`](#volumesyncpreferredtier) | Preferred storage tier. | services/volume-sync/types.ts:233 |
| <a id="property-omit_dir_times-1"></a> `omit_dir_times?` | `boolean` | Whether to omit directory modification times. | services/volume-sync/types.ts:236 |
| <a id="property-omit_link_times-1"></a> `omit_link_times?` | `boolean` | Whether to omit symlink modification times. | services/volume-sync/types.ts:239 |
| <a id="property-inplace-1"></a> `inplace?` | `boolean` | Whether to write data directly to destination (skip temp files). | services/volume-sync/types.ts:242 |
| <a id="property-cifsacl-1"></a> `cifsacl?` | `boolean` | Whether to use CIFS ACL handling. Default: `true`. | services/volume-sync/types.ts:245 |
| <a id="property-sync_method-1"></a> `sync_method?` | [`VolumeSyncMethod`](#volumesyncmethod) | Sync method. Default: `'ysync'`. | services/volume-sync/types.ts:248 |
| <a id="property-ysync_extended-1"></a> `ysync_extended?` | `string` | Extended ysync options. | services/volume-sync/types.ts:251 |

***

### VolumeSyncUpdateParams

Defined in: services/volume-sync/types.ts:262

Parameters for updating an existing volume sync.

All fields are optional — only provided fields are changed.
Read-only fields (`id`, `service`, `created`, `modified`, `progress`, `type`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-142"></a> `name?` | `string` | Sync display name. Min 1, max 128 characters. Must be unique. | services/volume-sync/types.ts:264 |
| <a id="property-source_volume-2"></a> `source_volume?` | `string` | Source volume reference (FK to `volumes`). | services/volume-sync/types.ts:267 |
| <a id="property-destination_volume-2"></a> `destination_volume?` | `string` | Destination volume reference (FK to `volumes`). | services/volume-sync/types.ts:270 |
| <a id="property-description-126"></a> `description?` | `string` | Human-readable description. | services/volume-sync/types.ts:273 |
| <a id="property-enabled-80"></a> `enabled?` | `boolean` | Whether the sync is enabled. | services/volume-sync/types.ts:276 |
| <a id="property-source_path-2"></a> `source_path?` | `string` | Source path within the source volume. | services/volume-sync/types.ts:279 |
| <a id="property-destination_path-2"></a> `destination_path?` | `string` | Destination path within the destination volume. | services/volume-sync/types.ts:282 |
| <a id="property-include-2"></a> `include?` | `string` | Include patterns (newline-delimited). | services/volume-sync/types.ts:285 |
| <a id="property-exclude-2"></a> `exclude?` | `string` | Exclude patterns (newline-delimited). | services/volume-sync/types.ts:288 |
| <a id="property-fsfreeze-2"></a> `fsfreeze?` | `boolean` | Whether to freeze the filesystem before syncing. | services/volume-sync/types.ts:291 |
| <a id="property-preserve_acls-2"></a> `preserve_ACLs?` | `boolean` | Whether to preserve ACLs. | services/volume-sync/types.ts:294 |
| <a id="property-copy_symlinks-2"></a> `copy_symlinks?` | `boolean` | Whether to copy symlinks. | services/volume-sync/types.ts:297 |
| <a id="property-preserve_xattrs-2"></a> `preserve_xattrs?` | `boolean` | Whether to preserve extended attributes. | services/volume-sync/types.ts:300 |
| <a id="property-preserve_permissions-2"></a> `preserve_permissions?` | `boolean` | Whether to preserve file permissions. | services/volume-sync/types.ts:303 |
| <a id="property-preserve_mod_time-2"></a> `preserve_mod_time?` | `boolean` | Whether to preserve modification times. | services/volume-sync/types.ts:306 |
| <a id="property-preserve_groups-2"></a> `preserve_groups?` | `boolean` | Whether to preserve group ownership. | services/volume-sync/types.ts:309 |
| <a id="property-preserve_owner-2"></a> `preserve_owner?` | `boolean` | Whether to preserve file ownership. | services/volume-sync/types.ts:312 |
| <a id="property-preserve_device_files-2"></a> `preserve_device_files?` | `boolean` | Whether to preserve device files. | services/volume-sync/types.ts:315 |
| <a id="property-start_time_profile-2"></a> `start_time_profile?` | [`FlexKey`](#flexkey) | Snapshot profile for scheduling (FK to `snapshot_profiles`). | services/volume-sync/types.ts:318 |
| <a id="property-run_time-2"></a> `run_time?` | `number` | Maximum run time in seconds. | services/volume-sync/types.ts:321 |
| <a id="property-run_as_user-2"></a> `run_as_user?` | `string` | User to run the sync as. | services/volume-sync/types.ts:324 |
| <a id="property-destination_delete-2"></a> `destination_delete?` | [`VolumeSyncDestinationDelete`](#volumesyncdestinationdelete) | Destination delete behavior. | services/volume-sync/types.ts:327 |
| <a id="property-errors_max-2"></a> `errors_max?` | `number` | Maximum number of errors before stopping. | services/volume-sync/types.ts:330 |
| <a id="property-workers-2"></a> `workers?` | `number` | Number of worker threads (1–128). | services/volume-sync/types.ts:333 |
| <a id="property-preferred_tier-9"></a> `preferred_tier?` | [`VolumeSyncPreferredTier`](#volumesyncpreferredtier) | Preferred storage tier. | services/volume-sync/types.ts:336 |
| <a id="property-omit_dir_times-2"></a> `omit_dir_times?` | `boolean` | Whether to omit directory modification times. | services/volume-sync/types.ts:339 |
| <a id="property-omit_link_times-2"></a> `omit_link_times?` | `boolean` | Whether to omit symlink modification times. | services/volume-sync/types.ts:342 |
| <a id="property-inplace-2"></a> `inplace?` | `boolean` | Whether to write data directly to destination (skip temp files). | services/volume-sync/types.ts:345 |
| <a id="property-cifsacl-2"></a> `cifsacl?` | `boolean` | Whether to use CIFS ACL handling. | services/volume-sync/types.ts:348 |
| <a id="property-sync_method-2"></a> `sync_method?` | [`VolumeSyncMethod`](#volumesyncmethod) | Sync method. | services/volume-sync/types.ts:351 |
| <a id="property-ysync_extended-2"></a> `ysync_extended?` | `string` | Extended ysync options. | services/volume-sync/types.ts:354 |

***

### Volume

Defined in: services/volume/types.ts:50

A VergeOS volume resource.

Volume `$key` and `id` are both 40-character SHA1 hash strings, unlike most
resources which use integer keys. The `service` FK links to the parent NAS
service (`vm_services`).

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id-19"></a> `id` | `string` | Volume ID — 40-character SHA1 hash. Read-only. | - | services/volume/types.ts:52 |
| <a id="property-service-5"></a> `service` | [`FlexKey`](#flexkey) | Parent NAS service reference (FK to `vm_services`). Read-only. | - | services/volume/types.ts:55 |
| <a id="property-is_snapshot-10"></a> `is_snapshot?` | `boolean` | Whether this resource is a snapshot of another volume. | - | services/volume/types.ts:58 |
| <a id="property-drive-1"></a> `drive?` | [`FlexKey`](#flexkey) | Drive reference (FK to `machine_drives`). Read-only. | - | services/volume/types.ts:61 |
| <a id="property-name-143"></a> `name` | `string` | Volume display name. Min 1, max 128 characters. Unique. | - | services/volume/types.ts:64 |
| <a id="property-description-127"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/volume/types.ts:67 |
| <a id="property-enabled-81"></a> `enabled?` | `boolean` | Whether the volume is enabled. Default: `true`. | - | services/volume/types.ts:70 |
| <a id="property-created-30"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/volume/types.ts:73 |
| <a id="property-modified-29"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/volume/types.ts:76 |
| <a id="property-maxsize"></a> `maxsize?` | `number` | Maximum size in bytes. Min 1,048,576 (1 MB), max 549,755,813,888,000. | - | services/volume/types.ts:79 |
| <a id="property-preferred_tier-10"></a> `preferred_tier?` | [`VolumePreferredTier`](#volumepreferredtier) | Preferred storage tier. | - | services/volume/types.ts:82 |
| <a id="property-snapshot_profile-4"></a> `snapshot_profile?` | [`FlexKey`](#flexkey) | Snapshot profile reference (FK to `snapshot_profiles`). | - | services/volume/types.ts:85 |
| <a id="property-fs_type"></a> `fs_type?` | [`VolumeFsType`](#volumefstype) | Filesystem type. Read-only (set at creation). Default: `ext4`. | - | services/volume/types.ts:88 |
| <a id="property-discard-3"></a> `discard?` | `boolean` | Whether to discard unused blocks (TRIM). Default: `true`. | - | services/volume/types.ts:91 |
| <a id="property-read_only-3"></a> `read_only?` | `boolean` | Whether the volume is read-only. Default: `false`. | - | services/volume/types.ts:94 |
| <a id="property-owner_user-3"></a> `owner_user?` | `string` | Owner user string. | - | services/volume/types.ts:97 |
| <a id="property-owner_group"></a> `owner_group?` | `string` | Owner group string. | - | services/volume/types.ts:100 |
| <a id="property-automount_snapshots"></a> `automount_snapshots?` | `boolean` | Whether to automatically mount snapshots. Default: `false`. | - | services/volume/types.ts:103 |
| <a id="property-remote_target"></a> `remote_target?` | `string` | Remote mount target path (for CIFS/NFS fs_types). | - | services/volume/types.ts:106 |
| <a id="property-cifs_user"></a> `cifs_user?` | `string` | CIFS username (for remote CIFS mounts). | - | services/volume/types.ts:109 |
| <a id="property-cifs_password"></a> `cifs_password?` | `string` | CIFS password (for remote CIFS mounts). Max 256 characters. | - | services/volume/types.ts:112 |
| <a id="property-cifs_protocol"></a> `cifs_protocol?` | [`CifsProtocol`](#cifsprotocol) | SMB protocol version (for remote CIFS mounts). Default: `2.0`. | - | services/volume/types.ts:115 |
| <a id="property-nfs_protocol"></a> `nfs_protocol?` | [`NfsProtocol`](#nfsprotocol) | NFS protocol version (for remote NFS mounts). | - | services/volume/types.ts:118 |
| <a id="property-read_ahead_kb"></a> `read_ahead_kb?` | [`ReadAheadKb`](#readaheadkb) | Read-ahead buffer size in kilobytes. Default: `0` (automatic). | - | services/volume/types.ts:121 |
| <a id="property-optimize-3"></a> `optimize?` | [`VolumeOptimize`](#volumeoptimize) | Optimization strategy. Default: `general`. | - | services/volume/types.ts:124 |
| <a id="property-mount_options"></a> `mount_options?` | `string` | Additional mount options string. | - | services/volume/types.ts:127 |
| <a id="property-encrypt"></a> `encrypt?` | `boolean` | Whether the volume is encrypted. Read-only (set at creation). Default: `false`. | - | services/volume/types.ts:130 |
| <a id="property-encryption_key-1"></a> `encryption_key?` | `string` | Encryption key string. Max 256 characters. | - | services/volume/types.ts:133 |
| <a id="property-note-15"></a> `note?` | `string` | User-facing note. Max 1024 characters. | - | services/volume/types.ts:136 |
| <a id="property-creator-14"></a> `creator?` | `string` | User who created this volume. Read-only. | - | services/volume/types.ts:139 |
| <a id="property-parent_snapshot"></a> `parent_snapshot?` | [`FlexKey`](#flexkey) | Parent snapshot reference (FK to `volume_snapshots`). | - | services/volume/types.ts:142 |
| <a id="property-status-25"></a> `status?` | [`FlexKey`](#flexkey) | Volume status reference (FK to `volume_status`). | - | services/volume/types.ts:145 |
| <a id="property-vol_antivirus"></a> `vol_antivirus?` | [`FlexKey`](#flexkey) | Antivirus reference (FK to `volume_antivirus`). Read-only. | - | services/volume/types.ts:148 |
| <a id="property-additional_setting_values"></a> `additional_setting_values?` | `unknown` | Additional setting values (JSON). | - | services/volume/types.ts:151 |
| <a id="property-key-92"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### VolumeCreateParams

Defined in: services/volume/types.ts:163

Parameters for creating a new volume.

`name` and `service` are required. Read-only fields (`id`, `drive`, `created`,
`modified`, `encrypt`, `fs_type`, `creator`, `vol_antivirus`) are excluded except
where settable at creation time.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-144"></a> `name` | `string` | Volume display name. Min 1, max 128 characters. Must be unique. | services/volume/types.ts:165 |
| <a id="property-service-6"></a> `service` | [`FlexKey`](#flexkey) | Parent NAS service reference (FK to `vm_services`). Required. | services/volume/types.ts:168 |
| <a id="property-is_snapshot-11"></a> `is_snapshot?` | `boolean` | Whether this is a snapshot. | services/volume/types.ts:171 |
| <a id="property-description-128"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/volume/types.ts:174 |
| <a id="property-enabled-82"></a> `enabled?` | `boolean` | Whether the volume is enabled. Default: `true`. | services/volume/types.ts:177 |
| <a id="property-maxsize-1"></a> `maxsize?` | `number` | Maximum size in bytes. Min 1,048,576 (1 MB). | services/volume/types.ts:180 |
| <a id="property-preferred_tier-11"></a> `preferred_tier?` | [`VolumePreferredTier`](#volumepreferredtier) | Preferred storage tier. | services/volume/types.ts:183 |
| <a id="property-snapshot_profile-5"></a> `snapshot_profile?` | [`FlexKey`](#flexkey) | Snapshot profile reference (FK to `snapshot_profiles`). | services/volume/types.ts:186 |
| <a id="property-fs_type-1"></a> `fs_type?` | [`VolumeFsType`](#volumefstype) | Filesystem type. Default: `ext4`. | services/volume/types.ts:189 |
| <a id="property-discard-4"></a> `discard?` | `boolean` | Whether to discard unused blocks (TRIM). Default: `true`. | services/volume/types.ts:192 |
| <a id="property-read_only-4"></a> `read_only?` | `boolean` | Whether the volume is read-only. Default: `false`. | services/volume/types.ts:195 |
| <a id="property-owner_user-4"></a> `owner_user?` | `string` | Owner user string. | services/volume/types.ts:198 |
| <a id="property-owner_group-1"></a> `owner_group?` | `string` | Owner group string. | services/volume/types.ts:201 |
| <a id="property-automount_snapshots-1"></a> `automount_snapshots?` | `boolean` | Whether to automatically mount snapshots. Default: `false`. | services/volume/types.ts:204 |
| <a id="property-remote_target-1"></a> `remote_target?` | `string` | Remote mount target path (for CIFS/NFS fs_types). | services/volume/types.ts:207 |
| <a id="property-cifs_user-1"></a> `cifs_user?` | `string` | CIFS username (for remote CIFS mounts). | services/volume/types.ts:210 |
| <a id="property-cifs_password-1"></a> `cifs_password?` | `string` | CIFS password (for remote CIFS mounts). Max 256 characters. | services/volume/types.ts:213 |
| <a id="property-cifs_protocol-1"></a> `cifs_protocol?` | [`CifsProtocol`](#cifsprotocol) | SMB protocol version (for remote CIFS mounts). Default: `2.0`. | services/volume/types.ts:216 |
| <a id="property-nfs_protocol-1"></a> `nfs_protocol?` | [`NfsProtocol`](#nfsprotocol) | NFS protocol version (for remote NFS mounts). | services/volume/types.ts:219 |
| <a id="property-read_ahead_kb-1"></a> `read_ahead_kb?` | [`ReadAheadKb`](#readaheadkb) | Read-ahead buffer size in kilobytes. Default: `0` (automatic). | services/volume/types.ts:222 |
| <a id="property-optimize-4"></a> `optimize?` | [`VolumeOptimize`](#volumeoptimize) | Optimization strategy. Default: `general`. | services/volume/types.ts:225 |
| <a id="property-mount_options-1"></a> `mount_options?` | `string` | Additional mount options string. | services/volume/types.ts:228 |
| <a id="property-encrypt-1"></a> `encrypt?` | `boolean` | Whether to encrypt the volume. Default: `false`. | services/volume/types.ts:231 |
| <a id="property-encryption_key-2"></a> `encryption_key?` | `string` | Encryption key string. Max 256 characters. | services/volume/types.ts:234 |
| <a id="property-note-16"></a> `note?` | `string` | User-facing note. Max 1024 characters. | services/volume/types.ts:237 |

***

### VolumeUpdateParams

Defined in: services/volume/types.ts:260

Parameters for updating an existing volume.

All fields are optional — only provided fields are changed.
Read-only fields (`id`, `service`, `drive`, `created`, `modified`,
`encrypt`, `fs_type`, `creator`, `vol_antivirus`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-145"></a> `name?` | `string` | Volume display name. Min 1, max 128 characters. Must be unique. | services/volume/types.ts:262 |
| <a id="property-is_snapshot-12"></a> `is_snapshot?` | `boolean` | Whether this is a snapshot. | services/volume/types.ts:265 |
| <a id="property-description-129"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/volume/types.ts:268 |
| <a id="property-enabled-83"></a> `enabled?` | `boolean` | Whether the volume is enabled. | services/volume/types.ts:271 |
| <a id="property-maxsize-2"></a> `maxsize?` | `number` | Maximum size in bytes. Min 1,048,576 (1 MB). | services/volume/types.ts:274 |
| <a id="property-preferred_tier-12"></a> `preferred_tier?` | [`VolumePreferredTier`](#volumepreferredtier) | Preferred storage tier. | services/volume/types.ts:277 |
| <a id="property-snapshot_profile-6"></a> `snapshot_profile?` | [`FlexKey`](#flexkey) | Snapshot profile reference (FK to `snapshot_profiles`). | services/volume/types.ts:280 |
| <a id="property-discard-5"></a> `discard?` | `boolean` | Whether to discard unused blocks (TRIM). | services/volume/types.ts:283 |
| <a id="property-read_only-5"></a> `read_only?` | `boolean` | Whether the volume is read-only. | services/volume/types.ts:286 |
| <a id="property-owner_user-5"></a> `owner_user?` | `string` | Owner user string. | services/volume/types.ts:289 |
| <a id="property-owner_group-2"></a> `owner_group?` | `string` | Owner group string. | services/volume/types.ts:292 |
| <a id="property-automount_snapshots-2"></a> `automount_snapshots?` | `boolean` | Whether to automatically mount snapshots. | services/volume/types.ts:295 |
| <a id="property-remote_target-2"></a> `remote_target?` | `string` | Remote mount target path (for CIFS/NFS fs_types). | services/volume/types.ts:298 |
| <a id="property-cifs_user-2"></a> `cifs_user?` | `string` | CIFS username (for remote CIFS mounts). | services/volume/types.ts:301 |
| <a id="property-cifs_password-2"></a> `cifs_password?` | `string` | CIFS password (for remote CIFS mounts). Max 256 characters. | services/volume/types.ts:304 |
| <a id="property-cifs_protocol-2"></a> `cifs_protocol?` | [`CifsProtocol`](#cifsprotocol) | SMB protocol version (for remote CIFS mounts). | services/volume/types.ts:307 |
| <a id="property-nfs_protocol-2"></a> `nfs_protocol?` | [`NfsProtocol`](#nfsprotocol) | NFS protocol version (for remote NFS mounts). | services/volume/types.ts:310 |
| <a id="property-read_ahead_kb-2"></a> `read_ahead_kb?` | [`ReadAheadKb`](#readaheadkb) | Read-ahead buffer size in kilobytes. | services/volume/types.ts:313 |
| <a id="property-optimize-5"></a> `optimize?` | [`VolumeOptimize`](#volumeoptimize) | Optimization strategy. | services/volume/types.ts:316 |
| <a id="property-mount_options-2"></a> `mount_options?` | `string` | Additional mount options string. | services/volume/types.ts:319 |
| <a id="property-encryption_key-3"></a> `encryption_key?` | `string` | Encryption key string. Max 256 characters. | services/volume/types.ts:322 |
| <a id="property-note-17"></a> `note?` | `string` | User-facing note. Max 1024 characters. | services/volume/types.ts:325 |

***

### WebhookURL

Defined in: services/webhook-url/types.ts:22

A VergeOS webhook URL resource.

Webhook URLs are configurable destinations where the system sends
notifications. Each webhook URL defines an HTTP endpoint, authorization
method, and retry/timeout settings.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-name-146"></a> `name?` | `string` | Webhook name. Unique, max 128 characters. | - | services/webhook-url/types.ts:24 |
| <a id="property-type-27"></a> `type?` | `"custom"` | Webhook type. Currently only `'custom'` is supported. | - | services/webhook-url/types.ts:27 |
| <a id="property-url-18"></a> `url?` | `string` | Target URL for webhook delivery. | - | services/webhook-url/types.ts:30 |
| <a id="property-headers"></a> `headers?` | `string` | HTTP headers to include with requests. Default: `'Content-Type:application/json'`. | - | services/webhook-url/types.ts:33 |
| <a id="property-authorization_type"></a> `authorization_type?` | [`WebhookURLAuthorizationType`](#webhookurlauthorizationtype) | Authorization method. Default: `'none'`. | - | services/webhook-url/types.ts:36 |
| <a id="property-authorization_value"></a> `authorization_value?` | `string` | Authorization value (token, password, etc.). | - | services/webhook-url/types.ts:39 |
| <a id="property-allow_insecure-6"></a> `allow_insecure?` | `boolean` | Whether to allow insecure (self-signed) TLS certificates. Default: `false`. | - | services/webhook-url/types.ts:42 |
| <a id="property-timeout-2"></a> `timeout?` | `number` | Request timeout in seconds (3–120). Default: `5`. | - | services/webhook-url/types.ts:45 |
| <a id="property-retries"></a> `retries?` | `number` | Number of delivery retries (0–100). Default: `3`. | - | services/webhook-url/types.ts:48 |
| <a id="property-key-93"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### WebhookURLCreateParams

Defined in: services/webhook-url/types.ts:56

Parameters for creating a new webhook URL.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-147"></a> `name` | `string` | Webhook name. Required, unique, max 128 characters. | services/webhook-url/types.ts:58 |
| <a id="property-url-19"></a> `url` | `string` | Target URL for webhook delivery. Required. | services/webhook-url/types.ts:61 |
| <a id="property-type-28"></a> `type?` | `"custom"` | Webhook type. Default: `'custom'`. | services/webhook-url/types.ts:64 |
| <a id="property-headers-1"></a> `headers?` | `string` | HTTP headers to include. Default: `'Content-Type:application/json'`. | services/webhook-url/types.ts:67 |
| <a id="property-authorization_type-1"></a> `authorization_type?` | [`WebhookURLAuthorizationType`](#webhookurlauthorizationtype) | Authorization method. Default: `'none'`. | services/webhook-url/types.ts:70 |
| <a id="property-authorization_value-1"></a> `authorization_value?` | `string` | Authorization value. | services/webhook-url/types.ts:73 |
| <a id="property-allow_insecure-7"></a> `allow_insecure?` | `boolean` | Whether to allow insecure TLS certificates. Default: `false`. | services/webhook-url/types.ts:76 |
| <a id="property-timeout-3"></a> `timeout?` | `number` | Request timeout in seconds (3–120). Default: `5`. | services/webhook-url/types.ts:79 |
| <a id="property-retries-1"></a> `retries?` | `number` | Number of delivery retries (0–100). Default: `3`. | services/webhook-url/types.ts:82 |

***

### WebhookURLUpdateParams

Defined in: services/webhook-url/types.ts:92

Parameters for updating an existing webhook URL.

All fields are optional — only provided fields are changed.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-148"></a> `name?` | `string` | Webhook name. Unique, max 128 characters. | services/webhook-url/types.ts:94 |
| <a id="property-url-20"></a> `url?` | `string` | Target URL for webhook delivery. | services/webhook-url/types.ts:97 |
| <a id="property-type-29"></a> `type?` | `"custom"` | Webhook type. | services/webhook-url/types.ts:100 |
| <a id="property-headers-2"></a> `headers?` | `string` | HTTP headers to include. | services/webhook-url/types.ts:103 |
| <a id="property-authorization_type-2"></a> `authorization_type?` | [`WebhookURLAuthorizationType`](#webhookurlauthorizationtype) | Authorization method. | services/webhook-url/types.ts:106 |
| <a id="property-authorization_value-2"></a> `authorization_value?` | `string` | Authorization value. | services/webhook-url/types.ts:109 |
| <a id="property-allow_insecure-8"></a> `allow_insecure?` | `boolean` | Whether to allow insecure TLS certificates. | services/webhook-url/types.ts:112 |
| <a id="property-timeout-4"></a> `timeout?` | `number` | Request timeout in seconds (3–120). | services/webhook-url/types.ts:115 |
| <a id="property-retries-2"></a> `retries?` | `number` | Number of delivery retries (0–100). | services/webhook-url/types.ts:118 |

***

### Webhook

Defined in: services/webhook/types.ts:21

A VergeOS webhook delivery log entry.

Webhooks are individual delivery records created automatically by the system
when events trigger notifications. They cannot be created or updated via the
API — only listed, retrieved, or deleted.

Entries auto-expire after 70 days. Maximum 3,000 rows per account.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-webhook_url"></a> `webhook_url?` | [`FlexKey`](#flexkey) | FK reference to the webhook URL destination. Read-only. | - | services/webhook/types.ts:23 |
| <a id="property-created-31"></a> `created?` | `number` | Creation timestamp (Unix epoch). Read-only. | - | services/webhook/types.ts:26 |
| <a id="property-last_attempt"></a> `last_attempt?` | `number` | Timestamp of last delivery attempt (Unix epoch). | - | services/webhook/types.ts:29 |
| <a id="property-message"></a> `message` | `string` | The message payload that was delivered. | - | services/webhook/types.ts:32 |
| <a id="property-status-26"></a> `status?` | [`WebhookStatus`](#webhookstatus) | Current delivery status. Default: `'queued'`. | - | services/webhook/types.ts:35 |
| <a id="property-status_info-8"></a> `status_info?` | `string` | Additional status details (e.g., error message). | - | services/webhook/types.ts:38 |
| <a id="property-key-94"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### WireGuardPeerStatus

Defined in: services/wireguard-peer-status/types.ts:14

A VergeOS WireGuard peer status resource.

Provides real-time connection statistics for a WireGuard peer, including
last handshake time and byte counters. This is a read-only resource —
status entries are managed by the system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-peer"></a> `peer` | [`FlexKey`](#flexkey) | Parent peer reference (FK to `vnet_wireguard_peers`). Read-only. | - | services/wireguard-peer-status/types.ts:16 |
| <a id="property-last_handshake"></a> `last_handshake?` | `number` | Unix timestamp of the last successful WireGuard handshake. | - | services/wireguard-peer-status/types.ts:19 |
| <a id="property-tx_bytes-3"></a> `tx_bytes?` | `number` | Total bytes transmitted to this peer. | - | services/wireguard-peer-status/types.ts:22 |
| <a id="property-rx_bytes-3"></a> `rx_bytes?` | `number` | Total bytes received from this peer. | - | services/wireguard-peer-status/types.ts:25 |
| <a id="property-last_update-6"></a> `last_update?` | `number` | Last update timestamp (Unix epoch). Read-only. | - | services/wireguard-peer-status/types.ts:28 |
| <a id="property-bulk_update-2"></a> `bulk_update?` | `boolean` | Whether bulk update is in progress. | - | services/wireguard-peer-status/types.ts:31 |
| <a id="property-key-95"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### WireGuardPeer

Defined in: services/wireguard-peer/types.ts:18

A VergeOS WireGuard peer resource.

Peers are added to a WireGuard interface to establish encrypted tunnels.
Each peer has a public key and allowed IPs defining traffic routing.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-wireguard"></a> `wireguard` | [`FlexKey`](#flexkey) | Parent WireGuard interface reference (FK to `vnet_wireguards`). Read-only. | - | services/wireguard-peer/types.ts:20 |
| <a id="property-name-149"></a> `name` | `string` | Peer display name. Min 1, max 128 characters. Unique per WireGuard interface. | - | services/wireguard-peer/types.ts:23 |
| <a id="property-description-130"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/wireguard-peer/types.ts:26 |
| <a id="property-enabled-84"></a> `enabled?` | `boolean` | Whether the peer is enabled. Default: `true`. | - | services/wireguard-peer/types.ts:29 |
| <a id="property-autogenerate_peer"></a> `autogenerate_peer?` | `boolean` | Whether to auto-generate the peer configuration file. | - | services/wireguard-peer/types.ts:32 |
| <a id="property-endpoint"></a> `endpoint?` | `string` | Remote endpoint address (hostname or IP). | - | services/wireguard-peer/types.ts:35 |
| <a id="property-port-7"></a> `port?` | `number` | Remote endpoint port. Range: 1–65535. Default: `51820`. | - | services/wireguard-peer/types.ts:38 |
| <a id="property-peer_ip"></a> `peer_ip` | `string` | Peer IP address. | - | services/wireguard-peer/types.ts:41 |
| <a id="property-private_key"></a> `private_key?` | `string` | Peer's private key (only relevant when auto-generating config). | - | services/wireguard-peer/types.ts:44 |
| <a id="property-public_key"></a> `public_key` | `string` | Peer's public key. Required. | - | services/wireguard-peer/types.ts:47 |
| <a id="property-preshared_key"></a> `preshared_key?` | `string` | Pre-shared key for additional security. | - | services/wireguard-peer/types.ts:50 |
| <a id="property-allowed_ips"></a> `allowed_ips` | `string` | Allowed IP ranges (comma-separated CIDRs). | - | services/wireguard-peer/types.ts:53 |
| <a id="property-configure_firewall"></a> `configure_firewall?` | [`WireGuardPeerFirewallConfig`](#wireguardpeerfirewallconfig) | Firewall rule creation mode. Default: `'site-to-site'`. | - | services/wireguard-peer/types.ts:56 |
| <a id="property-keepalive"></a> `keepalive?` | `number` | Persistent keepalive interval in seconds. Default: `0` (disabled). | - | services/wireguard-peer/types.ts:59 |
| <a id="property-wg_config"></a> `wg_config?` | `string` | Auto-generated WireGuard config file content. Read-only, populated when `autogenerate_peer` is true. | - | services/wireguard-peer/types.ts:62 |
| <a id="property-status-27"></a> `status?` | [`FlexKey`](#flexkey) | Peer status reference (FK to `vnet_wireguard_peer_status`). Read-only. | - | services/wireguard-peer/types.ts:65 |
| <a id="property-modified-30"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/wireguard-peer/types.ts:68 |
| <a id="property-key-96"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### WireGuardPeerCreateParams

Defined in: services/wireguard-peer/types.ts:79

Parameters for creating a new WireGuard peer.

`wireguard`, `name`, `peer_ip`, `public_key`, and `allowed_ips` are required.
Read-only fields are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-wireguard-1"></a> `wireguard` | [`FlexKey`](#flexkey) | Parent WireGuard interface reference (FK to `vnet_wireguards`). | services/wireguard-peer/types.ts:81 |
| <a id="property-name-150"></a> `name` | `string` | Peer display name. Min 1, max 128 characters. Must be unique per WireGuard interface. | services/wireguard-peer/types.ts:84 |
| <a id="property-description-131"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/wireguard-peer/types.ts:87 |
| <a id="property-enabled-85"></a> `enabled?` | `boolean` | Whether the peer is enabled. Default: `true`. | services/wireguard-peer/types.ts:90 |
| <a id="property-autogenerate_peer-1"></a> `autogenerate_peer?` | `boolean` | Whether to auto-generate the peer configuration file. | services/wireguard-peer/types.ts:93 |
| <a id="property-endpoint-1"></a> `endpoint?` | `string` | Remote endpoint address (hostname or IP). | services/wireguard-peer/types.ts:96 |
| <a id="property-port-8"></a> `port?` | `number` | Remote endpoint port. Range: 1–65535. Default: `51820`. | services/wireguard-peer/types.ts:99 |
| <a id="property-peer_ip-1"></a> `peer_ip` | `string` | Peer IP address. | services/wireguard-peer/types.ts:102 |
| <a id="property-private_key-1"></a> `private_key?` | `string` | Peer's private key (only relevant when auto-generating config). | services/wireguard-peer/types.ts:105 |
| <a id="property-public_key-1"></a> `public_key` | `string` | Peer's public key. | services/wireguard-peer/types.ts:108 |
| <a id="property-preshared_key-1"></a> `preshared_key?` | `string` | Pre-shared key for additional security. | services/wireguard-peer/types.ts:111 |
| <a id="property-allowed_ips-1"></a> `allowed_ips` | `string` | Allowed IP ranges (comma-separated CIDRs). | services/wireguard-peer/types.ts:114 |
| <a id="property-configure_firewall-1"></a> `configure_firewall?` | [`WireGuardPeerFirewallConfig`](#wireguardpeerfirewallconfig) | Firewall rule creation mode. Default: `'site-to-site'`. | services/wireguard-peer/types.ts:117 |
| <a id="property-keepalive-1"></a> `keepalive?` | `number` | Persistent keepalive interval in seconds. Default: `0` (disabled). | services/wireguard-peer/types.ts:120 |

***

### WireGuardPeerUpdateParams

Defined in: services/wireguard-peer/types.ts:131

Parameters for updating an existing WireGuard peer.

All fields are optional — only provided fields are changed.
Read-only fields (`wireguard`, `wg_config`, `status`, `modified`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-151"></a> `name?` | `string` | Peer display name. Min 1, max 128 characters. | services/wireguard-peer/types.ts:133 |
| <a id="property-description-132"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/wireguard-peer/types.ts:136 |
| <a id="property-enabled-86"></a> `enabled?` | `boolean` | Whether the peer is enabled. | services/wireguard-peer/types.ts:139 |
| <a id="property-autogenerate_peer-2"></a> `autogenerate_peer?` | `boolean` | Whether to auto-generate the peer configuration file. | services/wireguard-peer/types.ts:142 |
| <a id="property-endpoint-2"></a> `endpoint?` | `string` | Remote endpoint address (hostname or IP). | services/wireguard-peer/types.ts:145 |
| <a id="property-port-9"></a> `port?` | `number` | Remote endpoint port. Range: 1–65535. | services/wireguard-peer/types.ts:148 |
| <a id="property-peer_ip-2"></a> `peer_ip?` | `string` | Peer IP address. | services/wireguard-peer/types.ts:151 |
| <a id="property-private_key-2"></a> `private_key?` | `string` | Peer's private key. | services/wireguard-peer/types.ts:154 |
| <a id="property-public_key-2"></a> `public_key?` | `string` | Peer's public key. | services/wireguard-peer/types.ts:157 |
| <a id="property-preshared_key-2"></a> `preshared_key?` | `string` | Pre-shared key for additional security. | services/wireguard-peer/types.ts:160 |
| <a id="property-allowed_ips-2"></a> `allowed_ips?` | `string` | Allowed IP ranges (comma-separated CIDRs). | services/wireguard-peer/types.ts:163 |
| <a id="property-configure_firewall-2"></a> `configure_firewall?` | [`WireGuardPeerFirewallConfig`](#wireguardpeerfirewallconfig) | Firewall rule creation mode. | services/wireguard-peer/types.ts:166 |
| <a id="property-keepalive-2"></a> `keepalive?` | `number` | Persistent keepalive interval in seconds. | services/wireguard-peer/types.ts:169 |

***

### WireGuard

Defined in: services/wireguard/types.ts:14

A VergeOS WireGuard VPN interface resource.

WireGuard interfaces are created on a virtual network (parent: `vnet` FK).
Each interface generates a key pair and listens on a configurable port.
Peers are added to a WireGuard interface to establish tunnels.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-vnet-22"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). Read-only. | - | services/wireguard/types.ts:16 |
| <a id="property-name-152"></a> `name` | `string` | Interface display name. Min 1, max 128 characters. Unique per network. | - | services/wireguard/types.ts:19 |
| <a id="property-description-133"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | - | services/wireguard/types.ts:22 |
| <a id="property-enabled-87"></a> `enabled?` | `boolean` | Whether the interface is enabled. Default: `true`. | - | services/wireguard/types.ts:25 |
| <a id="property-ip-6"></a> `ip` | `string` | IP address in CIDR notation (e.g., "192.168.255.1/24"). | - | services/wireguard/types.ts:28 |
| <a id="property-listenport"></a> `listenport?` | `number` | UDP listen port. Range: 1–65535. Default: `51820`. | - | services/wireguard/types.ts:31 |
| <a id="property-mtu-3"></a> `mtu?` | `number` | Maximum transmission unit. Range: 0–65535. Default: `0` (auto). | - | services/wireguard/types.ts:34 |
| <a id="property-public_key-3"></a> `public_key?` | `string` | WireGuard public key. Locked after creation. | - | services/wireguard/types.ts:37 |
| <a id="property-private_key-3"></a> `private_key?` | `string` | WireGuard private key. Leave blank to auto-generate. | - | services/wireguard/types.ts:40 |
| <a id="property-endpoint_ip"></a> `endpoint_ip?` | `string` | Endpoint IP address for remote peers to connect to. | - | services/wireguard/types.ts:43 |
| <a id="property-configure_firewall-3"></a> `configure_firewall?` | `boolean` | Whether to auto-configure firewall rules. | - | services/wireguard/types.ts:46 |
| <a id="property-external_ip"></a> `external_ip?` | [`FlexKey`](#flexkey) | External IP address reference (FK to `vnet_addresses`). | - | services/wireguard/types.ts:49 |
| <a id="property-auto_apply_firewall"></a> `auto_apply_firewall?` | `boolean` | Whether to auto-apply firewall rules when peers change. | - | services/wireguard/types.ts:52 |
| <a id="property-nic-1"></a> `nic?` | [`FlexKey`](#flexkey) | Associated NIC reference (FK to `machine_nics`). Read-only. | - | services/wireguard/types.ts:55 |
| <a id="property-modified-31"></a> `modified?` | `number` | Last modification timestamp (Unix epoch). Read-only. | - | services/wireguard/types.ts:58 |
| <a id="property-key-97"></a> `$key` | [`FlexKey`](#flexkey) | - | [`Resource`](#resource).[`$key`](#property-key-98) | types.ts:12 |

***

### WireGuardCreateParams

Defined in: services/wireguard/types.ts:68

Parameters for creating a new WireGuard interface.

`vnet`, `name`, and `ip` are required. Read-only fields are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-vnet-23"></a> `vnet` | [`FlexKey`](#flexkey) | Parent network reference (FK to `vnets`). | services/wireguard/types.ts:70 |
| <a id="property-name-153"></a> `name` | `string` | Interface display name. Min 1, max 128 characters. Must be unique per network. | services/wireguard/types.ts:73 |
| <a id="property-description-134"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/wireguard/types.ts:76 |
| <a id="property-enabled-88"></a> `enabled?` | `boolean` | Whether the interface is enabled. Default: `true`. | services/wireguard/types.ts:79 |
| <a id="property-ip-7"></a> `ip` | `string` | IP address in CIDR notation (e.g., "192.168.255.1/24"). | services/wireguard/types.ts:82 |
| <a id="property-listenport-1"></a> `listenport?` | `number` | UDP listen port. Range: 1–65535. Default: `51820`. | services/wireguard/types.ts:85 |
| <a id="property-mtu-4"></a> `mtu?` | `number` | Maximum transmission unit. Range: 0–65535. Default: `0` (auto). | services/wireguard/types.ts:88 |
| <a id="property-public_key-4"></a> `public_key?` | `string` | WireGuard public key. Leave blank to auto-generate. | services/wireguard/types.ts:91 |
| <a id="property-private_key-4"></a> `private_key?` | `string` | WireGuard private key. Leave blank to auto-generate. | services/wireguard/types.ts:94 |
| <a id="property-endpoint_ip-1"></a> `endpoint_ip?` | `string` | Endpoint IP address for remote peers to connect to. | services/wireguard/types.ts:97 |
| <a id="property-configure_firewall-4"></a> `configure_firewall?` | `boolean` | Whether to auto-configure firewall rules. | services/wireguard/types.ts:100 |
| <a id="property-external_ip-1"></a> `external_ip?` | [`FlexKey`](#flexkey) | External IP address reference (FK to `vnet_addresses`). | services/wireguard/types.ts:103 |
| <a id="property-auto_apply_firewall-1"></a> `auto_apply_firewall?` | `boolean` | Whether to auto-apply firewall rules when peers change. | services/wireguard/types.ts:106 |

***

### WireGuardUpdateParams

Defined in: services/wireguard/types.ts:117

Parameters for updating an existing WireGuard interface.

All fields are optional — only provided fields are changed.
Read-only fields (`vnet`, `nic`, `modified`) and locked fields (`public_key`) are excluded.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-154"></a> `name?` | `string` | Interface display name. Min 1, max 128 characters. | services/wireguard/types.ts:119 |
| <a id="property-description-135"></a> `description?` | `string` | Human-readable description. Max 2048 characters. | services/wireguard/types.ts:122 |
| <a id="property-enabled-89"></a> `enabled?` | `boolean` | Whether the interface is enabled. | services/wireguard/types.ts:125 |
| <a id="property-ip-8"></a> `ip?` | `string` | IP address in CIDR notation. | services/wireguard/types.ts:128 |
| <a id="property-listenport-2"></a> `listenport?` | `number` | UDP listen port. Range: 1–65535. | services/wireguard/types.ts:131 |
| <a id="property-mtu-5"></a> `mtu?` | `number` | Maximum transmission unit. Range: 0–65535. | services/wireguard/types.ts:134 |
| <a id="property-private_key-5"></a> `private_key?` | `string` | WireGuard private key. | services/wireguard/types.ts:137 |
| <a id="property-endpoint_ip-2"></a> `endpoint_ip?` | `string` | Endpoint IP address for remote peers to connect to. | services/wireguard/types.ts:140 |
| <a id="property-configure_firewall-5"></a> `configure_firewall?` | `boolean` | Whether to auto-configure firewall rules. | services/wireguard/types.ts:143 |
| <a id="property-external_ip-2"></a> `external_ip?` | [`FlexKey`](#flexkey) | External IP address reference (FK to `vnet_addresses`). | services/wireguard/types.ts:146 |
| <a id="property-auto_apply_firewall-2"></a> `auto_apply_firewall?` | `boolean` | Whether to auto-apply firewall rules when peers change. | services/wireguard/types.ts:149 |

***

### Resource

Defined in: types.ts:11

Base interface for all VergeOS resources.
Every resource returned by the API includes a `$key` identifier.

#### Extended by

- [`Alarm`](#alarm)
- [`AlarmType`](#alarmtype)
- [`UserAPIKey`](#userapikey)
- [`Catalog`](#catalog)
- [`CatalogRepository`](#catalogrepository)
- [`Certificate`](#certificate)
- [`CloudInitFile`](#cloudinitfile)
- [`CloudSnapshot`](#cloudsnapshot)
- [`CloudSnapshotTenant`](#cloudsnapshottenant)
- [`CloudSnapshotVM`](#cloudsnapshotvm)
- [`Cluster`](#cluster)
- [`ClusterTier`](#clustertier)
- [`ClusterTierStats`](#clustertierstats)
- [`ClusterTierStatus`](#clustertierstatus)
- [`VgFile`](#vgfile)
- [`Group`](#group)
- [`IPSec`](#ipsec)
- [`IPSecConnection`](#ipsecconnection)
- [`IPSecPhase1`](#ipsecphase1)
- [`IPSecPhase2`](#ipsecphase2)
- [`Log`](#log)
- [`MachineDevice`](#machinedevice)
- [`MachineDrive`](#machinedrive)
- [`MachineDrivePhys`](#machinedrivephys)
- [`MachineDriveStats`](#machinedrivestats)
- [`MachineLog`](#machinelog)
- [`MachineNIC`](#machinenic)
- [`MachineNicStats`](#machinenicstats)
- [`MachineNicStatsHistoryLong`](#machinenicstatshistorylong)
- [`MachineNicStatsHistoryShort`](#machinenicstatshistoryshort)
- [`MachineSnapshot`](#machinesnapshot)
- [`MachineStats`](#machinestats)
- [`MachineStatsHistoryLong`](#machinestatshistorylong)
- [`MachineStatsHistoryShort`](#machinestatshistoryshort)
- [`MachineStatus`](#machinestatus)
- [`Member`](#member)
- [`NASService`](#nasservice)
- [`NASServiceUser`](#nasserviceuser)
- [`Network`](#network)
- [`NetworkAddress`](#networkaddress)
- [`NetworkDnsRecord`](#networkdnsrecord)
- [`NetworkDnsView`](#networkdnsview)
- [`NetworkDnsZone`](#networkdnszone)
- [`NetworkHost`](#networkhost)
- [`NetworkRule`](#networkrule)
- [`NetworkRuleAlias`](#networkrulealias)
- [`Node`](#node)
- [`Permission`](#permission)
- [`ResourceGroup`](#resourcegroup)
- [`Setting`](#setting)
- [`Site`](#site)
- [`SiteSyncIncoming`](#sitesyncincoming)
- [`SiteSyncOutgoing`](#sitesyncoutgoing)
- [`SiteSyncProfilePeriod`](#sitesyncprofileperiod)
- [`SnapshotProfile`](#snapshotprofile)
- [`SnapshotProfilePeriod`](#snapshotprofileperiod)
- [`StorageTier`](#storagetier)
- [`StorageTierStats`](#storagetierstats)
- [`System`](#system)
- [`Tag`](#tag)
- [`TagCategory`](#tagcategory)
- [`TagMember`](#tagmember)
- [`Task`](#task)
- [`Tenant`](#tenant)
- [`TenantLayer2Network`](#tenantlayer2network)
- [`TenantNode`](#tenantnode)
- [`TenantRecipe`](#tenantrecipe)
- [`TenantRecipeInstance`](#tenantrecipeinstance)
- [`TenantSnapshot`](#tenantsnapshot)
- [`TenantStatsHistoryLong`](#tenantstatshistorylong)
- [`TenantStatsHistoryShort`](#tenantstatshistoryshort)
- [`TenantStorage`](#tenantstorage)
- [`UpdateBranch`](#updatebranch)
- [`UpdateSettings`](#updatesettings)
- [`UpdateSource`](#updatesource)
- [`UpdateSourcePackage`](#updatesourcepackage)
- [`User`](#user)
- [`VM`](#vm)
- [`RecipeQuestion`](#recipequestion)
- [`RecipeSection`](#recipesection)
- [`VMRecipe`](#vmrecipe)
- [`VMRecipeInstance`](#vmrecipeinstance)
- [`VnetMonitorStatsHistoryLong`](#vnetmonitorstatshistorylong)
- [`VnetMonitorStatsHistoryShort`](#vnetmonitorstatshistoryshort)
- [`Volume`](#volume)
- [`VolumeCIFSShare`](#volumecifsshare)
- [`VolumeNFSShare`](#volumenfsshare)
- [`VolumeSnapshot`](#volumesnapshot)
- [`VolumeSync`](#volumesync)
- [`Webhook`](#webhook)
- [`WebhookURL`](#webhookurl)
- [`WireGuard`](#wireguard)
- [`WireGuardPeer`](#wireguardpeer)
- [`WireGuardPeerStatus`](#wireguardpeerstatus)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-key-98"></a> `$key` | [`FlexKey`](#flexkey) | types.ts:12 |

***

### ApiResponse

Defined in: types.ts:19

Envelope type for VergeOS API responses.
Wraps the response data with optional key and error information.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-key-99"></a> `$key?` | [`FlexKey`](#flexkey) | types.ts:20 |
| <a id="property-response"></a> `response?` | `T` | types.ts:21 |
| <a id="property-err"></a> `err?` | `string` | types.ts:22 |

***

### ClientConfig

Defined in: types.ts:28

Configuration for creating a VergeClient instance.

#### Extended by

- [`SiteConfig`](index.md#siteconfig)

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-host-7"></a> `host` | `string` | VergeOS server hostname or URL (e.g., "192.168.1.100" or "https://my-verge.example.com"). | types.ts:30 |
| <a id="property-username-2"></a> `username?` | `string` | Username for authentication (used with password-based auth). | types.ts:33 |
| <a id="property-password-20"></a> `password?` | `string` | Password for authentication (used with password-based auth). | types.ts:36 |
| <a id="property-apikey-3"></a> `apiKey?` | `string` | API key for token-based authentication. | types.ts:39 |
| <a id="property-verifyssl"></a> `verifySsl?` | `boolean` | Whether to verify SSL certificates. Defaults to `true`. **Note:** The SDK uses the platform's native `fetch` implementation, which does not expose certificate validation controls. This option is respected when you supply a custom `fetch` that honours it (e.g., `undici` with a custom `Agent`, or Node.js `https.Agent` with `rejectUnauthorized`). In browsers, certificate validation is always enforced by the runtime. | types.ts:50 |
| <a id="property-timeout-5"></a> `timeout?` | `number` | Request timeout in milliseconds. Defaults to `DEFAULT_TIMEOUT`. | types.ts:53 |
| <a id="property-retries-3"></a> `retries?` | `number` | Number of retry attempts for failed requests. Defaults to `DEFAULT_RETRIES`. | types.ts:56 |
| <a id="property-retrybackoff"></a> `retryBackoff?` | `number` | Backoff interval between retries in milliseconds. Defaults to `DEFAULT_RETRY_BACKOFF`. | types.ts:59 |
| <a id="property-fetch"></a> `fetch?` | (`input`, `init?`) => `Promise`\<`Response`\> | Custom fetch implementation for testing or platform-specific overrides. | types.ts:62 |
| <a id="property-signal"></a> `signal?` | `AbortSignal` | AbortSignal for cancelling requests. | types.ts:65 |

***

### ListOptions

Defined in: types.ts:71

Options for list (query) operations.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-filter-2"></a> `filter?` | `string` | Filter expression string for the VergeOS API query. | types.ts:73 |
| <a id="property-fields-1"></a> `fields?` | `string` \| `string`[] | Fields to include in the response. Accepts a comma-separated string or an array of field names. | types.ts:76 |
| <a id="property-sort-2"></a> `sort?` | `string` | Sort expression (e.g., "name" or "-created"). | types.ts:79 |
| <a id="property-limit-2"></a> `limit?` | `number` | Maximum number of items to return per request. | types.ts:82 |
| <a id="property-offset-2"></a> `offset?` | `number` | Number of items to skip (for pagination). | types.ts:85 |

***

### ListAllOptions

Defined in: types.ts:92

Options for auto-paginated list operations that fetch all matching resources.
Omits `limit` and `offset` (managed internally) and adds `pageSize` control.

#### Extends

- `Omit`\<[`ListOptions`](#listoptions), `"limit"` \| `"offset"`\>

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-filter-3"></a> `filter?` | `string` | Filter expression string for the VergeOS API query. | [`ListOptions`](#listoptions).[`filter`](#property-filter-2) | types.ts:73 |
| <a id="property-fields-2"></a> `fields?` | `string` \| `string`[] | Fields to include in the response. Accepts a comma-separated string or an array of field names. | [`ListOptions`](#listoptions).[`fields`](#property-fields-1) | types.ts:76 |
| <a id="property-sort-3"></a> `sort?` | `string` | Sort expression (e.g., "name" or "-created"). | [`ListOptions`](#listoptions).[`sort`](#property-sort-2) | types.ts:79 |
| <a id="property-pagesize"></a> `pageSize?` | `number` | Number of items to fetch per page during auto-pagination. Defaults to `DEFAULT_PAGE_SIZE`. | - | types.ts:94 |

***

### MutationOptions

Defined in: types.ts:100

Options for mutation operations (create, update, delete).

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-readback"></a> `readBack?` | `boolean` | Whether to perform a follow-up GET to return the full resource after mutation. Defaults to `true`. | types.ts:102 |

## Type Aliases

### AlarmLevel

> **AlarmLevel** = `"audit"` \| `"message"` \| `"warning"` \| `"error"` \| `"critical"` \| `"summary"` \| `"debug"`

Defined in: services/alarm/types.ts:6

Alarm severity level.

***

### AlarmOwnerType

> **AlarmOwnerType** = `"vms"` \| `"vnets"` \| `"tenant_nodes"` \| `"nodes"` \| `"users"` \| `"system"` \| `"cloud_snapshots"`

Defined in: services/alarm/types.ts:16

Alarm owner type — the type of resource that raised the alarm.

***

### AlarmSubOwnerType

> **AlarmSubOwnerType** = `""` \| `"machine_drives"` \| `"machine_nics"` \| `"machine_devices"` \| `"smtp_settings"`

Defined in: services/alarm/types.ts:26

Alarm sub-owner type — the type of sub-resource, if applicable.

***

### ApiKeyExpiresType

> **ApiKeyExpiresType** = `"never"` \| `"date"` \| `string` & \{ \}

Defined in: services/api-key/types.ts:6

Expiration type for API keys.

***

### CatalogRepositoryType

> **CatalogRepositoryType** = `"local"` \| `"provider"` \| `"remote"` \| `"remote-git"` \| `"yottabyte"`

Defined in: services/catalog-repository/types.ts:8

Repository type indicating the source of catalog data.

***

### CatalogMaxTier

> **CatalogMaxTier** = `"1"` \| `"2"` \| `"3"` \| `"4"` \| `"5"`

Defined in: services/catalog-repository/types.ts:15

Maximum storage tier for recipe downloads.

Values are string representations of tier numbers.

***

### CatalogRepositoryOverrideScope

> **CatalogRepositoryOverrideScope** = `"private"` \| `"global"` \| `"tenant"` \| `"none"`

Defined in: services/catalog-repository/types.ts:20

Override scope for catalog publishing defaults.

***

### CatalogPublishingScope

> **CatalogPublishingScope** = `"private"` \| `"global"` \| `"tenant"` \| `"none"`

Defined in: services/catalog/types.ts:10

Publishing scope for a catalog.

Controls which tenants can see and use recipes from this catalog.

***

### CertificateType

> **CertificateType** = `"manual"` \| `"letsencrypt"` \| `"self_signed"` \| `string` & \{ \}

Defined in: services/certificate/types.ts:6

Certificate type indicating how the certificate was provisioned.

***

### CertificateKeyType

> **CertificateKeyType** = `"ecdsa"` \| `"rsa"` \| `string` & \{ \}

Defined in: services/certificate/types.ts:9

Cryptographic key type for the certificate.

***

### CloudInitFileRender

> **CloudInitFileRender** = `"no"` \| `"variables"` \| `"jinja2"` \| `string` & \{ \}

Defined in: services/cloud-init/types.ts:6

Rendering mode for cloud-init file contents.

***

### CloudSnapshotTenantStatus

> **CloudSnapshotTenantStatus** = `"idle"` \| `"importing"` \| `"complete"` \| `"error"`

Defined in: services/cloud-snapshot-tenant/types.ts:6

Cloud snapshot tenant import/recovery status.

***

### CloudSnapshotVMStatus

> **CloudSnapshotVMStatus** = `"idle"` \| `"importing"` \| `"complete"` \| `"error"`

Defined in: services/cloud-snapshot-vm/types.ts:6

Cloud snapshot VM import/recovery status.

***

### CloudSnapshotExpiresType

> **CloudSnapshotExpiresType** = `"never"` \| `"date"` \| `string` & \{ \}

Defined in: services/cloud-snapshot/types.ts:72

Cloud snapshot expiration type.

***

### CloudSnapshotImmutableStatus

> **CloudSnapshotImmutableStatus** = `"unlocked"` \| `"unlocking"` \| `"locked"`

Defined in: services/cloud-snapshot/types.ts:75

Cloud snapshot immutability lock status.

***

### CloudSnapshotStatus

> **CloudSnapshotStatus** = `"normal"` \| `"held"`

Defined in: services/cloud-snapshot/types.ts:78

Cloud snapshot status.

***

### ClusterTierStatusValue

> **ClusterTierStatusValue** = `"online"` \| `"offline"` \| `"repairing"` \| `"initializing"` \| `"verifying"` \| `"noredundant"` \| `"outofspace"`

Defined in: services/cluster-tier-status/types.ts:10

Cluster tier operational status values.

Describes the current operational state of a cluster tier in the vSAN.

***

### ClusterTierState

> **ClusterTierState** = `"online"` \| `"offline"` \| `"warning"` \| `"error"`

Defined in: services/cluster-tier-status/types.ts:24

Cluster tier health state values.

High-level health indicator for dashboard display.

***

### CpuType

> **CpuType** = `"Broadwell"` \| `"Cascadelake-Server"` \| `"Conroe"` \| `"Cooperlake"` \| `"core2duo"` \| `"coreduo"` \| `"Denverton"` \| `"EPYC"` \| `"EPYC-Genoa"` \| `"EPYC-Milan"` \| `"EPYC-Rome"` \| `"GraniteRapids"` \| `"Haswell"` \| `"host"` \| `"Icelake-Server"` \| `"IvyBridge"` \| `"KnightsMill"` \| `"kvm64"` \| `"n270"` \| `"Nehalem"` \| `"Opteron_G1"` \| `"Opteron_G2"` \| `"Opteron_G3"` \| `"Opteron_G4"` \| `"Opteron_G5"` \| `"Penryn"` \| `"phenom"` \| `"qemu64"` \| `"SandyBridge"` \| `"SapphireRapids"` \| `"Skylake-Client"` \| `"Skylake-Server"` \| `"Snowridge"` \| `"Westmere"`

Defined in: services/cluster/types.ts:6

CPU type identifier for cluster configuration.

***

### EnergyPerfPolicy

> **EnergyPerfPolicy** = `"balance-performance"` \| `"balance-power"` \| `"normal"` \| `"performance"` \| `"power"`

Defined in: services/cluster/types.ts:43

Energy-performance policy for cluster CPUs.

***

### ScalingGovernor

> **ScalingGovernor** = `"ondemand"` \| `"performance"` \| `"powersave"`

Defined in: services/cluster/types.ts:51

CPU scaling governor for cluster nodes.

***

### VgFileType

> **VgFileType** = `"iso"` \| `"img"` \| `"qcow"` \| `"qcow2"` \| `"qed"` \| `"raw"` \| `"vdi"` \| `"vhd"` \| `"vhdx"` \| `"vmdk"` \| `"ova"` \| `"ovf"` \| `"vmx"` \| `"9p"` \| `"dir"` \| `"png"` \| `"jpg"` \| `"svg"` \| `"webp"` \| `"ybvm"` \| `"nvram"` \| `"unknown"` \| `"ico"` \| `"diagnostics"` \| `"zip"` \| `"lrq"` \| `"run"` \| `string` & \{ \}

Defined in: services/file/types.ts:6

File type enum values supported by VergeOS.

***

### FilePreferredTier

> **FilePreferredTier** = `"1"` \| `"2"` \| `"3"` \| `"4"` \| `"5"` \| `string` & \{ \}

Defined in: services/file/types.ts:39

Preferred storage tier values (1-5).

***

### IPSecKeyExchange

> **IPSecKeyExchange** = `"ikev1"` \| `"ikev2"` \| `"ike"` \| `string` & \{ \}

Defined in: services/ipsec-phase1/types.ts:6

IKE version for key exchange.

***

### IPSecAuth

> **IPSecAuth** = `"psk"` \| `"pubkey"` \| `string` & \{ \}

Defined in: services/ipsec-phase1/types.ts:9

IPSec Phase 1 authentication method.

***

### IPSecNegotiation

> **IPSecNegotiation** = `"main"` \| `"aggressive"` \| `string` & \{ \}

Defined in: services/ipsec-phase1/types.ts:12

IKEv1 negotiation mode.

***

### IPSecAuto

> **IPSecAuto** = `"add"` \| `"route"` \| `"start"` \| `string` & \{ \}

Defined in: services/ipsec-phase1/types.ts:15

IPSec connection startup behavior.

***

### IPSecDpdAction

> **IPSecDpdAction** = `"none"` \| `"clear"` \| `"hold"` \| `"restart"` \| `string` & \{ \}

Defined in: services/ipsec-phase1/types.ts:18

Dead peer detection action.

***

### IPSecPhase2Mode

> **IPSecPhase2Mode** = `"tunnel"` \| `"transport"` \| `string` & \{ \}

Defined in: services/ipsec-phase2/types.ts:6

IPSec tunnel mode.

***

### IPSecProtocol

> **IPSecProtocol** = `"esp"` \| `"ah"` \| `string` & \{ \}

Defined in: services/ipsec-phase2/types.ts:9

IPSec security protocol.

***

### IPSecMode

> **IPSecMode** = `"advanced"` \| `"normal"` \| `string` & \{ \}

Defined in: services/ipsec/types.ts:6

IPSec configuration mode.

***

### IPSecUniqueIds

> **IPSecUniqueIds** = `"yes"` \| `"no"` \| `"never"` \| `"replace"` \| `"keep"` \| `string` & \{ \}

Defined in: services/ipsec/types.ts:9

IPSec unique participant ID handling policy.

***

### IPSecStrictCrlPolicy

> **IPSecStrictCrlPolicy** = `"yes"` \| `"ifuri"` \| `"no"` \| `string` & \{ \}

Defined in: services/ipsec/types.ts:12

IPSec CRL validation policy.

***

### LogLevel

> **LogLevel** = `"audit"` \| `"message"` \| `"warning"` \| `"error"` \| `"critical"` \| `"summary"` \| `"debug"`

Defined in: services/log/types.ts:16

Log severity/level.

- `audit` — Audit trail events
- `message` — Informational messages (default)
- `warning` — Warning conditions
- `error` — Error conditions
- `critical` — Critical failures
- `summary` — Summary entries
- `debug` — Debug information

***

### LogObjectType

> **LogObjectType** = `"catalog_repository"` \| `"cloud_snapshots"` \| `"cluster"` \| `"file"` \| `"group"` \| `"node"` \| `"oidc_application"` \| `"other"` \| `"permission"` \| `"service_container"` \| `"smtp"` \| `"tenant"` \| `"updates"` \| `"user"` \| `"vm"` \| `"vm_service"` \| `"vm_import"` \| `"vmware_container"` \| `"vnet"` \| `"site"` \| `"system"` \| `"snapshot_profile"` \| `"import_export"` \| `"task"`

Defined in: services/log/types.ts:23

Object type associated with a log entry.

Identifies which VergeOS subsystem generated the log message.

***

### DeviceType

> **DeviceType** = `"gpu"` \| `"nvidia_vgpu"` \| `"tpm"` \| `"node_usb_devices"` \| `"node_sriov_nic_devices"` \| `"node_pci_devices"` \| `"node_host_gpu_devices"` \| `"node_nvidia_vgpu_devices"` \| `string` & \{ \}

Defined in: services/machine-device/types.ts:17

Device type — determines the type of device attached to a machine.

- `gpu` — GPU passthrough (legacy)
- `nvidia_vgpu` — NVIDIA vGPU (legacy)
- `tpm` — Trusted Platform Module (vTPM)
- `node_usb_devices` — USB device
- `node_sriov_nic_devices` — SR-IOV NIC
- `node_pci_devices` — PCI device
- `node_host_gpu_devices` — Host GPU
- `node_nvidia_vgpu_devices` — NVIDIA vGPU (current)

***

### MachineType

> **MachineType** = `"vm"` \| `"container"` \| `"vmware_container"` \| `"service_container"` \| `"metal"` \| `"vdi"` \| `"node"` \| `"tenant"` \| `"vnet"`

Defined in: services/machine-device/types.ts:31

Machine type — the type of machine a device is attached to.

***

### LocateStatus

> **LocateStatus** = `"unsupported"` \| `"on"` \| `"off"`

Defined in: services/machine-drive-phys/types.ts:12

Drive locate LED status.

- `unsupported` — Drive does not support locate LED
- `on` — Locate LED is on
- `off` — Locate LED is off

***

### DriveMedia

> **DriveMedia** = `"disk"` \| `"cdrom"` \| `"efidisk"` \| `"import"` \| `"9p"` \| `"dir"` \| `"clone"` \| `"clone9p"` \| `"clonedir"` \| `"nonpersistent"` \| `"nonpersistent9p"` \| `"nonpersistentdir"` \| `string` & \{ \}

Defined in: services/machine-drive/types.ts:21

Drive media type — determines what kind of storage the drive represents.

- `disk` — standard virtual disk (default)
- `cdrom` — CD/DVD-ROM drive
- `efidisk` — EFI system partition
- `import` — imported disk image
- `9p` — Plan 9 filesystem share
- `dir` — directory share
- `clone` — cloned disk
- `clone9p` — cloned Plan 9 share
- `clonedir` — cloned directory share
- `nonpersistent` — non-persistent disk (reverts on reboot)
- `nonpersistent9p` — non-persistent Plan 9 share
- `nonpersistentdir` — non-persistent directory share

***

### DriveInterface

> **DriveInterface** = `"virtio-scsi"` \| `"virtio"` \| `"ide"` \| `"ahci"` \| `"nvme"` \| `"cifs"` \| `"nfs"` \| `"vsan"` \| `"lsi53c895a"` \| `"megasas"` \| `"megasas-gen2"` \| `"mptsas1068"` \| `"virtio-scsi-dedicated"` \| `"pflash"` \| `"direct"` \| `"tpm_state"` \| `"usb"` \| `string` & \{ \}

Defined in: services/machine-drive/types.ts:57

Drive bus interface — controls how the drive is attached to the machine.

- `virtio-scsi` — recommended default (SCSI over virtio)
- `virtio` — legacy paravirtual block device
- `ide` — IDE controller
- `ahci` — SATA (AHCI) controller
- `nvme` — NVMe controller
- `cifs` — CIFS/SMB pass-through
- `nfs` — NFS pass-through
- `vsan` — vSAN pass-through
- `lsi53c895a` — LSI Logic SCSI
- `megasas` — MegaRAID SAS
- `megasas-gen2` — MegaRAID SAS Gen2
- `mptsas1068` — Fusion-MPT SAS
- `virtio-scsi-dedicated` — dedicated virtio-scsi controller
- `pflash` — platform flash
- `direct` — direct device pass-through
- `tpm_state` — TPM state storage
- `usb` — USB mass storage

***

### DriveOptimize

> **DriveOptimize** = `"general"` \| `"large"` \| `string` & \{ \}

Defined in: services/machine-drive/types.ts:78

Drive optimization setting.

***

### DrivePreferredTier

> **DrivePreferredTier** = `"1"` \| `"2"` \| `"3"` \| `"4"` \| `"5"` \| `string` & \{ \}

Defined in: services/machine-drive/types.ts:81

Drive preferred storage tier.

***

### MachineLogLevel

> **MachineLogLevel** = `"audit"` \| `"message"` \| `"warning"` \| `"error"` \| `"critical"` \| `"summary"` \| `"debug"` \| `string` & \{ \}

Defined in: services/machine-log/types.ts:16

Machine log severity level.

- `audit` — audit trail entries
- `message` — informational messages (default)
- `warning` — warning conditions
- `error` — error conditions
- `critical` — critical failures
- `summary` — summary entries
- `debug` — debug-level messages

***

### NicInterface

> **NicInterface** = `"virtio"` \| `"e1000"` \| `"e1000e"` \| `"rtl8139"` \| `"pcnet"` \| `"igb"` \| `"vmxnet3"` \| `"direct"` \| `string` & \{ \}

Defined in: services/machine-nic/types.ts:17

NIC interface type — determines the virtual network adapter model.

- `virtio` — paravirtualized (recommended, best performance)
- `e1000` — Intel e1000 (broad guest support)
- `e1000e` — Intel e1000e (newer Intel emulation)
- `rtl8139` — Realtek 8139 (legacy)
- `pcnet` — AMD PCnet (legacy)
- `igb` — Intel 82576 (advanced features)
- `vmxnet3` — VMware Paravirtualized Ethernet v3
- `direct` — direct device pass-through

***

### ExpiresType

> **ExpiresType** = `"never"` \| `"date"` \| `string` & \{ \}

Defined in: services/machine-snapshot/types.ts:6

Snapshot expiration policy.

***

### MachineStatusValue

> **MachineStatusValue** = `"initializing"` \| `"starting"` \| `"running"` \| `"stopping"` \| `"unresponsive"` \| `"stopped"` \| `"hibernated"` \| `"hibernating"` \| `"initmigrate"` \| `"startmigrate"` \| `"migrating"` \| `"migratecomplete"` \| `"importing"` \| `"maintenance"` \| `"leavingmaintenance"` \| `"unlicensed"` \| `"needsrefresh"` \| `"needsrestart"` \| `"waitingforresources"` \| `"error"` \| `"driversreloading"`

Defined in: services/machine-status/types.ts:10

Machine runtime status — describes what the machine is currently doing.

Returned by the `/api/v4/machine_status` endpoint.

***

### MachineState

> **MachineState** = `"online"` \| `"offline"` \| `"warning"` \| `"error"`

Defined in: services/machine-status/types.ts:34

Machine high-level health state.

***

### MemberUpdateParams

> **MemberUpdateParams** = `Record`\<`string`, `never`\>

Defined in: services/member/types.ts:55

Parameters for updating an existing group membership.

Both key fields (`parent_group`, `member`) are read-only after creation,
and `system` is a locked field. No mutable fields remain, but the
interface is kept for type compatibility with BaseService.

***

### NASReadAheadKb

> **NASReadAheadKb** = `"0"` \| `"64"` \| `"128"` \| `"256"` \| `"512"` \| `"1024"` \| `"2048"` \| `"4096"` \| `string` & \{ \}

Defined in: services/nas-service/types.ts:6

Read-ahead buffer size in kilobytes (string values).

***

### AddressType

> **AddressType** = `"dynamic"` \| `"static"` \| `"ipalias"` \| `"proxy"` \| `"virtual"` \| `string` & \{ \}

Defined in: services/network-address/types.ts:6

Network address type: DHCP lease, static assignment, IP alias, proxy ARP, or virtual IP.

***

### DnsRecordType

> **DnsRecordType** = `"A"` \| `"CAA"` \| `"CNAME"` \| `"MX"` \| `"NS"` \| `"PTR"` \| `"SRV"` \| `"TXT"` \| `string` & \{ \}

Defined in: services/network-dns-record/types.ts:6

DNS record type.

***

### DnsZoneType

> **DnsZoneType** = `"master"` \| `"slave"` \| `"redirect"` \| `"forward"` \| `"static-stub"` \| `"stub"` \| `string` & \{ \}

Defined in: services/network-dns-zone/types.ts:6

DNS zone type.

***

### DnsZoneNotify

> **DnsZoneNotify** = `"yes"` \| `"no"` \| `"explicit"` \| `string` & \{ \}

Defined in: services/network-dns-zone/types.ts:16

DNS zone notify setting.

***

### HostType

> **HostType** = `"host"` \| `"domain"` \| `string` & \{ \}

Defined in: services/network-host/types.ts:6

Host override type — `host` for a single hostname, `domain` for a whole domain.

***

### PublishingScope

> **PublishingScope** = `"private"` \| `"global"` \| `"tenant"` \| `"none"` \| `string` & \{ \}

Defined in: services/network-rule-alias/types.ts:6

Publishing scope for a rule alias. Controls visibility across tenants.

***

### RuleAction

> **RuleAction** = `"accept"` \| `"drop"` \| `"reject"` \| `"translate"` \| `"route"` \| `string` & \{ \}

Defined in: services/network-rule/types.ts:6

Firewall rule action type.

***

### RuleDirection

> **RuleDirection** = `"incoming"` \| `"outgoing"` \| `string` & \{ \}

Defined in: services/network-rule/types.ts:9

Traffic direction for a rule.

***

### RuleProtocol

> **RuleProtocol** = `"tcp"` \| `"tcpudp"` \| `"udp"` \| `"icmp"` \| `"89"` \| `"2"` \| `"47"` \| `"50"` \| `"51"` \| `"any"` \| `string` & \{ \}

Defined in: services/network-rule/types.ts:12

Network protocol for a rule. Includes numeric protocol IDs for OSPF, IGMP, GRE, ESP, AH.

***

### RuleInterface

> **RuleInterface** = `"auto"` \| `"router"` \| `"dmz"` \| `"wireguard"` \| `"any"` \| `string` & \{ \}

Defined in: services/network-rule/types.ts:26

Network interface for a rule.

***

### RulePin

> **RulePin** = `"no"` \| `"top"` \| `"bottom"` \| `string` & \{ \}

Defined in: services/network-rule/types.ts:29

Rule pinning position for ordering.

***

### NetworkType

> **NetworkType** = `"internal"` \| `"external"` \| `"bgp"` \| `"dmz"` \| `"core"` \| `"physical"` \| `"port_mirror"` \| `"vpn"` \| `string` & \{ \}

Defined in: services/network/types.ts:6

Network type — determines routing behavior and infrastructure role.

***

### Layer2Type

> **Layer2Type** = `"vlan"` \| `"vxlan"` \| `"none"` \| `"bond"` \| `"bond_slave"` \| `string` & \{ \}

Defined in: services/network/types.ts:18

Layer 2 encapsulation type.

***

### DnsMode

> **DnsMode** = `"disabled"` \| `"simple"` \| `"bind"` \| `"network"` \| `string` & \{ \}

Defined in: services/network/types.ts:21

DNS service mode for the network router.

***

### IpAddressType

> **IpAddressType** = `"static"` \| `"dynamic"` \| `"bgp"` \| `"none"` \| `string` & \{ \}

Defined in: services/network/types.ts:24

IP address assignment method.

***

### NetworkOnPowerLoss

> **NetworkOnPowerLoss** = `"power_on"` \| `"last_state"` \| `"leave_off"` \| `string` & \{ \}

Defined in: services/network/types.ts:27

Behavior when host power is restored after an outage.

***

### PortMirroringMode

> **PortMirroringMode** = `"off"` \| `"east_west"` \| `"north_south"` \| `string` & \{ \}

Defined in: services/network/types.ts:30

Port mirroring mode.

***

### PxeMode

> **PxeMode** = `"none"` \| `"ybos"` \| `"custom"` \| `string` & \{ \}

Defined in: services/network/types.ts:33

PXE boot mode.

***

### RateLimitType

> **RateLimitType** = `"bytes/second"` \| `"kbytes/second"` \| `"mbytes/second"` \| `"bytes/minute"` \| `"kbytes/minute"` \| `"mbytes/minute"` \| `"bytes/hour"` \| `"kbytes/hour"` \| `"mbytes/hour"` \| `"bytes/day"` \| `"kbytes/day"` \| `"mbytes/day"` \| `"second"` \| `"minute"` \| `"hour"` \| `"day"` \| `string` & \{ \}

Defined in: services/network/types.ts:36

Rate limit unit type.

***

### IpmiStatus

> **IpmiStatus** = `"offline"` \| `"ready"` \| `"connecting"` \| `"error"`

Defined in: services/node/types.ts:6

IPMI connection status for a node.

***

### ResourceGroupType

> **ResourceGroupType** = `"node_pci_devices"` \| `"node_sriov_nic_devices"` \| `"node_usb_devices"` \| `"node_host_gpu_devices"` \| `"node_nvidia_vgpu_devices"`

Defined in: services/resource-group/types.ts:6

Hardware device type for a resource group.

***

### ResourceGroupClass

> **ResourceGroupClass** = `"unknown"` \| `"gpu"` \| `"vgpu"` \| `"storage"` \| `"hid"` \| `"usb"` \| `"network"` \| `"media"` \| `"audio"` \| `"fpga"` \| `"pci"`

Defined in: services/resource-group/types.ts:14

Device class categorization for a resource group.

***

### SiteSyncIncomingStatus

> **SiteSyncIncomingStatus** = `"generating_reg"` \| `"syncing"` \| `"offline"` \| `"error"` \| `"regeneration_needed"`

Defined in: services/site-sync-incoming/types.ts:6

Incoming sync status.

***

### SiteSyncIncomingState

> **SiteSyncIncomingState** = `"online"` \| `"offline"` \| `"warning"` \| `"error"`

Defined in: services/site-sync-incoming/types.ts:14

Incoming sync state.

***

### SiteSyncIncomingForceTier

> **SiteSyncIncomingForceTier** = `"unspecified"` \| `"1"` \| `"2"` \| `"3"` \| `"4"` \| `"5"`

Defined in: services/site-sync-incoming/types.ts:17

Force tier selection for incoming syncs.

***

### SiteSyncOutgoingStatus

> **SiteSyncOutgoingStatus** = `"initializing"` \| `"syncing"` \| `"offline"` \| `"error"`

Defined in: services/site-sync-outgoing/types.ts:6

Outgoing sync status.

***

### SiteSyncOutgoingState

> **SiteSyncOutgoingState** = `"online"` \| `"offline"` \| `"warning"` \| `"error"`

Defined in: services/site-sync-outgoing/types.ts:9

Outgoing sync state.

***

### SiteSyncOutgoingDestinationTier

> **SiteSyncOutgoingDestinationTier** = `"unspecified"` \| `"1"` \| `"2"` \| `"3"` \| `"4"` \| `"5"`

Defined in: services/site-sync-outgoing/types.ts:12

Destination tier selection for outgoing syncs.

***

### SiteSyncOutgoingRemoteSnapsStatus

> **SiteSyncOutgoingRemoteSnapsStatus** = `"idle"` \| `"unsupported"` \| `"error"` \| `"refreshing"` \| `"updating"`

Defined in: services/site-sync-outgoing/types.ts:15

Remote snapshot status.

***

### SiteConnectionStatus

> **SiteConnectionStatus** = `"idle"` \| `"authenticating"` \| `"syncing"` \| `"error"` \| `"warning"`

Defined in: services/site/types.ts:6

Site connection status. Named `SiteConnectionStatus` to avoid conflict with `SiteStatus` in the multi-site manager.

***

### SiteAuthenticationStatus

> **SiteAuthenticationStatus** = `"unauthenticated"` \| `"authenticated"` \| `"legacy"`

Defined in: services/site/types.ts:9

Site authentication status.

***

### SiteConfigMode

> **SiteConfigMode** = `"disabled"` \| `"send"` \| `"receive"` \| `"both"`

Defined in: services/site/types.ts:12

Site capability configuration mode for cloud snapshots, statistics, and repair server.

***

### SiteManagementMode

> **SiteManagementMode** = `"disabled"` \| `"manage"` \| `"managed"` \| `"both"`

Defined in: services/site/types.ts:15

Site management configuration mode.

***

### PeriodFrequency

> **PeriodFrequency** = `"custom"` \| `"hourly"` \| `"daily"` \| `"weekly"` \| `"monthly"` \| `"yearly"` \| `string` & \{ \}

Defined in: services/snapshot-profile-period/types.ts:6

Snapshot period frequency.

***

### PeriodDayOfWeek

> **PeriodDayOfWeek** = `"sun"` \| `"mon"` \| `"tue"` \| `"wed"` \| `"thu"` \| `"fri"` \| `"sat"` \| `"any"` \| `string` & \{ \}

Defined in: services/snapshot-profile-period/types.ts:16

Day of week for scheduling.

***

### PeriodMaxTier

> **PeriodMaxTier** = `"1"` \| `"2"` \| `"3"` \| `"4"` \| `"5"` \| `string` & \{ \}

Defined in: services/snapshot-profile-period/types.ts:28

Maximum storage tier for snapshot storage (string digits).

***

### TaskStatus

> **TaskStatus** = `"idle"` \| `"running"`

Defined in: services/task/types.ts:6

Task execution status. Tasks are either idle (waiting) or running.

***

### TenantNodeOnPowerLoss

> **TenantNodeOnPowerLoss** = `"power_on"` \| `"last_state"` \| `"leave_off"`

Defined in: services/tenant-node/types.ts:6

Behavior when the host node loses power.

***

### TenantRecipeAction

> **TenantRecipeAction** = `"clone"` \| `"download"` \| `"remove"` \| `"republish"`

Defined in: services/tenant-recipe/types.ts:8

Valid actions for tenant recipe `_actions` endpoint.

***

### ThemeAccess

> **ThemeAccess** = `"specified"` \| `"host_only"` \| `"local_only"` \| `"both"`

Defined in: services/tenant/types.ts:6

Theme access mode for a tenant.

***

### UpdateSourceAction

> **UpdateSourceAction** = `"refresh"` \| `"download"` \| `"install"` \| `"apply"` \| `"refresh_counts"` \| `"all"`

Defined in: services/update-source/types.ts:6

Actions available for update sources via the `/update_actions` endpoint.

***

### UserType

> **UserType** = `"normal"` \| `"api"` \| `"vdi"` \| `"site_sync"` \| `"site_user"`

Defined in: services/user/types.ts:6

User type classification in VergeOS.

***

### TwoFactorType

> **TwoFactorType** = `"email"` \| `"authenticator"` \| `string` & \{ \}

Defined in: services/user/types.ts:9

Two-factor authentication method.

***

### RecipeQuestionType

> **RecipeQuestionType** = `"bool"` \| `"cluster"` \| `"database_create"` \| `"database_edit"` \| `"field"` \| `"database_find"` \| `"timestamp"` \| `"disksize"` \| `"hidden"` \| `"hostname"` \| `"list"` \| `"network"` \| `"num"` \| `"password"` \| `"ram"` \| `"row"` \| `"script"` \| `"seconds"` \| `"string"` \| `"textarea"` \| `"virtualip"`

Defined in: services/vm-recipe/types.ts:12

Valid question types for recipe questions.

These are the exact string values used by the VergeOS API.

***

### RecipeQuestionPostprocess

> **RecipeQuestionPostprocess** = `"none"` \| `"lowercase"` \| `"uppercase"` \| `"crypt-des"` \| `"crypt-md5"` \| `"crypt-sha256"` \| `"crypt-sha512"` \| `"trim"` \| `"base64"` \| `"hex"` \| `"escape"`

Defined in: services/vm-recipe/types.ts:38

Post-processing transformation applied to question values.

***

### RecipeDatabaseContext

> **RecipeDatabaseContext** = `"local"` \| `"tenant"`

Defined in: services/vm-recipe/types.ts:54

Database context for database-type recipe questions.

***

### VMRecipeAction

> **VMRecipeAction** = `"clone"` \| `"download"` \| `"remove"` \| `"republish"`

Defined in: services/vm-recipe/types.ts:188

Valid actions for VM recipe `_actions` endpoint.

***

### ConsoleType

> **ConsoleType** = `"vnc"` \| `"spice"` \| `"serial"` \| `"none"` \| `string` & \{ \}

Defined in: services/vm/types.ts:6

Console display protocol for the VM.

***

### OnPowerLoss

> **OnPowerLoss** = `"power_on"` \| `"last_state"` \| `"leave_off"` \| `string` & \{ \}

Defined in: services/vm/types.ts:9

Behavior when host power is restored after an outage.

***

### OSFamily

> **OSFamily** = `"linux"` \| `"windows"` \| `"freebsd"` \| `"other"` \| `string` & \{ \}

Defined in: services/vm/types.ts:12

Guest operating system family hint.

***

### BootOrder

> **BootOrder** = `"cd"` \| `"cdn"` \| `"dc"` \| `"nc"` \| `"n"` \| `"c"` \| `"d"` \| `"strict"` \| `string` & \{ \}

Defined in: services/vm/types.ts:15

Boot device priority order.

***

### CloudInitDatasource

> **CloudInitDatasource** = `"none"` \| `"config_drive_v2"` \| `"nocloud"` \| `string` & \{ \}

Defined in: services/vm/types.ts:18

Cloud-init metadata source configuration.

***

### MigrationMethod

> **MigrationMethod** = `"auto"` \| `"live"` \| `string` & \{ \}

Defined in: services/vm/types.ts:21

VM live-migration strategy.

***

### CreatedFrom

> **CreatedFrom** = `"import"` \| `"import_vmx"` \| `"import_ovf"` \| `"import_vmware"` \| `"import_shared"` \| `"clone"` \| `"recipe"` \| `"custom"` \| `"terraform"` \| `string` & \{ \}

Defined in: services/vm/types.ts:24

How the VM was originally created.

***

### VideoType

> **VideoType** = `"std"` \| `"cirrus"` \| `"vmware"` \| `"qxl"` \| `"virtio"` \| `"none"` \| `string` & \{ \}

Defined in: services/vm/types.ts:37

Video card emulation type.

***

### SoundType

> **SoundType** = `"none"` \| `"sb16"` \| `"es1370"` \| `"ac97"` \| `"adlib"` \| `"gus"` \| `"cs4231a"` \| `"hda"` \| `"pcspk"` \| `string` & \{ \}

Defined in: services/vm/types.ts:40

Sound card emulation type.

***

### RTCBase

> **RTCBase** = `"utc"` \| `"localtime"` \| `string` & \{ \}

Defined in: services/vm/types.ts:53

Real-time clock base setting.

***

### ConsoleAuth

> **ConsoleAuth** = [`ConsoleCredentials`](#consolecredentials) \| [`ConsoleToken`](#consoletoken) \| [`ConsoleApiKey`](#consoleapikey)

Defined in: services/vm/types.ts:660

Authentication for a console session.

The VergeOS WebSocket console endpoint supports three authentication methods:

- `{ username, password }` — exchanged for a session token via
  `POST /api/sys/tokens` (local VergeOS users). The session token is
  embedded in the WebSocket URL as `?token=`.
- `{ token }` — a pre-existing session token, e.g., from an OIDC login
  flow. Embedded in the WebSocket URL as `?token=`.
- `{ apiKey }` — a VergeOS API key. The console endpoint accepts
  `Authorization: Bearer <apiKey>` directly. The WebSocket URL is returned
  **without** a token — the caller must set the `Authorization` header
  during the WebSocket handshake (supported in Node.js, Deno, and Bun;
  not available in browser `WebSocket` — use username/password or a
  session token for browser-based consoles).

***

### VolumeBrowserQuery

> **VolumeBrowserQuery** = `"get-dir"` \| `"rename"` \| `"delete"` \| `"paste"`

Defined in: services/volume-browser/types.ts:5

Volume browser query types.
The volume browser supports directory listing, rename, delete, and paste (copy/move).

***

### VolumeBrowserStatus

> **VolumeBrowserStatus** = `"running"` \| `"complete"` \| `"error"`

Defined in: services/volume-browser/types.ts:11

Volume browser job status values.
Jobs are async — they start as `running` and transition to `complete` or `error`.

***

### VolumeBrowserPasteMode

> **VolumeBrowserPasteMode** = `"copy"` \| `"move"`

Defined in: services/volume-browser/types.ts:14

Paste operation mode: copy or move.

***

### NfsSquash

> **NfsSquash** = `"root_squash"` \| `"all_squash"` \| `"no_root_squash"` \| `string` & \{ \}

Defined in: services/volume-nfs-share/types.ts:6

NFS squash mode controlling user ID mapping.

***

### NfsDataAccess

> **NfsDataAccess** = `"ro"` \| `"rw"` \| `string` & \{ \}

Defined in: services/volume-nfs-share/types.ts:9

NFS data access mode.

***

### VolumeSnapshotExpiresType

> **VolumeSnapshotExpiresType** = `"never"` \| `"date"` \| `string` & \{ \}

Defined in: services/volume-snapshot/types.ts:6

Volume snapshot expiration policy.

***

### VolumeSyncDestinationDelete

> **VolumeSyncDestinationDelete** = `"never"` \| `"delete"` \| `"delete-before"` \| `"delete-during"` \| `"delete-delay"` \| `"delete-after"` \| `string` & \{ \}

Defined in: services/volume-sync/types.ts:6

Behavior when deleting files on the destination.

***

### VolumeSyncMethod

> **VolumeSyncMethod** = `"rsync"` \| `"ysync"` \| `string` & \{ \}

Defined in: services/volume-sync/types.ts:16

Sync method used for data transfer.

***

### VolumeSyncPreferredTier

> **VolumeSyncPreferredTier** = `"1"` \| `"2"` \| `"3"` \| `"4"` \| `"5"` \| `string` & \{ \}

Defined in: services/volume-sync/types.ts:19

Preferred storage tier (1–5).

***

### VolumeSyncType

> **VolumeSyncType** = `"volsync"` \| `"vmimport"`

Defined in: services/volume-sync/types.ts:22

Volume sync type. Read-only.

***

### VolumeFsType

> **VolumeFsType** = `"ext4"` \| `"fc_nimble"` \| `"cifs"` \| `"nfs"` \| `"ybfs"` \| `"verge_vm_export"` \| `string` & \{ \}

Defined in: services/volume/types.ts:6

Volume filesystem type.

***

### VolumePreferredTier

> **VolumePreferredTier** = `"1"` \| `"2"` \| `"3"` \| `"4"` \| `"5"` \| `string` & \{ \}

Defined in: services/volume/types.ts:16

Volume storage tier preference (string digits).

***

### VolumeOptimize

> **VolumeOptimize** = `"general"` \| `"large"` \| `string` & \{ \}

Defined in: services/volume/types.ts:19

Volume optimization strategy.

***

### CifsProtocol

> **CifsProtocol** = `"1.0"` \| `"2.0"` \| `"2.1"` \| `"3.0"` \| `string` & \{ \}

Defined in: services/volume/types.ts:22

SMB protocol version for CIFS remote mounts.

***

### NfsProtocol

> **NfsProtocol** = `""` \| `"2"` \| `"3"` \| `"4"` \| `string` & \{ \}

Defined in: services/volume/types.ts:25

NFS protocol version for NFS remote mounts.

***

### ReadAheadKb

> **ReadAheadKb** = `"0"` \| `"64"` \| `"128"` \| `"256"` \| `"512"` \| `"1024"` \| `"2048"` \| `"4096"` \| `string` & \{ \}

Defined in: services/volume/types.ts:28

Read-ahead buffer size in kilobytes (string values).

***

### WebhookURLType

> **WebhookURLType** = `"custom"`

Defined in: services/webhook-url/types.ts:6

Webhook URL type. Currently only `custom` is supported.

***

### WebhookURLAuthorizationType

> **WebhookURLAuthorizationType** = `"none"` \| `"basic"` \| `"bearer"` \| `"apikey"`

Defined in: services/webhook-url/types.ts:9

Authorization method for the webhook URL.

***

### WebhookStatus

> **WebhookStatus** = `"queued"` \| `"running"` \| `"sent"` \| `"error"`

Defined in: services/webhook/types.ts:6

Webhook delivery status.

***

### WireGuardPeerFirewallConfig

> **WireGuardPeerFirewallConfig** = `"site-to-site"` \| `"remote-user"` \| `"none"` \| `string` & \{ \}

Defined in: services/wireguard-peer/types.ts:6

Firewall configuration mode for a WireGuard peer.

***

### FlexKey

> **FlexKey** = `number` \| `string`

Defined in: types.ts:5

Flexible key type that handles VergeOS's inconsistent ID serialization.
The API may return resource IDs as either numbers or strings.

## References

### CrossSiteResult

Re-exports [CrossSiteResult](index.md#crosssiteresult)

***

### CrossSiteServices

Re-exports [CrossSiteServices](index.md#crosssiteservices)

***

### SiteResource

Re-exports [SiteResource](index.md#siteresource)

***

### ActionConfig

Re-exports [ActionConfig](index.md#actionconfig)

***

### SiteConfig

Re-exports [SiteConfig](index.md#siteconfig)

***

### SiteManagerOptions

Re-exports [SiteManagerOptions](index.md#sitemanageroptions)

***

### SiteStatus

Re-exports [SiteStatus](index.md#sitestatus)
