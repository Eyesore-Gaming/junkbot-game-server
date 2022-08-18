// Node:  Do not instantiate Config within logger - it creates an circular dependency
import path from 'path';

// console output colors 
enum COLORS {
  NONE = '\x1b[49m\x1b[0m',
  RED = '\x1b[49m\x1b[31m',
  RED_UNDERLINE = '\x1b[4m\x1b[31m',
  YELLOW = '\x1b[49m\x1b[33m',
  BLUE = '\x1b[49m\x1b[36m',
  MAGENTA = '\x1b[49m\x1b[35m',
  GREEN = '\x1b[49m\x1b[32m',
  WHITE_ON_RED = '\x1b[41m\x1b[37m'

}

// LOG_LEVEL to be set as an int in an environment variable
export enum LOG_LEVELS {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
  TRACE = 5
}

export class Logger {
  private static instance: Logger;
  private logLevel: LOG_LEVELS = LOG_LEVELS.INFO;
  private FILE_NAME = 'Logger.ts'
  private colorOn = false;

  // must use getInstance()
  private constructor() { }

  // singleton instance pattern
  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLogLevel(level: LOG_LEVELS) {
    this.logLevel = level;
    this.info(this.FILE_NAME, `setLogLevel(${level})`, `Logger initialized, current level is: ${this.getLogLevelName(level)}, colored output is ${this.colorOn ? 'enabled' : 'disabled'} `)
  }

  public getLogLevel(): LOG_LEVELS {
    return this.logLevel;
  }

  public getLogLevelName(level: number): string {
    switch (level) {
      case LOG_LEVELS.NONE:
        return 'NONE'
      case LOG_LEVELS.ERROR:
        return 'ERROR'
      case LOG_LEVELS.WARN:
        return 'WARN'
      case LOG_LEVELS.INFO:
        return 'INFO'
      case LOG_LEVELS.DEBUG:
        return 'DEBUG'
      case LOG_LEVELS.TRACE:
        return 'TRACE'
    }

    return 'NO_MATCHING_LOG_LEVEL'
  }

  public setColorEnabled(value: boolean) {
    this.colorOn = value;
    this.info(this.FILE_NAME, `setColorEnabled(${value})`, `Log colors have been ${value ? 'enabled' : 'disabled'} `)
  }

  public getColorEnabled() {
    this.info(this.FILE_NAME, 'getColorEnabled()', `Log colors are ${this.colorOn ? 'enabled' : 'disabled'} `)
    return this.colorOn;
  }

  public debug(file: string, method: string, message: string) {
    logMessage(file, method, message, 'DBG', this.colorOn ? COLORS.BLUE : '', this.colorOn ? COLORS.NONE : '' )
  }

  public error(file: string, method: string, message: string) {
    logMessage(file, method, message, 'ERR', this.colorOn ? COLORS.RED : '', this.colorOn ? COLORS.NONE : '' )
  }

  public warn(file: string, method: string, message: string) {
    logMessage(file, method, message, 'WRN', this.colorOn ? COLORS.YELLOW : '', this.colorOn ? COLORS.NONE : '' )
  }

  public info(file: string, method: string, message: string) {
    logMessage(file, method, message, 'INF', this.colorOn ? COLORS.GREEN : '', this.colorOn ? COLORS.NONE : '' )
  }

  public trace(file: string, method: string, message: string) {
    logMessage(file, method, message, 'TRC', this.colorOn ? COLORS.MAGENTA : '', this.colorOn ? COLORS.NONE : '' )
  }
}

function logMessage(file: string, method: string, message: string, logLevel: string, colorStart: string, colorEnd: string) {
  console.log('%s%s : %s : %s' + (method == '' ? '' : ' : ') + '%s : %s%s', colorStart, getTimeStamp(), logLevel, fileName(file), method, message, colorEnd);
}

// returns the current timestamp
function getTimeStamp(): string {
  let dt = new Date();
  return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString();
}

// strips path from __filename and returns just the filename.ext
function fileName(file: string) {
  return typeof file !== 'undefined' ? path.basename(file) : 'FILE_UNKNOWN';
}
