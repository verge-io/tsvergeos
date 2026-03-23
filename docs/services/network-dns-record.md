[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/network-dns-record

# services/network-dns-record

Network DNS Record service registration module.

Importing this module registers the [NetworkDnsRecordService](#networkdnsrecordservice) on [VergeClient](../index.md#vergeclient),
making `client.networkDnsRecords` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/network-dns-record';
```

## Classes

### NetworkDnsRecordService

Defined in: [services/network-dns-record/service.ts:44](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-dns-record/service.ts#L44)

Service for managing VergeOS DNS zone records.

DNS records belong to a DNS zone and represent individual DNS entries
(A, CNAME, MX, etc.). The `zone` field is set at creation and is read-only
afterward.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/network-dns-record';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all records in a zone
const records = await client.networkDnsRecords.listByZone(1);

// List only A records in a zone
const aRecords = await client.networkDnsRecords.listByType(1, 'A');

// Find a specific record by host and type
const record = await client.networkDnsRecords.getByHostAndType(1, 'www', 'A');

// Create an A record
const newRecord = await client.networkDnsRecords.create({
  zone: 1,
  host: 'www',
  type: 'A',
  value: '192.168.1.100',
});
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`NetworkDnsRecord`](../types.md#networkdnsrecord), [`NetworkDnsRecordCreateParams`](../types.md#networkdnsrecordcreateparams), [`NetworkDnsRecordUpdateParams`](../types.md#networkdnsrecordupdateparams)\>

#### Constructors

##### Constructor

> **new NetworkDnsRecordService**(`http`): [`NetworkDnsRecordService`](#networkdnsrecordservice)

Defined in: [services/network-dns-record/service.ts:49](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-dns-record/service.ts#L49)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`NetworkDnsRecordService`](#networkdnsrecordservice)

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

> **list**(`options?`): `Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`NetworkDnsRecordUpdateParams`](../types.md#networkdnsrecordupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)\>

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

> **create**(`params`, `options?`): `Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`NetworkDnsRecordCreateParams`](../types.md#networkdnsrecordcreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### listByZone()

> **listByZone**(`zoneKey`, `options?`): `Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)[]\>

Defined in: [services/network-dns-record/service.ts:62](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-dns-record/service.ts#L62)

List DNS records belonging to a specific zone.

Convenience method that filters by the `zone` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `zoneKey` | [`FlexKey`](../types.md#flexkey) | The parent DNS zone ID |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)[]\>

Array of DNS records for the specified zone

##### listByType()

> **listByType**(`zoneKey`, `recordType`, `options?`): `Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)[]\>

Defined in: [services/network-dns-record/service.ts:83](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-dns-record/service.ts#L83)

List DNS records of a specific type belonging to a zone.

Convenience method that filters by both `zone` and `type`.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `zoneKey` | [`FlexKey`](../types.md#flexkey) | The parent DNS zone ID |
| `recordType` | [`DnsRecordType`](../types.md#dnsrecordtype) | The DNS record type to filter by (A, CNAME, MX, etc.) |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord)[]\>

Array of DNS records matching the type for the specified zone

##### getByHostAndType()

> **getByHostAndType**(`zoneKey`, `host`, `recordType`): `Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord) \| `undefined`\>

Defined in: [services/network-dns-record/service.ts:107](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/network-dns-record/service.ts#L107)

Find a DNS record by host name and type within a specific zone.

The display field for records is `host`, not `name`, and multiple records
can share a host. This method filters by both `host` and `type` to find
a specific record.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `zoneKey` | [`FlexKey`](../types.md#flexkey) | The parent DNS zone ID |
| `host` | `string` | The hostname or subdomain to search for |
| `recordType` | [`DnsRecordType`](../types.md#dnsrecordtype) | The DNS record type (A, CNAME, MX, etc.) |

###### Returns

`Promise`\<[`NetworkDnsRecord`](../types.md#networkdnsrecord) \| `undefined`\>

The matching record, or `undefined` if not found

## References

### DnsRecordType

Re-exports [DnsRecordType](../types.md#dnsrecordtype)

***

### NetworkDnsRecord

Re-exports [NetworkDnsRecord](../types.md#networkdnsrecord)

***

### NetworkDnsRecordCreateParams

Re-exports [NetworkDnsRecordCreateParams](../types.md#networkdnsrecordcreateparams)

***

### NetworkDnsRecordUpdateParams

Re-exports [NetworkDnsRecordUpdateParams](../types.md#networkdnsrecordupdateparams)
