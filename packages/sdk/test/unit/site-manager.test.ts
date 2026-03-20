import { describe, expect, it, vi } from 'vitest';
import { VergeClient } from '../../src/client.js';
import { NotFoundError, ValidationError } from '../../src/errors.js';
import { SiteManager } from '../../src/site-manager.js';
import type { ClientConfig } from '../../src/types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create a mock Response object. */
function mockResponse(status: number, body: unknown): Response {
	const text = typeof body === 'string' ? body : JSON.stringify(body);
	return {
		ok: status >= 200 && status < 300,
		status,
		statusText: '',
		text: () => Promise.resolve(text),
		json: () => Promise.resolve(typeof body === 'string' ? JSON.parse(body) : body),
		headers: new Headers(),
	} as Response;
}

/** Create a VergeClient with mocked fetch (no connect/version check). */
function makeClient(name?: string): VergeClient {
	const fetchMock = vi.fn<typeof globalThis.fetch>();
	return new VergeClient({
		host: `https://${name ?? 'test'}.example.com`,
		apiKey: 'test-api-key',
		fetch: fetchMock,
		timeout: 0,
		retries: 0,
	});
}

/** Create a ClientConfig with mocked fetch for async addSite tests. */
function makeConfig(
	host = 'https://verge.example.com',
): ClientConfig & { fetch: ReturnType<typeof vi.fn> } {
	const fetchMock = vi.fn<typeof globalThis.fetch>();
	return {
		host,
		apiKey: 'test-api-key',
		fetch: fetchMock,
		timeout: 0,
		retries: 0,
	};
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('SiteManager', () => {
	// -----------------------------------------------------------------------
	// addSite (sync overload)
	// -----------------------------------------------------------------------

	describe('addSite (sync with pre-built client)', () => {
		it('registers a pre-built client by name', () => {
			const manager = new SiteManager();
			const client = makeClient('dc-east');

			manager.addSite('dc-east', client);

			expect(manager.site('dc-east')).toBe(client);
		});

		it('stores tags when provided', () => {
			const manager = new SiteManager();
			const client = makeClient('dc-east');

			manager.addSite('dc-east', client, ['prod', 'us-east']);

			expect(manager.getTags('dc-east')).toEqual(['prod', 'us-east']);
		});

		it('defaults tags to empty array when not provided', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient());

			expect(manager.getTags('dc-east')).toEqual([]);
		});

		it('throws ValidationError for duplicate name', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient());

			expect(() => manager.addSite('dc-east', makeClient())).toThrow(ValidationError);
			expect(() => manager.addSite('dc-east', makeClient())).toThrow(
				"Site 'dc-east' is already registered",
			);
		});
	});

	// -----------------------------------------------------------------------
	// addSite (async overload)
	// -----------------------------------------------------------------------

	describe('addSite (async with SiteConfig)', () => {
		it('connects and registers the client', async () => {
			const manager = new SiteManager();
			const config = makeConfig();

			// Mock the version check response
			(config.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
				mockResponse(200, { version: '26.1.0' }),
			);

			await manager.addSite({ ...config, name: 'dc-east' });

			const client = manager.site('dc-east');
			expect(client).toBeInstanceOf(VergeClient);
			expect(client.serverVersion).toBe('26.1.0');
		});

		it('throws ValidationError for duplicate name (async)', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient());

			const config = makeConfig();
			// _ensureUniqueName throws synchronously before the async path begins
			expect(() => manager.addSite({ ...config, name: 'dc-east' })).toThrow(ValidationError);
		});

		it('stores tags from SiteConfig', async () => {
			const manager = new SiteManager();
			const config = makeConfig();
			(config.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
				mockResponse(200, { version: '26.1.0' }),
			);

			await manager.addSite({ ...config, name: 'dc-west', tags: ['staging'] });

			expect(manager.getTags('dc-west')).toEqual(['staging']);
		});
	});

	// -----------------------------------------------------------------------
	// site()
	// -----------------------------------------------------------------------

	describe('site()', () => {
		it('returns the correct client by name', () => {
			const manager = new SiteManager();
			const east = makeClient('dc-east');
			const west = makeClient('dc-west');
			manager.addSite('dc-east', east);
			manager.addSite('dc-west', west);

			expect(manager.site('dc-east')).toBe(east);
			expect(manager.site('dc-west')).toBe(west);
		});

		it('throws NotFoundError for unknown name', () => {
			const manager = new SiteManager();

			expect(() => manager.site('nonexistent')).toThrow(NotFoundError);
			expect(() => manager.site('nonexistent')).toThrow("Site 'nonexistent' is not registered");
		});
	});

	// -----------------------------------------------------------------------
	// sites()
	// -----------------------------------------------------------------------

	describe('sites()', () => {
		it('returns all registered clients', () => {
			const manager = new SiteManager();
			const east = makeClient('dc-east');
			const west = makeClient('dc-west');
			manager.addSite('dc-east', east);
			manager.addSite('dc-west', west);

			const all = manager.sites();
			expect(all.size).toBe(2);
			expect(all.get('dc-east')).toBe(east);
			expect(all.get('dc-west')).toBe(west);
		});

		it('returns a copy — mutating it does not affect SiteManager', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient());

			const copy = manager.sites();
			copy.delete('dc-east');

			// Original still has it
			expect(manager.sites().size).toBe(1);
			expect(manager.site('dc-east')).toBeDefined();
		});

		it('returns empty map when no sites registered', () => {
			const manager = new SiteManager();
			expect(manager.sites().size).toBe(0);
		});
	});

	// -----------------------------------------------------------------------
	// removeSite()
	// -----------------------------------------------------------------------

	describe('removeSite()', () => {
		it('removes the client from sites() and status()', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient());

			manager.removeSite('dc-east');

			expect(manager.sites().size).toBe(0);
			expect(manager.status().size).toBe(0);
			expect(() => manager.site('dc-east')).toThrow(NotFoundError);
		});

		it('does not throw for unknown name', () => {
			const manager = new SiteManager();

			expect(() => manager.removeSite('nonexistent')).not.toThrow();
		});

		it('removes tags for the site', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient(), ['prod']);

			manager.removeSite('dc-east');

			expect(manager.getTags('dc-east')).toEqual([]);
		});
	});

	// -----------------------------------------------------------------------
	// status()
	// -----------------------------------------------------------------------

	describe('status()', () => {
		it('returns initial status with connected: true', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient());

			const st = manager.status();
			expect(st.size).toBe(1);
			const siteStatus = st.get('dc-east');
			expect(siteStatus).toBeDefined();
			expect(siteStatus?.connected).toBe(true);
		});

		it('captures serverVersion from async addSite', async () => {
			const manager = new SiteManager();
			const config = makeConfig();
			(config.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
				mockResponse(200, { version: '26.2.0' }),
			);

			await manager.addSite({ ...config, name: 'dc-east' });

			const st = manager.status().get('dc-east');
			expect(st?.version).toBe('26.2.0');
		});

		it('returns a copy — mutating it does not affect SiteManager', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient());

			const copy = manager.status();
			copy.delete('dc-east');

			expect(manager.status().size).toBe(1);
		});
	});

	// -----------------------------------------------------------------------
	// Tags and internal accessors
	// -----------------------------------------------------------------------

	describe('tags and internal accessors', () => {
		it('getClientsByTag returns matching clients', () => {
			const manager = new SiteManager();
			const east = makeClient('dc-east');
			const west = makeClient('dc-west');
			const edge = makeClient('edge');
			manager.addSite('dc-east', east, ['prod', 'us-east']);
			manager.addSite('dc-west', west, ['prod', 'us-west']);
			manager.addSite('edge', edge, ['staging']);

			const prodClients = manager.getClientsByTag('prod');
			expect(prodClients.size).toBe(2);
			expect(prodClients.get('dc-east')).toBe(east);
			expect(prodClients.get('dc-west')).toBe(west);
		});

		it('getClientsByTag returns empty map for unknown tag', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient(), ['prod']);

			expect(manager.getClientsByTag('nonexistent').size).toBe(0);
		});

		it('getClientsForSites returns all clients when no names given', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient());
			manager.addSite('dc-west', makeClient());

			const all = manager.getClientsForSites();
			expect(all.size).toBe(2);
		});

		it('getClientsForSites filters by names', () => {
			const manager = new SiteManager();
			const east = makeClient('dc-east');
			manager.addSite('dc-east', east);
			manager.addSite('dc-west', makeClient());

			const filtered = manager.getClientsForSites(['dc-east']);
			expect(filtered.size).toBe(1);
			expect(filtered.get('dc-east')).toBe(east);
		});

		it('getClientsForSites ignores unknown names', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient());

			const filtered = manager.getClientsForSites(['dc-east', 'nonexistent']);
			expect(filtered.size).toBe(1);
		});
	});

	// -----------------------------------------------------------------------
	// updateSiteStatus
	// -----------------------------------------------------------------------

	describe('updateSiteStatus()', () => {
		it('merges partial updates into existing status', () => {
			const manager = new SiteManager();
			manager.addSite('dc-east', makeClient());

			const err = new Error('connection timeout');
			manager.updateSiteStatus('dc-east', { connected: false, lastError: err });

			const st = manager.status().get('dc-east');
			expect(st?.connected).toBe(false);
			expect(st?.lastError).toBe(err);
		});

		it('is a no-op for unknown site names', () => {
			const manager = new SiteManager();

			// Should not throw
			expect(() => manager.updateSiteStatus('nonexistent', { connected: false })).not.toThrow();
		});
	});

	// -----------------------------------------------------------------------
	// Constructor options
	// -----------------------------------------------------------------------

	describe('constructor options', () => {
		it('stores timeout from options', () => {
			const manager = new SiteManager({ timeout: 5000 });
			expect(manager.timeout).toBe(5000);
		});

		it('timeout is undefined when not set', () => {
			const manager = new SiteManager();
			expect(manager.timeout).toBeUndefined();
		});
	});
});
