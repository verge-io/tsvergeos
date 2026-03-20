import { describe, expect, it, vi } from 'vitest';
import { VergeClient } from '../../src/client.js';
import type { CrossSiteServices } from '../../src/cross-site.js';
import { CrossSiteReadProxy } from '../../src/cross-site.js';
import { SiteError } from '../../src/errors.js';
import type { SiteStatus } from '../../src/site-manager.js';
import { SiteManager } from '../../src/site-manager.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create a mock VergeClient with a mock service that has a list() method. */
function makeClientWithService(
	name: string,
	serviceName: string,
	listResult: unknown[],
): VergeClient {
	const fetchMock = vi.fn<typeof globalThis.fetch>();
	const client = new VergeClient({
		host: `https://${name}.example.com`,
		apiKey: 'test-api-key',
		fetch: fetchMock,
		timeout: 0,
		retries: 0,
	});

	// Attach a mock service directly on the client
	(client as unknown as Record<string, unknown>)[serviceName] = {
		list: vi.fn().mockResolvedValue(listResult),
	};

	return client;
}

/** Create a mock VergeClient with a service whose list() rejects. */
function makeClientWithFailingService(
	name: string,
	serviceName: string,
	error: Error,
): VergeClient {
	const fetchMock = vi.fn<typeof globalThis.fetch>();
	const client = new VergeClient({
		host: `https://${name}.example.com`,
		apiKey: 'test-api-key',
		fetch: fetchMock,
		timeout: 0,
		retries: 0,
	});

	(client as unknown as Record<string, unknown>)[serviceName] = {
		list: vi.fn().mockRejectedValue(error),
	};

	return client;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('CrossSiteReadProxy', () => {
	// -----------------------------------------------------------------------
	// Basic fan-out
	// -----------------------------------------------------------------------

	describe('fan-out across all sites', () => {
		it('queries all sites and returns combined results tagged with site names', async () => {
			const eastVms = [
				{ $key: 1, name: 'vm-east-1' },
				{ $key: 2, name: 'vm-east-2' },
			];
			const westVms = [{ $key: 3, name: 'vm-west-1' }];

			const eastClient = makeClientWithService('dc-east', 'vms', eastVms);
			const westClient = makeClientWithService('dc-west', 'vms', westVms);

			const clients = new Map([
				['dc-east', eastClient],
				['dc-west', westClient],
			]);
			const statusUpdates: Array<{
				name: string;
				update: Partial<SiteStatus>;
			}> = [];

			const proxy = new CrossSiteReadProxy(
				() => clients,
				(name, update) => statusUpdates.push({ name, update }),
			) as CrossSiteReadProxy & CrossSiteServices;

			const result = await (
				proxy as unknown as Record<string, { list: () => Promise<unknown> }>
			).vms.list();

			expect(result.data).toHaveLength(3);
			expect(result.data[0]).toEqual({ site: 'dc-east', resource: eastVms[0] });
			expect(result.data[1]).toEqual({ site: 'dc-east', resource: eastVms[1] });
			expect(result.data[2]).toEqual({ site: 'dc-west', resource: westVms[0] });
			expect(result.errors).toHaveLength(0);
		});
	});

	// -----------------------------------------------------------------------
	// Partial failure
	// -----------------------------------------------------------------------

	describe('partial failure handling', () => {
		it('returns data from good site and SiteError for failed site', async () => {
			const eastVms = [{ $key: 1, name: 'vm-east-1' }];
			const eastClient = makeClientWithService('dc-east', 'vms', eastVms);
			const westClient = makeClientWithFailingService(
				'dc-west',
				'vms',
				new Error('connection refused'),
			);

			const clients = new Map([
				['dc-east', eastClient],
				['dc-west', westClient],
			]);
			const statusUpdates: Array<{
				name: string;
				update: Partial<SiteStatus>;
			}> = [];

			const proxy = new CrossSiteReadProxy(
				() => clients,
				(name, update) => statusUpdates.push({ name, update }),
			) as CrossSiteReadProxy & CrossSiteServices;

			const result = await (
				proxy as unknown as Record<string, { list: () => Promise<unknown> }>
			).vms.list();

			// Good site's data
			expect(result.data).toHaveLength(1);
			expect(result.data[0]).toEqual({ site: 'dc-east', resource: eastVms[0] });

			// Bad site's error
			expect(result.errors).toHaveLength(1);
			expect(result.errors[0]).toBeInstanceOf(SiteError);
			expect(result.errors[0].site).toBe('dc-west');
			expect(result.errors[0].message).toContain('dc-west');
			expect(result.errors[0].message).toContain('connection refused');
		});
	});

	// -----------------------------------------------------------------------
	// All sites fail
	// -----------------------------------------------------------------------

	describe('all sites fail', () => {
		it('returns empty data and errors for all sites', async () => {
			const eastClient = makeClientWithFailingService('dc-east', 'vms', new Error('timeout'));
			const westClient = makeClientWithFailingService('dc-west', 'vms', new Error('dns failed'));

			const clients = new Map([
				['dc-east', eastClient],
				['dc-west', westClient],
			]);

			const proxy = new CrossSiteReadProxy(
				() => clients,
				() => {},
			) as CrossSiteReadProxy & CrossSiteServices;

			const result = await (
				proxy as unknown as Record<string, { list: () => Promise<unknown> }>
			).vms.list();

			expect(result.data).toHaveLength(0);
			expect(result.errors).toHaveLength(2);
			expect(result.errors.map((e) => e.site).sort()).toEqual(['dc-east', 'dc-west']);
		});
	});

	// -----------------------------------------------------------------------
	// Tagged filtering (via SiteManager)
	// -----------------------------------------------------------------------

	describe('tagged filtering via SiteManager', () => {
		it('only queries sites with the matching tag', async () => {
			const prodVms = [{ $key: 1, name: 'vm-prod' }];
			const stagingVms = [{ $key: 2, name: 'vm-staging' }];

			const prodClient = makeClientWithService('dc-prod', 'vms', prodVms);
			const stagingClient = makeClientWithService('dc-staging', 'vms', stagingVms);

			const manager = new SiteManager();
			manager.addSite('dc-prod', prodClient, ['production']);
			manager.addSite('dc-staging', stagingClient, ['staging']);

			const result = await (
				manager.tagged('production') as unknown as Record<string, { list: () => Promise<unknown> }>
			).vms.list();

			expect(result.data).toHaveLength(1);
			expect(result.data[0]).toEqual({ site: 'dc-prod', resource: prodVms[0] });
			expect(result.errors).toHaveLength(0);
		});
	});

	// -----------------------------------------------------------------------
	// ListOptions passthrough
	// -----------------------------------------------------------------------

	describe('ListOptions passthrough', () => {
		it('passes options through to each client list call', async () => {
			const eastClient = makeClientWithService('dc-east', 'vms', []);
			const westClient = makeClientWithService('dc-west', 'vms', []);

			const clients = new Map([
				['dc-east', eastClient],
				['dc-west', westClient],
			]);

			const proxy = new CrossSiteReadProxy(
				() => clients,
				() => {},
			) as CrossSiteReadProxy & CrossSiteServices;

			const options = { filter: "status eq 'running'", limit: 10 };
			await (
				proxy as unknown as Record<string, { list: (opts: unknown) => Promise<unknown> }>
			).vms.list(options);

			const eastService = (
				eastClient as unknown as Record<string, { list: ReturnType<typeof vi.fn> }>
			).vms;
			const westService = (
				westClient as unknown as Record<string, { list: ReturnType<typeof vi.fn> }>
			).vms;

			expect(eastService.list).toHaveBeenCalledWith(options);
			expect(westService.list).toHaveBeenCalledWith(options);
		});
	});

	// -----------------------------------------------------------------------
	// Status updates
	// -----------------------------------------------------------------------

	describe('SiteStatus updates', () => {
		it('updates successful site with connected: true', async () => {
			const eastClient = makeClientWithService('dc-east', 'vms', []);
			const clients = new Map([['dc-east', eastClient]]);
			const statusUpdates: Array<{
				name: string;
				update: Partial<SiteStatus>;
			}> = [];

			const proxy = new CrossSiteReadProxy(
				() => clients,
				(name, update) => statusUpdates.push({ name, update }),
			) as CrossSiteReadProxy & CrossSiteServices;

			await (proxy as unknown as Record<string, { list: () => Promise<unknown> }>).vms.list();

			expect(statusUpdates).toHaveLength(1);
			expect(statusUpdates[0].name).toBe('dc-east');
			expect(statusUpdates[0].update.connected).toBe(true);
			expect(statusUpdates[0].update.lastError).toBeUndefined();
		});

		it('updates failed site with connected: false and lastError', async () => {
			const error = new Error('connection timeout');
			const westClient = makeClientWithFailingService('dc-west', 'vms', error);
			const clients = new Map([['dc-west', westClient]]);
			const statusUpdates: Array<{
				name: string;
				update: Partial<SiteStatus>;
			}> = [];

			const proxy = new CrossSiteReadProxy(
				() => clients,
				(name, update) => statusUpdates.push({ name, update }),
			) as CrossSiteReadProxy & CrossSiteServices;

			await (proxy as unknown as Record<string, { list: () => Promise<unknown> }>).vms.list();

			expect(statusUpdates).toHaveLength(1);
			expect(statusUpdates[0].name).toBe('dc-west');
			expect(statusUpdates[0].update.connected).toBe(false);
			expect(statusUpdates[0].update.lastError).toBe(error);
		});
	});

	// -----------------------------------------------------------------------
	// Single site (edge case: not just multi-site)
	// -----------------------------------------------------------------------

	describe('single site fan-out', () => {
		it('works correctly with only one site registered', async () => {
			const eastVms = [
				{ $key: 1, name: 'vm-east-1' },
				{ $key: 2, name: 'vm-east-2' },
			];
			const eastClient = makeClientWithService('dc-east', 'vms', eastVms);

			const clients = new Map([['dc-east', eastClient]]);

			const proxy = new CrossSiteReadProxy(
				() => clients,
				() => {},
			) as CrossSiteReadProxy & CrossSiteServices;

			const result = await (
				proxy as unknown as Record<string, { list: () => Promise<unknown> }>
			).vms.list();

			expect(result.data).toHaveLength(2);
			expect(result.data[0]).toEqual({ site: 'dc-east', resource: eastVms[0] });
			expect(result.data[1]).toEqual({ site: 'dc-east', resource: eastVms[1] });
			expect(result.errors).toHaveLength(0);
		});
	});

	// -----------------------------------------------------------------------
	// Empty sites map
	// -----------------------------------------------------------------------

	describe('empty sites', () => {
		it('returns empty data and errors when no sites are registered', async () => {
			const clients = new Map<string, VergeClient>();

			const proxy = new CrossSiteReadProxy(
				() => clients,
				() => {},
			) as CrossSiteReadProxy & CrossSiteServices;

			const result = await (
				proxy as unknown as Record<string, { list: () => Promise<unknown> }>
			).vms.list();

			expect(result.data).toEqual([]);
			expect(result.errors).toEqual([]);
		});
	});

	// -----------------------------------------------------------------------
	// Integration with SiteManager.all
	// -----------------------------------------------------------------------

	describe('SiteManager.all integration', () => {
		it('manager.all fans out to all registered sites', async () => {
			const eastVms = [{ $key: 1, name: 'vm-east' }];
			const westVms = [{ $key: 2, name: 'vm-west' }];

			const eastClient = makeClientWithService('dc-east', 'vms', eastVms);
			const westClient = makeClientWithService('dc-west', 'vms', westVms);

			const manager = new SiteManager();
			manager.addSite('dc-east', eastClient);
			manager.addSite('dc-west', westClient);

			const result = await (
				manager.all as unknown as Record<string, { list: () => Promise<unknown> }>
			).vms.list();

			expect(result.data).toHaveLength(2);
			expect(result.data.map((d: { site: string }) => d.site).sort()).toEqual([
				'dc-east',
				'dc-west',
			]);
			expect(result.errors).toHaveLength(0);
		});

		it('manager.all updates site status after fan-out', async () => {
			const eastClient = makeClientWithService('dc-east', 'vms', []);
			const error = new Error('down');
			const westClient = makeClientWithFailingService('dc-west', 'vms', error);

			const manager = new SiteManager();
			manager.addSite('dc-east', eastClient);
			manager.addSite('dc-west', westClient);

			await (manager.all as unknown as Record<string, { list: () => Promise<unknown> }>).vms.list();

			const eastStatus = manager.status().get('dc-east');
			expect(eastStatus?.connected).toBe(true);

			const westStatus = manager.status().get('dc-west');
			expect(westStatus?.connected).toBe(false);
			expect(westStatus?.lastError).toBe(error);
		});
	});
});
