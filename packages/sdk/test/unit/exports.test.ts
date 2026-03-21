import { describe, expect, it } from 'vitest';
import * as sdk from '../../src/index.js';

describe('Public API exports', () => {
	describe('core classes', () => {
		it('exports VergeClient as a class', () => {
			expect(sdk.VergeClient).toBeDefined();
			expect(typeof sdk.VergeClient).toBe('function');
		});

		it('exports HttpClient as a class', () => {
			expect(sdk.HttpClient).toBeDefined();
			expect(typeof sdk.HttpClient).toBe('function');
		});

		it('exports Filter as a class', () => {
			expect(sdk.Filter).toBeDefined();
			expect(typeof sdk.Filter).toBe('function');
		});

		it('exports buildFilter as a function', () => {
			expect(sdk.buildFilter).toBeDefined();
			expect(typeof sdk.buildFilter).toBe('function');
		});
	});

	describe('error classes', () => {
		it('exports VergeError as a class', () => {
			expect(sdk.VergeError).toBeDefined();
			expect(typeof sdk.VergeError).toBe('function');
		});

		it('exports ApiError as a class', () => {
			expect(sdk.ApiError).toBeDefined();
			expect(typeof sdk.ApiError).toBe('function');
		});

		it('exports AuthError as a class', () => {
			expect(sdk.AuthError).toBeDefined();
			expect(typeof sdk.AuthError).toBe('function');
		});

		it('exports NotFoundError as a class', () => {
			expect(sdk.NotFoundError).toBeDefined();
			expect(typeof sdk.NotFoundError).toBe('function');
		});

		it('exports ConflictError as a class', () => {
			expect(sdk.ConflictError).toBeDefined();
			expect(typeof sdk.ConflictError).toBe('function');
		});

		it('exports ValidationError as a class', () => {
			expect(sdk.ValidationError).toBeDefined();
			expect(typeof sdk.ValidationError).toBe('function');
		});

		it('exports SiteError as a class', () => {
			expect(sdk.SiteError).toBeDefined();
			expect(typeof sdk.SiteError).toBe('function');
		});

		it('exports TaskError as a class', () => {
			expect(sdk.TaskError).toBeDefined();
			expect(typeof sdk.TaskError).toBe('function');
		});

		it('exports TaskTimeoutError as a class', () => {
			expect(sdk.TaskTimeoutError).toBeDefined();
			expect(typeof sdk.TaskTimeoutError).toBe('function');
		});

		it('exports UnsupportedVersionError as a class', () => {
			expect(sdk.UnsupportedVersionError).toBeDefined();
			expect(typeof sdk.UnsupportedVersionError).toBe('function');
		});
	});

	describe('type guard functions', () => {
		it('exports isVergeError as a function', () => {
			expect(typeof sdk.isVergeError).toBe('function');
		});

		it('exports isApiError as a function', () => {
			expect(typeof sdk.isApiError).toBe('function');
		});

		it('exports isAuthError as a function', () => {
			expect(typeof sdk.isAuthError).toBe('function');
		});

		it('exports isNotFoundError as a function', () => {
			expect(typeof sdk.isNotFoundError).toBe('function');
		});

		it('exports isConflictError as a function', () => {
			expect(typeof sdk.isConflictError).toBe('function');
		});

		it('exports isValidationError as a function', () => {
			expect(typeof sdk.isValidationError).toBe('function');
		});

		it('exports isSiteError as a function', () => {
			expect(typeof sdk.isSiteError).toBe('function');
		});

		it('exports isTaskError as a function', () => {
			expect(typeof sdk.isTaskError).toBe('function');
		});

		it('exports isTaskTimeoutError as a function', () => {
			expect(typeof sdk.isTaskTimeoutError).toBe('function');
		});

		it('exports isUnsupportedVersionError as a function', () => {
			expect(typeof sdk.isUnsupportedVersionError).toBe('function');
		});
	});

	describe('constants', () => {
		it('exports SDK_VERSION as a string', () => {
			expect(typeof sdk.SDK_VERSION).toBe('string');
		});

		it('exports API_BASE_PATH as a string', () => {
			expect(typeof sdk.API_BASE_PATH).toBe('string');
		});

		it('exports API_VERSION as a string', () => {
			expect(typeof sdk.API_VERSION).toBe('string');
		});

		it('exports DEFAULT_TIMEOUT as a number', () => {
			expect(typeof sdk.DEFAULT_TIMEOUT).toBe('number');
		});

		it('exports DEFAULT_PAGE_SIZE as a number', () => {
			expect(typeof sdk.DEFAULT_PAGE_SIZE).toBe('number');
		});

		it('exports MAX_PAGE_SIZE as a number', () => {
			expect(typeof sdk.MAX_PAGE_SIZE).toBe('number');
		});

		it('exports DEFAULT_RETRIES as a number', () => {
			expect(typeof sdk.DEFAULT_RETRIES).toBe('number');
		});

		it('exports DEFAULT_RETRY_BACKOFF as a number', () => {
			expect(typeof sdk.DEFAULT_RETRY_BACKOFF).toBe('number');
		});

		it('exports MIN_MAJOR_VERSION as a number', () => {
			expect(typeof sdk.MIN_MAJOR_VERSION).toBe('number');
		});

		it('exports ENV_PREFIX as a string', () => {
			expect(typeof sdk.ENV_PREFIX).toBe('string');
		});

		it('exports TASK_POLL_INTERVAL as a number', () => {
			expect(typeof sdk.TASK_POLL_INTERVAL).toBe('number');
		});

		it('exports TASK_WAIT_TIMEOUT as a number', () => {
			expect(typeof sdk.TASK_WAIT_TIMEOUT).toBe('number');
		});

		it('exports UPLOAD_CHUNK_SIZE as a number', () => {
			expect(typeof sdk.UPLOAD_CHUNK_SIZE).toBe('number');
		});
	});

	describe('completeness check', () => {
		it('has no unexpected runtime exports', () => {
			const expectedExports = new Set([
				// Classes
				'VergeClient',
				'HttpClient',
				'Filter',
				'SiteManager',
				'CrossSiteReadProxy',
				// Base service classes
				'ReadOnlyService',
				'WritableService',
				'BaseService',
				// Functions
				'buildFilter',
				'quoteFilterString',
				// Error classes
				'VergeError',
				'ApiError',
				'AuthError',
				'NotFoundError',
				'ConflictError',
				'ValidationError',
				'SiteError',
				'TaskError',
				'TaskTimeoutError',
				'UnsupportedVersionError',
				// Type guards
				'isVergeError',
				'isApiError',
				'isAuthError',
				'isNotFoundError',
				'isConflictError',
				'isValidationError',
				'isSiteError',
				'isTaskError',
				'isTaskTimeoutError',
				'isUnsupportedVersionError',
				// Constants
				'SDK_VERSION',
				'API_BASE_PATH',
				'API_VERSION',
				'DEFAULT_TIMEOUT',
				'DEFAULT_PAGE_SIZE',
				'MAX_PAGE_SIZE',
				'DEFAULT_RETRIES',
				'DEFAULT_RETRY_BACKOFF',
				'MIN_MAJOR_VERSION',
				'ENV_PREFIX',
				'TASK_POLL_INTERVAL',
				'TASK_WAIT_TIMEOUT',
				'UPLOAD_CHUNK_SIZE',
			]);

			const actualExports = Object.keys(sdk);
			for (const key of actualExports) {
				expect(expectedExports.has(key)).toBe(true);
			}
			// Also verify we have all expected exports
			for (const key of expectedExports) {
				expect(actualExports).toContain(key);
			}
		});
	});
});
