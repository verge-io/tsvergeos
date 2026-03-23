[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/update-settings

# services/update-settings

Update settings service registration module.

Importing this module registers the [UpdateSettingsService](#updatesettingsservice) on [VergeClient](../index.md#vergeclient),
making `client.updateSettings` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/update-settings';
```

## Classes

### UpdateSettingsService

Defined in: [services/update-settings/service.ts:35](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/update-settings/service.ts#L35)

Service for managing VergeOS update settings.

Update settings is a singleton resource (always key `1`). It controls
how the system checks for, downloads, and installs updates.

This service does not extend the standard base classes because it is
a singleton with inline action dispatch rather than the standard
dedicated `_actions` endpoint pattern.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/update-settings';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// Get current update settings
const settings = await client.updateSettings.get();

// Enable auto-update
await client.updateSettings.update({ auto_update: true });

// Check for available updates
await client.updateSettings.checkForUpdates();
```

#### Constructors

##### Constructor

> **new UpdateSettingsService**(`http`): [`UpdateSettingsService`](#updatesettingsservice)

Defined in: [services/update-settings/service.ts:45](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/update-settings/service.ts#L45)

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) | The HTTP client for making API requests |

###### Returns

[`UpdateSettingsService`](#updatesettingsservice)

#### Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `"/update_settings"` | `'/update_settings'` | API resource path. | [services/update-settings/service.ts:40](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/update-settings/service.ts#L40) |

#### Methods

##### get()

> **get**(): `Promise`\<[`UpdateSettings`](../types.md#updatesettings)\>

Defined in: [services/update-settings/service.ts:54](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/update-settings/service.ts#L54)

Get the current update settings.

###### Returns

`Promise`\<[`UpdateSettings`](../types.md#updatesettings)\>

The singleton update settings resource

##### update()

> **update**(`params`, `options?`): `Promise`\<[`UpdateSettings`](../types.md#updatesettings)\>

Defined in: [services/update-settings/service.ts:67](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/update-settings/service.ts#L67)

Update the system update settings.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`UpdateSettingsUpdateParams`](../types.md#updatesettingsupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`UpdateSettings`](../types.md#updatesettings)\>

The updated settings (or partial if `readBack` is false)

##### checkForUpdates()

> **checkForUpdates**(): `Promise`\<`void`\>

Defined in: [services/update-settings/service.ts:85](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/update-settings/service.ts#L85)

Check for available updates.

Dispatched as inline action: `POST /update_settings/1/check`.

###### Returns

`Promise`\<`void`\>

##### downloadUpdates()

> **downloadUpdates**(): `Promise`\<`void`\>

Defined in: [services/update-settings/service.ts:94](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/update-settings/service.ts#L94)

Download available updates.

Dispatched as inline action: `POST /update_settings/1/download`.

###### Returns

`Promise`\<`void`\>

##### installUpdates()

> **installUpdates**(): `Promise`\<`void`\>

Defined in: [services/update-settings/service.ts:103](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/update-settings/service.ts#L103)

Install downloaded updates.

Dispatched as inline action: `POST /update_settings/1/install`.

###### Returns

`Promise`\<`void`\>

##### updateAll()

> **updateAll**(): `Promise`\<`void`\>

Defined in: [services/update-settings/service.ts:112](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/update-settings/service.ts#L112)

Perform all update steps: check, download, and install.

Dispatched as inline action: `POST /update_settings/1/all`.

###### Returns

`Promise`\<`void`\>

## References

### UpdateSettings

Re-exports [UpdateSettings](../types.md#updatesettings)

***

### UpdateSettingsUpdateParams

Re-exports [UpdateSettingsUpdateParams](../types.md#updatesettingsupdateparams)
