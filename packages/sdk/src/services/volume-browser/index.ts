/**
 * Volume Browser registration module.
 *
 * Importing this module registers the {@link VolumeBrowserService} on {@link VergeClient},
 * making `client.volumeBrowser` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/volume-browser';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { VolumeBrowserService } from './service.js';

VergeClient.registerService('volumeBrowser', VolumeBrowserService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for browsing and manipulating files within volumes. */
		readonly volumeBrowser: VolumeBrowserService;
	}
}

export { VolumeBrowserService } from './service.js';
export type {
	BrowseOptions,
	VolumeBrowserEntry,
	VolumeBrowserFilter,
	VolumeBrowserJob,
	VolumeBrowserParams,
	VolumeBrowserPasteMode,
	VolumeBrowserQuery,
	VolumeBrowserRequest,
	VolumeBrowserStatus,
	WaitOptions,
} from './types.js';
