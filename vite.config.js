import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/success-v2/',
  server: {
    host: true,
    port: 3000
  }
})
