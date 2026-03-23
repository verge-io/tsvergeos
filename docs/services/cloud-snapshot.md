[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/cloud-snapshot

# services/cloud-snapshot

Cloud snapshot service registration module.

Importing this module registers the [CloudSnapshotService](#cloudsnapshotservice) on [VergeClient](../index.md#vergeclient),
making `client.cloudSnapshots` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/cloud-snapshot';
```

## Classes

### CloudSnapshotService

Defined in: [services/cloud-snapshot/service.ts:39](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot/service.ts#L39)

Service for managing VergeOS cloud snapshots.

Cloud snapshots are system-level point-in-time captures that preserve
VMs, tenants, and volumes. They form the foundation of VergeOS DR.

Creation uses a table action (`POST /cloud_snapshots?action=create`) instead
of a standard POST. Actions use the dedicated `/cloud_snapshot_actions` endpoint.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/cloud-snapshot';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all cloud snapshots
const snapshots = await client.cloudSnapshots.list();

// Create a new snapshot
const snap = await client.cloudSnapshots.create({ name: 'pre-upgrade' });

// Clone a snapshot
await client.cloudSnapshots.clone(snap.$key, 'pre-upgrade-copy');

// Refresh snapshot content
await client.cloudSnapshots.refresh(snap.$key);
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`CloudSnapshot`](../types.md#cloudsnapshot), [`CloudSnapshotCreateParams`](../types.md#cloudsnapshotcreateparams), [`CloudSnapshotUpdateParams`](../types.md#cloudsnapshotupdateparams)\>

#### Constructors

##### Constructor

> **new CloudSnapshotService**(`http`): [`CloudSnapshotService`](#cloudsnapshotservice)

Defined in: [services/cloud-snapshot/service.ts:44](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot/service.ts#L44)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`CloudSnapshotService`](#cloudsnapshotservice)

###### Overrides

[`BaseService`](../index.md#baseservice).[`constructor`](../index.md#constructor-15)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`BaseService`](../index.md#baseservice).[`resource`](../index.md#property-resource-4) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`BaseService`](../index.md#baseservice).[`displayName`](../index.md#property-displayname-2) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`BaseService`](../index.md#baseservice).[`defaultFields`](../index.md#property-defaultfields-2) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L138) |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](../index.md#actionconfig) | Derived or overridden action endpoint configuration. | [`BaseService`](../index.md#baseservice).[`actionConfig`](../index.md#property-actionconfig-1) | [services/base.ts:256](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L256) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`CloudSnapshot`](../types.md#cloudsnapshot)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`CloudSnapshot`](../types.md#cloudsnapshot)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`CloudSnapshot`](../types.md#cloudsnapshot)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`CloudSnapshot`](../types.md#cloudsnapshot)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`CloudSnapshot`](../types.md#cloudsnapshot)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`CloudSnapshot`](../types.md#cloudsnapshot)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`CloudSnapshot`](../types.md#cloudsnapshot)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`CloudSnapshot`](../types.md#cloudsnapshot)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`CloudSnapshot`](../types.md#cloudsnapshot)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`CloudSnapshotUpdateParams`](../types.md#cloudsnapshotupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`CloudSnapshot`](../types.md#cloudsnapshot)\>

The updated resource (or the resource with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`update`](../index.md#update-1)

##### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [services/base.ts:309](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L309)

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

Defined in: [services/base.ts:330](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L330)

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

Defined in: [services/base.ts:356](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L356)

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

> **create**(`params`, `options?`): `Promise`\<[`CloudSnapshot`](../types.md#cloudsnapshot)\>

Defined in: [services/cloud-snapshot/service.ts:58](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot/service.ts#L58)

Create a new cloud snapshot.

Overrides the default POST to use a table action:
`POST /cloud_snapshots?action=create` with the create params as the body.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`CloudSnapshotCreateParams`](../types.md#cloudsnapshotcreateparams) | The snapshot creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`CloudSnapshot`](../types.md#cloudsnapshot)\>

The created cloud snapshot

###### Overrides

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### refresh()

> **refresh**(`key`): `Promise`\<`void`\>

Defined in: [services/cloud-snapshot/service.ts:80](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot/service.ts#L80)

Refresh a cloud snapshot, re-scanning its content and updating child records.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The cloud snapshot ID to refresh |

###### Returns

`Promise`\<`void`\>

##### clone()

> **clone**(`key`, `name`): `Promise`\<`void`\>

Defined in: [services/cloud-snapshot/service.ts:90](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot/service.ts#L90)

Clone a cloud snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The cloud snapshot ID to clone |
| `name` | `string` | The name for the cloned snapshot |

###### Returns

`Promise`\<`void`\>

##### requestFromProvider()

> **requestFromProvider**(`key`): `Promise`\<`void`\>

Defined in: [services/cloud-snapshot/service.ts:102](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot/service.ts#L102)

Request a cloud snapshot from a provider site.

Used for received snapshots — requests the snapshot data from the
remote provider.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The cloud snapshot ID to request |

###### Returns

`Promise`\<`void`\>

##### findTenants()

> **findTenants**(`key`): `Promise`\<`void`\>

Defined in: [services/cloud-snapshot/service.ts:111](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot/service.ts#L111)

Discover and populate the list of tenants captured in a cloud snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The cloud snapshot ID to scan for tenants |

###### Returns

`Promise`\<`void`\>

##### findVMs()

> **findVMs**(`key`): `Promise`\<`void`\>

Defined in: [services/cloud-snapshot/service.ts:120](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cloud-snapshot/service.ts#L120)

Discover and populate the list of VMs captured in a cloud snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The cloud snapshot ID to scan for VMs |

###### Returns

`Promise`\<`void`\>

## References

### CloudSnapshot

Re-exports [CloudSnapshot](../types.md#cloudsnapshot)

***

### CloudSnapshotCreateParams

Re-exports [CloudSnapshotCreateParams](../types.md#cloudsnapshotcreateparams)

***

### CloudSnapshotExpiresType

Re-exports [CloudSnapshotExpiresType](../types.md#cloudsnapshotexpirestype)

***

### CloudSnapshotImmutableStatus

Re-exports [CloudSnapshotImmutableStatus](../types.md#cloudsnapshotimmutablestatus)

***

### CloudSnapshotStatus

Re-exports [CloudSnapshotStatus](../types.md#cloudsnapshotstatus)

***

### CloudSnapshotUpdateParams

Re-exports [CloudSnapshotUpdateParams](../types.md#cloudsnapshotupdateparams)
