[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/tag-member

# services/tag-member

Tag member service registration module.

Importing this module registers the [TagMemberService](#tagmemberservice) on [VergeClient](../index.md#vergeclient),
making `client.tagMembers` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/tag-member';
```

## Classes

### TagMemberService

Defined in: [services/tag-member/service.ts:34](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tag-member/service.ts#L34)

Service for managing VergeOS tag members.

Tag members link tags to resources. Both fields (`tag` and `member`) are
read-only after creation, so this service does not expose `update()`.
To reassign, delete the tag member and create a new one.

Use the convenience methods [assign](#assign) and [unassign](#unassign) for
idiomatic tag operations.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/tag-member';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// Assign a tag to a VM
await client.tagMembers.assign(1, 'vms/42');

// List all resources tagged with tag 1
const members = await client.tagMembers.listByTag(1);

// Unassign (idempotent — no-op if not found)
await client.tagMembers.unassign(1, 'vms/42');
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`TagMember`](../types.md#tagmember), [`TagMemberCreateParams`](../types.md#tagmembercreateparams), `never`\>

#### Constructors

##### Constructor

> **new TagMemberService**(`http`): [`TagMemberService`](#tagmemberservice)

Defined in: [services/tag-member/service.ts:35](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tag-member/service.ts#L35)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`TagMemberService`](#tagmemberservice)

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

> **list**(`options?`): `Promise`\<[`TagMember`](../types.md#tagmember)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`TagMember`](../types.md#tagmember)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`TagMember`](../types.md#tagmember)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`TagMember`](../types.md#tagmember)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`TagMember`](../types.md#tagmember)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`TagMember`](../types.md#tagmember)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`TagMember`](../types.md#tagmember)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`TagMember`](../types.md#tagmember)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`TagMember`](../types.md#tagmember)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | `never` | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`TagMember`](../types.md#tagmember)\>

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

> **create**(`params`, `options?`): `Promise`\<[`TagMember`](../types.md#tagmember)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`TagMemberCreateParams`](../types.md#tagmembercreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`TagMember`](../types.md#tagmember)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### listByTag()

> **listByTag**(`tagKey`, `options?`): `Promise`\<[`TagMember`](../types.md#tagmember)[]\>

Defined in: [services/tag-member/service.ts:48](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tag-member/service.ts#L48)

List tag members for a specific tag.

Convenience method that filters by the `tag` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tagKey` | [`FlexKey`](../types.md#flexkey) | The tag ID to filter by |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`TagMember`](../types.md#tagmember)[]\>

Array of tag members for the specified tag

##### listByMember()

> **listByMember**(`member`, `options?`): `Promise`\<[`TagMember`](../types.md#tagmember)[]\>

Defined in: [services/tag-member/service.ts:69](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tag-member/service.ts#L69)

List tag members for a specific resource.

Convenience method that filters by the `member` field (polymorphic
reference in `"type/id"` format).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `member` | `string` | The resource reference to filter by, e.g. `"vms/123"` |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`TagMember`](../types.md#tagmember)[]\>

Array of tag members for the specified resource

##### assign()

> **assign**(`tagKey`, `member`): `Promise`\<[`TagMember`](../types.md#tagmember)\>

Defined in: [services/tag-member/service.ts:90](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tag-member/service.ts#L90)

Assign a tag to a resource.

Convenience wrapper around [create](#create) that accepts the tag key and
member reference directly.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tagKey` | [`FlexKey`](../types.md#flexkey) | The tag ID to assign |
| `member` | `string` | The resource reference in `"type/id"` format, e.g. `"vms/123"` |

###### Returns

`Promise`\<[`TagMember`](../types.md#tagmember)\>

The created tag member

##### unassign()

> **unassign**(`tagKey`, `member`): `Promise`\<`void`\>

Defined in: [services/tag-member/service.ts:103](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/tag-member/service.ts#L103)

Unassign a tag from a resource.

Looks up the tag member by tag + member filter, then deletes it.
No-op if the assignment does not exist.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tagKey` | [`FlexKey`](../types.md#flexkey) | The tag ID to unassign |
| `member` | `string` | The resource reference in `"type/id"` format, e.g. `"vms/123"` |

###### Returns

`Promise`\<`void`\>

## References

### TagMember

Re-exports [TagMember](../types.md#tagmember)

***

### TagMemberCreateParams

Re-exports [TagMemberCreateParams](../types.md#tagmembercreateparams)
