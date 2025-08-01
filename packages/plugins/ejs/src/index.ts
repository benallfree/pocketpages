import ejs from 'pocketbase-ejs'
import { fs, path } from 'pocketbase-node'
import { stringify } from 'pocketbase-stringify'
import type { Plugin, PluginFactory, PluginOptionsBase } from 'pocketpages'

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

  // dbg(`ejs plugin config`, { pagesRoot, opts })

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
    dbg(
      `ejs resolveInclude ${includePath} from ${templatePath} <${isDir ? 'dir' : 'file'}>`
    )
    // Handle absolute paths (starting with /)
    if (isDir) {
      return path.resolve(pagesRoot, includePath)
    }

    // Try each extension when searching for the file
    const tryExtensions = (basePath: string) => {
      // First try the exact path
      // dbg(`trying exact path ${basePath}`)
      if (fs.existsSync(basePath, 'file')) {
        dbg(`found exact path ${basePath}`)
        return basePath
      }

      // Then try each extension if the file doesn't have one
      for (const ext of opts.extensions) {
        const pathWithExt = basePath + ext
        // dbg(`trying extension ${pathWithExt}`)
        if (fs.existsSync(pathWithExt, 'file')) {
          dbg(`found extension ${pathWithExt}`)
          return pathWithExt
        }
      }
      return null
    }

    // Handle relative paths by searching up the directory tree
    let currentPath = path.dirname(templatePath)

    const triedPaths: string[] = []
    while (currentPath.length >= pagesRoot.length) {
      const attemptPath = path.resolve(currentPath, includePath)
      if (!attemptPath.startsWith(pagesRoot)) {
        dbg(`skipping ${attemptPath} in ${pagesRoot}`)
        break
      }
      dbg(`trying ${attemptPath} in ${pagesRoot}`)
      const foundPath = tryExtensions(attemptPath)
      if (foundPath) {
        return foundPath
      }
      triedPaths.push(attemptPath)

      // If we're at pagesRoot and still haven't found it, fall back to default behavior
      if (currentPath === pagesRoot) {
        break
      }
      // Move up one directory
      currentPath = path.dirname(currentPath)
    }

    throw new Error(
      `No partial '${includePath}' found in any directory. Tried: ${triedPaths.join(
        ', '
      )}`
    )
  }

  const _handles = (filePath: string) => {
    return opts.extensions.includes($filepath.ext(filePath))
  }

  const thisPlugin: Plugin = {
    name: 'ejs',
    handles: ({ filePath }) => {
      return _handles(filePath)
    },
    onRender: (renderContext) => {
      const { api, filePath, plugins } = renderContext
      if (!_handles(filePath)) return renderContext.content
      dbg(`onRender ${filePath}`)

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
            dbg(`includeFile ${path}`)
            const renderFunc = oldIncludeFile(path, options)
            return (data: any) => {
              const rawRendered = renderFunc(data)
              // dbg(`raw rendered\n${rawRendered}`)
              return plugins
                .filter((otherPlugin) => otherPlugin.name !== thisPlugin.name)
                .reduce((content, plugin) => {
                  dbg(`calling ${plugin.name}:onRender ${path}`)
                  return (
                    plugin.onRender?.({
                      ...renderContext,
                      api: data,
                      content,
                      filePath: ejs.resolveInclude(path, filePath, false),
                    }) ?? content
                  )
                }, rawRendered as string)
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
  return thisPlugin
}

export default ejsPluinFactory
