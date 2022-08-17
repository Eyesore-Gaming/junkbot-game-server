import express, { Express } from 'express'
import compression from 'compression'
import dotenv from 'dotenv'
import { router } from './router'
import { Server } from 'http'
import { hostname } from 'os'
import { Config } from './Config'

dotenv.config() // load local config from .env file (if local)

let httpServer: Server
const app: Express = express()
const config: Config = Config.getInstance() // wraps up environment config variables

// start the server
launchExpress()

// launch the express server
function launchExpress (): void {
  app.use(compression()) // enable http compression middleware

  // set up the base router
  app.use('/', router)

  // and start the httpServer - starts the service
  httpServer = app.listen(config.HttpPort, () => {
    console.log(__filename, 'launchExpress()', `${config.AppName} ${config.AppVersion} is listening -> http://${hostname()}:${config.HttpPort}`)
  })
}

// Gracefully shutdown the http server
function doShutdown (): void {
  if (httpServer.listening) {
    console.log(__filename, 'doShutDown()', 'Stopping httpServer...')
    httpServer.close()
  } else {
    console.log(__filename, 'doShutDown()', 'httpServer was not listening.')
  }

  console.log(__filename, 'doShutDown()', 'Shutdown complete - exiting process... Goodbye.')
  process.exit(0)
}

/**
 * Watch for SIGINT (process interrupt signal) and trigger shutdown
 */
process.on('SIGINT', function onSigInt () {
  // all done, close the db connection
  console.log(__filename, 'onSigInt()', 'Got SIGINT - Shutting down...')
  doShutdown()
})

/**
 * Watch for SIGTERM (process terminate signal) and trigger shutdown
 */
process.on('SIGTERM', function onSigTerm () {
  // all done, close the db connection
  console.log(__filename, 'onSigTerm()', 'Got SIGTERM - Shutting down...')
  doShutdown()
})
