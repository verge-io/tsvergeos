/**
 * Alarm service registration module.
 *
 * Importing this module registers the {@link AlarmService} on {@link VergeClient},
 * making `client.alarms` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/alarm';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { AlarmService } from './service.js';

VergeClient.registerService('alarms', AlarmService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing alarms. */
		readonly alarms: AlarmService;
	}
}

export { AlarmService } from './service.js';
export type {
	Alarm,
	AlarmLevel,
	AlarmOwnerType,
	AlarmSubOwnerType,
	AlarmUpdateParams,
} from './types.js';
