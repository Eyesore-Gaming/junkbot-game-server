import { Logger } from './Logger'
import dotenv from 'dotenv'

dotenv.config() // load local config from .env file (if local)
const logger = Logger.getInstance()
const FILE_NAME = 'Config.js'

/**
 * Simple class to collect and store configuration information for the application
 * Note: dotenv.config() is called from main.ts during app startup
 */
export class Config {
  private static instance: Config
  private readonly appName: string
  private readonly appVersion: string
  private readonly appHttpPort: number
  private readonly nodeEnv: string
  private readonly logLevel: number
  private readonly logColor: boolean

  // using the singleton pattern
  public static getInstance (): Config {
    if (this.instance === undefined) {
      this.instance = new Config()
    }

    return this.instance
  }

  constructor () {
    this.appName = this.getVar('APP_NAME', 'string')
    this.appVersion = this.getVar('APP_VERSION', 'string')
    this.appHttpPort = this.getVar('HTTP_PORT', 'number')
    this.nodeEnv = this.getVar('NODE_ENV', 'string')
    this.logLevel = this.getVar('LOG_LEVEL', 'number')
    this.logColor = this.getVar('LOG_COLORS', 'boolean')
  }

  get AppName (): string {
    return this.appName
  }

  get AppVersion (): string {
    return this.appVersion
  }

  get HttpPort (): number {
    return this.appHttpPort
  }

  get NodeEnv (): string {
    return this.nodeEnv
  }

  get LogLevel (): number {
    return this.logLevel
  }

  get LogColor (): boolean {
    return this.logColor
  }

  // this function exists to support negative unit testing
  get MissingVarTest (): string {
    return this.getVar('Not a Real Env Key', 'string')
  }

  // this function exists to support negative unit testing
  get InvalidTypeTest (): number {
    return this.getVar('TEST__INVALID_NUMERIC', 'number')
  }

  // this function exists to support negative unit testing
  get InvalidVarTypeTest (): number {
    return this.getVar('TEST__INVALID_NUMERIC', 'array')
  }

  // this function exists to support negative unit testing
  get InvalidBooleanTest (): boolean {
    return this.getVar('TEST__INVALID_BOOLEAN', 'boolean')
  }

  /**
     * Gets and returns the value of the requested environment variable
     * as the given type.
     *
     * @param varName - the name of the environment variable to get
     * @param typeName - tye name of the type to return the value as (string | number)
     */
  private readonly getVar = (varName: string, typeName: string): any => {
    const val = process.env[varName]

    // first see if the variable was found - if not, let's blow this sucker up
    if (val === undefined) {
      throw new Error(`Config Error - Missing Environment Variable: ${varName}: ${typeName}`)
    }

    // we have a value - log the good news
    logger.debug(FILE_NAME, `getVar(${varName}, ${typeName})`, `${varName}=${val}`)

    // convert to expect type and return
    switch (typeName) {
      case 'string': {
        return val
      }
      case 'number': {
        if (!isNaN(parseInt(val))) {
          return parseInt(val)
        } else {
          throw new Error(`Config Error - ${varName} cannot be parsed as ${typeName}}`)
        }
      }
      case 'boolean': {
        if (val === 'true') {
          return true
        } else {
          logger.error(FILE_NAME, `getVar(${varName}, ${typeName})`, `${varName} is missing or not 'true' - defaulting to false.)`)
          return false
        }
      }
      default: {
        throw new Error(`Invalid Agument: ${typeName} was unexpected. Try 'string' or 'number' instead.`)
      }
    }
  }
}
