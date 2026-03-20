import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/resource-group/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Resource Groups integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list resource groups (may be empty)', async () => {
		await delay();
		const groups = await client.resourceGroups.list({ limit: 10 });

		expect(Array.isArray(groups)).toBe(true);
	});

	it('should get a resource group by key if any exist', async () => {
		await delay();
		const groups = await client.resourceGroups.list({
			limit: 1,
			fields: '$key,name,type,class',
		});

		if (groups.length === 0 || groups[0].$key === undefined) {
			return; // No resource groups or $key not available
		}

		await delay();
		const group = await client.resourceGroups.get(groups[0].$key);

		// The GET response may not include $key in 'most' fields for some resources
		expect(group.name).toBeDefined();
	});
});
