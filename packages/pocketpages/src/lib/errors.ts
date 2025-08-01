export class PocketPagesError extends Error {
  status: number
  context: string
  stack: string
  message: string
  constructor(e: unknown) {
    // Extract message and object properties
    let message: string
    let status = 500
    let context = ''
    let stack = new Error().stack || ''

    if (typeof e === 'string') {
      message = e
    } else if (typeof e === 'object' && e !== null) {
      const obj = e as any
      message = obj.message || obj.value?.message || String(e)
      status = obj.status || obj.value?.status || 500
      context = obj.context || ''
      stack = obj.stack || stack
    } else {
      message = String(e)
    }

    // Don't pass message to super() to avoid it appearing in stack trace
    super()
    this.message = message
    this.status = status
    this.context = context
    this.stack = stack
  }
}

export function normalizeError(e: unknown): PocketPagesError {
  const message = (() => {
    const m = `${typeof e === 'object' && e !== null && 'message' in e ? e.message : e}`
    if (m.includes('Value is not an object'))
      return `${m} - are you referencing a symbol missing from require() or resolve()?`
    return m
  })()

  if (e instanceof ApiError) {
    //@ts-ignore ApiError is badly defined in types.d.ts https://pocketbase.io/jsvm/classes/ApiError.html
    return new PocketPagesError(e)
  }

  return new PocketPagesError(e)
}
