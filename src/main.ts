import express, { Express } from 'express'
import compression from 'compression'
import { hostname } from 'os'
import { Server } from 'http'
import { SimpleTestClass } from './SimpleTestClass.js'
import { router } from './router.js'
import { Config } from './Config.js'

let httpServer: Server
const app: Express = express()
const config: Config = Config.getInstance() // wraps up environment config variables

const stc: SimpleTestClass = new SimpleTestClass('hi', 1, 2)
console.log(stc.Health)

// start the server
launchExpress()

// launch the express server
function launchExpress (): void {
  app.use(compression()) // enable http compression middleware

  // set up the base router
  app.use('/', router)

  // and start the httpServer - starts the service
  httpServer = app.listen(config.HttpPort, () => {
    console.log('main.js', 'launchExpress()', `${config.AppName} ${config.AppVersion} is listening -> http://${hostname()}:${config.HttpPort}`)
  })
}

// Gracefully shutdown the http server
function doShutdown (): void {
  if (httpServer.listening) {
    console.log('main.js', 'doShutDown()', 'Stopping httpServer...')
    httpServer.close()
  } else {
    console.log('main.js', 'doShutDown()', 'httpServer was not listening.')
  }

  console.log('main.js', 'doShutDown()', 'Shutdown complete - exiting process... Goodbye.')
  process.exit(0)
}

/**
 * Watch for SIGINT (process interrupt signal) and trigger shutdown
 */
process.on('SIGINT', function onSigInt () {
  // all done, close the db connection
  console.log('main.js', 'onSigInt()', 'Got SIGINT - Shutting down...')
  doShutdown()
})

/**
 * Watch for SIGTERM (process terminate signal) and trigger shutdown
 */
process.on('SIGTERM', function onSigTerm () {
  // all done, close the db connection
  console.log('main.js', 'onSigTerm()', 'Got SIGTERM - Shutting down...')
  doShutdown()
})
