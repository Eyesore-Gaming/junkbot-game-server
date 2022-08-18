// Node:  Do not instantiate Config within logger - it creates an circular dependency
import path from 'path';

// console output colors 
enum COLORS {
  NONE = '\x1b[49m\x1b[0m',
  RED = '\x1b[49m\x1b[31m',
  YELLOW = '\x1b[49m\x1b[35m',
  BLUE = '\x1b[49m\x1b[36m',
  MAGENTA = '\x1b[49m\x1b[35m',
  WHITE_ON_RED = '\x1b[41m\x1b[37m',
  RED_UNDERLINE = '\x1b[4m\x1b[37m'
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
    this.info(this.FILE_NAME, `setLogLevel(${level})`, `Logger initialized, current level is: ${this.getLogLevelName(level)} `)
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

  public debug(file: string, method: string, message: string) {
    if (this.logLevel >= LOG_LEVELS.DEBUG) {
      console.log('%s%s : %s : %s' + (method == '' ? '' : ' : ') + '%s : %s%s', COLORS.BLUE, getTimeStamp(), 'DBG', fileName(file), method, message, COLORS.NONE);
    }
  }

  public error(file: string, method: string, message: string) {
    if (this.logLevel >= LOG_LEVELS.ERROR) {
      console.log('%s%s : %s : %s' + (method == '' ? '' : ' : ') + '%s : %s%s', COLORS.RED, getTimeStamp(), 'ERR', fileName(file), method, message, COLORS.NONE);
    }
  }

  public warn(file: string, method: string, message: string) {
    if (this.logLevel >= LOG_LEVELS.WARN) {
      console.log('%s%s : %s : %s' + (method == '' ? '' : ' : ') + '%s : %s%s', COLORS.YELLOW, getTimeStamp(), 'WRN', fileName(file), method, message, COLORS.NONE);
    }
  }

  public info(file: string, method: string, message: string) {
    if (this.logLevel >= LOG_LEVELS.INFO) {
      console.log('%s%s : %s : %s' + (method == '' ? '' : ' : ') + '%s : %s%s', COLORS.NONE, getTimeStamp(), 'INF', fileName(file), method, message, COLORS.NONE);
    }
  }

  public trace(file: string, method: string, message: string) {
    if (this.logLevel >= LOG_LEVELS.TRACE) {
      console.log('%s%s : %s : %s' + (method == '' ? '' : ' : ') + '%s : %s', COLORS.MAGENTA, getTimeStamp(), 'TRC', fileName(file), method, message, COLORS.NONE);
    }
  }
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
