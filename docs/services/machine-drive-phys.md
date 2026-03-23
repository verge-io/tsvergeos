[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/machine-drive-phys

# services/machine-drive-phys

Machine Drive Phys service registration module.

Importing this module registers the [MachineDrivePhysService](#machinedrivephysservice) on [VergeClient](../index.md#vergeclient),
making `client.machineDrivePhys` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/machine-drive-phys';
```

## Classes

### MachineDrivePhysService

Defined in: [services/machine-drive-phys/service.ts:24](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-drive-phys/service.ts#L24)

Service for querying VergeOS physical drive information.

Provides hardware details for physical drives including SMART data,
temperature, wear level, vSAN status, and partition layout. This is a
**read-only** service — phys entries are managed by the system and
cannot be created, updated, or deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/machine-drive-phys';

// Get physical info for a specific drive
const phys = await client.machineDrivePhys.getByDrive(5);
console.log(`Model: ${phys.model}, Temp: ${phys.temp}°C`);
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`MachineDrivePhys`](../types.md#machinedrivephys)\>

#### Constructors

##### Constructor

> **new MachineDrivePhysService**(`http`): [`MachineDrivePhysService`](#machinedrivephysservice)

Defined in: [services/machine-drive-phys/service.ts:25](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-drive-phys/service.ts#L25)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`MachineDrivePhysService`](#machinedrivephysservice)

###### Overrides

[`ReadOnlyService`](../index.md#readonlyservice).[`constructor`](../index.md#constructor-13)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`resource`](../index.md#property-resource-2) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`displayName`](../index.md#property-displayname) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`ReadOnlyService`](../index.md#readonlyservice).[`defaultFields`](../index.md#property-defaultfields) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L138) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`MachineDrivePhys`](../types.md#machinedrivephys)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`MachineDrivePhys`](../types.md#machinedrivephys)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`MachineDrivePhys`](../types.md#machinedrivephys)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`MachineDrivePhys`](../types.md#machinedrivephys)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`MachineDrivePhys`](../types.md#machinedrivephys)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`MachineDrivePhys`](../types.md#machinedrivephys)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`MachineDrivePhys`](../types.md#machinedrivephys)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`MachineDrivePhys`](../types.md#machinedrivephys)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### getByDrive()

> **getByDrive**(`driveKey`): `Promise`\<[`MachineDrivePhys`](../types.md#machinedrivephys)\>

Defined in: [services/machine-drive-phys/service.ts:39](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/machine-drive-phys/service.ts#L39)

Get physical drive info for a specific machine drive.

Filters by `parent_drive eq {driveKey}` and returns the first matching result.
Throws [NotFoundError](../index.md#notfounderror) if no phys entry exists for the given drive.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveKey` | [`FlexKey`](../types.md#flexkey) | The key of the machine drive to look up physical info for. |

###### Returns

`Promise`\<[`MachineDrivePhys`](../types.md#machinedrivephys)\>

The machine drive phys resource.

###### Throws

NotFoundError If no phys entry exists for the specified drive.

## References

### LocateStatus

Re-exports [LocateStatus](../types.md#locatestatus)

***

### MachineDrivePhys

Re-exports [MachineDrivePhys](../types.md#machinedrivephys)
