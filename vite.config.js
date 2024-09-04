import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Load environment variables
const backendApiUrl = import.meta.env.VITE_BACKEND_API;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to your backend server using the environment variable
      '/api': {
        target: backendApiUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
