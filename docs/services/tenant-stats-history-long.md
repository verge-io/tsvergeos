[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/tenant-stats-history-long

# services/tenant-stats-history-long

Tenant Stats History Long service registration module.

Importing this module registers the [TenantStatsHistoryLongService](#tenantstatshistorylongservice) on
[VergeClient](../index.md#vergeclient), making `client.tenantStatsHistoryLong` available.
This is a side-effect import:

```typescript
import 'tsvergeos/services/tenant-stats-history-long';
```

## Classes

### TenantStatsHistoryLongService

Defined in: [services/tenant-stats-history-long/service.ts:25](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/tenant-stats-history-long/service.ts#L25)

Service for querying long-term tenant stats history.

Provides access to long-term historical CPU, RAM, storage tier, and GPU
utilization metrics per tenant. This is a **read-only** service — history
entries are managed by the system and cannot be created, updated, or
deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/tenant-stats-history-long';

// Get long-term history for a specific tenant
const history = await client.tenantStatsHistoryLong.listByTenant(42);
for (const snapshot of history) {
  console.log(`CPU: ${snapshot.total_cpu}%, RAM used: ${snapshot.ram_used} at ${snapshot.timestamp}`);
}
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`TenantStatsHistoryLong`](../types.md#tenantstatshistorylong)\>

#### Constructors

##### Constructor

> **new TenantStatsHistoryLongService**(`http`): [`TenantStatsHistoryLongService`](#tenantstatshistorylongservice)

Defined in: [services/tenant-stats-history-long/service.ts:26](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/tenant-stats-history-long/service.ts#L26)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`TenantStatsHistoryLongService`](#tenantstatshistorylongservice)

###### Overrides

[`ReadOnlyService`](../index.md#readonlyservice).[`constructor`](../index.md#constructor-13)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`resource`](../index.md#property-resource-2) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`displayName`](../index.md#property-displayname) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`ReadOnlyService`](../index.md#readonlyservice).[`defaultFields`](../index.md#property-defaultfields) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L138) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`TenantStatsHistoryLong`](../types.md#tenantstatshistorylong)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`TenantStatsHistoryLong`](../types.md#tenantstatshistorylong)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`TenantStatsHistoryLong`](../types.md#tenantstatshistorylong)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`TenantStatsHistoryLong`](../types.md#tenantstatshistorylong)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`TenantStatsHistoryLong`](../types.md#tenantstatshistorylong)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`TenantStatsHistoryLong`](../types.md#tenantstatshistorylong)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`TenantStatsHistoryLong`](../types.md#tenantstatshistorylong)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`TenantStatsHistoryLong`](../types.md#tenantstatshistorylong)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByTenant()

> **listByTenant**(`tenantKey`, `options?`): `Promise`\<[`TenantStatsHistoryLong`](../types.md#tenantstatshistorylong)[]\>

Defined in: [services/tenant-stats-history-long/service.ts:40](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/tenant-stats-history-long/service.ts#L40)

List long-term stats history for a specific tenant.

Filters by `tenant eq {tenantKey}` and returns all matching history entries.
Additional list options (fields, sort, limit, etc.) are merged with the filter.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tenantKey` | [`FlexKey`](../types.md#flexkey) | The key of the tenant to retrieve history for. |
| `options?` | [`ListOptions`](../types.md#listoptions) | Optional list parameters to merge with the tenant filter. |

###### Returns

`Promise`\<[`TenantStatsHistoryLong`](../types.md#tenantstatshistorylong)[]\>

An array of long-term stats history entries for the tenant.

## References

### TenantStatsHistoryLong

Re-exports [TenantStatsHistoryLong](../types.md#tenantstatshistorylong)
