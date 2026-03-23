[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/cluster-tier

# services/cluster-tier

Cluster Tier service registration module.

Importing this module registers the [ClusterTierService](#clustertierservice) on [VergeClient](../index.md#vergeclient),
making `client.clusterTiers` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/cluster-tier';
```

## Classes

### ClusterTierService

Defined in: [services/cluster-tier/service.ts:24](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cluster-tier/service.ts#L24)

Service for querying VergeOS cluster tiers.

Cluster tiers are per-cluster breakdowns of vSAN storage tiers, providing
cluster-specific capacity, cost, and performance data. This is a
**read-only** service — cluster tiers are managed by the system.

#### Example

```typescript
import 'tsvergeos/services/cluster-tier';

// List all cluster tiers
const tiers = await client.clusterTiers.list();

// List tiers for a specific cluster
const clusterTiers = await client.clusterTiers.listByCluster(1);
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`ClusterTier`](../types.md#clustertier)\>

#### Constructors

##### Constructor

> **new ClusterTierService**(`http`): [`ClusterTierService`](#clustertierservice)

Defined in: [services/cluster-tier/service.ts:25](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cluster-tier/service.ts#L25)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`ClusterTierService`](#clustertierservice)

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

> **list**(`options?`): `Promise`\<[`ClusterTier`](../types.md#clustertier)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`ClusterTier`](../types.md#clustertier)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`ClusterTier`](../types.md#clustertier)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`ClusterTier`](../types.md#clustertier)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`ClusterTier`](../types.md#clustertier)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`ClusterTier`](../types.md#clustertier)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`ClusterTier`](../types.md#clustertier)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`ClusterTier`](../types.md#clustertier)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByCluster()

> **listByCluster**(`clusterKey`): `Promise`\<[`ClusterTier`](../types.md#clustertier)[]\>

Defined in: [services/cluster-tier/service.ts:35](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/cluster-tier/service.ts#L35)

List cluster tiers for a specific cluster.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `clusterKey` | [`FlexKey`](../types.md#flexkey) | The key of the cluster to filter by. |

###### Returns

`Promise`\<[`ClusterTier`](../types.md#clustertier)[]\>

Array of cluster tiers for the given cluster.

## References

### ClusterTier

Re-exports [ClusterTier](../types.md#clustertier)
