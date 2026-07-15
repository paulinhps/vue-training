import type { App, InjectionKey } from 'vue'
import type { Logger } from './logger.types'

export const loggerKey = Symbol('logger') as InjectionKey<Logger>

type LoggerPluginOptions = {
  prefix?: string
}

export const loggerPlugin = {
  install(app: App, options: LoggerPluginOptions = {}) {
    const prefix = options.prefix ?? 'app'

    const logger: Logger = {
      info(message, context) {
        console.info(`[${prefix}] ${message}`, context ?? '')
      },
      error(message, error) {
        console.error(`[${prefix}] ${message}`, error ?? '')
      },
    }

    app.provide(loggerKey, logger)
  },
}
