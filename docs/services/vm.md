[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/vm

# services/vm

VM service registration module.

Importing this module registers the [VMService](#vmservice) on [VergeClient](../index.md#vergeclient),
making `client.vms` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/vm';
```

## Classes

### VMService

Defined in: [services/vm/service.ts:93](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L93)

Full CRUD service base class that adds resource creation.

This is the most commonly extended base class. Use it for any resource
that supports create, read, update, delete, and actions.

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`VM`](../types.md#vm), [`VMCreateParams`](../types.md#vmcreateparams), [`VMUpdateParams`](../types.md#vmupdateparams)\>

#### Constructors

##### Constructor

> **new VMService**(`http`): [`VMService`](#vmservice)

Defined in: [services/vm/service.ts:94](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L94)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`VMService`](#vmservice)

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

> **list**(`options?`): `Promise`\<[`VM`](../types.md#vm)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`VM`](../types.md#vm)[]\>

Array of matching resources

###### Inherited from

[`BaseService`](../index.md#baseservice).[`list`](../index.md#list-2)

##### get()

> **get**(`key`): `Promise`\<[`VM`](../types.md#vm)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`VM`](../types.md#vm)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`BaseService`](../index.md#baseservice).[`get`](../index.md#get-3)

##### getByName()

> **getByName**(`name`): `Promise`\<[`VM`](../types.md#vm)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`VM`](../types.md#vm)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`BaseService`](../index.md#baseservice).[`getByName`](../index.md#getbyname-2)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`VM`](../types.md#vm)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`VM`](../types.md#vm)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`BaseService`](../index.md#baseservice).[`listAll`](../index.md#listall-2)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`VM`](../types.md#vm)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`VMUpdateParams`](../types.md#vmupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`VM`](../types.md#vm)\>

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

> **create**(`params`, `options?`): `Promise`\<[`VM`](../types.md#vm)\>

Defined in: [services/base.ts:395](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/base.ts#L395)

Create a new resource.

Sends a POST request, extracts the `$key` from the response, and
optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`VMCreateParams`](../types.md#vmcreateparams) | The resource creation parameters |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`VM`](../types.md#vm)\>

The created resource (or a partial with just `$key` if `readBack` is false)

###### Inherited from

[`BaseService`](../index.md#baseservice).[`create`](../index.md#create)

##### powerOn()

> **powerOn**(`key`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:104](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L104)

Power on a virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### powerOff()

> **powerOff**(`key`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:115](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L115)

Gracefully power off a virtual machine via ACPI shutdown signal.

Sends an ACPI shutdown signal at the hardware level.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### kill()

> **kill**(`key`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:126](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L126)

Force power off a virtual machine (like pulling the plug).

Use [powerOff](#poweroff) for a graceful ACPI shutdown instead.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### reset()

> **reset**(`key`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:137](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L137)

Hard reset a virtual machine (equivalent to pressing the reset button).

For a graceful ACPI reboot, use [gracefulReboot](#gracefulreboot) instead.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### gracefulReboot()

> **gracefulReboot**(`key`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:149](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L149)

Gracefully reboot a virtual machine via ACPI.

Sends an ACPI reboot signal. For a hard reset (like pressing the
reset button), use [reset](#reset) instead.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### hibernate()

> **hibernate**(`key`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:160](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L160)

Hibernate a virtual machine via ACPI.

The guest OS must support ACPI hibernate.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### migrate()

> **migrate**(`key`, `options`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:172](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L172)

Migrate a virtual machine to another node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options` | [`VMMigrateOptions`](../types.md#vmmigrateoptions) | Migration options. Pass `preferred_node` to target a specific node, or `preferred_node: null` to auto-select the node with the least RAM usage. |

###### Returns

`Promise`\<`void`\>

##### clone()

> **clone**(`key`, `options?`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:186](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L186)

Clone a virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID to clone |
| `options?` | [`VMCloneOptions`](../types.md#vmcloneoptions) | Clone options (name, preserve_macs) |

###### Returns

`Promise`\<`void`\>

##### snapshot()

> **snapshot**(`key`, `options?`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:200](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L200)

Create a quiesced snapshot of a virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID to snapshot |
| `options?` | [`VMSnapshotOptions`](../types.md#vmsnapshotoptions) | Snapshot options (name, quiesce) |

###### Returns

`Promise`\<`void`\>

##### changeCD()

> **changeCD**(`key`, `options?`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:214](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L214)

Change the CD/ISO attached to a virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | `Record`\<`string`, `unknown`\> | Optional parameters for the CD change |

###### Returns

`Promise`\<`void`\>

##### changeNet()

> **changeNet**(`key`, `options?`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:227](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L227)

Change the network attached to a virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | `Record`\<`string`, `unknown`\> | Optional parameters for the network change |

###### Returns

`Promise`\<`void`\>

##### paste()

> **paste**(`key`, `options?`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:240](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L240)

Paste text to a virtual machine's console.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMPasteOptions`](#vmpasteoptions) | Paste options including the text to paste |

###### Returns

`Promise`\<`void`\>

##### restore()

> **restore**(`key`, `options?`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:254](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L254)

Restore a virtual machine from a snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMRestoreOptions`](#vmrestoreoptions) | Restore options (snapshot reference, preserve_macs, name) |

###### Returns

`Promise`\<`void`\>

##### recoverCloudSnapshot()

> **recoverCloudSnapshot**(`key`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:267](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L267)

Recover a virtual machine from a cloud or system snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### hotplugDrive()

> **hotplugDrive**(`key`, `options?`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:277](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L277)

Hot-plug a drive to a running virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMHotplugDriveOptions`](#vmhotplugdriveoptions) | Drive options (name, disksize, interface, media, preferred_tier) |

###### Returns

`Promise`\<`void`\>

##### hotplugNic()

> **hotplugNic**(`key`, `options?`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:294](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L294)

Hot-plug a NIC to a running virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMHotplugNicOptions`](#vmhotplugnicoptions) | NIC options (name, vnet, interface) |

###### Returns

`Promise`\<`void`\>

##### execute()

> **execute**(`key`, `options?`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:310](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L310)

Execute a command on a virtual machine.

Requires the QEMU guest agent to be running inside the VM.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMExecuteOptions`](#vmexecuteoptions) | Command execution options |

###### Returns

`Promise`\<`void`\>

##### fsyncStrict()

> **fsyncStrict**(`key`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:323](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L323)

Perform a strict filesystem sync on a virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### eraseDrive()

> **eraseDrive**(`key`, `options?`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:333](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L333)

Erase a drive on a virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMEraseDriveOptions`](#vmerasedriveoptions) | Options specifying which drive to erase |

###### Returns

`Promise`\<`void`\>

##### refresh()

> **refresh**(`key`): `Promise`\<`void`\>

Defined in: [services/vm/service.ts:346](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L346)

Refresh a virtual machine's state.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### getConsoleInfo()

> **getConsoleInfo**(`key`, `auth`): `Promise`\<[`VMConsoleInfo`](../types.md#vmconsoleinfo)\>

Defined in: [services/vm/service.ts:404](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L404)

Get console connection details for a virtual machine.

Fetches the console type, host, port, and a ready-to-use WebSocket URL
for establishing a direct console connection from a custom frontend.

Three authentication methods are supported:

- `{ username, password }` — exchanged for a session token via
  `POST /api/sys/tokens`. The token is embedded in the WebSocket URL
  as `?token=`. Works in all environments including browsers.
- `{ token }` — a pre-existing session token (e.g., from OIDC).
  Embedded in the WebSocket URL as `?token=`.
- `{ apiKey }` — a VergeOS API key. The console endpoint accepts
  `Authorization: Bearer <apiKey>` directly. The WebSocket URL is
  returned **without** an embedded token — the caller must set the
  `Authorization` header during the WebSocket handshake.

Check `authMethod` on the result to determine how to connect:
- `'token'` — `websocketUrl` is ready to use as-is
- `'bearer'` — set `Authorization: Bearer <apiKey>` header on the WebSocket

**Browser limitation:** The browser `WebSocket` API does not support
custom headers. Use `{ username, password }` or `{ token }` for
browser-based consoles.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `auth` | [`ConsoleAuth`](../types.md#consoleauth) | Authentication credentials (username/password, token, or API key) |

###### Returns

`Promise`\<[`VMConsoleInfo`](../types.md#vmconsoleinfo)\>

Console connection info including WebSocket URL and auth method

###### Throws

AuthError if username/password credentials are invalid

###### Examples

```typescript
const info = await client.vms.getConsoleInfo(42, {
  username: 'admin',
  password: 'secret',
});
if (info.isAvailable) {
  const rfb = new RFB(container, info.websocketUrl!);
}
```

```typescript
const info = await client.vms.getConsoleInfo(42, {
  apiKey: 'my-api-key',
});
if (info.isAvailable) {
  const ws = new WebSocket(info.websocketUrl!, {
    headers: { Authorization: `Bearer ${info.apiKey}` },
  });
}
```

##### getConsoleURL()

> **getConsoleURL**(`key`): `string`

Defined in: [services/vm/service.ts:536](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/service.ts#L536)

Get the web console URL for a virtual machine.

Constructs the URL locally — no API call is made.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`string`

The full console URL (e.g., `https://host/#/vm-console/42`)

## Interfaces

### VMRestoreOptions

Defined in: [services/vm/types.ts:621](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L621)

Options for the VM restore action.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-snapshot"></a> `snapshot?` | [`FlexKey`](../types.md#flexkey) | Snapshot reference to restore from. | [services/vm/types.ts:623](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L623) |
| <a id="property-preserve_macs"></a> `preserve_macs?` | `boolean` | Whether to preserve MAC addresses. | [services/vm/types.ts:625](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L625) |
| <a id="property-name"></a> `name?` | `string` | Name for the restored VM. | [services/vm/types.ts:627](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L627) |

***

### VMHotplugDriveOptions

Defined in: [services/vm/types.ts:631](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L631)

Options for hot-plugging a drive to a running VM.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-1"></a> `name?` | `string` | Drive name. | [services/vm/types.ts:633](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L633) |
| <a id="property-disksize"></a> `disksize?` | `number` | Disk size in GB. | [services/vm/types.ts:635](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L635) |
| <a id="property-interface"></a> `interface?` | `string` | Drive interface type (e.g., 'virtio-blk', 'virtio-scsi'). | [services/vm/types.ts:637](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L637) |
| <a id="property-media"></a> `media?` | `string` | Media type. | [services/vm/types.ts:639](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L639) |
| <a id="property-preferred_tier"></a> `preferred_tier?` | `string` | Preferred storage tier. | [services/vm/types.ts:641](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L641) |

***

### VMHotplugNicOptions

Defined in: [services/vm/types.ts:645](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L645)

Options for hot-plugging a NIC to a running VM.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name-2"></a> `name?` | `string` | NIC name. | [services/vm/types.ts:647](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L647) |
| <a id="property-vnet"></a> `vnet?` | [`FlexKey`](../types.md#flexkey) | Virtual network reference (FK to vnets). | [services/vm/types.ts:649](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L649) |
| <a id="property-interface-1"></a> `interface?` | `string` | NIC interface type. | [services/vm/types.ts:651](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L651) |

***

### VMPasteOptions

Defined in: [services/vm/types.ts:655](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L655)

Options for pasting text to a VM console.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-text"></a> `text?` | `string` | The text to paste. | [services/vm/types.ts:657](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L657) |

***

### VMEraseDriveOptions

Defined in: [services/vm/types.ts:661](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L661)

Options for erasing a VM drive.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-drive"></a> `drive?` | [`FlexKey`](../types.md#flexkey) | Drive reference to erase. | [services/vm/types.ts:663](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L663) |

***

### VMExecuteOptions

Defined in: [services/vm/types.ts:667](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L667)

Options for executing a command on a VM.

#### Indexable

> \[`key`: `string`\]: `unknown`

Command to execute.

***

### ConsoleApiKey

Defined in: [services/vm/types.ts:717](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L717)

API key authentication for console sessions.

The console endpoint accepts `Authorization: Bearer <apiKey>` directly,
bypassing the need for a session token. The caller is responsible for
setting the `Authorization` header on the WebSocket handshake.

**Browser limitation:** The browser `WebSocket` API does not support
custom headers. Use [ConsoleCredentials](../types.md#consolecredentials) or [ConsoleToken](../types.md#consoletoken)
for browser-based console connections.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-apikey"></a> `apiKey` | `string` | A valid VergeOS API key. | [services/vm/types.ts:719](https://github.com/verge-io/tsvergeos/blob/062717088bda09370ccf0807d21fafeb6b471b69/packages/sdk/src/services/vm/types.ts#L719) |

## References

### BootOrder

Re-exports [BootOrder](../types.md#bootorder)

***

### CloudInitDatasource

Re-exports [CloudInitDatasource](../types.md#cloudinitdatasource)

***

### ConsoleAuth

Re-exports [ConsoleAuth](../types.md#consoleauth)

***

### ConsoleCredentials

Re-exports [ConsoleCredentials](../types.md#consolecredentials)

***

### ConsoleToken

Re-exports [ConsoleToken](../types.md#consoletoken)

***

### ConsoleType

Re-exports [ConsoleType](../types.md#consoletype)

***

### CreatedFrom

Re-exports [CreatedFrom](../types.md#createdfrom)

***

### MigrationMethod

Re-exports [MigrationMethod](../types.md#migrationmethod)

***

### OnPowerLoss

Re-exports [OnPowerLoss](../types.md#onpowerloss)

***

### OSFamily

Re-exports [OSFamily](../types.md#osfamily)

***

### RTCBase

Re-exports [RTCBase](../types.md#rtcbase)

***

### SoundType

Re-exports [SoundType](../types.md#soundtype)

***

### VideoType

Re-exports [VideoType](../types.md#videotype)

***

### VM

Re-exports [VM](../types.md#vm)

***

### VMCloneOptions

Re-exports [VMCloneOptions](../types.md#vmcloneoptions)

***

### VMConsoleInfo

Re-exports [VMConsoleInfo](../types.md#vmconsoleinfo)

***

### VMCreateParams

Re-exports [VMCreateParams](../types.md#vmcreateparams)

***

### VMMigrateOptions

Re-exports [VMMigrateOptions](../types.md#vmmigrateoptions)

***

### VMSnapshotOptions

Re-exports [VMSnapshotOptions](../types.md#vmsnapshotoptions)

***

### VMUpdateParams

Re-exports [VMUpdateParams](../types.md#vmupdateparams)
