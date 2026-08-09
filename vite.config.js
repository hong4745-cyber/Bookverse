import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cp } from 'node:fs/promises'
import { resolve, relative } from 'node:path'

function copyPublicWithoutVideos() {
  const publicDir = resolve('public')

  return {
    name: 'copy-public-without-videos',
    async closeBundle() {
      await cp(publicDir, resolve('dist'), {
        recursive: true,
        filter(source) {
          const path = relative(publicDir, source)
          return path !== 'videos' && !path.startsWith(`videos\\`)
        },
      })
    },
  }
}

export default defineConfig(({ command }) => ({
  publicDir: command === 'build' ? false : 'public',
  plugins: [
    react(),
    command === 'build' && copyPublicWithoutVideos(),
  ].filter(Boolean),
  server: {
    port: 5173,
    open: true,
  },
}))
