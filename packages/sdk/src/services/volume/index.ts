/**
 * Volume service registration module.
 *
 * Importing this module registers the {@link VolumeService} on {@link VergeClient},
 * making `client.volumes` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/volume';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { VolumeService } from './service.js';

VergeClient.registerService('volumes', VolumeService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing volumes. */
		readonly volumes: VolumeService;
	}
}

export { VolumeService } from './service.js';
export type {
	CifsProtocol,
	NfsProtocol,
	ReadAheadKb,
	Volume,
	VolumeCreateParams,
	VolumeFsType,
	VolumeOptimize,
	VolumePreferredTier,
	VolumeRestoreOptions,
	VolumeRestoreType,
	VolumeUpdateParams,
} from './types.js';
