import { ApiError, NotFoundError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey, ListOptions } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	Certificate,
	CertificateCreateParams,
	CertificateType,
	CertificateUpdateParams,
} from './types.js';

/**
 * Service for managing VergeOS TLS certificates.
 *
 * Provides full CRUD operations plus convenience methods for domain lookup,
 * key retrieval, renewal, and type/validity filtering.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/certificate';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all certificates
 * const certs = await client.certificates.list();
 *
 * // Find a certificate by domain
 * const cert = await client.certificates.getByDomain('example.com');
 *
 * // Renew a Let's Encrypt certificate
 * await client.certificates.renew(cert.$key);
 * ```
 */
export class CertificateService extends BaseService<
	Certificate,
	CertificateCreateParams,
	CertificateUpdateParams
> {
	constructor(http: HttpClient) {
		super(http, '/certificates', 'Certificate');
	}

	/**
	 * Get a certificate by its primary domain.
	 *
	 * @param domain - The domain to search for
	 * @returns The matching certificate
	 * @throws {@link NotFoundError} if no certificate with that domain exists
	 */
	async getByDomain(domain: string): Promise<Certificate> {
		const results = await this.list({ filter: `domain eq '${domain}'` });
		if (results.length === 0) {
			throw new NotFoundError(this.displayName, domain);
		}
		const first = results[0] as Certificate;
		return this.get(first.$key);
	}

	/**
	 * Get a certificate including its public key, private key, and chain.
	 *
	 * By default, the `public`, `private`, and `chain` fields are excluded
	 * from API responses. This method explicitly requests them.
	 *
	 * @param key - The certificate ID
	 * @returns The certificate with key material included
	 * @throws {@link NotFoundError} if the certificate does not exist
	 */
	async getWithKeys(key: FlexKey): Promise<Certificate> {
		try {
			return await this.http.get<Certificate>(`${this.resource}/${key}`, {
				params: { fields: 'most,public,private,chain' },
			});
		} catch (err) {
			if (err instanceof ApiError && err.statusCode === 404) {
				throw new NotFoundError(this.displayName, key);
			}
			throw err;
		}
	}

	/**
	 * Trigger renewal of a certificate (typically Let's Encrypt).
	 *
	 * Sets `renew: true` on the certificate via update, which triggers
	 * the VergeOS renewal process.
	 *
	 * @param key - The certificate ID to renew
	 * @returns The updated certificate
	 */
	async renew(key: FlexKey): Promise<Certificate> {
		return this.update(key, { renew: true });
	}

	/**
	 * List certificates of a specific type.
	 *
	 * @param type - The certificate type to filter by
	 * @param options - Additional list options
	 * @returns Array of matching certificates
	 */
	async listByType(type: CertificateType, options?: ListOptions): Promise<Certificate[]> {
		return this.list({
			...options,
			filter: `type eq '${type}'`,
		});
	}

	/**
	 * List all currently valid certificates.
	 *
	 * @param options - Additional list options
	 * @returns Array of valid certificates
	 */
	async listValid(options?: ListOptions): Promise<Certificate[]> {
		return this.list({
			...options,
			filter: 'valid eq true',
		});
	}
}
