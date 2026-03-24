[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/machine-log

# services/machine-log

Machine Log service registration module.

Importing this module registers the [MachineLogService](#machinelogservice) on [VergeClient](../index.md#vergeclient),
making `client.machineLogs` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/machine-log';
```

## Classes

### MachineLogService

Defined in: services/machine-log/service.ts:25

Service for querying VergeOS machine logs.

Provides access to system-generated log entries for machines, including
audit trails, errors, warnings, and informational messages. This is a
**read-only** service — log entries are managed by the system and cannot
be created, updated, or deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/machine-log';

// List recent logs for a specific machine
const logs = await client.machineLogs.listByMachine(42);
for (const log of logs) {
  console.log(`[${log.level}] ${log.text}`);
}
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`MachineLog`](../types.md#machinelog)\>

#### Constructors

##### Constructor

> **new MachineLogService**(`http`): [`MachineLogService`](#machinelogservice)

Defined in: services/machine-log/service.ts:26

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`MachineLogService`](#machinelogservice)

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

> **list**(`options?`): `Promise`\<[`MachineLog`](../types.md#machinelog)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`MachineLog`](../types.md#machinelog)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`MachineLog`](../types.md#machinelog)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`MachineLog`](../types.md#machinelog)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`MachineLog`](../types.md#machinelog)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`MachineLog`](../types.md#machinelog)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`MachineLog`](../types.md#machinelog)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`MachineLog`](../types.md#machinelog)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByMachine()

> **listByMachine**(`machineKey`, `options?`): `Promise`\<[`MachineLog`](../types.md#machinelog)[]\>

Defined in: services/machine-log/service.ts:40

List log entries for a specific machine.

Filters by `machine eq {machineKey}` and returns all matching log entries.
Additional list options (limit, sort, filter) can be passed to refine results.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `machineKey` | [`FlexKey`](../types.md#flexkey) | The key of the machine to list logs for. |
| `options?` | [`ListOptions`](../types.md#listoptions) | Optional list parameters (limit, sort, fields, etc.). |

###### Returns

`Promise`\<[`MachineLog`](../types.md#machinelog)[]\>

Array of machine log entries.

## References

### MachineLog

Re-exports [MachineLog](../types.md#machinelog)

***

### MachineLogLevel

Re-exports [MachineLogLevel](../types.md#machineloglevel)
