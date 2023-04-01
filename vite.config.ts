import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		outDir: './lib/'
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
