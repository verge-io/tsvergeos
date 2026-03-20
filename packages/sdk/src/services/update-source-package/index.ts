/**
 * Update source package service registration module.
 *
 * Importing this module registers the {@link UpdateSourcePackageService} on {@link VergeClient},
 * making `client.updateSourcePackages` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/update-source-package';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { UpdateSourcePackageService } from './service.js';

VergeClient.registerService('updateSourcePackages', UpdateSourcePackageService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for querying update source packages (read-only). */
		readonly updateSourcePackages: UpdateSourcePackageService;
	}
}

export { UpdateSourcePackageService } from './service.js';
export type { UpdateSourcePackage } from './types.js';
