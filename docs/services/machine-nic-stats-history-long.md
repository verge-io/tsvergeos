[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/machine-nic-stats-history-long

# services/machine-nic-stats-history-long

Machine NIC Stats History Long service registration module.

Importing this module registers the [MachineNicStatsHistoryLongService](#machinenicstatshistorylongservice) on
[VergeClient](../index.md#vergeclient), making `client.machineNicStatsHistoryLong` available.
This is a side-effect import:

```typescript
import 'tsvergeos/services/machine-nic-stats-history-long';
```

## Classes

### MachineNicStatsHistoryLongService

Defined in: services/machine-nic-stats-history-long/service.ts:26

Service for querying long-term machine NIC stats history.

Provides access to long-term historical per-NIC network traffic
metrics including aggregate averages and peaks for packet rates
and data rates. This is a **read-only** service — history entries
are managed by the system and cannot be created, updated, or
deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/machine-nic-stats-history-long';

// Get long-term NIC history for a specific NIC
const history = await client.machineNicStatsHistoryLong.listByNic(10);
for (const snapshot of history) {
  console.log(`TX avg: ${snapshot.txbps_avg} bps (peak: ${snapshot.txbps_peak}) at ${snapshot.timestamp}`);
}
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`MachineNicStatsHistoryLong`](../types.md#machinenicstatshistorylong)\>

#### Constructors

##### Constructor

> **new MachineNicStatsHistoryLongService**(`http`): [`MachineNicStatsHistoryLongService`](#machinenicstatshistorylongservice)

Defined in: services/machine-nic-stats-history-long/service.ts:27

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`MachineNicStatsHistoryLongService`](#machinenicstatshistorylongservice)

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

> **list**(`options?`): `Promise`\<[`MachineNicStatsHistoryLong`](../types.md#machinenicstatshistorylong)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`MachineNicStatsHistoryLong`](../types.md#machinenicstatshistorylong)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`MachineNicStatsHistoryLong`](../types.md#machinenicstatshistorylong)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`MachineNicStatsHistoryLong`](../types.md#machinenicstatshistorylong)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`MachineNicStatsHistoryLong`](../types.md#machinenicstatshistorylong)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`MachineNicStatsHistoryLong`](../types.md#machinenicstatshistorylong)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`MachineNicStatsHistoryLong`](../types.md#machinenicstatshistorylong)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`MachineNicStatsHistoryLong`](../types.md#machinenicstatshistorylong)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByNic()

> **listByNic**(`nicKey`, `options?`): `Promise`\<[`MachineNicStatsHistoryLong`](../types.md#machinenicstatshistorylong)[]\>

Defined in: services/machine-nic-stats-history-long/service.ts:41

List long-term NIC stats history for a specific NIC.

Filters by `parent_nic eq {nicKey}` and returns all matching history entries.
Additional list options (fields, sort, limit, etc.) are merged with the filter.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `nicKey` | [`FlexKey`](../types.md#flexkey) | The key of the machine NIC to retrieve history for. |
| `options?` | [`ListOptions`](../types.md#listoptions) | Optional list parameters to merge with the NIC filter. |

###### Returns

`Promise`\<[`MachineNicStatsHistoryLong`](../types.md#machinenicstatshistorylong)[]\>

An array of long-term NIC stats history entries for the NIC.

## References

### MachineNicStatsHistoryLong

Re-exports [MachineNicStatsHistoryLong](../types.md#machinenicstatshistorylong)
