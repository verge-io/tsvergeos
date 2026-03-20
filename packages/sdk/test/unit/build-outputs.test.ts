import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const distDir = resolve(import.meta.dirname, '../../dist');

describe('build outputs', () => {
	const expectedFiles = [
		// ESM
		'index.js',
		'types.js',
		'full.js',
		// CJS
		'index.cjs',
		'types.cjs',
		'full.cjs',
		// Declaration files
		'index.d.ts',
		'types.d.ts',
		'full.d.ts',
		// Source maps
		'index.js.map',
		'index.cjs.map',
		'types.js.map',
		'types.cjs.map',
		'full.js.map',
		'full.cjs.map',
	];

	for (const file of expectedFiles) {
		it(`dist/ contains ${file}`, () => {
			expect(existsSync(resolve(distDir, file))).toBe(true);
		});
	}
});
