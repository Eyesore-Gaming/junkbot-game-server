import path from 'path';
import { Config } from './Config.js';
var COLORS;
(function (COLORS) {
    COLORS["NONE"] = "\u001B[49m\u001B[0m";
    COLORS["RED"] = "\u001B[49m\u001B[31m";
    COLORS["YELLOW"] = "\u001B[49m\u001B[35m";
    COLORS["BLUE"] = "\u001B[49m\u001B[36m";
    COLORS["MAGENTA"] = "\u001B[49m\u001B[35m";
    COLORS["WHITE_ON_RED"] = "\u001B[41m\u001B[37m";
    COLORS["RED_UNDERLINE"] = "\u001B[4m\u001B[37m";
})(COLORS || (COLORS = {}));
export var LOG_LEVELS;
(function (LOG_LEVELS) {
    LOG_LEVELS[LOG_LEVELS["NONE"] = 0] = "NONE";
    LOG_LEVELS[LOG_LEVELS["ERROR"] = 1] = "ERROR";
    LOG_LEVELS[LOG_LEVELS["WARN"] = 2] = "WARN";
    LOG_LEVELS[LOG_LEVELS["INFO"] = 3] = "INFO";
    LOG_LEVELS[LOG_LEVELS["DEBUG"] = 4] = "DEBUG";
    LOG_LEVELS[LOG_LEVELS["TRACE"] = 5] = "TRACE";
})(LOG_LEVELS || (LOG_LEVELS = {}));
export class Logger {
    constructor() {
        this.logLevel = getLogLevel();
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    setLogLevel(level) {
        this.logLevel = level;
        let method = 'setLogLevel';
        console.log('%s%s : %s : %s : %s : Log Level set to %s%s', COLORS.NONE, getTimeStamp(), 'N/A', fileName(__filename), method, LOG_LEVELS[this.logLevel], COLORS.NONE);
    }
    getLogLevel() {
        return this.logLevel;
    }
    debug(file, method, message) {
        if (this.logLevel >= LOG_LEVELS.DEBUG) {
            console.log('%s%s : %s : %s' + (method == '' ? '' : ' : ') + '%s : %s%s', COLORS.BLUE, getTimeStamp(), 'DBG', fileName(file), method, message, COLORS.NONE);
        }
    }
    error(file, method, message) {
        if (this.logLevel >= LOG_LEVELS.ERROR) {
            console.log('%s%s : %s : %s' + (method == '' ? '' : ' : ') + '%s : %s%s', COLORS.RED, getTimeStamp(), 'ERR', fileName(file), method, message, COLORS.NONE);
        }
    }
    warn(file, method, message) {
        if (this.logLevel >= LOG_LEVELS.WARN) {
            console.log('%s%s : %s : %s' + (method == '' ? '' : ' : ') + '%s : %s%s', COLORS.YELLOW, getTimeStamp(), 'WRN', fileName(file), method, message, COLORS.NONE);
        }
    }
    info(file, method, message) {
        if (this.logLevel >= LOG_LEVELS.INFO) {
            console.log('%s%s : %s : %s' + (method == '' ? '' : ' : ') + '%s : %s%s', COLORS.NONE, getTimeStamp(), 'INF', fileName(file), method, message, COLORS.NONE);
        }
    }
    trace(file, method, message) {
        if (this.logLevel >= LOG_LEVELS.TRACE) {
            console.log('%s%s : %s : %s' + (method == '' ? '' : ' : ') + '%s : %s', COLORS.MAGENTA, getTimeStamp(), 'TRC', fileName(file), method, message, COLORS.NONE);
        }
    }
}
function getTimeStamp() {
    let dt = new Date();
    return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString();
}
function fileName(file) {
    return typeof file !== 'undefined' ? path.basename(file) : 'FILE_UNKNOWN';
}
function getLogLevel() {
    const config = Config.getInstance();
    switch (config.LogLevel) {
        case 'none':
            return LOG_LEVELS.NONE;
        case 'error':
            return LOG_LEVELS.ERROR;
        case 'warn':
            return LOG_LEVELS.WARN;
        case 'info':
            return LOG_LEVELS.INFO;
        case 'debug':
            return LOG_LEVELS.DEBUG;
        case 'trace':
            return LOG_LEVELS.TRACE;
        default:
            return LOG_LEVELS.INFO;
    }
}
//# sourceMappingURL=Logger.js.map