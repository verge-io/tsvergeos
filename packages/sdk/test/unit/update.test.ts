import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { UpdateBranchService } from '../../src/services/update-branch/service.js';
import type { UpdateBranch } from '../../src/services/update-branch/types.js';
import { UpdateSettingsService } from '../../src/services/update-settings/service.js';
import type { UpdateSettings } from '../../src/services/update-settings/types.js';
import { UpdateSourceService } from '../../src/services/update-source/service.js';
import type { UpdateSource } from '../../src/services/update-source/types.js';
import { UpdateSourcePackageService } from '../../src/services/update-source-package/service.js';
import type { UpdateSourcePackage } from '../../src/services/update-source-package/types.js';

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

const sampleSettings: UpdateSettings = {
	$key: 1,
	branch: 1,
	auto_update: false,
	auto_reboot: false,
	modified: 1700000000,
};

const sampleSource: UpdateSource = {
	$key: 1,
	name: 'Main Update Server',
	url: 'https://updates.verge.io',
	enabled: true,
	created: 1700000000,
	modified: 1700000100,
};

const sampleBranch: UpdateBranch = {
	$key: 1,
	description: 'Stable',
	modified: 1700000000,
};

const samplePackage: UpdateSourcePackage = {
	$key: 1,
	branch: 1,
	source: 1,
	version: '6.1.0',
	modified: 1700000000,
};

// ---------------------------------------------------------------------------
// UpdateSettingsService Tests
// ---------------------------------------------------------------------------

describe('UpdateSettingsService', () => {
	describe('get', () => {
		it('GETs /update_settings/1 with fields=most', async () => {
			const http = mockHttp();
			const svc = new UpdateSettingsService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleSettings);

			const result = await svc.get();

			expect(http.get).toHaveBeenCalledWith('/update_settings/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleSettings);
		});
	});

	describe('update', () => {
		it('PUTs to /update_settings/1 and does read-back', async () => {
			const http = mockHttp();
			const svc = new UpdateSettingsService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleSettings,
				auto_update: true,
			});

			const result = await svc.update({ auto_update: true });

			expect(http.put).toHaveBeenCalledWith('/update_settings/1', {
				body: { auto_update: true },
			});
			expect(http.get).toHaveBeenCalledWith('/update_settings/1', {
				params: { fields: 'most' },
			});
			expect(result.auto_update).toBe(true);
		});

		it('skips read-back when readBack: false', async () => {
			const http = mockHttp();
			const svc = new UpdateSettingsService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);

			const result = await svc.update({ auto_update: true }, { readBack: false });

			expect(http.put).toHaveBeenCalledWith('/update_settings/1', {
				body: { auto_update: true },
			});
			expect(http.get).not.toHaveBeenCalled();
			expect(result.$key).toBe(1);
		});
	});

	describe('inline actions', () => {
		it('checkForUpdates() POSTs to /update_settings/1/check', async () => {
			const http = mockHttp();
			const svc = new UpdateSettingsService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.checkForUpdates();

			expect(http.post).toHaveBeenCalledWith('/update_settings/1/check');
		});

		it('downloadUpdates() POSTs to /update_settings/1/download', async () => {
			const http = mockHttp();
			const svc = new UpdateSettingsService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.downloadUpdates();

			expect(http.post).toHaveBeenCalledWith('/update_settings/1/download');
		});

		it('installUpdates() POSTs to /update_settings/1/install', async () => {
			const http = mockHttp();
			const svc = new UpdateSettingsService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.installUpdates();

			expect(http.post).toHaveBeenCalledWith('/update_settings/1/install');
		});

		it('updateAll() POSTs to /update_settings/1/all', async () => {
			const http = mockHttp();
			const svc = new UpdateSettingsService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.updateAll();

			expect(http.post).toHaveBeenCalledWith('/update_settings/1/all');
		});
	});

	describe('singleton enforcement', () => {
		it('does not have list method', () => {
			const http = mockHttp();
			const svc = new UpdateSettingsService(http);

			expect((svc as Record<string, unknown>).list).toBeUndefined();
		});

		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new UpdateSettingsService(http);

			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new UpdateSettingsService(http);

			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.updateSettings', async () => {
			await import('../../src/services/update-settings/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.updateSettings).toBeDefined();
			expect(client.updateSettings).toBeInstanceOf(UpdateSettingsService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/update-settings/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.updateSettings;
			const second = client.updateSettings;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// UpdateSourceService Tests
// ---------------------------------------------------------------------------

describe('UpdateSourceService', () => {
	describe('constructor', () => {
		it('uses /update_sources resource path', async () => {
			const http = mockHttp();
			const svc = new UpdateSourceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSource]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/update_sources', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /update_sources/{key}', async () => {
			const http = mockHttp();
			const svc = new UpdateSourceService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleSource);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/update_sources/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleSource);
		});

		it('create() POSTs to /update_sources and does read-back', async () => {
			const http = mockHttp();
			const svc = new UpdateSourceService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleSource);

			const result = await svc.create({
				name: 'Main Update Server',
				url: 'https://updates.verge.io',
			});

			expect(http.post).toHaveBeenCalledWith('/update_sources', {
				body: { name: 'Main Update Server', url: 'https://updates.verge.io' },
			});
			expect(result).toEqual(sampleSource);
		});

		it('delete() DELETEs /update_sources/{key}', async () => {
			const http = mockHttp();
			const svc = new UpdateSourceService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/update_sources/1');
		});
	});

	describe('actions via /update_actions with FK key "source"', () => {
		it('refresh() dispatches to /update_actions with source FK', async () => {
			const http = mockHttp();
			const svc = new UpdateSourceService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refresh(1);

			expect(http.post).toHaveBeenCalledWith('/update_actions', {
				body: { source: 1, action: 'refresh' },
			});
		});

		it('download() dispatches to /update_actions', async () => {
			const http = mockHttp();
			const svc = new UpdateSourceService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.download(1);

			expect(http.post).toHaveBeenCalledWith('/update_actions', {
				body: { source: 1, action: 'download' },
			});
		});

		it('install() dispatches to /update_actions', async () => {
			const http = mockHttp();
			const svc = new UpdateSourceService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.install(1);

			expect(http.post).toHaveBeenCalledWith('/update_actions', {
				body: { source: 1, action: 'install' },
			});
		});

		it('apply() dispatches to /update_actions', async () => {
			const http = mockHttp();
			const svc = new UpdateSourceService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.apply(1);

			expect(http.post).toHaveBeenCalledWith('/update_actions', {
				body: { source: 1, action: 'apply' },
			});
		});

		it('refreshCounts() dispatches to /update_actions', async () => {
			const http = mockHttp();
			const svc = new UpdateSourceService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refreshCounts(1);

			expect(http.post).toHaveBeenCalledWith('/update_actions', {
				body: { source: 1, action: 'refresh_counts' },
			});
		});

		it('all() dispatches to /update_actions', async () => {
			const http = mockHttp();
			const svc = new UpdateSourceService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.all(1);

			expect(http.post).toHaveBeenCalledWith('/update_actions', {
				body: { source: 1, action: 'all' },
			});
		});

		it('runAction() dispatches arbitrary action with params', async () => {
			const http = mockHttp();
			const svc = new UpdateSourceService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.runAction('refresh', 1, { force: true });

			expect(http.post).toHaveBeenCalledWith('/update_actions', {
				body: { source: 1, action: 'refresh', params: { force: true } },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.updateSources', async () => {
			await import('../../src/services/update-source/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.updateSources).toBeDefined();
			expect(client.updateSources).toBeInstanceOf(UpdateSourceService);
		});
	});
});

// ---------------------------------------------------------------------------
// UpdateBranchService Tests
// ---------------------------------------------------------------------------

describe('UpdateBranchService', () => {
	describe('constructor', () => {
		it('uses /update_branches resource path', async () => {
			const http = mockHttp();
			const svc = new UpdateBranchService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleBranch]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/update_branches', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new UpdateBranchService(http);

			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new UpdateBranchService(http);

			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new UpdateBranchService(http);

			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('get', () => {
		it('calls /update_branches/{key}', async () => {
			const http = mockHttp();
			const svc = new UpdateBranchService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleBranch);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/update_branches/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleBranch);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.updateBranches', async () => {
			await import('../../src/services/update-branch/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.updateBranches).toBeDefined();
			expect(client.updateBranches).toBeInstanceOf(UpdateBranchService);
		});
	});
});

// ---------------------------------------------------------------------------
// UpdateSourcePackageService Tests
// ---------------------------------------------------------------------------

describe('UpdateSourcePackageService', () => {
	describe('constructor', () => {
		it('uses /update_source_packages resource path', async () => {
			const http = mockHttp();
			const svc = new UpdateSourcePackageService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePackage]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/update_source_packages', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new UpdateSourcePackageService(http);

			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new UpdateSourcePackageService(http);

			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});

		it('does not have delete method', () => {
			const http = mockHttp();
			const svc = new UpdateSourcePackageService(http);

			expect((svc as Record<string, unknown>).delete).toBeUndefined();
		});
	});

	describe('listByBranchAndSource', () => {
		it('filters by branch and source FKs', async () => {
			const http = mockHttp();
			const svc = new UpdateSourcePackageService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePackage]);

			const result = await svc.listByBranchAndSource(1, 2);

			expect(http.get).toHaveBeenCalledWith('/update_source_packages', {
				params: { fields: 'most', filter: 'branch eq 1 and source eq 2' },
			});
			expect(result).toEqual([samplePackage]);
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new UpdateSourcePackageService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByBranchAndSource(1, 2, { sort: 'version', limit: 5 });

			expect(http.get).toHaveBeenCalledWith('/update_source_packages', {
				params: {
					fields: 'most',
					filter: 'branch eq 1 and source eq 2',
					sort: 'version',
					limit: 5,
				},
			});
		});
	});

	describe('listByBranch', () => {
		it('filters by branch FK', async () => {
			const http = mockHttp();
			const svc = new UpdateSourcePackageService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePackage]);

			const result = await svc.listByBranch(1);

			expect(http.get).toHaveBeenCalledWith('/update_source_packages', {
				params: { fields: 'most', filter: 'branch eq 1' },
			});
			expect(result).toEqual([samplePackage]);
		});
	});

	describe('listBySource', () => {
		it('filters by source FK', async () => {
			const http = mockHttp();
			const svc = new UpdateSourcePackageService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePackage]);

			const result = await svc.listBySource(1);

			expect(http.get).toHaveBeenCalledWith('/update_source_packages', {
				params: { fields: 'most', filter: 'source eq 1' },
			});
			expect(result).toEqual([samplePackage]);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.updateSourcePackages', async () => {
			await import('../../src/services/update-source-package/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.updateSourcePackages).toBeDefined();
			expect(client.updateSourcePackages).toBeInstanceOf(UpdateSourcePackageService);
		});
	});
});
