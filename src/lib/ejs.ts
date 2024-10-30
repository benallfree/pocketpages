import { forEach, pick } from '@s-libs/micro-dash'
import ejs from 'pocketbase-ejs'
import { dbg } from 'pocketbase-log'
import { fs, path } from 'pocketbase-node'
import { pagesRoot } from './helpers'
import { marked } from './marked'
import { PagesApi } from './types'

ejs.cache = {
  set: function (key: string, val: any) {
    // dbg(`setting cache`, { key, val })
    $app.store().set(`ejs.${key}`, val)
  },
  get: function (key: string) {
    // dbg(`getting cache`, { key })
    return $app.store().get(`ejs.${key}`)
  },
  remove: function (key: string) {
    // dbg(`removing cache`, { key })
    $app.store().remove(`ejs.${key}`)
  },
  reset: function () {
    throw new Error(`resetting cache not supported`)
  },
}

const oldResolveInclude = ejs.resolveInclude
ejs.resolveInclude = function (name: string, filename: string, isDir: boolean) {
  if (filename === '/') {
    return path.resolve(pagesRoot, name)
  }
  return oldResolveInclude(name, filename, isDir)
}

export const parseSlots = (input: string) => {
  const regex = /<!--\s*slot:(\w+)\s*-->([\s\S]*?)(?=<!--\s*slot:\w+\s*-->|$)/g
  const slots: Record<string, string> = {}
  let lastIndex = 0
  let cleanedContent = ''
  let match: RegExpExecArray | null

  while ((match = regex.exec(input)) !== null) {
    const name = match[1]
    const content = match[2]?.trim()
    if (name && content) {
      slots[name] = content
      // Add the content between the last match and this slot tag
      cleanedContent += input.slice(lastIndex, match.index)
      lastIndex = match.index + match[0].length
    }
  }
  // Add any remaining content after the last slot
  cleanedContent += input.slice(lastIndex)

  return {
    slots,
    content: cleanedContent.trim(),
  }
}

export const renderFile = (fname: string, api: PagesApi<any>) => {
  dbg(`renderFile start`, {
    fname,
    api: pick(api, 'slots', 'slot', 'data'),
  })
  const content: string = ejs.renderFile(
    fname,
    { ...api, api },
    {
      async: false,
      cache: $app.isDev(),
      includer: (path: string, filename: string) => {
        dbg({ path, filename })
        if ($filepath.ext(filename) === '.md') {
          const markdown = fs.readFileSync(filename, 'utf8')
          const res = marked(markdown, api)
          forEach(res.frontmatter, (v, k) => {
            api.meta(k, v)
          })
          return {
            template: res.content,
          }
        }
        return { filename }
      },
    }
  )
  dbg(`renderFile end`, {
    fname,
    api: pick(api, 'slots', 'slot', 'data'),
  })

  return content
}
