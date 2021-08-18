import VuePlugin from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';

export default [
	{
		input: 'src/index.js',
		output: {
			name: 'v-remixicon',
			file: 'dist/v-remixicon.cjs.js',
			format: 'cjs'
		},
		plugins: [
	    VuePlugin(),
	    css({ css: false })
	  ],
		external: ['vue']
	},
	{
		input: 'src/index.js',
		output: {
			name: 'v-remixicon',
			file: 'dist/v-remixicon.esm.js',
			format: 'esm'
		},
		plugins: [
	    VuePlugin(),
	    css({ css: false })
	  ],
		external: ['vue']
	}
]