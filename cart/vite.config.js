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
        name: 'cart',
        filename: 'remoteEntry.js',
        exposes: {
          './Cart': './src/Cart',
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
    server: { port: Number(env.CART_PORT) },
    preview: { port: Number(env.CART_PORT) },
  }
})
