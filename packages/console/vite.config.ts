/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
// import VueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
// @ts-expect-error https://github.com/sxzz/unplugin-vue-macros/issues/257
import VueMacros from 'unplugin-vue-macros/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
      '@': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    // Vue(),
    // VueJsx(),
    VueMacros({
      plugins: {
        vue: Vue({
          reactivityTransform: true,
        }),
      },
    }),
    Pages(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    Unocss(),
  ],
  test: {
    environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse'],
    },
  },
})
