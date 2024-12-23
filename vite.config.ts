import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path"


export default defineConfig({
	plugins: [vue(),

	],

	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
			path: "path-browserify",
		}
	},
	css: {
		// css预处理器
		preprocessorOptions: {
			less: {
				javascriptEnable: true,
				charset: false,
				additionalData: '@import "./src/assets/global.less";',
			},
		},
	},
	base: process.env.NODE_ENV === 'production' ? '/vue_date_calc_kit/' : '/',

	build: {
		rollupOptions: {
			output: {
				chunkFileNames: "js/[name]-[hash].js",
				entryFileNames: "js/[name]-[hash].js",
				assetFileNames: "[ext]/[name]-[hash].[ext]",
			},
		},
		outDir: "docs",
		commonjsOptions: {
			exclude: ['ckeditor/*'],
		},
	},
})
