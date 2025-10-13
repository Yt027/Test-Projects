import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/js/jdi-react/', // ✅ chemins relatifs pour fonctionner partout (même dans un sous-dossier)
  build: {
    outDir: 'dist', // dossier du build
    assetsDir: 'assets', // dossier des fichiers statiques
  },
})
