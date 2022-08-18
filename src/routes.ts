import { Request, Response } from 'express'
import { Config } from './Config'
import path from 'path'
import fs from 'fs'
import { Logger } from './Logger'

const config: Config = Config.getInstance() // wraps up environment config variables
const logger: Logger = Logger.getInstance() // custom logger
const FILE_NAME: string = 'routes.ts'

// application root
export const root = (req: Request, res: Response): void => {
  res.send(`Hello from ${config.AppName}, ${config.AppVersion} on ${config.HttpPort}`)
  logger.trace(FILE_NAME, req.url, 'Root page request handled.')
}

// Response with "live" if app is running
export const livenessProbe = (req: Request, res: Response): void => {
  res.status(200).json({ probeType: 'liveness', status: 'alive' })
  logger.trace(FILE_NAME, req.url, 'Liveness probe request handled.')
}

// Response with "live" when app is ready
export const readinessProbe = (req: Request, res: Response): void => {
  res.status(200).json({ probeType: 'readiness', status: 'ready' })
  logger.trace(FILE_NAME, req.url, 'Readiness probe request handled.')
}

/**
 * Serve up the requested file
 *
 * @param {Request} req
 * @param {Response} res
 */
export const serveFile = (req: Request, res: Response): Response => {
  let absFile = ''

  if (req.url === '/') {
    absFile = path.resolve('content/index.html')
  } else {
    absFile = path.resolve('content/' + req.url)
  }

  if (fs.existsSync(absFile)) {
    logger.trace(FILE_NAME, req.url, 'Serving resource...')
    res.status(200).sendFile(absFile)
    return res.status(200)
  } else {
    logger.trace(FILE_NAME, req.url, 'Resource not found.')
    return res.status(404).send('Page Not Found!')
  }
}
