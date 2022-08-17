import { Config } from '../src/Config';
import dotenv from 'dotenv';
dotenv.config();
const config = Config.getInstance();
const appName = 'Junkbot Game Server';
const appVersion = '0.1.0';
const appHttpPort = 8080;
test(`Initial config.AppName should be ${appName}`, () => {
    expect(config.AppName).toBe(appName);
});
test(`Initial config.AppVersion should be ${appVersion}`, () => {
    expect(config.AppVersion).toBe(appVersion);
});
test(`Initial config.AppName should be ${appHttpPort}`, () => {
    expect(config.HttpPort).toBe(appHttpPort);
});
test('Missing environment variable key should throw', () => {
    function missingVar() {
        return config.MissingVarTest;
    }
    expect(missingVar).toThrowError();
});
test('Invalid environment variable return type should throw', () => {
    function invalidVarType() {
        return config.InvalidTypeTest;
    }
    expect(invalidVarType).toThrowError();
});
test('Requesting unsupported variable type should throw', () => {
    function invalidVarTypeRequest() {
        return config.InvalidVarTypeTest;
    }
    expect(invalidVarTypeRequest).toThrowError();
});
//# sourceMappingURL=Config.test.js.map