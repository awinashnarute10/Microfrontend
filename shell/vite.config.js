import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '')

  return {
    plugins: [
      react(),
      federation({
        name: 'shell',
        remotes: {
          home: env.HOME_REMOTE,
          product: env.PRODUCT_REMOTE,
          cart: env.CART_REMOTE,
          profile: env.PROFILE_REMOTE,
        },
        shared: ['react', 'react-dom'],
      }),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    server: { port: Number(env.SHELL_PORT) },
    preview: { port: Number(env.SHELL_PORT) },
  }
})
