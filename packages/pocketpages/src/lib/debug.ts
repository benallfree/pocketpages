import * as log from 'pocketbase-log'

export const dbg = (...args: any[]) => {
  const dbgVal = $app.store().get('__pocketpages_debug')

  //   console.log(JSON.stringify({ dbgVal }, null, 2))
  if (!dbgVal) return
  return log.dbg(...args)
}
