[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/file

# services/file

File service registration module.

Importing this module registers the [FileService](#fileservice) on [VergeClient](../index.md#vergeclient),
making `client.files` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/file';
```

## Classes

### FileService

Defined in: [services/file/service.ts:43](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/file/service.ts#L43)

Service for managing files in VergeOS.

Provides standard CRUD for file metadata, plus upload and download
methods for file content. Uses `VgFile` (not `File`) to avoid
collision with the global `File` type.

**Upload workflow** (two-step):
1. Create the file entry with [create](#create) (sets name, allocated_bytes, etc.)
2. Upload content with [upload](#upload) (sends binary data in chunks)

**Download**: Use [download](#download) to get a raw `Response` for streaming.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/file';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// Create file entry and upload
const file = await client.files.create({
  name: 'my-image.iso',
  allocated_bytes: data.byteLength,
  type: 'iso',
});
await client.files.upload(file.$key, data, data.byteLength);

// Download a file
const response = await client.files.download(file.$key);
const blob = await response.blob();
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`VgFile`](../types.md#vgfile), [`VgFileCreateParams`](../types.md#vgfilecreateparams), [`VgFileUpdateParams`](../types.md#vgfileupdateparams)\>

#### Constructors

##### Constructor

> **new FileService**(`http`): [`FileService`](#fileservice)

Defined in: [services/file/service.ts:44](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/file/service.ts#L44)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`FileService`](#fileservice)

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

> **list**(`options?`): `Promise`\<[`VgFile`](../types.md#vgfile)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`VgFile`](../types.md#vgfile)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`VgFile`](../types.md#vgfile)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`VgFile`](../types.md#vgfile)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`VgFile`](../types.md#vgfile)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`VgFile`](../types.md#vgfile)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`VgFile`](../types.md#vgfile)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`VgFile`](../types.md#vgfile)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`VgFile`](../types.md#vgfile)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`VgFileUpdateParams`](../types.md#vgfileupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`VgFile`](../types.md#vgfile)\>

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

> **create**(`params`, `options?`): `Promise`\<[`VgFile`](../types.md#vgfile)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`VgFileCreateParams`](../types.md#vgfilecreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`VgFile`](../types.md#vgfile)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### upload()

> **upload**(`key`, `data`, `size`, `options?`): `Promise`\<`void`\>

Defined in: [services/file/service.ts:61](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/file/service.ts#L61)

Upload file content to a previously created file entry.

Sends the data in chunks using sequential PUT requests with
`?filepos={offset}` and `application/octet-stream` content type.
Each chunk uses `Connection: close` as VergeOS closes connections
between chunks.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The file ID (from [create](#create)) |
| `data` | `Uint8Array`\<`ArrayBufferLike`\> \| `ReadableStream`\<`Uint8Array`\<`ArrayBufferLike`\>\> | File content as `Uint8Array` or `ReadableStream<Uint8Array>` |
| `size` | `number` | Total file size in bytes |
| `options?` | [`FileUploadOptions`](../types.md#fileuploadoptions) | Upload options (chunk size) |

###### Returns

`Promise`\<`void`\>

##### download()

> **download**(`key`): `Promise`\<`Response`\>

Defined in: [services/file/service.ts:86](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/file/service.ts#L86)

Download a file's content from VergeOS.

Returns the raw `Response` object. The caller is responsible for
reading the body (e.g., `response.arrayBuffer()`, `response.blob()`,
or streaming via `response.body`).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The file ID to download |

###### Returns

`Promise`\<`Response`\>

Raw `Response` with file content

##### listISOs()

> **listISOs**(): `Promise`\<[`VgFile`](../types.md#vgfile)[]\>

Defined in: [services/file/service.ts:97](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/file/service.ts#L97)

List ISO files. Convenience method that filters by `type eq 'iso'`.

###### Returns

`Promise`\<[`VgFile`](../types.md#vgfile)[]\>

Array of ISO file resources

##### overwrite()

> **overwrite**(`key`): `Promise`\<`void`\>

Defined in: [services/file/service.ts:106](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/file/service.ts#L106)

Overwrite an existing file's content.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The file ID |

###### Returns

`Promise`\<`void`\>

##### addLink()

> **addLink**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/file/service.ts:116](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/file/service.ts#L116)

Add a link to a file.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The file ID |
| `params?` | `Record`\<`string`, `unknown`\> | Link parameters |

###### Returns

`Promise`\<`void`\>

##### deleteLink()

> **deleteLink**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/file/service.ts:126](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/file/service.ts#L126)

Delete a link from a file.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The file ID |
| `params?` | `Record`\<`string`, `unknown`\> | Link parameters |

###### Returns

`Promise`\<`void`\>

##### deleteReference()

> **deleteReference**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/file/service.ts:136](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/file/service.ts#L136)

Delete a reference from a file.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The file ID |
| `params?` | `Record`\<`string`, `unknown`\> | Reference parameters |

###### Returns

`Promise`\<`void`\>

##### makeISO()

> **makeISO**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/file/service.ts:146](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/file/service.ts#L146)

Create an ISO image from files.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The file ID |
| `params?` | `Record`\<`string`, `unknown`\> | ISO creation parameters |

###### Returns

`Promise`\<`void`\>

## Variables

### DEFAULT\_CHUNK\_SIZE

> `const` **DEFAULT\_CHUNK\_SIZE**: `262144` = `262_144`

Defined in: [services/file/service.ts:8](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/file/service.ts#L8)

Default chunk size for file uploads (256KB). Matches verge-cli and other SDKs.

## References

### FilePreferredTier

Re-exports [FilePreferredTier](../types.md#filepreferredtier)

***

### FileUploadOptions

Re-exports [FileUploadOptions](../types.md#fileuploadoptions)

***

### VgFile

Re-exports [VgFile](../types.md#vgfile)

***

### VgFileCreateParams

Re-exports [VgFileCreateParams](../types.md#vgfilecreateparams)

***

### VgFileType

Re-exports [VgFileType](../types.md#vgfiletype)

***

### VgFileUpdateParams

Re-exports [VgFileUpdateParams](../types.md#vgfileupdateparams)
