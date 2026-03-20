import { describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../src/http.js';
import { AlarmService } from '../../src/services/alarm/service.js';
import type { Alarm } from '../../src/services/alarm/types.js';
import { AlarmTypeService } from '../../src/services/alarm-type/service.js';
import type { AlarmType } from '../../src/services/alarm-type/types.js';

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

const sampleAlarm: Alarm = {
	$key: 1,
	owner: 'vms/123',
	owner_type: 'vm',
	alarm_type: 'vm_cpu_high',
	level: 'warning',
	status: 'active',
	alarm_id: 'abcd1234',
	resolvable: true,
	created: 1700000000,
	modified: 1700000100,
	snooze: 0,
};

const sampleAlarmType: AlarmType = {
	$key: 1,
	key: 'vm_cpu_high',
	name: 'VM CPU High',
	description: 'VM CPU utilization exceeds threshold',
	level: 'warning',
	threshold: 90,
	disable_logging: false,
	allow_delete: false,
	max_snooze_threshold: 100,
	max_snooze_seconds: 86400,
	default_snooze_seconds: 3600,
};

// ---------------------------------------------------------------------------
// AlarmService Tests
// ---------------------------------------------------------------------------

describe('AlarmService', () => {
	describe('read operations', () => {
		it('list() calls /alarms', async () => {
			const http = mockHttp();
			const svc = new AlarmService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleAlarm]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/alarms', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleAlarm]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new AlarmService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleAlarm);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/alarms/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleAlarm);
		});
	});

	describe('resolve', () => {
		it('dispatches resolve action via POST /alarm_actions', async () => {
			const http = mockHttp();
			const svc = new AlarmService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.resolve(42);

			expect(http.post).toHaveBeenCalledWith('/alarm_actions', {
				body: { alarm: 42, action: 'resolve' },
			});
		});

		it('works with string key', async () => {
			const http = mockHttp();
			const svc = new AlarmService(http);
			vi.mocked(http.post).mockResolvedValueOnce(undefined);

			await svc.resolve('7');

			expect(http.post).toHaveBeenCalledWith('/alarm_actions', {
				body: { alarm: '7', action: 'resolve' },
			});
		});
	});

	describe('snooze', () => {
		it('sets snooze to future timestamp via PUT /alarms/{key}', async () => {
			const http = mockHttp();
			const svc = new AlarmService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleAlarm,
				snooze: 1700003600,
			});

			const now = Math.floor(Date.now() / 1000);
			const result = await svc.snooze(1, 3600);

			expect(http.put).toHaveBeenCalledWith('/alarms/1', {
				body: expect.objectContaining({ snooze: expect.any(Number) }),
			});

			// Verify the snooze value is approximately now + 3600
			const callArgs = vi.mocked(http.put).mock.calls[0];
			const snoozeValue = (callArgs[1] as { body: { snooze: number } }).body.snooze;
			expect(snoozeValue).toBeGreaterThanOrEqual(now + 3600 - 2);
			expect(snoozeValue).toBeLessThanOrEqual(now + 3600 + 2);

			expect(result.snooze).toBe(1700003600);
		});

		it('uses default 86400 seconds when no duration provided', async () => {
			const http = mockHttp();
			const svc = new AlarmService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({
				...sampleAlarm,
				snooze: 1700086400,
			});

			const now = Math.floor(Date.now() / 1000);
			await svc.snooze(1);

			const callArgs = vi.mocked(http.put).mock.calls[0];
			const snoozeValue = (callArgs[1] as { body: { snooze: number } }).body.snooze;
			expect(snoozeValue).toBeGreaterThanOrEqual(now + 86400 - 2);
			expect(snoozeValue).toBeLessThanOrEqual(now + 86400 + 2);
		});
	});

	describe('unsnooze', () => {
		it('sets snooze to 0 via PUT /alarms/{key}', async () => {
			const http = mockHttp();
			const svc = new AlarmService(http);
			vi.mocked(http.put).mockResolvedValueOnce(undefined);
			vi.mocked(http.get).mockResolvedValueOnce({ ...sampleAlarm, snooze: 0 });

			const result = await svc.unsnooze(1);

			expect(http.put).toHaveBeenCalledWith('/alarms/1', {
				body: { snooze: 0 },
			});
			expect(result.snooze).toBe(0);
		});
	});

	describe('no create method', () => {
		it('AlarmService does not have a create method', () => {
			const http = mockHttp();
			const svc = new AlarmService(http);

			// WritableService does not have create — only BaseService does
			expect('create' in svc).toBe(false);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.alarms', async () => {
			await import('../../src/services/alarm/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.alarms).toBeDefined();
			expect(client.alarms).toBeInstanceOf(AlarmService);
		});

		it('returns the same instance on repeated access', async () => {
			await import('../../src/services/alarm/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			const first = client.alarms;
			const second = client.alarms;
			expect(first).toBe(second);
		});
	});
});

// ---------------------------------------------------------------------------
// AlarmTypeService Tests
// ---------------------------------------------------------------------------

describe('AlarmTypeService', () => {
	describe('read operations', () => {
		it('list() calls /alarm_types', async () => {
			const http = mockHttp();
			const svc = new AlarmTypeService(http);
			vi.mocked(http.get).mockResolvedValueOnce([sampleAlarmType]);

			const result = await svc.list();

			expect(http.get).toHaveBeenCalledWith('/alarm_types', {
				params: { fields: 'most' },
			});
			expect(result).toEqual([sampleAlarmType]);
		});

		it('get() fetches by key', async () => {
			const http = mockHttp();
			const svc = new AlarmTypeService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleAlarmType);

			const result = await svc.get(1);

			expect(http.get).toHaveBeenCalledWith('/alarm_types/1', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleAlarmType);
		});

		it('get() works with string key', async () => {
			const http = mockHttp();
			const svc = new AlarmTypeService(http);
			vi.mocked(http.get).mockResolvedValueOnce(sampleAlarmType);

			const result = await svc.get('vm_cpu_high');

			expect(http.get).toHaveBeenCalledWith('/alarm_types/vm_cpu_high', {
				params: { fields: 'most' },
			});
			expect(result).toEqual(sampleAlarmType);
		});
	});

	describe('read-only enforcement', () => {
		it('AlarmTypeService does not have create, update, or delete methods', () => {
			const http = mockHttp();
			const svc = new AlarmTypeService(http);

			expect('create' in svc).toBe(false);
			expect('update' in svc).toBe(false);
			expect('delete' in svc).toBe(false);
		});
	});

	describe('service registration', () => {
		it('registers on VergeClient as client.alarmTypes', async () => {
			await import('../../src/services/alarm-type/index.js');
			const { VergeClient } = await import('../../src/client.js');

			const client = new VergeClient({
				host: 'https://test.example.com',
				apiKey: 'test-key',
			});

			expect(client.alarmTypes).toBeDefined();
			expect(client.alarmTypes).toBeInstanceOf(AlarmTypeService);
		});
	});
});
