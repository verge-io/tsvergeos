import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { VMService } from '../../src/services/vm/service.js';
import type { VM } from '../../src/services/vm/types.js';

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
// Sample VM resource
// ---------------------------------------------------------------------------

const sampleVM: VM = {
	$key: 42,
	name: 'test-vm',
	description: 'A test virtual machine',
	enabled: true,
	cpu_cores: 2,
	ram: 2048,
	powerstate: false,
	os_family: 'linux',
	console: 'vnc',
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('VMService', () => {
	describe('constructor', () => {
		it('uses /vms resource path', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVM]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vms', undefined);
		});
	});

	describe('CRUD (inherited)', () => {
		it('list() calls /vms', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleVM]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/vms', undefined);
			expect(result).toEqual([sampleVM]);
		});

		it('get() calls /vms/{key}', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleVM);

			const result = await svc.get(42);

			expect(http.get).toHaveBeenCalledWith('/vms/42');
			expect(result).toEqual(sampleVM);
		});

		it('create() POSTs to /vms and does read-back', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 42 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleVM);

			const result = await svc.create({ name: 'test-vm' });

			expect(http.post).toHaveBeenCalledWith('/vms', {
				body: { name: 'test-vm' },
			});
			expect(http.get).toHaveBeenCalledWith('/vms/42');
			expect(result).toEqual(sampleVM);
		});

		it('update() PUTs to /vms/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleVM,
				description: 'updated',
			});

			const result = await svc.update(42, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/vms/42', {
				body: { description: 'updated' },
			});
			expect(http.get).toHaveBeenCalledWith('/vms/42');
			expect(result.description).toBe('updated');
		});

		it('delete() DELETEs /vms/{key}', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(42);

			expect(http.del).toHaveBeenCalledWith('/vms/42');
		});
	});

	describe('power operations', () => {
		it('powerOn dispatches to /vm_actions with action poweron', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOn(42);

			expect(http.post).toHaveBeenCalledWith('/vm_actions', {
				body: { vm: 42, action: 'poweron' },
			});
		});

		it('powerOff dispatches with action poweroff', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOff(42);

			expect(http.post).toHaveBeenCalledWith('/vm_actions', {
				body: { vm: 42, action: 'poweroff' },
			});
		});

		it('kill dispatches with action kill', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.kill(42);

			expect(http.post).toHaveBeenCalledWith('/vm_actions', {
				body: { vm: 42, action: 'kill' },
			});
		});

		it('reset dispatches with action reset', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.reset(42);

			expect(http.post).toHaveBeenCalledWith('/vm_actions', {
				body: { vm: 42, action: 'reset' },
			});
		});

		it('guestReboot dispatches with action guestreset', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.guestReboot(42);

			expect(http.post).toHaveBeenCalledWith('/vm_actions', {
				body: { vm: 42, action: 'guestreset' },
			});
		});

		it('guestShutdown dispatches with action guestshutdown', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.guestShutdown(42);

			expect(http.post).toHaveBeenCalledWith('/vm_actions', {
				body: { vm: 42, action: 'guestshutdown' },
			});
		});

		it('accepts string keys for power operations', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOn('42');

			expect(http.post).toHaveBeenCalledWith('/vm_actions', {
				body: { vm: '42', action: 'poweron' },
			});
		});
	});

	describe('clone', () => {
		it('dispatches clone action without options', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.clone(42);

			expect(http.post).toHaveBeenCalledWith('/vm_actions', {
				body: { vm: 42, action: 'clone' },
			});
		});

		it('passes clone options in params', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.clone(42, { name: 'cloned-vm', preserve_macs: true });

			expect(http.post).toHaveBeenCalledWith('/vm_actions', {
				body: {
					vm: 42,
					action: 'clone',
					params: { name: 'cloned-vm', preserve_macs: true },
				},
			});
		});
	});

	describe('snapshot', () => {
		it('dispatches quiesce_snapshot action without options', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.snapshot(42);

			expect(http.post).toHaveBeenCalledWith('/vm_actions', {
				body: { vm: 42, action: 'quiesce_snapshot' },
			});
		});

		it('passes snapshot options in params', async () => {
			const http = mockHttp();
			const svc = new VMService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.snapshot(42, { name: 'snap-1', quiesce: true });

			expect(http.post).toHaveBeenCalledWith('/vm_actions', {
				body: {
					vm: 42,
					action: 'quiesce_snapshot',
					params: { name: 'snap-1', quiesce: true },
				},
			});
		});
	});

	describe('getConsoleURL', () => {
		it('returns correct URL format', () => {
			const http = mockHttp('https://verge.example.com');
			const svc = new VMService(http);

			const url = svc.getConsoleURL(42);

			expect(url).toBe('https://verge.example.com/#/vm-console/42');
		});

		it('works with string keys', () => {
			const http = mockHttp('https://verge.example.com');
			const svc = new VMService(http);

			const url = svc.getConsoleURL('42');

			expect(url).toBe('https://verge.example.com/#/vm-console/42');
		});

		it('uses the host from http client', () => {
			const http = mockHttp('https://my-verge-host.local');
			const svc = new VMService(http);

			const url = svc.getConsoleURL(99);

			expect(url).toBe('https://my-verge-host.local/#/vm-console/99');
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.vms', async () => {
			// Import the registration side-effect
			await import('../../src/services/vm/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.vms).toBeDefined();
			expect(client.vms).toBeInstanceOf(VMService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/vm/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.vms;
			const second = client.vms;
			expect(first).toBe(second);
		});
	});
});
