import fm, { FrontMatterResult } from 'front-matter'
import { marked as _marked } from 'marked'
import { dbg } from 'pocketbase-log'
import { PagesContext } from './types'

export type FrontMatter = Record<string, string>
var frontmatter: FrontMatterResult<FrontMatter> = null

function preprocess(markdown: string) {
  frontmatter = fm(markdown)
  dbg(`frontmatter`, frontmatter)
  return frontmatter.body
}

_marked.use({ hooks: { preprocess } })

const createRenderer = (context: PagesContext<any>) => ({
  heading({ tokens, depth }) {
    const id = tokens[0].raw
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
    return `<img src="${context.asset(href)}" alt="${text}" title="${title}" />`
  },
})

export const marked = (
  content: string,
  context: PagesContext<any>
): { frontmatter: FrontMatter; content: string } => {
  _marked.use({
    renderer: createRenderer(context),
  })
  const html = _marked(content) as string
  dbg({ html })
  return {
    frontmatter: frontmatter.attributes,
    content: html,
  }
}