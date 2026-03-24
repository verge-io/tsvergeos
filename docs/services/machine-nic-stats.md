[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/machine-nic-stats

# services/machine-nic-stats

Machine NIC Stats service registration module.

Importing this module registers the [MachineNicStatsService](#machinenicstatsservice) on [VergeClient](../index.md#vergeclient),
making `client.machineNicStats` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/machine-nic-stats';
```

## Classes

### MachineNicStatsService

Defined in: services/machine-nic-stats/service.ts:24

Service for querying VergeOS machine NIC statistics.

Provides per-NIC network traffic metrics including packets per second,
bytes per second, and cumulative counters. This is a **read-only** service —
stats entries are managed by the system and cannot be created,
updated, or deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/machine-nic-stats';

// Get stats for a specific NIC
const stats = await client.machineNicStats.getByNic(3);
console.log(`TX: ${stats.txbps} bps, RX: ${stats.rxbps} bps`);
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`MachineNicStats`](../types.md#machinenicstats)\>

#### Constructors

##### Constructor

> **new MachineNicStatsService**(`http`): [`MachineNicStatsService`](#machinenicstatsservice)

Defined in: services/machine-nic-stats/service.ts:25

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`MachineNicStatsService`](#machinenicstatsservice)

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

> **list**(`options?`): `Promise`\<[`MachineNicStats`](../types.md#machinenicstats)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`MachineNicStats`](../types.md#machinenicstats)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`MachineNicStats`](../types.md#machinenicstats)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`MachineNicStats`](../types.md#machinenicstats)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`MachineNicStats`](../types.md#machinenicstats)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`MachineNicStats`](../types.md#machinenicstats)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`MachineNicStats`](../types.md#machinenicstats)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`MachineNicStats`](../types.md#machinenicstats)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### getByNic()

> **getByNic**(`nicKey`): `Promise`\<[`MachineNicStats`](../types.md#machinenicstats)\>

Defined in: services/machine-nic-stats/service.ts:39

Get statistics for a specific NIC.

Filters by `parent_nic eq {nicKey}` and returns the first matching result.
Throws [NotFoundError](../index.md#notfounderror) if no stats entry exists for the given NIC.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `nicKey` | [`FlexKey`](../types.md#flexkey) | The key of the machine NIC to look up stats for. |

###### Returns

`Promise`\<[`MachineNicStats`](../types.md#machinenicstats)\>

The machine NIC stats resource.

###### Throws

NotFoundError If no stats exist for the specified NIC.

## References

### MachineNicStats

Re-exports [MachineNicStats](../types.md#machinenicstats)
