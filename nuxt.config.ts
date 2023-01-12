// https://nuxt.com/docs/api/configuration/nuxt-config
import { UnocssNuxtOptions } from '@unocss/nuxt'

export default defineNuxtConfig({
  srcDir: 'src/',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/asstes/styles/default.scss',
        },
      },
    },
  },
  modules: ['@vueuse/nuxt', '@unocss/nuxt'],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,

    // core options
    shortcuts: {
      foobar: ['foo', 'bar'],
      'i-mushin': ['i-mdi-atom', 'm-auto'],
    },
    rules: [
      // ['flex', { display: 'flex' }],
      ['foo', { color: '#66ffcc' }],
      ['bar', { 'font-size': '16px' }],
      // [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
    ],
  },
})
