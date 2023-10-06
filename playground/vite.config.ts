import { resolve } from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'

const envDir = './config'
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, resolve(__dirname, envDir)) }

  return {
    envDir,
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_API_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      Vue({
        reactivityTransform: true,
      }),
      vueJsx(),
      UnoCSS({
        configFile: resolve(__dirname, 'unocss.config.ts'),
      }),
      Components({
        dts: './types/components.d.ts',
        resolvers: [NaiveUiResolver()],
      }),
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          '@vueuse/core',
        ],
        dts: './types/auto-imports.d.ts',
        dirs: [
          './src/utils',
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    // build: {
    //   rollupOptions: {
    //     external: [
    //       'local-pkg',
    //       'fs',
    //     ],
    //     input: [
    //       './index.html',
    //     ],
    //   },
    // },
  }
})
