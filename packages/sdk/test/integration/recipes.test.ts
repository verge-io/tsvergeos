import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/vm-recipe/index.js';
import '../../src/services/tenant-recipe/index.js';
import '../../src/services/vm-recipe-instance/index.js';
import '../../src/services/tenant-recipe-instance/index.js';
import '../../src/services/catalog/index.js';
import '../../src/services/catalog-repository/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Recipes & Catalogs integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list VM recipes', async () => {
		await delay();
		const recipes = await client.vmRecipes.list({ limit: 10 });

		expect(Array.isArray(recipes)).toBe(true);
		for (const recipe of recipes) {
			expect(recipe.$key).toBeDefined();
			// VM recipe keys are 40-char strings (slugs or hex)
			expect(String(recipe.$key)).toMatch(/^[a-z0-9-]{40}$/);
		}
	});

	it('should list tenant recipes', async () => {
		await delay();
		const recipes = await client.tenantRecipes.list({ limit: 10 });

		expect(Array.isArray(recipes)).toBe(true);
		for (const recipe of recipes) {
			expect(recipe.$key).toBeDefined();
			expect(String(recipe.$key)).toMatch(/^[a-z0-9-]{40}$/);
		}
	});

	it('should get questions for a VM recipe if any exist', async () => {
		await delay();
		const recipes = await client.vmRecipes.list({ limit: 1 });

		if (recipes.length === 0) {
			// No VM recipes on this system — skip gracefully
			return;
		}

		await delay();
		const questions = await client.vmRecipes.getQuestions(recipes[0].$key);

		expect(Array.isArray(questions)).toBe(true);
		for (const q of questions) {
			expect(q.$key).toBeDefined();
			expect(q.type).toBeDefined();
		}
	});

	it('should get sections for a VM recipe if any exist', async () => {
		await delay();
		const recipes = await client.vmRecipes.list({ limit: 1 });

		if (recipes.length === 0) {
			return;
		}

		await delay();
		const sections = await client.vmRecipes.getSections(recipes[0].$key);

		expect(Array.isArray(sections)).toBe(true);
		for (const s of sections) {
			expect(s.$key).toBeDefined();
		}
	});

	it('should get questions for a tenant recipe if any exist', async () => {
		await delay();
		const recipes = await client.tenantRecipes.list({ limit: 1 });

		if (recipes.length === 0) {
			return;
		}

		await delay();
		const questions = await client.tenantRecipes.getQuestions(recipes[0].$key);

		expect(Array.isArray(questions)).toBe(true);
	});

	it('should list catalogs', async () => {
		await delay();
		const catalogs = await client.catalogs.list({ limit: 10 });

		expect(Array.isArray(catalogs)).toBe(true);
		for (const catalog of catalogs) {
			expect(catalog.$key).toBeDefined();
			// Catalog keys are 40-char strings (slugs or hex)
			expect(String(catalog.$key)).toMatch(/^[a-z0-9-]{40}$/);
		}
	});

	it('should list catalog repositories', async () => {
		await delay();
		const repos = await client.catalogRepositories.list({ limit: 10 });

		expect(Array.isArray(repos)).toBe(true);
		for (const repo of repos) {
			expect(repo.$key).toBeDefined();
			expect(repo.name).toBeDefined();
		}
	});

	it('should get a catalog repository by key if any exist', async () => {
		await delay();
		const repos = await client.catalogRepositories.list({ limit: 1 });

		if (repos.length === 0) {
			return;
		}

		await delay();
		const repo = await client.catalogRepositories.get(repos[0].$key);

		expect(repo.$key).toBe(repos[0].$key);
		expect(repo.name).toBeDefined();
	});

	it('should list VM recipe instances', async () => {
		await delay();
		const instances = await client.vmRecipeInstances.list({ limit: 10 });

		expect(Array.isArray(instances)).toBe(true);
		for (const inst of instances) {
			expect(inst.$key).toBeDefined();
		}
	});

	it('should list tenant recipe instances', async () => {
		await delay();
		const instances = await client.tenantRecipeInstances.list({ limit: 10 });

		expect(Array.isArray(instances)).toBe(true);
		for (const inst of instances) {
			expect(inst.$key).toBeDefined();
		}
	});
});
