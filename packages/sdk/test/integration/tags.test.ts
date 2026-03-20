import { afterAll, beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/tag-category/index.js';
import '../../src/services/tag/index.js';
import '../../src/services/tag-member/index.js';
import '../../src/services/vm/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Tags, TagCategories & TagMembers integration', () => {
	let client: VergeClient;

	// Track created resources for cleanup
	let createdCategoryKey: number | string | undefined;
	let createdTagKey: number | string | undefined;
	let createdTagMemberKey: number | string | undefined;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	afterAll(async () => {
		// Clean up in reverse order: members → tags → categories
		try {
			if (createdTagMemberKey !== undefined) {
				await delay();
				await client.tagMembers.delete(createdTagMemberKey);
			}
		} catch {
			// Already cleaned up or cascade-deleted
		}
		try {
			if (createdTagKey !== undefined) {
				await delay();
				await client.tags.delete(createdTagKey);
			}
		} catch {
			// Already cleaned up or cascade-deleted
		}
		try {
			if (createdCategoryKey !== undefined) {
				await delay();
				await client.tagCategories.delete(createdCategoryKey);
			}
		} catch {
			// Already cleaned up
		}
	});

	// ── Tag Categories ───────────────────────────────────────────────────────

	it('should create a tag category', async () => {
		await delay();
		const category = await client.tagCategories.create({
			name: `ts-sdk-test-category-${Date.now()}`,
			description: 'Integration test category',
			single_tag_selection: false,
			taggable_vms: true,
			taggable_vnets: true,
		});

		expect(category.$key).toBeDefined();
		expect(category.name).toContain('ts-sdk-test-category-');
		createdCategoryKey = category.$key;
	});

	it('should get a tag category by key', async () => {
		expect(createdCategoryKey).toBeDefined();

		await delay();
		const category = await client.tagCategories.get(createdCategoryKey!);

		expect(category.$key).toBe(createdCategoryKey);
		expect(category.description).toBe('Integration test category');
		expect(category.taggable_vms).toBe(true);
		expect(category.taggable_vnets).toBe(true);
	});

	it('should list tag categories', async () => {
		await delay();
		const categories = await client.tagCategories.list({ limit: 50 });

		expect(Array.isArray(categories)).toBe(true);
		// Should include our created category
		const found = categories.find((c) => c.$key === createdCategoryKey);
		expect(found).toBeDefined();
	});

	it('should update a tag category', async () => {
		expect(createdCategoryKey).toBeDefined();

		await delay();
		const updated = await client.tagCategories.update(createdCategoryKey!, {
			description: 'Updated integration test category',
			single_tag_selection: true,
		});

		expect(updated.$key).toBe(createdCategoryKey);
		expect(updated.description).toBe('Updated integration test category');
		expect(updated.single_tag_selection).toBe(true);
	});

	// ── Tags ─────────────────────────────────────────────────────────────────

	it('should create a tag in the category', async () => {
		expect(createdCategoryKey).toBeDefined();

		await delay();
		const tag = await client.tags.create({
			name: `ts-sdk-test-tag-${Date.now()}`,
			description: 'Integration test tag',
			category: createdCategoryKey!,
		});

		expect(tag.$key).toBeDefined();
		expect(tag.name).toContain('ts-sdk-test-tag-');
		expect(String(tag.category)).toBe(String(createdCategoryKey));
		createdTagKey = tag.$key;
	});

	it('should get a tag by key', async () => {
		expect(createdTagKey).toBeDefined();

		await delay();
		const tag = await client.tags.get(createdTagKey!);

		expect(tag.$key).toBe(createdTagKey);
		expect(tag.description).toBe('Integration test tag');
	});

	it('should list tags by category', async () => {
		expect(createdCategoryKey).toBeDefined();
		expect(createdTagKey).toBeDefined();

		await delay();
		const tags = await client.tags.listByCategory(createdCategoryKey!);

		expect(Array.isArray(tags)).toBe(true);
		expect(tags.length).toBeGreaterThanOrEqual(1);
		const found = tags.find((t) => t.$key === createdTagKey);
		expect(found).toBeDefined();
		// All returned tags should reference the parent category
		for (const tag of tags) {
			expect(String(tag.category)).toBe(String(createdCategoryKey));
		}
	});

	it('should update a tag', async () => {
		expect(createdTagKey).toBeDefined();

		await delay();
		const updated = await client.tags.update(createdTagKey!, {
			description: 'Updated integration test tag',
		});

		expect(updated.$key).toBe(createdTagKey);
		expect(updated.description).toBe('Updated integration test tag');
	});

	// ── Tag Members ──────────────────────────────────────────────────────────

	it('should assign a tag to a VM (tag member)', async () => {
		expect(createdTagKey).toBeDefined();

		// Find a VM to tag
		await delay();
		const vms = await client.vms.list({ limit: 1 });

		if (vms.length === 0) {
			// No VMs on this system — skip gracefully
			return;
		}

		const vmKey = vms[0].$key;
		const memberRef = `vms/${vmKey}`;

		await delay();
		const tagMember = await client.tagMembers.assign(createdTagKey!, memberRef);

		expect(tagMember.$key).toBeDefined();
		expect(String(tagMember.tag)).toBe(String(createdTagKey));
		expect(tagMember.member).toBe(memberRef);
		createdTagMemberKey = tagMember.$key;
	});

	it('should list tag members by tag', async () => {
		if (createdTagMemberKey === undefined) {
			// No VM was available to tag — skip
			return;
		}

		await delay();
		const members = await client.tagMembers.listByTag(createdTagKey!);

		expect(Array.isArray(members)).toBe(true);
		expect(members.length).toBeGreaterThanOrEqual(1);
		const found = members.find((m) => m.$key === createdTagMemberKey);
		expect(found).toBeDefined();
	});

	it('should list tag members by member reference', async () => {
		if (createdTagMemberKey === undefined) {
			return;
		}

		// Find the member reference from our created tag member
		await delay();
		const tagMember = await client.tagMembers.get(createdTagMemberKey!);
		const memberRef = tagMember.member;

		await delay();
		const members = await client.tagMembers.listByMember(memberRef);

		expect(Array.isArray(members)).toBe(true);
		expect(members.length).toBeGreaterThanOrEqual(1);
		const found = members.find((m) => m.$key === createdTagMemberKey);
		expect(found).toBeDefined();
	});

	it('should unassign a tag (delete tag member)', async () => {
		if (createdTagMemberKey === undefined) {
			return;
		}

		// Get the member ref before unassigning
		await delay();
		const tagMember = await client.tagMembers.get(createdTagMemberKey!);

		await delay();
		await client.tagMembers.unassign(createdTagKey!, tagMember.member);

		// Verify it's gone
		await delay();
		const remaining = await client.tagMembers.listByTag(createdTagKey!);
		const found = remaining.find((m) => m.$key === createdTagMemberKey);
		expect(found).toBeUndefined();

		// Clear so afterAll doesn't try to delete again
		createdTagMemberKey = undefined;
	});

	// ── Cascade Cleanup ──────────────────────────────────────────────────────

	it('should delete tag (cascades to members)', async () => {
		expect(createdTagKey).toBeDefined();

		await delay();
		await client.tags.delete(createdTagKey!);

		// Clear so afterAll doesn't double-delete
		createdTagKey = undefined;
	});

	it('should delete tag category', async () => {
		expect(createdCategoryKey).toBeDefined();

		await delay();
		await client.tagCategories.delete(createdCategoryKey!);

		// Clear so afterAll doesn't double-delete
		createdCategoryKey = undefined;
	});
});
