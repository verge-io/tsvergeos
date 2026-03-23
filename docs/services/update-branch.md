[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/update-branch

# services/update-branch

Update branch service registration module.

Importing this module registers the [UpdateBranchService](#updatebranchservice) on [VergeClient](../index.md#vergeclient),
making `client.updateBranches` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/update-branch';
```

## Classes

### UpdateBranchService

Defined in: [services/update-branch/service.ts:22](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/update-branch/service.ts#L22)

Service for querying VergeOS update branches.

Update branches are read-only release channels. The display field is
`description` rather than `name`.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/update-branch';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all update branches
const branches = await client.updateBranches.list();
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`UpdateBranch`](../types.md#updatebranch)\>

#### Constructors

##### Constructor

> **new UpdateBranchService**(`http`): [`UpdateBranchService`](#updatebranchservice)

Defined in: [services/update-branch/service.ts:23](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/update-branch/service.ts#L23)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`UpdateBranchService`](#updatebranchservice)

###### Overrides

[`ReadOnlyService`](../index.md#readonlyservice).[`constructor`](../index.md#constructor-13)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`resource`](../index.md#property-resource-2) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`displayName`](../index.md#property-displayname) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`ReadOnlyService`](../index.md#readonlyservice).[`defaultFields`](../index.md#property-defaultfields) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L138) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`UpdateBranch`](../types.md#updatebranch)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`UpdateBranch`](../types.md#updatebranch)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`UpdateBranch`](../types.md#updatebranch)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`UpdateBranch`](../types.md#updatebranch)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`UpdateBranch`](../types.md#updatebranch)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`UpdateBranch`](../types.md#updatebranch)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`UpdateBranch`](../types.md#updatebranch)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`UpdateBranch`](../types.md#updatebranch)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

## References

### UpdateBranch

Re-exports [UpdateBranch](../types.md#updatebranch)
