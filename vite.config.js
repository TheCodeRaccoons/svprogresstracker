import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // Ensure assets resolve correctly when hosted at
  // https://thecoderaccoons.github.io/svprogresstracker/
  // If you later use a custom domain, update/remove this base.
  base: '/svprogresstracker/',
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
});
