[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/tenant-node

# services/tenant-node

Tenant node service registration module.

Importing this module registers the [TenantNodeService](#tenantnodeservice) on [VergeClient](../index.md#vergeclient),
making `client.tenantNodes` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/tenant-node';
```

## Classes

### TenantNodeService

Defined in: [services/tenant-node/service.ts:59](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L59)

Full CRUD service base class that adds resource creation.

This is the most commonly extended base class. Use it for any resource
that supports create, read, update, delete, and actions.

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`TenantNode`](../types.md#tenantnode), [`TenantNodeCreateParams`](../types.md#tenantnodecreateparams), [`TenantNodeUpdateParams`](../types.md#tenantnodeupdateparams)\>

#### Constructors

##### Constructor

> **new TenantNodeService**(`http`): [`TenantNodeService`](#tenantnodeservice)

Defined in: [services/tenant-node/service.ts:64](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L64)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`TenantNodeService`](#tenantnodeservice)

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

> **list**(`options?`): `Promise`\<[`TenantNode`](../types.md#tenantnode)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`TenantNode`](../types.md#tenantnode)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`TenantNode`](../types.md#tenantnode)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`TenantNode`](../types.md#tenantnode)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`TenantNode`](../types.md#tenantnode)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`TenantNode`](../types.md#tenantnode)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`TenantNode`](../types.md#tenantnode)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`TenantNode`](../types.md#tenantnode)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`TenantNode`](../types.md#tenantnode)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`TenantNodeUpdateParams`](../types.md#tenantnodeupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`TenantNode`](../types.md#tenantnode)\>

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

> **create**(`params`, `options?`): `Promise`\<[`TenantNode`](../types.md#tenantnode)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`TenantNodeCreateParams`](../types.md#tenantnodecreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`TenantNode`](../types.md#tenantnode)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### powerOn()

> **powerOn**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant-node/service.ts:74](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L74)

Power on a tenant node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant node ID |

###### Returns

`Promise`\<`void`\>

##### powerOff()

> **powerOff**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant-node/service.ts:83](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L83)

Power off a tenant node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant node ID |

###### Returns

`Promise`\<`void`\>

##### reset()

> **reset**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant-node/service.ts:92](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L92)

Reset (restart) a tenant node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant node ID |

###### Returns

`Promise`\<`void`\>

##### kill()

> **kill**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant-node/service.ts:101](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L101)

Forcefully kill a tenant node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant node ID |

###### Returns

`Promise`\<`void`\>

##### migrate()

> **migrate**(`key`, `targetNode?`): `Promise`\<`void`\>

Defined in: [services/tenant-node/service.ts:111](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L111)

Migrate a tenant node to another host node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant node ID |
| `targetNode?` | [`FlexKey`](../types.md#flexkey) | Optional target host node to migrate to |

###### Returns

`Promise`\<`void`\>

##### powerOnMigrate()

> **powerOnMigrate**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant-node/service.ts:121](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L121)

Power on a tenant node and migrate it to a different host.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant node ID |

###### Returns

`Promise`\<`void`\>

##### powerOffMaintenance()

> **powerOffMaintenance**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant-node/service.ts:130](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L130)

Power off a tenant node for maintenance.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant node ID |

###### Returns

`Promise`\<`void`\>

##### refresh()

> **refresh**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant-node/service.ts:139](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L139)

Refresh the tenant node state.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant node ID |

###### Returns

`Promise`\<`void`\>

##### execute()

> **execute**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/tenant-node/service.ts:149](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L149)

Execute a command on a tenant node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant node ID |
| `params?` | `Record`\<`string`, `unknown`\> | Optional parameters for the command |

###### Returns

`Promise`\<`void`\>

##### listByTenant()

> **listByTenant**(`tenantKey`): `Promise`\<[`TenantNode`](../types.md#tenantnode)[]\>

Defined in: [services/tenant-node/service.ts:159](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant-node/service.ts#L159)

List tenant nodes belonging to a specific tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tenantKey` | [`FlexKey`](../types.md#flexkey) | The tenant ID to filter by |

###### Returns

`Promise`\<[`TenantNode`](../types.md#tenantnode)[]\>

Array of tenant nodes for the specified tenant

## References

### TenantNode

Re-exports [TenantNode](../types.md#tenantnode)

***

### TenantNodeCreateParams

Re-exports [TenantNodeCreateParams](../types.md#tenantnodecreateparams)

***

### TenantNodeOnPowerLoss

Re-exports [TenantNodeOnPowerLoss](../types.md#tenantnodeonpowerloss)

***

### TenantNodeUpdateParams

Re-exports [TenantNodeUpdateParams](../types.md#tenantnodeupdateparams)
