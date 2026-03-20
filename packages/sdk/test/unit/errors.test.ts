import { describe, expect, it } from 'vitest';
import {
	ApiError,
	AuthError,
	ConflictError,
	isApiError,
	isAuthError,
	isConflictError,
	isNotFoundError,
	isSiteError,
	isTaskError,
	isTaskTimeoutError,
	isUnsupportedVersionError,
	isValidationError,
	isVergeError,
	NotFoundError,
	SiteError,
	TaskError,
	TaskTimeoutError,
	UnsupportedVersionError,
	ValidationError,
	VergeError,
} from '../../src/errors.js';

// ---------------------------------------------------------------------------
// Error class construction & inheritance
// ---------------------------------------------------------------------------

describe('VergeError', () => {
	it('sets message and name', () => {
		const err = new VergeError('boom');
		expect(err.message).toBe('boom');
		expect(err.name).toBe('VergeError');
		expect(err).toBeInstanceOf(Error);
		expect(err).toBeInstanceOf(VergeError);
	});
});

describe('ApiError', () => {
	it('sets statusCode, endpoint, and message', () => {
		const err = new ApiError(500, '/api/v4/vms', 'Internal error');
		expect(err.statusCode).toBe(500);
		expect(err.endpoint).toBe('/api/v4/vms');
		expect(err.message).toBe('Internal error');
		expect(err.name).toBe('ApiError');
	});

	it('inherits from VergeError and Error', () => {
		const err = new ApiError(500, '/api/v4/vms', 'fail');
		expect(err).toBeInstanceOf(ApiError);
		expect(err).toBeInstanceOf(VergeError);
		expect(err).toBeInstanceOf(Error);
	});
});

describe('ConflictError', () => {
	it('always has statusCode 409', () => {
		const err = new ConflictError('/api/v4/vms', 'conflict');
		expect(err.statusCode).toBe(409);
		expect(err.endpoint).toBe('/api/v4/vms');
		expect(err.name).toBe('ConflictError');
	});

	it('inherits from ApiError, VergeError, and Error', () => {
		const err = new ConflictError('/api/v4/vms', 'conflict');
		expect(err).toBeInstanceOf(ConflictError);
		expect(err).toBeInstanceOf(ApiError);
		expect(err).toBeInstanceOf(VergeError);
		expect(err).toBeInstanceOf(Error);
	});
});

describe('AuthError', () => {
	it('sets message and name', () => {
		const err = new AuthError('bad creds');
		expect(err.message).toBe('bad creds');
		expect(err.name).toBe('AuthError');
	});

	it('inherits from VergeError and Error', () => {
		const err = new AuthError('bad creds');
		expect(err).toBeInstanceOf(AuthError);
		expect(err).toBeInstanceOf(VergeError);
		expect(err).toBeInstanceOf(Error);
	});
});

describe('NotFoundError', () => {
	it('sets resource, id, and default message', () => {
		const err = new NotFoundError('vms', 42);
		expect(err.resource).toBe('vms');
		expect(err.id).toBe(42);
		expect(err.message).toBe('vms with id 42 not found');
		expect(err.name).toBe('NotFoundError');
	});

	it('accepts custom message', () => {
		const err = new NotFoundError('vms', 42, 'custom msg');
		expect(err.message).toBe('custom msg');
	});

	it('accepts string id', () => {
		const err = new NotFoundError('networks', 'abc');
		expect(err.id).toBe('abc');
	});

	it('inherits from VergeError and Error', () => {
		const err = new NotFoundError('vms', 1);
		expect(err).toBeInstanceOf(NotFoundError);
		expect(err).toBeInstanceOf(VergeError);
		expect(err).toBeInstanceOf(Error);
	});
});

describe('ValidationError', () => {
	it('sets message and optional field', () => {
		const err = new ValidationError('invalid value', 'name');
		expect(err.message).toBe('invalid value');
		expect(err.field).toBe('name');
		expect(err.name).toBe('ValidationError');
	});

	it('field is undefined when not provided', () => {
		const err = new ValidationError('bad input');
		expect(err.field).toBeUndefined();
	});

	it('inherits from VergeError and Error', () => {
		const err = new ValidationError('bad');
		expect(err).toBeInstanceOf(ValidationError);
		expect(err).toBeInstanceOf(VergeError);
		expect(err).toBeInstanceOf(Error);
	});
});

describe('TaskError', () => {
	it('sets taskId and message', () => {
		const err = new TaskError(123, 'task failed');
		expect(err.taskId).toBe(123);
		expect(err.message).toBe('task failed');
		expect(err.name).toBe('TaskError');
	});

	it('inherits from VergeError and Error', () => {
		const err = new TaskError(1, 'fail');
		expect(err).toBeInstanceOf(TaskError);
		expect(err).toBeInstanceOf(VergeError);
		expect(err).toBeInstanceOf(Error);
	});
});

describe('TaskTimeoutError', () => {
	it('sets taskId, timeout, and default message', () => {
		const err = new TaskTimeoutError(99, 5000);
		expect(err.taskId).toBe(99);
		expect(err.timeout).toBe(5000);
		expect(err.message).toBe('Task 99 timed out after 5000ms');
		expect(err.name).toBe('TaskTimeoutError');
	});

	it('accepts custom message', () => {
		const err = new TaskTimeoutError(99, 5000, 'custom timeout msg');
		expect(err.message).toBe('custom timeout msg');
	});

	it('inherits from TaskError, VergeError, and Error', () => {
		const err = new TaskTimeoutError(1, 1000);
		expect(err).toBeInstanceOf(TaskTimeoutError);
		expect(err).toBeInstanceOf(TaskError);
		expect(err).toBeInstanceOf(VergeError);
		expect(err).toBeInstanceOf(Error);
	});
});

describe('UnsupportedVersionError', () => {
	it('sets serverVersion, required, and message', () => {
		const err = new UnsupportedVersionError('25.0.0', '26');
		expect(err.serverVersion).toBe('25.0.0');
		expect(err.required).toBe('26');
		expect(err.message).toBe('Server version 25.0.0 is not supported. Minimum required: 26');
		expect(err.name).toBe('UnsupportedVersionError');
	});

	it('inherits from VergeError and Error', () => {
		const err = new UnsupportedVersionError('25.0.0', '26');
		expect(err).toBeInstanceOf(UnsupportedVersionError);
		expect(err).toBeInstanceOf(VergeError);
		expect(err).toBeInstanceOf(Error);
	});
});

describe('SiteError', () => {
	it('sets site and message', () => {
		const err = new SiteError('dc-east', 'connection failed');
		expect(err.site).toBe('dc-east');
		expect(err.message).toBe('connection failed');
		expect(err.name).toBe('SiteError');
	});

	it('wraps cause error via Error.cause', () => {
		const cause = new ApiError(500, '/api/v4/vms', 'server error');
		const err = new SiteError('dc-east', 'site failed', cause);
		expect(err.cause).toBe(cause);
	});

	it('cause is undefined when not provided', () => {
		const err = new SiteError('dc-east', 'fail');
		expect(err.cause).toBeUndefined();
	});

	it('inherits from VergeError and Error', () => {
		const err = new SiteError('dc-east', 'fail');
		expect(err).toBeInstanceOf(SiteError);
		expect(err).toBeInstanceOf(VergeError);
		expect(err).toBeInstanceOf(Error);
	});
});

// ---------------------------------------------------------------------------
// Type guards — positive matches
// ---------------------------------------------------------------------------

describe('type guards — positive matches', () => {
	it('isVergeError matches all SDK errors', () => {
		expect(isVergeError(new VergeError('x'))).toBe(true);
		expect(isVergeError(new ApiError(500, '/', 'x'))).toBe(true);
		expect(isVergeError(new ConflictError('/', 'x'))).toBe(true);
		expect(isVergeError(new AuthError('x'))).toBe(true);
		expect(isVergeError(new NotFoundError('vms', 1))).toBe(true);
		expect(isVergeError(new ValidationError('x'))).toBe(true);
		expect(isVergeError(new TaskError(1, 'x'))).toBe(true);
		expect(isVergeError(new TaskTimeoutError(1, 1000))).toBe(true);
		expect(isVergeError(new UnsupportedVersionError('25', '26'))).toBe(true);
		expect(isVergeError(new SiteError('s', 'x'))).toBe(true);
	});

	it('isApiError matches ApiError and ConflictError', () => {
		expect(isApiError(new ApiError(500, '/', 'x'))).toBe(true);
		expect(isApiError(new ConflictError('/', 'x'))).toBe(true);
	});

	it('isAuthError matches AuthError', () => {
		expect(isAuthError(new AuthError('x'))).toBe(true);
	});

	it('isNotFoundError matches NotFoundError', () => {
		expect(isNotFoundError(new NotFoundError('vms', 1))).toBe(true);
	});

	it('isValidationError matches ValidationError', () => {
		expect(isValidationError(new ValidationError('x'))).toBe(true);
	});

	it('isConflictError matches ConflictError', () => {
		expect(isConflictError(new ConflictError('/', 'x'))).toBe(true);
	});

	it('isTaskError matches TaskError and TaskTimeoutError', () => {
		expect(isTaskError(new TaskError(1, 'x'))).toBe(true);
		expect(isTaskError(new TaskTimeoutError(1, 1000))).toBe(true);
	});

	it('isTaskTimeoutError matches only TaskTimeoutError', () => {
		expect(isTaskTimeoutError(new TaskTimeoutError(1, 1000))).toBe(true);
	});

	it('isUnsupportedVersionError matches UnsupportedVersionError', () => {
		expect(isUnsupportedVersionError(new UnsupportedVersionError('25', '26'))).toBe(true);
	});

	it('isSiteError matches SiteError', () => {
		expect(isSiteError(new SiteError('s', 'x'))).toBe(true);
	});
});

// ---------------------------------------------------------------------------
// Type guards — dual-check pattern
// ---------------------------------------------------------------------------

describe('type guards — dual-check pattern', () => {
	it('isNotFoundError matches ApiError with status 404', () => {
		const err = new ApiError(404, '/api/v4/vms/999', 'not found');
		expect(isNotFoundError(err)).toBe(true);
	});

	it('isAuthError matches ApiError with status 401', () => {
		const err = new ApiError(401, '/api/v4/vms', 'unauthorized');
		expect(isAuthError(err)).toBe(true);
	});

	it('isAuthError matches ApiError with status 403', () => {
		const err = new ApiError(403, '/api/v4/vms', 'forbidden');
		expect(isAuthError(err)).toBe(true);
	});

	it('isValidationError matches ApiError with status 400', () => {
		const err = new ApiError(400, '/api/v4/vms', 'bad request');
		expect(isValidationError(err)).toBe(true);
	});

	it('isConflictError matches ApiError with status 409', () => {
		const err = new ApiError(409, '/api/v4/vms', 'conflict');
		expect(isConflictError(err)).toBe(true);
	});
});

// ---------------------------------------------------------------------------
// Type guards — negative cases
// ---------------------------------------------------------------------------

describe('type guards — negative cases', () => {
	it('all guards return false for null, undefined, and non-errors', () => {
		const guards = [
			isVergeError,
			isApiError,
			isAuthError,
			isNotFoundError,
			isValidationError,
			isConflictError,
			isTaskError,
			isTaskTimeoutError,
			isUnsupportedVersionError,
			isSiteError,
		];

		for (const guard of guards) {
			expect(guard(null)).toBe(false);
			expect(guard(undefined)).toBe(false);
			expect(guard('string')).toBe(false);
			expect(guard(42)).toBe(false);
			expect(guard({})).toBe(false);
		}
	});

	it('all guards return false for plain Error', () => {
		const err = new Error('plain');
		expect(isVergeError(err)).toBe(false);
		expect(isApiError(err)).toBe(false);
		expect(isAuthError(err)).toBe(false);
		expect(isNotFoundError(err)).toBe(false);
		expect(isValidationError(err)).toBe(false);
		expect(isConflictError(err)).toBe(false);
		expect(isTaskError(err)).toBe(false);
		expect(isTaskTimeoutError(err)).toBe(false);
		expect(isUnsupportedVersionError(err)).toBe(false);
		expect(isSiteError(err)).toBe(false);
	});

	it('isApiError does not match non-API SDK errors', () => {
		expect(isApiError(new AuthError('x'))).toBe(false);
		expect(isApiError(new NotFoundError('vms', 1))).toBe(false);
		expect(isApiError(new TaskError(1, 'x'))).toBe(false);
		expect(isApiError(new SiteError('s', 'x'))).toBe(false);
	});

	it('isTaskTimeoutError does not match plain TaskError', () => {
		expect(isTaskTimeoutError(new TaskError(1, 'x'))).toBe(false);
	});

	it('isNotFoundError does not match ApiError with non-404 status', () => {
		expect(isNotFoundError(new ApiError(500, '/', 'x'))).toBe(false);
		expect(isNotFoundError(new ApiError(401, '/', 'x'))).toBe(false);
	});

	it('isAuthError does not match ApiError with non-401/403 status', () => {
		expect(isAuthError(new ApiError(500, '/', 'x'))).toBe(false);
		expect(isAuthError(new ApiError(404, '/', 'x'))).toBe(false);
	});

	it('isValidationError does not match ApiError with non-400 status', () => {
		expect(isValidationError(new ApiError(500, '/', 'x'))).toBe(false);
	});

	it('isConflictError does not match ApiError with non-409 status', () => {
		expect(isConflictError(new ApiError(500, '/', 'x'))).toBe(false);
	});
});
