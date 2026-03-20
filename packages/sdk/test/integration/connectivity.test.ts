import { beforeAll, expect, it } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { createTestHttpClient, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('HttpClient connectivity', () => {
	let http: HttpClient;

	beforeAll(async () => {
		http = await createTestHttpClient();
	});

	it('should fetch /version.json from the server', async () => {
		const result = await http.getAbsolute<Record<string, unknown>>('/version.json');

		expect(result).toBeDefined();
		expect(result).toHaveProperty('version');
		expect(typeof result.version).toBe('string');
		expect((result.version as string).length).toBeGreaterThan(0);
	});
});
