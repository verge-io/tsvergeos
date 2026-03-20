import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { MachineDeviceService } from '../../src/services/machine-device/service.js';
import type { MachineDevice } from '../../src/services/machine-device/types.js';

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
// Sample device resource
// ---------------------------------------------------------------------------

const sampleDevice: MachineDevice = {
	$key: 5,
	machine: 42,
	machine_type: 'vm',
	type: 'tpm',
	name: 'TPM 2.0',
	description: 'Virtual TPM device',
	orderid: 1,
	enabled: true,
	optional: false,
	count: 1,
	created: 1699900000,
	modified: 1699900000,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('MachineDeviceService', () => {
	describe('constructor', () => {
		it('uses /machine_devices resource path', async () => {
			const http = mockHttp();
			const svc = new MachineDeviceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDevice]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_devices', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('list() calls /machine_devices', async () => {
			const http = mockHttp();
			const svc = new MachineDeviceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDevice]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/machine_devices', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleDevice]);
		});

		it('get() calls /machine_devices/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineDeviceService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleDevice);

			const result = await svc.get(5);

			expect(http.get).toHaveBeenCalledWith('/machine_devices/5', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleDevice);
		});

		it('create() POSTs to /machine_devices and does read-back', async () => {
			const http = mockHttp();
			const svc = new MachineDeviceService(http);
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 5 });
			vi.mocked(http.get).mockResolvedValueOnce(sampleDevice);

			const result = await svc.create({
				machine: 42,
				type: 'tpm',
				name: 'TPM 2.0',
			});

			expect(http.post).toHaveBeenCalledWith('/machine_devices', {
				body: { machine: 42, type: 'tpm', name: 'TPM 2.0' },
			});
			expect(http.get).toHaveBeenCalledWith('/machine_devices/5', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleDevice);
		});

		it('create() passes settings_args through on create', async () => {
			const http = mockHttp();
			const svc = new MachineDeviceService(http);
			const settingsArgs = { profile: 'gaming', vram: 4096 };
			vi.mocked(http.post).mockResolvedValueOnce({ $key: 6 });
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleDevice,
				$key: 6,
				type: 'node_host_gpu_devices',
				settings_args: settingsArgs,
			});

			const result = await svc.create({
				machine: 42,
				type: 'node_host_gpu_devices',
				name: 'GPU',
				settings_args: settingsArgs,
			});

			expect(http.post).toHaveBeenCalledWith('/machine_devices', {
				body: {
					machine: 42,
					type: 'node_host_gpu_devices',
					name: 'GPU',
					settings_args: settingsArgs,
				},
			});
			expect(result.settings_args).toEqual(settingsArgs);
		});

		it('update() PUTs to /machine_devices/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new MachineDeviceService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleDevice,
				description: 'updated',
			});

			const result = await svc.update(5, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/machine_devices/5', {
				body: { description: 'updated' },
			});
			expect(http.get).toHaveBeenCalledWith('/machine_devices/5', {
				params: { fields: 'most' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() DELETEs /machine_devices/{key}', async () => {
			const http = mockHttp();
			const svc = new MachineDeviceService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(5);

			expect(http.del).toHaveBeenCalledWith('/machine_devices/5');
		});
	});

	describe('listByMachine', () => {
		it('filters by machine FK', async () => {
			const http = mockHttp();
			const svc = new MachineDeviceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleDevice]);

			const result = await svc.listByMachine(42);

			expect(http.get).toHaveBeenCalledWith('/machine_devices', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
			expect(result).toEqual([sampleDevice]);
		});

		it('accepts string keys', async () => {
			const http = mockHttp();
			const svc = new MachineDeviceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine('42');

			expect(http.get).toHaveBeenCalledWith('/machine_devices', {
				params: { fields: 'most', filter: 'machine eq 42' },
			});
		});

		it('combines with existing filter in options', async () => {
			const http = mockHttp();
			const svc = new MachineDeviceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine(42, { filter: "type eq 'tpm'" });

			expect(http.get).toHaveBeenCalledWith('/machine_devices', {
				params: {
					fields: 'most',
					filter: "machine eq 42 and type eq 'tpm'",
				},
			});
		});

		it('passes additional list options through', async () => {
			const http = mockHttp();
			const svc = new MachineDeviceService(http);
			vi.mocked(http.get).mockResolvedValueOnce([]);

			await svc.listByMachine(42, { sort: 'orderid', limit: 10 });

			expect(http.get).toHaveBeenCalledWith('/machine_devices', {
				params: {
					fields: 'most',
					filter: 'machine eq 42',
					sort: 'orderid',
					limit: 10,
				},
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.machineDevices', async () => {
			await import('../../src/services/machine-device/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.machineDevices).toBeDefined();
			expect(client.machineDevices).toBeInstanceOf(MachineDeviceService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/machine-device/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.machineDevices;
			const second = client.machineDevices;
			expect(first).toBe(second);
		});
	});
});
