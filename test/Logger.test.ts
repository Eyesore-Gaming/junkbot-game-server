import { Logger, LOG_LEVELS } from '../src/Logger'

const logger: Logger = Logger.getInstance()
const origLogLevel: number = logger.getLogLevel()
const logLevel: number = LOG_LEVELS.TRACE

beforeAll(() => { logger.setLogLevel(logLevel) })

test(`logger.logLevel should be ${LOG_LEVELS.TRACE.toString()}`, () => {
  expect(logger.getLogLevel()).toBe(logLevel)
})

test('logger.info(fileName, methodName, message should not throw', () => {
  function info (): void {
    logger.info('fileName', 'methodName', 'message')
  }

  expect(info).not.toThrow()
})

test('logger.debug(fileName, methodName, message should not throw', () => {
  function debug (): void {
    logger.debug('fileName', 'methodName', 'message')
  }

  expect(debug).not.toThrow()
})

test('logger.trace(fileName, methodName, message should not throw', () => {
  function trace (): void {
    logger.trace('fileName', 'methodName', 'message')
  }

  expect(trace).not.toThrow()
})

test('logger.warn(fileName, methodName, message should not throw', () => {
  function warn (): void {
    logger.warn('fileName', 'methodName', 'message')
  }

  expect(warn).not.toThrow()
})

test('logger.error(fileName, methodName, message should not throw', () => {
  function error (): void {
    logger.error('fileName', 'methodName', 'message')
  }

  expect(error).not.toThrow()
})

test('logger.getLogLevelName(LOG_LEVELS.NONE) should return string "NONE"', () => {
  expect(logger.getLogLevelName(LOG_LEVELS.NONE)).toBe('NONE')
})

test('logger.getLogLevelName(LOG_LEVELS.INFO) should return string "INFO"', () => {
  expect(logger.getLogLevelName(LOG_LEVELS.INFO)).toBe('INFO')
})

test('logger.getLogLevelName(LOG_LEVELS.DEBUG) should return string "DEBUG"', () => {
  expect(logger.getLogLevelName(LOG_LEVELS.DEBUG)).toBe('DEBUG')
})

test('logger.getLogLevelName(LOG_LEVELS.WARN) should return string "WARN"', () => {
  expect(logger.getLogLevelName(LOG_LEVELS.WARN)).toBe('WARN')
})

test('logger.getLogLevelName(LOG_LEVELS.ERROR) should return string "ERROR"', () => {
  expect(logger.getLogLevelName(LOG_LEVELS.ERROR)).toBe('ERROR')
})

test('logger.getLogLevelName(LOG_LEVELS.TRACE) should return string "TRACE"', () => {
  expect(logger.getLogLevelName(LOG_LEVELS.TRACE)).toBe('TRACE')
})

test('logger.getLogLevelName(-99) should return string "NO_MATCHING_LOG_LEVEL"', () => {
  expect(logger.getLogLevelName(-99)).toBe('NO_MATCHING_LOG_LEVEL')
})

test('logger.setColorEnabled(true) should enable logging colors', () => {
  logger.setColorEnabled(true)
  logger.warn('filename', 'method', 'This warning SHOULD not be yellow.')
  expect(logger.getColorEnabled()).toBe(true)
})

test('logger.setColorEnabled(false) should disable logging colors', () => {
  logger.setColorEnabled(false)
  logger.warn('filename', 'method', 'This warning should NOT be yellow.')
  expect(logger.getColorEnabled()).toBe(false)
})

afterAll(() => { logger.setLogLevel(origLogLevel) })
