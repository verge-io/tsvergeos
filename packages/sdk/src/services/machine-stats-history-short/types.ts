import type { FlexKey, Resource } from "../../types.js";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS machine stats history (short-term) resource.
 *
 * Provides short-term historical CPU and RAM utilization metrics per machine.
 * Each row captures a point-in-time snapshot of machine performance. This is
 * a read-only monitoring resource managed by the system.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface MachineStatsHistoryShort extends Resource {
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

  /** RAM used in bytes. */
  ram_used?: number;

  /** Virtual RAM used in bytes. */
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

  /** Snapshot timestamp (Unix epoch). */
  timestamp?: number;
}
