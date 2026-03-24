[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/log

# services/log

Log service registration module.

Importing this module registers the [LogService](#logservice) on [VergeClient](../index.md#vergeclient),
making `client.logs` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/log';
```

## Classes

### LogService

Defined in: services/log/service.ts:32

Service for querying VergeOS system logs.

Logs are read-only, system-generated entries with up to 25,000 rows that
auto-expire after approximately 31 days. **Always use filters** when querying
to avoid retrieving excessively large result sets.

Default sort order is `-timestamp` (newest first).

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/log';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List recent errors
const errors = await client.logs.listErrors();

// Search logs by text pattern
const matches = await client.logs.search('disk failure');

// List logs since a specific time (microseconds)
const recent = await client.logs.listSince(1700000000000000);
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`Log`](../types.md#log)\>

#### Constructors

##### Constructor

> **new LogService**(`http`): [`LogService`](#logservice)

Defined in: services/log/service.ts:33

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`LogService`](#logservice)

###### Overrides

[`ReadOnlyService`](../index.md#readonlyservice).[`constructor`](../index.md#constructor-13)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`resource`](../index.md#property-resource-2) | services/base.ts:123 |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`displayName`](../index.md#property-displayname) | services/base.ts:126 |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`ReadOnlyService`](../index.md#readonlyservice).[`defaultFields`](../index.md#property-defaultfields) | services/base.ts:138 |

#### Methods

##### get()

> **get**(`key`): `Promise`\<[`Log`](../types.md#log)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`Log`](../types.md#log)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`Log`](../types.md#log)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`Log`](../types.md#log)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`Log`](../types.md#log)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`Log`](../types.md#log)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### list()

> **list**(`options?`): `Promise`\<[`Log`](../types.md#log)[]\>

Defined in: services/log/service.ts:47

List logs with default sort by `-timestamp` (newest first).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | List options (filter, fields, sort, limit, offset) |

###### Returns

`Promise`\<[`Log`](../types.md#log)[]\>

Array of log entries

###### Remarks

Unfiltered queries can return up to 25,000 rows. Always provide
a filter or limit to avoid large result sets.

###### Overrides

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### listByLevel()

> **listByLevel**(`level`, `options?`): `Promise`\<[`Log`](../types.md#log)[]\>

Defined in: services/log/service.ts:59

List logs filtered by severity level.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `level` | [`LogLevel`](../types.md#loglevel) | The log level to filter by (e.g., `'error'`, `'warning'`) |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Log`](../types.md#log)[]\>

Array of log entries matching the level

##### listByObjectType()

> **listByObjectType**(`objectType`, `options?`): `Promise`\<[`Log`](../types.md#log)[]\>

Defined in: services/log/service.ts:72

List logs filtered by object type.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `objectType` | [`LogObjectType`](../types.md#logobjecttype) | The object type to filter by (e.g., `'vm'`, `'vnet'`) |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Log`](../types.md#log)[]\>

Array of log entries for the object type

##### listErrors()

> **listErrors**(`options?`): `Promise`\<[`Log`](../types.md#log)[]\>

Defined in: services/log/service.ts:84

List error and critical log entries.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Log`](../types.md#log)[]\>

Array of error and critical log entries

##### listByUser()

> **listByUser**(`username`, `options?`): `Promise`\<[`Log`](../types.md#log)[]\>

Defined in: services/log/service.ts:97

List logs filtered by username.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `username` | `string` | The username to filter by |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Log`](../types.md#log)[]\>

Array of log entries from the user

##### listSince()

> **listSince**(`timestampMicros`, `options?`): `Promise`\<[`Log`](../types.md#log)[]\>

Defined in: services/log/service.ts:110

List logs since a given timestamp.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `timestampMicros` | `number` | Minimum timestamp in microseconds since epoch |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Log`](../types.md#log)[]\>

Array of log entries newer than the timestamp

##### search()

> **search**(`pattern`, `options?`): `Promise`\<[`Log`](../types.md#log)[]\>

Defined in: services/log/service.ts:125

Search logs by text content.

Uses the `ct` (contains) operator to match against the `text` field.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | Text pattern to search for |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Log`](../types.md#log)[]\>

Array of log entries containing the pattern

## References

### Log

Re-exports [Log](../types.md#log)

***

### LogLevel

Re-exports [LogLevel](../types.md#loglevel)

***

### LogObjectType

Re-exports [LogObjectType](../types.md#logobjecttype)
