import { describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../src/errors.js';
import type { HttpClient } from '../../src/http.js';
import { NASServiceService } from '../../src/services/nas-service/service.js';
import type { NASService } from '../../src/services/nas-service/types.js';
import { NASServiceUserService } from '../../src/services/nas-service-user/service.js';
import type { NASServiceUser } from '../../src/services/nas-service-user/types.js';

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

const sampleNASService: NASService = {
	$key: 1,
	vm: 42,
	name: 'NAS-1',
	max_imports: 4,
	max_syncs: 0,
	disable_swap: false,
	read_ahead_kb_default: '0',
};

const SHA1_KEY = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2';

const sampleUser: NASServiceUser = {
	$key: SHA1_KEY,
	id: SHA1_KEY,
	service: 1,
	name: 'john',
	enabled: true,
	displayname: 'John Doe',
	description: 'Test user',
};

// ---------------------------------------------------------------------------
// NASServiceService Tests
// ---------------------------------------------------------------------------

describe('NASServiceService', () => {
	describe('CRUD', () => {
		it('list() calls /vm_services', async () => {
			const http = mockHttp();
			const svc = new NASServiceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNASService]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vm_services', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleNASService]);
		});

		it('get() calls /vm_services/{key}', async () => {
			const http = mockHttp();
			const svc = new NASServiceService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleNASService);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/vm_services/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleNASService);
		});

		it('create() POSTs to /vm_services and reads back', async () => {
			const http = mockHttp();
			const svc = new NASServiceService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleNASService,
				$key: 2,
			});

			const result = await svc.create({ name: 'NAS-2' });

			expect(http.post).toHaveBeenCalledWith('/vm_services', {
				body: { name: 'NAS-2' },
			});
			expect(http.get).toHaveBeenCalledWith('/vm_services/2', {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(2);
		});

		it('update() PUTs to /vm_services/{key} and reads back', async () => {
			const http = mockHttp();
			const svc = new NASServiceService(http);
			vi.mocked(http.put).mockResolvedValueOnce({});
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleNASService,
				name: 'Updated NAS',
			});

			const result = await svc.update(1, { name: 'Updated NAS' });

			expect(http.put).toHaveBeenCalledWith('/vm_services/1', {
				body: { name: 'Updated NAS' },
			});
			expect(result.name).toBe('Updated NAS');
		});

		it('delete() calls DELETE /vm_services/{key}', async () => {
			const http = mockHttp();
			const svc = new NASServiceService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/vm_services/1');
		});
	});

	describe('getByVM', () => {
		it('filters by vm FK and returns first match', async () => {
			const http = mockHttp();
			const svc = new NASServiceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNASService]);

			const result = await svc.getByVM(42);

			expect(http.get).toHaveBeenCalledWith('/vm_services', {
				params: { fields: 'most', filter: 'vm eq 42' },
			});
			expect(result).toEqual(sampleNASService);
		});

		it('throws NotFoundError when no NAS service exists for VM', async () => {
			const http = mockHttp();
			const svc = new NASServiceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getByVM(99)).rejects.toThrow(NotFoundError);
		});
	});

	describe('listByVM', () => {
		it('filters by vm FK', async () => {
			const http = mockHttp();
			const svc = new NASServiceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNASService]);

			await svc.listByVM(42);

			expect(http.get).toHaveBeenCalledWith('/vm_services', {
				params: { fields: 'most', filter: 'vm eq 42' },
			});
		});

		it('combines vm filter with existing filter', async () => {
			const http = mockHttp();
			const svc = new NASServiceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByVM(42, { filter: "name eq 'NAS-1'" });

			expect(http.get).toHaveBeenCalledWith('/vm_services', {
				params: { fields: 'most', filter: "vm eq 42 and name eq 'NAS-1'" },
			});
		});
	});

	describe('no power actions', () => {
		it('does not have powerOn or powerOff methods', () => {
			const http = mockHttp();
			const svc = new NASServiceService(http);
			expect((svc as Record<string, unknown>).powerOn).toBeUndefined();
			expect((svc as Record<string, unknown>).powerOff).toBeUndefined();
		});
	});

	describe('service registration', () => {
		it('registers as client.nasServices', async () => {
			// Import the registration side-effect
			await import('../../src/services/nas-service/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://verge.example.com',
				apiKey: 'test-key',
			});

			expect(client.nasServices).toBeInstanceOf(NASServiceService);
			// Same instance on repeated access
			expect(client.nasServices).toBe(client.nasServices);
		});
	});
});

// ---------------------------------------------------------------------------
// NASServiceUserService Tests
// ---------------------------------------------------------------------------

describe('NASServiceUserService', () => {
	describe('CRUD with string keys', () => {
		it('list() calls /vm_service_users', async () => {
			const http = mockHttp();
			const svc = new NASServiceUserService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleUser]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vm_service_users', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleUser]);
		});

		it('get() uses string key in URL', async () => {
			const http = mockHttp();
			const svc = new NASServiceUserService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleUser);

			const result = await svc.get(SHA1_KEY);

			expect(http.get).toHaveBeenCalledWith(`/vm_service_users/${SHA1_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleUser);
		});

		it('create() POSTs with required fields and reads back with string key', async () => {
			const http = mockHttp();
			const svc = new NASServiceUserService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: SHA1_KEY });
			vi.mocked(http.get).mockResolvedValueOnce(sampleUser);

			const result = await svc.create({
				service: 1,
				name: 'john',
				password: 'secret',
			});

			expect(http.post).toHaveBeenCalledWith('/vm_service_users', {
				body: { service: 1, name: 'john', password: 'secret' },
			});
			expect(http.get).toHaveBeenCalledWith(`/vm_service_users/${SHA1_KEY}`, {
				params: { fields: 'most' },
			});
			expect(result.id).toBe(SHA1_KEY);
		});

		it('update() uses string key in URL', async () => {
			const http = mockHttp();
			const svc = new NASServiceUserService(http);
			vi.mocked(http.put).mockResolvedValueOnce({});
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleUser,
				password: 'newpass',
			});

			const result = await svc.update(SHA1_KEY, { password: 'newpass' });

			expect(http.put).toHaveBeenCalledWith(`/vm_service_users/${SHA1_KEY}`, {
				body: { password: 'newpass' },
			});
			expect(result.password).toBe('newpass');
		});

		it('delete() uses string key in URL', async () => {
			const http = mockHttp();
			const svc = new NASServiceUserService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(SHA1_KEY);

			expect(http.del).toHaveBeenCalledWith(`/vm_service_users/${SHA1_KEY}`);
		});
	});

	describe('listByService', () => {
		it('filters by service FK', async () => {
			const http = mockHttp();
			const svc = new NASServiceUserService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleUser]);

			await svc.listByService(1);

			expect(http.get).toHaveBeenCalledWith('/vm_service_users', {
				params: { fields: 'most', filter: 'service eq 1' },
			});
		});

		it('combines service filter with existing filter', async () => {
			const http = mockHttp();
			const svc = new NASServiceUserService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByService(1, { filter: "name eq 'john'" });

			expect(http.get).toHaveBeenCalledWith('/vm_service_users', {
				params: { fields: 'most', filter: "service eq 1 and name eq 'john'" },
			});
		});
	});

	describe('service registration', () => {
		it('registers as client.nasServiceUsers', async () => {
			await import('../../src/services/nas-service-user/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://verge.example.com',
				apiKey: 'test-key',
			});

			expect(client.nasServiceUsers).toBeInstanceOf(NASServiceUserService);
			expect(client.nasServiceUsers).toBe(client.nasServiceUsers);
		});
	});
});
