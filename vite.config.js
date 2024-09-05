import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://manishsofbackend.scalestore.shop',
        changeOrigin: true,
        // Remove rewrite if your backend API has /api in the URL
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
