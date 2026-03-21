import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/**
 * Machine log severity level.
 *
 * - `audit` — audit trail entries
 * - `message` — informational messages (default)
 * - `warning` — warning conditions
 * - `error` — error conditions
 * - `critical` — critical failures
 * - `summary` — summary entries
 * - `debug` — debug-level messages
 */
export type MachineLogLevel =
	| 'audit'
	| 'message'
	| 'warning'
	| 'error'
	| 'critical'
	| 'summary'
	| 'debug'
	| (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine log resource.
 *
 * Machine logs are system-generated entries that record events, errors,
 * and audit activity for machines. Each log entry is associated with a
 * parent machine and auto-expires after ~31 days.
 *
 * This is a **read-only** resource — log entries are created by the system.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineLog extends Resource {
	/** Parent machine reference (FK to `machines`). */
	machine: FlexKey;

	/** Log severity level. Default: `message`. */
	level?: MachineLogLevel;

	/** Log message text. */
	text?: string;

	/** Creation timestamp (Unix epoch, microseconds). Read-only, auto-expires ~31 days. */
	timestamp?: number;

	/** User or source that generated the log entry. */
	user?: string;
}
