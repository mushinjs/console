import { createApp } from './main'

const { app, router } = createApp()

router.isReady().then(() => {
  app.mount('#app', true)
  // eslint-disable-next-line no-console
  console.log('hydrated')
})
