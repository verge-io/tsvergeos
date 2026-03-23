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

Defined in: [services/machine-log/service.ts:25](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-log/service.ts#L25)

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

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`MachineLog`](#machinelog)\>

#### Constructors

##### Constructor

> **new MachineLogService**(`http`): [`MachineLogService`](#machinelogservice)

Defined in: [services/machine-log/service.ts:26](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-log/service.ts#L26)

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
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`resource`](../index.md#property-resource-2) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`displayName`](../index.md#property-displayname) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`ReadOnlyService`](../index.md#readonlyservice).[`defaultFields`](../index.md#property-defaultfields) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L138) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`MachineLog`](#machinelog)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`MachineLog`](#machinelog)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`MachineLog`](#machinelog)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`MachineLog`](#machinelog)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`MachineLog`](#machinelog)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`MachineLog`](#machinelog)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`MachineLog`](#machinelog)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`MachineLog`](#machinelog)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByMachine()

> **listByMachine**(`machineKey`, `options?`): `Promise`\<[`MachineLog`](#machinelog)[]\>

Defined in: [services/machine-log/service.ts:40](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-log/service.ts#L40)

List log entries for a specific machine.

Filters by `machine eq {machineKey}` and returns all matching log entries.
Additional list options (limit, sort, filter) can be passed to refine results.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `machineKey` | [`FlexKey`](../types.md#flexkey) | The key of the machine to list logs for. |
| `options?` | [`ListOptions`](../types.md#listoptions) | Optional list parameters (limit, sort, fields, etc.). |

###### Returns

`Promise`\<[`MachineLog`](#machinelog)[]\>

Array of machine log entries.

## Interfaces

### MachineLog

Defined in: [services/machine-log/types.ts:39](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-log/types.ts#L39)

A VergeOS machine log resource.

Machine logs are system-generated entries that record events, errors,
and audit activity for machines. Each log entry is associated with a
parent machine and auto-expires after ~31 days.

This is a **read-only** resource — log entries are created by the system.

Field names use snake_case to match the VergeOS API exactly.

#### Extends

- [`Resource`](../types.md#resource)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-machine"></a> `machine` | [`FlexKey`](../types.md#flexkey) | Parent machine reference (FK to `machines`). | - | [services/machine-log/types.ts:41](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-log/types.ts#L41) |
| <a id="property-level"></a> `level?` | [`MachineLogLevel`](#machineloglevel) | Log severity level. Default: `message`. | - | [services/machine-log/types.ts:44](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-log/types.ts#L44) |
| <a id="property-text"></a> `text?` | `string` | Log message text. | - | [services/machine-log/types.ts:47](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-log/types.ts#L47) |
| <a id="property-timestamp"></a> `timestamp?` | `number` | Creation timestamp (Unix epoch, microseconds). Read-only, auto-expires ~31 days. | - | [services/machine-log/types.ts:50](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-log/types.ts#L50) |
| <a id="property-user"></a> `user?` | `string` | User or source that generated the log entry. | - | [services/machine-log/types.ts:53](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-log/types.ts#L53) |
| <a id="property-key"></a> `$key` | [`FlexKey`](../types.md#flexkey) | - | [`Resource`](../types.md#resource).[`$key`](../types.md#property-key-93) | [types.ts:12](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/types.ts#L12) |

## Type Aliases

### MachineLogLevel

> **MachineLogLevel** = `"audit"` \| `"message"` \| `"warning"` \| `"error"` \| `"critical"` \| `"summary"` \| `"debug"` \| `string` & \{ \}

Defined in: [services/machine-log/types.ts:16](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-log/types.ts#L16)

Machine log severity level.

- `audit` — audit trail entries
- `message` — informational messages (default)
- `warning` — warning conditions
- `error` — error conditions
- `critical` — critical failures
- `summary` — summary entries
- `debug` — debug-level messages
