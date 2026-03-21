import { API_BASE_PATH } from '../../constants.js';
import { AuthError } from '../../errors.js';
import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	ConsoleAuth,
	ConsoleCredentials,
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

/**
 * Service for managing VergeOS virtual machines.
 *
 * Provides full CRUD operations, power management, cloning, snapshotting,
 * and console URL generation for VMs.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/vm';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // List all VMs
 * const vms = await client.vms.list();
 *
 * // Create a VM with defaults (1 core, 1024 MB RAM)
 * const vm = await client.vms.create({ name: 'my-vm' });
 *
 * // Power operations
 * await client.vms.powerOn(vm.$key);
 * await client.vms.powerOff(vm.$key); // graceful ACPI shutdown
 * ```
 */
/**
 * Default fields for VM list/get requests.
 *
 * Includes cross-resource joins from the machine status table so that
 * power state, running status, and node placement are reliably populated
 * without consumers needing to manually fan out to `machineStatuses`.
 *
 * @internal
 */
const VM_DEFAULT_FIELDS = [
	'$key',
	'name',
	'description',
	'enabled',
	'cpu_cores',
	'ram',
	'os_family',
	'guest_agent',
	'uefi',
	'secure_boot',
	'machine_type',
	'created',
	'modified',
	'is_snapshot',
	'machine',
	'console',
	'on_power_loss',
	'cluster',
	'cluster_failover',
	'preferred_node',
	'ha_group',
	'cpu_type',
	'boot_order',
	'need_restart',
	'cloudinit_datasource',
	'allow_hotplug',
	'uuid',
	// Cross-resource joins for live status
	'machine#status#status as status',
	'machine#status#running as running',
	'machine#status#node as node_key',
	'machine#status#node#name as node_name',
];

export class VMService extends BaseService<VM, VMCreateParams, VMUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/vms', 'VM');
		this.defaultFields = VM_DEFAULT_FIELDS;
	}

	/**
	 * Power on a virtual machine.
	 *
	 * @param key - The VM ID
	 */
	async powerOn(key: FlexKey): Promise<void> {
		await this.dispatchAction('poweron', key);
	}

	/**
	 * Gracefully power off a virtual machine via ACPI shutdown signal.
	 *
	 * Sends an ACPI shutdown signal at the hardware level.
	 *
	 * @param key - The VM ID
	 */
	async powerOff(key: FlexKey): Promise<void> {
		await this.dispatchAction('poweroff', key);
	}

	/**
	 * Force power off a virtual machine (like pulling the plug).
	 *
	 * Use {@link powerOff} for a graceful ACPI shutdown instead.
	 *
	 * @param key - The VM ID
	 */
	async kill(key: FlexKey): Promise<void> {
		await this.dispatchAction('kill', key);
	}

	/**
	 * Hard reset a virtual machine (equivalent to pressing the reset button).
	 *
	 * For a graceful ACPI reboot, use {@link gracefulReboot} instead.
	 *
	 * @param key - The VM ID
	 */
	async reset(key: FlexKey): Promise<void> {
		await this.dispatchAction('reset', key);
	}

	/**
	 * Gracefully reboot a virtual machine via ACPI.
	 *
	 * Sends an ACPI reboot signal. For a hard reset (like pressing the
	 * reset button), use {@link reset} instead.
	 *
	 * @param key - The VM ID
	 */
	async gracefulReboot(key: FlexKey): Promise<void> {
		await this.dispatchAction('reset', key, { graceful: true });
	}

	/**
	 * Hibernate a virtual machine via ACPI.
	 *
	 * The guest OS must support ACPI hibernate.
	 *
	 * @param key - The VM ID
	 */
	async hibernate(key: FlexKey): Promise<void> {
		await this.dispatchAction('hibernate', key);
	}

	/**
	 * Migrate a virtual machine to another node.
	 *
	 * @param key - The VM ID
	 * @param options - Migration options. Pass `preferred_node` to target a
	 *   specific node, or `preferred_node: null` to auto-select the node
	 *   with the least RAM usage.
	 */
	async migrate(key: FlexKey, options: VMMigrateOptions): Promise<void> {
		await this.dispatchAction('migrate', key, options as Record<string, unknown>);
	}

	/**
	 * Clone a virtual machine.
	 *
	 * @param key - The VM ID to clone
	 * @param options - Clone options (name, preserve_macs)
	 */
	async clone(key: FlexKey, options?: VMCloneOptions): Promise<void> {
		await this.dispatchAction('clone', key, options as Record<string, unknown> | undefined);
	}

	/**
	 * Create a quiesced snapshot of a virtual machine.
	 *
	 * @param key - The VM ID to snapshot
	 * @param options - Snapshot options (name, quiesce)
	 */
	async snapshot(key: FlexKey, options?: VMSnapshotOptions): Promise<void> {
		await this.dispatchAction(
			'quiesce_snapshot',
			key,
			options as Record<string, unknown> | undefined,
		);
	}

	/**
	 * Change the CD/ISO attached to a virtual machine.
	 *
	 * @param key - The VM ID
	 * @param options - Optional parameters for the CD change
	 */
	async changeCD(key: FlexKey, options?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('changecd', key, options);
	}

	/**
	 * Change the network attached to a virtual machine.
	 *
	 * @param key - The VM ID
	 * @param options - Optional parameters for the network change
	 */
	async changeNet(key: FlexKey, options?: Record<string, unknown>): Promise<void> {
		await this.dispatchAction('changenet', key, options);
	}

	/**
	 * Paste text to a virtual machine's console.
	 *
	 * @param key - The VM ID
	 * @param options - Paste options including the text to paste
	 */
	async paste(key: FlexKey, options?: VMPasteOptions): Promise<void> {
		await this.dispatchAction('paste', key, options as Record<string, unknown> | undefined);
	}

	/**
	 * Restore a virtual machine from a snapshot.
	 *
	 * @param key - The VM ID
	 * @param options - Restore options (snapshot reference, preserve_macs, name)
	 */
	async restore(key: FlexKey, options?: VMRestoreOptions): Promise<void> {
		await this.dispatchAction('restore', key, options as Record<string, unknown> | undefined);
	}

	/**
	 * Recover a virtual machine from a cloud or system snapshot.
	 *
	 * @param key - The VM ID
	 */
	async recoverCloudSnapshot(key: FlexKey): Promise<void> {
		await this.dispatchAction('recover_cloudsnapshot', key);
	}

	/**
	 * Hot-plug a drive to a running virtual machine.
	 *
	 * @param key - The VM ID
	 * @param options - Drive options (name, disksize, interface, media, preferred_tier)
	 */
	async hotplugDrive(key: FlexKey, options?: VMHotplugDriveOptions): Promise<void> {
		await this.dispatchAction('hotplugdrive', key, options as Record<string, unknown> | undefined);
	}

	/**
	 * Hot-plug a NIC to a running virtual machine.
	 *
	 * @param key - The VM ID
	 * @param options - NIC options (name, vnet, interface)
	 */
	async hotplugNic(key: FlexKey, options?: VMHotplugNicOptions): Promise<void> {
		await this.dispatchAction('hotplugnic', key, options as Record<string, unknown> | undefined);
	}

	/**
	 * Execute a command on a virtual machine.
	 *
	 * Requires the QEMU guest agent to be running inside the VM.
	 *
	 * @param key - The VM ID
	 * @param options - Command execution options
	 */
	async execute(key: FlexKey, options?: VMExecuteOptions): Promise<void> {
		await this.dispatchAction('execute', key, options as Record<string, unknown> | undefined);
	}

	/**
	 * Perform a strict filesystem sync on a virtual machine.
	 *
	 * @param key - The VM ID
	 */
	async fsyncStrict(key: FlexKey): Promise<void> {
		await this.dispatchAction('fsync_strict', key);
	}

	/**
	 * Erase a drive on a virtual machine.
	 *
	 * @param key - The VM ID
	 * @param options - Options specifying which drive to erase
	 */
	async eraseDrive(key: FlexKey, options?: VMEraseDriveOptions): Promise<void> {
		await this.dispatchAction('erase_drive', key, options as Record<string, unknown> | undefined);
	}

	/**
	 * Refresh a virtual machine's state.
	 *
	 * @param key - The VM ID
	 */
	async refresh(key: FlexKey): Promise<void> {
		await this.dispatchAction('refresh', key);
	}

	/**
	 * Get console connection details for a virtual machine.
	 *
	 * Fetches the console type, host, port, and a ready-to-use WebSocket URL
	 * for establishing a direct console connection from a custom frontend.
	 * The returned `websocketUrl` includes a session token for authentication,
	 * tying the console session to a specific user for audit logging.
	 *
	 * Authentication can be provided as either:
	 * - `{ username, password }` — for local VergeOS users (exchanged for a session token)
	 * - `{ token }` — a pre-existing session token (e.g., from an OIDC login flow)
	 *
	 * @param key - The VM ID
	 * @param auth - User credentials or a pre-existing session token
	 * @returns Console connection info including authenticated WebSocket URL
	 * @throws {@link AuthError} if the credentials are invalid
	 *
	 * @example
	 * ```typescript
	 * // Local user
	 * const info = await client.vms.getConsoleInfo(42, {
	 *   username: 'admin',
	 *   password: 'secret',
	 * });
	 *
	 * // OIDC user (pass existing session token)
	 * const info = await client.vms.getConsoleInfo(42, {
	 *   token: sessionToken,
	 * });
	 *
	 * if (info.isAvailable) {
	 *   const rfb = new RFB(container, info.websocketUrl);
	 * }
	 * ```
	 */
	async getConsoleInfo(key: FlexKey, auth: ConsoleAuth): Promise<VMConsoleInfo> {
		const fields = [
			'console',
			'console_pass_enabled',
			'console_status#$key as console_key',
			'console_status#host as console_host',
			'console_status#port as console_port',
		].join(',');

		const result = await this.http.get<Record<string, unknown>>(`${this.resource}/${key}`, {
			params: { fields },
		});

		const consoleType = (result.console as string | undefined) ?? 'vnc';
		const host = (result.console_host as string | undefined) ?? null;
		const port = (result.console_port as number | undefined) ?? null;
		const consoleKey = (result.console_key as number | undefined) ?? null;
		const isPasswordProtected = (result.console_pass_enabled as boolean | undefined) ?? false;
		const isAvailable = host != null && port != null && consoleKey != null;

		let websocketUrl: string | null = null;
		let token: string | null = null;

		if (isAvailable) {
			token = this.isTokenAuth(auth) ? auth.token : await this.acquireSessionToken(auth);
			const wsScheme = this.http.host.startsWith('https') ? 'wss' : 'ws';
			const origin = this.http.host.replace(/^https?/, wsScheme);
			websocketUrl = `${origin}${API_BASE_PATH}/machine_console/${consoleKey}?token=${token}`;
		}

		return {
			consoleType: consoleType as VMConsoleInfo['consoleType'],
			host,
			port,
			consoleKey,
			websocketUrl,
			token,
			webUrl: `${this.http.host}/#/vm-console/${key}`,
			isPasswordProtected,
			isAvailable,
		};
	}

	/**
	 * Type guard to distinguish token-based auth from credentials.
	 * @internal
	 */
	private isTokenAuth(auth: ConsoleAuth): auth is { token: string } {
		return 'token' in auth;
	}

	/**
	 * Exchange user credentials for a short-lived session token.
	 *
	 * Session tokens are required for WebSocket console connections and are
	 * tied to a specific user identity for audit logging. Tokens expire
	 * after 14 minutes of inactivity.
	 *
	 * @internal
	 */
	private async acquireSessionToken(credentials: ConsoleCredentials): Promise<string> {
		const url = `${this.http.host}/api/sys/tokens`;
		const response = await this.http.fetchFn(url, {
			method: 'POST',
			headers: {
				Authorization: 'ybkey login',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				login: credentials.username,
				password: credentials.password,
			}),
		});

		if (!response.ok) {
			const text = await response.text().catch(() => '');
			throw new AuthError(text || `Console authentication failed (${response.status})`);
		}

		const body = (await response.json()) as Record<string, unknown>;
		const token = body.$key;
		if (typeof token !== 'string' || !token) {
			throw new AuthError('Console authentication returned no session token');
		}

		return token;
	}

	/**
	 * Get the web console URL for a virtual machine.
	 *
	 * Constructs the URL locally — no API call is made.
	 *
	 * @param key - The VM ID
	 * @returns The full console URL (e.g., `https://host/#/vm-console/42`)
	 */
	getConsoleURL(key: FlexKey): string {
		return `${this.http.host}/#/vm-console/${key}`;
	}
}
