[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/cloud-snapshot-vm

# services/cloud-snapshot-vm

Cloud snapshot VM service registration module.

Importing this module registers the [CloudSnapshotVMService](#cloudsnapshotvmservice) on [VergeClient](../index.md#vergeclient),
making `client.cloudSnapshotVms` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/cloud-snapshot-vm';
```

## Classes

### CloudSnapshotVMService

Defined in: [services/cloud-snapshot-vm/service.ts:26](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/cloud-snapshot-vm/service.ts#L26)

Service for querying VMs captured within VergeOS cloud snapshots.

This is a **read-only** service — cloud snapshot VM records are populated
by the system when a cloud snapshot is taken or refreshed.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/cloud-snapshot-vm';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all VMs in a specific cloud snapshot
const vms = await client.cloudSnapshotVms.listBySnapshot(5);

// Get a specific cloud snapshot VM record
const vm = await client.cloudSnapshotVms.get(1);
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`CloudSnapshotVM`](../types.md#cloudsnapshotvm)\>

#### Constructors

##### Constructor

> **new CloudSnapshotVMService**(`http`): [`CloudSnapshotVMService`](#cloudsnapshotvmservice)

Defined in: [services/cloud-snapshot-vm/service.ts:27](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/cloud-snapshot-vm/service.ts#L27)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`CloudSnapshotVMService`](#cloudsnapshotvmservice)

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

> **list**(`options?`): `Promise`\<[`CloudSnapshotVM`](../types.md#cloudsnapshotvm)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`CloudSnapshotVM`](../types.md#cloudsnapshotvm)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`CloudSnapshotVM`](../types.md#cloudsnapshotvm)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`CloudSnapshotVM`](../types.md#cloudsnapshotvm)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`CloudSnapshotVM`](../types.md#cloudsnapshotvm)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`CloudSnapshotVM`](../types.md#cloudsnapshotvm)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`CloudSnapshotVM`](../types.md#cloudsnapshotvm)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`CloudSnapshotVM`](../types.md#cloudsnapshotvm)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### recover()

> **recover**(`key`): `Promise`\<`void`\>

Defined in: [services/cloud-snapshot-vm/service.ts:36](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/cloud-snapshot-vm/service.ts#L36)

Recover a VM from a cloud snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The cloud snapshot VM record ID |

###### Returns

`Promise`\<`void`\>

##### listBySnapshot()

> **listBySnapshot**(`snapshotKey`, `options?`): `Promise`\<[`CloudSnapshotVM`](../types.md#cloudsnapshotvm)[]\>

Defined in: [services/cloud-snapshot-vm/service.ts:51](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/cloud-snapshot-vm/service.ts#L51)

List VMs belonging to a specific cloud snapshot.

Convenience method that filters by the `cloud_snapshot` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `snapshotKey` | [`FlexKey`](../types.md#flexkey) | The parent cloud snapshot ID |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`CloudSnapshotVM`](../types.md#cloudsnapshotvm)[]\>

Array of VM records for the specified cloud snapshot

## References

### CloudSnapshotVM

Re-exports [CloudSnapshotVM](../types.md#cloudsnapshotvm)

***

### CloudSnapshotVMStatus

Re-exports [CloudSnapshotVMStatus](../types.md#cloudsnapshotvmstatus)
