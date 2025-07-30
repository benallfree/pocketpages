export type PocketBaseApiError = Error & {
  value: {
    status: number
    message: string
  }
}

export type PocketPagesError = Error & {
  status: number
  message: string
  originalError: Error
}

export function PocketPagesError(
  status: number,
  message: string,
  originalError: Error
): PocketPagesError {
  const e = new Error(message) as PocketPagesError
  e.status = status
  e.originalError = originalError
  return e
}