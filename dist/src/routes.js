import { Config } from './Config';
import path from 'path';
import fs from 'fs';
import { Logger } from './Logger';
const config = Config.getInstance();
const logger = Logger.getInstance();
const FILE_NAME = 'routes.ts';
export const root = (req, res) => {
    res.send(`Hello from ${config.AppName}, ${config.AppVersion} on ${config.HttpPort}`);
    logger.trace(FILE_NAME, req.url, 'Root page request handled.');
};
export const livenessProbe = (req, res) => {
    res.status(200).json({ probeType: 'liveness', status: 'alive' });
    logger.trace(FILE_NAME, req.url, 'Liveness probe request handled.');
};
export const readinessProbe = (req, res) => {
    res.status(200).json({ probeType: 'readiness', status: 'ready' });
    logger.trace(FILE_NAME, req.url, 'Readiness probe request handled.');
};
export const serveFile = (req, res) => {
    let absFile = '';
    if (req.url === '/') {
        absFile = path.resolve('content/index.html');
    }
    else {
        absFile = path.resolve('content/' + req.url);
    }
    if (fs.existsSync(absFile)) {
        logger.trace(FILE_NAME, req.url, 'Serving resource...');
        res.status(200).sendFile(absFile);
        return res.status(200);
    }
    else {
        logger.trace(FILE_NAME, req.url, 'Resource not found.');
        return res.status(404).send('Page Not Found!');
    }
};
//# sourceMappingURL=Routes.js.map