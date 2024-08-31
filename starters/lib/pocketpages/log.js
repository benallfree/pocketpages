const stringify = require(`./safe-stable-stringify`)

const dbg = (...objs) => {
  console.log(
    stringify(
      objs,
      (k, v) => {
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
      },
      2
    )
  )
}

module.exports = { dbg }
