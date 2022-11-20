import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: '-',
    assetsInlineLimit: 0,
    outDir: '.dist',
    copyPublicDir: false,
    sourcemap: true,
    minify: 'esbuild',
  },
  publicDir: 'public',
  appType: 'spa',
})
