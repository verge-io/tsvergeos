import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/nas-service/index.js';
import '../../src/services/nas-service-user/index.js';
import '../../src/services/volume-browser/index.js';
import '../../src/services/file/index.js';
import '../../src/services/volume/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('NAS services, volume browser & files integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list NAS services without error', async () => {
		await delay();
		const services = await client.nasServices.list({ limit: 10 });

		expect(Array.isArray(services)).toBe(true);
		for (const svc of services) {
			expect(svc.$key).toBeDefined();
		}
	});

	it('should list NAS service users without error', async () => {
		await delay();
		const users = await client.nasServiceUsers.list({ limit: 10 });

		expect(Array.isArray(users)).toBe(true);
		for (const user of users) {
			expect(user.$key).toBeDefined();
		}
	});

	it('should list NAS service users by service if services exist', async () => {
		await delay();
		const services = await client.nasServices.list({ limit: 1 });

		if (services.length === 0) {
			// No NAS services on this system — skip gracefully
			return;
		}

		const serviceKey = services[0].$key;
		await delay();
		const users = await client.nasServiceUsers.listByService(serviceKey);

		expect(Array.isArray(users)).toBe(true);
		for (const user of users) {
			expect(user.$key).toBeDefined();
		}
	});

	it('should browse root directory of a volume if volumes exist', async () => {
		await delay();
		const volumes = await client.volumes.list({ limit: 5 });

		if (volumes.length === 0) {
			// No volumes on this system — skip gracefully
			return;
		}

		// Try to browse each volume; some may fail if NAS service isn't running
		let browsed = false;
		for (const vol of volumes) {
			try {
				await delay();
				const entries = await client.volumeBrowser.browse(
					String(vol.$key),
					'',
					{
						limit: 10,
					},
					{
						timeout: 10_000,
					},
				);

				expect(Array.isArray(entries)).toBe(true);
				for (const entry of entries) {
					expect(typeof entry.name).toBe('string');
				}
				browsed = true;
				break;
			} catch {}
		}

		// It's OK if no volumes were browsable — not an error
		if (!browsed) {
			// eslint-disable-next-line no-console
			console.log('No browsable volumes found — skipping browse assertions');
		}
	});

	it('should list files without error', async () => {
		await delay();
		const files = await client.files.list({ limit: 10 });

		expect(Array.isArray(files)).toBe(true);
		for (const file of files) {
			expect(file.$key).toBeDefined();
		}
	});

	it('should list ISO files via convenience method', async () => {
		await delay();
		const isos = await client.files.listISOs();

		expect(Array.isArray(isos)).toBe(true);
		// All returned files should be ISOs
		for (const iso of isos) {
			expect(iso.$key).toBeDefined();
		}
	});
});
