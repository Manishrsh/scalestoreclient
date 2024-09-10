import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Load environment variables
const backendApi = process.env.VITE_BACKEND_API

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: backendApi, // Use the backend API URL from env
        changeOrigin: true, // Modify the origin of the request to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: remove /api prefix from the request path
      }
    }
  }
})