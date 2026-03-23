[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/webhook

# services/webhook

Webhook service registration module.

Importing this module registers the [WebhookService](#webhookservice) on [VergeClient](../index.md#vergeclient),
making `client.webhooks` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/webhook';
```

## Classes

### WebhookService

Defined in: [services/webhook/service.ts:36](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/webhook/service.ts#L36)

Service for querying VergeOS webhook delivery logs.

Webhooks are delivery records created automatically by the system.
They cannot be created or updated via the API — only listed, retrieved,
or deleted. Entries auto-expire after 70 days, with a maximum of 3,000
rows per account.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/webhook';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all webhook deliveries
const deliveries = await client.webhooks.list();

// List failed deliveries
const failed = await client.webhooks.listFailed();

// List deliveries for a specific webhook URL
const byUrl = await client.webhooks.listByWebhookURL(1);

// Delete a delivery record
await client.webhooks.delete(42);
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`Webhook`](../types.md#webhook)\>

#### Constructors

##### Constructor

> **new WebhookService**(`http`): [`WebhookService`](#webhookservice)

Defined in: [services/webhook/service.ts:37](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/webhook/service.ts#L37)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`WebhookService`](#webhookservice)

###### Overrides

[`ReadOnlyService`](../index.md#readonlyservice).[`constructor`](../index.md#constructor-13)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`resource`](../index.md#property-resource-2) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`displayName`](../index.md#property-displayname) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`ReadOnlyService`](../index.md#readonlyservice).[`defaultFields`](../index.md#property-defaultfields) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L138) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`Webhook`](../types.md#webhook)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`Webhook`](../types.md#webhook)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`Webhook`](../types.md#webhook)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`Webhook`](../types.md#webhook)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`Webhook`](../types.md#webhook)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`Webhook`](../types.md#webhook)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`Webhook`](../types.md#webhook)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`Webhook`](../types.md#webhook)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [services/webhook/service.ts:47](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/webhook/service.ts#L47)

Delete a webhook delivery record.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The webhook delivery ID |

###### Returns

`Promise`\<`void`\>

###### Throws

NotFoundError if the record does not exist

##### listByWebhookURL()

> **listByWebhookURL**(`webhookURLKey`, `options?`): `Promise`\<[`Webhook`](../types.md#webhook)[]\>

Defined in: [services/webhook/service.ts:65](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/webhook/service.ts#L65)

List webhook deliveries for a specific webhook URL.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `webhookURLKey` | [`FlexKey`](../types.md#flexkey) | The webhook URL ID to filter by |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Webhook`](../types.md#webhook)[]\>

Array of matching delivery records

##### listByStatus()

> **listByStatus**(`status`, `options?`): `Promise`\<[`Webhook`](../types.md#webhook)[]\>

Defined in: [services/webhook/service.ts:79](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/webhook/service.ts#L79)

List webhook deliveries with a specific status.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | [`WebhookStatus`](../types.md#webhookstatus) | The delivery status to filter by |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Webhook`](../types.md#webhook)[]\>

Array of matching delivery records

##### listPending()

> **listPending**(`options?`): `Promise`\<[`Webhook`](../types.md#webhook)[]\>

Defined in: [services/webhook/service.ts:92](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/webhook/service.ts#L92)

List webhook deliveries that are pending (queued or running).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Webhook`](../types.md#webhook)[]\>

Array of pending delivery records

##### listFailed()

> **listFailed**(`options?`): `Promise`\<[`Webhook`](../types.md#webhook)[]\>

Defined in: [services/webhook/service.ts:105](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/webhook/service.ts#L105)

List webhook deliveries that failed.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options |

###### Returns

`Promise`\<[`Webhook`](../types.md#webhook)[]\>

Array of failed delivery records

## References

### Webhook

Re-exports [Webhook](../types.md#webhook)

***

### WebhookStatus

Re-exports [WebhookStatus](../types.md#webhookstatus)
