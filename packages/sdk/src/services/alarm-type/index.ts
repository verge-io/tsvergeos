/**
 * Alarm type service registration module.
 *
 * Importing this module registers the {@link AlarmTypeService} on {@link VergeClient},
 * making `client.alarmTypes` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/alarm-type';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { AlarmTypeService } from './service.js';

VergeClient.registerService('alarmTypes', AlarmTypeService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying alarm type definitions. */
		readonly alarmTypes: AlarmTypeService;
	}
}

export { AlarmTypeService } from './service.js';
export type { AlarmType } from './types.js';
