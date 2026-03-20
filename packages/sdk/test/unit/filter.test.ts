import { describe, expect, it } from 'vitest';
import { buildFilter, Filter } from '../../src/filter.js';

describe('Filter (fluent API)', () => {
	describe('individual operators', () => {
		it('eq produces correct filter string', () => {
			expect(new Filter().eq('status', 'running').build()).toBe("status eq 'running'");
		});

		it('ne produces correct filter string', () => {
			expect(new Filter().ne('status', 'stopped').build()).toBe("status ne 'stopped'");
		});

		it('gt produces correct filter string', () => {
			expect(new Filter().gt('cpu_cores', 2).build()).toBe('cpu_cores gt 2');
		});

		it('ge produces correct filter string', () => {
			expect(new Filter().ge('ram', 4096).build()).toBe('ram ge 4096');
		});

		it('lt produces correct filter string', () => {
			expect(new Filter().lt('ram', 65536).build()).toBe('ram lt 65536');
		});

		it('le produces correct filter string', () => {
			expect(new Filter().le('cpu_cores', 8).build()).toBe('cpu_cores le 8');
		});

		it('like produces correct filter string', () => {
			expect(new Filter().like('name', 'web%').build()).toBe("name like 'web%'");
		});

		it('in produces correct filter string', () => {
			expect(new Filter().in('status', ['running', 'stopped']).build()).toBe(
				"status in ('running', 'stopped')",
			);
		});
	});

	describe('implicit AND between chained conditions', () => {
		it('joins two conditions with and', () => {
			const result = new Filter().eq('status', 'running').gt('cpu_cores', 2).build();
			expect(result).toBe("status eq 'running' and cpu_cores gt 2");
		});

		it('joins three conditions with and', () => {
			const result = new Filter()
				.eq('status', 'running')
				.gt('cpu_cores', 2)
				.le('ram', 65536)
				.build();
			expect(result).toBe("status eq 'running' and cpu_cores gt 2 and ram le 65536");
		});
	});

	describe('explicit OR', () => {
		it('uses or conjunction between conditions', () => {
			const result = new Filter().eq('status', 'running').or().eq('status', 'stopped').build();
			expect(result).toBe("status eq 'running' or status eq 'stopped'");
		});

		it('mixes and/or conjunctions', () => {
			const result = new Filter()
				.eq('type', 'internal')
				.eq('status', 'running')
				.or()
				.eq('status', 'stopped')
				.build();
			expect(result).toBe("type eq 'internal' and status eq 'running' or status eq 'stopped'");
		});
	});

	describe('value formatting', () => {
		it('quotes strings with single quotes', () => {
			expect(new Filter().eq('name', 'test-vm').build()).toBe("name eq 'test-vm'");
		});

		it('escapes single quotes in strings', () => {
			expect(new Filter().eq('name', "O'Brien").build()).toBe("name eq 'O''Brien'");
		});

		it('formats numbers as raw values', () => {
			expect(new Filter().eq('cpu_cores', 4).build()).toBe('cpu_cores eq 4');
		});

		it('formats floating point numbers', () => {
			expect(new Filter().gt('cpu_usage', 0.5).build()).toBe('cpu_usage gt 0.5');
		});

		it('formats booleans as true/false', () => {
			expect(new Filter().eq('enabled', true).build()).toBe('enabled eq true');
			expect(new Filter().eq('enabled', false).build()).toBe('enabled eq false');
		});

		it('formats null as null', () => {
			expect(new Filter().eq('description', null).build()).toBe('description eq null');
		});
	});

	describe('like wildcard conversion', () => {
		it('converts * to %', () => {
			expect(new Filter().like('name', 'web*').build()).toBe("name like 'web%'");
		});

		it('converts ? to _', () => {
			expect(new Filter().like('name', 'vm-?').build()).toBe("name like 'vm-_'");
		});

		it('converts both * and ? in the same pattern', () => {
			expect(new Filter().like('name', 'web-?-*').build()).toBe("name like 'web-_-%'");
		});

		it('escapes single quotes in like patterns', () => {
			expect(new Filter().like('name', "O'*").build()).toBe("name like 'O''%'");
		});

		it('passes through % and _ unchanged', () => {
			expect(new Filter().like('name', 'web%').build()).toBe("name like 'web%'");
			expect(new Filter().like('name', 'vm_1').build()).toBe("name like 'vm_1'");
		});
	});

	describe('in operator', () => {
		it('formats array of strings', () => {
			expect(new Filter().in('status', ['running', 'stopped']).build()).toBe(
				"status in ('running', 'stopped')",
			);
		});

		it('formats array of numbers', () => {
			expect(new Filter().in('id', [1, 2, 3]).build()).toBe('id in (1, 2, 3)');
		});

		it('formats mixed value types', () => {
			expect(new Filter().in('value', ['a', 1, true, null]).build()).toBe(
				"value in ('a', 1, true, null)",
			);
		});

		it('handles single-element array', () => {
			expect(new Filter().in('id', [42]).build()).toBe('id in (42)');
		});

		it('handles empty array', () => {
			expect(new Filter().in('id', []).build()).toBe('id in ()');
		});
	});

	describe('edge cases', () => {
		it('empty filter builds to empty string', () => {
			expect(new Filter().build()).toBe('');
		});

		it('handles special characters in string values', () => {
			expect(new Filter().eq('desc', 'hello & "world"').build()).toBe(
				'desc eq \'hello & "world"\'',
			);
		});

		it('handles empty string value', () => {
			expect(new Filter().eq('name', '').build()).toBe("name eq ''");
		});
	});
});

describe('buildFilter (functional shorthand)', () => {
	describe('simple equality', () => {
		it('converts plain string to eq', () => {
			expect(buildFilter({ status: 'running' })).toBe("status eq 'running'");
		});

		it('converts number to eq', () => {
			expect(buildFilter({ cpu_cores: 4 })).toBe('cpu_cores eq 4');
		});

		it('converts boolean to eq', () => {
			expect(buildFilter({ enabled: true })).toBe('enabled eq true');
		});
	});

	describe('wildcard detection', () => {
		it('detects * and uses like', () => {
			expect(buildFilter({ name: 'web*' })).toBe("name like 'web%'");
		});

		it('detects ? and uses like', () => {
			expect(buildFilter({ name: 'vm-?' })).toBe("name like 'vm-_'");
		});

		it('plain string without wildcards uses eq', () => {
			expect(buildFilter({ name: 'my-vm' })).toBe("name eq 'my-vm'");
		});
	});

	describe('list-to-in conversion', () => {
		it('converts array to in', () => {
			expect(buildFilter({ status: ['running', 'stopped'] })).toBe(
				"status in ('running', 'stopped')",
			);
		});

		it('converts number array to in', () => {
			expect(buildFilter({ id: [1, 2, 3] })).toBe('id in (1, 2, 3)');
		});
	});

	describe('operator objects', () => {
		it('handles single operator', () => {
			expect(buildFilter({ cpu_cores: { gt: 2 } })).toBe('cpu_cores gt 2');
		});

		it('handles multiple operators on same field', () => {
			const result = buildFilter({ ram: { ge: 1, le: 10 } });
			expect(result).toBe('ram ge 1 and ram le 10');
		});

		it('handles ne operator object', () => {
			expect(buildFilter({ status: { ne: 'stopped' } })).toBe("status ne 'stopped'");
		});

		it('handles eq operator object', () => {
			expect(buildFilter({ cpu_cores: { eq: 4 } })).toBe('cpu_cores eq 4');
		});
	});

	describe('multiple fields', () => {
		it('joins multiple fields with and', () => {
			const result = buildFilter({
				status: 'running',
				name: 'web*',
				cpu_cores: { gt: 2 },
			});
			expect(result).toBe("status eq 'running' and name like 'web%' and cpu_cores gt 2");
		});

		it('complex example from PRD', () => {
			const result = buildFilter({
				status: 'running',
				name: 'web*',
				cpu_cores: { gt: 2 },
				ram: { ge: 4096, le: 65536 },
			});
			expect(result).toBe(
				"status eq 'running' and name like 'web%' and cpu_cores gt 2 and ram ge 4096 and ram le 65536",
			);
		});
	});

	describe('null handling', () => {
		it('skips null values', () => {
			expect(buildFilter({ status: 'running', name: null })).toBe("status eq 'running'");
		});

		it('returns empty string when all values are null', () => {
			expect(buildFilter({ a: null, b: null })).toBe('');
		});
	});

	describe('edge cases', () => {
		it('empty object builds to empty string', () => {
			expect(buildFilter({})).toBe('');
		});

		it('handles special characters in values', () => {
			expect(buildFilter({ name: "O'Brien" })).toBe("name eq 'O''Brien'");
		});
	});
});
