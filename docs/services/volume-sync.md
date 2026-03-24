[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/volume-sync

# services/volume-sync

Volume Sync service registration module.

Importing this module registers the [VolumeSyncService](#volumesyncservice) on [VergeClient](../index.md#vergeclient),
making `client.volumeSyncs` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/volume-sync';
```

## Classes

### VolumeSyncService

Defined in: services/volume-sync/service.ts:34

Service for managing VergeOS volume syncs.

Volume syncs synchronize data between volumes within a NAS service. They are
children of NAS services (`vm_services`) and use 40-character SHA1 hash
strings as keys. Use [listByService](#listbyservice) to list syncs for a specific
NAS service.

Actions (`start_sync`, `stop_sync`) are dispatched via the dedicated
`/volume_sync_actions` endpoint with body key `sync`.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/volume-sync';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all volume syncs for a NAS service
const syncs = await client.volumeSyncs.listByService(42);

// Start a sync
await client.volumeSyncs.startSync('abc123...');

// Stop a sync
await client.volumeSyncs.stopSync('abc123...');
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`VolumeSync`](../types.md#volumesync), [`VolumeSyncCreateParams`](../types.md#volumesynccreateparams), [`VolumeSyncUpdateParams`](../types.md#volumesyncupdateparams)\>

#### Constructors

##### Constructor

> **new VolumeSyncService**(`http`): [`VolumeSyncService`](#volumesyncservice)

Defined in: services/volume-sync/service.ts:39

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`VolumeSyncService`](#volumesyncservice)

###### Overrides

[`BaseService`](../index.md#baseservice).[`constructor`](../index.md#constructor-15)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`BaseService`](../index.md#baseservice).[`resource`](../index.md#property-resource-4) | services/base.ts:123 |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`BaseService`](../index.md#baseservice).[`displayName`](../index.md#property-displayname-2) | services/base.ts:126 |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`BaseService`](../index.md#baseservice).[`defaultFields`](../index.md#property-defaultfields-2) | services/base.ts:138 |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](../index.md#actionconfig) | Derived or overridden action endpoint configuration. | [`BaseService`](../index.md#baseservice).[`actionConfig`](../index.md#property-actionconfig-1) | services/base.ts:256 |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`VolumeSync`](../types.md#volumesync)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`VolumeSync`](../types.md#volumesync)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`VolumeSync`](../types.md#volumesync)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`VolumeSync`](../types.md#volumesync)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`VolumeSync`](../types.md#volumesync)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`VolumeSync`](../types.md#volumesync)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`VolumeSync`](../types.md#volumesync)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`VolumeSync`](../types.md#volumesync)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`VolumeSync`](../types.md#volumesync)\>

Defined in: services/base.ts:293

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`VolumeSyncUpdateParams`](../types.md#volumesyncupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`VolumeSync`](../types.md#volumesync)\>

The updated resource (or the resource with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`update`](../index.md#update-1)

##### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: services/base.ts:309

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

[`BaseService`](../index.md#baseservice).[`delete`](../index.md#delete-1)

##### inlineAction()

> `protected` **inlineAction**(`key`, `action`, `params?`): `Promise`\<`void`\>

Defined in: services/base.ts:330

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

[`BaseService`](../index.md#baseservice).[`inlineAction`](../index.md#inlineaction-1)

##### dispatchAction()

> `protected` **dispatchAction**(`action`, `key`, `params?`): `Promise`\<`void`\>

Defined in: services/base.ts:356

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

[`BaseService`](../index.md#baseservice).[`dispatchAction`](../index.md#dispatchaction-1)

##### create()

> **create**(`params`, `options?`): `Promise`\<[`VolumeSync`](../types.md#volumesync)\>

Defined in: services/base.ts:395

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`VolumeSyncCreateParams`](../types.md#volumesynccreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`VolumeSync`](../types.md#volumesync)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### listByService()

> **listByService**(`serviceKey`, `options?`): `Promise`\<[`VolumeSync`](../types.md#volumesync)[]\>

Defined in: services/volume-sync/service.ts:55

List volume syncs belonging to a specific NAS service.

Convenience method that filters by the `service` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `serviceKey` | [`FlexKey`](../types.md#flexkey) | The parent NAS service key (FK to `vm_services`) |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`VolumeSync`](../types.md#volumesync)[]\>

Array of volume syncs for the specified service

##### startSync()

> **startSync**(`key`): `Promise`\<`void`\>

Defined in: services/volume-sync/service.ts:75

Start a volume sync.

Dispatches the `start_sync` action to the `/volume_sync_actions` endpoint.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The volume sync SHA1 key |

###### Returns

`Promise`\<`void`\>

##### stopSync()

> **stopSync**(`key`): `Promise`\<`void`\>

Defined in: services/volume-sync/service.ts:86

Stop a running volume sync.

Dispatches the `stop_sync` action to the `/volume_sync_actions` endpoint.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The volume sync SHA1 key |

###### Returns

`Promise`\<`void`\>

##### enable()

> **enable**(`key`): `Promise`\<`void`\>

Defined in: services/volume-sync/service.ts:97

Enable a volume sync.

Dispatches the `enable` action to the `/volume_sync_actions` endpoint.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The volume sync SHA1 key |

###### Returns

`Promise`\<`void`\>

##### disable()

> **disable**(`key`): `Promise`\<`void`\>

Defined in: services/volume-sync/service.ts:108

Disable a volume sync.

Dispatches the `disable` action to the `/volume_sync_actions` endpoint.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The volume sync SHA1 key |

###### Returns

`Promise`\<`void`\>

## References

### VolumeSync

Re-exports [VolumeSync](../types.md#volumesync)

***

### VolumeSyncCreateParams

Re-exports [VolumeSyncCreateParams](../types.md#volumesynccreateparams)

***

### VolumeSyncDestinationDelete

Re-exports [VolumeSyncDestinationDelete](../types.md#volumesyncdestinationdelete)

***

### VolumeSyncMethod

Re-exports [VolumeSyncMethod](../types.md#volumesyncmethod)

***

### VolumeSyncPreferredTier

Re-exports [VolumeSyncPreferredTier](../types.md#volumesyncpreferredtier)

***

### VolumeSyncType

Re-exports [VolumeSyncType](../types.md#volumesynctype)

***

### VolumeSyncUpdateParams

Re-exports [VolumeSyncUpdateParams](../types.md#volumesyncupdateparams)
