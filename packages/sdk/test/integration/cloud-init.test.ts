import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/cloud-init/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('CloudInit files integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list cloud-init files (may be empty)', async () => {
		await delay();
		const files = await client.cloudInitFiles.list({ limit: 10 });

		expect(Array.isArray(files)).toBe(true);
		for (const file of files) {
			expect(file.$key).toBeDefined();
		}
	});

	it('should get a cloud-init file by key if any exist', async () => {
		await delay();
		const files = await client.cloudInitFiles.list({ limit: 1 });

		if (files.length === 0) {
			return; // No cloud-init files on this system
		}

		await delay();
		const file = await client.cloudInitFiles.get(files[0].$key);

		expect(file.$key).toBe(files[0].$key);
	});
});
