import sucrase from '@rollup/plugin-sucrase';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const config = (dev, es5 = false) => ({
	input: 'src/index.ts',
	output: [
		{
			file: dev ? 'index.dev.js' : es5 ? pkg.browser : pkg.main,
			format: 'iife',
			name: '__shimport__'
		}
	],
	plugins: [
		!es5
			? sucrase({ transforms: ['typescript'] })
			: typescript({
				target: 'es5'
			}),
		replace({
			__VERSION__: pkg.version
		}),
		!dev && terser()
	]
})

export default [
	config(false),
	config(true),
	config(false, true)
];