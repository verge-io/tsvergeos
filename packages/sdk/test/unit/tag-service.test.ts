import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { TagService } from '../../src/services/tag/service.js';
import type { Tag } from '../../src/services/tag/types.js';
import { TagCategoryService } from '../../src/services/tag-category/service.js';
import type { TagCategory } from '../../src/services/tag-category/types.js';
import { TagMemberService } from '../../src/services/tag-member/service.js';
import type { TagMember } from '../../src/services/tag-member/types.js';

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

const sampleTagCategory: TagCategory = {
	$key: 1,
	name: 'Environment',
	description: 'Deployment environment',
	single_tag_selection: true,
	created: 1700000000,
	modified: 1700000100,
	taggable_vms: true,
	taggable_vnets: false,
	taggable_volumes: true,
	taggable_vnet_rules: false,
	taggable_vmware_containers: false,
	taggable_users: false,
	taggable_tenant_nodes: false,
	taggable_sites: false,
	taggable_nodes: false,
	taggable_groups: false,
	taggable_clusters: false,
	taggable_tenants: false,
};

const sampleTag: Tag = {
	$key: 10,
	name: 'production',
	description: 'Production environment',
	category: 1,
	created: 1700000000,
	modified: 1700000100,
};

const sampleTagMember: TagMember = {
	$key: 100,
	tag: 10,
	member: 'vms/42',
};

// ---------------------------------------------------------------------------
// TagCategoryService Tests
// ---------------------------------------------------------------------------

describe('TagCategoryService', () => {
	describe('read operations', () => {
		it('list() calls /tag_categories', async () => {
			const http = mockHttp();
			const svc = new TagCategoryService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTagCategory]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tag_categories', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTagCategory]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new TagCategoryService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleTagCategory);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/tag_categories/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleTagCategory);
		});
	});

	describe('write operations', () => {
		it('create() posts to /tag_categories and reads back', async () => {
			const http = mockHttp();
			const svc = new TagCategoryService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleTagCategory);

			const result = await svc.create({
				name: 'Environment',
				taggable_vms: true,
				single_tag_selection: true,
			});

			expect(http.post).toHaveBeenCalledWith('/tag_categories', {
				body: {
					name: 'Environment',
					taggable_vms: true,
					single_tag_selection: true,
				},
			});
			expect(http.get).toHaveBeenCalledWith('/tag_categories/1', {
				params: { fields: 'most' },
			});
			expect(result.name).toBe('Environment');
		});

		it('update() puts to /tag_categories/{key} and reads back', async () => {
			const http = mockHttp();
			const svc = new TagCategoryService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTagCategory,
				description: 'Updated description',
			});

			const result = await svc.update(1, {
				description: 'Updated description',
			});

			expect(http.put).toHaveBeenCalledWith('/tag_categories/1', {
				body: { description: 'Updated description' },
			});
			expect(result.description).toBe('Updated description');
		});

		it('delete() calls DEL /tag_categories/{key}', async () => {
			const http = mockHttp();
			const svc = new TagCategoryService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/tag_categories/1');
		});
	});

	describe('type shape', () => {
		it('TagCategory includes all taggable_* fields', () => {
			const category: TagCategory = sampleTagCategory;

			// Verify all 12 taggable_* fields exist on the type
			expect(category.taggable_vms).toBe(true);
			expect(category.taggable_vnets).toBe(false);
			expect(category.taggable_volumes).toBe(true);
			expect(category.taggable_vnet_rules).toBe(false);
			expect(category.taggable_vmware_containers).toBe(false);
			expect(category.taggable_users).toBe(false);
			expect(category.taggable_tenant_nodes).toBe(false);
			expect(category.taggable_sites).toBe(false);
			expect(category.taggable_nodes).toBe(false);
			expect(category.taggable_groups).toBe(false);
			expect(category.taggable_clusters).toBe(false);
			expect(category.taggable_tenants).toBe(false);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tagCategories', async () => {
			await import('../../src/services/tag-category/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tagCategories).toBeDefined();
			expect(client.tagCategories).toBeInstanceOf(TagCategoryService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/tag-category/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tagCategories).toBe(client.tagCategories);
		});
	});
});

// ---------------------------------------------------------------------------
// TagService Tests
// ---------------------------------------------------------------------------

describe('TagService', () => {
	describe('read operations', () => {
		it('list() calls /tags', async () => {
			const http = mockHttp();
			const svc = new TagService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTag]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tags', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTag]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new TagService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleTag);

			const result = await svc.get(10);

			expect(http.get).toHaveBeenCalledWith('/tags/10', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleTag);
		});
	});

	describe('write operations', () => {
		it('create() posts to /tags and reads back', async () => {
			const http = mockHttp();
			const svc = new TagService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 10 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleTag);

			const result = await svc.create({ name: 'production', category: 1 });

			expect(http.post).toHaveBeenCalledWith('/tags', {
				body: { name: 'production', category: 1 },
			});
			expect(http.get).toHaveBeenCalledWith('/tags/10', {
				params: { fields: 'most' },
			});
			expect(result.name).toBe('production');
		});

		it('update() puts to /tags/{key} and reads back', async () => {
			const http = mockHttp();
			const svc = new TagService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTag,
				description: 'Updated',
			});

			const result = await svc.update(10, { description: 'Updated' });

			expect(http.put).toHaveBeenCalledWith('/tags/10', {
				body: { description: 'Updated' },
			});
			expect(result.description).toBe('Updated');
		});

		it('delete() calls DEL /tags/{key}', async () => {
			const http = mockHttp();
			const svc = new TagService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(10);

			expect(http.del).toHaveBeenCalledWith('/tags/10');
		});
	});

	describe('listByCategory', () => {
		it('builds correct filter for category', async () => {
			const http = mockHttp();
			const svc = new TagService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTag]);

			const result = await svc.listByCategory(1);

			expect(http.get).toHaveBeenCalledWith('/tags', {
				params: { fields: 'most', filter: 'category eq 1' },
			});
			expect(result).toEqual([sampleTag]);
		});

		it('combines with existing filter', async () => {
			const http = mockHttp();
			const svc = new TagService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTag]);

			await svc.listByCategory(1, { filter: "name eq 'production'" });

			expect(http.get).toHaveBeenCalledWith('/tags', {
				params: {
					fields: 'most',
					filter: "category eq 1 and name eq 'production'",
				},
			});
		});

		it('works with string category key', async () => {
			const http = mockHttp();
			const svc = new TagService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByCategory('5');

			expect(http.get).toHaveBeenCalledWith('/tags', {
				params: { fields: 'most', filter: 'category eq 5' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tags', async () => {
			await import('../../src/services/tag/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tags).toBeDefined();
			expect(client.tags).toBeInstanceOf(TagService);
		});
	});
});

// ---------------------------------------------------------------------------
// TagMemberService Tests
// ---------------------------------------------------------------------------

describe('TagMemberService', () => {
	describe('read operations', () => {
		it('list() calls /tag_members', async () => {
			const http = mockHttp();
			const svc = new TagMemberService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTagMember]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tag_members', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTagMember]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new TagMemberService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleTagMember);

			const result = await svc.get(100);

			expect(http.get).toHaveBeenCalledWith('/tag_members/100', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleTagMember);
		});
	});

	describe('write operations', () => {
		it('create() posts to /tag_members and reads back', async () => {
			const http = mockHttp();
			const svc = new TagMemberService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 100 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleTagMember);

			const result = await svc.create({ tag: 10, member: 'vms/42' });

			expect(http.post).toHaveBeenCalledWith('/tag_members', {
				body: { tag: 10, member: 'vms/42' },
			});
			expect(http.get).toHaveBeenCalledWith('/tag_members/100', {
				params: { fields: 'most' },
			});
			expect(result.tag).toBe(10);
			expect(result.member).toBe('vms/42');
		});

		it('delete() calls DEL /tag_members/{key}', async () => {
			const http = mockHttp();
			const svc = new TagMemberService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(100);

			expect(http.del).toHaveBeenCalledWith('/tag_members/100');
		});
	});

	describe('listByTag', () => {
		it('builds correct filter for tag', async () => {
			const http = mockHttp();
			const svc = new TagMemberService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTagMember]);

			const result = await svc.listByTag(10);

			expect(http.get).toHaveBeenCalledWith('/tag_members', {
				params: { fields: 'most', filter: 'tag eq 10' },
			});
			expect(result).toEqual([sampleTagMember]);
		});

		it('combines with existing filter', async () => {
			const http = mockHttp();
			const svc = new TagMemberService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByTag(10, { filter: "member eq 'vms/42'" });

			expect(http.get).toHaveBeenCalledWith('/tag_members', {
				params: {
					fields: 'most',
					filter: "tag eq 10 and member eq 'vms/42'",
				},
			});
		});
	});

	describe('listByMember', () => {
		it('builds correct filter for member', async () => {
			const http = mockHttp();
			const svc = new TagMemberService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTagMember]);

			const result = await svc.listByMember('vms/42');

			expect(http.get).toHaveBeenCalledWith('/tag_members', {
				params: { fields: 'most', filter: "member eq 'vms/42'" },
			});
			expect(result).toEqual([sampleTagMember]);
		});

		it('combines with existing filter', async () => {
			const http = mockHttp();
			const svc = new TagMemberService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMember('vms/42', { filter: 'tag eq 10' });

			expect(http.get).toHaveBeenCalledWith('/tag_members', {
				params: {
					fields: 'most',
					filter: "member eq 'vms/42' and tag eq 10",
				},
			});
		});
	});

	describe('assign', () => {
		it('creates a tag member with tag and member', async () => {
			const http = mockHttp();
			const svc = new TagMemberService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 100 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleTagMember);

			const result = await svc.assign(10, 'vms/42');

			expect(http.post).toHaveBeenCalledWith('/tag_members', {
				body: { tag: 10, member: 'vms/42' },
			});
			expect(result.tag).toBe(10);
			expect(result.member).toBe('vms/42');
		});
	});

	describe('unassign', () => {
		it('looks up tag member and deletes it', async () => {
			const http = mockHttp();
			const svc = new TagMemberService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTagMember]);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.unassign(10, 'vms/42');

			expect(http.get).toHaveBeenCalledWith('/tag_members', {
				params: {
					fields: 'most',
					filter: "tag eq 10 and member eq 'vms/42'",
				},
			});
			expect(http.del).toHaveBeenCalledWith('/tag_members/100');
		});

		it('is a no-op when tag member not found', async () => {
			const http = mockHttp();
			const svc = new TagMemberService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.unassign(10, 'vms/99');

			expect(http.get).toHaveBeenCalled();
			expect(http.del).not.toHaveBeenCalled();
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tagMembers', async () => {
			await import('../../src/services/tag-member/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tagMembers).toBeDefined();
			expect(client.tagMembers).toBeInstanceOf(TagMemberService);
		});
	});
});
