import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { CatalogService } from '../../src/services/catalog/service.js';
import type { Catalog } from '../../src/services/catalog/types.js';
import { CatalogRepositoryService } from '../../src/services/catalog-repository/service.js';
import type { CatalogRepository } from '../../src/services/catalog-repository/types.js';
import { TenantRecipeService } from '../../src/services/tenant-recipe/service.js';
import type { TenantRecipe } from '../../src/services/tenant-recipe/types.js';
import { TenantRecipeInstanceService } from '../../src/services/tenant-recipe-instance/service.js';
import type { TenantRecipeInstance } from '../../src/services/tenant-recipe-instance/types.js';
import { VMRecipeService } from '../../src/services/vm-recipe/service.js';
import type { VMRecipe } from '../../src/services/vm-recipe/types.js';
import { VMRecipeInstanceService } from '../../src/services/vm-recipe-instance/service.js';
import type { VMRecipeInstance } from '../../src/services/vm-recipe-instance/types.js';

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

const HEX_KEY = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2';

const sampleVMRecipe: VMRecipe = {
	$key: HEX_KEY,
	id: HEX_KEY,
	name: 'Ubuntu 22.04 LTS',
	description: 'Ubuntu Server recipe',
	catalog: 'deadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
	downloaded: true,
	update_available: false,
	needs_republish: false,
	version: '1.2.0',
	build: 3,
	size: 1073741824,
	question_assets: false,
};

const sampleTenantRecipe: TenantRecipe = {
	$key: HEX_KEY,
	id: HEX_KEY,
	name: 'Tenant Template',
	description: 'A tenant recipe',
	preserve_certs: true,
	catalog: 'deadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
	downloaded: true,
	version: '2.0.0',
	build: 1,
};

const sampleVMRecipeInstance: VMRecipeInstance = {
	$key: 42,
	recipe: HEX_KEY,
	vm: 100,
	name: 'my-deployed-vm',
	version: '1.2.0',
	build: 3,
	answers: { hostname: 'my-vm', ram: 4096 },
	update: false,
	verify: false,
	simulate: false,
	auto_update: true,
};

const sampleTenantRecipeInstance: TenantRecipeInstance = {
	$key: 43,
	recipe: HEX_KEY,
	tenant: 200,
	name: 'my-deployed-tenant',
	version: '2.0.0',
	build: 1,
	answers: { hostname: 'my-tenant' },
};

const sampleCatalog: Catalog = {
	$key: HEX_KEY,
	id: HEX_KEY,
	name: 'Default Catalog',
	repository: 1,
	publishing_scope: 'global',
	description: 'The default catalog',
	enabled: true,
};

const sampleRepository: CatalogRepository = {
	$key: 1,
	name: 'VergeOS Recipes',
	description: 'Official recipe repo',
	type: 'remote',
	url: 'https://recipes.verge.io',
	auto_refresh: true,
	max_tier: '1',
	enabled: true,
};

// ---------------------------------------------------------------------------
// VMRecipeService Tests
// ---------------------------------------------------------------------------

describe('VMRecipeService', () => {
	describe('CRUD with string keys', () => {
		it('list() calls /vm_recipes', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVMRecipe]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vm_recipes', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleVMRecipe]);
		});

		it('get() uses string key in URL', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleVMRecipe);

			const result = await svc.get(HEX_KEY);

			expect(http.get).toHaveBeenCalledWith(`/vm_recipes/${HEX_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleVMRecipe);
		});

		it('update() uses string key and does read-back', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleVMRecipe,
				description: 'updated',
			});

			const result = await svc.update(HEX_KEY, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith(`/vm_recipes/${HEX_KEY}`, {
				body: { description: 'updated' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() uses string key', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(HEX_KEY);

			expect(http.del).toHaveBeenCalledWith(`/vm_recipes/${HEX_KEY}`);
		});
	});

	describe('getQuestions()', () => {
		it('queries /recipe_questions with correct filter', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			const questions = [
				{
					$key: 1,
					name: 'hostname',
					type: 'string',
					recipe: `vm_recipes/${HEX_KEY}`,
				},
			];
			vi.mocked(http.get).mockResolvedValueOnce(questions);

			const result = await svc.getQuestions(HEX_KEY);

			expect(http.get).toHaveBeenCalledWith('/recipe_questions', {
				params: { filter: `recipe eq 'vm_recipes/${HEX_KEY}'` },
			});
			expect(result).toEqual(questions);
		});
	});

	describe('getSections()', () => {
		it('queries /recipe_sections with correct filter', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			const sections = [{ $key: 1, name: 'General', recipe: `vm_recipes/${HEX_KEY}` }];
			vi.mocked(http.get).mockResolvedValueOnce(sections);

			const result = await svc.getSections(HEX_KEY);

			expect(http.get).toHaveBeenCalledWith('/recipe_sections', {
				params: { filter: `recipe eq 'vm_recipes/${HEX_KEY}'` },
			});
			expect(result).toEqual(sections);
		});
	});

	describe('deploy()', () => {
		it('POSTs to /vm_recipe_instances with recipe key and answers', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.deploy(HEX_KEY, {
				name: 'my-vm',
				answers: { hostname: 'my-vm', ram: 4096 },
				auto_update: true,
			});

			expect(http.post).toHaveBeenCalledWith('/vm_recipe_instances', {
				body: {
					recipe: HEX_KEY,
					name: 'my-vm',
					answers: { hostname: 'my-vm', ram: 4096 },
					auto_update: true,
				},
			});
		});

		it('omits optional fields when not provided', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.deploy(HEX_KEY, { name: 'minimal-vm' });

			expect(http.post).toHaveBeenCalledWith('/vm_recipe_instances', {
				body: {
					recipe: HEX_KEY,
					name: 'minimal-vm',
				},
			});
		});
	});

	describe('recipe actions', () => {
		it('download() dispatches to /vm_recipe_actions', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.download(HEX_KEY);

			expect(http.post).toHaveBeenCalledWith('/vm_recipe_actions', {
				body: { vm_recipe: HEX_KEY, action: 'download' },
			});
		});

		it('clone() dispatches to /vm_recipe_actions with params', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.clone(HEX_KEY, { new_name: 'cloned-recipe' });

			expect(http.post).toHaveBeenCalledWith('/vm_recipe_actions', {
				body: {
					vm_recipe: HEX_KEY,
					action: 'clone',
					params: { new_name: 'cloned-recipe' },
				},
			});
		});

		it('remove() dispatches to /vm_recipe_actions', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.remove(HEX_KEY);

			expect(http.post).toHaveBeenCalledWith('/vm_recipe_actions', {
				body: { vm_recipe: HEX_KEY, action: 'remove' },
			});
		});

		it('republish() dispatches to /vm_recipe_actions', async () => {
			const http = mockHttp();
			const svc = new VMRecipeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.republish(HEX_KEY);

			expect(http.post).toHaveBeenCalledWith('/vm_recipe_actions', {
				body: { vm_recipe: HEX_KEY, action: 'republish' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.vmRecipes', async () => {
			await import('../../src/services/vm-recipe/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.vmRecipes).toBeDefined();
			expect(client.vmRecipes).toBeInstanceOf(VMRecipeService);
		});
	});
});

// ---------------------------------------------------------------------------
// TenantRecipeService Tests
// ---------------------------------------------------------------------------

describe('TenantRecipeService', () => {
	describe('CRUD with string keys', () => {
		it('list() calls /tenant_recipes', async () => {
			const http = mockHttp();
			const svc = new TenantRecipeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenantRecipe]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tenant_recipes', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTenantRecipe]);
		});

		it('get() uses string key', async () => {
			const http = mockHttp();
			const svc = new TenantRecipeService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenantRecipe);

			const result = await svc.get(HEX_KEY);

			expect(http.get).toHaveBeenCalledWith(`/tenant_recipes/${HEX_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleTenantRecipe);
		});
	});

	describe('getQuestions()', () => {
		it('queries with tenant_recipes prefix in filter', async () => {
			const http = mockHttp();
			const svc = new TenantRecipeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.getQuestions(HEX_KEY);

			expect(http.get).toHaveBeenCalledWith('/recipe_questions', {
				params: { filter: `recipe eq 'tenant_recipes/${HEX_KEY}'` },
			});
		});
	});

	describe('getSections()', () => {
		it('queries with tenant_recipes prefix in filter', async () => {
			const http = mockHttp();
			const svc = new TenantRecipeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.getSections(HEX_KEY);

			expect(http.get).toHaveBeenCalledWith('/recipe_sections', {
				params: { filter: `recipe eq 'tenant_recipes/${HEX_KEY}'` },
			});
		});
	});

	describe('deploy()', () => {
		it('POSTs to /tenant_recipe_instances without auto_update', async () => {
			const http = mockHttp();
			const svc = new TenantRecipeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.deploy(HEX_KEY, {
				name: 'my-tenant',
				answers: { hostname: 'my-tenant' },
			});

			expect(http.post).toHaveBeenCalledWith('/tenant_recipe_instances', {
				body: {
					recipe: HEX_KEY,
					name: 'my-tenant',
					answers: { hostname: 'my-tenant' },
				},
			});
		});
	});

	describe('recipe actions', () => {
		it('download() dispatches to /tenant_recipe_actions with tenant_recipe FK', async () => {
			const http = mockHttp();
			const svc = new TenantRecipeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.download(HEX_KEY);

			expect(http.post).toHaveBeenCalledWith('/tenant_recipe_actions', {
				body: { tenant_recipe: HEX_KEY, action: 'download' },
			});
		});

		it('clone() dispatches to /tenant_recipe_actions', async () => {
			const http = mockHttp();
			const svc = new TenantRecipeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.clone(HEX_KEY);

			expect(http.post).toHaveBeenCalledWith('/tenant_recipe_actions', {
				body: { tenant_recipe: HEX_KEY, action: 'clone' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tenantRecipes', async () => {
			await import('../../src/services/tenant-recipe/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tenantRecipes).toBeDefined();
			expect(client.tenantRecipes).toBeInstanceOf(TenantRecipeService);
		});
	});
});

// ---------------------------------------------------------------------------
// VMRecipeInstanceService Tests
// ---------------------------------------------------------------------------

describe('VMRecipeInstanceService', () => {
	describe('CRUD with integer keys', () => {
		it('list() calls /vm_recipe_instances', async () => {
			const http = mockHttp();
			const svc = new VMRecipeInstanceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVMRecipeInstance]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vm_recipe_instances', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleVMRecipeInstance]);
		});

		it('create() POSTs with recipe key, name, answers, and auto_update', async () => {
			const http = mockHttp();
			const svc = new VMRecipeInstanceService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 42 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleVMRecipeInstance);

			const result = await svc.create({
				recipe: HEX_KEY,
				name: 'my-deployed-vm',
				answers: { hostname: 'my-vm', ram: 4096 },
				auto_update: true,
			});

			expect(http.post).toHaveBeenCalledWith('/vm_recipe_instances', {
				body: {
					recipe: HEX_KEY,
					name: 'my-deployed-vm',
					answers: { hostname: 'my-vm', ram: 4096 },
					auto_update: true,
				},
			});
			expect(result.$key).toBe(42);
		});

		it('update() can set update/verify/simulate flags', async () => {
			const http = mockHttp();
			const svc = new VMRecipeInstanceService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleVMRecipeInstance,
				update: true,
			});

			const result = await svc.update(42, { update: true });

			expect(http.put).toHaveBeenCalledWith('/vm_recipe_instances/42', {
				body: { update: true },
			});
			expect(result.update).toBe(true);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.vmRecipeInstances', async () => {
			await import('../../src/services/vm-recipe-instance/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.vmRecipeInstances).toBeDefined();
			expect(client.vmRecipeInstances).toBeInstanceOf(VMRecipeInstanceService);
		});
	});
});

// ---------------------------------------------------------------------------
// TenantRecipeInstanceService Tests
// ---------------------------------------------------------------------------

describe('TenantRecipeInstanceService', () => {
	describe('CRUD with integer keys', () => {
		it('list() calls /tenant_recipe_instances', async () => {
			const http = mockHttp();
			const svc = new TenantRecipeInstanceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTenantRecipeInstance]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tenant_recipe_instances', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTenantRecipeInstance]);
		});

		it('create() POSTs without auto_update (tenant instances lack it)', async () => {
			const http = mockHttp();
			const svc = new TenantRecipeInstanceService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 43 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleTenantRecipeInstance);

			const result = await svc.create({
				recipe: HEX_KEY,
				name: 'my-deployed-tenant',
				answers: { hostname: 'my-tenant' },
			});

			expect(http.post).toHaveBeenCalledWith('/tenant_recipe_instances', {
				body: {
					recipe: HEX_KEY,
					name: 'my-deployed-tenant',
					answers: { hostname: 'my-tenant' },
				},
			});
			expect(result.$key).toBe(43);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tenantRecipeInstances', async () => {
			await import('../../src/services/tenant-recipe-instance/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tenantRecipeInstances).toBeDefined();
			expect(client.tenantRecipeInstances).toBeInstanceOf(TenantRecipeInstanceService);
		});
	});
});

// ---------------------------------------------------------------------------
// CatalogService Tests
// ---------------------------------------------------------------------------

describe('CatalogService', () => {
	describe('CRUD with string keys', () => {
		it('list() calls /catalogs', async () => {
			const http = mockHttp();
			const svc = new CatalogService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleCatalog]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/catalogs', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleCatalog]);
		});

		it('get() uses string key', async () => {
			const http = mockHttp();
			const svc = new CatalogService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleCatalog);

			const result = await svc.get(HEX_KEY);

			expect(http.get).toHaveBeenCalledWith(`/catalogs/${HEX_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleCatalog);
		});

		it('update() uses string key and does read-back', async () => {
			const http = mockHttp();
			const svc = new CatalogService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleCatalog,
				publishing_scope: 'private',
			});

			const result = await svc.update(HEX_KEY, { publishing_scope: 'private' });

			expect(http.put).toHaveBeenCalledWith(`/catalogs/${HEX_KEY}`, {
				body: { publishing_scope: 'private' },
			});
			expect(result.publishing_scope).toBe('private');
		});

		it('delete() uses string key', async () => {
			const http = mockHttp();
			const svc = new CatalogService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(HEX_KEY);

			expect(http.del).toHaveBeenCalledWith(`/catalogs/${HEX_KEY}`);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.catalogs', async () => {
			await import('../../src/services/catalog/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.catalogs).toBeDefined();
			expect(client.catalogs).toBeInstanceOf(CatalogService);
		});
	});
});

// ---------------------------------------------------------------------------
// CatalogRepositoryService Tests
// ---------------------------------------------------------------------------

describe('CatalogRepositoryService', () => {
	describe('CRUD with integer keys', () => {
		it('list() calls /catalog_repositories', async () => {
			const http = mockHttp();
			const svc = new CatalogRepositoryService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleRepository]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/catalog_repositories', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleRepository]);
		});

		it('create() POSTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new CatalogRepositoryService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleRepository,
				$key: 2,
			});

			const result = await svc.create({
				name: 'New Repo',
				url: 'https://recipes.example.com',
			});

			expect(http.post).toHaveBeenCalledWith('/catalog_repositories', {
				body: { name: 'New Repo', url: 'https://recipes.example.com' },
			});
			expect(result.$key).toBe(2);
		});

		it('delete() uses integer key', async () => {
			const http = mockHttp();
			const svc = new CatalogRepositoryService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/catalog_repositories/1');
		});
	});

	describe('refresh()', () => {
		it('dispatches refresh action to /catalog_repository_actions', async () => {
			const http = mockHttp();
			const svc = new CatalogRepositoryService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refresh(1);

			expect(http.post).toHaveBeenCalledWith('/catalog_repository_actions', {
				body: { repository: 1, action: 'refresh' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.catalogRepositories', async () => {
			await import('../../src/services/catalog-repository/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.catalogRepositories).toBeDefined();
			expect(client.catalogRepositories).toBeInstanceOf(CatalogRepositoryService);
		});
	});
});
