import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Base path - use environment variable or default for GitHub Pages
  base: mode === 'production' ? '/hostscore/' : '/',
}))
