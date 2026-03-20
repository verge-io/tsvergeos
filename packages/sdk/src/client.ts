import { ENV_PREFIX } from './constants.js';
import { ValidationError } from './errors.js';
import { HttpClient } from './http.js';
import type { ClientConfig } from './types.js';
import { checkServerVersion } from './version.js';

/**
 * Constructor type for service classes.
 * Services receive the {@link HttpClient} instance and produce a service object.
 */
type ServiceConstructor = new (http: HttpClient) => unknown;

/**
 * Primary entry point for interacting with a VergeOS server.
 *
 * Manages authentication, HTTP transport, version checking, and lazy
 * service instantiation via a `Proxy`-based registration pattern.
 *
 * Services register themselves via {@link VergeClient.registerService} and
 * TypeScript declaration merging, enabling tree-shakeable imports:
 *
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/vm'; // registers client.vms
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 * const vms = await client.vms.list();
 * ```
 */
export class VergeClient {
	/** Static registry of service constructors, keyed by property name. */
	private static readonly registry = new Map<string, ServiceConstructor>();

	/** Cached service instances for this client. */
	private readonly _services = new Map<string, unknown>();

	/** The underlying HTTP transport. */
	private readonly _http: HttpClient;

	/** The host URL this client is connected to. */
	private readonly _host: string;

	/** Server version string, populated after a successful version check. */
	private _serverVersion: string | undefined;

	/**
	 * Create a new `VergeClient` without performing a version check.
	 *
	 * Prefer {@link VergeClient.connect} for production use — it validates
	 * the server version before returning. Use the constructor directly
	 * for testing or offline scenarios.
	 *
	 * @param config - Connection and authentication configuration
	 * @throws {@link ValidationError} if `host` is missing or no auth is provided
	 */
	constructor(config: ClientConfig) {
		if (!config.host) {
			throw new ValidationError('ClientConfig requires a host', 'host');
		}

		if (!config.apiKey && !(config.username && config.password)) {
			throw new ValidationError('ClientConfig requires either apiKey or username+password', 'auth');
		}

		this._http = new HttpClient(config);
		const host = config.host.replace(/\/+$/, '');
		this._host = host.startsWith('http') ? host : `https://${host}`;

		// Return a Proxy so property access can resolve registered services.
		// The constructor-return pattern is intentional — it's the standard way
		// to intercept property access for lazy service instantiation.
		// biome-ignore lint/correctness/noConstructorReturn: Proxy-in-constructor is the designed pattern for lazy service registration
		return new Proxy(this, {
			get(target, prop, receiver) {
				// Own properties and methods take precedence
				if (Reflect.has(target, prop)) {
					return Reflect.get(target, prop, receiver);
				}

				// Check the service registry
				if (typeof prop === 'string') {
					// Return cached instance if available
					const cached = target._services.get(prop);
					if (cached !== undefined) {
						return cached;
					}

					// Lazily instantiate if registered
					const Ctor = VergeClient.registry.get(prop);
					if (Ctor) {
						const instance = new Ctor(target._http);
						target._services.set(prop, instance);
						return instance;
					}
				}

				return undefined;
			},
		});
	}

	/**
	 * The base URL of the connected VergeOS server.
	 */
	get host(): string {
		return this._host;
	}

	/**
	 * The server version string (e.g., `"26.1.0"`), or `undefined` if
	 * the client was created without a version check.
	 */
	get serverVersion(): string | undefined {
		return this._serverVersion;
	}

	/**
	 * The underlying HTTP client. Exposed for service classes to use.
	 * @internal
	 */
	get http(): HttpClient {
		return this._http;
	}

	/**
	 * Register a service constructor to be lazily instantiated on property access.
	 *
	 * Called as a side effect in each service's `index.ts`:
	 * ```typescript
	 * VergeClient.registerService('vms', VMService);
	 * ```
	 *
	 * @param name - The property name on `VergeClient` (e.g., `'vms'`)
	 * @param ctor - The service class constructor
	 */
	static registerService(name: string, ctor: ServiceConstructor): void {
		VergeClient.registry.set(name, ctor);
	}

	/**
	 * Create a connected client with server version validation.
	 *
	 * This is the recommended way to create a `VergeClient` for production use.
	 * Fetches `/version.json` from the server and validates compatibility.
	 *
	 * @param config - Connection and authentication configuration
	 * @returns A connected `VergeClient` with `serverVersion` populated
	 * @throws {@link UnsupportedVersionError} if the server version is incompatible
	 */
	static async connect(config: ClientConfig): Promise<VergeClient> {
		const client = new VergeClient(config);
		client._serverVersion = await checkServerVersion(client._http);
		return client;
	}

	/**
	 * Create a client from environment variables without a version check.
	 *
	 * Reads the following env vars (prefix: `VERGEOS_`):
	 * - `VERGEOS_HOST` — server hostname or URL (required)
	 * - `VERGEOS_API_KEY` — API key for bearer auth
	 * - `VERGEOS_USERNAME` — username for basic auth
	 * - `VERGEOS_PASSWORD` — password for basic auth
	 * - `VERGEOS_VERIFY_SSL` — set to `"false"` to disable TLS verification
	 * - `VERGEOS_TIMEOUT` — timeout in seconds (converted to milliseconds)
	 *
	 * @returns A `VergeClient` configured from environment variables
	 * @throws {@link ValidationError} if required env vars are missing
	 */
	static fromEnv(): VergeClient {
		const config = VergeClient.buildConfigFromEnv();
		return new VergeClient(config);
	}

	/**
	 * Create a connected client from environment variables with version validation.
	 *
	 * Combines {@link VergeClient.fromEnv} and {@link VergeClient.connect} —
	 * reads env vars and validates the server version.
	 *
	 * @returns A connected `VergeClient` with `serverVersion` populated
	 * @throws {@link ValidationError} if required env vars are missing
	 * @throws {@link UnsupportedVersionError} if the server version is incompatible
	 */
	static async connectFromEnv(): Promise<VergeClient> {
		const config = VergeClient.buildConfigFromEnv();
		return VergeClient.connect(config);
	}

	/**
	 * Build a {@link ClientConfig} from environment variables.
	 */
	private static buildConfigFromEnv(): ClientConfig {
		const env = typeof process !== 'undefined' ? process.env : {};

		const host = env[`${ENV_PREFIX}HOST`];
		if (!host) {
			throw new ValidationError(`${ENV_PREFIX}HOST environment variable is required`, 'host');
		}

		const config: ClientConfig = { host };

		const apiKey = env[`${ENV_PREFIX}API_KEY`];
		if (apiKey) {
			config.apiKey = apiKey;
		}

		const username = env[`${ENV_PREFIX}USERNAME`];
		const password = env[`${ENV_PREFIX}PASSWORD`];
		if (username) {
			config.username = username;
		}
		if (password) {
			config.password = password;
		}

		const verifySsl = env[`${ENV_PREFIX}VERIFY_SSL`];
		if (verifySsl?.toLowerCase() === 'false') {
			config.verifySsl = false;
		}

		const timeout = env[`${ENV_PREFIX}TIMEOUT`];
		if (timeout) {
			const seconds = Number.parseFloat(timeout);
			if (!Number.isNaN(seconds) && seconds > 0) {
				config.timeout = seconds * 1000; // Convert seconds → ms
			}
		}

		return config;
	}
}
