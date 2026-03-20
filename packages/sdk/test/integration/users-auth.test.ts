import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/user/index.js';
import '../../src/services/group/index.js';
import '../../src/services/member/index.js';
import '../../src/services/api-key/index.js';
import '../../src/services/permission/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Users & Auth integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list users (at least admin exists)', async () => {
		await delay();
		const users = await client.users.list({ limit: 10 });

		expect(Array.isArray(users)).toBe(true);
		expect(users.length).toBeGreaterThan(0);
		for (const user of users) {
			expect(user.$key).toBeDefined();
			expect(user.name).toBeDefined();
		}
	});

	it('should get a user by key', async () => {
		await delay();
		const users = await client.users.list({ limit: 1 });
		expect(users.length).toBeGreaterThan(0);

		await delay();
		const user = await client.users.get(users[0].$key);

		expect(user.$key).toBe(users[0].$key);
		expect(user.name).toBeDefined();
	});

	it('should list groups', async () => {
		await delay();
		const groups = await client.groups.list({ limit: 10 });

		expect(Array.isArray(groups)).toBe(true);
		for (const group of groups) {
			expect(group.$key).toBeDefined();
			expect(group.name).toBeDefined();
		}
	});

	it('should list members', async () => {
		await delay();
		const members = await client.members.list({ limit: 10 });

		expect(Array.isArray(members)).toBe(true);
		for (const member of members) {
			expect(member.$key).toBeDefined();
		}
	});

	it('should list API keys', async () => {
		await delay();
		const apiKeys = await client.apiKeys.list({ limit: 10 });

		expect(Array.isArray(apiKeys)).toBe(true);
		for (const key of apiKeys) {
			expect(key.$key).toBeDefined();
			expect(key.name).toBeDefined();
		}
	});

	it('should list permissions', async () => {
		await delay();
		const permissions = await client.permissions.list({ limit: 10 });

		expect(Array.isArray(permissions)).toBe(true);
		for (const perm of permissions) {
			expect(perm.$key).toBeDefined();
		}
	});
});
