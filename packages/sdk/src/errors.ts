/**
 * Base error class for all tsvergeos SDK errors.
 * All SDK-specific errors extend this class, enabling catch blocks
 * to distinguish SDK errors from other runtime errors.
 */
export class VergeError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'VergeError';
		Object.setPrototypeOf(this, VergeError.prototype);
	}
}

/**
 * Error thrown when the VergeOS API returns an HTTP error response.
 * Contains the HTTP status code and the endpoint that was called.
 */
export class ApiError extends VergeError {
	/** HTTP status code from the API response. */
	readonly statusCode: number;

	/** API endpoint that returned the error. */
	readonly endpoint: string;

	constructor(statusCode: number, endpoint: string, message: string) {
		super(message);
		this.name = 'ApiError';
		this.statusCode = statusCode;
		this.endpoint = endpoint;
		Object.setPrototypeOf(this, ApiError.prototype);
	}
}

/**
 * Error thrown when the API returns a 409 Conflict response.
 * Extends {@link ApiError} with statusCode always set to 409.
 */
export class ConflictError extends ApiError {
	constructor(endpoint: string, message: string) {
		super(409, endpoint, message);
		this.name = 'ConflictError';
		Object.setPrototypeOf(this, ConflictError.prototype);
	}
}

/**
 * Error thrown when authentication fails (invalid credentials or insufficient permissions).
 */
export class AuthError extends VergeError {
	constructor(message: string) {
		super(message);
		this.name = 'AuthError';
		Object.setPrototypeOf(this, AuthError.prototype);
	}
}

/**
 * Error thrown when a requested resource is not found.
 */
export class NotFoundError extends VergeError {
	/** The type of resource that was not found (e.g., "vms", "networks"). */
	readonly resource: string;

	/** The ID of the resource that was not found. */
	readonly id: number | string;

	constructor(resource: string, id: number | string, message?: string) {
		super(message ?? `${resource} with id ${id} not found`);
		this.name = 'NotFoundError';
		this.resource = resource;
		this.id = id;
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

/**
 * Error thrown when input validation fails.
 */
export class ValidationError extends VergeError {
	/** The field that failed validation, if applicable. */
	readonly field?: string;

	constructor(message: string, field?: string) {
		super(message);
		this.name = 'ValidationError';
		this.field = field;
		Object.setPrototypeOf(this, ValidationError.prototype);
	}
}

/**
 * Error thrown when a VergeOS task fails.
 */
export class TaskError extends VergeError {
	/** The ID of the task that failed. */
	readonly taskId: number | string;

	constructor(taskId: number | string, message: string) {
		super(message);
		this.name = 'TaskError';
		this.taskId = taskId;
		Object.setPrototypeOf(this, TaskError.prototype);
	}
}

/**
 * Error thrown when a task exceeds its timeout waiting for completion.
 * Extends {@link TaskError} with the timeout duration that was exceeded.
 */
export class TaskTimeoutError extends TaskError {
	/** The timeout duration in milliseconds that was exceeded. */
	readonly timeout: number;

	constructor(taskId: number | string, timeout: number, message?: string) {
		super(taskId, message ?? `Task ${taskId} timed out after ${timeout}ms`);
		this.name = 'TaskTimeoutError';
		this.timeout = timeout;
		Object.setPrototypeOf(this, TaskTimeoutError.prototype);
	}
}

/**
 * Error thrown when the VergeOS server version is below the required minimum.
 */
export class UnsupportedVersionError extends VergeError {
	/** The server version that was detected. */
	readonly serverVersion: string;

	/** The minimum required version. */
	readonly required: string;

	constructor(serverVersion: string, required: string) {
		super(`Server version ${serverVersion} is not supported. Minimum required: ${required}`);
		this.name = 'UnsupportedVersionError';
		this.serverVersion = serverVersion;
		this.required = required;
		Object.setPrototypeOf(this, UnsupportedVersionError.prototype);
	}
}

/**
 * Error thrown when an operation on a specific site fails in a multi-site context.
 * Wraps the original error using the standard ES2022 `Error.cause` property.
 */
export class SiteError extends VergeError {
	/** The name of the site where the error occurred. */
	readonly site: string;

	constructor(site: string, message: string, cause?: Error) {
		super(message);
		this.name = 'SiteError';
		this.site = site;
		if (cause !== undefined) {
			this.cause = cause;
		}
		Object.setPrototypeOf(this, SiteError.prototype);
	}
}

// ---------------------------------------------------------------------------
// Type Guards
// ---------------------------------------------------------------------------

/**
 * Type guard that returns `true` for any {@link VergeError} instance.
 */
export const isVergeError = (err: unknown): err is VergeError => err instanceof VergeError;

/**
 * Type guard that returns `true` for {@link ApiError} instances,
 * including subclasses like {@link ConflictError}.
 */
export const isApiError = (err: unknown): err is ApiError => err instanceof ApiError;

/**
 * Type guard that returns `true` for {@link AuthError} instances
 * OR {@link ApiError} instances with status 401 or 403 (dual-check pattern).
 */
export const isAuthError = (err: unknown): err is AuthError =>
	err instanceof AuthError ||
	(err instanceof ApiError && (err.statusCode === 401 || err.statusCode === 403));

/**
 * Type guard that returns `true` for {@link NotFoundError} instances
 * OR {@link ApiError} instances with status 404 (dual-check pattern).
 */
export const isNotFoundError = (err: unknown): err is NotFoundError =>
	err instanceof NotFoundError || (err instanceof ApiError && err.statusCode === 404);

/**
 * Type guard that returns `true` for {@link ValidationError} instances
 * OR {@link ApiError} instances with status 400 (dual-check pattern).
 */
export const isValidationError = (err: unknown): err is ValidationError =>
	err instanceof ValidationError || (err instanceof ApiError && err.statusCode === 400);

/**
 * Type guard that returns `true` for {@link ConflictError} instances
 * OR {@link ApiError} instances with status 409 (dual-check pattern).
 */
export const isConflictError = (err: unknown): err is ConflictError =>
	err instanceof ConflictError || (err instanceof ApiError && err.statusCode === 409);

/**
 * Type guard that returns `true` for {@link TaskError} instances,
 * including subclasses like {@link TaskTimeoutError}.
 */
export const isTaskError = (err: unknown): err is TaskError => err instanceof TaskError;

/**
 * Type guard that returns `true` for {@link TaskTimeoutError} instances only.
 */
export const isTaskTimeoutError = (err: unknown): err is TaskTimeoutError =>
	err instanceof TaskTimeoutError;

/**
 * Type guard that returns `true` for {@link UnsupportedVersionError} instances only.
 */
export const isUnsupportedVersionError = (err: unknown): err is UnsupportedVersionError =>
	err instanceof UnsupportedVersionError;

/**
 * Type guard that returns `true` for {@link SiteError} instances only.
 */
export const isSiteError = (err: unknown): err is SiteError => err instanceof SiteError;
