import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        // Use local backend during development by default.
        // To target a different backend (e.g. staging), set VITE_API_URL in .env
        target: process.env.VITE_API_URL || 'http://localhost:8090',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
