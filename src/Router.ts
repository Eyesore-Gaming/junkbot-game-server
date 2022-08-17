import * as routes from './routes.js'
import express from 'express'

export const router = express.Router()

// landing page
router.get('/', routes.root)

// map the live/ready probes
router.get('/probes/live', routes.livenessProbe)
router.get('/probes/ready', routes.readinessProbe)

// all other content, including file requests - will return 404 if no route/file
router.get('/*', routes.serveFile)
