[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/storage-tier-stats

# services/storage-tier-stats

Storage Tier Stats service registration module.

Importing this module registers the [StorageTierStatsService](#storagetierstatsservice) on [VergeClient](../index.md#vergeclient),
making `client.storageTierStats` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/storage-tier-stats';
```

## Classes

### StorageTierStatsService

Defined in: services/storage-tier-stats/service.ts:23

Service for querying VergeOS storage tier I/O statistics.

Provides per-tier I/O metrics (reads, writes, throughput). This is a
**read-only** service — stats entries are managed by the system.

#### Example

```typescript
import 'tsvergeos/services/storage-tier-stats';

// Get I/O stats for a specific storage tier
const stats = await client.storageTierStats.listByTier(1);
for (const s of stats) {
  console.log(`IOPS: ${s.rops} read, ${s.wops} write`);
}
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`StorageTierStats`](../types.md#storagetierstats)\>

#### Constructors

##### Constructor

> **new StorageTierStatsService**(`http`): [`StorageTierStatsService`](#storagetierstatsservice)

Defined in: services/storage-tier-stats/service.ts:24

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`StorageTierStatsService`](#storagetierstatsservice)

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

> **list**(`options?`): `Promise`\<[`StorageTierStats`](../types.md#storagetierstats)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`StorageTierStats`](../types.md#storagetierstats)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`StorageTierStats`](../types.md#storagetierstats)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`StorageTierStats`](../types.md#storagetierstats)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`StorageTierStats`](../types.md#storagetierstats)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`StorageTierStats`](../types.md#storagetierstats)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`StorageTierStats`](../types.md#storagetierstats)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`StorageTierStats`](../types.md#storagetierstats)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByTier()

> **listByTier**(`storageTierKey`): `Promise`\<[`StorageTierStats`](../types.md#storagetierstats)[]\>

Defined in: services/storage-tier-stats/service.ts:34

List stats for a specific storage tier.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `storageTierKey` | [`FlexKey`](../types.md#flexkey) | The key of the storage tier to filter by. |

###### Returns

`Promise`\<[`StorageTierStats`](../types.md#storagetierstats)[]\>

Array of storage tier stats for the given tier.

## References

### StorageTierStats

Re-exports [StorageTierStats](../types.md#storagetierstats)
