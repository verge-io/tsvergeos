[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/system

# services/system

System service registration module.

Importing this module registers the [SystemService](#systemservice) on [VergeClient](../index.md#vergeclient),
making `client.system` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/system';
```

## Classes

### SystemService

Defined in: [services/system/service.ts:27](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/system/service.ts#L27)

Service for accessing VergeOS system information.

This is a custom singleton service — the system endpoint (`/api/v4/system`)
always has exactly one row (key `self`). It also provides access to the
lightweight `/version.json` endpoint.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/system';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// Get lightweight version info
const info = await client.system.getInfo();
console.log(info.version); // "6.1.2"

// Get full system record
const system = await client.system.get();
console.log(system.cloud_name);
```

#### Constructors

##### Constructor

> **new SystemService**(`http`): [`SystemService`](#systemservice)

Defined in: [services/system/service.ts:31](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/system/service.ts#L31)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`SystemService`](#systemservice)

#### Methods

##### getInfo()

> **getInfo**(): `Promise`\<[`VersionInfo`](../types.md#versioninfo)\>

Defined in: [services/system/service.ts:43](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/system/service.ts#L43)

Get lightweight version information from `/version.json`.

This endpoint lives outside the `/api/v4/` path and returns minimal
version data: product name, version string, and build hash.

###### Returns

`Promise`\<[`VersionInfo`](../types.md#versioninfo)\>

Version information

##### get()

> **get**(): `Promise`\<[`System`](../types.md#system)\>

Defined in: [services/system/service.ts:54](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/system/service.ts#L54)

Get the full system record.

The system is a singleton — there is always exactly one row with key `self`.

###### Returns

`Promise`\<[`System`](../types.md#system)\>

The system record with all fields

##### update()

> **update**(`params`): `Promise`\<[`System`](../types.md#system)\>

Defined in: [services/system/service.ts:64](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/system/service.ts#L64)

Update the system record.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`SystemUpdateParams`](../types.md#systemupdateparams) | Fields to update |

###### Returns

`Promise`\<[`System`](../types.md#system)\>

The updated system record

##### geoip()

> **geoip**(): `Promise`\<`void`\>

Defined in: [services/system/service.ts:74](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/system/service.ts#L74)

Query the system's public IP for geographic location information.

Dispatches the `geoip` action via `/api/v4/system_actions`.

###### Returns

`Promise`\<`void`\>

## References

### System

Re-exports [System](../types.md#system)

***

### SystemUpdateParams

Re-exports [SystemUpdateParams](../types.md#systemupdateparams)

***

### VersionInfo

Re-exports [VersionInfo](../types.md#versioninfo)
