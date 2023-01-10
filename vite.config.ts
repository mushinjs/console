import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { presetIcons, presetAttributify, presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      rules: [
        // ['flex', { display: 'flex' }],
        // ['foo', { color: '66ffcc' }],
        // ['bar', { 'font-size': '16px' }],
        // [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
      ],
      shortcuts: {
        // foobar: ['foo', 'bar'],
        'i-mushin': ['i-mdi-atom', 'm-auto'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
