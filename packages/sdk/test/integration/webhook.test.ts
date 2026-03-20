import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/webhook-url/index.js';
import '../../src/services/webhook/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Webhook URLs & Webhooks integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	// --- Webhook URLs ---

	it('should list webhook URLs', async () => {
		await delay();
		const urls = await client.webhookUrls.list({ limit: 10 });

		expect(Array.isArray(urls)).toBe(true);
		for (const url of urls) {
			expect(url.$key).toBeDefined();
		}
	});

	it('should get a webhook URL by key if any exist', async () => {
		await delay();
		const urls = await client.webhookUrls.list({ limit: 1 });

		if (urls.length === 0) {
			return; // No webhook URLs configured
		}

		await delay();
		const url = await client.webhookUrls.get(urls[0].$key);

		expect(url.$key).toBe(urls[0].$key);
	});

	// --- Webhooks (delivery log) ---

	it('should list webhooks (may be empty)', async () => {
		await delay();
		const webhooks = await client.webhooks.list({ limit: 10 });

		expect(Array.isArray(webhooks)).toBe(true);
		for (const webhook of webhooks) {
			expect(webhook.$key).toBeDefined();
		}
	});

	it('should get a webhook by key if any exist', async () => {
		await delay();
		const webhooks = await client.webhooks.list({ limit: 1 });

		if (webhooks.length === 0) {
			return; // No webhook delivery records
		}

		await delay();
		const webhook = await client.webhooks.get(webhooks[0].$key);

		expect(webhook.$key).toBe(webhooks[0].$key);
	});
});
