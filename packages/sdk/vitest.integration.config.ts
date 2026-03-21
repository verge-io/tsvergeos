import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => {
	// Load .env from project root (two directories up from packages/sdk)
	const env: Record<string, string> = {};
	try {
		const content = readFileSync(resolve(__dirname, '../../.env'), 'utf8');
		for (const line of content.split('\n')) {
			const match = line.match(/^([^#=\s]+)\s*=\s*(.*)$/);
			if (match) {
				env[match[1]] = match[2];
			}
		}
	} catch {
		// No .env file — rely on environment variables
	}

	return {
		test: {
			include: ['test/integration/**/*.test.ts'],
			testTimeout: 120_000,
			sequence: {
				concurrent: false,
			},
			fileParallelism: false,
			env,
		},
	};
});
