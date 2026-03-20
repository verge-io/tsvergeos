import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/task/index.js';
import '../../src/services/alarm/index.js';
import '../../src/services/alarm-type/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Tasks, Alarms & AlarmTypes integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	// ── Tasks ─────────────────────────────────────────────────────────────────

	it('should list tasks', async () => {
		await delay();
		const tasks = await client.tasks.list({ limit: 10 });

		expect(Array.isArray(tasks)).toBe(true);
		// System-created tasks should exist on any active system
		expect(tasks.length).toBeGreaterThan(0);
		for (const task of tasks) {
			expect(task.$key).toBeDefined();
			expect(task.name).toBeDefined();
		}
	});

	it('should get a specific task by key', async () => {
		await delay();
		const tasks = await client.tasks.list({ limit: 1 });
		expect(tasks.length).toBeGreaterThan(0);

		await delay();
		const task = await client.tasks.get(tasks[0].$key);

		expect(task.$key).toBe(tasks[0].$key);
		expect(task.name).toBe(tasks[0].name);
		// Tasks have a SHA1 id field
		expect(task.id).toBeDefined();
		expect(typeof task.id).toBe('string');
	});

	it('should list tasks with fields filter', async () => {
		await delay();
		const tasks = await client.tasks.list({
			limit: 5,
			fields: '$key,name,status,enabled',
		});

		expect(Array.isArray(tasks)).toBe(true);
		expect(tasks.length).toBeGreaterThan(0);
		for (const task of tasks) {
			expect(task.$key).toBeDefined();
			expect(task.name).toBeDefined();
		}
	});

	// ── Alarms ────────────────────────────────────────────────────────────────

	it('should list alarms (may be empty)', async () => {
		await delay();
		const alarms = await client.alarms.list({ limit: 10 });

		expect(Array.isArray(alarms)).toBe(true);
		// Alarms may or may not exist — just verify the response shape
		for (const alarm of alarms) {
			expect(alarm.$key).toBeDefined();
			if (alarm.level) {
				expect(typeof alarm.level).toBe('string');
			}
		}
	});

	it('should get a specific alarm if any exist', async () => {
		await delay();
		const alarms = await client.alarms.list({ limit: 1 });

		if (alarms.length === 0) {
			// No alarms on this system — skip gracefully
			return;
		}

		await delay();
		const alarm = await client.alarms.get(alarms[0].$key);

		expect(alarm.$key).toBe(alarms[0].$key);
	});

	// ── Alarm Types ───────────────────────────────────────────────────────────

	it('should list alarm types (reference data)', async () => {
		await delay();
		const types = await client.alarmTypes.list({ limit: 20 });

		expect(Array.isArray(types)).toBe(true);
		// Alarm types are built-in reference data, should always exist
		expect(types.length).toBeGreaterThan(0);
		for (const t of types) {
			// Alarm types use string `key` as identifier, not integer `$key`
			expect(t.key).toBeDefined();
			expect(typeof t.key).toBe('string');
			if (t.name) {
				expect(typeof t.name).toBe('string');
			}
		}
	});

	it('should get a specific alarm type by key', async () => {
		await delay();
		const types = await client.alarmTypes.list({
			limit: 1,
			fields: 'key,name',
		});
		expect(types.length).toBeGreaterThan(0);
		expect(types[0].key).toBeDefined();

		await delay();
		// Alarm types use string `key` field as their identifier
		const typeKey = types[0].key as string;
		const alarmType = await client.alarmTypes.get(typeKey);

		expect(alarmType.key).toBe(types[0].key);
		if (alarmType.name) {
			expect(alarmType.name).toBe(types[0].name);
		}
	});
});
