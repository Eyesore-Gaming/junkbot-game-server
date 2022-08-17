import dotenv from 'dotenv';
dotenv.config();
export class Config {
    constructor() {
        this.getVar = (varName, typeName) => {
            const val = process.env[varName];
            if (val === undefined) {
                throw new Error(`Config Error - Missing Environment Variable: ${varName}: ${typeName}`);
            }
            console.log('Config.js', `getVar(${varName}, ${typeName})`, `${varName}=${val}`);
            switch (typeName) {
                case 'string': {
                    return val;
                }
                case 'number': {
                    if (val !== undefined && !isNaN(parseInt(val))) {
                        return parseInt(val);
                    }
                    else {
                        throw new Error(`Config Error - ${varName} cannot be parsed as ${typeName}}`);
                    }
                }
                default: {
                    throw new Error(`Invalid Agument: ${typeName} was unexpected. Try 'string' or 'number' instead.`);
                }
            }
        };
        this.appName = this.getVar('APP_NAME', 'string');
        this.appVersion = this.getVar('APP_VERSION', 'string');
        this.appHttpPort = this.getVar('HTTP_PORT', 'number');
        this.logLevel = this.getVar('LOG_LEVEL', 'string');
        this.nodeEnv = this.getVar('NODE_ENV', 'string');
    }
    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new Config();
        }
        return this.instance;
    }
    get AppName() {
        return this.appName;
    }
    get AppVersion() {
        return this.appVersion;
    }
    get HttpPort() {
        return this.appHttpPort;
    }
    get LogLevel() {
        return this.logLevel;
    }
    get NodeEnv() {
        return this.nodeEnv;
    }
    get MissingVarTest() {
        return this.getVar('Not a Real Env Key', 'string');
    }
    get InvalidTypeTest() {
        return this.getVar('INVALID_NUMERIC_TEST_KEY', 'number');
    }
    get InvalidVarTypeTest() {
        return this.getVar('INVALID_NUMERIC_TEST_KEY', 'boolean');
    }
}
//# sourceMappingURL=Config.js.map