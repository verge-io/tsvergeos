import { afterEach, beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/network/index.js';
import '../../src/services/network-rule/index.js';
import '../../src/services/network-address/index.js';
import '../../src/services/network-rule-alias/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Network rules, addresses, and aliases integration', () => {
	let client: VergeClient;
	const createdNetworkKeys: number[] = [];
	const createdAliasKeys: number[] = [];

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	afterEach(async () => {
		// Clean up aliases first (they're independent)
		for (const key of createdAliasKeys) {
			try {
				await delay();
				await client.networkRuleAliases.delete(key);
			} catch {
				// Already deleted or doesn't exist — ignore
			}
		}
		createdAliasKeys.length = 0;

		// Clean up networks (rules/addresses are deleted with the network)
		for (const key of createdNetworkKeys) {
			try {
				await delay();
				await client.networks.delete(key);
			} catch {
				// Already deleted or doesn't exist — ignore
			}
		}
		createdNetworkKeys.length = 0;
	});

	function uniqueName(prefix = 'tsvergeos-rule-test'): string {
		return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
	}

	it('should create a firewall rule on a network and perform full CRUD', async () => {
		// Create a test internal network
		const netName = uniqueName('tsvergeos-rule-net');
		const network = await client.networks.create({
			name: netName,
			type: 'internal',
		});
		createdNetworkKeys.push(network.$key as number);

		// Create a firewall rule
		await delay();
		const ruleName = uniqueName('tsvergeos-fw-rule');
		const rule = await client.networkRules.create({
			vnet: network.$key,
			name: ruleName,
			action: 'accept',
			direction: 'incoming',
			protocol: 'tcp',
			destination_ports: '22',
		});

		expect(rule.$key).toBeDefined();
		expect(rule.name).toBe(ruleName);
		expect(rule.action).toBe('accept');
		expect(rule.direction).toBe('incoming');
		expect(rule.protocol).toBe('tcp');

		// List rules by network — our rule should appear
		await delay();
		const rules = await client.networkRules.listByNetwork(network.$key);
		const found = rules.find((r) => r.$key === rule.$key);
		expect(found).toBeDefined();
		expect(found?.name).toBe(ruleName);

		// Update the rule description
		await delay();
		const updated = await client.networkRules.update(rule.$key, {
			description: 'Updated by tsvergeos integration test',
		});
		expect(updated.description).toBe('Updated by tsvergeos integration test');

		// Delete the rule
		await delay();
		await client.networkRules.delete(rule.$key);

		// Verify it's gone from the network's rule list
		await delay();
		const afterDelete = await client.networkRules.listByNetwork(network.$key);
		const stillThere = afterDelete.find((r) => r.$key === rule.$key);
		expect(stillThere).toBeUndefined();
	});

	it('should enable and disable a rule', async () => {
		const netName = uniqueName('tsvergeos-endis-net');
		const network = await client.networks.create({
			name: netName,
			type: 'internal',
		});
		createdNetworkKeys.push(network.$key as number);

		await delay();
		const rule = await client.networkRules.create({
			vnet: network.$key,
			name: uniqueName('tsvergeos-endis-rule'),
			action: 'accept',
			direction: 'incoming',
			protocol: 'tcp',
		});

		// Disable the rule
		await delay();
		await client.networkRules.disable(rule.$key);

		await delay();
		const disabled = await client.networkRules.get(rule.$key);
		expect(disabled.enabled).toBe(false);

		// Re-enable the rule
		await delay();
		await client.networkRules.enable(rule.$key);

		await delay();
		const enabled = await client.networkRules.get(rule.$key);
		expect(enabled.enabled).toBe(true);
	});

	it('should list addresses by network', async () => {
		const netName = uniqueName('tsvergeos-addr-net');
		const network = await client.networks.create({
			name: netName,
			type: 'internal',
		});
		createdNetworkKeys.push(network.$key as number);

		// Addresses on a fresh internal network may be empty — just verify no errors
		await delay();
		const addresses = await client.networkAddresses.listByNetwork(network.$key);
		expect(Array.isArray(addresses)).toBe(true);

		// Each returned address should reference the parent network
		for (const addr of addresses) {
			expect(addr.vnet).toBe(network.$key);
		}
	});

	it('should create and delete a rule alias', async () => {
		const aliasName = uniqueName('tsvergeos-alias');
		const alias = await client.networkRuleAliases.create({
			name: aliasName,
			value: '10.0.0.0/8,192.168.1.0/24',
			description: 'Integration test alias',
		});
		createdAliasKeys.push(alias.$key as number);

		expect(alias.$key).toBeDefined();
		expect(alias.name).toBe(aliasName);
		expect(alias.value).toBe('10.0.0.0/8,192.168.1.0/24');

		// List aliases and find ours
		await delay();
		const aliases = await client.networkRuleAliases.list({
			filter: `name eq '${aliasName}'`,
		});
		expect(aliases.length).toBe(1);
		expect(aliases[0].name).toBe(aliasName);

		// Delete the alias
		await delay();
		await client.networkRuleAliases.delete(alias.$key);

		// Remove from cleanup list
		const idx = createdAliasKeys.indexOf(alias.$key as number);
		if (idx >= 0) createdAliasKeys.splice(idx, 1);

		// Verify deleted via list
		await delay();
		const afterDelete = await client.networkRuleAliases.list({
			filter: `name eq '${aliasName}'`,
		});
		expect(afterDelete.length).toBe(0);
	});
});
