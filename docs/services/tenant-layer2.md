[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/tenant-layer2

# services/tenant-layer2

Tenant Layer 2 network service registration module.

Importing this module registers the [TenantLayer2Service](#tenantlayer2service) on [VergeClient](../index.md#vergeclient),
making `client.tenantLayer2Networks` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/tenant-layer2';
```

## Classes

### TenantLayer2Service

Defined in: services/tenant-layer2/service.ts:30

Service for managing VergeOS tenant Layer 2 network assignments.

Provides full CRUD operations plus convenience methods for enabling/disabling
assignments and filtering by tenant or network.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/tenant-layer2';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List Layer 2 assignments for a tenant
const l2nets = await client.tenantLayer2Networks.listByTenant(1);

// Enable an assignment
await client.tenantLayer2Networks.enable(42);
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`TenantLayer2Network`](../types.md#tenantlayer2network), [`TenantLayer2CreateParams`](../types.md#tenantlayer2createparams), [`TenantLayer2UpdateParams`](../types.md#tenantlayer2updateparams)\>

#### Constructors

##### Constructor

> **new TenantLayer2Service**(`http`): [`TenantLayer2Service`](#tenantlayer2service)

Defined in: services/tenant-layer2/service.ts:35

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`TenantLayer2Service`](#tenantlayer2service)

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

> **list**(`options?`): `Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

Defined in: services/base.ts:293

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`TenantLayer2UpdateParams`](../types.md#tenantlayer2updateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

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

> **create**(`params`, `options?`): `Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

Defined in: services/base.ts:395

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`TenantLayer2CreateParams`](../types.md#tenantlayer2createparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### enable()

> **enable**(`key`): `Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

Defined in: services/tenant-layer2/service.ts:45

Enable a tenant Layer 2 network assignment.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The assignment ID |

###### Returns

`Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

The updated assignment

##### disable()

> **disable**(`key`): `Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

Defined in: services/tenant-layer2/service.ts:55

Disable a tenant Layer 2 network assignment.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The assignment ID |

###### Returns

`Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)\>

The updated assignment

##### listByTenant()

> **listByTenant**(`tenantKey`): `Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)[]\>

Defined in: services/tenant-layer2/service.ts:65

List tenant Layer 2 network assignments for a specific tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tenantKey` | [`FlexKey`](../types.md#flexkey) | The tenant ID to filter by |

###### Returns

`Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)[]\>

Array of Layer 2 assignments for the specified tenant

##### listByNetwork()

> **listByNetwork**(`vnetKey`): `Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)[]\>

Defined in: services/tenant-layer2/service.ts:75

List tenant Layer 2 network assignments for a specific network.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The vnet ID to filter by |

###### Returns

`Promise`\<[`TenantLayer2Network`](../types.md#tenantlayer2network)[]\>

Array of Layer 2 assignments for the specified network

## References

### TenantLayer2CreateParams

Re-exports [TenantLayer2CreateParams](../types.md#tenantlayer2createparams)

***

### TenantLayer2Network

Re-exports [TenantLayer2Network](../types.md#tenantlayer2network)

***

### TenantLayer2UpdateParams

Re-exports [TenantLayer2UpdateParams](../types.md#tenantlayer2updateparams)
