import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'node18', // 👈 Ensures proper Node.js output
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'node:fs',
        'node:path',
        'node:util', // 👈 prevent bundling Node core modules
        'fs',
        'path',
        'util',
      ],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  ssr: {
    noExternal: true, // 👈 disables browser polyfills
  },
});
