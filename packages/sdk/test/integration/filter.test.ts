import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import { Filter } from '../../src/filter.js';
import '../../src/services/vm/index.js';
import { createClientConfig, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Filter integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should filter VMs with eq using Filter class', async () => {
		// First, list all VMs to find a known name
		const allVms = await client.vms.list({ limit: 1 });

		// Skip if no VMs exist on the system
		if (allVms.length === 0) {
			return;
		}

		const knownName = allVms[0].name;
		const filter = new Filter().eq('name', knownName).build();
		const filtered = await client.vms.list({ filter });

		expect(filtered.length).toBeGreaterThanOrEqual(1);
		expect(filtered.some((vm) => vm.name === knownName)).toBe(true);
	});

	it('should filter VMs with compound conditions using Filter class', async () => {
		// List VMs to find one with a known name and enabled status
		const allVms = await client.vms.list({ limit: 5 });

		if (allVms.length === 0) {
			return;
		}

		const knownVm = allVms[0];
		// Compound filter: name eq AND enabled eq (two conditions with implicit AND)
		const filter = new Filter().eq('name', knownVm.name).eq('enabled', knownVm.enabled).build();
		const filtered = await client.vms.list({ filter });

		expect(filtered.length).toBeGreaterThanOrEqual(1);
		expect(filtered.some((vm) => vm.name === knownVm.name)).toBe(true);
	});

	it('should return empty results for a non-matching eq filter', async () => {
		const filter = new Filter().eq('name', 'tsvergeos-nonexistent-vm-99999').build();
		const filtered = await client.vms.list({ filter });

		expect(filtered.length).toBe(0);
	});
});
