[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/wireguard-peer

# services/wireguard-peer

WireGuard Peer service registration module.

Importing this module registers the [WireGuardPeerService](#wireguardpeerservice) on [VergeClient](../index.md#vergeclient),
making `client.wireguardPeers` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/wireguard-peer';
```

## Classes

### WireGuardPeerService

Defined in: services/wireguard-peer/service.ts:33

Service for managing VergeOS WireGuard peers.

Peers are added to a WireGuard interface to establish encrypted tunnels.
Each peer requires a public key and allowed IPs. When `autogenerate_peer`
is enabled, the API generates a downloadable config via [getConfig](#getconfig).

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/wireguard-peer';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all peers for a WireGuard interface
const peers = await client.wireguardPeers.listByWireGuard(1);

// Get the auto-generated config for a peer
const config = await client.wireguardPeers.getConfig(42);
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`WireGuardPeer`](../types.md#wireguardpeer), [`WireGuardPeerCreateParams`](../types.md#wireguardpeercreateparams), [`WireGuardPeerUpdateParams`](../types.md#wireguardpeerupdateparams)\>

#### Constructors

##### Constructor

> **new WireGuardPeerService**(`http`): [`WireGuardPeerService`](#wireguardpeerservice)

Defined in: services/wireguard-peer/service.ts:38

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`WireGuardPeerService`](#wireguardpeerservice)

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

> **list**(`options?`): `Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`WireGuardPeer`](../types.md#wireguardpeer)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`WireGuardPeer`](../types.md#wireguardpeer)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)\>

Defined in: services/base.ts:293

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`WireGuardPeerUpdateParams`](../types.md#wireguardpeerupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)\>

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

> **create**(`params`, `options?`): `Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)\>

Defined in: services/base.ts:395

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`WireGuardPeerCreateParams`](../types.md#wireguardpeercreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### listByWireGuard()

> **listByWireGuard**(`wgKey`, `options?`): `Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)[]\>

Defined in: services/wireguard-peer/service.ts:51

List peers belonging to a specific WireGuard interface.

Convenience method that filters by the `wireguard` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `wgKey` | [`FlexKey`](../types.md#flexkey) | The parent WireGuard interface ID |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)[]\>

Array of peers for the specified WireGuard interface

##### getByName()

> **getByName**(`wgKey`, `name`): `Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)\>

Defined in: services/wireguard-peer/service.ts:73

Get a WireGuard peer by name within a specific WireGuard interface.

Peer names are unique per WireGuard interface, not globally. This override
requires a `wgKey` to scope the lookup.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `wgKey` | [`FlexKey`](../types.md#flexkey) | The parent WireGuard interface ID |
| `name` | `string` | The peer name to search for |

###### Returns

`Promise`\<[`WireGuardPeer`](../types.md#wireguardpeer)\>

The matching peer

###### Throws

NotFoundError if no peer with that name exists on the interface

###### Overrides

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### getConfig()

> **getConfig**(`peerKey`): `Promise`\<`string` \| `undefined`\>

Defined in: services/wireguard-peer/service.ts:104

Get the auto-generated WireGuard configuration for a peer.

Returns the `wg_config` field content, which is only populated when the
peer was created with `autogenerate_peer: true`. Returns `undefined` if
the config is not available.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `peerKey` | [`FlexKey`](../types.md#flexkey) | The peer ID |

###### Returns

`Promise`\<`string` \| `undefined`\>

The WireGuard config file content, or `undefined` if not available

## References

### WireGuardPeer

Re-exports [WireGuardPeer](../types.md#wireguardpeer)

***

### WireGuardPeerCreateParams

Re-exports [WireGuardPeerCreateParams](../types.md#wireguardpeercreateparams)

***

### WireGuardPeerFirewallConfig

Re-exports [WireGuardPeerFirewallConfig](../types.md#wireguardpeerfirewallconfig)

***

### WireGuardPeerUpdateParams

Re-exports [WireGuardPeerUpdateParams](../types.md#wireguardpeerupdateparams)
