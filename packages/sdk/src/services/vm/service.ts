import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	VM,
	VMCloneOptions,
	VMCreateParams,
	VMMigrateOptions,
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
export class VMService extends BaseService<VM, VMCreateParams, VMUpdateParams> {
	constructor(http: HttpClient) {
		super(http, '/vms', 'VM');
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
