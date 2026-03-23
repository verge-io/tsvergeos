[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/vnet-monitor-stats-history-short

# services/vnet-monitor-stats-history-short

Vnet Monitor Stats History Short service registration module.

Importing this module registers the [VnetMonitorStatsHistoryShortService](#vnetmonitorstatshistoryshortservice) on [VergeClient](../index.md#vergeclient),
making `client.vnetMonitorStatsHistoryShort` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/vnet-monitor-stats-history-short';
```

## Classes

### VnetMonitorStatsHistoryShortService

Defined in: [services/vnet-monitor-stats-history-short/service.ts:25](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vnet-monitor-stats-history-short/service.ts#L25)

Service for querying VergeOS vnet monitor stats history (short-term).

Provides short-term network monitoring statistics for virtual networks,
including latency, packet quality, and error counters. This is a
**read-only** service — stats entries are managed by the system
and cannot be created, updated, or deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/vnet-monitor-stats-history-short';

// Get short-term stats for a specific vnet
const stats = await client.vnetMonitorStatsHistoryShort.listByVnet(5);
for (const entry of stats) {
  console.log(`Latency avg: ${entry.latency_usec_avg}us, quality: ${entry.quality}`);
}
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`VnetMonitorStatsHistoryShort`](../types.md#vnetmonitorstatshistoryshort)\>

#### Constructors

##### Constructor

> **new VnetMonitorStatsHistoryShortService**(`http`): [`VnetMonitorStatsHistoryShortService`](#vnetmonitorstatshistoryshortservice)

Defined in: [services/vnet-monitor-stats-history-short/service.ts:26](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vnet-monitor-stats-history-short/service.ts#L26)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`VnetMonitorStatsHistoryShortService`](#vnetmonitorstatshistoryshortservice)

###### Overrides

[`ReadOnlyService`](../index.md#readonlyservice).[`constructor`](../index.md#constructor-13)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`resource`](../index.md#property-resource-2) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`ReadOnlyService`](../index.md#readonlyservice).[`displayName`](../index.md#property-displayname) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`ReadOnlyService`](../index.md#readonlyservice).[`defaultFields`](../index.md#property-defaultfields) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L138) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`VnetMonitorStatsHistoryShort`](../types.md#vnetmonitorstatshistoryshort)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`VnetMonitorStatsHistoryShort`](../types.md#vnetmonitorstatshistoryshort)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`VnetMonitorStatsHistoryShort`](../types.md#vnetmonitorstatshistoryshort)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`VnetMonitorStatsHistoryShort`](../types.md#vnetmonitorstatshistoryshort)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`VnetMonitorStatsHistoryShort`](../types.md#vnetmonitorstatshistoryshort)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`VnetMonitorStatsHistoryShort`](../types.md#vnetmonitorstatshistoryshort)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`VnetMonitorStatsHistoryShort`](../types.md#vnetmonitorstatshistoryshort)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`VnetMonitorStatsHistoryShort`](../types.md#vnetmonitorstatshistoryshort)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByVnet()

> **listByVnet**(`vnetKey`, `options?`): `Promise`\<[`VnetMonitorStatsHistoryShort`](../types.md#vnetmonitorstatshistoryshort)[]\>

Defined in: [services/vnet-monitor-stats-history-short/service.ts:39](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vnet-monitor-stats-history-short/service.ts#L39)

List stats history entries for a specific vnet.

Filters by `vnet eq {vnetKey}` and merges with any additional list options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The key of the vnet to look up stats for. |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (fields, sort, limit, etc.). |

###### Returns

`Promise`\<[`VnetMonitorStatsHistoryShort`](../types.md#vnetmonitorstatshistoryshort)[]\>

An array of vnet monitor stats history entries.

## References

### VnetMonitorStatsHistoryShort

Re-exports [VnetMonitorStatsHistoryShort](../types.md#vnetmonitorstatshistoryshort)
