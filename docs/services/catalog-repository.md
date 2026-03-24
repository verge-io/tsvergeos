[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/catalog-repository

# services/catalog-repository

Catalog repository service registration module.

Importing this module registers the [CatalogRepositoryService](#catalogrepositoryservice) on [VergeClient](../index.md#vergeclient),
making `client.catalogRepositories` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/catalog-repository';
```

## Classes

### CatalogRepositoryService

Defined in: services/catalog-repository/service.ts:37

Service for managing VergeOS catalog repositories.

Catalog repositories are sources of recipes. They can be local,
remote, or provider-type. Refreshing a repository discovers and
imports catalogs and their recipes.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/catalog-repository';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all repositories
const repos = await client.catalogRepositories.list();

// Refresh a repository to discover new catalogs/recipes
await client.catalogRepositories.refresh(repos[0].$key);

// Create a new remote repository
await client.catalogRepositories.create({
  name: 'my-repo',
  url: 'https://recipes.example.com',
});
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`CatalogRepository`](../types.md#catalogrepository), [`CatalogRepositoryCreateParams`](../types.md#catalogrepositorycreateparams), [`CatalogRepositoryUpdateParams`](../types.md#catalogrepositoryupdateparams)\>

#### Constructors

##### Constructor

> **new CatalogRepositoryService**(`http`): [`CatalogRepositoryService`](#catalogrepositoryservice)

Defined in: services/catalog-repository/service.ts:42

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`CatalogRepositoryService`](#catalogrepositoryservice)

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

> **list**(`options?`): `Promise`\<[`CatalogRepository`](../types.md#catalogrepository)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`CatalogRepository`](../types.md#catalogrepository)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`CatalogRepository`](../types.md#catalogrepository)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`CatalogRepository`](../types.md#catalogrepository)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`CatalogRepository`](../types.md#catalogrepository)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`CatalogRepository`](../types.md#catalogrepository)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`CatalogRepository`](../types.md#catalogrepository)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`CatalogRepository`](../types.md#catalogrepository)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`CatalogRepository`](../types.md#catalogrepository)\>

Defined in: services/base.ts:293

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`CatalogRepositoryUpdateParams`](../types.md#catalogrepositoryupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`CatalogRepository`](../types.md#catalogrepository)\>

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

> **create**(`params`, `options?`): `Promise`\<[`CatalogRepository`](../types.md#catalogrepository)\>

Defined in: services/base.ts:395

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`CatalogRepositoryCreateParams`](../types.md#catalogrepositorycreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`CatalogRepository`](../types.md#catalogrepository)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### refresh()

> **refresh**(`key`): `Promise`\<`void`\>

Defined in: services/catalog-repository/service.ts:56

Refresh a catalog repository to discover new catalogs and recipes.

Dispatches the `refresh` action to the `catalog_repository_actions` endpoint.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The repository ID |

###### Returns

`Promise`\<`void`\>

## References

### CatalogMaxTier

Re-exports [CatalogMaxTier](../types.md#catalogmaxtier)

***

### CatalogRepository

Re-exports [CatalogRepository](../types.md#catalogrepository)

***

### CatalogRepositoryCreateParams

Re-exports [CatalogRepositoryCreateParams](../types.md#catalogrepositorycreateparams)

***

### CatalogRepositoryOverrideScope

Re-exports [CatalogRepositoryOverrideScope](../types.md#catalogrepositoryoverridescope)

***

### CatalogRepositoryType

Re-exports [CatalogRepositoryType](../types.md#catalogrepositorytype)

***

### CatalogRepositoryUpdateParams

Re-exports [CatalogRepositoryUpdateParams](../types.md#catalogrepositoryupdateparams)
