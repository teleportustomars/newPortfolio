import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5500,
  },
  optimizeDeps: {
    exclude: ['@emailjs/browser'],
  },
  base: './',
  // base: '/newPortfolio/',
})
