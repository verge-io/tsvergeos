import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { NetworkRuleService } from '../../src/services/network-rule/service.js';
import type { NetworkRule } from '../../src/services/network-rule/types.js';
import { NetworkRuleAliasService } from '../../src/services/network-rule-alias/service.js';
import type { NetworkRuleAlias } from '../../src/services/network-rule-alias/types.js';

// ---------------------------------------------------------------------------
// Mock HttpClient factory
// ---------------------------------------------------------------------------

function mockHttp(host = 'https://verge.example.com'): HttpClient {
	return {
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
		del: vi.fn(),
		host,
	} as unknown as HttpClient;
}

// ---------------------------------------------------------------------------
// Sample resources
// ---------------------------------------------------------------------------

const sampleRule: NetworkRule = {
	$key: 10,
	vnet: 1,
	name: 'Allow SSH',
	action: 'accept',
	direction: 'incoming',
	protocol: 'tcp',
	destination_ports: '22',
	enabled: true,
	interface: 'auto',
	pin: 'no',
	orderid: 1,
	description: 'Allow inbound SSH',
	trace: false,
	system_rule: false,
	statistics: false,
	log: false,
};

const sampleAlias: NetworkRuleAlias = {
	$key: 5,
	name: 'trusted-hosts',
	value: '10.0.0.0/8,192.168.1.0/24',
	publishing_scope: 'global',
	description: 'Trusted internal networks',
};

// ---------------------------------------------------------------------------
// NetworkRuleService Tests
// ---------------------------------------------------------------------------

describe('NetworkRuleService', () => {
	describe('constructor', () => {
		it('uses /vnet_rules resource path', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleRule]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_rules', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_rules/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleRule);

			const result = await svc.get(10);

			expect(http.get).toHaveBeenCalledWith('/vnet_rules/10', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleRule);
		});

		it('create() POSTs to /vnet_rules and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 10 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleRule);

			const result = await svc.create({
				vnet: 1,
				name: 'Allow SSH',
				action: 'accept',
				direction: 'incoming',
				protocol: 'tcp',
				destination_ports: '22',
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_rules', {
				body: {
					vnet: 1,
					name: 'Allow SSH',
					action: 'accept',
					direction: 'incoming',
					protocol: 'tcp',
					destination_ports: '22',
				},
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_rules/10', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleRule);
		});

		it('update() PUTs to /vnet_rules/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleRule,
				description: 'updated',
			});

			const result = await svc.update(10, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/vnet_rules/10', {
				body: { description: 'updated' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() DELETEs /vnet_rules/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(10);

			expect(http.del).toHaveBeenCalledWith('/vnet_rules/10');
		});
	});

	describe('listByNetwork', () => {
		it('filters by vnet FK', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleRule]);

			const result = await svc.listByNetwork(1);

			expect(http.get).toHaveBeenCalledWith('/vnet_rules', {
				params: { fields: 'most', filter: 'vnet eq 1' },
			});
			expect(result).toEqual([sampleRule]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork('1');

			expect(http.get).toHaveBeenCalledWith('/vnet_rules', {
				params: { fields: 'most', filter: 'vnet eq 1' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(1, { filter: "action eq 'accept'" });

			expect(http.get).toHaveBeenCalledWith('/vnet_rules', {
				params: {
					fields: 'most',
					filter: "vnet eq 1 and action eq 'accept'",
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByNetwork(1, { sort: 'orderid', limit: 10 });

			expect(http.get).toHaveBeenCalledWith('/vnet_rules', {
				params: {
					fields: 'most',
					filter: 'vnet eq 1',
					sort: 'orderid',
					limit: 10,
				},
			});
		});
	});

	describe('enable / disable', () => {
		it('enable() POSTs to /vnet_rules/{key}/enable', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.enable(10);

			expect(http.post).toHaveBeenCalledWith('/vnet_rules/10/enable');
		});

		it('disable() POSTs to /vnet_rules/{key}/disable', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.disable(10);

			expect(http.post).toHaveBeenCalledWith('/vnet_rules/10/disable');
		});

		it('enable() accepts string keys', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.enable('10');

			expect(http.post).toHaveBeenCalledWith('/vnet_rules/10/enable');
		});

		it('disable() accepts string keys', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.disable('10');

			expect(http.post).toHaveBeenCalledWith('/vnet_rules/10/disable');
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.networkRules', async () => {
			await import('../../src/services/network-rule/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.networkRules).toBeDefined();
			expect(client.networkRules).toBeInstanceOf(NetworkRuleService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/network-rule/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.networkRules;
			const second = client.networkRules;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// NetworkRuleAliasService Tests
// ---------------------------------------------------------------------------

describe('NetworkRuleAliasService', () => {
	describe('constructor', () => {
		it('uses /vnet_rule_aliases resource path', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleAliasService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleAlias]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vnet_rule_aliases', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /vnet_rule_aliases/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleAliasService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleAlias);

			const result = await svc.get(5);

			expect(http.get).toHaveBeenCalledWith('/vnet_rule_aliases/5', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleAlias);
		});

		it('create() POSTs to /vnet_rule_aliases and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleAliasService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 5 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleAlias);

			const result = await svc.create({
				name: 'trusted-hosts',
				value: '10.0.0.0/8,192.168.1.0/24',
				publishing_scope: 'global',
			});

			expect(http.post).toHaveBeenCalledWith('/vnet_rule_aliases', {
				body: {
					name: 'trusted-hosts',
					value: '10.0.0.0/8,192.168.1.0/24',
					publishing_scope: 'global',
				},
			});
			expect(http.get).toHaveBeenCalledWith('/vnet_rule_aliases/5', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleAlias);
		});

		it('update() PUTs to /vnet_rule_aliases/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleAliasService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleAlias,
				value: '172.16.0.0/12',
			});

			const result = await svc.update(5, { value: '172.16.0.0/12' });

			expect(http.put).toHaveBeenCalledWith('/vnet_rule_aliases/5', {
				body: { value: '172.16.0.0/12' },
			});
			expect(result.value).toBe('172.16.0.0/12');
		});

		it('delete() DELETEs /vnet_rule_aliases/{key}', async () => {
			const http = mockHttp();
			const svc = new NetworkRuleAliasService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(5);

			expect(http.del).toHaveBeenCalledWith('/vnet_rule_aliases/5');
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.networkRuleAliases', async () => {
			await import('../../src/services/network-rule-alias/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.networkRuleAliases).toBeDefined();
			expect(client.networkRuleAliases).toBeInstanceOf(NetworkRuleAliasService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/network-rule-alias/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.networkRuleAliases;
			const second = client.networkRuleAliases;
			expect(first).toBe(second);
		});
	});
});
