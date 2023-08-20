import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
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
    }),
  ],
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
})
