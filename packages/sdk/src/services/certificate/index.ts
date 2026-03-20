/**
 * Certificate service registration module.
 *
 * Importing this module registers the {@link CertificateService} on {@link VergeClient},
 * making `client.certificates` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/certificate';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { CertificateService } from './service.js';

VergeClient.registerService('certificates', CertificateService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing TLS certificates. */
		readonly certificates: CertificateService;
	}
}

export { CertificateService } from './service.js';
export type {
	Certificate,
	CertificateCreateParams,
	CertificateKeyType,
	CertificateType,
	CertificateUpdateParams,
} from './types.js';
