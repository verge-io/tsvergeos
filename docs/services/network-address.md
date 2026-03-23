[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/network-address

# services/network-address

Network Address service registration module.

Importing this module registers the [NetworkAddressService](#networkaddressservice) on [VergeClient](../index.md#vergeclient),
making `client.networkAddresses` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/network-address';
```

## Classes

### NetworkAddressService

Defined in: [services/network-address/service.ts:39](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-address/service.ts#L39)

Service for managing VergeOS network addresses.

Network addresses represent DHCP leases, static IP assignments, IP aliases,
proxy ARP entries, and virtual IPs on a virtual network. Addresses are
scoped to a parent network via the `vnet` foreign key.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/network-address';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all addresses for a specific network
const addresses = await client.networkAddresses.listByNetwork(1);

// List only static addresses
const statics = await client.networkAddresses.listByType(1, 'static');

// Find an address by IP
const addr = await client.networkAddresses.getByIP(1, '192.168.1.100');

// Find an address by MAC
const macAddr = await client.networkAddresses.getByMAC(1, 'aa:bb:cc:dd:ee:ff');
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`NetworkAddress`](../types.md#networkaddress), [`NetworkAddressCreateParams`](../types.md#networkaddresscreateparams), [`NetworkAddressUpdateParams`](../types.md#networkaddressupdateparams)\>

#### Constructors

##### Constructor

> **new NetworkAddressService**(`http`): [`NetworkAddressService`](#networkaddressservice)

Defined in: [services/network-address/service.ts:44](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-address/service.ts#L44)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`NetworkAddressService`](#networkaddressservice)

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

> **list**(`options?`): `Promise`\<[`NetworkAddress`](../types.md#networkaddress)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`NetworkAddress`](../types.md#networkaddress)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`NetworkAddress`](../types.md#networkaddress)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`NetworkAddress`](../types.md#networkaddress)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`NetworkAddress`](../types.md#networkaddress)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`NetworkAddress`](../types.md#networkaddress)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`NetworkAddress`](../types.md#networkaddress)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`NetworkAddress`](../types.md#networkaddress)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`NetworkAddress`](../types.md#networkaddress)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`NetworkAddressUpdateParams`](../types.md#networkaddressupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`NetworkAddress`](../types.md#networkaddress)\>

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

> **create**(`params`, `options?`): `Promise`\<[`NetworkAddress`](../types.md#networkaddress)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`NetworkAddressCreateParams`](../types.md#networkaddresscreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`NetworkAddress`](../types.md#networkaddress)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### listByNetwork()

> **listByNetwork**(`vnetKey`, `options?`): `Promise`\<[`NetworkAddress`](../types.md#networkaddress)[]\>

Defined in: [services/network-address/service.ts:57](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-address/service.ts#L57)

List addresses belonging to a specific network.

Convenience method that filters by the `vnet` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The parent network ID |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`NetworkAddress`](../types.md#networkaddress)[]\>

Array of addresses for the specified network

##### listByType()

> **listByType**(`vnetKey`, `type`, `options?`): `Promise`\<[`NetworkAddress`](../types.md#networkaddress)[]\>

Defined in: [services/network-address/service.ts:78](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-address/service.ts#L78)

List addresses of a specific type belonging to a network.

Convenience method that filters by both `vnet` and `type`.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The parent network ID |
| `type` | [`AddressType`](../types.md#addresstype) | The address type to filter by |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`NetworkAddress`](../types.md#networkaddress)[]\>

Array of addresses matching the type for the specified network

##### getByIP()

> **getByIP**(`vnetKey`, `ip`): `Promise`\<[`NetworkAddress`](../types.md#networkaddress) \| `undefined`\>

Defined in: [services/network-address/service.ts:97](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-address/service.ts#L97)

Find an address by IP within a specific network.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The parent network ID |
| `ip` | `string` | The IP address to search for |

###### Returns

`Promise`\<[`NetworkAddress`](../types.md#networkaddress) \| `undefined`\>

The matching address, or `undefined` if not found

##### getByMAC()

> **getByMAC**(`vnetKey`, `mac`): `Promise`\<[`NetworkAddress`](../types.md#networkaddress) \| `undefined`\>

Defined in: [services/network-address/service.ts:111](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-address/service.ts#L111)

Find an address by MAC address within a specific network.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The parent network ID |
| `mac` | `string` | The MAC address to search for |

###### Returns

`Promise`\<[`NetworkAddress`](../types.md#networkaddress) \| `undefined`\>

The matching address, or `undefined` if not found

## References

### AddressType

Re-exports [AddressType](../types.md#addresstype)

***

### NetworkAddress

Re-exports [NetworkAddress](../types.md#networkaddress)

***

### NetworkAddressCreateParams

Re-exports [NetworkAddressCreateParams](../types.md#networkaddresscreateparams)

***

### NetworkAddressUpdateParams

Re-exports [NetworkAddressUpdateParams](../types.md#networkaddressupdateparams)
