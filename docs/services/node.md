[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/node

# services/node

Node service registration module.

Importing this module registers the [NodeService](#nodeservice) on [VergeClient](../index.md#vergeclient),
making `client.nodes` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/node';
```

## Classes

### NodeService

Defined in: services/node/service.ts:31

Service for managing VergeOS nodes.

Nodes are physical or virtual servers belonging to a cluster. They are
infrastructure-managed — only update is supported (no create/delete).
Provides listing, filtering by cluster, maintenance actions, and other
node-level operations.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/node';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all nodes
const nodes = await client.nodes.list();

// List nodes in a specific cluster
const clusterNodes = await client.nodes.listByCluster(1);

// Enable maintenance mode
await client.nodes.enableMaintenance(node.$key);
```

#### Extends

- [`WritableService`](../index.md#writableservice)\<[`Node`](../types.md#node), [`NodeUpdateParams`](../types.md#nodeupdateparams)\>

#### Constructors

##### Constructor

> **new NodeService**(`http`): [`NodeService`](#nodeservice)

Defined in: services/node/service.ts:32

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`NodeService`](#nodeservice)

###### Overrides

[`WritableService`](../index.md#writableservice).[`constructor`](../index.md#constructor-14)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`WritableService`](../index.md#writableservice).[`resource`](../index.md#property-resource-3) | services/base.ts:123 |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`WritableService`](../index.md#writableservice).[`displayName`](../index.md#property-displayname-1) | services/base.ts:126 |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`WritableService`](../index.md#writableservice).[`defaultFields`](../index.md#property-defaultfields-1) | services/base.ts:138 |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](../index.md#actionconfig) | Derived or overridden action endpoint configuration. | [`WritableService`](../index.md#writableservice).[`actionConfig`](../index.md#property-actionconfig) | services/base.ts:256 |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`Node`](../types.md#node)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`Node`](../types.md#node)[]\>

Array of matching resources

###### Inherited from

[`WritableService`](../index.md#writableservice).[`list`](../index.md#list-1)

##### get()

> **get**(`key`): `Promise`\<[`Node`](../types.md#node)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`Node`](../types.md#node)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`WritableService`](../index.md#writableservice).[`get`](../index.md#get-2)

##### getByName()

> **getByName**(`name`): `Promise`\<[`Node`](../types.md#node)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`Node`](../types.md#node)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`WritableService`](../index.md#writableservice).[`getByName`](../index.md#getbyname-1)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`Node`](../types.md#node)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`Node`](../types.md#node)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`WritableService`](../index.md#writableservice).[`listAll`](../index.md#listall-1)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`Node`](../types.md#node)\>

Defined in: services/base.ts:293

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`NodeUpdateParams`](../types.md#nodeupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`Node`](../types.md#node)\>

The updated resource (or the resource with just `$key` if `readBack` is false)

###### Inherited from

[`WritableService`](../index.md#writableservice).[`update`](../index.md#update)

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

[`WritableService`](../index.md#writableservice).[`delete`](../index.md#delete)

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

[`WritableService`](../index.md#writableservice).[`inlineAction`](../index.md#inlineaction)

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

[`WritableService`](../index.md#writableservice).[`dispatchAction`](../index.md#dispatchaction)

##### listByCluster()

> **listByCluster**(`clusterKey`, `options?`): `Promise`\<[`Node`](../types.md#node)[]\>

Defined in: services/node/service.ts:43

List nodes belonging to a specific cluster.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `clusterKey` | [`FlexKey`](../types.md#flexkey) | The cluster ID to filter by |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, fields, sort, etc.) |

###### Returns

`Promise`\<[`Node`](../types.md#node)[]\>

Array of nodes in the cluster

##### listPhysical()

> **listPhysical**(`options?`): `Promise`\<[`Node`](../types.md#node)[]\>

Defined in: services/node/service.ts:55

List only physical nodes.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (filter, fields, sort, etc.) |

###### Returns

`Promise`\<[`Node`](../types.md#node)[]\>

Array of physical nodes

##### enableMaintenance()

> **enableMaintenance**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:66

Enable maintenance mode on a node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### disableMaintenance()

> **disableMaintenance**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:75

Disable maintenance mode on a node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### maintenanceReboot()

> **maintenanceReboot**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:84

Reboot a node that is in maintenance mode.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### powerOn()

> **powerOn**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:93

Power on a node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### powerOff()

> **powerOff**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:102

Power off a node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### reset()

> **reset**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:111

Reset a node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### refresh()

> **refresh**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:120

Refresh node state.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### kill()

> **kill**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:129

Force kill a node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### refreshStatus()

> **refreshStatus**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:138

Refresh cluster status for a node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### receiveFile()

> **receiveFile**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:147

Receive file from provider.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### getInterfaces()

> **getInterfaces**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:156

Get network interfaces for a node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### testIpmi()

> **testIpmi**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:165

Test IPMI connectivity for a node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### clearSel()

> **clearSel**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:174

Clear IPMI System Event Log for a node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

##### refreshFabricStatus()

> **refreshFabricStatus**(`key`): `Promise`\<`void`\>

Defined in: services/node/service.ts:183

Refresh fabric status for a node.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The node ID |

###### Returns

`Promise`\<`void`\>

## References

### IpmiStatus

Re-exports [IpmiStatus](../types.md#ipmistatus)

***

### Node

Re-exports [Node](../types.md#node)

***

### NodeUpdateParams

Re-exports [NodeUpdateParams](../types.md#nodeupdateparams)
