import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/update-settings/index.js';
import '../../src/services/update-source/index.js';
import '../../src/services/update-branch/index.js';
import '../../src/services/update-source-package/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Update services integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	// --- Update Settings (singleton) ---

	it('should get update settings singleton', async () => {
		await delay();
		const settings = await client.updateSettings.get();

		expect(settings.$key).toBeDefined();
	});

	// --- Update Sources ---

	it('should list update sources', async () => {
		await delay();
		const sources = await client.updateSources.list({ limit: 10 });

		expect(Array.isArray(sources)).toBe(true);
		for (const source of sources) {
			expect(source.$key).toBeDefined();
		}
	});

	it('should get an update source by key if any exist', async () => {
		await delay();
		const sources = await client.updateSources.list({ limit: 1 });

		if (sources.length === 0) {
			return; // No update sources configured
		}

		await delay();
		const source = await client.updateSources.get(sources[0].$key);

		expect(source.$key).toBe(sources[0].$key);
	});

	// --- Update Branches ---

	it('should list update branches', async () => {
		await delay();
		const branches = await client.updateBranches.list({ limit: 10 });

		expect(Array.isArray(branches)).toBe(true);
		for (const branch of branches) {
			expect(branch.$key).toBeDefined();
		}
	});

	it('should get an update branch by key if any exist', async () => {
		await delay();
		const branches = await client.updateBranches.list({ limit: 1 });

		if (branches.length === 0) {
			return; // No update branches available
		}

		await delay();
		const branch = await client.updateBranches.get(branches[0].$key);

		expect(branch.$key).toBe(branches[0].$key);
	});

	// --- Update Source Packages ---

	it('should list update source packages (may be empty)', async () => {
		await delay();
		const packages = await client.updateSourcePackages.list({ limit: 10 });

		expect(Array.isArray(packages)).toBe(true);
		for (const pkg of packages) {
			expect(pkg.$key).toBeDefined();
		}
	});

	it('should get an update source package by key if any exist', async () => {
		await delay();
		const packages = await client.updateSourcePackages.list({ limit: 1 });

		if (packages.length === 0) {
			return; // No update source packages available
		}

		await delay();
		const pkg = await client.updateSourcePackages.get(packages[0].$key);

		expect(pkg.$key).toBe(packages[0].$key);
	});
});
