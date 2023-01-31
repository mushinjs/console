import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import Koa from 'koa'
import sendFile from 'koa-send'
import { render } from '@mushinjs/console/dist/server/entry-server.js'

(async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  // const root = require.resolve('@mushinjs/console/package.json').replace('package.json', 'dist/client')
  const root = resolve(__dirname, '../packages/console/dist/client')
  const app = new Koa()

  app.use(async (ctx) => {
    if (ctx.path.startsWith('/assets')) {
      await sendFile(ctx, ctx.path, { root })
      return
    }
    const manifest = JSON.parse(readFileSync(resolve(root, 'ssr-manifest.json'), 'utf-8'))
    const [appHtml, preloadLinks] = await render(ctx, manifest)

    const template = readFileSync(resolve(root, 'index.html'), 'utf-8')

    ctx.type = 'text/html'
    ctx.body = template.replace('<!--ssr-outlet-->', appHtml).replace('<!--preload-links-->', preloadLinks)
  })

  // eslint-disable-next-line no-console
  app.listen(3000, () => console.log('started server on http://localhost:3000'))
})()
