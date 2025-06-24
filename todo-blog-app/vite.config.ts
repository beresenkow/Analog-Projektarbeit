/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog, { type PrerenderContentFile } from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [analog({
    prerender: {
      routes: [
        '/',
        '/landing',
        '/newsletter',
        '/todo',
        '/about',
        '/blog',
        {
          contentDir: 'src/content/blog',
          transform: (file: PrerenderContentFile) => {
            const name = file.name;
            return `/blog/${name}`;
          },
        },
      ],
    },
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
