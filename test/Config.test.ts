import { Config } from '../src/Config'
import dotenv from 'dotenv'

dotenv.config() // load local config from .env file (if local)

const config: Config = Config.getInstance()
const appName: string = 'Junkbot Game Server'
const appVersion: string = '0.1.0'
const appHttpPort: number = 8080

test(`Initial config.AppName should be ${appName}`, () => {
  expect(config.AppName).toBe(appName)
})

test(`Initial config.AppVersion should be ${appVersion}`, () => {
  expect(config.AppVersion).toBe(appVersion)
})

test(`Initial config.AppName should be ${appHttpPort}`, () => {
  expect(config.HttpPort).toBe(appHttpPort)
})

test('Initial config.NodeEnv should be test (set by jest)', () => {
  expect(config.NodeEnv).toBe('test')
})

test('Initial config.LogLevel should be 5', () => {
  expect(config.LogLevel).toBe(5)
})

test('Initial config.LogColor should be true', () => {
  expect(config.LogColor).toBe(true)
})

test('Invalid boolean variable value should return false', () => {
  const invalidBoolean = (): boolean => {
    return config.InvalidBooleanTest
  }

  expect(invalidBoolean()).toBe(false)
})

test('Invalid numeric environment variable should throw', () => {
  expect(() => {
    const ret: number = config.InvalidVarTypeTest
    console.log(ret)
  }).toThrow()
})

test('Missing environment variable value should throw', () => {
  expect(() => {
    const ret: string = config.MissingVarTest
    console.log(ret)
  }).toThrow()
})

test('Requesting unsupported variable type should throw', () => {
  expect(() => {
    const ret: number = config.InvalidTypeTest
    console.log(ret)
  }).toThrow()
})
