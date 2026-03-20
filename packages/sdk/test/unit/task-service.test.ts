import { describe, expect, it, vi } from 'vitest';
import { TaskTimeoutError } from '../../src/errors.js';
import type { HttpClient } from '../../src/http.js';
import { TaskService } from '../../src/services/task/service.js';
import type { Task } from '../../src/services/task/types.js';

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

const sampleTask: Task = {
	$key: 1,
	id: 'a'.repeat(40),
	owner: 'vms/123',
	table: 'vms',
	action: 'snapshot',
	action_display: 'Take Snapshot',
	name: 'Daily VM Snapshot',
	description: 'Snapshot VM 123 daily',
	enabled: true,
	last_run: 1700000000,
	delete_after_run: false,
	status: 'idle',
	system_created: false,
	creator: 'admin',
};

// ---------------------------------------------------------------------------
// TaskService Tests
// ---------------------------------------------------------------------------

describe('TaskService', () => {
	describe('CRUD', () => {
		it('list() calls /tasks', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleTask]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/tasks', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleTask]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleTask);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/tasks/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleTask);
		});

		it('create() POSTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 2 });
			vi.mocked(http.get).mockResolvedValueOnce({ ...sampleTask, $key: 2 });

			const result = await svc.create({
				owner: 'vms/123',
				action: 'snapshot',
				name: 'New Task',
			});

			expect(http.post).toHaveBeenCalledWith('/tasks', {
				body: { owner: 'vms/123', action: 'snapshot', name: 'New Task' },
			});
			expect(http.get).toHaveBeenCalledWith('/tasks/2', {
				params: { fields: 'most' },
			});
			expect(result.$key).toBe(2);
		});

		it('update() PUTs and does read-back', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTask,
				name: 'Updated Task',
			});

			const result = await svc.update(1, { name: 'Updated Task' });

			expect(http.put).toHaveBeenCalledWith('/tasks/1', {
				body: { name: 'Updated Task' },
			});
			expect(result.name).toBe('Updated Task');
		});

		it('delete() calls DELETE on /tasks/{key}', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/tasks/1');
		});
	});

	describe('execute', () => {
		it('dispatches execute action via POST /task_actions', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.execute(42);

			expect(http.post).toHaveBeenCalledWith('/task_actions', {
				body: { task: 42, action: 'execute' },
			});
		});

		it('passes optional params to execute action', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.execute(42, { force: true });

			expect(http.post).toHaveBeenCalledWith('/task_actions', {
				body: { task: 42, action: 'execute', params: { force: true } },
			});
		});

		it('works with string key', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.execute('7');

			expect(http.post).toHaveBeenCalledWith('/task_actions', {
				body: { task: '7', action: 'execute' },
			});
		});
	});

	describe('waitForCompletion', () => {
		it('returns immediately when task is already idle', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTask,
				status: 'idle',
			});

			const result = await svc.waitForCompletion(1);

			expect(result.status).toBe('idle');
			expect(http.get).toHaveBeenCalledTimes(1);
		});

		it('polls until task transitions from running to idle', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.get)
				.mockResolvedValueOnce({ ...sampleTask, status: 'running' })
				.mockResolvedValueOnce({ ...sampleTask, status: 'running' })
				.mockResolvedValueOnce({ ...sampleTask, status: 'idle' });

			const result = await svc.waitForCompletion(1, {
				interval: 10,
				timeout: 5000,
			});

			expect(result.status).toBe('idle');
			expect(http.get).toHaveBeenCalledTimes(3);
		});

		it('throws TaskTimeoutError when timeout is exceeded', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			// Always return running
			vi.mocked(http.get).mockResolvedValue({
				...sampleTask,
				status: 'running',
			});

			await expect(svc.waitForCompletion(1, { timeout: 50, interval: 10 })).rejects.toThrow(
				TaskTimeoutError,
			);
		});

		it('uses default timeout and interval when no options provided', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTask,
				status: 'idle',
			});

			const result = await svc.waitForCompletion(1);

			expect(result.status).toBe('idle');
		});
	});

	describe('enable / disable', () => {
		it('enable() updates with enabled: true', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTask,
				enabled: true,
			});

			const result = await svc.enable(1);

			expect(http.put).toHaveBeenCalledWith('/tasks/1', {
				body: { enabled: true },
			});
			expect(result.enabled).toBe(true);
		});

		it('disable() updates with enabled: false', async () => {
			const http = mockHttp();
			const svc = new TaskService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleTask,
				enabled: false,
			});

			const result = await svc.disable(1);

			expect(http.put).toHaveBeenCalledWith('/tasks/1', {
				body: { enabled: false },
			});
			expect(result.enabled).toBe(false);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.tasks', async () => {
			await import('../../src/services/task/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.tasks).toBeDefined();
			expect(client.tasks).toBeInstanceOf(TaskService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/task/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.tasks;
			const second = client.tasks;
			expect(first).toBe(second);
		});
	});
});
