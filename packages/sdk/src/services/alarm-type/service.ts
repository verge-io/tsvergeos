import type { HttpClient } from "../../http.js";
import { ReadOnlyService } from "../base.js";
import type { AlarmType } from "./types.js";

/**
 * Service for querying VergeOS alarm type definitions.
 *
 * Alarm types are read-only reference data that define the categories
 * of alarms the system can raise. Each alarm type has a unique string
 * `key` field as its primary identifier.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/alarm-type';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all alarm types
 * const types = await client.alarmTypes.list();
 *
 * // Get a specific alarm type
 * const cpuHigh = await client.alarmTypes.get('vm_cpu_high');
 * ```
 */
export class AlarmTypeService extends ReadOnlyService<AlarmType> {
  constructor(http: HttpClient) {
    super(http, "/alarm_types", "AlarmType");
  }
}
