import { defineConfig } from 'tsup';

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		types: 'src/types.ts',
		full: 'src/full.ts',
		'services/vm/index': 'src/services/vm/index.ts',
		'services/network/index': 'src/services/network/index.ts',
		'services/machine-drive/index': 'src/services/machine-drive/index.ts',
		'services/machine-device/index': 'src/services/machine-device/index.ts',
		'services/machine-nic/index': 'src/services/machine-nic/index.ts',
		'services/machine-snapshot/index': 'src/services/machine-snapshot/index.ts',
	},
	format: ['esm', 'cjs'],
	dts: true,
	sourcemap: true,
	clean: true,
	target: 'es2022',
	outDir: 'dist',
	splitting: true,
	treeshake: true,
});
