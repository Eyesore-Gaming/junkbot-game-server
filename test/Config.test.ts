import { Config } from '../src/Config'
import dotenv from 'dotenv'

dotenv.config() // load local config from .env file (if local)

const config: Config = Config.getInstance()
const appName: string = 'Junkbot Game Server'
const appVersion: string = '1.0.0'
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

test('Missing environment variable key should throw', () => {
  function missingVar (): string {
    return config.MissingVarTest
  }
  expect(missingVar).toThrowError()
})

test('Invalid environment variable return type should throw', () => {
  function invalidVarType (): number {
    return config.InvalidTypeTest
  }
  expect(invalidVarType).toThrowError()
})
