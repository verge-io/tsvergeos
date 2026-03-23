[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/api-key

# services/api-key

API Key service registration module.

Importing this module registers the [APIKeyService](#apikeyservice) on [VergeClient](../index.md#vergeclient),
making `client.apiKeys` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/api-key';
```

## Classes

### APIKeyService

Defined in: [services/api-key/service.ts:46](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/api-key/service.ts#L46)

Service for managing VergeOS user API keys.

Provides CRUD operations for API keys with a custom [create](#create) method
that captures the one-time token returned only at creation time.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/api-key';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// Create an API key (token is only available at creation)
const { apiKey, token } = await client.apiKeys.create({ user: 1, name: 'my-key' });
console.log('Save this token:', token);

// List API keys for a user
const keys = await client.apiKeys.listByUser(1);
```

#### Extends

- [`WritableService`](../index.md#writableservice)\<[`UserAPIKey`](../types.md#userapikey), [`UserAPIKeyUpdateParams`](../types.md#userapikeyupdateparams)\>

#### Constructors

##### Constructor

> **new APIKeyService**(`http`): [`APIKeyService`](#apikeyservice)

Defined in: [services/api-key/service.ts:47](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/api-key/service.ts#L47)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`APIKeyService`](#apikeyservice)

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

##### create()

> **create**(`params`, `options?`): `Promise`\<[`UserAPIKeyCreateResult`](../types.md#userapikeycreateresult)\>

Defined in: [services/api-key/service.ts:62](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/api-key/service.ts#L62)

Create a new API key and capture the one-time token.

The VergeOS API returns the token only at creation time — it cannot
be retrieved later. This method returns both the created resource
and the token.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`UserAPIKeyCreateParams`](../types.md#userapikeycreateparams) | The API key creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`UserAPIKeyCreateResult`](../types.md#userapikeycreateresult)\>

The created API key resource and the one-time token

##### listByUser()

> **listByUser**(`userKey`): `Promise`\<[`UserAPIKey`](../types.md#userapikey)[]\>

Defined in: [services/api-key/service.ts:87](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/api-key/service.ts#L87)

List API keys for a specific user.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `userKey` | [`FlexKey`](../types.md#flexkey) | The user ID to filter by |

###### Returns

`Promise`\<[`UserAPIKey`](../types.md#userapikey)[]\>

Array of API keys for the specified user

##### getByUserAndName()

> **getByUserAndName**(`userKey`, `name`): `Promise`\<[`UserAPIKey`](../types.md#userapikey)\>

Defined in: [services/api-key/service.ts:102](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/api-key/service.ts#L102)

Get an API key by name within a specific user's keys.

Uses a compound filter on `user` and `name` to find the key.
Unlike the base `getByName()`, this scopes the search to a specific user.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `userKey` | [`FlexKey`](../types.md#flexkey) | The user ID to search within |
| `name` | `string` | The API key name to search for |

###### Returns

`Promise`\<[`UserAPIKey`](../types.md#userapikey)\>

The matching API key

###### Throws

NotFoundError if no API key with that name exists for the user

##### list()

> **list**(`options?`): `Promise`\<[`UserAPIKey`](../types.md#userapikey)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`UserAPIKey`](../types.md#userapikey)[]\>

Array of matching resources

###### Inherited from

[`WritableService`](../index.md#writableservice).[`list`](../index.md#list-1)

##### get()

> **get**(`key`): `Promise`\<[`UserAPIKey`](../types.md#userapikey)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`UserAPIKey`](../types.md#userapikey)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`WritableService`](../index.md#writableservice).[`get`](../index.md#get-2)

##### getByName()

> **getByName**(`name`): `Promise`\<[`UserAPIKey`](../types.md#userapikey)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`UserAPIKey`](../types.md#userapikey)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`WritableService`](../index.md#writableservice).[`getByName`](../index.md#getbyname-1)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`UserAPIKey`](../types.md#userapikey)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`UserAPIKey`](../types.md#userapikey)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`WritableService`](../index.md#writableservice).[`listAll`](../index.md#listall-1)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`UserAPIKey`](../types.md#userapikey)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`UserAPIKeyUpdateParams`](../types.md#userapikeyupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`UserAPIKey`](../types.md#userapikey)\>

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

### ApiKeyExpiresType

Re-exports [ApiKeyExpiresType](../types.md#apikeyexpirestype)

***

### UserAPIKey

Re-exports [UserAPIKey](../types.md#userapikey)

***

### UserAPIKeyCreateParams

Re-exports [UserAPIKeyCreateParams](../types.md#userapikeycreateparams)

***

### UserAPIKeyCreateResult

Re-exports [UserAPIKeyCreateResult](../types.md#userapikeycreateresult)

***

### UserAPIKeyUpdateParams

Re-exports [UserAPIKeyUpdateParams](../types.md#userapikeyupdateparams)
