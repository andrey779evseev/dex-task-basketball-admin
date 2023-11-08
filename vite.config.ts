import path from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		checker({
			typescript: true,
		}),
	],
	base: 'https://dex-task-basketball-admin.vercel.app',
	resolve: {
		alias: {
			'@hooks': path.resolve(__dirname, './src/common/hooks'),
			'@helpers': path.resolve(__dirname, './src/common/helpers'),
			'@components': path.resolve(__dirname, './src/common/components'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@modules': path.resolve(__dirname, './src/modules'),
			'@api': path.resolve(__dirname, './src/api'),
			'@core': path.resolve(__dirname, './src/core'),
			'@interfaces': path.resolve(__dirname, './src/common/interfaces'),
			'@validators': path.resolve(__dirname, './src/common/validators'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          @use "@assets/styles/globals.scss" as *;
        `,
			},
		},
	},
})
