import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'

import './assets/main.css'

// 为了保证数据的互不干扰，每次请求需要导出一个新的实例
export const createApp = () => {
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(router)
  return { app, router }
}
