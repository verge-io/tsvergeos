[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/machine-stats

# services/machine-stats

Machine Stats service registration module.

Importing this module registers the [MachineStatsService](#machinestatsservice) on [VergeClient](../index.md#vergeclient),
making `client.machineStats` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/machine-stats';
```

## Classes

### MachineStatsService

Defined in: services/machine-stats/service.ts:23

Service for querying VergeOS machine statistics.

Provides per-machine CPU and RAM utilization metrics. This is a
**read-only** service — stats entries are managed by the system
and cannot be created, updated, or deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/machine-stats';

// Get stats for a specific machine
const stats = await client.machineStats.getByMachine(42);
console.log(`CPU: ${stats.total_cpu}%, RAM: ${stats.ram_pct}%`);
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`MachineStats`](../types.md#machinestats)\>

#### Constructors

##### Constructor

> **new MachineStatsService**(`http`): [`MachineStatsService`](#machinestatsservice)

Defined in: services/machine-stats/service.ts:24

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`MachineStatsService`](#machinestatsservice)

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

> **list**(`options?`): `Promise`\<[`MachineStats`](../types.md#machinestats)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`MachineStats`](../types.md#machinestats)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`MachineStats`](../types.md#machinestats)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`MachineStats`](../types.md#machinestats)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`MachineStats`](../types.md#machinestats)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`MachineStats`](../types.md#machinestats)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`MachineStats`](../types.md#machinestats)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`MachineStats`](../types.md#machinestats)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### getByMachine()

> **getByMachine**(`machineKey`): `Promise`\<[`MachineStats`](../types.md#machinestats)\>

Defined in: services/machine-stats/service.ts:38

Get statistics for a specific machine.

Filters by `machine eq {machineKey}` and returns the first matching result.
Throws [NotFoundError](../index.md#notfounderror) if no stats entry exists for the given machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `machineKey` | [`FlexKey`](../types.md#flexkey) | The key of the machine to look up stats for. |

###### Returns

`Promise`\<[`MachineStats`](../types.md#machinestats)\>

The machine stats resource.

###### Throws

NotFoundError If no stats exist for the specified machine.

## References

### MachineStats

Re-exports [MachineStats](../types.md#machinestats)
