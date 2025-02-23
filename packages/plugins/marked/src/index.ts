import { forEach } from '@s-libs/micro-dash'
import fm, { FrontMatterResult } from 'front-matter'
import { Marked } from 'marked'
import { PluginFactory, PluginOptionsBase } from 'pocketpages'

export type FrontMatter = Record<string, string>

export type MarkedPluginOptions = PluginOptionsBase & {
  extensions: string[]
}

const markedPluginFactory: PluginFactory<MarkedPluginOptions> = (
  config,
  extra
) => {
  const { dbg } = config

  const opts: MarkedPluginOptions = {
    extensions: ['.md'],
    ...extra,
  }

  const _handles = (filePath: string) => {
    return opts.extensions.includes($filepath.ext(filePath))
  }

  return {
    handles: ({ filePath }) => {
      return _handles(filePath)
    },
    onRender: ({ content, api, filePath }) => {
      if (!_handles(filePath)) return content
      dbg(`marked onRender`, { filePath })

      var frontmatter: FrontMatterResult<FrontMatter> | null = null

      function preprocess(markdown: string) {
        frontmatter = fm(markdown)
        dbg(`frontmatter`, frontmatter)
        return frontmatter.body
      }

      const marked = new Marked({
        hooks: { preprocess },
        renderer: {
          heading({ tokens, depth }) {
            const id = tokens[0]?.raw
              .toLowerCase() // Convert to lowercase
              .trim() // Remove leading/trailing spaces
              .replace(/[^a-z0-9\-_ ]/g, '') // Remove invalid characters
              .replace(/\s+/g, '-') // Replace spaces with hyphens
              .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
            // dbg({ tokens, depth, id })
            return `<h${depth} id="${id}">${this.parser.parseInline(
              tokens
            )}</h${depth}>\n`
          },
          image({ href, title, text }) {
            return `<img src="${api.asset(href)}" alt="${text}" title="${title}" />`
          },
        },
      })

      const html = marked.parse(content) as string

      forEach(
        (frontmatter as FrontMatterResult<FrontMatter> | null)?.attributes ??
          {},
        (value, key) => {
          api.meta(key, value)
        }
      )
      dbg(`markdown`, { html })
      return html
    },
  }
}

export default markedPluginFactory
