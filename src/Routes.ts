import { Request, Response } from 'express'
import { Config } from './Config'
import path from 'path'
import fs from 'fs'

const config: Config = Config.getInstance() // wraps up environment config variables

export const root = (_req: Request, res: Response): void => {
  res.send(`Hello from ${config.AppName}, ${config.AppVersion} on ${config.HttpPort}`)
}

// Response with "live" if app is running
export const livenessProbe = (_req: Request, res: Response): void => {
  res.status(200).json({ probeType: 'liveness', status: 'alive' })
}

// Response with "live" when app is ready
export const readinessProbe = (_req: Request, res: Response): void => {
  res.status(200).json({ probeType: 'readiness', status: 'ready' })
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
    res.status(200).sendFile(absFile)
    return res.status(200)
  } else {
    return res.status(404).send('Page Not Found')
  }
}
