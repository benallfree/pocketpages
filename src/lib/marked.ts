import fm, { FrontMatterResult } from 'front-matter'
import { marked as _marked, RendererObject } from 'marked'
import { dbg } from './debug'
import { PagesRequestContext } from './types'

export type FrontMatter = Record<string, string>
var frontmatter: FrontMatterResult<FrontMatter> | null = null

function preprocess(markdown: string) {
  frontmatter = fm(markdown)
  dbg(`frontmatter`, frontmatter)
  return frontmatter.body
}

_marked.use({ hooks: { preprocess } })

const createRenderer = (api: PagesRequestContext<any>): RendererObject => ({
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
})

export const marked = (
  content: string,
  api: PagesRequestContext<any>
): { frontmatter: FrontMatter; content: string } => {
  _marked.use({
    renderer: createRenderer(api),
  })
  const html = _marked(content) as string
  dbg({ html })
  return {
    frontmatter: frontmatter?.attributes ?? {},
    content: html,
  }
}
