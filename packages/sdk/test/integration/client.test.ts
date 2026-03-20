import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import { isAuthError } from '../../src/errors.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('VergeClient integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should populate serverVersion after connect', () => {
		expect(client.serverVersion).toBeDefined();
		expect(typeof client.serverVersion).toBe('string');
		expect(client.serverVersion?.length).toBeGreaterThan(0);
	});

	it('should have a server version starting with "26"', () => {
		expect(client.serverVersion).toMatch(/^26\./);
	});

	it('should return the configured host', () => {
		const expectedHost = (process.env.VERGEOS_HOST ?? '').replace(/\/+$/, '');
		const host = expectedHost.startsWith('http') ? expectedHost : `https://${expectedHost}`;
		expect(client.host).toBe(host);
	});

	it('should throw AuthError when using bad credentials for an API call', async () => {
		await delay();
		const config = await createClientConfig();
		// Override with bad API key
		config.apiKey = 'completely_invalid_key_for_testing';
		const badClient = new VergeClient(config);

		try {
			// Use the http client directly to hit an authenticated endpoint
			await badClient.http.get('/system');
			expect.fail('Expected an AuthError to be thrown');
		} catch (err: unknown) {
			expect(isAuthError(err)).toBe(true);
		}
	});
});
