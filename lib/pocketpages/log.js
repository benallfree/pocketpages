const dbg = (...objs) => {
  console.log(JSON.stringify(objs, null, 2))
}

module.exports = { dbg }
