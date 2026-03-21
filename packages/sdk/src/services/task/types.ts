import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Task execution status. Tasks are either idle (waiting) or running. */
export type TaskStatus = 'idle' | 'running';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS task resource.
 *
 * Tasks are the automation engine — scheduled or event-triggered jobs
 * (snapshots, power ops, notifications). They have both `$key` (integer)
 * and `id` (40-char SHA1 string) identifiers.
 */
export interface Task extends Resource {
	/** SHA1 identifier (40-character hex string). */
	id: string;

	/** Owner resource path (e.g., `"vms/123"`). FK reference. */
	owner?: FlexKey;

	/** Resource type context for the action. */
	table?: string;

	/** Action to execute. */
	action?: string;

	/** Human-readable action display name. Read-only. */
	action_display?: string;

	/** Task display name. 1–64 characters. */
	name: string;

	/** Human-readable description. */
	description?: string;

	/** Whether the task is enabled. */
	enabled?: boolean;

	/** Timestamp of the last execution (ISO 8601 string). */
	last_run?: string;

	/** Whether the task should be deleted after running once. */
	delete_after_run?: boolean;

	/** Current execution status. */
	status?: TaskStatus;

	/** Whether the task was created by the system. Read-only. */
	system_created?: boolean;

	/** User who created this task. Read-only. */
	creator?: FlexKey;

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;

	/** Settings/arguments JSON blob. */
	settings_args?: unknown;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new task.
 *
 * `owner`, `action`, and `name` are required.
 */
export interface TaskCreateParams {
	/** Owner resource path (e.g., `"vms/123"`). Required. */
	owner: FlexKey;

	/** Action to execute. Required. */
	action: string;

	/** Task display name. 1–64 characters. Required. */
	name: string;

	/** Resource type context. */
	table?: string;

	/** Human-readable description. */
	description?: string;

	/** Whether the task is enabled. Default: `true`. */
	enabled?: boolean;

	/** Whether to delete after running once. Default: `false`. */
	delete_after_run?: boolean;

	/** Settings/arguments for the action. */
	settings_args?: unknown;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing task.
 * All fields are optional.
 */
export interface TaskUpdateParams {
	/** Task display name. 1–64 characters. */
	name?: string;

	/** Human-readable description. */
	description?: string;

	/** Whether the task is enabled. */
	enabled?: boolean;

	/** Whether to delete after running once. */
	delete_after_run?: boolean;
}

// ─── Wait Options ────────────────────────────────────────────────────────────

/**
 * Options for {@link TaskService.waitForCompletion}.
 */
export interface TaskWaitOptions {
	/** Timeout in milliseconds. Default: 300000 (5 minutes). */
	timeout?: number;

	/** Polling interval in milliseconds. Default: 5000 (5 seconds). */
	interval?: number;
}
