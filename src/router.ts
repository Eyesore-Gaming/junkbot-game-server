import * as routes from './routes'
import express from 'express'
export const router = express.Router()

router.get('/', routes.root)
router.get('/probes/live', routes.livenessProbe)
router.get('/probes/ready', routes.readinessProbe)
router.get('/*', routes.serveFile)

export default router
