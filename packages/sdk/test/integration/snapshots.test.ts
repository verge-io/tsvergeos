import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/snapshot-profile/index.js';
import '../../src/services/snapshot-profile-period/index.js';
import '../../src/services/cloud-snapshot/index.js';
import '../../src/services/cloud-snapshot-vm/index.js';
import '../../src/services/cloud-snapshot-tenant/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Snapshot Profiles & Cloud Snapshots integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	// ─── Snapshot Profiles ───────────────────────────────────────────────

	it('should list snapshot profiles', async () => {
		await delay();
		const profiles = await client.snapshotProfiles.list();

		expect(Array.isArray(profiles)).toBe(true);
		// System typically has at least one default profile
		expect(profiles.length).toBeGreaterThan(0);

		for (const profile of profiles) {
			expect(profile.$key).toBeDefined();
			expect(typeof profile.name).toBe('string');
		}
	});

	it('should get a snapshot profile by key', async () => {
		await delay();
		const profiles = await client.snapshotProfiles.list({ limit: 1 });

		if (profiles.length === 0) {
			return;
		}

		const key = profiles[0].$key;
		await delay();
		const profile = await client.snapshotProfiles.get(key);

		expect(profile.$key).toBeDefined();
		expect(typeof profile.name).toBe('string');
	});

	// ─── Snapshot Profile Periods ────────────────────────────────────────

	it('should list snapshot profile periods', async () => {
		await delay();
		const periods = await client.snapshotProfilePeriods.list();

		expect(Array.isArray(periods)).toBe(true);

		for (const period of periods) {
			expect(period.$key).toBeDefined();
			expect(period.profile).toBeDefined();
		}
	});

	it('should list periods by profile', async () => {
		await delay();
		const profiles = await client.snapshotProfiles.list({ limit: 1 });

		if (profiles.length === 0) {
			return;
		}

		const profileKey = profiles[0].$key;
		await delay();
		const periods = await client.snapshotProfilePeriods.listByProfile(profileKey);

		expect(Array.isArray(periods)).toBe(true);
		for (const period of periods) {
			expect(String(period.profile)).toBe(String(profileKey));
		}
	});

	// ─── Cloud Snapshots ─────────────────────────────────────────────────

	it('should list cloud snapshots', async () => {
		await delay();
		const snapshots = await client.cloudSnapshots.list();

		expect(Array.isArray(snapshots)).toBe(true);

		for (const snap of snapshots) {
			expect(snap.$key).toBeDefined();
			if (snap.name !== undefined) {
				expect(typeof snap.name).toBe('string');
			}
		}
	});

	it('should get a cloud snapshot by key if any exist', async () => {
		await delay();
		const snapshots = await client.cloudSnapshots.list({ limit: 1 });

		if (snapshots.length === 0) {
			return;
		}

		const key = snapshots[0].$key;
		await delay();
		const snap = await client.cloudSnapshots.get(key);

		expect(snap.$key).toBeDefined();
	});

	// ─── Cloud Snapshot VMs ──────────────────────────────────────────────

	it('should list cloud snapshot VMs for a snapshot', async () => {
		await delay();
		const snapshots = await client.cloudSnapshots.list({ limit: 1 });

		if (snapshots.length === 0) {
			return;
		}

		const snapshotKey = snapshots[0].$key;
		await delay();
		const vms = await client.cloudSnapshotVms.listBySnapshot(snapshotKey);

		expect(Array.isArray(vms)).toBe(true);
		for (const vm of vms) {
			expect(vm.$key).toBeDefined();
			expect(String(vm.cloud_snapshot)).toBe(String(snapshotKey));
		}
	});

	// ─── Cloud Snapshot Tenants ──────────────────────────────────────────

	it('should list cloud snapshot tenants for a snapshot', async () => {
		await delay();
		const snapshots = await client.cloudSnapshots.list({ limit: 1 });

		if (snapshots.length === 0) {
			return;
		}

		const snapshotKey = snapshots[0].$key;
		await delay();
		const tenants = await client.cloudSnapshotTenants.listBySnapshot(snapshotKey);

		expect(Array.isArray(tenants)).toBe(true);
		for (const tenant of tenants) {
			expect(tenant.$key).toBeDefined();
			expect(String(tenant.cloud_snapshot)).toBe(String(snapshotKey));
		}
	});
});
