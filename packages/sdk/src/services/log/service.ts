import type { HttpClient } from "../../http.js";
import type { ListOptions } from "../../types.js";
import { ReadOnlyService } from "../base.js";
import type { Log, LogLevel, LogObjectType } from "./types.js";

/**
 * Service for querying VergeOS system logs.
 *
 * Logs are read-only, system-generated entries with up to 25,000 rows that
 * auto-expire after approximately 31 days. **Always use filters** when querying
 * to avoid retrieving excessively large result sets.
 *
 * Default sort order is `-timestamp` (newest first).
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/log';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List recent errors
 * const errors = await client.logs.listErrors();
 *
 * // Search logs by text pattern
 * const matches = await client.logs.search('disk failure');
 *
 * // List logs since a specific time (microseconds)
 * const recent = await client.logs.listSince(1700000000000000);
 * ```
 */
export class LogService extends ReadOnlyService<Log> {
  constructor(http: HttpClient) {
    super(http, "/logs", "Log");
  }

  /**
   * List logs with default sort by `-timestamp` (newest first).
   *
   * @remarks
   * Unfiltered queries can return up to 25,000 rows. Always provide
   * a filter or limit to avoid large result sets.
   *
   * @param options - List options (filter, fields, sort, limit, offset)
   * @returns Array of log entries
   */
  override async list(options?: ListOptions): Promise<Log[]> {
    const sort = options?.sort ?? "-timestamp";
    return super.list({ ...options, sort });
  }

  /**
   * List logs filtered by severity level.
   *
   * @param level - The log level to filter by (e.g., `'error'`, `'warning'`)
   * @param options - Additional list options
   * @returns Array of log entries matching the level
   */
  async listByLevel(level: LogLevel, options?: ListOptions): Promise<Log[]> {
    const levelFilter = `level eq '${level}'`;
    const filter = options?.filter
      ? `(${options.filter}) and (${levelFilter})`
      : levelFilter;
    return this.list({ ...options, filter });
  }

  /**
   * List logs filtered by object type.
   *
   * @param objectType - The object type to filter by (e.g., `'vm'`, `'vnet'`)
   * @param options - Additional list options
   * @returns Array of log entries for the object type
   */
  async listByObjectType(
    objectType: LogObjectType,
    options?: ListOptions,
  ): Promise<Log[]> {
    const typeFilter = `object_type eq '${objectType}'`;
    const filter = options?.filter
      ? `(${options.filter}) and (${typeFilter})`
      : typeFilter;
    return this.list({ ...options, filter });
  }

  /**
   * List error and critical log entries.
   *
   * @param options - Additional list options
   * @returns Array of error and critical log entries
   */
  async listErrors(options?: ListOptions): Promise<Log[]> {
    const errorFilter = "(level eq 'error') or (level eq 'critical')";
    const filter = options?.filter
      ? `(${options.filter}) and (${errorFilter})`
      : errorFilter;
    return this.list({ ...options, filter });
  }

  /**
   * List logs filtered by username.
   *
   * @param username - The username to filter by
   * @param options - Additional list options
   * @returns Array of log entries from the user
   */
  async listByUser(username: string, options?: ListOptions): Promise<Log[]> {
    const userFilter = `user eq '${username}'`;
    const filter = options?.filter
      ? `(${options.filter}) and (${userFilter})`
      : userFilter;
    return this.list({ ...options, filter });
  }

  /**
   * List logs since a given timestamp.
   *
   * @param timestampMicros - Minimum timestamp in microseconds since epoch
   * @param options - Additional list options
   * @returns Array of log entries newer than the timestamp
   */
  async listSince(
    timestampMicros: number,
    options?: ListOptions,
  ): Promise<Log[]> {
    const sinceFilter = `timestamp ge ${timestampMicros}`;
    const filter = options?.filter
      ? `(${options.filter}) and (${sinceFilter})`
      : sinceFilter;
    return this.list({ ...options, filter });
  }

  /**
   * Search logs by text content.
   *
   * Uses the `ct` (contains) operator to match against the `text` field.
   *
   * @param pattern - Text pattern to search for
   * @param options - Additional list options
   * @returns Array of log entries containing the pattern
   */
  async search(pattern: string, options?: ListOptions): Promise<Log[]> {
    // Escape single quotes in the pattern for the filter string
    const escaped = pattern.replace(/'/g, "''");
    const searchFilter = `text ct '${escaped}'`;
    const filter = options?.filter
      ? `(${options.filter}) and (${searchFilter})`
      : searchFilter;
    return this.list({ ...options, filter });
  }
}
