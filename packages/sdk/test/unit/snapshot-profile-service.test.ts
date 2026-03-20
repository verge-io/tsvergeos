import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { SnapshotProfileService } from '../../src/services/snapshot-profile/service.js';
import type { SnapshotProfile } from '../../src/services/snapshot-profile/types.js';
import { SnapshotProfilePeriodService } from '../../src/services/snapshot-profile-period/service.js';
import type { SnapshotProfilePeriod } from '../../src/services/snapshot-profile-period/types.js';

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

const sampleProfile: SnapshotProfile = {
	$key: 1,
	name: 'Daily Backups',
	description: 'Standard daily backup profile',
	ignore_warnings: false,
};

const samplePeriod: SnapshotProfilePeriod = {
	$key: 1,
	profile: 1,
	name: 'Hourly',
	frequency: 'hourly',
	minute: 0,
	hour: 0,
	day_of_week: 'any',
	retention: 86400,
	skip_missed: false,
	max_tier: '1',
	quiesce: false,
	min_snapshots: 1,
	immutable: false,
};

// ---------------------------------------------------------------------------
// SnapshotProfileService Tests
// ---------------------------------------------------------------------------

describe('SnapshotProfileService', () => {
	describe('CRUD', () => {
		it('list() calls /snapshot_profiles', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfileService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleProfile]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/snapshot_profiles', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleProfile]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfileService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleProfile);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/snapshot_profiles/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleProfile);
		});

		it('create() POSTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfileService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce({ ...sampleProfile, $key: 2 });

			const result = await svc.create({ name: 'Weekly Backups' });

			expect(http.post).toHaveBeenCalledWith('/snapshot_profiles', {
				body: { name: 'Weekly Backups' },
			});
			expect(http.get).toHaveBeenCalledWith('/snapshot_profiles/2', {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(2);
		});

		it('update() PUTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfileService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleProfile,
				description: 'updated',
			});

			const result = await svc.update(1, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/snapshot_profiles/1', {
				body: { description: 'updated' },
			});
			expect(result.description).toBe('updated');
		});
	});

	describe('delete override', () => {
		it('delete() dispatches to /snapshot_profile_actions instead of DELETE', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfileService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.post).toHaveBeenCalledWith('/snapshot_profile_actions', {
				body: { snapshot_profile: 1, action: 'delete' },
			});
			// Ensure no DELETE was called
			expect(http.del).not.toHaveBeenCalled();
		});

		it('delete() dispatches with string key', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfileService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.delete('3');

			expect(http.post).toHaveBeenCalledWith('/snapshot_profile_actions', {
				body: { snapshot_profile: '3', action: 'delete' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.snapshotProfiles', async () => {
			await import('../../src/services/snapshot-profile/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.snapshotProfiles).toBeDefined();
			expect(client.snapshotProfiles).toBeInstanceOf(SnapshotProfileService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/snapshot-profile/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.snapshotProfiles;
			const second = client.snapshotProfiles;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// SnapshotProfilePeriodService Tests
// ---------------------------------------------------------------------------

describe('SnapshotProfilePeriodService', () => {
	describe('CRUD', () => {
		it('list() calls /snapshot_profile_periods', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfilePeriodService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeriod]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/snapshot_profile_periods', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([samplePeriod]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfilePeriodService(http);
			vi.mocked(http.get).mockResolvedValueOnce(samplePeriod);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/snapshot_profile_periods/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(samplePeriod);
		});

		it('create() POSTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfilePeriodService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce({ ...samplePeriod, $key: 2 });

			const result = await svc.create({
				profile: 1,
				name: 'Daily',
				frequency: 'daily',
				retention: 604800,
			});

			expect(http.post).toHaveBeenCalledWith('/snapshot_profile_periods', {
				body: {
					profile: 1,
					name: 'Daily',
					frequency: 'daily',
					retention: 604800,
				},
			});
			expect(http.get).toHaveBeenCalledWith('/snapshot_profile_periods/2', {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(2);
		});

		it('delete() calls DELETE on /snapshot_profile_periods/{key}', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfilePeriodService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/snapshot_profile_periods/1');
		});
	});

	describe('listByProfile', () => {
		it('filters by profile FK', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfilePeriodService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeriod]);

			const result = await svc.listByProfile(1);

			expect(http.get).toHaveBeenCalledWith('/snapshot_profile_periods', {
				params: {
					fields: 'most',
					filter: 'profile eq 1',
				},
			});
			expect(result).toEqual([samplePeriod]);
		});

		it('combines profile filter with additional filter', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfilePeriodService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeriod]);

			await svc.listByProfile(1, {
				filter: "frequency eq 'hourly'",
			});

			expect(http.get).toHaveBeenCalledWith('/snapshot_profile_periods', {
				params: {
					fields: 'most',
					filter: "profile eq 1 and frequency eq 'hourly'",
				},
			});
		});

		it('passes through other list options', async () => {
			const http = mockHttp();
			const svc = new SnapshotProfilePeriodService(http);
			vi.mocked(http.get).mockResolvedValueOnce([samplePeriod]);

			await svc.listByProfile(1, {
				sort: 'name',
				limit: 10,
			});

			expect(http.get).toHaveBeenCalledWith('/snapshot_profile_periods', {
				params: {
					fields: 'most',
					filter: 'profile eq 1',
					sort: 'name',
					limit: 10,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.snapshotProfilePeriods', async () => {
			await import('../../src/services/snapshot-profile-period/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.snapshotProfilePeriods).toBeDefined();
			expect(client.snapshotProfilePeriods).toBeInstanceOf(SnapshotProfilePeriodService);
		});
	});
});
