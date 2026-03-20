import { describe, expect, it, vi } from 'vitest';
import { ApiError, NotFoundError } from '../../src/errors.js';
import type { HttpClient } from '../../src/http.js';
import { WebhookService } from '../../src/services/webhook/service.js';
import type { Webhook } from '../../src/services/webhook/types.js';
import { WebhookURLService } from '../../src/services/webhook-url/service.js';
import type { WebhookURL } from '../../src/services/webhook-url/types.js';

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

const sampleWebhookURL: WebhookURL = {
	$key: 1,
	name: 'My Webhook',
	url: 'https://example.com/hook',
	type: 'generic',
	authorization_type: 'none',
	enabled: true,
	timeout: 30,
	retries: 3,
	created: 1700000000,
	modified: 1700000100,
};

const sampleWebhook: Webhook = {
	$key: 42,
	webhook_url: 1,
	status: 'sent',
	message: 'Test message',
	response_code: 200,
	created: 1700000000,
	modified: 1700000100,
};

// ---------------------------------------------------------------------------
// WebhookURLService Tests
// ---------------------------------------------------------------------------

describe('WebhookURLService', () => {
	describe('constructor', () => {
		it('uses /webhook_urls resource path', async () => {
			const http = mockHttp();
			const svc = new WebhookURLService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleWebhookURL]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/webhook_urls', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('get() calls /webhook_urls/{key}', async () => {
			const http = mockHttp();
			const svc = new WebhookURLService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleWebhookURL);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/webhook_urls/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleWebhookURL);
		});

		it('create() POSTs to /webhook_urls and does read-back', async () => {
			const http = mockHttp();
			const svc = new WebhookURLService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleWebhookURL);

			const result = await svc.create({
				name: 'My Webhook',
				url: 'https://example.com/hook',
			});

			expect(http.post).toHaveBeenCalledWith('/webhook_urls', {
				body: { name: 'My Webhook', url: 'https://example.com/hook' },
			});
			expect(result).toEqual(sampleWebhookURL);
		});

		it('update() PUTs to /webhook_urls/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new WebhookURLService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleWebhookURL,
				name: 'Updated',
			});

			const result = await svc.update(1, { name: 'Updated' });

			expect(http.put).toHaveBeenCalledWith('/webhook_urls/1', {
				body: { name: 'Updated' },
			});
			expect(result.name).toBe('Updated');
		});

		it('delete() DELETEs /webhook_urls/{key}', async () => {
			const http = mockHttp();
			const svc = new WebhookURLService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/webhook_urls/1');
		});
	});

	describe('send', () => {
		it('dispatches send action via dedicated endpoint', async () => {
			const http = mockHttp();
			const svc = new WebhookURLService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.send(1, 'Test message');

			expect(http.post).toHaveBeenCalledWith('/webhook_url_actions', {
				body: {
					webhook_url: 1,
					action: 'send',
					params: { message: 'Test message' },
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.webhookUrls', async () => {
			await import('../../src/services/webhook-url/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.webhookUrls).toBeDefined();
			expect(client.webhookUrls).toBeInstanceOf(WebhookURLService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/webhook-url/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.webhookUrls;
			const second = client.webhookUrls;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// WebhookService Tests
// ---------------------------------------------------------------------------

describe('WebhookService', () => {
	describe('constructor', () => {
		it('uses /webhooks resource path', async () => {
			const http = mockHttp();
			const svc = new WebhookService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleWebhook]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/webhooks', {
				params: { fields: 'most' },
			});
		});
	});

	describe('read-only enforcement', () => {
		it('does not have create method', () => {
			const http = mockHttp();
			const svc = new WebhookService(http);

			expect((svc as Record<string, unknown>).create).toBeUndefined();
		});

		it('does not have update method', () => {
			const http = mockHttp();
			const svc = new WebhookService(http);

			expect((svc as Record<string, unknown>).update).toBeUndefined();
		});
	});

	describe('get', () => {
		it('calls /webhooks/{key}', async () => {
			const http = mockHttp();
			const svc = new WebhookService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleWebhook);

			const result = await svc.get(42);

			expect(http.get).toHaveBeenCalledWith('/webhooks/42', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleWebhook);
		});
	});

	describe('delete', () => {
		it('DELETEs /webhooks/{key}', async () => {
			const http = mockHttp();
			const svc = new WebhookService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(42);

			expect(http.del).toHaveBeenCalledWith('/webhooks/42');
		});

		it('throws NotFoundError on 404', async () => {
			const http = mockHttp();
			const svc = new WebhookService(http);
			const err = new ApiError(404, '/webhooks/999', 'Not found');
			vi.mocked(http.del).mockRejectedValueOnce(err);

			await expect(svc.delete(999)).rejects.toThrow(NotFoundError);
		});
	});

	describe('listByWebhookURL', () => {
		it('filters by webhook_url FK', async () => {
			const http = mockHttp();
			const svc = new WebhookService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleWebhook]);

			const result = await svc.listByWebhookURL(1);

			expect(http.get).toHaveBeenCalledWith('/webhooks', {
				params: { fields: 'most', filter: 'webhook_url eq 1' },
			});
			expect(result).toEqual([sampleWebhook]);
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new WebhookService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByWebhookURL(1, { sort: 'created', limit: 5 });

			expect(http.get).toHaveBeenCalledWith('/webhooks', {
				params: {
					fields: 'most',
					filter: 'webhook_url eq 1',
					sort: 'created',
					limit: 5,
				},
			});
		});
	});

	describe('listByStatus', () => {
		it('filters by status', async () => {
			const http = mockHttp();
			const svc = new WebhookService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleWebhook]);

			const result = await svc.listByStatus('sent');

			expect(http.get).toHaveBeenCalledWith('/webhooks', {
				params: { fields: 'most', filter: "status eq 'sent'" },
			});
			expect(result).toEqual([sampleWebhook]);
		});
	});

	describe('listPending', () => {
		it('filters by queued or running status', async () => {
			const http = mockHttp();
			const svc = new WebhookService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listPending();

			expect(http.get).toHaveBeenCalledWith('/webhooks', {
				params: {
					fields: 'most',
					filter: "status eq 'queued' or status eq 'running'",
				},
			});
		});
	});

	describe('listFailed', () => {
		it('filters by error status', async () => {
			const http = mockHttp();
			const svc = new WebhookService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listFailed();

			expect(http.get).toHaveBeenCalledWith('/webhooks', {
				params: { fields: 'most', filter: "status eq 'error'" },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.webhooks', async () => {
			await import('../../src/services/webhook/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.webhooks).toBeDefined();
			expect(client.webhooks).toBeInstanceOf(WebhookService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/webhook/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.webhooks;
			const second = client.webhooks;
			expect(first).toBe(second);
		});
	});
});
