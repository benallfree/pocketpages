import { forEach, pick } from '@s-libs/micro-dash'
import ejs from 'pocketbase-ejs'
import { dbg } from 'pocketbase-log'
import { fs, path } from 'pocketbase-node'
import { pagesRoot } from './helpers'
import { marked } from './marked'
import { PagesContext } from './types'

ejs.cache = {
  set: function (key, val) {
    // dbg(`setting cache`, { key, val })
    $app.store().set(`ejs.${key}`, val)
  },
  get: function (key) {
    // dbg(`getting cache`, { key })
    return $app.store().get(`ejs.${key}`)
  },
  remove: function (key) {
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
  const slots = {}
  let match

  while ((match = regex.exec(input)) !== null) {
    const name = match[1]
    const content = match[2].trim()
    slots[name] = content
  }

  return slots
}

export const renderFile = (fname: string, context: PagesContext<any>) => {
  dbg(`renderFile start`, {
    fname,
    context: pick(context, 'slots', 'slot', 'data'),
  })
  const content: string = ejs.renderFile(
    fname,
    { ...context, context },
    {
      async: false,
      cache: $app.isDev(),
      includer: (path: string, filename: string) => {
        dbg({ path, filename })
        if ($filepath.ext(filename) === '.md') {
          const markdown = fs.readFileSync(filename, 'utf8')
          const res = marked(markdown, context)
          forEach(res.frontmatter, (v, k) => {
            context.meta(k, v)
          })
          return {
            template: res.content,
          }
        }
        return { filename }
      },
    }
  )
  context.slots = parseSlots(content)
  context.slot = context.slots.default || content
  dbg(`renderFile end`, {
    fname,
    context: pick(context, 'slots', 'slot', 'data'),
  })

  return content
}
