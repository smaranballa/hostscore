import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Base path: use root for dev, /hostscore/ for production
  base: command === 'serve' ? '/' : '/hostscore/',
}))
