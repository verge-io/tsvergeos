[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/tenant-stats-history-short

# services/tenant-stats-history-short

Tenant Stats History Short service registration module.

Importing this module registers the [TenantStatsHistoryShortService](#tenantstatshistoryshortservice) on
[VergeClient](../index.md#vergeclient), making `client.tenantStatsHistoryShort` available.
This is a side-effect import:

```typescript
import 'tsvergeos/services/tenant-stats-history-short';
```

## Classes

### TenantStatsHistoryShortService

Defined in: services/tenant-stats-history-short/service.ts:25

Service for querying short-term tenant stats history.

Provides access to short-term historical CPU, RAM, storage tier, and GPU
utilization metrics per tenant. This is a **read-only** service — history
entries are managed by the system and cannot be created, updated, or
deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/tenant-stats-history-short';

// Get short-term history for a specific tenant
const history = await client.tenantStatsHistoryShort.listByTenant(42);
for (const snapshot of history) {
  console.log(`CPU: ${snapshot.total_cpu}%, RAM: ${snapshot.ram_pct}% at ${snapshot.timestamp}`);
}
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`TenantStatsHistoryShort`](../types.md#tenantstatshistoryshort)\>

#### Constructors

##### Constructor

> **new TenantStatsHistoryShortService**(`http`): [`TenantStatsHistoryShortService`](#tenantstatshistoryshortservice)

Defined in: services/tenant-stats-history-short/service.ts:26

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`TenantStatsHistoryShortService`](#tenantstatshistoryshortservice)

###### Overrides

[`ReadOnlyService`](../index.md#readonlyservice).[`constructor`](../index.md#constructor-13)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`resource`](../index.md#property-resource-2) | services/base.ts:123 |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`displayName`](../index.md#property-displayname) | services/base.ts:126 |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`ReadOnlyService`](../index.md#readonlyservice).[`defaultFields`](../index.md#property-defaultfields) | services/base.ts:138 |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`TenantStatsHistoryShort`](../types.md#tenantstatshistoryshort)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`TenantStatsHistoryShort`](../types.md#tenantstatshistoryshort)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`TenantStatsHistoryShort`](../types.md#tenantstatshistoryshort)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`TenantStatsHistoryShort`](../types.md#tenantstatshistoryshort)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`TenantStatsHistoryShort`](../types.md#tenantstatshistoryshort)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`TenantStatsHistoryShort`](../types.md#tenantstatshistoryshort)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`TenantStatsHistoryShort`](../types.md#tenantstatshistoryshort)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`TenantStatsHistoryShort`](../types.md#tenantstatshistoryshort)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByTenant()

> **listByTenant**(`tenantKey`, `options?`): `Promise`\<[`TenantStatsHistoryShort`](../types.md#tenantstatshistoryshort)[]\>

Defined in: services/tenant-stats-history-short/service.ts:40

List short-term stats history for a specific tenant.

Filters by `tenant eq {tenantKey}` and returns all matching history entries.
Additional list options (fields, sort, limit, etc.) are merged with the filter.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tenantKey` | [`FlexKey`](../types.md#flexkey) | The key of the tenant to retrieve history for. |
| `options?` | [`ListOptions`](../types.md#listoptions) | Optional list parameters to merge with the tenant filter. |

###### Returns

`Promise`\<[`TenantStatsHistoryShort`](../types.md#tenantstatshistoryshort)[]\>

An array of short-term stats history entries for the tenant.

## References

### TenantStatsHistoryShort

Re-exports [TenantStatsHistoryShort](../types.md#tenantstatshistoryshort)
