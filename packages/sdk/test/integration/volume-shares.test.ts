import { beforeAll, expect, it } from 'vitest';
import { VergeClient } from '../../src/client.js';
import '../../src/services/volume-cifs-share/index.js';
import '../../src/services/volume-nfs-share/index.js';
import '../../src/services/volume-sync/index.js';
import { createClientConfig, delay, skipIfNoCredentials } from './helpers.js';

const describeIf = skipIfNoCredentials();

describeIf('Volume shares & syncs integration', () => {
	let client: VergeClient;

	beforeAll(async () => {
		const config = await createClientConfig();
		client = await VergeClient.connect(config);
	});

	it('should list CIFS shares without error', async () => {
		await delay();
		const shares = await client.volumeCifsShares.list({ limit: 10 });

		expect(Array.isArray(shares)).toBe(true);
		for (const share of shares) {
			expect(share.$key).toBeDefined();
			expect(typeof share.name).toBe('string');
		}
	});

	it('should list NFS shares without error', async () => {
		await delay();
		const shares = await client.volumeNfsShares.list({ limit: 10 });

		expect(Array.isArray(shares)).toBe(true);
		for (const share of shares) {
			expect(share.$key).toBeDefined();
			expect(typeof share.name).toBe('string');
		}
	});

	it('should list volume syncs without error', async () => {
		await delay();
		const syncs = await client.volumeSyncs.list({ limit: 10 });

		expect(Array.isArray(syncs)).toBe(true);
		for (const sync of syncs) {
			expect(sync.$key).toBeDefined();
			expect(typeof sync.name).toBe('string');
		}
	});
});
