import { describe, expect, it } from 'vitest';
import {
	API_BASE_PATH,
	API_VERSION,
	DEFAULT_PAGE_SIZE,
	DEFAULT_RETRIES,
	DEFAULT_RETRY_BACKOFF,
	DEFAULT_TIMEOUT,
	ENV_PREFIX,
	MAX_PAGE_SIZE,
	MIN_MAJOR_VERSION,
	SDK_VERSION,
	TASK_POLL_INTERVAL,
	TASK_WAIT_TIMEOUT,
	UPLOAD_CHUNK_SIZE,
} from '../../src/constants.js';
import type {
	ApiResponse,
	ClientConfig,
	FlexKey,
	ListAllOptions,
	ListOptions,
	MutationOptions,
	Resource,
} from '../../src/types.js';

describe('Constants', () => {
	it('SDK_VERSION is a semver string', () => {
		expect(SDK_VERSION).toMatch(/^\d+\.\d+\.\d+/);
	});

	it('API_VERSION is v4', () => {
		expect(API_VERSION).toBe('v4');
	});

	it('API_BASE_PATH is /api/v4', () => {
		expect(API_BASE_PATH).toBe('/api/v4');
	});

	it('DEFAULT_TIMEOUT is 30 seconds', () => {
		expect(DEFAULT_TIMEOUT).toBe(30_000);
	});

	it('DEFAULT_RETRIES is 3', () => {
		expect(DEFAULT_RETRIES).toBe(3);
	});

	it('DEFAULT_RETRY_BACKOFF is 1 second', () => {
		expect(DEFAULT_RETRY_BACKOFF).toBe(1_000);
	});

	it('DEFAULT_PAGE_SIZE is 100', () => {
		expect(DEFAULT_PAGE_SIZE).toBe(100);
	});

	it('MAX_PAGE_SIZE is 1000', () => {
		expect(MAX_PAGE_SIZE).toBe(1_000);
	});

	it('TASK_WAIT_TIMEOUT is 5 minutes', () => {
		expect(TASK_WAIT_TIMEOUT).toBe(300_000);
	});

	it('TASK_POLL_INTERVAL is 2 seconds', () => {
		expect(TASK_POLL_INTERVAL).toBe(2_000);
	});

	it('MIN_MAJOR_VERSION is 25', () => {
		expect(MIN_MAJOR_VERSION).toBe(25);
	});

	it('UPLOAD_CHUNK_SIZE is 256 KB', () => {
		expect(UPLOAD_CHUNK_SIZE).toBe(262_144);
	});

	it('ENV_PREFIX is VERGEOS_', () => {
		expect(ENV_PREFIX).toBe('VERGEOS_');
	});
});

describe('Type contracts', () => {
	it('FlexKey accepts number', () => {
		const key: FlexKey = 42;
		expect(key).toBe(42);
	});

	it('FlexKey accepts string', () => {
		const key: FlexKey = '42';
		expect(key).toBe('42');
	});

	it('Resource has $key of FlexKey', () => {
		const resource: Resource = { $key: 1 };
		expect(resource.$key).toBe(1);

		const resourceStr: Resource = { $key: 'abc' };
		expect(resourceStr.$key).toBe('abc');
	});

	it('ApiResponse accepts generic type parameter', () => {
		const response: ApiResponse<string> = {
			$key: 1,
			response: 'hello',
		};
		expect(response.$key).toBe(1);
		expect(response.response).toBe('hello');
		expect(response.err).toBeUndefined();
	});

	it('ApiResponse with error', () => {
		const response: ApiResponse = {
			err: 'something went wrong',
		};
		expect(response.err).toBe('something went wrong');
		expect(response.$key).toBeUndefined();
		expect(response.response).toBeUndefined();
	});

	it('ClientConfig requires host', () => {
		const config: ClientConfig = {
			host: '192.168.1.100',
			apiKey: 'test-key',
		};
		expect(config.host).toBe('192.168.1.100');
		expect(config.apiKey).toBe('test-key');
	});

	it('ClientConfig with all optional fields', () => {
		const config: ClientConfig = {
			host: 'verge.example.com',
			username: 'admin',
			password: 'secret',
			apiKey: 'key-123',
			verifySsl: false,
			timeout: 60_000,
			retries: 5,
			retryBackoff: 2_000,
			fetch: globalThis.fetch,
			signal: new AbortController().signal,
		};
		expect(config.host).toBe('verge.example.com');
		expect(config.verifySsl).toBe(false);
		expect(config.timeout).toBe(60_000);
		expect(config.retries).toBe(5);
	});

	it('ListOptions accepts filter, fields, sort, limit, offset', () => {
		const opts: ListOptions = {
			filter: "name eq 'test'",
			fields: ['name', '$key'],
			sort: '-name',
			limit: 50,
			offset: 10,
		};
		expect(opts.filter).toBe("name eq 'test'");
		expect(opts.fields).toEqual(['name', '$key']);
		expect(opts.limit).toBe(50);
	});

	it('ListOptions.fields accepts string', () => {
		const opts: ListOptions = {
			fields: 'name,$key',
		};
		expect(opts.fields).toBe('name,$key');
	});

	it('ListAllOptions omits limit/offset and adds pageSize', () => {
		const opts: ListAllOptions = {
			filter: "status eq 'running'",
			pageSize: 200,
		};
		expect(opts.filter).toBe("status eq 'running'");
		expect(opts.pageSize).toBe(200);
		// TypeScript compile-time check: limit and offset should not be assignable
		// (verified by the Omit<ListOptions, 'limit' | 'offset'> type)
	});

	it('MutationOptions defaults readBack concept', () => {
		const opts: MutationOptions = { readBack: false };
		expect(opts.readBack).toBe(false);

		const defaultOpts: MutationOptions = {};
		expect(defaultOpts.readBack).toBeUndefined();
	});
});
