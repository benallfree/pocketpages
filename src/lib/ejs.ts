import { forEach, pick } from '@s-libs/micro-dash'
import ejs from 'pocketbase-ejs'
import { fs, path } from 'pocketbase-node'
import { stringify } from 'pocketbase-stringify'
import { dbg } from './debug'
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

const oldCompile = ejs.compile
ejs.compile = function (template: string, options: any) {
  const newTemplate = template.replace(
    /<script\s+server>([\s\S]*?)<\/script>/,
    '<% $1 %>'
  )
  return oldCompile(newTemplate, { ...options })
}

const oldResolveInclude = ejs.resolveInclude
ejs.resolveInclude = function (
  includePath: string,
  templatePath: string,
  isDir: boolean
) {
  dbg(`resolveInclude`, { name: includePath, filename: templatePath, isDir })
  // Handle absolute paths (starting with /)
  if (includePath.startsWith('/')) {
    return path.resolve(pagesRoot, `_private`, includePath)
  }

  // Handle relative paths by searching up the directory tree
  let currentPath = path.dirname(templatePath)
  while (currentPath.length >= pagesRoot.length) {
    const attemptPath = path.resolve(currentPath, `_private`, includePath)
    // dbg(`attemptPath`, { attemptPath })
    if (fs.existsSync(attemptPath, 'file')) {
      return attemptPath
    } else {
      // If we're at pagesRoot and still haven't found it, fall back to default behavior
      if (currentPath === pagesRoot) {
        break
      }
      // Move up one directory
      currentPath = path.dirname(currentPath)
    }
  }

  // dbg(`got here with no results`, { includePath, templatePath })
  throw new Error(`No partial '${includePath}' found in any _private directory`)
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
      prepend: `
        const echo = (...args) => {
          const result = args.map((arg) => {
            if (typeof arg === 'object') {
              return JSON.stringify(arg)
            }
            return arg.toString()
          })
          return __append(result.join(' '))
        }
      `,
      compileDebug: true,
      async: false,
      cache: $app.isDev(),
      includer: (path: string, filename: string) => {
        dbg(`includer`, { path, filename })
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

  if (typeof content !== 'string') {
    if (content === undefined || content === null) {
      return ''
    }
    return stringify(content)
  }

  return content
}
