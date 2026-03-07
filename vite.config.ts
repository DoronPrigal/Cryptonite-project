import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base מוגדר לשם ה-repo בגיטהאב לצורך פריסה ב-GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/Cryptonite-project/',
})
