import { defineConfig } from 'vite'

export default defineConfig({
  base: '/shilpagaikwad.github.io/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  publicDir: 'public'
})