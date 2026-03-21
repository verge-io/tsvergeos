/**
 * Vnet Monitor Stats History Long service registration module.
 *
 * Importing this module registers the {@link VnetMonitorStatsHistoryLongService} on {@link VergeClient},
 * making `client.vnetMonitorStatsHistoryLong` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/vnet-monitor-stats-history-long';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { VnetMonitorStatsHistoryLongService } from './service.js';

VergeClient.registerService('vnetMonitorStatsHistoryLong', VnetMonitorStatsHistoryLongService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying long-term vnet monitor statistics (read-only). */
		readonly vnetMonitorStatsHistoryLong: VnetMonitorStatsHistoryLongService;
	}
}

export { VnetMonitorStatsHistoryLongService } from './service.js';
export type { VnetMonitorStatsHistoryLong } from './types.js';
