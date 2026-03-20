import type { HttpClient } from "../../http.js";
import type { FlexKey, MutationOptions } from "../../types.js";
import { WritableService } from "../base.js";
import type { Alarm, AlarmUpdateParams } from "./types.js";

/** Default snooze duration in seconds (24 hours). */
const DEFAULT_SNOOZE_SECONDS = 86_400;

/**
 * Service for managing VergeOS alarms.
 *
 * Alarms are raised and lowered automatically by the platform's monitoring
 * system. They cannot be created via the API. This service supports listing,
 * getting, resolving, snoozing, and unsnoozing alarms.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/alarm';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all alarms
 * const alarms = await client.alarms.list();
 *
 * // Resolve a resolvable alarm
 * await client.alarms.resolve(42);
 *
 * // Snooze an alarm for 1 hour
 * await client.alarms.snooze(42, 3600);
 *
 * // Unsnooze an alarm
 * await client.alarms.unsnooze(42);
 * ```
 */
export class AlarmService extends WritableService<Alarm, AlarmUpdateParams> {
  constructor(http: HttpClient) {
    super(http, "/alarms", "Alarm");
  }

  /**
   * Resolve an alarm.
   *
   * Uses the dedicated action pattern: `POST /alarm_actions`.
   * Only works on alarms where `resolvable` is `true`.
   *
   * @param key - The alarm ID
   */
  async resolve(key: FlexKey): Promise<void> {
    await this.dispatchAction("resolve", key);
  }

  /**
   * Snooze an alarm for a specified duration.
   *
   * Sets the `snooze` field to `now + seconds`. Defaults to 24 hours
   * (86,400 seconds) if no duration is provided.
   *
   * @param key - The alarm ID
   * @param seconds - Snooze duration in seconds (default: 86400)
   * @param options - Mutation options
   * @returns The updated alarm
   */
  async snooze(
    key: FlexKey,
    seconds?: number,
    options?: MutationOptions,
  ): Promise<Alarm> {
    const duration = seconds ?? DEFAULT_SNOOZE_SECONDS;
    const snoozeUntil = Math.floor(Date.now() / 1000) + duration;
    return this.update(key, { snooze: snoozeUntil }, options);
  }

  /**
   * Unsnooze an alarm by setting the `snooze` field to 0.
   *
   * @param key - The alarm ID
   * @param options - Mutation options
   * @returns The updated alarm
   */
  async unsnooze(key: FlexKey, options?: MutationOptions): Promise<Alarm> {
    return this.update(key, { snooze: 0 }, options);
  }
}
