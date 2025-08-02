export class PocketPagesError extends Error {
  status: number
  context: string
  stack: string
  message: string
  filename: string
  line: number
  col: number
  constructor(e: unknown) {
    console.log(`***incoming error:`, JSON.stringify(e, null, 2))
    // Extract message and object properties
    let message: string
    let status = 500
    let context = ''
    let stack = new Error().stack || ''
    let filename = ''
    let line = 0
    let col = 0

    if (typeof e === 'string') {
      message = e
    } else if (typeof e === 'object' && e !== null) {
      const obj = e as any
      message = obj.message || obj.value?.message || String(e)
      status = obj.status || obj.value?.status || 500
      context = obj.context || ''
      stack = obj.stack || stack
      filename = obj.filename || ''
      line = obj.line || 0
      col = obj.col || 0
    } else {
      message = String(e)
    }

    // Don't pass message to super() to avoid it appearing in stack trace
    super()
    this.message = message
    this.status = status
    this.context = context
    this.stack = stack
    this.filename = filename
    this.line = line
    this.col = col
    console.log(`***normalized error:`, JSON.stringify(this, null, 2))
  }
}

export function normalizeError(e: unknown): PocketPagesError {
  return new PocketPagesError(e)
}
