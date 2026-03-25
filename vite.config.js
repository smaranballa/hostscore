import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment the base path below if deploying to GitHub Pages
  // base: '/hostscore-react/',
})
