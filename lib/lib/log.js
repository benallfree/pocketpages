const stringify = require(`./safe-stable-stringify`)

const replacer = (k, v) => {
  if (v instanceof Error) {
    return v.stack
  }
  if (v instanceof RegExp) {
    return v.toString()
  }
  if (v instanceof Function) {
    return v.toString()
  }
  return v
}

const dbg = (...objs) => {
  const parts = objs.map((o) => {
    if (o instanceof Error) {
      return o.stack
    }
    if (o instanceof RegExp) {
      return o.toString()
    }
    if (o instanceof Function) {
      return o.toString()
    }
    if (typeof o === 'object') {
      return stringify(o, replacer, 2)
    }
    return o
  })
  $app.logger().debug(parts.join(` `))
}

module.exports = { dbg }
