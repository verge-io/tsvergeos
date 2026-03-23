[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/tenant-snapshot

# services/tenant-snapshot

Tenant snapshot service registration module.

Importing this module registers the [TenantSnapshotService](#tenantsnapshotservice) on [VergeClient](../index.md#vergeclient),
making `client.tenantSnapshots` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/tenant-snapshot';
```

## Classes

### TenantSnapshotService

Defined in: [services/tenant-snapshot/service.ts:33](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/tenant-snapshot/service.ts#L33)

Service for managing VergeOS tenant snapshots.

Tenant snapshots are created automatically by snapshot profiles — there
is no direct create method. This service supports listing, getting,
updating (description, expires), and deleting snapshots.

The `refresh` action is keyed by tenant (not snapshot ID), triggering
a refresh of the snapshot list from the snapshot profile.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/tenant-snapshot';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List snapshots for a tenant
const snapshots = await client.tenantSnapshots.listByTenant(1);

// Set a snapshot to never expire
await client.tenantSnapshots.setNeverExpires(42);

// Refresh snapshots for a tenant
await client.tenantSnapshots.refresh(1);
```

#### Extends

- [`WritableService`](../index.md#writableservice)\<[`TenantSnapshot`](../types.md#tenantsnapshot), [`TenantSnapshotUpdateParams`](../types.md#tenantsnapshotupdateparams)\>

#### Constructors

##### Constructor

> **new TenantSnapshotService**(`http`): [`TenantSnapshotService`](#tenantsnapshotservice)

Defined in: [services/tenant-snapshot/service.ts:37](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/tenant-snapshot/service.ts#L37)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`TenantSnapshotService`](#tenantsnapshotservice)

###### Overrides

[`WritableService`](../index.md#writableservice).[`constructor`](../index.md#constructor-14)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`WritableService`](../index.md#writableservice).[`resource`](../index.md#property-resource-3) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`WritableService`](../index.md#writableservice).[`displayName`](../index.md#property-displayname-1) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`WritableService`](../index.md#writableservice).[`defaultFields`](../index.md#property-defaultfields-1) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L138) |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](../index.md#actionconfig) | Derived or overridden action endpoint configuration. | [`WritableService`](../index.md#writableservice).[`actionConfig`](../index.md#property-actionconfig) | [services/base.ts:256](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L256) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)[]\>

Array of matching resources

###### Inherited from

[`WritableService`](../index.md#writableservice).[`list`](../index.md#list-1)

##### get()

> **get**(`key`): `Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`WritableService`](../index.md#writableservice).[`get`](../index.md#get-2)

##### getByName()

> **getByName**(`name`): `Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`WritableService`](../index.md#writableservice).[`getByName`](../index.md#getbyname-1)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`WritableService`](../index.md#writableservice).[`listAll`](../index.md#listall-1)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`TenantSnapshotUpdateParams`](../types.md#tenantsnapshotupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

The updated resource (or the resource with just `$key` if `readBack` is false)

###### Inherited from

[`WritableService`](../index.md#writableservice).[`update`](../index.md#update)

##### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [services/base.ts:309](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L309)

Delete a resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to delete |

###### Returns

`Promise`\<`void`\>

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`WritableService`](../index.md#writableservice).[`delete`](../index.md#delete)

##### inlineAction()

> `protected` **inlineAction**(`key`, `action`, `params?`): `Promise`\<`void`\>

Defined in: [services/base.ts:330](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L330)

Execute an inline action on a specific resource.

Sends a POST to `/{resource}/{key}/{action}` with optional body params.
Used for record-level actions (e.g., `POST /users/3/enable`).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to act on |
| `action` | `string` | The action name (e.g., `'enable'`, `'disable'`) |
| `params?` | `Record`\<`string`, `unknown`\> | Optional action parameters |

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`WritableService`](../index.md#writableservice).[`inlineAction`](../index.md#inlineaction)

##### dispatchAction()

> `protected` **dispatchAction**(`action`, `key`, `params?`): `Promise`\<`void`\>

Defined in: [services/base.ts:356](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L356)

Dispatch an action to the dedicated `_actions` endpoint.

Sends a POST to `/{actionEndpoint}` with the body:
```json
{ "[actionKey]": key, "action": actionName, "params": { ... } }
```

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `action` | `string` | The action name (e.g., `'poweron'`, `'poweroff'`) |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to act on |
| `params?` | `Record`\<`string`, `unknown`\> | Optional action parameters |

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`WritableService`](../index.md#writableservice).[`dispatchAction`](../index.md#dispatchaction)

##### refresh()

> **refresh**(`tenantKey`): `Promise`\<`void`\>

Defined in: [services/tenant-snapshot/service.ts:49](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/tenant-snapshot/service.ts#L49)

Refresh the tenant snapshots list from the snapshot profile.

This action is keyed by tenant ID, not by snapshot ID.
It triggers a refresh of all snapshots for the specified tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tenantKey` | [`FlexKey`](../types.md#flexkey) | The tenant ID to refresh snapshots for |

###### Returns

`Promise`\<`void`\>

##### setNeverExpires()

> **setNeverExpires**(`key`): `Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

Defined in: [services/tenant-snapshot/service.ts:66](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/tenant-snapshot/service.ts#L66)

Set a tenant snapshot to never expire.

Convenience method that sets `expires` to `0`.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The snapshot ID |

###### Returns

`Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

The updated tenant snapshot

##### setExpires()

> **setExpires**(`key`, `expires`): `Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

Defined in: [services/tenant-snapshot/service.ts:77](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/tenant-snapshot/service.ts#L77)

Set the expiration timestamp for a tenant snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The snapshot ID |
| `expires` | `number` | Expiration timestamp (Unix epoch) |

###### Returns

`Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)\>

The updated tenant snapshot

##### listByTenant()

> **listByTenant**(`tenantKey`): `Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)[]\>

Defined in: [services/tenant-snapshot/service.ts:87](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/tenant-snapshot/service.ts#L87)

List tenant snapshots for a specific tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tenantKey` | [`FlexKey`](../types.md#flexkey) | The tenant ID to filter by |

###### Returns

`Promise`\<[`TenantSnapshot`](../types.md#tenantsnapshot)[]\>

Array of tenant snapshots for the specified tenant

## References

### TenantSnapshot

Re-exports [TenantSnapshot](../types.md#tenantsnapshot)

***

### TenantSnapshotUpdateParams

Re-exports [TenantSnapshotUpdateParams](../types.md#tenantsnapshotupdateparams)
