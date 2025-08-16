import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    svelte(),
    federation({
      name: 'svelte-mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.svelte',
        './Counter': './src/lib/Counter.svelte'
      },
      shared: ['svelte']
    })
  ],
  server: {
    port: 4173,
    cors: true
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})