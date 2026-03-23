[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/site-sync-outgoing

# services/site-sync-outgoing

Outgoing site sync service registration module.

Importing this module registers the [SiteSyncOutgoingService](#sitesyncoutgoingservice) on [VergeClient](../index.md#vergeclient),
making `client.siteSyncsOutgoing` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/site-sync-outgoing';
```

## Classes

### SiteSyncOutgoingService

Defined in: [services/site-sync-outgoing/service.ts:37](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/site-sync-outgoing/service.ts#L37)

Service for managing VergeOS outgoing site syncs.

Outgoing syncs push snapshot data to remote sites. They handle transport
configuration (threads, encryption, compression), bandwidth throttling,
retry behavior, and remote snapshot management.

Actions use the dedicated `/site_syncs_outgoing_actions` endpoint with
FK field `site_syncs_outgoing`.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/site-sync-outgoing';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all outgoing syncs
const syncs = await client.siteSyncsOutgoing.list();

// List outgoing syncs for a specific site
const siteSyncs = await client.siteSyncsOutgoing.listBySite(1);

// Enable an outgoing sync
await client.siteSyncsOutgoing.enable(1);
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing), [`SiteSyncOutgoingCreateParams`](../types.md#sitesyncoutgoingcreateparams), [`SiteSyncOutgoingUpdateParams`](../types.md#sitesyncoutgoingupdateparams)\>

#### Constructors

##### Constructor

> **new SiteSyncOutgoingService**(`http`): [`SiteSyncOutgoingService`](#sitesyncoutgoingservice)

Defined in: [services/site-sync-outgoing/service.ts:42](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/site-sync-outgoing/service.ts#L42)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`SiteSyncOutgoingService`](#sitesyncoutgoingservice)

###### Overrides

[`BaseService`](../index.md#baseservice).[`constructor`](../index.md#constructor-15)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`BaseService`](../index.md#baseservice).[`resource`](../index.md#property-resource-4) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`BaseService`](../index.md#baseservice).[`displayName`](../index.md#property-displayname-2) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`BaseService`](../index.md#baseservice).[`defaultFields`](../index.md#property-defaultfields-2) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L138) |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](../index.md#actionconfig) | Derived or overridden action endpoint configuration. | [`BaseService`](../index.md#baseservice).[`actionConfig`](../index.md#property-actionconfig-1) | [services/base.ts:256](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L256) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`SiteSyncOutgoingUpdateParams`](../types.md#sitesyncoutgoingupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)\>

The updated resource (or the resource with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`update`](../index.md#update-1)

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

[`BaseService`](../index.md#baseservice).[`delete`](../index.md#delete-1)

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

[`BaseService`](../index.md#baseservice).[`inlineAction`](../index.md#inlineaction-1)

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

[`BaseService`](../index.md#baseservice).[`dispatchAction`](../index.md#dispatchaction-1)

##### create()

> **create**(`params`, `options?`): `Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`SiteSyncOutgoingCreateParams`](../types.md#sitesyncoutgoingcreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### listBySite()

> **listBySite**(`siteKey`, `options?`): `Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)[]\>

Defined in: [services/site-sync-outgoing/service.ts:53](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/site-sync-outgoing/service.ts#L53)

List outgoing syncs belonging to a specific site.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteKey` | [`FlexKey`](../types.md#flexkey) | The site ID to filter by |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (fields, sort, limit, etc.) |

###### Returns

`Promise`\<[`SiteSyncOutgoing`](../types.md#sitesyncoutgoing)[]\>

Array of outgoing syncs for the given site

##### enable()

> **enable**(`key`): `Promise`\<`void`\>

Defined in: [services/site-sync-outgoing/service.ts:64](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/site-sync-outgoing/service.ts#L64)

Enable an outgoing sync.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The outgoing sync ID |

###### Returns

`Promise`\<`void`\>

##### disable()

> **disable**(`key`): `Promise`\<`void`\>

Defined in: [services/site-sync-outgoing/service.ts:73](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/site-sync-outgoing/service.ts#L73)

Disable an outgoing sync.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The outgoing sync ID |

###### Returns

`Promise`\<`void`\>

##### throttleSync()

> **throttleSync**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/site-sync-outgoing/service.ts:83](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/site-sync-outgoing/service.ts#L83)

Throttle an outgoing sync.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The outgoing sync ID |
| `params?` | `Record`\<`string`, `unknown`\> | Throttle parameters |

###### Returns

`Promise`\<`void`\>

##### addToQueue()

> **addToQueue**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/site-sync-outgoing/service.ts:93](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/site-sync-outgoing/service.ts#L93)

Add a snapshot to the transfer queue.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The outgoing sync ID |
| `params?` | `Record`\<`string`, `unknown`\> | Queue parameters |

###### Returns

`Promise`\<`void`\>

##### refresh()

> **refresh**(`key`): `Promise`\<`void`\>

Defined in: [services/site-sync-outgoing/service.ts:102](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/site-sync-outgoing/service.ts#L102)

Refresh remote snapshots.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The outgoing sync ID |

###### Returns

`Promise`\<`void`\>

##### setupSyncBack()

> **setupSyncBack**(`key`): `Promise`\<`void`\>

Defined in: [services/site-sync-outgoing/service.ts:111](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/site-sync-outgoing/service.ts#L111)

Set up a sync-back incoming sync on the remote system.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The outgoing sync ID |

###### Returns

`Promise`\<`void`\>

##### createRepairServer()

> **createRepairServer**(`key`): `Promise`\<`void`\>

Defined in: [services/site-sync-outgoing/service.ts:120](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/site-sync-outgoing/service.ts#L120)

Create a repair server for this outgoing sync.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The outgoing sync ID |

###### Returns

`Promise`\<`void`\>

##### updateRemoteConfig()

> **updateRemoteConfig**(`key`): `Promise`\<`void`\>

Defined in: [services/site-sync-outgoing/service.ts:129](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/site-sync-outgoing/service.ts#L129)

Update the remote configuration for this outgoing sync.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The outgoing sync ID |

###### Returns

`Promise`\<`void`\>

## References

### SiteSyncOutgoing

Re-exports [SiteSyncOutgoing](../types.md#sitesyncoutgoing)

***

### SiteSyncOutgoingCreateParams

Re-exports [SiteSyncOutgoingCreateParams](../types.md#sitesyncoutgoingcreateparams)

***

### SiteSyncOutgoingDestinationTier

Re-exports [SiteSyncOutgoingDestinationTier](../types.md#sitesyncoutgoingdestinationtier)

***

### SiteSyncOutgoingRemoteSnapsStatus

Re-exports [SiteSyncOutgoingRemoteSnapsStatus](../types.md#sitesyncoutgoingremotesnapsstatus)

***

### SiteSyncOutgoingState

Re-exports [SiteSyncOutgoingState](../types.md#sitesyncoutgoingstate)

***

### SiteSyncOutgoingStatus

Re-exports [SiteSyncOutgoingStatus](../types.md#sitesyncoutgoingstatus)

***

### SiteSyncOutgoingUpdateParams

Re-exports [SiteSyncOutgoingUpdateParams](../types.md#sitesyncoutgoingupdateparams)
