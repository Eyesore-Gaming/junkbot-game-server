import express from 'express';
import compression from 'compression';
import { hostname } from 'os';
import { Config } from './Config';
import { Logger } from './Logger';
import { router } from './router';
let httpServer;
const FILE_NAME = 'main.ts';
const app = express();
const config = Config.getInstance();
const logger = Logger.getInstance();
logger.info(FILE_NAME, '', `Logger initialized, current log level: ${config.LogLevel}`);
launchExpress();
function launchExpress() {
    app.use(compression());
    app.use('/', router);
    httpServer = app.listen(config.HttpPort, () => {
        logger.info(FILE_NAME, 'launchExpress()', `${config.AppName} ${config.AppVersion} is listening -> http://${hostname()}:${config.HttpPort}`);
    });
}
function doShutdown() {
    if (httpServer.listening) {
        logger.info(FILE_NAME, 'doShutDown()', 'Stopping httpServer...');
        httpServer.close();
    }
    else {
        logger.info(FILE_NAME, 'doShutDown()', 'httpServer was not listening.');
    }
    logger.info(FILE_NAME, 'doShutDown()', 'Shutdown complete - exiting process... Goodbye.');
    process.exit(0);
}
process.on('SIGINT', function onSigInt() {
    logger.info(FILE_NAME, 'onSigInt()', 'Got SIGINT - Shutting down...');
    doShutdown();
});
process.on('SIGTERM', function onSigTerm() {
    logger.info(FILE_NAME, 'onSigTerm()', 'Got SIGTERM - Shutting down...');
    doShutdown();
});
//# sourceMappingURL=main.js.map