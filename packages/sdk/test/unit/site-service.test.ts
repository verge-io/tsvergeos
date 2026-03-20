import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { SiteService } from '../../src/services/site/service.js';
import type { Site } from '../../src/services/site/types.js';

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
// Sample resource
// ---------------------------------------------------------------------------

const sampleSite: Site = {
	$key: 1,
	name: 'DR Site',
	description: 'Disaster recovery site',
	url: 'https://remote-verge.example.com',
	status: 'idle',
	authentication_status: 'authenticated',
	latitude: 40.7128,
	longitude: -74.006,
	timezone: 'America/New_York',
	city: 'New York',
	country: 'US',
	config_cloud_snapshots: 'both',
	config_statistics: 'both',
	config_management: 'manage',
	config_repair_server: 'disabled',
	incoming_syncs_enabled: true,
	outgoing_syncs_enabled: true,
};

// ---------------------------------------------------------------------------
// SiteService Tests
// ---------------------------------------------------------------------------

describe('SiteService', () => {
	describe('CRUD', () => {
		it('list() calls /sites', async () => {
			const http = mockHttp();
			const svc = new SiteService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleSite]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/sites', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleSite]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new SiteService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleSite);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/sites/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleSite);
		});

		it('create() POSTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new SiteService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce({ ...sampleSite, $key: 2 });

			const result = await svc.create({
				url: 'https://new-site.example.com',
				name: 'New Site',
				auth_user: 'admin',
				auth_password: 'secret',
			});

			expect(http.post).toHaveBeenCalledWith('/sites', {
				body: {
					url: 'https://new-site.example.com',
					name: 'New Site',
					auth_user: 'admin',
					auth_password: 'secret',
				},
			});
			expect(http.get).toHaveBeenCalledWith('/sites/2', {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(2);
		});

		it('update() PUTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new SiteService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleSite,
				description: 'updated',
			});

			const result = await svc.update(1, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/sites/1', {
				body: { description: 'updated' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() calls DELETE on /sites/{key}', async () => {
			const http = mockHttp();
			const svc = new SiteService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/sites/1');
		});
	});

	describe('actions', () => {
		it('refresh() dispatches to /site_actions with FK field "site"', async () => {
			const http = mockHttp();
			const svc = new SiteService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refresh(1);

			expect(http.post).toHaveBeenCalledWith('/site_actions', {
				body: { site: 1, action: 'refresh' },
			});
		});

		it('refreshSettings() dispatches refresh_settings action', async () => {
			const http = mockHttp();
			const svc = new SiteService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refreshSettings(1);

			expect(http.post).toHaveBeenCalledWith('/site_actions', {
				body: { site: 1, action: 'refresh_settings' },
			});
		});

		it('reauthenticate() dispatches reauthenticate action', async () => {
			const http = mockHttp();
			const svc = new SiteService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.reauthenticate(5);

			expect(http.post).toHaveBeenCalledWith('/site_actions', {
				body: { site: 5, action: 'reauthenticate' },
			});
		});

		it('runUpdates() dispatches run_updates action', async () => {
			const http = mockHttp();
			const svc = new SiteService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.runUpdates(3);

			expect(http.post).toHaveBeenCalledWith('/site_actions', {
				body: { site: 3, action: 'run_updates' },
			});
		});

		it('clearSyncedLogs() dispatches clear_synced_logs action', async () => {
			const http = mockHttp();
			const svc = new SiteService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.clearSyncedLogs(2);

			expect(http.post).toHaveBeenCalledWith('/site_actions', {
				body: { site: 2, action: 'clear_synced_logs' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.sites', async () => {
			await import('../../src/services/site/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.sites).toBeDefined();
			expect(client.sites).toBeInstanceOf(SiteService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/site/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.sites).toBe(client.sites);
		});
	});
});
