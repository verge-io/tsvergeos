[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/certificate

# services/certificate

Certificate service registration module.

Importing this module registers the [CertificateService](#certificateservice) on [VergeClient](../index.md#vergeclient),
making `client.certificates` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/certificate';
```

## Classes

### CertificateService

Defined in: services/certificate/service.ts:36

Service for managing VergeOS TLS certificates.

Provides full CRUD operations plus convenience methods for domain lookup,
key retrieval, renewal, and type/validity filtering.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/certificate';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all certificates
const certs = await client.certificates.list();

// Find a certificate by domain
const cert = await client.certificates.getByDomain('example.com');

// Renew a Let's Encrypt certificate
await client.certificates.renew(cert.$key);
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`Certificate`](../types.md#certificate), [`CertificateCreateParams`](../types.md#certificatecreateparams), [`CertificateUpdateParams`](../types.md#certificateupdateparams)\>

#### Constructors

##### Constructor

> **new CertificateService**(`http`): [`CertificateService`](#certificateservice)

Defined in: services/certificate/service.ts:41

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`CertificateService`](#certificateservice)

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

> **list**(`options?`): `Promise`\<[`Certificate`](../types.md#certificate)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`Certificate`](../types.md#certificate)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`Certificate`](../types.md#certificate)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`Certificate`](../types.md#certificate)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`Certificate`](../types.md#certificate)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`Certificate`](../types.md#certificate)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`Certificate`](../types.md#certificate)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`Certificate`](../types.md#certificate)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`Certificate`](../types.md#certificate)\>

Defined in: services/base.ts:293

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`CertificateUpdateParams`](../types.md#certificateupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`Certificate`](../types.md#certificate)\>

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

> **create**(`params`, `options?`): `Promise`\<[`Certificate`](../types.md#certificate)\>

Defined in: services/base.ts:395

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`CertificateCreateParams`](../types.md#certificatecreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`Certificate`](../types.md#certificate)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### getByDomain()

> **getByDomain**(`domain`): `Promise`\<[`Certificate`](../types.md#certificate)\>

Defined in: services/certificate/service.ts:52

Get a certificate by its primary domain.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `domain` | `string` | The domain to search for |

###### Returns

`Promise`\<[`Certificate`](../types.md#certificate)\>

The matching certificate

###### Throws

NotFoundError if no certificate with that domain exists

##### getWithKeys()

> **getWithKeys**(`key`): `Promise`\<[`Certificate`](../types.md#certificate)\>

Defined in: services/certificate/service.ts:73

Get a certificate including its public key, private key, and chain.

By default, the `public`, `private`, and `chain` fields are excluded
from API responses. This method explicitly requests them.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The certificate ID |

###### Returns

`Promise`\<[`Certificate`](../types.md#certificate)\>

The certificate with key material included

###### Throws

NotFoundError if the certificate does not exist

##### renew()

> **renew**(`key`): `Promise`\<[`Certificate`](../types.md#certificate)\>

Defined in: services/certificate/service.ts:95

Trigger renewal of a certificate (typically Let's Encrypt).

Sets `renew: true` on the certificate via update, which triggers
the VergeOS renewal process.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The certificate ID to renew |

###### Returns

`Promise`\<[`Certificate`](../types.md#certificate)\>

The updated certificate

##### listByType()

> **listByType**(`type`, `options?`): `Promise`\<[`Certificate`](../types.md#certificate)[]\>

Defined in: services/certificate/service.ts:106

List certificates of a specific type.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | [`CertificateType`](../types.md#certificatetype) | The certificate type to filter by |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Certificate`](../types.md#certificate)[]\>

Array of matching certificates

##### listValid()

> **listValid**(`options?`): `Promise`\<[`Certificate`](../types.md#certificate)[]\>

Defined in: services/certificate/service.ts:119

List all currently valid certificates.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Certificate`](../types.md#certificate)[]\>

Array of valid certificates

## References

### Certificate

Re-exports [Certificate](../types.md#certificate)

***

### CertificateCreateParams

Re-exports [CertificateCreateParams](../types.md#certificatecreateparams)

***

### CertificateKeyType

Re-exports [CertificateKeyType](../types.md#certificatekeytype)

***

### CertificateType

Re-exports [CertificateType](../types.md#certificatetype)

***

### CertificateUpdateParams

Re-exports [CertificateUpdateParams](../types.md#certificateupdateparams)
