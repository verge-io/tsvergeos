import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { SiteSyncIncomingService } from '../../src/services/site-sync-incoming/service.js';
import type { SiteSyncIncoming } from '../../src/services/site-sync-incoming/types.js';
import { SiteSyncOutgoingService } from '../../src/services/site-sync-outgoing/service.js';
import type { SiteSyncOutgoing } from '../../src/services/site-sync-outgoing/types.js';
import { SiteSyncProfilePeriodService } from '../../src/services/site-sync-profile-period/service.js';
import type { SiteSyncProfilePeriod } from '../../src/services/site-sync-profile-period/types.js';

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

const sampleIncoming: SiteSyncIncoming = {
	$key: 1,
	name: 'Incoming from DR',
	site: 1,
	sync_id: 'abcdef1234567890abcdef1234567890abcdef12',
	registration_code: 'REG-12345',
	status: 'syncing',
	state: 'online',
};

const sampleOutgoing: SiteSyncOutgoing = {
	$key: 1,
	name: 'Outgoing to DR',
	site: 1,
	threads: 4,
	file_threads: 2,
	encryption: true,
	compression: true,
	status: 'syncing',
	state: 'online',
};

const sampleProfilePeriod: SiteSyncProfilePeriod = {
	$key: 1,
	site_syncs_outgoing: 1,
	profile_period: 5,
	retention: 604800,
	priority: 1,
	do_not_expire: false,
};

// ---------------------------------------------------------------------------
// SiteSyncIncomingService Tests
// ---------------------------------------------------------------------------

describe('SiteSyncIncomingService', () => {
	describe('CRUD', () => {
		it('list() calls /site_syncs_incoming', async () => {
			const http = mockHttp();
			const svc = new SiteSyncIncomingService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleIncoming]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/site_syncs_incoming', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleIncoming]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new SiteSyncIncomingService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleIncoming);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/site_syncs_incoming/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleIncoming);
		});

		it('create() POSTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new SiteSyncIncomingService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce({ ...sampleIncoming, $key: 2 });

			const result = await svc.create({ site: 1, name: 'New Incoming' });

			expect(http.post).toHaveBeenCalledWith('/site_syncs_incoming', {
				body: { site: 1, name: 'New Incoming' },
			});
			expect(http.get).toHaveBeenCalledWith('/site_syncs_incoming/2', {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(2);
		});

		it('delete() calls DELETE on /site_syncs_incoming/{key}', async () => {
			const http = mockHttp();
			const svc = new SiteSyncIncomingService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/site_syncs_incoming/1');
		});
	});

	describe('listBySite', () => {
		it('filters by site FK', async () => {
			const http = mockHttp();
			const svc = new SiteSyncIncomingService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleIncoming]);

			const result = await svc.listBySite(1);

			expect(http.get).toHaveBeenCalledWith('/site_syncs_incoming', {
				params: {
					fields: 'most',
					filter: 'site eq 1',
				},
			});
			expect(result).toEqual([sampleIncoming]);
		});

		it('combines site filter with additional filter', async () => {
			const http = mockHttp();
			const svc = new SiteSyncIncomingService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleIncoming]);

			await svc.listBySite(1, { filter: "status eq 'syncing'" });

			expect(http.get).toHaveBeenCalledWith('/site_syncs_incoming', {
				params: {
					fields: 'most',
					filter: "(status eq 'syncing') and site eq 1",
				},
			});
		});

		it('passes through other list options', async () => {
			const http = mockHttp();
			const svc = new SiteSyncIncomingService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleIncoming]);

			await svc.listBySite(1, { sort: 'name', limit: 10 });

			expect(http.get).toHaveBeenCalledWith('/site_syncs_incoming', {
				params: {
					fields: 'most',
					filter: 'site eq 1',
					sort: 'name',
					limit: 10,
				},
			});
		});
	});

	describe('actions', () => {
		it('regenerate() dispatches to /site_syncs_incoming_actions with FK "site_syncs_incoming"', async () => {
			const http = mockHttp();
			const svc = new SiteSyncIncomingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.regenerate(1);

			expect(http.post).toHaveBeenCalledWith('/site_syncs_incoming_actions', {
				body: { site_syncs_incoming: 1, action: 'regenerate' },
			});
		});

		it('enable() dispatches enable action', async () => {
			const http = mockHttp();
			const svc = new SiteSyncIncomingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.enable(3);

			expect(http.post).toHaveBeenCalledWith('/site_syncs_incoming_actions', {
				body: { site_syncs_incoming: 3, action: 'enable' },
			});
		});

		it('disable() dispatches disable action', async () => {
			const http = mockHttp();
			const svc = new SiteSyncIncomingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.disable(2);

			expect(http.post).toHaveBeenCalledWith('/site_syncs_incoming_actions', {
				body: { site_syncs_incoming: 2, action: 'disable' },
			});
		});
	});

	describe('action endpoint derivation for multi-word resource', () => {
		it('derives site_syncs_incoming_actions from /site_syncs_incoming (no trailing s)', async () => {
			const http = mockHttp();
			const svc = new SiteSyncIncomingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.enable(1);

			// The resource path is /site_syncs_incoming (no trailing s)
			// deriveSingular strips leading / only, leaving site_syncs_incoming
			// Action endpoint: site_syncs_incoming_actions, FK: site_syncs_incoming
			expect(http.post).toHaveBeenCalledWith('/site_syncs_incoming_actions', {
				body: { site_syncs_incoming: 1, action: 'enable' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.siteSyncsIncoming', async () => {
			await import('../../src/services/site-sync-incoming/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.siteSyncsIncoming).toBeDefined();
			expect(client.siteSyncsIncoming).toBeInstanceOf(SiteSyncIncomingService);
		});
	});
});

// ---------------------------------------------------------------------------
// SiteSyncOutgoingService Tests
// ---------------------------------------------------------------------------

describe('SiteSyncOutgoingService', () => {
	describe('CRUD', () => {
		it('list() calls /site_syncs_outgoing', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleOutgoing]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/site_syncs_outgoing', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleOutgoing]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleOutgoing);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/site_syncs_outgoing/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleOutgoing);
		});

		it('create() POSTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce({ ...sampleOutgoing, $key: 2 });

			const result = await svc.create({ site: 1, name: 'New Outgoing' });

			expect(http.post).toHaveBeenCalledWith('/site_syncs_outgoing', {
				body: { site: 1, name: 'New Outgoing' },
			});
			expect(result.$key).toBe(2);
		});
	});

	describe('listBySite', () => {
		it('filters by site FK', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleOutgoing]);

			const result = await svc.listBySite(1);

			expect(http.get).toHaveBeenCalledWith('/site_syncs_outgoing', {
				params: {
					fields: 'most',
					filter: 'site eq 1',
				},
			});
			expect(result).toEqual([sampleOutgoing]);
		});

		it('combines site filter with additional filter', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleOutgoing]);

			await svc.listBySite(1, { filter: "state eq 'online'" });

			expect(http.get).toHaveBeenCalledWith('/site_syncs_outgoing', {
				params: {
					fields: 'most',
					filter: "(state eq 'online') and site eq 1",
				},
			});
		});
	});

	describe('actions', () => {
		it('enable() dispatches to /site_syncs_outgoing_actions with FK "site_syncs_outgoing"', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.enable(1);

			expect(http.post).toHaveBeenCalledWith('/site_syncs_outgoing_actions', {
				body: { site_syncs_outgoing: 1, action: 'enable' },
			});
		});

		it('disable() dispatches disable action', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.disable(2);

			expect(http.post).toHaveBeenCalledWith('/site_syncs_outgoing_actions', {
				body: { site_syncs_outgoing: 2, action: 'disable' },
			});
		});

		it('throttleSync() dispatches throttle_sync with params', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.throttleSync(1, { rate: 1000 });

			expect(http.post).toHaveBeenCalledWith('/site_syncs_outgoing_actions', {
				body: {
					site_syncs_outgoing: 1,
					action: 'throttle_sync',
					params: { rate: 1000 },
				},
			});
		});

		it('addToQueue() dispatches add_to_queue with params', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.addToQueue(1, { snapshot: 42 });

			expect(http.post).toHaveBeenCalledWith('/site_syncs_outgoing_actions', {
				body: {
					site_syncs_outgoing: 1,
					action: 'add_to_queue',
					params: { snapshot: 42 },
				},
			});
		});

		it('refresh() dispatches refresh action', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refresh(3);

			expect(http.post).toHaveBeenCalledWith('/site_syncs_outgoing_actions', {
				body: { site_syncs_outgoing: 3, action: 'refresh' },
			});
		});

		it('setupSyncBack() dispatches setup_sync_back action', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.setupSyncBack(1);

			expect(http.post).toHaveBeenCalledWith('/site_syncs_outgoing_actions', {
				body: { site_syncs_outgoing: 1, action: 'setup_sync_back' },
			});
		});

		it('createRepairServer() dispatches create_repair_server action', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.createRepairServer(1);

			expect(http.post).toHaveBeenCalledWith('/site_syncs_outgoing_actions', {
				body: { site_syncs_outgoing: 1, action: 'create_repair_server' },
			});
		});

		it('updateRemoteConfig() dispatches update_remote_config action', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.updateRemoteConfig(1);

			expect(http.post).toHaveBeenCalledWith('/site_syncs_outgoing_actions', {
				body: { site_syncs_outgoing: 1, action: 'update_remote_config' },
			});
		});
	});

	describe('action endpoint derivation for multi-word resource', () => {
		it('derives site_syncs_outgoing_actions from /site_syncs_outgoing (no trailing s)', async () => {
			const http = mockHttp();
			const svc = new SiteSyncOutgoingService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.disable(1);

			expect(http.post).toHaveBeenCalledWith('/site_syncs_outgoing_actions', {
				body: { site_syncs_outgoing: 1, action: 'disable' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.siteSyncsOutgoing', async () => {
			await import('../../src/services/site-sync-outgoing/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.siteSyncsOutgoing).toBeDefined();
			expect(client.siteSyncsOutgoing).toBeInstanceOf(SiteSyncOutgoingService);
		});
	});
});

// ---------------------------------------------------------------------------
// SiteSyncProfilePeriodService Tests
// ---------------------------------------------------------------------------

describe('SiteSyncProfilePeriodService', () => {
	describe('CRUD', () => {
		it('list() calls /site_syncs_outgoing_profile_periods', async () => {
			const http = mockHttp();
			const svc = new SiteSyncProfilePeriodService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleProfilePeriod]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/site_syncs_outgoing_profile_periods', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleProfilePeriod]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new SiteSyncProfilePeriodService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleProfilePeriod);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/site_syncs_outgoing_profile_periods/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleProfilePeriod);
		});

		it('create() POSTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new SiteSyncProfilePeriodService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleProfilePeriod,
				$key: 2,
			});

			const result = await svc.create({
				site_syncs_outgoing: 1,
				profile_period: 5,
				retention: 604800,
			});

			expect(http.post).toHaveBeenCalledWith('/site_syncs_outgoing_profile_periods', {
				body: {
					site_syncs_outgoing: 1,
					profile_period: 5,
					retention: 604800,
				},
			});
			expect(result.$key).toBe(2);
		});

		it('delete() calls DELETE on /site_syncs_outgoing_profile_periods/{key}', async () => {
			const http = mockHttp();
			const svc = new SiteSyncProfilePeriodService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/site_syncs_outgoing_profile_periods/1');
		});
	});

	describe('listByOutgoingSync', () => {
		it('filters by site_syncs_outgoing FK', async () => {
			const http = mockHttp();
			const svc = new SiteSyncProfilePeriodService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleProfilePeriod]);

			const result = await svc.listByOutgoingSync(1);

			expect(http.get).toHaveBeenCalledWith('/site_syncs_outgoing_profile_periods', {
				params: {
					fields: 'most',
					filter: 'site_syncs_outgoing eq 1',
				},
			});
			expect(result).toEqual([sampleProfilePeriod]);
		});

		it('combines sync filter with additional filter', async () => {
			const http = mockHttp();
			const svc = new SiteSyncProfilePeriodService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleProfilePeriod]);

			await svc.listByOutgoingSync(1, { filter: 'priority eq 1' });

			expect(http.get).toHaveBeenCalledWith('/site_syncs_outgoing_profile_periods', {
				params: {
					fields: 'most',
					filter: '(priority eq 1) and site_syncs_outgoing eq 1',
				},
			});
		});

		it('passes through other list options', async () => {
			const http = mockHttp();
			const svc = new SiteSyncProfilePeriodService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleProfilePeriod]);

			await svc.listByOutgoingSync(1, { sort: 'priority', limit: 5 });

			expect(http.get).toHaveBeenCalledWith('/site_syncs_outgoing_profile_periods', {
				params: {
					fields: 'most',
					filter: 'site_syncs_outgoing eq 1',
					sort: 'priority',
					limit: 5,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.siteSyncProfilePeriods', async () => {
			await import('../../src/services/site-sync-profile-period/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.siteSyncProfilePeriods).toBeDefined();
			expect(client.siteSyncProfilePeriods).toBeInstanceOf(SiteSyncProfilePeriodService);
		});
	});
});
