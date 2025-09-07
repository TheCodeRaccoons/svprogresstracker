import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@media': path.resolve(__dirname, 'src/Media'),
      '@utility': path.resolve(__dirname, 'src/Components/Utility'),
    },
  },
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
  },
});
