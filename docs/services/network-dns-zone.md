[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/network-dns-zone

# services/network-dns-zone

Network DNS Zone service registration module.

Importing this module registers the [NetworkDnsZoneService](#networkdnszoneservice) on [VergeClient](../index.md#vergeclient),
making `client.networkDnsZones` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/network-dns-zone';
```

## Classes

### NetworkDnsZoneService

Defined in: [services/network-dns-zone/service.ts:39](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network-dns-zone/service.ts#L39)

Service for managing VergeOS DNS zones.

DNS zones belong to a DNS view and represent a DNS domain (e.g., `example.com`).
Zones contain DNS records. The `view` field is set at creation and is read-only
afterward.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/network-dns-zone';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List zones in a DNS view
const zones = await client.networkDnsZones.listByView(1);

// Find a zone by domain name
const zone = await client.networkDnsZones.getByDomain(1, 'example.com');

// Create a master zone
const newZone = await client.networkDnsZones.create({
  view: 1,
  domain: 'example.com',
  type: 'master',
});
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`NetworkDnsZone`](../types.md#networkdnszone), [`NetworkDnsZoneCreateParams`](../types.md#networkdnszonecreateparams), [`NetworkDnsZoneUpdateParams`](../types.md#networkdnszoneupdateparams)\>

#### Constructors

##### Constructor

> **new NetworkDnsZoneService**(`http`): [`NetworkDnsZoneService`](#networkdnszoneservice)

Defined in: [services/network-dns-zone/service.ts:44](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network-dns-zone/service.ts#L44)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`NetworkDnsZoneService`](#networkdnszoneservice)

###### Overrides

[`BaseService`](../index.md#baseservice).[`constructor`](../index.md#constructor-15)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`BaseService`](../index.md#baseservice).[`resource`](../index.md#property-resource-4) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`BaseService`](../index.md#baseservice).[`displayName`](../index.md#property-displayname-2) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`BaseService`](../index.md#baseservice).[`defaultFields`](../index.md#property-defaultfields-2) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L138) |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](../index.md#actionconfig) | Derived or overridden action endpoint configuration. | [`BaseService`](../index.md#baseservice).[`actionConfig`](../index.md#property-actionconfig-1) | [services/base.ts:256](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L256) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`NetworkDnsZone`](../types.md#networkdnszone)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`NetworkDnsZone`](../types.md#networkdnszone)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`NetworkDnsZoneUpdateParams`](../types.md#networkdnszoneupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)\>

The updated resource (or the resource with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`update`](../index.md#update-1)

##### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [services/base.ts:309](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L309)

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

Defined in: [services/base.ts:330](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L330)

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

Defined in: [services/base.ts:356](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L356)

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

> **create**(`params`, `options?`): `Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`NetworkDnsZoneCreateParams`](../types.md#networkdnszonecreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### listByView()

> **listByView**(`viewKey`, `options?`): `Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)[]\>

Defined in: [services/network-dns-zone/service.ts:57](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network-dns-zone/service.ts#L57)

List DNS zones belonging to a specific view.

Convenience method that filters by the `view` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewKey` | [`FlexKey`](../types.md#flexkey) | The parent DNS view ID |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone)[]\>

Array of DNS zones for the specified view

##### getByDomain()

> **getByDomain**(`viewKey`, `domain`): `Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone) \| `undefined`\>

Defined in: [services/network-dns-zone/service.ts:78](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/network-dns-zone/service.ts#L78)

Find a DNS zone by domain name within a specific view.

The display field for zones is `domain`, not `name`, so the standard
`getByName` method does not apply. Use this method instead.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewKey` | [`FlexKey`](../types.md#flexkey) | The parent DNS view ID |
| `domain` | `string` | The domain name to search for |

###### Returns

`Promise`\<[`NetworkDnsZone`](../types.md#networkdnszone) \| `undefined`\>

The matching zone, or `undefined` if not found

## References

### DnsZoneNotify

Re-exports [DnsZoneNotify](../types.md#dnszonenotify)

***

### DnsZoneType

Re-exports [DnsZoneType](../types.md#dnszonetype)

***

### NetworkDnsZone

Re-exports [NetworkDnsZone](../types.md#networkdnszone)

***

### NetworkDnsZoneCreateParams

Re-exports [NetworkDnsZoneCreateParams](../types.md#networkdnszonecreateparams)

***

### NetworkDnsZoneUpdateParams

Re-exports [NetworkDnsZoneUpdateParams](../types.md#networkdnszoneupdateparams)
