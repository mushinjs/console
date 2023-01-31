import { dirname, resolve } from 'path'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import Koa from 'koa'
import koaConnect from 'koa-connect'
import { createServer as createViteServer } from 'vite'

export async function createServer() {
  const app = new Koa()
  // const root = resolve(require.resolve('@mushinjs/console/package.json'), '../')
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../packages/console')

  const vite = await createViteServer({
    root,
    logLevel: 'error',
    server: {
      middlewareMode: true,
      watch: {
      // During tests we edit the files too fast and sometimes chokidar
      // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 250,
      },
    },
  })

  app.use(koaConnect(vite.middlewares))
  app.use(async (ctx) => {
    try {
      const filename = resolve(root, './index.html')
      let template = await readFile(filename, 'utf-8')
      template = await vite.transformIndexHtml(ctx.path, template)
      const { render } = await vite.ssrLoadModule('/src/entry-server.ts')
      const [appHtml] = await render(ctx, {})
      ctx.type = 'text/html'
      ctx.body = template.replace('<!--ssr-outlet-->', appHtml)
    }
    catch (e) {
      vite && vite.ssrFixStacktrace(e)
      ctx.throw(500, e.stack)
    }
  })

  // eslint-disable-next-line no-console
  app.listen(3000, () => console.log('started dev server on http://localhost:3000'))
}

createServer()
