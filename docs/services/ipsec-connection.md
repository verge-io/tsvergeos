[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/ipsec-connection

# services/ipsec-connection

IPSec Connection service registration module.

Importing this module registers the [IPSecConnectionService](#ipsecconnectionservice) on [VergeClient](../index.md#vergeclient),
making `client.ipsecConnections` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/ipsec-connection';
```

## Classes

### IPSecConnectionService

Defined in: [services/ipsec-connection/service.ts:23](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/ipsec-connection/service.ts#L23)

Service for querying IPSec VPN connection status.

This is a **read-only** service — connection entries are managed by the
system and cannot be created, updated, or deleted via the API. Each entry
represents an active Security Association (SA) for an IPSec tunnel.

#### Example

```typescript
import 'tsvergeos/services/ipsec-connection';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all active IPSec connections for a network
const connections = await client.ipsecConnections.listByNetwork(1);
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`IPSecConnection`](../types.md#ipsecconnection)\>

#### Constructors

##### Constructor

> **new IPSecConnectionService**(`http`): [`IPSecConnectionService`](#ipsecconnectionservice)

Defined in: [services/ipsec-connection/service.ts:24](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/ipsec-connection/service.ts#L24)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`IPSecConnectionService`](#ipsecconnectionservice)

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

> **list**(`options?`): `Promise`\<[`IPSecConnection`](../types.md#ipsecconnection)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`IPSecConnection`](../types.md#ipsecconnection)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`IPSecConnection`](../types.md#ipsecconnection)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`IPSecConnection`](../types.md#ipsecconnection)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`IPSecConnection`](../types.md#ipsecconnection)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`IPSecConnection`](../types.md#ipsecconnection)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`IPSecConnection`](../types.md#ipsecconnection)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`IPSecConnection`](../types.md#ipsecconnection)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByNetwork()

> **listByNetwork**(`vnetKey`, `options?`): `Promise`\<[`IPSecConnection`](../types.md#ipsecconnection)[]\>

Defined in: [services/ipsec-connection/service.ts:37](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/ipsec-connection/service.ts#L37)

List active IPSec connections for a specific network.

Convenience method that filters by the `vnet` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The parent network ID |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`IPSecConnection`](../types.md#ipsecconnection)[]\>

Array of IPSec connections for the specified network

##### listByPhase1()

> **listByPhase1**(`phase1Key`, `options?`): `Promise`\<[`IPSecConnection`](../types.md#ipsecconnection)[]\>

Defined in: [services/ipsec-connection/service.ts:57](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/ipsec-connection/service.ts#L57)

List active IPSec connections for a specific Phase 1 (IKE SA) entry.

Convenience method that filters by the `phase1` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `phase1Key` | [`FlexKey`](../types.md#flexkey) | The Phase 1 entry ID |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`IPSecConnection`](../types.md#ipsecconnection)[]\>

Array of IPSec connections for the specified Phase 1 entry

## References

### IPSecConnection

Re-exports [IPSecConnection](../types.md#ipsecconnection)
