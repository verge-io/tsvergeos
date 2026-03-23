[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/machine-drive-stats

# services/machine-drive-stats

Machine Drive Stats service registration module.

Importing this module registers the [MachineDriveStatsService](#machinedrivestatsservice) on [VergeClient](../index.md#vergeclient),
making `client.machineDriveStats` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/machine-drive-stats';
```

## Classes

### MachineDriveStatsService

Defined in: [services/machine-drive-stats/service.ts:27](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-drive-stats/service.ts#L27)

Service for querying VergeOS machine drive statistics.

Provides per-drive I/O performance metrics including throughput,
IOPS, utilization, and capacity. This is a **read-only** service —
stats entries are managed by the system and cannot be created,
updated, or deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/machine-drive-stats';

// Get stats for a specific drive
const stats = await client.machineDriveStats.getByDrive(7);
console.log(`IOPS: ${stats.rops} read, ${stats.wops} write`);

// List only physical drive stats
const physical = await client.machineDriveStats.listPhysical();
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`MachineDriveStats`](../types.md#machinedrivestats)\>

#### Constructors

##### Constructor

> **new MachineDriveStatsService**(`http`): [`MachineDriveStatsService`](#machinedrivestatsservice)

Defined in: [services/machine-drive-stats/service.ts:28](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-drive-stats/service.ts#L28)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`MachineDriveStatsService`](#machinedrivestatsservice)

###### Overrides

[`ReadOnlyService`](../index.md#readonlyservice).[`constructor`](../index.md#constructor-13)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`resource`](../index.md#property-resource-2) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`displayName`](../index.md#property-displayname) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`ReadOnlyService`](../index.md#readonlyservice).[`defaultFields`](../index.md#property-defaultfields) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L138) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`MachineDriveStats`](../types.md#machinedrivestats)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`MachineDriveStats`](../types.md#machinedrivestats)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`MachineDriveStats`](../types.md#machinedrivestats)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`MachineDriveStats`](../types.md#machinedrivestats)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`MachineDriveStats`](../types.md#machinedrivestats)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`MachineDriveStats`](../types.md#machinedrivestats)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`MachineDriveStats`](../types.md#machinedrivestats)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`MachineDriveStats`](../types.md#machinedrivestats)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### getByDrive()

> **getByDrive**(`driveKey`): `Promise`\<[`MachineDriveStats`](../types.md#machinedrivestats)\>

Defined in: [services/machine-drive-stats/service.ts:42](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-drive-stats/service.ts#L42)

Get statistics for a specific drive.

Filters by `parent_drive eq {driveKey}` and returns the first matching result.
Throws [NotFoundError](../index.md#notfounderror) if no stats entry exists for the given drive.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveKey` | [`FlexKey`](../types.md#flexkey) | The key of the machine drive to look up stats for. |

###### Returns

`Promise`\<[`MachineDriveStats`](../types.md#machinedrivestats)\>

The machine drive stats resource.

###### Throws

NotFoundError If no stats exist for the specified drive.

##### listPhysical()

> **listPhysical**(): `Promise`\<[`MachineDriveStats`](../types.md#machinedrivestats)[]\>

Defined in: [services/machine-drive-stats/service.ts:61](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/machine-drive-stats/service.ts#L61)

List statistics for physical drives only.

Filters by `physical eq true` to return only physical (non-virtual) drive stats.

###### Returns

`Promise`\<[`MachineDriveStats`](../types.md#machinedrivestats)[]\>

Array of physical drive stats resources.

## References

### MachineDriveStats

Re-exports [MachineDriveStats](../types.md#machinedrivestats)
