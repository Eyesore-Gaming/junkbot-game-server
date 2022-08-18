import { Logger, LOG_LEVELS } from '../src/Logger'
import { Config } from '../src/Config'

const config = Config.getInstance()
const logger: Logger = Logger.getInstance()
const logLevel: number = config.LogLevel

test(`logger.logLevel should be ${LOG_LEVELS.DEBUG.toString()}`, () => {
  expect(logger.getLogLevel()).toBe(logLevel)
})
