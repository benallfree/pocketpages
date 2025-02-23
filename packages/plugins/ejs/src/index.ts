import ejs from 'pocketbase-ejs'
import { fs, path } from 'pocketbase-node'
import { stringify } from 'pocketbase-stringify'
import { PluginFactory, PluginOptionsBase } from 'pocketpages'

export type EjsPluginOptions = PluginOptionsBase & {
  extensions: string[]
}

const oldCompile = ejs.compile
const oldResolveInclude = ejs.resolveInclude
const oldIncludeFile = ejs.includeFile

const VALID_CONFIG_KEYS = ['name', 'extensions', 'debug'] as const

const ejsPluinFactory: PluginFactory<EjsPluginOptions> = (config, extra) => {
  const opts: EjsPluginOptions = {
    extensions: ['.ejs'],
    ...extra,
  }
  Object.keys(opts).forEach((key) => {
    if (
      !VALID_CONFIG_KEYS.includes(key as (typeof VALID_CONFIG_KEYS)[number])
    ) {
      throw new Error(`Invalid config key: ${key}`)
    }
  })

  const { pagesRoot, dbg } = config
  dbg(`ejs plugin config`, { pagesRoot, opts })

  ejs.compile = function (template: string, options: any) {
    const newTemplate = template.replaceAll(
      /<script\s+server>([\s\S]*?)<\/script>/g,
      '<% $1 %>'
    )
    return oldCompile(newTemplate, { ...options })
  }

  ejs.resolveInclude = function (
    includePath: string,
    templatePath: string,
    isDir: boolean
  ) {
    dbg(`resolveInclude`, { name: includePath, filename: templatePath, isDir })
    // Handle absolute paths (starting with /)
    if (isDir) {
      return path.resolve(pagesRoot, includePath)
    }

    // Handle relative paths by searching up the directory tree
    let currentPath = path.dirname(templatePath)
    while (currentPath.length >= pagesRoot.length) {
      const attemptPath = path.resolve(currentPath, `_private`, includePath)
      dbg(`attemptPath`, { attemptPath })
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
    throw new Error(
      `No partial '${includePath}' found in any _private directory`
    )
  }

  const _handles = (filePath: string) => {
    return opts.extensions.includes($filepath.ext(filePath))
  }

  return {
    handles: ({ filePath }) => {
      return _handles(filePath)
    },
    onRender: (renderContext) => {
      const { api, filePath, plugins } = renderContext
      if (!_handles(filePath)) return renderContext.content
      dbg(`ejs onRender`, { filePath })

      const content: string = ejs.renderFile(
        filePath,
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
          cache: false, // !$app.isDev(),
          root: pagesRoot,
          includeFile: function (path: string, options: any) {
            dbg(`includeFile`, { path, options })
            const renderFunc = oldIncludeFile(path, options)
            return (data: any) => {
              const rawRendered = renderFunc(data)
              dbg(`raw rendered`, { rawRendered, data })
              return plugins.reduce(
                (content, plugin) =>
                  plugin.onRender?.({
                    ...renderContext,
                    api: {
                      ...renderContext.api,
                      data: {
                        ...renderContext.api.data,
                        ...data,
                      },
                    },
                    content,
                    filePath: ejs.resolveInclude(path, filePath, false),
                  }) ?? content,
                rawRendered as string
              )
            }
          },
        }
      )

      if (typeof content !== 'string') {
        if (content === undefined || content === null) {
          return ''
        }
        return stringify(content)
      }

      return content
    },
  }
}

export default ejsPluinFactory
