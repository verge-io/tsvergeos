import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { ReadOnlyService } from '../base.js';
import type { UpdateSourcePackage } from './types.js';

/**
 * Service for querying VergeOS update source packages.
 *
 * Update source packages are read-only records of available packages
 * from update sources, organized by branch.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/update-source-package';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all available packages
 * const packages = await client.updateSourcePackages.list();
 *
 * // List packages for a specific branch and source
 * const filtered = await client.updateSourcePackages.listByBranchAndSource(1, 2);
 * ```
 */
export class UpdateSourcePackageService extends ReadOnlyService<UpdateSourcePackage> {
	constructor(http: HttpClient) {
		super(http, '/update_source_packages', 'UpdateSourcePackage');
	}

	/**
	 * List packages for a specific branch and source.
	 *
	 * @param branchKey - The branch ID to filter by
	 * @param sourceKey - The update source ID to filter by
	 * @param options - Additional list options
	 * @returns Array of matching packages
	 */
	async listByBranchAndSource(
		branchKey: FlexKey,
		sourceKey: FlexKey,
		options?: ListOptions,
	): Promise<UpdateSourcePackage[]> {
		return this.list({
			...options,
			filter: `branch eq ${branchKey} and source eq ${sourceKey}`,
		});
	}

	/**
	 * List packages for a specific branch.
	 *
	 * @param branchKey - The branch ID to filter by
	 * @param options - Additional list options
	 * @returns Array of matching packages
	 */
	async listByBranch(branchKey: FlexKey, options?: ListOptions): Promise<UpdateSourcePackage[]> {
		return this.list({
			...options,
			filter: `branch eq ${branchKey}`,
		});
	}

	/**
	 * List packages for a specific source.
	 *
	 * @param sourceKey - The update source ID to filter by
	 * @param options - Additional list options
	 * @returns Array of matching packages
	 */
	async listBySource(sourceKey: FlexKey, options?: ListOptions): Promise<UpdateSourcePackage[]> {
		return this.list({
			...options,
			filter: `source eq ${sourceKey}`,
		});
	}
}
