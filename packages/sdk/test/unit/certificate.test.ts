import { describe, expect, it, vi } from 'vitest';
import { ApiError, NotFoundError } from '../../src/errors.js';
import type { HttpClient } from '../../src/http.js';
import { CertificateService } from '../../src/services/certificate/service.js';
import type { Certificate } from '../../src/services/certificate/types.js';

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

const sampleCert: Certificate = {
	$key: 1,
	domain: 'example.com',
	type: 'letsencrypt',
	valid: true,
	renew: false,
	public: '',
	private: '',
	chain: '',
	key_type: 'RSA',
	created: 1700000000,
	modified: 1700000100,
};

// ---------------------------------------------------------------------------
// CertificateService Tests
// ---------------------------------------------------------------------------

describe('CertificateService', () => {
	describe('constructor', () => {
		it('uses /certificates resource path', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleCert]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/certificates', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /certificates/{key}', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleCert);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/certificates/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleCert);
		});

		it('create() POSTs to /certificates and does read-back', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleCert);

			const result = await svc.create({
				domain: 'example.com',
				type: 'letsencrypt',
			});

			expect(http.post).toHaveBeenCalledWith('/certificates', {
				body: { domain: 'example.com', type: 'letsencrypt' },
			});
			expect(http.get).toHaveBeenCalledWith('/certificates/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleCert);
		});

		it('update() PUTs to /certificates/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleCert,
				domain: 'new.example.com',
			});

			const result = await svc.update(1, { domain: 'new.example.com' });

			expect(http.put).toHaveBeenCalledWith('/certificates/1', {
				body: { domain: 'new.example.com' },
			});
			expect(result.domain).toBe('new.example.com');
		});

		it('delete() DELETEs /certificates/{key}', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/certificates/1');
		});
	});

	describe('getByDomain', () => {
		it('finds a certificate by domain', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.get)
				.mockResolvedValueOnce([sampleCert]) // list with filter
				.mockResolvedValueOnce(sampleCert); // get by key

			const result = await svc.getByDomain('example.com');

			expect(http.get).toHaveBeenCalledWith('/certificates', {
				params: { fields: 'most', filter: "domain eq 'example.com'" },
			});
			expect(http.get).toHaveBeenCalledWith('/certificates/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleCert);
		});

		it('throws NotFoundError when domain not found', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await expect(svc.getByDomain('nonexistent.com')).rejects.toThrow(NotFoundError);
		});
	});

	describe('getWithKeys', () => {
		it('requests public,private,chain fields', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			const certWithKeys = {
				...sampleCert,
				public: 'pub',
				private: 'priv',
				chain: 'ch',
			};
			vi.mocked(http.get).mockResolvedValueOnce(certWithKeys);

			const result = await svc.getWithKeys(1);

			expect(http.get).toHaveBeenCalledWith('/certificates/1', {
				params: { fields: 'most,public,private,chain' },
			});
			expect(result.public).toBe('pub');
		});

		it('throws NotFoundError on 404', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			const err = new ApiError(404, '/certificates/999', 'Not found');
			vi.mocked(http.get).mockRejectedValueOnce(err);

			await expect(svc.getWithKeys(999)).rejects.toThrow(NotFoundError);
		});
	});

	describe('renew', () => {
		it('calls update with renew: true', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({ ...sampleCert, renew: true });

			const result = await svc.renew(1);

			expect(http.put).toHaveBeenCalledWith('/certificates/1', {
				body: { renew: true },
			});
			expect(result.renew).toBe(true);
		});
	});

	describe('listByType', () => {
		it('filters by certificate type', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleCert]);

			const result = await svc.listByType('letsencrypt');

			expect(http.get).toHaveBeenCalledWith('/certificates', {
				params: { fields: 'most', filter: "type eq 'letsencrypt'" },
			});
			expect(result).toEqual([sampleCert]);
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByType('manual', { sort: 'domain', limit: 10 });

			expect(http.get).toHaveBeenCalledWith('/certificates', {
				params: {
					fields: 'most',
					filter: "type eq 'manual'",
					sort: 'domain',
					limit: 10,
				},
			});
		});
	});

	describe('listValid', () => {
		it('filters by valid eq true', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleCert]);

			const result = await svc.listValid();

			expect(http.get).toHaveBeenCalledWith('/certificates', {
				params: { fields: 'most', filter: 'valid eq true' },
			});
			expect(result).toEqual([sampleCert]);
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new CertificateService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listValid({ sort: 'domain' });

			expect(http.get).toHaveBeenCalledWith('/certificates', {
				params: { fields: 'most', filter: 'valid eq true', sort: 'domain' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.certificates', async () => {
			await import('../../src/services/certificate/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.certificates).toBeDefined();
			expect(client.certificates).toBeInstanceOf(CertificateService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/certificate/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.certificates;
			const second = client.certificates;
			expect(first).toBe(second);
		});
	});
});
