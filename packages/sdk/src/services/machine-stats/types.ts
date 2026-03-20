import type { FlexKey, Resource } from '../../types.js';

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine stats resource.
 *
 * Provides per-machine CPU and RAM utilization metrics. Each machine
 * (VM or physical node) has one stats row that is continuously updated
 * by the system. This is a read-only monitoring resource.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineStats extends Resource {
	/** Parent machine reference (FK to `machines`). */
	machine: FlexKey;

	/** Total CPU usage percentage. */
	total_cpu?: number;

	/** User-space CPU usage percentage. */
	user_cpu?: number;

	/** System/kernel CPU usage percentage. */
	system_cpu?: number;

	/** I/O wait CPU percentage. */
	iowait_cpu?: number;

	/** VM usage CPU percentage. */
	vmusage_cpu?: number;

	/** IRQ CPU usage percentage. */
	irq_cpu?: number;

	/** RAM used in bytes (32-bit unsigned). */
	ram_used?: number;

	/** Physical RAM used percentage. */
	ram_pct?: number;

	/** Virtual RAM used in bytes (32-bit unsigned). */
	vram_used?: number;

	/** Per-core usage data (JSON). */
	core_usagelist?: unknown;

	/** Core temperature. */
	core_temp?: number;

	/** Top core temperature. */
	core_temp_top?: number;

	/** Core peak usage. */
	core_peak?: number;

	/** Number of cores with usage > 25%. */
	core_count_gt_25?: number;

	/** Number of cores with usage > 50%. */
	core_count_gt_50?: number;

	/** Number of cores with usage > 75%. */
	core_count_gt_75?: number;

	/** Last modified timestamp (Unix epoch). Read-only. */
	modified?: number;
}
