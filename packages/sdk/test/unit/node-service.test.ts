import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { NodeService } from '../../src/services/node/service.js';
import type { Node } from '../../src/services/node/types.js';

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
// Sample Node resource
// ---------------------------------------------------------------------------

const sampleNode: Node = {
	$key: 1,
	name: 'node-1',
	physical: true,
	ram: 65536,
	cores: 16,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('NodeService', () => {
	describe('constructor', () => {
		it('uses /nodes resource path', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNode]);

			await svc.list();

			expect(http.get).toHaveBeenCalledWith('/nodes', {
				params: { fields: 'most' },
			});
		});
	});

	describe('CRUD (inherited)', () => {
		it('list() calls /nodes', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNode]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/nodes', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleNode]);
		});

		it('get() calls /nodes/{key}', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleNode);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/nodes/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleNode);
		});

		it('update() PUTs to /nodes/{key} and does read-back', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleNode,
				description: 'updated',
			});

			const result = await svc.update(1, { description: 'updated' });

			expect(http.put).toHaveBeenCalledWith('/nodes/1', {
				body: { description: 'updated' },
			});
			expect(http.get).toHaveBeenCalledWith('/nodes/1', {
				params: { fields: 'most' },
			});
			expect(result.description).toBe('updated');
		});

		it('delete() DELETEs /nodes/{key}', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.del).mockResolvedValueOnce(undefined);

			await svc.delete(1);

			expect(http.del).toHaveBeenCalledWith('/nodes/1');
		});
	});

	describe('listByCluster', () => {
		it('adds cluster filter', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNode]);

			await svc.listByCluster(1);

			expect(http.get).toHaveBeenCalledWith('/nodes', {
				params: { fields: 'most', filter: 'cluster eq 1' },
			});
		});

		it('combines cluster filter with existing filter', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNode]);

			await svc.listByCluster(1, { filter: 'physical eq true' });

			expect(http.get).toHaveBeenCalledWith('/nodes', {
				params: {
					fields: 'most',
					filter: '(physical eq true) and (cluster eq 1)',
				},
			});
		});
	});

	describe('listPhysical', () => {
		it('adds physical filter', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleNode]);

			await svc.listPhysical();

			expect(http.get).toHaveBeenCalledWith('/nodes', {
				params: { fields: 'most', filter: 'physical eq true' },
			});
		});
	});

	describe('maintenance operations', () => {
		it('enableMaintenance dispatches maintenance action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.enableMaintenance(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'maintenance' },
			});
		});

		it('disableMaintenance dispatches leavemaintenance action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.disableMaintenance(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'leavemaintenance' },
			});
		});

		it('maintenanceReboot dispatches maintenance_reboot action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.maintenanceReboot(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'maintenance_reboot' },
			});
		});
	});

	describe('power operations', () => {
		it('powerOn dispatches poweron action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOn(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'poweron' },
			});
		});

		it('powerOff dispatches poweroff action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOff(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'poweroff' },
			});
		});

		it('reset dispatches reset action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.reset(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'reset' },
			});
		});

		it('kill dispatches kill action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.kill(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'kill' },
			});
		});

		it('accepts string keys for power operations', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.powerOn('1');

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: '1', action: 'poweron' },
			});
		});
	});

	describe('refresh operations', () => {
		it('refresh dispatches refresh action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refresh(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'refresh' },
			});
		});

		it('refreshStatus dispatches refresh_status action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refreshStatus(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'refresh_status' },
			});
		});

		it('refreshFabricStatus dispatches refresh_fabric_status action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.refreshFabricStatus(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'refresh_fabric_status' },
			});
		});
	});

	describe('IPMI operations', () => {
		it('testIpmi dispatches ipmi_test action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.testIpmi(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'ipmi_test' },
			});
		});

		it('clearSel dispatches clear_sel action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.clearSel(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'clear_sel' },
			});
		});
	});

	describe('other actions', () => {
		it('receiveFile dispatches receive_file action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.receiveFile(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'receive_file' },
			});
		});

		it('getInterfaces dispatches interfaces action', async () => {
			const http = mockHttp();
			const svc = new NodeService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.getInterfaces(1);

			expect(http.post).toHaveBeenCalledWith('/node_actions', {
				body: { node: 1, action: 'interfaces' },
			});
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.nodes', async () => {
			await import('../../src/services/node/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.nodes).toBeDefined();
			expect(client.nodes).toBeInstanceOf(NodeService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/node/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.nodes;
			const second = client.nodes;
			expect(first).toBe(second);
		});
	});
});
