[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/vnet-monitor-stats-history-long

# services/vnet-monitor-stats-history-long

Vnet Monitor Stats History Long service registration module.

Importing this module registers the [VnetMonitorStatsHistoryLongService](#vnetmonitorstatshistorylongservice) on [VergeClient](../index.md#vergeclient),
making `client.vnetMonitorStatsHistoryLong` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/vnet-monitor-stats-history-long';
```

## Classes

### VnetMonitorStatsHistoryLongService

Defined in: [services/vnet-monitor-stats-history-long/service.ts:25](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/vnet-monitor-stats-history-long/service.ts#L25)

Service for querying VergeOS vnet monitor stats history (long-term).

Provides long-term network monitoring statistics for virtual networks,
including latency, packet quality, and error counters. This is a
**read-only** service — stats entries are managed by the system
and cannot be created, updated, or deleted via the API.

#### Example

```typescript
import 'tsvergeos/services/vnet-monitor-stats-history-long';

// Get long-term stats for a specific vnet
const stats = await client.vnetMonitorStatsHistoryLong.listByVnet(5);
for (const entry of stats) {
  console.log(`Latency avg: ${entry.latency_usec_avg}us, quality: ${entry.quality}`);
}
```

#### Extends

- [`ReadOnlyService`](../index.md#readonlyservice)\<[`VnetMonitorStatsHistoryLong`](../types.md#vnetmonitorstatshistorylong)\>

#### Constructors

##### Constructor

> **new VnetMonitorStatsHistoryLongService**(`http`): [`VnetMonitorStatsHistoryLongService`](#vnetmonitorstatshistorylongservice)

Defined in: [services/vnet-monitor-stats-history-long/service.ts:26](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/vnet-monitor-stats-history-long/service.ts#L26)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`VnetMonitorStatsHistoryLongService`](#vnetmonitorstatshistorylongservice)

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

> **list**(`options?`): `Promise`\<[`VnetMonitorStatsHistoryLong`](../types.md#vnetmonitorstatshistorylong)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`VnetMonitorStatsHistoryLong`](../types.md#vnetmonitorstatshistorylong)[]\>

Array of matching resources

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`list`](../index.md#list)

##### get()

> **get**(`key`): `Promise`\<[`VnetMonitorStatsHistoryLong`](../types.md#vnetmonitorstatshistorylong)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`VnetMonitorStatsHistoryLong`](../types.md#vnetmonitorstatshistorylong)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`get`](../index.md#get-1)

##### getByName()

> **getByName**(`name`): `Promise`\<[`VnetMonitorStatsHistoryLong`](../types.md#vnetmonitorstatshistorylong)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`VnetMonitorStatsHistoryLong`](../types.md#vnetmonitorstatshistorylong)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`getByName`](../index.md#getbyname)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`VnetMonitorStatsHistoryLong`](../types.md#vnetmonitorstatshistorylong)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`VnetMonitorStatsHistoryLong`](../types.md#vnetmonitorstatshistorylong)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`ReadOnlyService`](../index.md#readonlyservice).[`listAll`](../index.md#listall)

##### listByVnet()

> **listByVnet**(`vnetKey`, `options?`): `Promise`\<[`VnetMonitorStatsHistoryLong`](../types.md#vnetmonitorstatshistorylong)[]\>

Defined in: [services/vnet-monitor-stats-history-long/service.ts:39](https://github.com/verge-io/tsvergeos/blob/1053cf975fe1bacd1ca9d53743740ae63a601a08/packages/sdk/src/services/vnet-monitor-stats-history-long/service.ts#L39)

List stats history entries for a specific vnet.

Filters by `vnet eq {vnetKey}` and merges with any additional list options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vnetKey` | [`FlexKey`](../types.md#flexkey) | The key of the vnet to look up stats for. |
| `options?` | [`ListOptions`](../types.md#listoptions) | Additional list options (fields, sort, limit, etc.). |

###### Returns

`Promise`\<[`VnetMonitorStatsHistoryLong`](../types.md#vnetmonitorstatshistorylong)[]\>

An array of vnet monitor stats history entries.

## References

### VnetMonitorStatsHistoryLong

Re-exports [VnetMonitorStatsHistoryLong](../types.md#vnetmonitorstatshistorylong)
