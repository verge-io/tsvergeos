[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/cluster-tier-status

# services/cluster-tier-status

Cluster Tier Status service registration module.

Importing this module registers the [ClusterTierStatusService](#clustertierstatusservice) on [VergeClient](../index.md#vergeclient),
making `client.clusterTierStatus` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/cluster-tier-status';
```

## Classes

### ClusterTierStatusService

Defined in: [services/cluster-tier-status/service.ts:23](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cluster-tier-status/service.ts#L23)

Service for querying VergeOS cluster tier health status.

Provides health, redundancy, and repair state for per-cluster storage tiers.
This is a **read-only** service — status entries are managed by the system.

#### Example

```typescript
import 'tsvergeos/services/cluster-tier-status';

// Get health status for a specific cluster tier
const statuses = await client.clusterTierStatus.listByClusterTier(1);
for (const s of statuses) {
  console.log(`State: ${s.state}, Status: ${s.status}`);
}
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`ClusterTierStatus`](../types.md#clustertierstatus)\>

#### Constructors

##### Constructor

> **new ClusterTierStatusService**(`http`): [`ClusterTierStatusService`](#clustertierstatusservice)

Defined in: [services/cluster-tier-status/service.ts:24](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cluster-tier-status/service.ts#L24)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`ClusterTierStatusService`](#clustertierstatusservice)

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

> **list**(`options?`): `Promise`\<[`ClusterTierStatus`](../types.md#clustertierstatus)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`ClusterTierStatus`](../types.md#clustertierstatus)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`ClusterTierStatus`](../types.md#clustertierstatus)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`ClusterTierStatus`](../types.md#clustertierstatus)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`ClusterTierStatus`](../types.md#clustertierstatus)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`ClusterTierStatus`](../types.md#clustertierstatus)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`ClusterTierStatus`](../types.md#clustertierstatus)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`ClusterTierStatus`](../types.md#clustertierstatus)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByClusterTier()

> **listByClusterTier**(`clusterTierKey`): `Promise`\<[`ClusterTierStatus`](../types.md#clustertierstatus)[]\>

Defined in: [services/cluster-tier-status/service.ts:34](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cluster-tier-status/service.ts#L34)

List status entries for a specific cluster tier.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `clusterTierKey` | [`FlexKey`](../types.md#flexkey) | The key of the cluster tier to filter by. |

###### Returns

`Promise`\<[`ClusterTierStatus`](../types.md#clustertierstatus)[]\>

Array of cluster tier status entries for the given cluster tier.

## References

### ClusterTierState

Re-exports [ClusterTierState](../types.md#clustertierstate)

***

### ClusterTierStatus

Re-exports [ClusterTierStatus](../types.md#clustertierstatus)

***

### ClusterTierStatusValue

Re-exports [ClusterTierStatusValue](../types.md#clustertierstatusvalue)
