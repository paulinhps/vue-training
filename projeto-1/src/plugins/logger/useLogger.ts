import { inject } from 'vue'
import { loggerKey } from './logger.plugin'

export function useLogger() {
  const logger = inject(loggerKey)

  if (!logger) {
    throw new Error('Logger plugin nao instalado.')
  }

  return logger
}
