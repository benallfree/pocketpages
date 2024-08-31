module.exports = (obj, replacer, space) => {
  const seen = new WeakSet()
  return JSON.stringify(
    obj,
    (k, v) => {
      if (typeof v === 'object' && v !== null) {
        if (seen.has(v)) {
          return replacer ? replacer(k, `[Circular]`) : `[Circular]`
        }
        seen.add(v)
      }
      return replacer ? replacer(k, v) : v
    },
    space
  )
}
