import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  main: {
    resolve:{
      alias: {
        '@': resolve('./src'),
      }
    },
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: { index: resolve(__dirname,'src/main/main.ts') },
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer')
      }
    },
    build: {
      rollupOptions: {
        input: { index: resolve(__dirname,'src/renderer/main.ts') },
      },

    },
    assetsInclude: ["**/*.node"],
    plugins: [vue()],
  }
})
