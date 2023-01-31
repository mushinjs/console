import { basename } from 'path'
import { renderToString } from '@vue/server-renderer'
import { createApp } from './main'

export const render = async (
  url: string,
  manifest: Record<string, string[]>,
): Promise<[string, string]> => {
  const { app, router } = createApp()
  await router.push(url)
  await router.isReady()

  const ctx: { modules?: string[] } = {}
  const appHtml = await renderToString(app, ctx)

  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  return [appHtml, preloadLinks]
}

function renderPreloadLinks(modules: undefined | string[], manifest: Record<string, string[]>): string {
  let links = ''
  const seen = new Set()
  if (modules === undefined)
    throw new Error('modules is undifined')

  modules.forEach((id: string) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = basename(file)
          if (manifest[filename]) {
            for (const f of manifest[filename]) {
              links += renderPreloadLink(f)
              seen.add(f)
            }
          }
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file: string): string {
  if (file.endsWith('.js'))
    return `<link rel="modulepreload" crossorigin href="${file}">`
  else if (file.endsWith('.css'))
    return `<link rel="stylesheet" href="${file}">`
  else if (file.endsWith('.woff'))
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  else if (file.endsWith('.woff2'))
    return `<link rel="preload" hre="${file}" as="font" type="font/woff2" crossorigin>`
  else if (file.endsWith('.gif'))
    return `<link rel="preload" href="${file}" as="image" type="image/git">`
  else if (file.endsWith('.jpg') || file.endsWith('.jpeg'))
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`
  else if (file.endsWith('.png'))
    return `<link rel="preload" href="${file}" as="image" type="image/png">`
  else
    return ''
}
