[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/wireguard-peer-status

# services/wireguard-peer-status

WireGuard Peer Status service registration module.

Importing this module registers the [WireGuardPeerStatusService](#wireguardpeerstatusservice) on [VergeClient](../index.md#vergeclient),
making `client.wireguardPeerStatus` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/wireguard-peer-status';
```

## Classes

### WireGuardPeerStatusService

Defined in: [services/wireguard-peer-status/service.ts:23](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/wireguard-peer-status/service.ts#L23)

Service for querying WireGuard peer connection status.

This is a **read-only** service — peer status entries are managed by
the system and cannot be created, updated, or deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/wireguard-peer-status';

// Get status for a specific peer
const status = await client.wireguardPeerStatus.getByPeer(42);
console.log(`Last handshake: ${status.last_handshake}`);
console.log(`TX: ${status.tx_bytes}, RX: ${status.rx_bytes}`);
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`WireGuardPeerStatus`](../types.md#wireguardpeerstatus)\>

#### Constructors

##### Constructor

> **new WireGuardPeerStatusService**(`http`): [`WireGuardPeerStatusService`](#wireguardpeerstatusservice)

Defined in: [services/wireguard-peer-status/service.ts:24](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/wireguard-peer-status/service.ts#L24)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`WireGuardPeerStatusService`](#wireguardpeerstatusservice)

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

> **list**(`options?`): `Promise`\<[`WireGuardPeerStatus`](../types.md#wireguardpeerstatus)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`WireGuardPeerStatus`](../types.md#wireguardpeerstatus)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`WireGuardPeerStatus`](../types.md#wireguardpeerstatus)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`WireGuardPeerStatus`](../types.md#wireguardpeerstatus)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`WireGuardPeerStatus`](../types.md#wireguardpeerstatus)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`WireGuardPeerStatus`](../types.md#wireguardpeerstatus)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`WireGuardPeerStatus`](../types.md#wireguardpeerstatus)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`WireGuardPeerStatus`](../types.md#wireguardpeerstatus)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### getByPeer()

> **getByPeer**(`peerKey`): `Promise`\<[`WireGuardPeerStatus`](../types.md#wireguardpeerstatus)\>

Defined in: [services/wireguard-peer-status/service.ts:38](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/wireguard-peer-status/service.ts#L38)

Get the connection status for a specific WireGuard peer.

Filters by `peer eq {peerKey}` and returns the first matching result.
Throws [NotFoundError](../index.md#notfounderror) if no status entry exists for the given peer.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `peerKey` | [`FlexKey`](../types.md#flexkey) | The key of the WireGuard peer to look up status for. |

###### Returns

`Promise`\<[`WireGuardPeerStatus`](../types.md#wireguardpeerstatus)\>

The peer status resource.

###### Throws

NotFoundError If no status exists for the specified peer.

## References

### WireGuardPeerStatus

Re-exports [WireGuardPeerStatus](../types.md#wireguardpeerstatus)
