[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/cloud-snapshot-tenant

# services/cloud-snapshot-tenant

Cloud snapshot tenant service registration module.

Importing this module registers the [CloudSnapshotTenantService](#cloudsnapshottenantservice) on [VergeClient](../index.md#vergeclient),
making `client.cloudSnapshotTenants` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/cloud-snapshot-tenant';
```

## Classes

### CloudSnapshotTenantService

Defined in: [services/cloud-snapshot-tenant/service.ts:26](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot-tenant/service.ts#L26)

Service for querying tenants captured within VergeOS cloud snapshots.

This is a **read-only** service — cloud snapshot tenant records are populated
by the system when a cloud snapshot is taken or refreshed.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/cloud-snapshot-tenant';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all tenants in a specific cloud snapshot
const tenants = await client.cloudSnapshotTenants.listBySnapshot(5);

// Get a specific cloud snapshot tenant record
const tenant = await client.cloudSnapshotTenants.get(1);
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`CloudSnapshotTenant`](../types.md#cloudsnapshottenant)\>

#### Constructors

##### Constructor

> **new CloudSnapshotTenantService**(`http`): [`CloudSnapshotTenantService`](#cloudsnapshottenantservice)

Defined in: [services/cloud-snapshot-tenant/service.ts:27](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot-tenant/service.ts#L27)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`CloudSnapshotTenantService`](#cloudsnapshottenantservice)

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

> **list**(`options?`): `Promise`\<[`CloudSnapshotTenant`](../types.md#cloudsnapshottenant)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`CloudSnapshotTenant`](../types.md#cloudsnapshottenant)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`CloudSnapshotTenant`](../types.md#cloudsnapshottenant)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`CloudSnapshotTenant`](../types.md#cloudsnapshottenant)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`CloudSnapshotTenant`](../types.md#cloudsnapshottenant)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`CloudSnapshotTenant`](../types.md#cloudsnapshottenant)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`CloudSnapshotTenant`](../types.md#cloudsnapshottenant)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`CloudSnapshotTenant`](../types.md#cloudsnapshottenant)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### recover()

> **recover**(`key`): `Promise`\<`void`\>

Defined in: [services/cloud-snapshot-tenant/service.ts:36](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot-tenant/service.ts#L36)

Recover a tenant from a cloud snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The cloud snapshot tenant record ID |

###### Returns

`Promise`\<`void`\>

##### listBySnapshot()

> **listBySnapshot**(`snapshotKey`, `options?`): `Promise`\<[`CloudSnapshotTenant`](../types.md#cloudsnapshottenant)[]\>

Defined in: [services/cloud-snapshot-tenant/service.ts:51](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot-tenant/service.ts#L51)

List tenants belonging to a specific cloud snapshot.

Convenience method that filters by the `cloud_snapshot` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `snapshotKey` | [`FlexKey`](../types.md#flexkey) | The parent cloud snapshot ID |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`CloudSnapshotTenant`](../types.md#cloudsnapshottenant)[]\>

Array of tenant records for the specified cloud snapshot

## References

### CloudSnapshotTenant

Re-exports [CloudSnapshotTenant](../types.md#cloudsnapshottenant)

***

### CloudSnapshotTenantStatus

Re-exports [CloudSnapshotTenantStatus](../types.md#cloudsnapshottenantstatus)
