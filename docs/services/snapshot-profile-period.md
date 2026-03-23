[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/snapshot-profile-period

# services/snapshot-profile-period

Snapshot profile period service registration module.

Importing this module registers the [SnapshotProfilePeriodService](#snapshotprofileperiodservice) on
[VergeClient](../index.md#vergeclient), making `client.snapshotProfilePeriods` available.
This is a side-effect import:

```typescript
import 'tsvergeos/services/snapshot-profile-period';
```

## Classes

### SnapshotProfilePeriodService

Defined in: [services/snapshot-profile-period/service.ts:36](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/snapshot-profile-period/service.ts#L36)

Service for managing VergeOS snapshot profile periods.

Periods define the schedule within a snapshot profile — frequency, retention
count, and time window. A profile can have multiple periods (e.g., hourly
with 24 retained + daily with 7 retained).

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/snapshot-profile-period';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List periods for a specific profile
const periods = await client.snapshotProfilePeriods.listByProfile(1);

// Create a new daily period with 7-day retention
const period = await client.snapshotProfilePeriods.create({
  profile: 1,
  name: 'Daily',
  frequency: 'daily',
  retention: 604800, // 7 days in seconds
});
```

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod), [`SnapshotProfilePeriodCreateParams`](../types.md#snapshotprofileperiodcreateparams), [`SnapshotProfilePeriodUpdateParams`](../types.md#snapshotprofileperiodupdateparams)\>

#### Constructors

##### Constructor

> **new SnapshotProfilePeriodService**(`http`): [`SnapshotProfilePeriodService`](#snapshotprofileperiodservice)

Defined in: [services/snapshot-profile-period/service.ts:41](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/snapshot-profile-period/service.ts#L41)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`SnapshotProfilePeriodService`](#snapshotprofileperiodservice)

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

> **list**(`options?`): `Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`SnapshotProfilePeriodUpdateParams`](../types.md#snapshotprofileperiodupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)\>

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

> **create**(`params`, `options?`): `Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`SnapshotProfilePeriodCreateParams`](../types.md#snapshotprofileperiodcreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### listByProfile()

> **listByProfile**(`profileKey`, `options?`): `Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)[]\>

Defined in: [services/snapshot-profile-period/service.ts:54](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/snapshot-profile-period/service.ts#L54)

List periods belonging to a specific snapshot profile.

Convenience method that filters by the `profile` foreign key.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `profileKey` | [`FlexKey`](../types.md#flexkey) | The parent snapshot profile ID |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`SnapshotProfilePeriod`](../types.md#snapshotprofileperiod)[]\>

Array of periods for the specified profile

## References

### PeriodDayOfWeek

Re-exports [PeriodDayOfWeek](../types.md#perioddayofweek)

***

### PeriodFrequency

Re-exports [PeriodFrequency](../types.md#periodfrequency)

***

### PeriodMaxTier

Re-exports [PeriodMaxTier](../types.md#periodmaxtier)

***

### SnapshotProfilePeriod

Re-exports [SnapshotProfilePeriod](../types.md#snapshotprofileperiod)

***

### SnapshotProfilePeriodCreateParams

Re-exports [SnapshotProfilePeriodCreateParams](../types.md#snapshotprofileperiodcreateparams)

***

### SnapshotProfilePeriodUpdateParams

Re-exports [SnapshotProfilePeriodUpdateParams](../types.md#snapshotprofileperiodupdateparams)
