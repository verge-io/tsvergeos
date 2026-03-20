import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/volume/index.js';
import '../../src/services/volume-snapshot/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Volume integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list volumes', async () => {
		await delay();
		const volumes = await client.volumes.list({ limit: 10 });

		expect(Array.isArray(volumes)).toBe(true);
		// System likely has volumes from NAS services
		for (const vol of volumes) {
			expect(vol.$key).toBeDefined();
		}
	});

	it('should get a volume by string key and verify SHA1 format', async () => {
		await delay();
		const volumes = await client.volumes.list({ limit: 1 });

		if (volumes.length === 0) {
			// No volumes on this system — skip gracefully
			return;
		}

		const key = volumes[0].$key;
		await delay();
		const vol = await client.volumes.get(key);

		expect(vol.$key).toBe(key);
		// $key should be a 40-char hex string (SHA1)
		expect(typeof vol.$key).toBe('string');
		expect(String(vol.$key)).toMatch(/^[0-9a-f]{40}$/);
		// id field should match $key
		expect(String(vol.id)).toMatch(/^[0-9a-f]{40}$/);
	});

	it('should list volume snapshots', async () => {
		await delay();
		const snapshots = await client.volumeSnapshots.list({ limit: 10 });

		expect(Array.isArray(snapshots)).toBe(true);
		// Snapshots use integer keys
		for (const snap of snapshots) {
			expect(snap.$key).toBeDefined();
		}
	});

	it('should list snapshots by volume key', async () => {
		await delay();
		const volumes = await client.volumes.list({ limit: 1 });

		if (volumes.length === 0) {
			return;
		}

		const volumeKey = String(volumes[0].$key);
		await delay();
		const snapshots = await client.volumeSnapshots.listByVolume(volumeKey);

		expect(Array.isArray(snapshots)).toBe(true);
		// All returned snapshots should reference the parent volume
		for (const snap of snapshots) {
			expect(String(snap.volume)).toBe(volumeKey);
		}
	});
});
