import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Use base only in production so local dev runs at '/'
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/svprogresstracker/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@media': path.resolve(__dirname, 'src/Media'),
      '@utility': path.resolve(__dirname, 'src/Components/Utility'),
      '@hooks': path.resolve(__dirname, 'src/Hooks'),
    },
  },
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
  },
}));
