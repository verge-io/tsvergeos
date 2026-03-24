[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/machine-stats-history-long

# services/machine-stats-history-long

Machine Stats History Long service registration module.

Importing this module registers the [MachineStatsHistoryLongService](#machinestatshistorylongservice) on
[VergeClient](../index.md#vergeclient), making `client.machineStatsHistoryLong` available.
This is a side-effect import:

```typescript
import 'tsvergeos/services/machine-stats-history-long';
```

## Classes

### MachineStatsHistoryLongService

Defined in: services/machine-stats-history-long/service.ts:25

Service for querying long-term machine stats history.

Provides access to long-term historical CPU and RAM utilization
metrics per machine, including aggregate peaks and averages. This is a
**read-only** service — history entries are managed by the system and
cannot be created, updated, or deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/machine-stats-history-long';

// Get long-term history for a specific machine
const history = await client.machineStatsHistoryLong.listByMachine(42);
for (const snapshot of history) {
  console.log(`CPU: ${snapshot.total_cpu}%, avg core: ${snapshot.core_average}`);
}
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`MachineStatsHistoryLong`](../types.md#machinestatshistorylong)\>

#### Constructors

##### Constructor

> **new MachineStatsHistoryLongService**(`http`): [`MachineStatsHistoryLongService`](#machinestatshistorylongservice)

Defined in: services/machine-stats-history-long/service.ts:26

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`MachineStatsHistoryLongService`](#machinestatshistorylongservice)

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

> **list**(`options?`): `Promise`\<[`MachineStatsHistoryLong`](../types.md#machinestatshistorylong)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`MachineStatsHistoryLong`](../types.md#machinestatshistorylong)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`MachineStatsHistoryLong`](../types.md#machinestatshistorylong)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`MachineStatsHistoryLong`](../types.md#machinestatshistorylong)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`MachineStatsHistoryLong`](../types.md#machinestatshistorylong)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`MachineStatsHistoryLong`](../types.md#machinestatshistorylong)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`MachineStatsHistoryLong`](../types.md#machinestatshistorylong)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`MachineStatsHistoryLong`](../types.md#machinestatshistorylong)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByMachine()

> **listByMachine**(`machineKey`, `options?`): `Promise`\<[`MachineStatsHistoryLong`](../types.md#machinestatshistorylong)[]\>

Defined in: services/machine-stats-history-long/service.ts:40

List long-term stats history for a specific machine.

Filters by `machine eq {machineKey}` and returns all matching history entries.
Additional list options (fields, sort, limit, etc.) are merged with the filter.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `machineKey` | [`FlexKey`](../types.md#flexkey) | The key of the machine to retrieve history for. |
| `options?` | [`ListOptions`](../types.md#listoptions) | Optional list parameters to merge with the machine filter. |

###### Returns

`Promise`\<[`MachineStatsHistoryLong`](../types.md#machinestatshistorylong)[]\>

An array of long-term stats history entries for the machine.

## References

### MachineStatsHistoryLong

Re-exports [MachineStatsHistoryLong](../types.md#machinestatshistorylong)
