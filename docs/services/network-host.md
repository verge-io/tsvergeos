[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/network-host

# services/network-host

Network Host service registration module.

Importing this module registers the [NetworkHostService](#networkhostservice) on [VergeClient](../index.md#vergeclient),
making `client.networkHosts` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/network-host';
```

## Classes

### NetworkHostService

Defined in: [services/network-host/service.ts:38](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-host/service.ts#L38)

Service for managing VergeOS network host overrides.

Host overrides are DNS/DHCP static hostname-to-IP mappings on a virtual
network. They map a hostname or domain to an IP address — they are NOT
MAC-based DHCP reservations.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/network-host';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all host overrides for a network
const hosts = await client.networkHosts.listByNetwork(1);

// Find a host by hostname
const host = await client.networkHosts.getByHost(1, 'myserver');

// Find a host by IP address
const host = await client.networkHosts.getByIP(1, '10.0.0.50');

// Create a host override
const newHost = await client.networkHosts.create({
  vnet: 1,
  host: 'myserver',
  ip: '10.0.0.50',
});
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`NetworkHost`](../types.md#networkhost), [`NetworkHostCreateParams`](../types.md#networkhostcreateparams), [`NetworkHostUpdateParams`](../types.md#networkhostupdateparams)\>

#### Constructors

##### Constructor

> **new NetworkHostService**(`http`): [`NetworkHostService`](#networkhostservice)

Defined in: [services/network-host/service.ts:43](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-host/service.ts#L43)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`NetworkHostService`](#networkhostservice)

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

> **list**(`options?`): `Promise`\<[`NetworkHost`](../types.md#networkhost)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`NetworkHost`](../types.md#networkhost)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`NetworkHost`](../types.md#networkhost)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`NetworkHost`](../types.md#networkhost)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`NetworkHost`](../types.md#networkhost)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`NetworkHost`](../types.md#networkhost)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`NetworkHost`](../types.md#networkhost)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`NetworkHost`](../types.md#networkhost)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`NetworkHost`](../types.md#networkhost)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`NetworkHostUpdateParams`](../types.md#networkhostupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`NetworkHost`](../types.md#networkhost)\>

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

> **create**(`params`, `options?`): `Promise`\<[`NetworkHost`](../types.md#networkhost)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`NetworkHostCreateParams`](../types.md#networkhostcreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`NetworkHost`](../types.md#networkhost)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### listByNetwork()

> **listByNetwork**(`vnetKey`, `options?`): `Promise`\<[`NetworkHost`](../types.md#networkhost)[]\>

Defined in: [services/network-host/service.ts:56](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-host/service.ts#L56)

List host overrides belonging to a specific network.

Convenience method that filters by the `vnet` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The parent network ID |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`NetworkHost`](../types.md#networkhost)[]\>

Array of host overrides for the specified network

##### getByHost()

> **getByHost**(`vnetKey`, `hostname`): `Promise`\<[`NetworkHost`](../types.md#networkhost) \| `undefined`\>

Defined in: [services/network-host/service.ts:77](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-host/service.ts#L77)

Find a host override by hostname within a specific network.

The display field for host overrides is `host`, not `name`. This method
filters by both `vnet` and `host` to find a specific host override.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The parent network ID |
| `hostname` | `string` | The hostname to search for |

###### Returns

`Promise`\<[`NetworkHost`](../types.md#networkhost) \| `undefined`\>

The matching host override, or `undefined` if not found

##### getByIP()

> **getByIP**(`vnetKey`, `ip`): `Promise`\<[`NetworkHost`](../types.md#networkhost) \| `undefined`\>

Defined in: [services/network-host/service.ts:94](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-host/service.ts#L94)

Find a host override by IP address within a specific network.

Useful for reverse lookups — finding which hostname is mapped to a
particular IP address.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The parent network ID |
| `ip` | `string` | The IP address to search for |

###### Returns

`Promise`\<[`NetworkHost`](../types.md#networkhost) \| `undefined`\>

The matching host override, or `undefined` if not found

## References

### HostType

Re-exports [HostType](../types.md#hosttype)

***

### NetworkHost

Re-exports [NetworkHost](../types.md#networkhost)

***

### NetworkHostCreateParams

Re-exports [NetworkHostCreateParams](../types.md#networkhostcreateparams)

***

### NetworkHostUpdateParams

Re-exports [NetworkHostUpdateParams](../types.md#networkhostupdateparams)
