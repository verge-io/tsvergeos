[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/volume-browser

# services/volume-browser

Volume Browser registration module.

Importing this module registers the [VolumeBrowserService](#volumebrowserservice) on [VergeClient](../index.md#vergeclient),
making `client.volumeBrowser` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/volume-browser';
```

## Classes

### VolumeBrowserService

Defined in: services/volume-browser/service.ts:46

Service for browsing and manipulating files within VergeOS volumes.

The volume browser API is asynchronous: operations create a job (POST),
which must then be polled (GET) until it completes. This service provides
both low-level job management and high-level convenience methods.

**Important**: The NAS service VM must be running to browse volumes.
Use `""` for root directory, not `"/"`.

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/volume-browser';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// Browse root directory of a volume
const entries = await client.volumeBrowser.browse('abc123sha1', '');

// Rename a file
await client.volumeBrowser.rename('abc123sha1', 'subdir', 'old.txt', 'new.txt');
```

#### Constructors

##### Constructor

> **new VolumeBrowserService**(`http`): [`VolumeBrowserService`](#volumebrowserservice)

Defined in: services/volume-browser/service.ts:50

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`VolumeBrowserService`](#volumebrowserservice)

#### Methods

##### browse()

> **browse**(`volumeKey`, `dir`, `options?`, `waitOptions?`): `Promise`\<[`VolumeBrowserEntry`](../types.md#volumebrowserentry)[]\>

Defined in: services/volume-browser/service.ts:66

Browse a directory in a volume and return the file/directory entries.

This is a convenience method that handles the full async job flow:
creates the job, polls until complete, and returns parsed entries.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `volumeKey` | `string` | The volume's SHA1 key |
| `dir` | `string` | Directory path to browse. Use `""` for root, NOT `"/"` |
| `options?` | [`BrowseOptions`](../types.md#browseoptions) | Optional browse parameters (limit, offset, extensions, sort) |
| `waitOptions?` | [`WaitOptions`](../types.md#waitoptions) | Optional polling configuration (timeout, pollInterval) |

###### Returns

`Promise`\<[`VolumeBrowserEntry`](../types.md#volumebrowserentry)[]\>

Array of file/directory entries

##### createJob()

> **createJob**(`request`): `Promise`\<[`VolumeBrowserJob`](../types.md#volumebrowserjob)\>

Defined in: services/volume-browser/service.ts:96

Create a volume browser job.

Use [getJob](#getjob) or [waitForResult](#waitforresult) to poll for results.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`VolumeBrowserRequest`](../types.md#volumebrowserrequest) | The job request with volume, query type, and parameters |

###### Returns

`Promise`\<[`VolumeBrowserJob`](../types.md#volumebrowserjob)\>

The created job with its SHA1 ID

##### getJob()

> **getJob**(`id`): `Promise`\<[`VolumeBrowserJob`](../types.md#volumebrowserjob)\>

Defined in: services/volume-browser/service.ts:124

Get a volume browser job by ID.

**Important**: Explicitly requests the `result` field, which is not
returned by default.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The job's SHA1 ID |

###### Returns

`Promise`\<[`VolumeBrowserJob`](../types.md#volumebrowserjob)\>

The job record including result data

##### waitForResult()

> **waitForResult**(`jobId`, `options?`): `Promise`\<[`VolumeBrowserEntry`](../types.md#volumebrowserentry)[]\>

Defined in: services/volume-browser/service.ts:140

Poll a volume browser job until it completes or times out.

Returns the parsed file/directory entries on success.
Throws on error status or timeout.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `jobId` | `string` | The job's SHA1 ID |
| `options?` | [`WaitOptions`](../types.md#waitoptions) | Optional polling configuration |

###### Returns

`Promise`\<[`VolumeBrowserEntry`](../types.md#volumebrowserentry)[]\>

Array of file/directory entries

##### list()

> **list**(`options?`): `Promise`\<[`VolumeBrowserJob`](../types.md#volumebrowserjob)[]\>

Defined in: services/volume-browser/service.ts:173

List volume browser jobs with optional filtering.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | List options (filter, sort, fields, pagination) |

###### Returns

`Promise`\<[`VolumeBrowserJob`](../types.md#volumebrowserjob)[]\>

Array of job records

##### rename()

> **rename**(`volumeKey`, `dir`, `oldName`, `newName`, `waitOptions?`): `Promise`\<[`VolumeBrowserEntry`](../types.md#volumebrowserentry)[]\>

Defined in: services/volume-browser/service.ts:189

Rename a file or directory within a volume.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `volumeKey` | `string` | The volume's SHA1 key |
| `dir` | `string` | Directory containing the item |
| `oldName` | `string` | Current item name |
| `newName` | `string` | New item name |
| `waitOptions?` | [`WaitOptions`](../types.md#waitoptions) | Optional polling configuration |

###### Returns

`Promise`\<[`VolumeBrowserEntry`](../types.md#volumebrowserentry)[]\>

Parsed result entries (typically empty for rename)

##### deleteFiles()

> **deleteFiles**(`volumeKey`, `dir`, `items`, `waitOptions?`): `Promise`\<[`VolumeBrowserEntry`](../types.md#volumebrowserentry)[]\>

Defined in: services/volume-browser/service.ts:218

Delete files or directories within a volume.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `volumeKey` | `string` | The volume's SHA1 key |
| `dir` | `string` | Directory containing the items |
| `items` | `string`[] | Names of items to delete |
| `waitOptions?` | [`WaitOptions`](../types.md#waitoptions) | Optional polling configuration |

###### Returns

`Promise`\<[`VolumeBrowserEntry`](../types.md#volumebrowserentry)[]\>

Parsed result entries (typically empty for delete)

##### paste()

> **paste**(`volumeKey`, `sourceDir`, `items`, `destDir`, `mode`, `waitOptions?`): `Promise`\<[`VolumeBrowserEntry`](../types.md#volumebrowserentry)[]\>

Defined in: services/volume-browser/service.ts:247

Copy or move files/directories within a volume.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `volumeKey` | `string` | The volume's SHA1 key |
| `sourceDir` | `string` | Source directory containing the items |
| `items` | `string`[] | Names of items to copy/move |
| `destDir` | `string` | Destination directory |
| `mode` | [`VolumeBrowserPasteMode`](../types.md#volumebrowserpastemode) | Operation mode: `'copy'` or `'move'` |
| `waitOptions?` | [`WaitOptions`](../types.md#waitoptions) | Optional polling configuration |

###### Returns

`Promise`\<[`VolumeBrowserEntry`](../types.md#volumebrowserentry)[]\>

Parsed result entries (typically empty for paste)

## References

### BrowseOptions

Re-exports [BrowseOptions](../types.md#browseoptions)

***

### VolumeBrowserEntry

Re-exports [VolumeBrowserEntry](../types.md#volumebrowserentry)

***

### VolumeBrowserFilter

Re-exports [VolumeBrowserFilter](../types.md#volumebrowserfilter)

***

### VolumeBrowserJob

Re-exports [VolumeBrowserJob](../types.md#volumebrowserjob)

***

### VolumeBrowserParams

Re-exports [VolumeBrowserParams](../types.md#volumebrowserparams)

***

### VolumeBrowserPasteMode

Re-exports [VolumeBrowserPasteMode](../types.md#volumebrowserpastemode)

***

### VolumeBrowserQuery

Re-exports [VolumeBrowserQuery](../types.md#volumebrowserquery)

***

### VolumeBrowserRequest

Re-exports [VolumeBrowserRequest](../types.md#volumebrowserrequest)

***

### VolumeBrowserStatus

Re-exports [VolumeBrowserStatus](../types.md#volumebrowserstatus)

***

### WaitOptions

Re-exports [WaitOptions](../types.md#waitoptions)
