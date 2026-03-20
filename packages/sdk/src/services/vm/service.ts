import type { HttpClient } from '../../http.js';
import type { FlexKey } from '../../types.js';
import { BaseService } from '../base.js';
import type {
	VM,
	VMCloneOptions,
	VMCreateParams,
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
	 * Sends an ACPI shutdown signal at the hardware level. For guest-agent-mediated
	 * shutdown, use {@link guestShutdown} instead.
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
	 * Hard reset a virtual machine.
	 *
	 * @param key - The VM ID
	 */
	async reset(key: FlexKey): Promise<void> {
		await this.dispatchAction('reset', key);
	}

	/**
	 * Reboot a virtual machine via the QEMU guest agent.
	 *
	 * Requires `guest_agent: true` on the VM.
	 *
	 * @param key - The VM ID
	 */
	async guestReboot(key: FlexKey): Promise<void> {
		await this.dispatchAction('guestreset', key);
	}

	/**
	 * Shut down a virtual machine via the QEMU guest agent.
	 *
	 * Sends a shutdown command through the guest agent to the OS.
	 * Requires `guest_agent: true` on the VM. For ACPI-level shutdown,
	 * use {@link powerOff} instead.
	 *
	 * @param key - The VM ID
	 */
	async guestShutdown(key: FlexKey): Promise<void> {
		await this.dispatchAction('guestshutdown', key);
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
