import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    emptyOutDir: true,
    // Split vendor chunks so browsers can cache them separately
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('lucide-react')) return 'vendor-lucide';
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            return 'vendor';
          }
        },
      },
    },
    // Warn when any chunk exceeds 400KB (before split)
    chunkSizeWarningLimit: 400,
  },
})
