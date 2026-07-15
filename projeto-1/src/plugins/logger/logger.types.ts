export type Logger = {
  info: (message: string, context?: unknown) => void
  error: (message: string, error?: unknown) => void
}
