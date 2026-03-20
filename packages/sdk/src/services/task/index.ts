/**
 * Task service registration module.
 *
 * Importing this module registers the {@link TaskService} on {@link VergeClient},
 * making `client.tasks` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/task';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { TaskService } from './service.js';

VergeClient.registerService('tasks', TaskService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing tasks. */
		readonly tasks: TaskService;
	}
}

export { TaskService } from './service.js';
export type {
	Task,
	TaskCreateParams,
	TaskStatus,
	TaskUpdateParams,
	TaskWaitOptions,
} from './types.js';
