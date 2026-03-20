import { TaskTimeoutError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey, MutationOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type { Task, TaskCreateParams, TaskUpdateParams, TaskWaitOptions } from './types.js';

/** Default timeout for waitForCompletion in milliseconds (5 minutes). */
const DEFAULT_WAIT_TIMEOUT = 300_000;

/** Default polling interval for waitForCompletion in milliseconds (5 seconds). */
const DEFAULT_WAIT_INTERVAL = 5_000;

/**
 * Service for managing VergeOS tasks.
 *
 * Tasks are the automation engine — scheduled or event-triggered jobs
 * (snapshots, power ops, notifications). Supports full CRUD, execution,
 * and polling for completion.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/task';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all tasks
 * const tasks = await client.tasks.list();
 *
 * // Execute a task and wait for it to finish
 * await client.tasks.execute(42);
 * const completed = await client.tasks.waitForCompletion(42);
 * ```
 */
export class TaskService extends BaseService<Task, TaskCreateParams, TaskUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/tasks', 'Task');
	}

	/**
	 * Execute a task manually.
	 *
	 * Uses the dedicated action pattern: `POST /task_actions`.
	 *
	 * @param key - The task ID
	 * @param params - Optional action parameters
	 */
	async execute(key: FlexKey, params?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('execute', key, params);
	}

	/**
	 * Poll a task until it reaches `idle` status or timeout is exceeded.
	 *
	 * Since the VergeOS API has only two task statuses (`idle` and `running`),
	 * this method waits for the transition from `running` back to `idle`.
	 * Error detection is not possible via status alone — check task logs
	 * for failure details.
	 *
	 * @param key - The task ID to monitor
	 * @param options - Timeout and polling interval configuration
	 * @returns The task in `idle` status
	 * @throws {@link TaskTimeoutError} if the timeout is exceeded
	 */
	async waitForCompletion(key: FlexKey, options?: TaskWaitOptions): Promise<Task> {
		const timeout = options?.timeout ?? DEFAULT_WAIT_TIMEOUT;
		const interval = options?.interval ?? DEFAULT_WAIT_INTERVAL;
		const deadline = Date.now() + timeout;

		while (true) {
			const task = await this.get(key);

			if (task.status === 'idle') {
				return task;
			}

			if (Date.now() >= deadline) {
				throw new TaskTimeoutError(key, timeout);
			}

			await new Promise((resolve) => setTimeout(resolve, interval));
		}
	}

	/**
	 * Enable a task.
	 *
	 * @param key - The task ID
	 * @param options - Mutation options
	 * @returns The updated task
	 */
	async enable(key: FlexKey, options?: MutationOptions): Promise<Task> {
		return this.update(key, { enabled: true }, options);
	}

	/**
	 * Disable a task.
	 *
	 * @param key - The task ID
	 * @param options - Mutation options
	 * @returns The updated task
	 */
	async disable(key: FlexKey, options?: MutationOptions): Promise<Task> {
		return this.update(key, { enabled: false }, options);
	}
}
