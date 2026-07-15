type RetryOptions = {
  retries?: number
  delayInMs?: number
  signal?: AbortSignal
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

function wait(delayInMs: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted.', 'AbortError'))
      return
    }

    const timeoutId = window.setTimeout(resolve, delayInMs)

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId)
        reject(new DOMException('Request aborted.', 'AbortError'))
      },
      { once: true },
    )
  })
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const retries = options.retries ?? 2
  const delayInMs = options.delayInMs ?? 500

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await operation()
    } catch (error) {
      const shouldStop = isAbortError(error) || attempt === retries

      if (shouldStop) {
        throw error
      }

      await wait(delayInMs * (attempt + 1), options.signal)
    }
  }

  throw new Error('Retry flow finished unexpectedly.')
}
