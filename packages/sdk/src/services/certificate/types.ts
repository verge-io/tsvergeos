import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Certificate type indicating how the certificate was provisioned. */
export type CertificateType = 'manual' | 'letsencrypt' | 'self_signed' | (string & {});

/** Cryptographic key type for the certificate. */
export type CertificateKeyType = 'ecdsa' | 'rsa' | (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS TLS certificate resource.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 * The `public`, `private`, and `chain` fields are excluded from default
 * responses — use {@link CertificateService.getWithKeys} to include them.
 */
export interface Certificate extends Resource {
	/** Internal cert reference (FK → `/sys/certs`). Read-only. */
	cert?: FlexKey;

	/** Primary domain for this certificate. Read-only. */
	domain?: string;

	/** Primary domain (alias field). Read-only. */
	domainname?: string;

	/** Comma-separated list of additional domains (SANs). */
	domainlist?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Public certificate in PEM format. Only returned when explicitly requested. */
	public?: string;

	/** Private key in PEM format. Only returned when explicitly requested. */
	private?: string;

	/** Certificate chain in PEM format. Only returned when explicitly requested. */
	chain?: string;

	/** Certificate provisioning type. Read-only. */
	type?: CertificateType;

	/** ACME server URL for Let's Encrypt certificates. */
	acme_server?: string;

	/** Key Identifier for External Account Binding (ACME). */
	eab_kid?: string;

	/** HMAC key for External Account Binding (ACME). */
	eab_hmac_key?: string;

	/** Cryptographic key type. */
	key_type?: CertificateKeyType;

	/** RSA key size (e.g., "2048", "4096"). */
	rsa_key_size?: string;

	/** Whether to force certificate renewal. */
	renew?: boolean;

	/** Contact user for Let's Encrypt (FK → `users`). */
	contact?: FlexKey;

	/** Whether the user agreed to the ACME terms of service. */
	agree_tos?: boolean;

	/** Whether the certificate is currently valid. Read-only. */
	valid?: boolean;

	/** Whether the certificate was auto-created. Read-only. */
	autocreated?: boolean;

	/** Certificate expiration timestamp (Unix epoch). Read-only. */
	expires?: number;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;

	/** Creation timestamp (Unix epoch). Read-only. */
	created?: number;

	/** Internal flag. Read-only. */
	ignore_refresh?: boolean;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new TLS certificate.
 *
 * For manual certificates, provide `public` and `private` PEM content.
 * For Let's Encrypt, set `type` to `'letsencrypt'` and provide `domainlist`.
 * For self-signed, set `type` to `'self_signed'`.
 */
export interface CertificateCreateParams {
	/** Comma-separated list of domains (SANs). */
	domainlist?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Certificate provisioning type. Default: `'manual'`. */
	type?: CertificateType;

	/** Public certificate in PEM format (required for manual). */
	public?: string;

	/** Private key in PEM format (required for manual). */
	private?: string;

	/** Certificate chain in PEM format. */
	chain?: string;

	/** ACME server URL (for Let's Encrypt type). */
	acme_server?: string;

	/** Key Identifier for External Account Binding. */
	eab_kid?: string;

	/** HMAC key for External Account Binding. */
	eab_hmac_key?: string;

	/** Cryptographic key type. */
	key_type?: CertificateKeyType;

	/** RSA key size. */
	rsa_key_size?: string;

	/** Contact user ID for Let's Encrypt (FK → `users`). */
	contact?: FlexKey;

	/** Whether you agree to the ACME terms of service. */
	agree_tos?: boolean;

	/** Whether to force renewal. */
	renew?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing TLS certificate.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`domain`, `domainname`, `type`, `valid`, `autocreated`,
 * `expires`, `created`, `modified`, `cert`, `ignore_refresh`) are excluded.
 */
export interface CertificateUpdateParams {
	/** Comma-separated list of domains (SANs). */
	domainlist?: string;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Public certificate in PEM format. */
	public?: string;

	/** Private key in PEM format. */
	private?: string;

	/** Certificate chain in PEM format. */
	chain?: string;

	/** ACME server URL. */
	acme_server?: string;

	/** Key Identifier for External Account Binding. */
	eab_kid?: string;

	/** HMAC key for External Account Binding. */
	eab_hmac_key?: string;

	/** Cryptographic key type. */
	key_type?: CertificateKeyType;

	/** RSA key size. */
	rsa_key_size?: string;

	/** Contact user ID (FK → `users`). */
	contact?: FlexKey;

	/** Whether you agree to the ACME terms of service. */
	agree_tos?: boolean;

	/** Whether to force renewal. */
	renew?: boolean;
}
