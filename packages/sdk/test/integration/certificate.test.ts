import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/certificate/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Certificate integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list certificates', async () => {
		await delay();
		const certs = await client.certificates.list({ limit: 10 });

		expect(Array.isArray(certs)).toBe(true);
		for (const cert of certs) {
			expect(cert.$key).toBeDefined();
		}
	});

	it('should get a certificate by key if any exist', async () => {
		await delay();
		const certs = await client.certificates.list({ limit: 1 });

		if (certs.length === 0) {
			return; // No certificates on this system
		}

		await delay();
		const cert = await client.certificates.get(certs[0].$key);

		expect(cert.$key).toBe(certs[0].$key);
		expect(cert.domain).toBeDefined();
	});

	it('should list certificates with fields filter', async () => {
		await delay();
		const certs = await client.certificates.list({
			limit: 5,
			fields: '$key,domain,type,status',
		});

		expect(Array.isArray(certs)).toBe(true);
		for (const cert of certs) {
			expect(cert.$key).toBeDefined();
		}
	});
});
