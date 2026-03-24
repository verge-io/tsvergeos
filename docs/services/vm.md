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

Defined in: services/vm/service.ts:93

Full CRUD service base class that adds resource creation.

This is the most commonly extended base class. Use it for any resource
that supports create, read, update, delete, and actions.

#### Extends

- [`BaseService`](../index.md#baseservice)\<[`VM`](../types.md#vm), [`VMCreateParams`](../types.md#vmcreateparams), [`VMUpdateParams`](../types.md#vmupdateparams)\>

#### Constructors

##### Constructor

> **new VMService**(`http`): [`VMService`](#vmservice)

Defined in: services/vm/service.ts:94

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
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`BaseService`](../index.md#baseservice).[`resource`](../index.md#property-resource-4) | services/base.ts:123 |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`BaseService`](../index.md#baseservice).[`displayName`](../index.md#property-displayname-2) | services/base.ts:126 |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`BaseService`](../index.md#baseservice).[`defaultFields`](../index.md#property-defaultfields-2) | services/base.ts:138 |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](../index.md#actionconfig) | Derived or overridden action endpoint configuration. | [`BaseService`](../index.md#baseservice).[`actionConfig`](../index.md#property-actionconfig-1) | services/base.ts:256 |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`VM`](../types.md#vm)[]\>

Defined in: services/base.ts:157

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

Defined in: services/base.ts:174

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

Defined in: services/base.ts:198

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

Defined in: services/base.ts:217

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

Defined in: services/base.ts:293

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

> **create**(`params`, `options?`): `Promise`\<[`VM`](../types.md#vm)\>

Defined in: services/base.ts:395

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

Defined in: services/vm/service.ts:104

Power on a virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### powerOff()

> **powerOff**(`key`): `Promise`\<`void`\>

Defined in: services/vm/service.ts:115

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

Defined in: services/vm/service.ts:126

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

Defined in: services/vm/service.ts:137

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

Defined in: services/vm/service.ts:149

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

Defined in: services/vm/service.ts:160

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

Defined in: services/vm/service.ts:172

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

Defined in: services/vm/service.ts:182

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

Defined in: services/vm/service.ts:192

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

Defined in: services/vm/service.ts:206

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

Defined in: services/vm/service.ts:216

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

Defined in: services/vm/service.ts:226

Paste text to a virtual machine's console.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMPasteOptions`](../types.md#vmpasteoptions) | Paste options including the text to paste |

###### Returns

`Promise`\<`void`\>

##### restore()

> **restore**(`key`, `options?`): `Promise`\<`void`\>

Defined in: services/vm/service.ts:236

Restore a virtual machine from a snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMRestoreOptions`](../types.md#vmrestoreoptions) | Restore options (snapshot reference, preserve_macs, name) |

###### Returns

`Promise`\<`void`\>

##### recoverCloudSnapshot()

> **recoverCloudSnapshot**(`key`): `Promise`\<`void`\>

Defined in: services/vm/service.ts:245

Recover a virtual machine from a cloud or system snapshot.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### hotplugDrive()

> **hotplugDrive**(`key`, `options?`): `Promise`\<`void`\>

Defined in: services/vm/service.ts:255

Hot-plug a drive to a running virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMHotplugDriveOptions`](../types.md#vmhotplugdriveoptions) | Drive options (name, disksize, interface, media, preferred_tier) |

###### Returns

`Promise`\<`void`\>

##### hotplugNic()

> **hotplugNic**(`key`, `options?`): `Promise`\<`void`\>

Defined in: services/vm/service.ts:265

Hot-plug a NIC to a running virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMHotplugNicOptions`](../types.md#vmhotplugnicoptions) | NIC options (name, vnet, interface) |

###### Returns

`Promise`\<`void`\>

##### execute()

> **execute**(`key`, `options?`): `Promise`\<`void`\>

Defined in: services/vm/service.ts:277

Execute a command on a virtual machine.

Requires the QEMU guest agent to be running inside the VM.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMExecuteOptions`](../types.md#vmexecuteoptions) | Command execution options |

###### Returns

`Promise`\<`void`\>

##### fsyncStrict()

> **fsyncStrict**(`key`): `Promise`\<`void`\>

Defined in: services/vm/service.ts:286

Perform a strict filesystem sync on a virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### eraseDrive()

> **eraseDrive**(`key`, `options?`): `Promise`\<`void`\>

Defined in: services/vm/service.ts:296

Erase a drive on a virtual machine.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |
| `options?` | [`VMEraseDriveOptions`](../types.md#vmerasedriveoptions) | Options specifying which drive to erase |

###### Returns

`Promise`\<`void`\>

##### refresh()

> **refresh**(`key`): `Promise`\<`void`\>

Defined in: services/vm/service.ts:305

Refresh a virtual machine's state.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`Promise`\<`void`\>

##### getConsoleInfo()

> **getConsoleInfo**(`key`, `auth`): `Promise`\<[`VMConsoleInfo`](../types.md#vmconsoleinfo)\>

Defined in: services/vm/service.ts:363

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

Defined in: services/vm/service.ts:482

Get the web console URL for a virtual machine.

Constructs the URL locally — no API call is made.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The VM ID |

###### Returns

`string`

The full console URL (e.g., `https://host/#/vm-console/42`)

## References

### BootOrder

Re-exports [BootOrder](../types.md#bootorder)

***

### CloudInitDatasource

Re-exports [CloudInitDatasource](../types.md#cloudinitdatasource)

***

### ConsoleApiKey

Re-exports [ConsoleApiKey](../types.md#consoleapikey)

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

### VMEraseDriveOptions

Re-exports [VMEraseDriveOptions](../types.md#vmerasedriveoptions)

***

### VMExecuteOptions

Re-exports [VMExecuteOptions](../types.md#vmexecuteoptions)

***

### VMHotplugDriveOptions

Re-exports [VMHotplugDriveOptions](../types.md#vmhotplugdriveoptions)

***

### VMHotplugNicOptions

Re-exports [VMHotplugNicOptions](../types.md#vmhotplugnicoptions)

***

### VMMigrateOptions

Re-exports [VMMigrateOptions](../types.md#vmmigrateoptions)

***

### VMPasteOptions

Re-exports [VMPasteOptions](../types.md#vmpasteoptions)

***

### VMRestoreOptions

Re-exports [VMRestoreOptions](../types.md#vmrestoreoptions)

***

### VMSnapshotOptions

Re-exports [VMSnapshotOptions](../types.md#vmsnapshotoptions)

***

### VMUpdateParams

Re-exports [VMUpdateParams](../types.md#vmupdateparams)
