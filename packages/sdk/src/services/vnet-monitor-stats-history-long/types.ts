import type { FlexKey, Resource } from "../../types.js";

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS vnet monitor stats history (long) resource.
 *
 * Stores long-term network monitoring statistics for virtual networks,
 * including latency, packet quality, and error counters. Each row captures
 * a point-in-time snapshot for a specific vnet. This is a read-only
 * monitoring resource managed by the system.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface VnetMonitorStatsHistoryLong extends Resource {
  /** Parent vnet reference (FK to `vnets`). */
  vnet: FlexKey;

  /** Number of packets sent (uint16). */
  sent?: number;

  /** Link quality metric (uint8). */
  quality?: number;

  /** Dropped packet percentage (uint8). */
  dropped_pct?: number;

  /** Average latency in microseconds (uint32). */
  latency_usec_avg?: number;

  /** Peak latency in microseconds (uint32). */
  latency_usec_peak?: number;

  /** Number of duplicate packets (uint16). */
  duplicates?: number;

  /** Number of truncated packets (uint16). */
  truncated?: number;

  /** Number of dropped packets (uint16). */
  dropped?: number;

  /** Number of bad checksums (uint16). */
  bad_checksums?: number;

  /** Number of bad data packets (uint16). */
  bad_data?: number;

  /** Timestamp of the stats snapshot (Unix epoch, uint32). */
  timestamp?: number;
}
