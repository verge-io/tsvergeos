[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/catalog

# services/catalog

Catalog service registration module.

Importing this module registers the [CatalogService](#catalogservice) on [VergeClient](../index.md#vergeclient),
making `client.catalogs` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/catalog';
```

## Classes

### CatalogService

Defined in: [services/catalog/service.ts:32](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/catalog/service.ts#L32)

Service for managing VergeOS catalogs.

Catalogs are containers for VM and tenant recipes, organized by
repository. They are created automatically by the repository refresh
process — create is not supported via the SDK. This service supports
listing, getting, updating, and deleting catalogs.

Catalog keys are 40-character hex strings (not integers).

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/catalog';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all catalogs
const catalogs = await client.catalogs.list();

// Get a specific catalog
const catalog = await client.catalogs.get(catalogs[0].$key);

// Update publishing scope
await client.catalogs.update(catalog.$key, { publishing_scope: 'global' });
```

#### Extends

- [`WritableService`](../index.md#writableservice)\<[`Catalog`](../types.md#catalog), [`CatalogUpdateParams`](../types.md#catalogupdateparams)\>

#### Constructors

##### Constructor

> **new CatalogService**(`http`): [`CatalogService`](#catalogservice)

Defined in: [services/catalog/service.ts:33](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/catalog/service.ts#L33)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`CatalogService`](#catalogservice)

###### Overrides

[`WritableService`](../index.md#writableservice).[`constructor`](../index.md#constructor-14)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`WritableService`](../index.md#writableservice).[`resource`](../index.md#property-resource-3) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`WritableService`](../index.md#writableservice).[`displayName`](../index.md#property-displayname-1) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`WritableService`](../index.md#writableservice).[`defaultFields`](../index.md#property-defaultfields-1) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L138) |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](../index.md#actionconfig) | Derived or overridden action endpoint configuration. | [`WritableService`](../index.md#writableservice).[`actionConfig`](../index.md#property-actionconfig) | [services/base.ts:256](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L256) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`Catalog`](../types.md#catalog)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`Catalog`](../types.md#catalog)[]\>

Array of matching resources

###### Inherited from

[`WritableService`](../index.md#writableservice).[`list`](../index.md#list-1)

##### get()

> **get**(`key`): `Promise`\<[`Catalog`](../types.md#catalog)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`Catalog`](../types.md#catalog)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`WritableService`](../index.md#writableservice).[`get`](../index.md#get-2)

##### getByName()

> **getByName**(`name`): `Promise`\<[`Catalog`](../types.md#catalog)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`Catalog`](../types.md#catalog)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`WritableService`](../index.md#writableservice).[`getByName`](../index.md#getbyname-1)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`Catalog`](../types.md#catalog)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`Catalog`](../types.md#catalog)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`WritableService`](../index.md#writableservice).[`listAll`](../index.md#listall-1)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`Catalog`](../types.md#catalog)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`CatalogUpdateParams`](../types.md#catalogupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`Catalog`](../types.md#catalog)\>

The updated resource (or the resource with just `$key` if `readBack` is false)

###### Inherited from

[`WritableService`](../index.md#writableservice).[`update`](../index.md#update)

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

[`WritableService`](../index.md#writableservice).[`delete`](../index.md#delete)

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

[`WritableService`](../index.md#writableservice).[`inlineAction`](../index.md#inlineaction)

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

[`WritableService`](../index.md#writableservice).[`dispatchAction`](../index.md#dispatchaction)

## References

### Catalog

Re-exports [Catalog](../types.md#catalog)

***

### CatalogPublishingScope

Re-exports [CatalogPublishingScope](../types.md#catalogpublishingscope)

***

### CatalogUpdateParams

Re-exports [CatalogUpdateParams](../types.md#catalogupdateparams)
