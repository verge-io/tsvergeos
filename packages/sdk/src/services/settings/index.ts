import { VergeClient } from '../../client.js';
import { SettingsService } from './service.js';

VergeClient.registerService('settings', SettingsService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing VergeOS system settings (key-value configuration). */
		readonly settings: SettingsService;
	}
}

export { SettingsService } from './service.js';
export type { Setting, SettingUpdateParams } from './types.js';
