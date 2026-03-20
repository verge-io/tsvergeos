import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { CloudInitFileService } from '../../src/services/cloud-init/service.js';
import type { CloudInitFile } from '../../src/services/cloud-init/types.js';
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

const sampleCloudInit: CloudInitFile = {
	$key: 1,
	name: 'ubuntu-cloudinit',
	data: '#cloud-config\npackages:\n  - nginx',
	render: 'none',
	created: 1700000000,
	modified: 1700000100,
};

const sampleResourceGroup: ResourceGroup = {
	$key: 1,
	name: 'GPU Pool',
	type: 'Host GPU',
	class: 'gpu',
	created: 1700000000,
	modified: 1700000100,
};

// ---------------------------------------------------------------------------
// CloudInitFileService Tests
// ---------------------------------------------------------------------------

describe('CloudInitFileService', () => {
	describe('constructor', () => {
		it('uses /cloudinit_files resource path', async () => {
			const http = mockHttp();
			const svc = new CloudInitFileService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleCloudInit]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/cloudinit_files', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /cloudinit_files/{key}', async () => {
			const http = mockHttp();
			const svc = new CloudInitFileService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleCloudInit);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/cloudinit_files/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleCloudInit);
		});

		it('create() POSTs to /cloudinit_files and does read-back', async () => {
			const http = mockHttp();
			const svc = new CloudInitFileService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleCloudInit);

			const result = await svc.create({
				name: 'ubuntu-cloudinit',
				data: '#cloud-config\npackages:\n  - nginx',
			});

			expect(http.post).toHaveBeenCalledWith('/cloudinit_files', {
				body: {
					name: 'ubuntu-cloudinit',
					data: '#cloud-config\npackages:\n  - nginx',
				},
			});
			expect(result).toEqual(sampleCloudInit);
		});

		it('update() PUTs to /cloudinit_files/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new CloudInitFileService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleCloudInit,
				name: 'Updated',
			});

			const result = await svc.update(1, { name: 'Updated' });

			expect(http.put).toHaveBeenCalledWith('/cloudinit_files/1', {
				body: { name: 'Updated' },
			});
			expect(result.name).toBe('Updated');
		});

		it('delete() DELETEs /cloudinit_files/{key}', async () => {
			const http = mockHttp();
			const svc = new CloudInitFileService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/cloudinit_files/1');
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.cloudInitFiles', async () => {
			await import('../../src/services/cloud-init/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.cloudInitFiles).toBeDefined();
			expect(client.cloudInitFiles).toBeInstanceOf(CloudInitFileService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/cloud-init/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.cloudInitFiles;
			const second = client.cloudInitFiles;
			expect(first).toBe(second);
		});
	});
});

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
