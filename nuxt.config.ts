// https://nuxt.com/docs/api/configuration/nuxt-config'

export default defineNuxtConfig({
  srcDir: 'src/',
  alias: {
    '~': __dirname,
    '@': __dirname + '/src',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/default.scss" as *;'
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
      [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${Number(d) / 16}rem` })],
      ['icon', { width: '1em', height: '1em' }]
    ],
  },
})
