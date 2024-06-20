import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components/ui': fileURLToPath(new URL('./src/components/ui', import.meta.url)),
      '@components/form': fileURLToPath(new URL('./src/components/form', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/services/api', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/core/', import.meta.url)),
      '@layout': fileURLToPath(new URL('./src/core/layout', import.meta.url)),
    },
  },
  server: {
    port: 4176,
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});
