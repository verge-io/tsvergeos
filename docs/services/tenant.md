[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/tenant

# services/tenant

Tenant service registration module.

Importing this module registers the [TenantService](#tenantservice) on [VergeClient](../index.md#vergeclient),
making `client.tenants` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/tenant';
```

## Classes

### TenantService

Defined in: [services/tenant/service.ts:40](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L40)

Service for managing VergeOS tenants.

Provides full CRUD operations, power management, cloning, network isolation,
and tenant context connection for multi-tenant environments.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/tenant';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all tenants
const tenants = await client.tenants.list();

// Power on a tenant
await client.tenants.powerOn(1);

// Connect to a tenant's own VergeOS instance
const tenantClient = await client.tenants.connect(1, {
  username: 'admin', password: 'secret'
});
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`Tenant`](../types.md#tenant), [`TenantCreateParams`](../types.md#tenantcreateparams), [`TenantUpdateParams`](../types.md#tenantupdateparams)\>

#### Constructors

##### Constructor

> **new TenantService**(`http`): [`TenantService`](#tenantservice)

Defined in: [services/tenant/service.ts:41](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L41)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`TenantService`](#tenantservice)

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

> **list**(`options?`): `Promise`\<[`Tenant`](../types.md#tenant)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`Tenant`](../types.md#tenant)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`Tenant`](../types.md#tenant)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`Tenant`](../types.md#tenant)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`Tenant`](../types.md#tenant)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`Tenant`](../types.md#tenant)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`Tenant`](../types.md#tenant)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`Tenant`](../types.md#tenant)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`Tenant`](../types.md#tenant)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`TenantUpdateParams`](../types.md#tenantupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`Tenant`](../types.md#tenant)\>

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

> **create**(`params`, `options?`): `Promise`\<[`Tenant`](../types.md#tenant)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`TenantCreateParams`](../types.md#tenantcreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`Tenant`](../types.md#tenant)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### powerOn()

> **powerOn**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:50](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L50)

Power on a tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |

###### Returns

`Promise`\<`void`\>

##### powerOff()

> **powerOff**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:59](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L59)

Power off a tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |

###### Returns

`Promise`\<`void`\>

##### reset()

> **reset**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:68](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L68)

Restart a tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |

###### Returns

`Promise`\<`void`\>

##### clone()

> **clone**(`key`, `options?`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:78](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L78)

Clone a tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID to clone |
| `options?` | [`TenantCloneOptions`](../types.md#tenantcloneoptions) | Clone options (name, exclusions) |

###### Returns

`Promise`\<`void`\>

##### isolateOn()

> **isolateOn**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:89](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L89)

Enable network isolation for a tenant.

When isolated, the tenant's network is disconnected from the host network.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |

###### Returns

`Promise`\<`void`\>

##### isolateOff()

> **isolateOff**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:98](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L98)

Disable network isolation for a tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |

###### Returns

`Promise`\<`void`\>

##### refreshStatus()

> **refreshStatus**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:107](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L107)

Refresh the cluster status of a tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |

###### Returns

`Promise`\<`void`\>

##### connect()

> **connect**(`key`, `config?`): `Promise`\<[`VergeClient`](../index.md#vergeclient)\>

Defined in: [services/tenant/service.ts:132](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L132)

Connect to a tenant's own VergeOS instance.

Fetches the tenant record to read its `url` field, then creates a new
[VergeClient](../index.md#vergeclient) targeting that URL. The caller must provide
authentication credentials via the `config` parameter since the parent
system cannot derive tenant credentials.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |
| `config?` | `Partial`\<[`ClientConfig`](../types.md#clientconfig)\> | Client configuration overrides (must include auth credentials) |

###### Returns

`Promise`\<[`VergeClient`](../index.md#vergeclient)\>

A new VergeClient scoped to the tenant's VergeOS instance

###### Throws

ValidationError if the tenant has no URL configured

###### Example

```typescript
const tenantClient = await client.tenants.connect(1, {
  username: 'admin',
  password: 'tenant-password',
});
```

##### deployCrashCart()

> **deployCrashCart**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:163](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L163)

Deploy a crash cart VM for emergency tenant access.

The crash cart is a utility VM deployed from the "Crash Cart" marketplace
recipe that provides browser-based access to a tenant's VergeOS UI via its
core internal network — bypassing external networking entirely.

Internally: finds the "Crash Cart" VM recipe and deploys it with the
tenant ID as an answer parameter.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID to deploy the crash cart for |

###### Returns

`Promise`\<`void`\>

###### Throws

NotFoundError if the "Crash Cart" recipe is not available

###### Example

```typescript
// Deploy a crash cart for emergency access
await client.tenants.deployCrashCart(1);
```

##### deleteCrashCart()

> **deleteCrashCart**(`key`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:203](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L203)

Delete a crash cart VM for a tenant.

Finds the VM named "Crash Cart - {tenant_name}" and deletes it.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID whose crash cart should be deleted |

###### Returns

`Promise`\<`void`\>

###### Throws

NotFoundError if no crash cart VM is found for the tenant

###### Example

```typescript
// Remove the crash cart when emergency access is no longer needed
await client.tenants.deleteCrashCart(1);
```

##### execute()

> **execute**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:232](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L232)

Execute a command on a tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |
| `params?` | `Record`\<`string`, `unknown`\> | Optional execution parameters |

###### Returns

`Promise`\<`void`\>

##### restore()

> **restore**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:242](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L242)

Restore a tenant from a snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |
| `params?` | `Record`\<`string`, `unknown`\> | Optional restore parameters |

###### Returns

`Promise`\<`void`\>

##### convertCloudSnapshot()

> **convertCloudSnapshot**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:252](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L252)

Convert a system/cloud snapshot for a tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |
| `params?` | `Record`\<`string`, `unknown`\> | Optional conversion parameters |

###### Returns

`Promise`\<`void`\>

##### recoverCloudSnapshot()

> **recoverCloudSnapshot**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:262](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L262)

Recover a tenant from a system/cloud snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |
| `params?` | `Record`\<`string`, `unknown`\> | Optional recovery parameters |

###### Returns

`Promise`\<`void`\>

##### giveFile()

> **giveFile**(`key`, `options`): `Promise`\<`void`\>

Defined in: [services/tenant/service.ts:272](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/service.ts#L272)

Share/give a file to a tenant.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The tenant ID |
| `options` | [`TenantGiveFileOptions`](#tenantgivefileoptions) | File options including the file FK reference |

###### Returns

`Promise`\<`void`\>

## Interfaces

### TenantGiveFileOptions

Defined in: [services/tenant/types.ts:218](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/types.ts#L218)

Options for giving a file to a tenant.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-file"></a> `file` | [`FlexKey`](../types.md#flexkey) | File reference (FK to files). | [services/tenant/types.ts:220](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tenant/types.ts#L220) |

## References

### Tenant

Re-exports [Tenant](../types.md#tenant)

***

### TenantCloneOptions

Re-exports [TenantCloneOptions](../types.md#tenantcloneoptions)

***

### TenantCreateParams

Re-exports [TenantCreateParams](../types.md#tenantcreateparams)

***

### TenantUpdateParams

Re-exports [TenantUpdateParams](../types.md#tenantupdateparams)

***

### ThemeAccess

Re-exports [ThemeAccess](../types.md#themeaccess)
