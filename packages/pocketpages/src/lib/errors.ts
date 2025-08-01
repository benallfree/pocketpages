export class PocketPagesError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any,
    public pocketbaseApiError?: ApiError | null) {
    super(message)
  }

  toString(): string {
    const dataStr = this.data ? ` Data: ${JSON.stringify(this.data)}` : ''
    return `PocketPagesError: ${this.message} (Status: ${this.status})${dataStr}`
  }
}