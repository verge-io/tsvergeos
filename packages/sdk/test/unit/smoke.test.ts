import { describe, expect, it } from 'vitest';
import { SDK_VERSION } from '../../src/index.js';

describe('SDK scaffold', () => {
	it('exports SDK_VERSION as a valid semver string', () => {
		expect(SDK_VERSION).toMatch(/^\d+\.\d+\.\d+/);
	});

	it('SDK_VERSION equals expected value', () => {
		expect(SDK_VERSION).toBe('0.1.0');
	});
});
