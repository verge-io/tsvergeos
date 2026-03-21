import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { MachineLog } from './types.js';

/**
 * Service for querying VergeOS machine logs.
 *
 * Provides access to system-generated log entries for machines, including
 * audit trails, errors, warnings, and informational messages. This is a
 * **read-only** service — log entries are managed by the system and cannot
 * be created, updated, or deleted via the API.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/machine-log';
 *
 * // List recent logs for a specific machine
 * const logs = await client.machineLogs.listByMachine(42);
 * for (const log of logs) {
 *   console.log(`[${log.level}] ${log.text}`);
 * }
 * ```
 */
export class MachineLogService extends ReadOnlyService<MachineLog> {
	constructor(http: HttpClient) {
		super(http, '/machine_logs', 'Machine Log');
	}

	/**
	 * List log entries for a specific machine.
	 *
	 * Filters by `machine eq {machineKey}` and returns all matching log entries.
	 * Additional list options (limit, sort, filter) can be passed to refine results.
	 *
	 * @param machineKey - The key of the machine to list logs for.
	 * @param options - Optional list parameters (limit, sort, fields, etc.).
	 * @returns Array of machine log entries.
	 */
	async listByMachine(machineKey: FlexKey, options?: ListOptions): Promise<MachineLog[]> {
		const machineFilter = `machine eq ${machineKey}`;
		const combinedFilter = options?.filter
			? `(${machineFilter}) and (${options.filter})`
			: machineFilter;

		return this.list({
			...options,
			filter: combinedFilter,
		});
	}
}
