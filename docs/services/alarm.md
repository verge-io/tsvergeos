[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/alarm

# services/alarm

Alarm service registration module.

Importing this module registers the [AlarmService](#alarmservice) on [VergeClient](../index.md#vergeclient),
making `client.alarms` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/alarm';
```

## Classes

### AlarmService

Defined in: [services/alarm/service.ts:36](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/alarm/service.ts#L36)

Service for managing VergeOS alarms.

Alarms are raised and lowered automatically by the platform's monitoring
system. They cannot be created via the API. This service supports listing,
getting, resolving, snoozing, and unsnoozing alarms.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/alarm';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all alarms
const alarms = await client.alarms.list();

// Resolve a resolvable alarm
await client.alarms.resolve(42);

// Snooze an alarm for 1 hour
await client.alarms.snooze(42, 3600);

// Unsnooze an alarm
await client.alarms.unsnooze(42);
```

#### Extends

- [`WritableService`](../index.md#writableservice)\<[`Alarm`](../types.md#alarm), [`AlarmUpdateParams`](../types.md#alarmupdateparams)\>

#### Constructors

##### Constructor

> **new AlarmService**(`http`): [`AlarmService`](#alarmservice)

Defined in: [services/alarm/service.ts:37](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/alarm/service.ts#L37)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`AlarmService`](#alarmservice)

###### Overrides

[`WritableService`](../index.md#writableservice).[`constructor`](../index.md#constructor-14)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`WritableService`](../index.md#writableservice).[`resource`](../index.md#property-resource-3) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`WritableService`](../index.md#writableservice).[`displayName`](../index.md#property-displayname-1) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`WritableService`](../index.md#writableservice).[`defaultFields`](../index.md#property-defaultfields-1) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L138) |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](../index.md#actionconfig) | Derived or overridden action endpoint configuration. | [`WritableService`](../index.md#writableservice).[`actionConfig`](../index.md#property-actionconfig) | [services/base.ts:256](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L256) |

#### Methods

##### resolve()

> **resolve**(`key`): `Promise`\<`void`\>

Defined in: [services/alarm/service.ts:49](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/alarm/service.ts#L49)

Resolve an alarm.

Uses the dedicated action pattern: `POST /alarm_actions`.
Only works on alarms where `resolvable` is `true`.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The alarm ID |

###### Returns

`Promise`\<`void`\>

##### snooze()

> **snooze**(`key`, `seconds?`, `options?`): `Promise`\<[`Alarm`](../types.md#alarm)\>

Defined in: [services/alarm/service.ts:64](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/alarm/service.ts#L64)

Snooze an alarm for a specified duration.

Sets the `snooze` field to `now + seconds`. Defaults to 24 hours
(86,400 seconds) if no duration is provided.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The alarm ID |
| `seconds?` | `number` | Snooze duration in seconds (default: 86400) |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options |

###### Returns

`Promise`\<[`Alarm`](../types.md#alarm)\>

The updated alarm

##### unsnooze()

> **unsnooze**(`key`, `options?`): `Promise`\<[`Alarm`](../types.md#alarm)\>

Defined in: [services/alarm/service.ts:77](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/alarm/service.ts#L77)

Unsnooze an alarm by setting the `snooze` field to 0.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The alarm ID |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options |

###### Returns

`Promise`\<[`Alarm`](../types.md#alarm)\>

The updated alarm

##### list()

> **list**(`options?`): `Promise`\<[`Alarm`](../types.md#alarm)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`Alarm`](../types.md#alarm)[]\>

Array of matching resources

###### Inherited from

[`WritableService`](../index.md#writableservice).[`list`](../index.md#list-1)

##### get()

> **get**(`key`): `Promise`\<[`Alarm`](../types.md#alarm)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`Alarm`](../types.md#alarm)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`WritableService`](../index.md#writableservice).[`get`](../index.md#get-2)

##### getByName()

> **getByName**(`name`): `Promise`\<[`Alarm`](../types.md#alarm)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`Alarm`](../types.md#alarm)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`WritableService`](../index.md#writableservice).[`getByName`](../index.md#getbyname-1)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`Alarm`](../types.md#alarm)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`Alarm`](../types.md#alarm)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`WritableService`](../index.md#writableservice).[`listAll`](../index.md#listall-1)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`Alarm`](../types.md#alarm)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`AlarmUpdateParams`](../types.md#alarmupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`Alarm`](../types.md#alarm)\>

The updated resource (or the resource with just `$key` if `readBack` is false)

###### Inherited from

[`WritableService`](../index.md#writableservice).[`update`](../index.md#update)

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

[`WritableService`](../index.md#writableservice).[`delete`](../index.md#delete)

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

[`WritableService`](../index.md#writableservice).[`inlineAction`](../index.md#inlineaction)

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

[`WritableService`](../index.md#writableservice).[`dispatchAction`](../index.md#dispatchaction)

## References

### Alarm

Re-exports [Alarm](../types.md#alarm)

***

### AlarmLevel

Re-exports [AlarmLevel](../types.md#alarmlevel)

***

### AlarmOwnerType

Re-exports [AlarmOwnerType](../types.md#alarmownertype)

***

### AlarmSubOwnerType

Re-exports [AlarmSubOwnerType](../types.md#alarmsubownertype)

***

### AlarmUpdateParams

Re-exports [AlarmUpdateParams](../types.md#alarmupdateparams)
