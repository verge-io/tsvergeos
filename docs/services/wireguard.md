[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/wireguard

# services/wireguard

WireGuard service registration module.

Importing this module registers the [WireGuardService](#wireguardservice) on [VergeClient](../index.md#vergeclient),
making `client.wireguard` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/wireguard';
```

## Classes

### WireGuardService

Defined in: [services/wireguard/service.ts:36](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/wireguard/service.ts#L36)

Service for managing VergeOS WireGuard VPN interfaces.

WireGuard interfaces are created on a virtual network and provide
encrypted point-to-point tunnels. Peers are added to an interface
via the WireGuardPeerService.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/wireguard';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all WireGuard interfaces on a network
const wgInterfaces = await client.wireguard.listByNetwork(1);

// Find by name within a network
const wg = await client.wireguard.getByName(1, 'wg0');

// Create a WireGuard interface
const newWg = await client.wireguard.create({
  vnet: 1,
  name: 'wg0',
  ip: '192.168.255.1/24',
});
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`WireGuard`](../types.md#wireguard), [`WireGuardCreateParams`](../types.md#wireguardcreateparams), [`WireGuardUpdateParams`](../types.md#wireguardupdateparams)\>

#### Constructors

##### Constructor

> **new WireGuardService**(`http`): [`WireGuardService`](#wireguardservice)

Defined in: [services/wireguard/service.ts:41](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/wireguard/service.ts#L41)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`WireGuardService`](#wireguardservice)

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

> **list**(`options?`): `Promise`\<[`WireGuard`](../types.md#wireguard)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`WireGuard`](../types.md#wireguard)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`WireGuard`](../types.md#wireguard)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`WireGuard`](../types.md#wireguard)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`WireGuard`](../types.md#wireguard)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`WireGuard`](../types.md#wireguard)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`WireGuard`](../types.md#wireguard)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`WireGuardUpdateParams`](../types.md#wireguardupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`WireGuard`](../types.md#wireguard)\>

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

> **create**(`params`, `options?`): `Promise`\<[`WireGuard`](../types.md#wireguard)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`WireGuardCreateParams`](../types.md#wireguardcreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`WireGuard`](../types.md#wireguard)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### listByNetwork()

> **listByNetwork**(`vnetKey`, `options?`): `Promise`\<[`WireGuard`](../types.md#wireguard)[]\>

Defined in: [services/wireguard/service.ts:54](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/wireguard/service.ts#L54)

List WireGuard interfaces belonging to a specific network.

Convenience method that filters by the `vnet` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The parent network ID |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`WireGuard`](../types.md#wireguard)[]\>

Array of WireGuard interfaces for the specified network

##### getByName()

> **getByName**(`vnetKey`, `name`): `Promise`\<[`WireGuard`](../types.md#wireguard)\>

Defined in: [services/wireguard/service.ts:76](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/wireguard/service.ts#L76)

Get a WireGuard interface by name within a specific network.

WireGuard names are unique per network, not globally. This override
requires a `vnetKey` to scope the lookup.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The parent network ID |
| `name` | `string` | The WireGuard interface name to search for |

###### Returns

`Promise`\<[`WireGuard`](../types.md#wireguard)\>

The matching WireGuard interface

###### Throws

NotFoundError if no interface with that name exists on the network

###### Overrides

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

## References

### WireGuard

Re-exports [WireGuard](../types.md#wireguard)

***

### WireGuardCreateParams

Re-exports [WireGuardCreateParams](../types.md#wireguardcreateparams)

***

### WireGuardUpdateParams

Re-exports [WireGuardUpdateParams](../types.md#wireguardupdateparams)
