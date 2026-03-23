/**
 * VM service registration module.
 *
 * Importing this module registers the {@link VMService} on {@link VergeClient},
 * making `client.vms` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/vm';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { VMService } from './service.js';

VergeClient.registerService('vms', VMService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing virtual machines. */
		readonly vms: VMService;
	}
}

export { VMService } from './service.js';
export type {
	BootOrder,
	CloudInitDatasource,
	ConsoleApiKey,
	ConsoleAuth,
	ConsoleCredentials,
	ConsoleToken,
	ConsoleType,
	CreatedFrom,
	MigrationMethod,
	OnPowerLoss,
	OSFamily,
	RTCBase,
	SoundType,
	VideoType,
	VM,
	VMCloneOptions,
	VMConsoleInfo,
	VMCreateParams,
	VMEraseDriveOptions,
	VMExecuteOptions,
	VMHotplugDriveOptions,
	VMHotplugNicOptions,
	VMMigrateOptions,
	VMPasteOptions,
	VMRestoreOptions,
	VMSnapshotOptions,
	VMUpdateParams,
} from './types.js';
