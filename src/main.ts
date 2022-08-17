import express, { Express } from 'express'
import compression from 'compression'
import { hostname } from 'os'
import { Server } from 'http'
import { router } from './router'
import { Config } from './Config'
import { Logger } from './Logger'

let httpServer: Server
const FILE_NAME = 'main.ts' // better than hacking __filename for ES Modules
const app: Express = express()
const config: Config = Config.getInstance() // wraps up environment config variables

const logger = Logger.getInstance()
logger.info(FILE_NAME, '', `Logger initialized, current log level: ${config.LogLevel}`)

// start the server
launchExpress()

// launch the express server
function launchExpress (): void {
  app.use(compression()) // enable http compression middleware

  // set up the base router
  app.use('/', router)

  // and start the httpServer - starts the service
  httpServer = app.listen(config.HttpPort, () => {
    logger.info(FILE_NAME, 'launchExpress()', `${config.AppName} ${config.AppVersion} is listening -> http://${hostname()}:${config.HttpPort}`)
  })
}

// Gracefully shutdown the http server
function doShutdown (): void {
  if (httpServer.listening) {
    logger.info(FILE_NAME, 'doShutDown()', 'Stopping httpServer...')
    httpServer.close()
  } else {
    logger.info(FILE_NAME, 'doShutDown()', 'httpServer was not listening.')
  }

  logger.info(FILE_NAME, 'doShutDown()', 'Shutdown complete - exiting process... Goodbye.')
  process.exit(0)
}

/**
 * Watch for SIGINT (process interrupt signal) and trigger shutdown
 */
process.on('SIGINT', function onSigInt () {
  // all done, close the db connection
  logger.info(FILE_NAME, 'onSigInt()', 'Got SIGINT - Shutting down...')
  doShutdown()
})

/**
 * Watch for SIGTERM (process terminate signal) and trigger shutdown
 */
process.on('SIGTERM', function onSigTerm () {
  // all done, close the db connection
  logger.info(FILE_NAME, 'onSigTerm()', 'Got SIGTERM - Shutting down...')
  doShutdown()
})
