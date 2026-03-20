import type { HttpClient } from '../../http.js';
import { ReadOnlyService } from '../base.js';
import type { StorageTier } from './types.js';

/**
 * Service for querying VergeOS storage tiers.
 *
 * Storage tiers are system-wide aggregates of vSAN capacity. Up to 6 tiers
 * (0-5) may exist, representing different storage performance levels. This
 * is a **read-only** service — tiers are managed by the system.
 *
 * @example
 * ```typescript
 * import 'tsvergeos/services/storage-tier';
 *
 * const tiers = await client.storageTiers.list();
 * for (const tier of tiers) {
 *   console.log(`Tier ${tier.tier}: ${tier.used_pct}% used`);
 * }
 * ```
 */
export class StorageTierService extends ReadOnlyService<StorageTier> {
	constructor(http: HttpClient) {
		super(http, '/storage_tiers', 'Storage Tier');
	}
}
