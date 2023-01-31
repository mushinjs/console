import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

const pages = import.meta.glob('../views/*.vue')

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/views\/(.*)View?\.vue$/)![1].toLowerCase()
  return {
    path: name === 'home' ? '/' : `/${name}`,
    component: pages[path],
  }
})

export default function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  })
}

export {
  createRouter,
}
