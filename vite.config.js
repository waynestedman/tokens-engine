import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../dist'
  },
  server: {
    open: 'index.html',
    port: 8080
  }
})
