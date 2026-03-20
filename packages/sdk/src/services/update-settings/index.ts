/**
 * Update settings service registration module.
 *
 * Importing this module registers the {@link UpdateSettingsService} on {@link VergeClient},
 * making `client.updateSettings` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/update-settings';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { UpdateSettingsService } from './service.js';

VergeClient.registerService('updateSettings', UpdateSettingsService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing system update settings (singleton). */
		readonly updateSettings: UpdateSettingsService;
	}
}

export { UpdateSettingsService } from './service.js';
export type { UpdateSettings, UpdateSettingsUpdateParams } from './types.js';
