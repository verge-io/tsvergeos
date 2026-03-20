import type { Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS alarm type definition.
 *
 * Alarm types are read-only reference data that define the categories
 * of alarms the system can raise. Each alarm type has a unique string
 * `key` identifier (e.g., `"vm_cpu_high"`), unlike most resources which
 * use integer `$key` values.
 */
export interface AlarmType extends Resource {
	/** Unique string identifier for this alarm type (e.g., `"vm_cpu_high"`). */
	key?: string;

	/** Human-readable name of the alarm type. */
	name?: string;

	/** Description of what triggers this alarm type. */
	description?: string;

	/** Default severity level for alarms of this type. */
	level?: string;

	/** Threshold value that triggers the alarm. */
	threshold?: number;

	/** Whether logging is disabled for this alarm type. */
	disable_logging?: boolean;

	/** Whether alarms of this type can be deleted. */
	allow_delete?: boolean;

	/** Maximum snooze threshold value allowed. */
	max_snooze_threshold?: number;

	/** Maximum snooze duration in seconds. */
	max_snooze_seconds?: number;

	/** Default snooze duration in seconds. */
	default_snooze_seconds?: number;
}
