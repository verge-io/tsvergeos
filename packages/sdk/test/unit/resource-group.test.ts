import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { ResourceGroupService } from '../../src/services/resource-group/service.js';
import type { ResourceGroup } from '../../src/services/resource-group/types.js';

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

const sampleResourceGroup: ResourceGroup = {
	$key: 1,
	name: 'GPU Pool',
	type: 'Host GPU',
	class: 'gpu',
	created: 1700000000,
	modified: 1700000100,
};

// ---------------------------------------------------------------------------
// ResourceGroupService Tests
// ---------------------------------------------------------------------------

describe('ResourceGroupService', () => {
	describe('constructor', () => {
		it('uses /resource_groups resource path', async () => {
			const http = mockHttp();
			const svc = new ResourceGroupService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleResourceGroup]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/resource_groups', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /resource_groups/{key}', async () => {
			const http = mockHttp();
			const svc = new ResourceGroupService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleResourceGroup);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/resource_groups/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleResourceGroup);
		});

		it('create() POSTs to /resource_groups and does read-back', async () => {
			const http = mockHttp();
			const svc = new ResourceGroupService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleResourceGroup);

			const result = await svc.create({
				name: 'GPU Pool',
				type: 'Host GPU',
			});

			expect(http.post).toHaveBeenCalledWith('/resource_groups', {
				body: { name: 'GPU Pool', type: 'Host GPU' },
			});
			expect(result).toEqual(sampleResourceGroup);
		});

		it('update() PUTs to /resource_groups/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new ResourceGroupService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleResourceGroup,
				name: 'Updated',
			});

			const result = await svc.update(1, { name: 'Updated' });

			expect(http.put).toHaveBeenCalledWith('/resource_groups/1', {
				body: { name: 'Updated' },
			});
			expect(result.name).toBe('Updated');
		});

		it('delete() DELETEs /resource_groups/{key}', async () => {
			const http = mockHttp();
			const svc = new ResourceGroupService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/resource_groups/1');
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.resourceGroups', async () => {
			await import('../../src/services/resource-group/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.resourceGroups).toBeDefined();
			expect(client.resourceGroups).toBeInstanceOf(ResourceGroupService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/resource-group/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.resourceGroups;
			const second = client.resourceGroups;
			expect(first).toBe(second);
		});
	});
});
