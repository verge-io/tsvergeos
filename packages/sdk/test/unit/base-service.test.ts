import { describe, expect, it, vi } from 'vitest';
import { ApiError, NotFoundError } from '../../src/errors.js';
import type { HttpClient } from '../../src/http.js';
import {
	type ActionConfig,
	BaseService,
	ReadOnlyService,
	WritableService,
} from '../../src/services/base.js';
import type { Resource } from '../../src/types.js';

// ---------------------------------------------------------------------------
// Dummy types for testing
// ---------------------------------------------------------------------------

interface TestResource extends Resource {
	$key: number;
	name: string;
	description: string;
}

interface TestCreateParams {
	name: string;
	description?: string;
}

interface TestUpdateParams {
	name?: string;
	description?: string;
}

// ---------------------------------------------------------------------------
// Mock HttpClient factory
// ---------------------------------------------------------------------------

function mockHttp(): HttpClient {
	return {
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
		del: vi.fn(),
	} as unknown as HttpClient;
}

// ---------------------------------------------------------------------------
// Concrete test subclasses
// ---------------------------------------------------------------------------

class TestReadOnlyService extends ReadOnlyService<TestResource> {
	constructor(http: HttpClient) {
		super(http, '/widgets', 'Widget');
	}
}

class TestReadOnlyServiceWithDefaults extends ReadOnlyService<TestResource> {
	constructor(http: HttpClient) {
		super(http, '/widgets', 'Widget');
		this.defaultFields = ['$key', 'name', 'description', 'machine#status#status as status'];
	}
}

class TestWritableService extends WritableService<TestResource, TestUpdateParams> {
	constructor(http: HttpClient, actionConfig?: ActionConfig) {
		super(http, '/widgets', 'Widget', actionConfig);
	}

	/** Expose protected method for testing. */
	testDispatchAction(
		action: string,
		key: number | string,
		params?: Record<string, unknown>,
	): Promise<void> {
		return this.dispatchAction(action, key, params);
	}
}

class TestBaseService extends BaseService<TestResource, TestCreateParams, TestUpdateParams> {
	constructor(http: HttpClient, actionConfig?: ActionConfig) {
		super(http, '/widgets', 'Widget', actionConfig);
	}

	/** Expose protected method for testing. */
	testDispatchAction(
		action: string,
		key: number | string,
		params?: Record<string, unknown>,
	): Promise<void> {
		return this.dispatchAction(action, key, params);
	}
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ReadOnlyService', () => {
	describe('list()', () => {
		it('calls correct endpoint with no params', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			const data: TestResource[] = [{ $key: 1, name: 'a', description: 'desc' }];
			vi.mocked(http.get).mockResolvedValueOnce(data);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(data);
		});

		it('passes query params from ListOptions', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.list({
				filter: "name eq 'test'",
				limit: 10,
				offset: 5,
				sort: '-name',
			});

			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: {
					filter: "name eq 'test'",
					fields: 'most',
					limit: 10,
					offset: 5,
					sort: '-name',
				},
			});
		});

		it('uses explicit fields when provided instead of default most', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.list({ fields: ['name', '$key'] });

			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: { fields: ['name', '$key'] },
			});
		});

		it('allows fields string override', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.list({ fields: 'all' });

			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: { fields: 'all' },
			});
		});
	});

	describe('get()', () => {
		it('returns resource by key', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			const resource: TestResource = {
				$key: 42,
				name: 'foo',
				description: 'bar',
			};
			vi.mocked(http.get).mockResolvedValueOnce(resource);

			const result = await svc.get(42);

			expect(http.get).toHaveBeenCalledWith('/widgets/42', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(resource);
		});

		it('accepts string FlexKey', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			const resource: TestResource = {
				$key: 42,
				name: 'foo',
				description: 'bar',
			};
			vi.mocked(http.get).mockResolvedValueOnce(resource);

			const result = await svc.get('42');

			expect(http.get).toHaveBeenCalledWith('/widgets/42', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(resource);
		});

		it('wraps 404 ApiError as NotFoundError with resource name', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			vi.mocked(http.get).mockRejectedValueOnce(new ApiError(404, '/widgets/99', 'Not found'));

			try {
				await svc.get(99);
				expect.fail('should have thrown');
			} catch (err) {
				expect(err).toBeInstanceOf(NotFoundError);
				expect((err as NotFoundError).resource).toBe('Widget');
				expect((err as NotFoundError).id).toBe(99);
			}
		});

		it('re-throws non-404 errors unchanged', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			const err = new ApiError(500, '/widgets/1', 'Server error');
			vi.mocked(http.get).mockRejectedValueOnce(err);

			await expect(svc.get(1)).rejects.toThrow(err);
		});
	});

	describe('getByName()', () => {
		it('filters by name and returns first result', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			const resource: TestResource = {
				$key: 1,
				name: 'target',
				description: 'found',
			};
			vi.mocked(http.get).mockResolvedValueOnce([resource]);

			const result = await svc.getByName('target');

			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: { filter: "name eq 'target'", fields: 'most' },
			});
			expect(result).toEqual(resource);
		});

		it('throws NotFoundError when no results', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			try {
				await svc.getByName('missing');
				expect.fail('should have thrown');
			} catch (err) {
				expect(err).toBeInstanceOf(NotFoundError);
				expect((err as NotFoundError).resource).toBe('Widget');
				expect((err as NotFoundError).id).toBe('missing');
			}
		});
	});

	describe('listAll()', () => {
		it('paginates across multiple pages and yields all items', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);

			// Page 1: full page of 2 items
			const page1: TestResource[] = [
				{ $key: 1, name: 'a', description: '' },
				{ $key: 2, name: 'b', description: '' },
			];
			// Page 2: full page of 2 items
			const page2: TestResource[] = [
				{ $key: 3, name: 'c', description: '' },
				{ $key: 4, name: 'd', description: '' },
			];
			// Page 3: partial page (signals end)
			const page3: TestResource[] = [{ $key: 5, name: 'e', description: '' }];

			vi.mocked(http.get)
				.mockResolvedValueOnce(page1)
				.mockResolvedValueOnce(page2)
				.mockResolvedValueOnce(page3);

			const items: TestResource[] = [];
			for await (const item of svc.listAll({ pageSize: 2 })) {
				items.push(item);
			}

			expect(items).toHaveLength(5);
			expect(items.map((i) => i.$key)).toEqual([1, 2, 3, 4, 5]);

			// Verify pagination calls
			expect(http.get).toHaveBeenCalledTimes(3);
			expect(http.get).toHaveBeenNthCalledWith(1, '/widgets', {
				params: { fields: 'most', limit: 2, offset: 0 },
			});
			expect(http.get).toHaveBeenNthCalledWith(2, '/widgets', {
				params: { fields: 'most', limit: 2, offset: 2 },
			});
			expect(http.get).toHaveBeenNthCalledWith(3, '/widgets', {
				params: { fields: 'most', limit: 2, offset: 4 },
			});
		});

		it('stops when page is smaller than pageSize', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);

			// Single partial page
			const page: TestResource[] = [{ $key: 1, name: 'only', description: '' }];
			vi.mocked(http.get).mockResolvedValueOnce(page);

			const items: TestResource[] = [];
			for await (const item of svc.listAll({ pageSize: 10 })) {
				items.push(item);
			}

			expect(items).toHaveLength(1);
			expect(http.get).toHaveBeenCalledTimes(1);
		});

		it('passes filter and sort options through pages', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]); // empty first page → done

			const items: TestResource[] = [];
			for await (const item of svc.listAll({
				filter: "status eq 'active'",
				sort: 'name',
				pageSize: 5,
			})) {
				items.push(item);
			}

			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: {
					filter: "status eq 'active'",
					fields: 'most',
					sort: 'name',
					limit: 5,
					offset: 0,
				},
			});
		});

		it('clamps pageSize to MAX_PAGE_SIZE', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]); // empty page → done

			const items: TestResource[] = [];
			for await (const item of svc.listAll({ pageSize: 5000 })) {
				items.push(item);
			}

			// MAX_PAGE_SIZE is 1000, so limit should be clamped
			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: { fields: 'most', limit: 1000, offset: 0 },
			});
		});

		it('uses DEFAULT_PAGE_SIZE when no pageSize specified', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]); // empty page → done

			const items: TestResource[] = [];
			for await (const item of svc.listAll()) {
				items.push(item);
			}

			// DEFAULT_PAGE_SIZE is 100
			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: { fields: 'most', limit: 100, offset: 0 },
			});
		});
	});

	describe('key normalization', () => {
		it('list() sets $key from id when $key is missing (hex-keyed resources)', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			const hexId = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2';
			vi.mocked(http.get).mockResolvedValueOnce([
				{ id: hexId, name: 'Recipe', description: 'test' },
			]);

			const result = await svc.list();

			expect(result[0].$key).toBe(hexId);
		});

		it('get() sets $key from id when $key is missing', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			const hexId = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2';
			vi.mocked(http.get).mockResolvedValueOnce({
				id: hexId,
				name: 'Recipe',
				description: 'test',
			});

			const result = await svc.get(hexId);

			expect(result.$key).toBe(hexId);
		});

		it('does not overwrite $key when already present', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			vi.mocked(http.get).mockResolvedValueOnce([
				{ $key: 42, id: 99, name: 'Widget', description: 'test' },
			]);

			const result = await svc.list();

			expect(result[0].$key).toBe(42);
		});

		it('handles items with neither $key nor id gracefully', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			vi.mocked(http.get).mockResolvedValueOnce([{ name: 'Orphan', description: 'no key' }]);

			const result = await svc.list();

			expect(result[0].$key).toBeUndefined();
		});
	});
});

describe('WritableService', () => {
	describe('update()', () => {
		it('PUTs params and does read-back GET', async () => {
			const http = mockHttp();
			const svc = new TestWritableService(http);
			const updated: TestResource = {
				$key: 5,
				name: 'updated',
				description: 'new',
			};
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce(updated);

			const result = await svc.update(5, { name: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/widgets/5', {
				body: { name: 'updated' },
			});
			expect(http.get).toHaveBeenCalledWith('/widgets/5', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(updated);
		});

		it('skips read-back when readBack is false', async () => {
			const http = mockHttp();
			const svc = new TestWritableService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);

			const result = await svc.update(5, { name: 'x' }, { readBack: false });

			expect(http.put).toHaveBeenCalledOnce();
			expect(http.get).not.toHaveBeenCalled();
			expect(result.$key).toBe(5);
		});
	});

	describe('delete()', () => {
		it('DELETEs the resource', async () => {
			const http = mockHttp();
			const svc = new TestWritableService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(10);

			expect(http.del).toHaveBeenCalledWith('/widgets/10');
		});

		it('wraps 404 as NotFoundError', async () => {
			const http = mockHttp();
			const svc = new TestWritableService(http);
			vi.mocked(http.del).mockRejectedValueOnce(new ApiError(404, '/widgets/99', 'Not found'));

			try {
				await svc.delete(99);
				expect.fail('should have thrown');
			} catch (err) {
				expect(err).toBeInstanceOf(NotFoundError);
				expect((err as NotFoundError).resource).toBe('Widget');
				expect((err as NotFoundError).id).toBe(99);
			}
		});

		it('re-throws non-404 errors unchanged', async () => {
			const http = mockHttp();
			const svc = new TestWritableService(http);
			const err = new ApiError(500, '/widgets/1', 'Server error');
			vi.mocked(http.del).mockRejectedValueOnce(err);

			await expect(svc.delete(1)).rejects.toThrow(err);
		});
	});

	describe('dispatchAction()', () => {
		it('POSTs to default-derived action endpoint with correct body shape', async () => {
			const http = mockHttp();
			const svc = new TestWritableService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.testDispatchAction('poweron', 42);

			expect(http.post).toHaveBeenCalledWith('/widget_actions', {
				body: { widget: 42, action: 'poweron' },
			});
		});

		it('includes params when provided', async () => {
			const http = mockHttp();
			const svc = new TestWritableService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.testDispatchAction('reset', 42, { apply: true });

			expect(http.post).toHaveBeenCalledWith('/widget_actions', {
				body: { widget: 42, action: 'reset', params: { apply: true } },
			});
		});

		it('uses custom actionConfig when provided', async () => {
			const http = mockHttp();
			const svc = new TestWritableService(http, {
				endpoint: 'custom_actions',
				key: 'custom_key',
			});
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.testDispatchAction('sync', 7);

			expect(http.post).toHaveBeenCalledWith('/custom_actions', {
				body: { custom_key: 7, action: 'sync' },
			});
		});
	});
});

describe('BaseService', () => {
	describe('create()', () => {
		it('POSTs, extracts $key, and does read-back GET', async () => {
			const http = mockHttp();
			const svc = new TestBaseService(http);
			const created: TestResource = {
				$key: 100,
				name: 'new',
				description: 'fresh',
			};
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 100 });
			vi.mocked(http.get).mockResolvedValueOnce(created);

			const result = await svc.create({ name: 'new', description: 'fresh' });

			expect(http.post).toHaveBeenCalledWith('/widgets', {
				body: { name: 'new', description: 'fresh' },
			});
			expect(http.get).toHaveBeenCalledWith('/widgets/100', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(created);
		});

		it('skips read-back when readBack is false', async () => {
			const http = mockHttp();
			const svc = new TestBaseService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 200 });

			const result = await svc.create({ name: 'quick' }, { readBack: false });

			expect(http.post).toHaveBeenCalledOnce();
			expect(http.get).not.toHaveBeenCalled();
			expect(result.$key).toBe(200);
		});
	});

	describe('inherited operations', () => {
		it('inherits list from ReadOnlyService', async () => {
			const http = mockHttp();
			const svc = new TestBaseService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([]);
		});

		it('inherits dispatchAction from WritableService', async () => {
			const http = mockHttp();
			const svc = new TestBaseService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.testDispatchAction('poweron', 1);

			expect(http.post).toHaveBeenCalledWith('/widget_actions', {
				body: { widget: 1, action: 'poweron' },
			});
		});
	});
});

describe('defaultFields', () => {
	describe('list()', () => {
		it('uses defaultFields when no user fields option provided', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyServiceWithDefaults(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: {
					fields: ['$key', 'name', 'description', 'machine#status#status as status'],
				},
			});
		});

		it('user-provided fields overrides defaultFields', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyServiceWithDefaults(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.list({ fields: 'all' });

			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: { fields: 'all' },
			});
		});

		it('user-provided fields array overrides defaultFields', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyServiceWithDefaults(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.list({ fields: ['name'] });

			expect(http.get).toHaveBeenCalledWith('/widgets', {
				params: { fields: ['name'] },
			});
		});
	});

	describe('get()', () => {
		it('uses defaultFields when defined', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyServiceWithDefaults(http);
			vi.mocked(http.get).mockResolvedValueOnce({
				$key: 1,
				name: 'a',
				description: 'b',
			});

			await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/widgets/1', {
				params: {
					fields: ['$key', 'name', 'description', 'machine#status#status as status'],
				},
			});
		});

		it('falls back to most when no defaultFields defined', async () => {
			const http = mockHttp();
			const svc = new TestReadOnlyService(http);
			vi.mocked(http.get).mockResolvedValueOnce({
				$key: 1,
				name: 'a',
				description: 'b',
			});

			await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/widgets/1', {
				params: { fields: 'most' },
			});
		});
	});
});

describe('FK normalization', () => {
	it('collapses $key-based FK objects to scalar in list()', async () => {
		const http = mockHttp();
		const svc = new TestReadOnlyService(http);
		vi.mocked(http.get).mockResolvedValueOnce([
			{
				$key: 1,
				name: 'a',
				description: 'd',
				cluster: { $key: 3, name: 'default' },
			},
		]);

		const result = await svc.list();

		expect((result[0] as Record<string, unknown>).cluster).toBe(3);
	});

	it('collapses id-based FK objects to scalar', async () => {
		const http = mockHttp();
		const svc = new TestReadOnlyService(http);
		vi.mocked(http.get).mockResolvedValueOnce([
			{
				$key: 1,
				name: 'a',
				description: 'd',
				node: { id: 'abc', name: 'node1' },
			},
		]);

		const result = await svc.list();

		expect((result[0] as Record<string, unknown>).node).toBe('abc');
	});

	it('collapses arrays of FK objects', async () => {
		const http = mockHttp();
		const svc = new TestReadOnlyService(http);
		vi.mocked(http.get).mockResolvedValueOnce([
			{
				$key: 1,
				name: 'a',
				description: 'd',
				nodes: [
					{ $key: 10, name: 'n1' },
					{ $key: 20, name: 'n2' },
				],
			},
		]);

		const result = await svc.list();

		expect((result[0] as Record<string, unknown>).nodes).toEqual([10, 20]);
	});

	it('leaves scalars, null, and plain objects untouched', async () => {
		const http = mockHttp();
		const svc = new TestReadOnlyService(http);
		vi.mocked(http.get).mockResolvedValueOnce([
			{
				$key: 1,
				name: 'a',
				description: 'd',
				count: 5,
				empty: null,
				meta: { foo: 'bar' },
			},
		]);

		const result = await svc.list();
		const item = result[0] as Record<string, unknown>;

		expect(item.count).toBe(5);
		expect(item.empty).toBeNull();
		expect(item.meta).toEqual({ foo: 'bar' });
	});

	it('does not modify root $key', async () => {
		const http = mockHttp();
		const svc = new TestReadOnlyService(http);
		vi.mocked(http.get).mockResolvedValueOnce([{ $key: 42, name: 'a', description: 'd' }]);

		const result = await svc.list();

		expect(result[0].$key).toBe(42);
	});

	it('normalizes FKs in get() responses', async () => {
		const http = mockHttp();
		const svc = new TestReadOnlyService(http);
		vi.mocked(http.get).mockResolvedValueOnce({
			$key: 1,
			name: 'a',
			description: 'd',
			cluster: { $key: 3, name: 'default' },
		});

		const result = await svc.get(1);

		expect((result as Record<string, unknown>).cluster).toBe(3);
	});

	it('collapses id-based array elements', async () => {
		const http = mockHttp();
		const svc = new TestReadOnlyService(http);
		vi.mocked(http.get).mockResolvedValueOnce([
			{
				$key: 1,
				name: 'a',
				description: 'd',
				tags: [
					{ id: 't1', label: 'a' },
					{ id: 't2', label: 'b' },
				],
			},
		]);

		const result = await svc.list();

		expect((result[0] as Record<string, unknown>).tags).toEqual(['t1', 't2']);
	});

	it('leaves array scalars untouched', async () => {
		const http = mockHttp();
		const svc = new TestReadOnlyService(http);
		vi.mocked(http.get).mockResolvedValueOnce([
			{ $key: 1, name: 'a', description: 'd', ports: [80, 443] },
		]);

		const result = await svc.list();

		expect((result[0] as Record<string, unknown>).ports).toEqual([80, 443]);
	});
});
